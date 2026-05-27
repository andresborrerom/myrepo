# Arquitectura técnica del white-label

Decisiones técnicas heredadas del proyecto original + ajustes para multi-tenancy.

---

## Stack confirmado

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | Next.js 14 App Router | Server + Client components. Probado en producción. |
| Hosting | Vercel | Edge runtime, cron jobs, env vars, subdominios wildcard. |
| DB | Supabase Postgres | RLS, snapshots, esquemas claros, free tier amplio para MVP. |
| Storage | Supabase Storage | Para fotos/audio/video subidos. Prefijo por `gift_id`. |
| Auth | Cookies HTTP-only por gift instance | Una contraseña destinatario + familia + admin. Sin OAuth en MVP. |
| Push | Web Push + VAPID + service worker | iOS 16.4+ instalado como PWA. |
| Email | Resend | Para invitaciones y digests. |
| LLM auxiliar | Claude API | Sugerir títulos, corregir texto, generar paletas, traducir, dar feedback al comprador. |
| TTS/Voice clone | ElevenLabs (opcional, premium feature) | Para feature de "voz cruzada de idiomas" (ver feature de Valentina en el proyecto original). |

---

## Modelo multi-tenant

### Estrategia: una sola DB, todos los gifts comparten esquema

Cada tabla principal tiene un `gift_id UUID` que identifica la instancia. Indexar bien por `gift_id` para que las queries sean rápidas.

### Tablas principales

```sql
create table gifts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,            -- '<slug>.casarte.app'
  owner_email text not null,            -- el comprador
  recipient_name text not null,         -- "Alejandro"
  recipient_short text,                 -- "Papá"
  birth_date date not null,             -- 1951-05-21
  reveal_start date not null,           -- 2026-05-21 (cuándo arranca el ritual)
  reveal_days int not null default 75,  -- cuántos días dura el ritual
  palette_id text not null default 'hacienda', -- referencia a preset
  font_id text not null default 'fraunces',
  language text not null default 'es',
  status text not null default 'draft', -- 'draft' | 'live' | 'archived'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table gift_state (
  gift_id uuid primary key references gifts(id) on delete cascade,
  revealed_years int[] not null default '{}',
  last_reveal_date date,
  updated_at timestamptz not null default now()
);

create table family_members (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references gifts(id) on delete cascade,
  parent_id uuid references family_members(id) on delete set null,
  name text not null,
  short_name text,
  role text,                            -- 'patriarca' | 'hijo' | 'nieto' | 'cercano'
  birth_date date,
  photo_url text,
  color text,
  bio text,
  position int not null default 0
);

create table cartas (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references gifts(id) on delete cascade,
  year int not null,
  from_member_id uuid references family_members(id),
  title text,
  body text not null,
  audio_url text,
  status text not null default 'published',  -- 'published' | 'pending' | 'placeholder'
  created_at timestamptz not null default now()
);

create table tarjetas (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references gifts(id) on delete cascade,
  slug text not null,
  from_member_id uuid references family_members(id),
  data jsonb not null,                  -- {greeting, body, signoff, signature, song, coverImage, ...}
  position int not null default 0,
  created_at timestamptz not null default now(),
  unique (gift_id, slug)
);

create table aportes (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references gifts(id) on delete cascade,
  from_member_id uuid references family_members(id),
  on_behalf_of_id uuid references family_members(id),
  kind text not null,                   -- 'texto' | 'foto' | 'audio' | 'video' | 'carta' | 'foto-perfil'
  year int,
  title text,
  body text,
  media_url text,
  status text not null default 'published',
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table push_subscriptions (
  gift_id uuid not null references gifts(id) on delete cascade,
  endpoint text not null,
  subscription jsonb not null,
  recipient_only boolean not null default true,  -- solo el destinatario, no familia
  primary key (gift_id, endpoint)
);

-- Voice clones (premium feature)
create table voice_clones (
  member_id uuid primary key references family_members(id) on delete cascade,
  elevenlabs_voice_id text not null,
  reference_audio_url text,             -- sample original que usó
  created_at timestamptz not null default now()
);

-- Row-Level Security: cada gift solo es accesible con su contraseña
-- (gestionada vía cookies HTTP-only, no JWT)
alter table gifts enable row level security;
-- Etc para las demás tablas, con políticas que requieren la cookie correcta
```

