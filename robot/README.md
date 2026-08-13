# robot/

> Herramienta de outreach para el portfolio afiliado. Scout automático de threads en Reddit + drafting con Claude + notificación via Telegram para aprobación manual. En v0: SOLO scout + draft + notify. Auto-post activa en v1 después de warmup manual del operador.

## Filosofía

**Robot draftea, operador decide, operador postea (v0) o robot postea con approval per-item (v1).** NO es un bot autónomo. Es un buscador + escritor asistente que respeta:

- **Reddit ToS**: cada post es user-authorized individualmente
- **Anti-gray-hat**: cero mass-posting, cero comments idénticos, cero sock puppets
- **User authority**: el operador es el humano detrás de cada post

## Estructura

```
robot/
├── README.md              # este archivo
├── package.json           # deps: snoowrap, node-telegram-bot-api, @anthropic-ai/sdk
├── config.mjs             # queries por sub, safety thresholds
├── scripts/
│   ├── reddit-scout.mjs   # busca threads matching queries
│   ├── draft-comment.mjs  # Claude API → genera draft
│   ├── telegram-notify.mjs # push a operador con approval buttons
│   └── pipeline.mjs       # scout → draft → notify end-to-end
├── prompts/
│   └── comment-draft.md   # prompt template para drafting
├── state/
│   └── seen-threads.json  # cache de threads ya procesados (dedup)
└── tests/
    └── ...                # local test con mock data
```

## Setup local (dev)

```bash
cd robot/
npm install
cp .env.example .env
# rellenar .env con tokens
npm run scout        # invoca pipeline una vez
```

## Setup prod (GitHub Actions)

Cron cada 1h de 8am-10pm Panamá (UTC-5). Ver `.github/workflows/reddit-scout.yml`.

Secrets requeridos en `github.com/andresborrerom/myrepo/settings/secrets/actions`:

| Secret | Descripción |
|---|---|
| `ANTHROPIC_API_KEY` | Para drafting con Claude |
| `TELEGRAM_BOT_TOKEN` | Bot creado con @BotFather |
| `TELEGRAM_CHAT_ID` | Chat ID del operador (donde llegan las notifs) |
| `REDDIT_CLIENT_ID` | De reddit.com/prefs/apps (script app) |
| `REDDIT_CLIENT_SECRET` | Idem |
| `REDDIT_USER_AGENT` | String tipo `baristapath-scout/1.0 by u/andresb_pty` |

## v0 → v1 → v2 roadmap

- **v0** (actual): scout + draft + notify. Operador copia/postea manual.
- **v1** (post-warmup Reddit del operador, semana 3+): agrega Reddit OAuth + CF Worker webhook para auto-post con approval per-item.
- **v2**: extiende a HN, LinkedIn, Twitter. Mismo pattern.

## Anti-anti-pattern

NO agregar (aunque sea "fácil"):
- Auto-voting (violates Reddit ToS)
- Cross-posting idéntico multi-sub (spam pattern)
- Draft caching que reuse text entre threads (loses uniqueness)
- Cualquier "shortcut" que evite approval per-item una vez v1 esté vivo
