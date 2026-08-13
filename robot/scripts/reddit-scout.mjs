// robot/scripts/reddit-scout.mjs
//
// Busca threads en subs configurados matching queries pre-armadas.
// Usa Reddit API con "app-only" OAuth (client credentials flow) — no
// requiere user OAuth para search read-only.
//
// Anti-anti-pattern:
//   - NO devuelve threads que ya vimos (dedupe via state/seen-threads.json)
//   - NO devuelve threads con >maxCommentsWhenFound (saturados)
//   - NO devuelve threads negative score (probablemente low-quality)
//   - NO devuelve threads >maxAgeHours (tarde para aportar)

import fs from 'node:fs/promises';
import path from 'node:path';
import { NICHES, LIMITS } from '../config.mjs';

const STATE_FILE = path.join(process.cwd(), 'robot/state/seen-threads.json');

async function getRedditAppOnlyToken() {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const userAgent = process.env.REDDIT_USER_AGENT ?? 'affiliate-robot/1.0';

  if (!clientId || !clientSecret) {
    throw new Error('REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET required');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': userAgent,
    },
    // client_credentials grant — sin refresh, no user context.
    // Suficiente para search public. Para posting comments necesitaremos
    // password grant o full OAuth (v1).
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Reddit auth failed: ${res.status} — ${detail}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function searchSubreddit(token, subName, query, userAgent) {
  const url = new URL(`https://oauth.reddit.com/r/${subName}/search`);
  url.searchParams.set('q', query);
  url.searchParams.set('restrict_sr', 'true');
  url.searchParams.set('sort', 'new');
  url.searchParams.set('t', 'week');
  url.searchParams.set('limit', '25');

  const res = await fetch(url, {
    headers: {
      Authorization: `bearer ${token}`,
      'User-Agent': userAgent,
    },
  });

  if (!res.ok) {
    console.error(`Search failed for r/${subName} "${query}": ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.data?.children?.map((c) => c.data) ?? [];
}

async function loadSeenThreads() {
  try {
    const raw = await fs.readFile(STATE_FILE, 'utf-8');
    const state = JSON.parse(raw);
    // Garbage collect threads más viejos que TTL
    const cutoff = Date.now() - LIMITS.seenThreadTTLDays * 86400_000;
    const threads = state.threads ?? {};
    for (const [id, ts] of Object.entries(threads)) {
      if (new Date(ts).getTime() < cutoff) delete threads[id];
    }
    return threads;
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

async function saveSeenThreads(threads) {
  await fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
  await fs.writeFile(
    STATE_FILE,
    JSON.stringify({ note: 'seen-threads cache, auto GC after TTL', threads }, null, 2),
  );
}

function threadMatchesFilters(t, sub) {
  if (t.num_comments > sub.maxCommentsWhenFound) return false;
  if (t.score < sub.minScore) return false;
  const ageHours = (Date.now() / 1000 - t.created_utc) / 3600;
  if (ageHours > sub.maxAgeHours) return false;
  // NSFW / stickied / locked → skip
  if (t.over_18 || t.stickied || t.locked) return false;
  return true;
}

/**
 * Scout main entry point.
 * @param {string} nicheKey - key in NICHES config (e.g. 'baristapath')
 * @returns {Promise<Array>} array of promising threads with metadata
 */
export async function scout(nicheKey = 'baristapath') {
  const niche = NICHES[nicheKey];
  if (!niche) throw new Error(`Niche "${nicheKey}" not configured`);

  const userAgent = process.env.REDDIT_USER_AGENT ?? 'affiliate-robot/1.0';
  const token = await getRedditAppOnlyToken();
  const seen = await loadSeenThreads();

  const promising = [];
  const seenThisRun = new Set();

  for (const sub of niche.subs) {
    // Reddit accepts one query at a time. Iterate.
    for (const query of niche.queries) {
      // Simple filters aplicados via API params + client-side filter
      const subConfig = {
        maxCommentsWhenFound: niche.maxCommentsWhenFound,
        maxAgeHours: niche.maxAgeHours,
        minScore: niche.minScore,
      };
      const threads = await searchSubreddit(token, sub.name, query, userAgent);
      for (const t of threads) {
        if (seenThisRun.has(t.id)) continue;
        if (seen[t.id]) continue;
        if (!threadMatchesFilters(t, subConfig)) continue;

        seenThisRun.add(t.id);
        promising.push({
          id: t.id,
          subreddit: sub.name,
          title: t.title,
          url: `https://reddit.com${t.permalink}`,
          author: t.author,
          score: t.score,
          numComments: t.num_comments,
          created: new Date(t.created_utc * 1000).toISOString(),
          selfText: t.selftext?.slice(0, 1000) ?? '',
          matchedQuery: query,
          subStrictness: sub.strictness,
        });

        if (promising.length >= LIMITS.maxNotificationsPerRun) {
          console.log(`Cap reached (${LIMITS.maxNotificationsPerRun}), stopping scout`);
          return promising;
        }
      }
      // Politeness delay between queries
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return promising;
}

/**
 * Mark threads as seen (call after successful processing).
 */
export async function markSeen(threadIds) {
  const seen = await loadSeenThreads();
  const now = new Date().toISOString();
  for (const id of threadIds) seen[id] = now;
  await saveSeenThreads(seen);
}

// CLI entry point: node scripts/reddit-scout.mjs
if (import.meta.url === `file://${process.argv[1]}`) {
  scout()
    .then((threads) => {
      console.log(`Found ${threads.length} promising thread(s):`);
      for (const t of threads) {
        console.log(`\n  r/${t.subreddit} [${t.score}↑ ${t.numComments}💬]`);
        console.log(`  ${t.title}`);
        console.log(`  matched: "${t.matchedQuery}"`);
        console.log(`  ${t.url}`);
      }
    })
    .catch((err) => {
      console.error('Scout failed:', err);
      process.exit(1);
    });
}