### Routing: cómo se accede

Tres formas posibles (decidir):

**Opción A — Subdominios wildcard**:
- `<slug>.casarte.app` → cada gift su propio subdominio
- Pro: bonito de mostrar
- Contra: certificados wildcard, configuración DNS más compleja

**Opción B — Subdominios por path**:
- `casarte.app/g/<slug>` → todo bajo el dominio principal
- Pro: configuración simple
- Contra: menos sensación de "casa propia"

**Opción C — Dominios custom (premium)**:
- Tier white-glove: el comprador puede usar su propio dominio (ej. `papa-75.miapellido.com`)
- Vercel soporta dominios custom por proyecto

**Recomendación**: empezar con **B** para el MVP. Migrar a **A** cuando haya tráfico. Ofrecer **C** en white-glove.

---

## Sistema de paletas + tipografías

### Estructura

```ts
// data/palettes.ts
export const PALETTES = {
  hacienda: {
    name: 'Hacienda',
    sabana: '#E8DFC9',
    papel: '#F5EFE2',
    tinta: '#2A2018',
    cuero: '#8B4A2B',
    oro: '#B8924A',
    musgo: '#7A8567',
    motif: 'caballo'  // referencia a SVG en /motivos/
  },
  mediterraneo: {
    name: 'Mediterráneo',
    sabana: '#F0F4F8',
    papel: '#FAFCFD',
    tinta: '#1A2840',
    cuero: '#3A6FA8',
    oro: '#D4A24A',
    musgo: '#7A9E8E',
    motif: 'olivo'
  },
  // ... 3-5 presets
};

// data/fonts.ts
export const FONTS = {
  fraunces: { display: 'Fraunces', body: 'Source Serif 4', mono: 'JetBrains Mono' },
  playfair: { display: 'Playfair Display', body: 'Lora', mono: 'IBM Plex Mono' },
  // ...
};
```

### Aplicación a runtime

En lugar de Tailwind hardcoded, usar CSS custom properties que se setean por gift:

```tsx
// app/[gift_slug]/layout.tsx
const gift = await getGift(slug);
const palette = PALETTES[gift.palette_id];

return (
  <html style={{
    '--color-sabana': palette.sabana,
    '--color-cuero': palette.cuero,
    // ...
  }}>
    ...
  </html>
);
```

Tailwind config: usar `theme.extend.colors` que apunte a `var(--color-...)`.

---

## Wizard de creación

Flujo:

1. **Landing**: pitch + "Crear mi Casa"
2. **Email**: pide el email del comprador
3. **Quién es**: nombre completo del homenajeado + fecha de nacimiento + opcional foto
4. **Cuándo**: fecha de inicio del ritual (default = próximo cumpleaños), duración (default = años de vida hasta esa fecha)
5. **Cómo se ve**: selector de 3-5 paletas con preview
6. **Cómo se llama tu Casa**: slug (auto-sugerido desde el nombre)
7. **Invita a la familia**: lista de emails (opcional, se puede después)
8. **Listo**: link de admin + link público (vista del destinatario) + link de invitación familia
9. **Onboarding del editor**: 3-paso para sembrar la primera carta

---

## Sistema de feature flags por tier

```ts
// lib/tier.ts
export const TIERS = {
  free: {
    max_cartas: 30,
    max_contributors: 8,
    max_palette_presets: 5,
    custom_palette: false,
    custom_domain: false,
    voice_clones: 0,
    hosting_days: 90,
    branding_footer: true,
  },
  paid: {
    max_cartas: Infinity,
    max_contributors: Infinity,
    max_palette_presets: Infinity,
    custom_palette: true,
    custom_domain: false,
    voice_clones: 0,
    hosting_days: 365 * 5,
    branding_footer: false,
  },
  white_glove: {
    // todo de paid +
    custom_domain: true,
    voice_clones: 5,
    setup_assistance: true,
  },
};
```

