// Cloudflare Pages Function — /api/subscribe.
//
// Endpoint que el componente <EmailSignup> POSTea. Maneja dos modos:
//
//   1. MailerLite configurado (production):
//      Si MAILERLITE_API_KEY está en env vars, hace POST a la API real de
//      MailerLite y devuelve 200 al cliente. Si MAILERLITE_GROUP_ID también
//      está set, el suscriptor se agrega a ese grupo (segmentación). Si no
//      hay group ID, el suscriptor queda en la lista principal del account.
//
//   2. Setup mode (placeholder, mientras MailerLite no esté configurado):
//      Devuelve 200 sin más — el componente cliente persiste el lead en
//      localStorage como fallback. Estos leads se pueden recoger después
//      cuando el operador active la integración.
//
// Anti-gray-hat (CLAUDE.md):
//   - Nunca compartimos el email con terceros fuera de MailerLite.
//   - Validación strict de email antes de cualquier envío.
//   - Rate limit liviano (1 request por IP cada 10s) para evitar abuso.
//
// Bindings esperados en Cloudflare Pages settings:
//   - MAILERLITE_API_KEY (Secret) — Integrations -> MailerLite API ->
//     Generate token. Token JWT, ~400 chars.
//   - MAILERLITE_GROUP_ID (Text, opcional) — Subscribers -> Groups ->
//     ID numerico del grupo. Si no se setea, suscriptor va a la lista
//     general.
//
// Migracion ConvertKit -> MailerLite: 2026-05-24. ConvertKit free tier
// ya no incluia incentive email (welcome email), feature gateada al plan
// pago. MailerLite free incluye welcome email + automations hasta 500 subs.
// Ver docs/email-strategy.md.

interface Env {
  MAILERLITE_API_KEY?: string;
  MAILERLITE_GROUP_ID?: string;
}

interface SubscribeBody {
  email?: unknown;
  name?: unknown;
  source?: unknown;
  ts?: unknown;
}

interface MailerLiteResponse {
  data?: { id?: string; email?: string };
  errors?: Record<string, string[]>;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit simple en memoria de la function instance. Cloudflare reinicia
// la instance frecuentemente — esto NO es un rate limit serio, solo cubre
// el caso obvio de doble-click o bot basico.
const recentByIp = new Map<string, number>();
const RATE_WINDOW_MS = 10_000;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && EMAIL_RE.test(value.trim()) && value.length < 320;
}

async function postToMailerLite(
  apiKey: string,
  email: string,
  name?: string,
  groupId?: string,
  source?: string,
): Promise<{ ok: boolean; status: number; detail?: string }> {
  // MailerLite v2 (new API): POST /api/subscribers es upsert — crea o
  // actualiza por email. Doc: developers.mailerlite.com/docs/subscribers
  const url = 'https://connect.mailerlite.com/api/subscribers';
  const payload: Record<string, unknown> = { email };
  if (name) payload.fields = { name };
  if (groupId) payload.groups = [groupId];
  // Source custom field para attribution (compatible con segmentos por
  // landing page futura).
  if (source) {
    payload.fields = { ...(payload.fields as object | undefined), source };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as MailerLiteResponse;
    if (!res.ok) {
      // MailerLite devuelve errors como { field: ["message"] } o message string.
      let detail: string;
      if (data.errors) {
        detail = Object.entries(data.errors)
          .map(([k, v]) => `${k}: ${(v ?? []).join(', ')}`)
          .join(' | ');
      } else {
        detail = data.message ?? `HTTP ${res.status}`;
      }
      return { ok: false, status: res.status, detail };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return {
      ok: false,
      status: 502,
      detail: err instanceof Error ? err.message : 'fetch error',
    };
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Rate limit por IP.
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  const last = recentByIp.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_WINDOW_MS) {
    return jsonResponse({ ok: false, error: 'Slow down, please.' }, 429);
  }
  recentByIp.set(ip, now);

  // Parse body.
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400);
  }

  if (!isValidEmail(body.email)) {
    return jsonResponse({ ok: false, error: 'Invalid email' }, 400);
  }

  const email = (body.email as string).trim().toLowerCase();
  const name = typeof body.name === 'string' && body.name.trim().length > 0 ? body.name.trim().slice(0, 80) : undefined;
  const source = typeof body.source === 'string' ? body.source.slice(0, 80) : 'unknown';

  // Setup mode: MailerLite no configurado. Devolvemos OK; el cliente
  // ya tiene fallback localStorage. No perdemos leads — solo no los
  // automatizamos hasta que el operador active la integracion.
  if (!env.MAILERLITE_API_KEY) {
    return jsonResponse({
      ok: true,
      mode: 'setup',
      note: 'MailerLite not configured yet; lead acknowledged client-side.',
      source,
    });
  }

  // Production mode: POST a MailerLite.
  const result = await postToMailerLite(
    env.MAILERLITE_API_KEY,
    email,
    name,
    env.MAILERLITE_GROUP_ID,
    source,
  );
  if (!result.ok) {
    // 5xx para que el cliente caiga al fallback localStorage sin perder el lead.
    return jsonResponse(
      { ok: false, error: 'Provider error', detail: result.detail },
      result.status >= 500 ? 502 : result.status,
    );
  }
  return jsonResponse({ ok: true, mode: 'mailerlite', source });
};

// Para que GET / OPTIONS no devuelvan 404 raro.
export const onRequestGet: PagesFunction<Env> = async () =>
  jsonResponse(
    { ok: false, error: 'Use POST with {email, name?, source?}' },
    405,
  );

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
