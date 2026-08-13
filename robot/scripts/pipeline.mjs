// robot/scripts/pipeline.mjs
//
// End-to-end: scout → draft → notify. Entry point del cron.
//
// Flow:
//   1. Scout Reddit para threads matching queries (dedupe vs seen)
//   2. Para cada thread, llamar Claude API para draftear comment
//   3. Si Claude dice shouldPost=false, skip silently (no notif spam)
//   4. Si shouldPost=true, mandar notif Telegram con draft + botones
//   5. Marcar threads procesados en seen-threads.json
//   6. Log summary a stdout

import { scout, markSeen } from './reddit-scout.mjs';
import { draftComment } from './draft-comment.mjs';
import { notify } from './telegram-notify.mjs';

async function main() {
  const nicheKey = process.argv[2] ?? 'baristapath';
  const dryRun = process.env.DRY_RUN === '1';

  console.log(`[pipeline] Scouting niche: ${nicheKey}${dryRun ? ' (DRY RUN)' : ''}`);

  let threads;
  try {
    threads = await scout(nicheKey);
  } catch (err) {
    console.error('[pipeline] Scout failed:', err.message);
    process.exit(1);
  }

  console.log(`[pipeline] Scout found ${threads.length} candidate threads`);

  if (threads.length === 0) {
    console.log('[pipeline] Nothing to notify. Exit clean.');
    return;
  }

  const processedIds = [];
  const notified = [];
  const skipped = [];

  for (const thread of threads) {
    console.log(`\n[pipeline] Processing "${thread.title.slice(0, 60)}..."`);

    let draft;
    try {
      draft = await draftComment(thread);
    } catch (err) {
      console.error(`  Draft failed: ${err.message}`);
      continue;
    }

    if (!draft.shouldPost) {
      console.log(`  Skipped by Claude: ${draft.reason}`);
      skipped.push({ thread: thread.title, reason: draft.reason });
      processedIds.push(thread.id); // still mark seen para no re-analizar
      continue;
    }

    try {
      await notify({ thread, draft });
      console.log(`  ✓ Notified operator`);
      notified.push(thread.title);
      processedIds.push(thread.id);
    } catch (err) {
      console.error(`  Notify failed: ${err.message}`);
      // NO marcar como seen si notify falló — reintentamos next run
    }
  }

  // Marcar seen (después de procesar todo, batch write)
  if (processedIds.length && !dryRun) {
    await markSeen(processedIds);
  }

  // Summary
  console.log(`\n[pipeline] Summary:`);
  console.log(`  Threads scouted: ${threads.length}`);
  console.log(`  Notified: ${notified.length}`);
  console.log(`  Skipped by Claude: ${skipped.length}`);
  console.log(`  Marked as seen: ${processedIds.length}`);
}

main().catch((err) => {
  console.error('[pipeline] Fatal error:', err);
  process.exit(1);
});