Cada feature consulta `gift.tier_id` y aplica.

---

## Cron jobs

| Cron | Schedule (UTC) | Hace |
|---|---|---|
| `/api/cron/recordatorio` | `0 6 * * *` | Push a destinatarios con ritual activo |
| `/api/cron/digest` | `0 13 * * *` | Email digest a destinatarios con nuevos aportes |
| `/api/cron/cleanup` | `0 3 * * 0` | Borra gifts archivados, suscripciones expiradas |
| `/api/cron/billing-reminders` | `0 9 * * 1` | Notifica pagos pendientes |

---

## Feature opcional premium: voz cruzada de idiomas

Heredada del proyecto original (feature de Valentina). En el white-label es premium.

**Caso de uso**: una nieta angloparlante quiere mandar un mensaje a su abuelo hispanoparlante. La graba en inglés, la app lo entrega como audio en español con su voz clonada.

**Stack**:
1. Frontend: graba audio del contribuyente con `MediaRecorder`
2. Backend `/api/voice/translate`:
   - **Speech-to-text**: OpenAI Whisper API (inglés → texto inglés)
   - **Translate**: Claude API (`anthropic-sdk`) — inglés → español
   - **Voice clone + TTS**: ElevenLabs API — voz clonada del contribuyente leyendo el texto español
3. Storage: audio.mp3 final en Supabase Storage
4. Display: tarjeta para el destinatario con transcripción ES + audio ES

**Voice clone setup** (one-time por contribuyente):
- Subir 1-3 muestras de ~30 segundos hablando en su idioma nativo
- ElevenLabs Multilingual v2 puede usar muestras en cualquier idioma para clonar y luego sintetizar en cualquier otro
- Guardar `voice_id` en `voice_clones` table

**Costos ElevenLabs**:
- Creator plan: $22/mes — 100k chars/mes (~100 mensajes cortos)
- Pro plan: $99/mes — 500k chars/mes (~500 mensajes cortos)
- Voice clones: incluidos en Creator+

**Pricing implicación para white-label**: la feature de voz se cobra aparte (ej. +$30 por gift que activa Voice) o solo en tier white-glove.

---

## Internacionalización (i18n)

Decisión simple: empezar con `es` solo. Estructura preparada para añadir.

```
/locales/
  es.json
  en.json (futuro)
  pt.json (futuro)
```

```tsx
// lib/i18n.ts
const messages = await import(`@/locales/${gift.language}.json`);
```

Las cartas y aportes son **contenido subido por el usuario** — no se traducen, se muestran en el idioma original.

---

## Seguridad

- **Cookies HTTP-only** para auth (no JWT en localStorage)
- **RLS en Supabase** para que cada gift solo lea sus propios datos
- **Rate limiting** en endpoints sensibles (subscribe, reveal) — usar `@vercel/edge-rate-limit`
- **No exponer VAPID private** ni Supabase service role al cliente — solo en API routes
- **Borrado**: cuando un comprador pide borrar su gift, eliminar cascada todas las tablas + storage prefix

---

## Backup y migración

- Supabase: backups automáticos diarios (incluido en Free)
- Por gift: ofrecer "exportar como HTML estático" — descarga ZIP con todo el contenido visible offline para siempre. Es parte del valor (el regalo no se evapora si la app se cae)

---

## Posibles cambios al modelo original (decisiones a tomar)

- **¿Anonimar el ritual a uno por día?** Sí. Es la dinámica clave. Mantener.
- **¿Cartas con año vs cartas sin año?** Permitir ambas. Las con año entran al ritual aleatorio. Las sin año van al buzón.
- **¿Permitir más de un revelado por día?** No. Es lo que hace el ritual especial.
- **¿Permitir relectura siempre?** Sí. Las abiertas son tocables.
- **¿Sistema de árbol obligatorio?** No. Es opcional — algunas familias no tienen estructura genealógica relevante (parejas, amigos, etc.).
- **¿Reglas de placeholder?** Hereda del original: cartas con body que matchea `/^\[.*llenará esta carta\]$/i` no entran al pool.
