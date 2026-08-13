// robot/scripts/draft-comment.mjs
//
// Toma un thread de Reddit (output de reddit-scout.mjs) y genera un comment
// draft usando Claude API + prompt template en robot/prompts/comment-draft.md.
//
// Devuelve: { shouldPost, reason, comment, suggestedLink, linkContext }

import fs from 'node:fs/promises';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { WARMUP_MODE } from '../config.mjs';

const PROMPT_TEMPLATE_PATH = path.join(
  process.cwd(),
  'robot/prompts/comment-draft.md',
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function loadPromptTemplate() {
  return fs.readFile(PROMPT_TEMPLATE_PATH, 'utf-8');
}

function fillTemplate(template, thread) {
  const hoursAgo = Math.floor(
    (Date.now() - new Date(thread.created).getTime()) / 3600_000,
  );
  return template
    .replaceAll('{{WARMUP_MODE}}', WARMUP_MODE ? 'true' : 'false')
    .replaceAll('{{SUBREDDIT}}', thread.subreddit)
    .replaceAll('{{TITLE}}', thread.title)
    .replaceAll('{{SELF_TEXT}}', thread.selfText || '(no post body)')
    .replaceAll('{{SCORE}}', String(thread.score))
    .replaceAll('{{NUM_COMMENTS}}', String(thread.numComments))
    .replaceAll('{{HOURS_AGO}}', String(hoursAgo))
    .replaceAll('{{MATCHED_QUERY}}', thread.matchedQuery);
}

function parseClaudeOutput(text) {
  // El prompt pide JSON puro. A veces Claude devuelve con code fences
  // por hábito — los strippeamos defensivamente.
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `Claude output was not valid JSON. Raw output:\n${text}\nError: ${err.message}`,
    );
  }
}

/**
 * Genera un draft para un thread.
 * @param {object} thread - output de reddit-scout.mjs
 * @returns {Promise<object>} { shouldPost, reason, comment, suggestedLink, linkContext }
 */
export async function draftComment(thread) {
  const template = await loadPromptTemplate();
  const prompt = fillTemplate(template, thread);

  const response = await anthropic.messages.create({
    // Sonnet 5 balancea calidad/costo. Opus 5 sería mejor pero 5x más caro
    // — a 70 drafts/día no vale la diferencia marginal en tone.
    model: 'claude-sonnet-5',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) throw new Error('No text block in Claude response');

  return parseClaudeOutput(textBlock.text);
}

// CLI entry point para test manual: pasás un JSON de thread por stdin
if (import.meta.url === `file://${process.argv[1]}`) {
  const chunks = [];
  process.stdin.on('data', (c) => chunks.push(c));
  process.stdin.on('end', async () => {
    try {
      const thread = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
      const draft = await draftComment(thread);
      console.log(JSON.stringify(draft, null, 2));
    } catch (err) {
      console.error('Draft failed:', err.message);
      process.exit(1);
    }
  });
}
