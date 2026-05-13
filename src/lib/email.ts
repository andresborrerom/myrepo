// Wrapper de Resend con fetch (sin SDK). Si RESEND_API_KEY no está,
// fallamos en silencio (no rompe la app, solo no manda email).
//
// Para verificar emails de dominio propio, hay que configurarlo en Resend.
// Mientras tanto usamos onboarding@resend.dev (válido en plan free).

const RESEND_API = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'Casa de Alejandro <onboarding@resend.dev>';

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[email] RESEND_API_KEY no configurado, salto envío.');
    return { ok: false, error: 'no api key' };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: opts.from || DEFAULT_FROM,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        reply_to: opts.replyTo
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[email] Resend error:', res.status, err);
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (e) {
    const msg = (e as Error).message;
    console.error('[email] Failed:', msg);
    return { ok: false, error: msg };
  }
}

// Plantilla simple: header clay + body. Mantén HTML mínimo para que
// pase filtros y se vea bien en iPhone Mail.
export function emailTemplate({
  title,
  body
}: { title: string; body: string }): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#FBF7F0;font-family:Georgia,'Times New Roman',serif;color:#241D17;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF7F0;padding:24px 12px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:16px;overflow:hidden;">
          <tr><td style="background:#B05F40;color:#FBF7F0;padding:20px 24px;">
            <p style="margin:0;font-size:12px;letter-spacing:1px;opacity:.85;">LA CASA DE ALEJANDRO</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;">${title}</h1>
          </td></tr>
          <tr><td style="padding:24px;font-size:16px;line-height:1.5;">${body}</td></tr>
          <tr><td style="padding:16px 24px 24px;font-size:12px;color:#3A2F26;opacity:.7;">
            casa-de-papa.vercel.app
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
