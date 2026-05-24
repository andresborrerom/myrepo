// Cloudflare Pages Function — /api/subscribe.
//
// Endpoint que el componente <EmailSignup> POSTea. Maneja dos modos:
//
//   1. ConvertKit configurado (production):
//      Si CONVERTKIT_API_KEY y CONVERTKIT_FORM_ID están en env vars,
//      hace POST a la API real de ConvertKit y devuelve 200 al cliente.
//
//   2. Setup mode (placeholder, mientras ConvertKit no esté configurado):
//      Devuelve 200 sin más — el componente cliente persiste el lead en
//      localStorage como fallback. Estos leads se pueden recoger después
//      cuando el operador active ConvertKit (ver docs/email-strategy.md).
//
// Anti-gray-hat (CLAUDE.md):
//   - Nunca compartimos el email con terceros fuera de ConvertKit.
//   - Validación strict de email antes de cualquier envío.
//   - Rate limit liviano (1 request por IP cada 10s) para evitar abuso.
//
// Bindings esperados en Cloudflare Pages settings:
//   - CONVERTKIT_API_KEY (Secret) — Account → API → V3 API Secret.
//   - CONVERTKIT_FORM_ID (Variable) — Forms → settings → Form ID.
//
// Static deploy: Astro static + Pages Functions coexisten. Pages Functions
// se buildean automáticamente desde el directorio /functions cuando se
// deploya a Cloudflare Pages.

interface Env {
  CONVERTKIT_API_KEY?: string;
  CONVERTKIT_FORM_ID?: string;
}

interface SubscribeBody {
  email?: unknown;
  name?: unknown;
  source?: unknown;
  ts?: unknown;
}

interface ConvertKitResponse {
  subscription?: { id: number };
  error?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit simple en memoria de la function instance. Cloudflare reinicia
// la instance frecuentemente — esto NO es un rate limit serio, solo cubre
// el caso obvio de doble-click o bot básico.
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

async function postToConvertKit(
  apiKey: string,
  formId: string,
  email: string,
  name?: string,
): Promise<{ ok: boolean; status: number; detail?: string }> {
  const url = `https://api.convertkit.com/v3/forms/${encodeURIComponent(formId)}/subscribe`;
  const payload: Record<string, unknown> = {
    api_key: apiKey,
    email,
  };
  if (name) payload.first_name = name;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as ConvertKitResponse;
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        detail: data.error ?? data.message ?? `HTTP ${res.status}`,
      };
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

  // Setup mode: ConvertKit no configurado. Devolvemos OK; el cliente
  // ya tiene fallback localStorage. No perdemos leads — solo no los
  // automatizamos hasta que el operador active la integración.
  if (!env.CONVERTKIT_API_KEY || !env.CONVERTKIT_FORM_ID) {
    return jsonResponse({
      ok: true,
      mode: 'setup',
      note: 'ConvertKit not configured yet; lead acknowledged client-side.',
      source,
    });
  }

  // Production mode: POST a ConvertKit.
  const result = await postToConvertKit(env.CONVERTKIT_API_KEY, env.CONVERTKIT_FORM_ID, email, name);
  if (!result.ok) {
    // 5xx para que el cliente caiga al fallback localStorage sin perder el lead.
    return jsonResponse(
      { ok: false, error: 'Provider error', detail: result.detail },
      result.status >= 500 ? 502 : result.status,
    );
  }
  return jsonResponse({ ok: true, mode: 'convertkit', source });
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
