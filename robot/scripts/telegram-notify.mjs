// robot/scripts/telegram-notify.mjs
//
// Manda mensaje formateado al chat del operador con:
//   - Thread info (subreddit + titulo + link)
//   - Draft del comment
//   - Suggested link (si aplica)
//   - Inline buttons: Approve, Edit, Reject, Skip
//
// v0: los buttons todavía no ejecutan nada automáticamente. Son placeholders
// para que el operador pueda visualmente decidir. v1 conecta el CF Worker
// webhook que procesa el callback.

const TELEGRAM_API = 'https://api.telegram.org';

function esc(text) {
  // Telegram Markdown escape para caracteres especiales
  return String(text)
    .replaceAll('_', '\\_')
    .replaceAll('*', '\\*')
    .replaceAll('[', '\\[')
    .replaceAll(']', '\\]')
    .replaceAll('`', '\\`');
}

function formatMessage({ thread, draft }) {
  const strictness = { medium: '🟢', high: '🟡', 'very-high': '🔴' }[thread.subStrictness] ?? '⚪';
  const linkLine = draft.suggestedLink
    ? `\n🔗 *Suggested link*: ${esc(draft.suggestedLink)}\n_${esc(draft.linkContext)}_`
    : '\n🔗 *No link* (warmup mode or not warranted)';

  return `${strictness} *r/${esc(thread.subreddit)}* — ${thread.score}↑ ${thread.numComments}💬

*Thread*: ${esc(thread.title)}
${esc(thread.url)}

*Matched query*: "${esc(thread.matchedQuery)}"
${linkLine}

*Draft comment*:
${esc(draft.comment)}

_Reason: ${esc(draft.reason)}_`;
}

function inlineKeyboard(threadId) {
  return {
    inline_keyboard: [
      [
        { text: '✅ Approve', callback_data: `approve:${threadId}` },
        { text: '✏️ Edit', callback_data: `edit:${threadId}` },
      ],
      [
        { text: '❌ Reject', callback_data: `reject:${threadId}` },
        { text: '⏭️ Skip', callback_data: `skip:${threadId}` },
      ],
      [{ text: '🔗 Open thread', url: threadId.startsWith('http') ? threadId : `https://reddit.com/comments/${threadId}` }],
    ],
  };
}

/**
 * Manda notificación al operador. Modo dry-run imprime a stdout sin llamar API.
 * @param {object} options
 * @param {object} options.thread - thread metadata (de reddit-scout)
 * @param {object} options.draft - draft output (de draft-comment)
 * @returns {Promise<object>} Telegram API response o dry-run stub
 */
export async function notify({ thread, draft }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const dryRun = process.env.DRY_RUN === '1';

  if (!token || !chatId) {
    if (!dryRun) throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID required');
  }

  const text = formatMessage({ thread, draft });
  const reply_markup = inlineKeyboard(thread.id);

  if (dryRun) {
    console.log('--- DRY RUN ---');
    console.log(text);
    console.log('\nButtons:', JSON.stringify(reply_markup.inline_keyboard, null, 2));
    return { ok: true, dryRun: true };
  }

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup,
      disable_web_page_preview: false,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(`Telegram API error: ${res.status} — ${JSON.stringify(data)}`);
  }
  return data;
}

/**
 * Helper: obtener chat ID desde updates recientes del bot.
 * Uso una-vez: después de crear bot con @BotFather + mandarle /start,
 * corré `node scripts/telegram-notify.mjs get-chat-id` para leer tu chat ID.
 */
export async function getChatIdFromUpdates() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN required');

  const res = await fetch(`${TELEGRAM_API}/bot${token}/getUpdates`);
  const data = await res.json();

  if (!data.ok || !data.result?.length) {
    console.log('No updates found. Mandale /start al bot desde tu Telegram y volvé a correr esto.');
    return null;
  }

  // Encuentra el último mensaje del user
  const messages = data.result
    .map((u) => u.message)
    .filter(Boolean)
    .map((m) => ({ from: m.from, chat: m.chat, text: m.text, date: m.date }));

  if (!messages.length) {
    console.log('No messages found. Mandale /start al bot desde tu Telegram.');
    return null;
  }

  const last = messages[messages.length - 1];
  console.log('Chat ID:', last.chat.id);
  console.log('User:', `${last.from.first_name} @${last.from.username ?? 'no-username'}`);
  console.log('Last message:', last.text);
  return last.chat.id;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const cmd = process.argv[2];
  if (cmd === 'get-chat-id') {
    getChatIdFromUpdates().catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  } else {
    console.error('Usage: node scripts/telegram-notify.mjs get-chat-id');
    process.exit(1);
  }
}
