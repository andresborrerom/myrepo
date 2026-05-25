# Automation gap map — spawn de sitio afiliado end-to-end

> Fecha: 2026-05-24
> Autor: research agent (Claude Code)
> Contexto: receta manual actual en `affiliate/SCAFFOLD.md` (v0). Este doc mapea
> qué pasos se pueden automatizar vía API oficial y dónde están los muros
> (TOS, KYC, ausencia de endpoint).
> Scope: solo APIs oficiales y rutas legitimadas. Anti-gray-hat estricto
> (sin captcha solvers, sin scraping de paneles, sin multi-cuenta).
> Verticales objetivo: Amazon Associates US, sitios Astro estáticos en CF Pages.

---

## 1. Tabla resumen — 17 pasos

Leyenda:
- **API**: ✅ existe API oficial / ⚠️ existe pero con limitaciones serias / ❌ no hay API
- **Auth**: token/key, OAuth, service account
- **Reversible**: ✅ se puede deshacer sin costo ni rastro / ⚠️ deshacer cuesta dinero o tiempo / ❌ acción irreversible
- **Blast radius**: low (afecta un solo nicho) / med (afecta cuenta) / high (afecta la cuenta del operador y reputación cross-plataforma)
- **TOS-safe**: ✅ explícitamente permitido / ⚠️ zona gris / ❌ prohibido o muy arriesgado
- **Esfuerzo h**: horas estimadas para integración productiva (no PoC), incluye manejo de errores y secrets

| # | Paso | API | Auth | Reversible | Blast radius | TOS-safe | Esfuerzo h |
|---|---|---|---|---|---|---|---|
| 1 | Registro de dominio | ✅ Cloudflare Registrar API (beta abril 2026) | API token | ❌ (no refund post-registro, $9-12/dom) | med | ✅ | 4-6 |
| 2 | DNS setup | ✅ Cloudflare DNS API | API token | ✅ | low | ✅ | 2-3 |
| 3 | SSL/TLS provisioning | ✅ Universal SSL automático + API verification | API token | ✅ | low | ✅ | 1-2 |
| 4 | Crear Pages project + conectar repo | ✅ CF Pages API + GitHub OAuth instalado | API token + GH App | ✅ (delete project) | low | ✅ | 4-6 |
| 5 | Build settings programáticos | ✅ CF Pages API (build_config en project create) | API token | ✅ | low | ✅ | 1-2 |
| 6 | Email Routing | ✅ Cloudflare Email Routing Rules API | API token | ✅ | low | ✅ | 2-3 |
| 7 | ConvertKit/Kit setup | ✅ Kit API v4 (forms, broadcasts, subscribers) | API key (personal) o OAuth | ✅ | low | ✅ | 3-5 |
| 8 | Search Console — submit sitemap | ✅ Search Console API v3 (sitemaps.submit) | OAuth o service account | ✅ | low | ✅ | 2-3 |
| 9 | Search Console — verificar dominio | ⚠️ Site Verification API + DNS TXT vía CF DNS API | OAuth + CF token | ✅ | low | ✅ | 3-5 |
| 10 | Amazon Associates — alta de site nuevo | ❌ Solo UI; agregar site a cuenta existente vía UI | n/a | ⚠️ (remover site sí, cuenta no) | **high** | ⚠️ ver red flags | n/a (manual) |
| 11 | Amazon PA-API / Creators API | ⚠️ API existe pero requiere 3 ventas/180d para activar y 3/30d para mantener | Creators API credentials | ✅ (rotar keys) | med | ✅ siempre que tag esté aprobado | 6-10 |
| 12 | Generación de contenido (Anthropic) | ✅ Messages + Batch API | API key | ✅ | low | ✅ (pero Amazon banea AI puro sin valor) | ya integrado |
| 13 | Generación de imágenes (logos, OG) | ✅ Replicate API (FLUX schnell/dev/pro) | API token | ✅ | low | ✅ (no usar para fakear product shots) | 3-5 |
| 14 | Indexing acceleration | ✅ IndexNow (Bing/Yandex/Naver/Seznam); ❌ Google | key file en root + POST | ✅ | low | ✅ | 1-2 |
| 15 | Cloudflare Web Analytics | ✅ GraphQL Analytics API | API token con Analytics:Read | ✅ | low | ✅ | 2-4 |
| 16 | SEO data (validación nicho) | ✅ DataForSEO PAYG; ⚠️ Ahrefs/Semrush $500+/mes | API key | ✅ | low | ✅ | 4-6 (DataForSEO) |
| 17 | Stripe Connect / vender productos | ✅ Connect API (Standard/Express/Custom) | secret key + OAuth | ⚠️ (cuenta queda) | med | ✅ | 12-20 (KYC del operador es one-time) |

**Subtotal estimado**: ~50-80h de integración para automatizar los 14 verde-luz.

---

## 2. Detalle por paso

### 1. Registro de dominio — Cloudflare Registrar API

**API**: ✅ Beta lanzada abril 2026. Tres acciones core: `search`, `check`, `register`.
- Endpoint base: `https://api.cloudflare.com/client/v4/registrar/...`
- Doc: https://developers.cloudflare.com/registrar/registrar-api/
- Blog anuncio: https://blog.cloudflare.com/registrar-api-beta/
- Changelog: https://developers.cloudflare.com/changelog/post/2026-04-15-registrar-api-beta/

**Auth**: API token con permiso `Registrar:Write` + Account ID + billing profile con payment method por default.

**Pricing**: Cloudflare vende a wholesale ($9-12/año típico para `.com`). Sin upsells.

**Reversibilidad**: ❌ Una vez registrado, no hay refund. Aunque transferís fuera de CF, perdés el monto pagado.

**Comportamiento**: Sync típicamente; si tarda, devuelve `202 Accepted` con workflow URL para polling.

**Ejemplo (curl)**:
```bash
# Buscar disponibilidad
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains/filamentpath.com/availability" \
  -H "Authorization: Bearer $CF_TOKEN"

# Registrar (post billing profile setup)
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"filamentpath.com","period":1,"privacy":true}'
```

**Bloqueadores**: ninguno técnico. El gate único es la billing profile en CF (one-time setup operador). Como es beta, monitorear cambios de schema.

**Esfuerzo**: 4-6h (incluye dry-run, manejo de errores, idempotencia para no doble-registrar).

---

### 2. DNS setup — Cloudflare DNS API

**API**: ✅ Endpoint `POST /zones/{zone_id}/dns_records`.
- Doc: https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/

**Auth**: API token con `Zone:DNS:Edit` scope-limitado al zone del dominio.

**Rate limits**: 1200 requests / 5 min por user. Para spawn de 1 sitio, 5-10 records → no problema.

**Reversibilidad**: ✅ DELETE record es trivial.

**Ejemplo**:
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"CNAME","name":"www","content":"filamentpath.pages.dev","proxied":true,"ttl":1}'
```

**Notas**: cuando registrás el dominio vía Registrar API, el zone se crea automático en la misma cuenta. No hace falta nameserver swap.

**Esfuerzo**: 2-3h.

---

### 3. SSL/TLS provisioning — Universal SSL automático

**API**: ✅ Universal SSL se provisiona automáticamente al activar un zone. Endpoints disponibles:
- `GET /zones/{zone_id}/ssl/universal/settings` — verificar estado
- `PATCH /zones/{zone_id}/ssl/verification` — forzar re-validación
- Doc: https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/

**Detalles**: cert válido 90 días, auto-renueva 30 días antes de expirar. Cubre apex + first-level subdomains. Provisión en 15min-24h post zone activation.

**Reversibilidad**: ✅ Se puede deshabilitar Universal SSL via API. Recomendado: dejar prendido.

**Bloqueadores**: si el dominio tiene CAA records de otra CA, falla. Como nosotros lo registramos vía CF, no aplica.

**Esfuerzo**: 1-2h (mayormente polling + verificación).

---

### 4. Crear proyecto en Cloudflare Pages + conectar repo GitHub

**API**: ✅ `POST /accounts/{account_id}/pages/projects`. Soporta `source.type=github` con `owner` + `repo_name`.
- Doc principal: https://developers.cloudflare.com/api/operations/pages-project-create-project
- Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/

**Auth**: API token con `Pages:Edit`. Además: **la app de GitHub de Cloudflare Pages debe estar instalada en la cuenta/org del repo** — esto es UI step, se hace una vez por operador (no por proyecto).

**Ejemplo**:
```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"filamentpath",
    "production_branch":"main",
    "source":{
      "type":"github",
      "config":{"owner":"andresborrerom","repo_name":"myrepo","production_branch":"main","deployments_enabled":true}
    },
    "build_config":{
      "build_command":"cd affiliate/filamentpath/site && npm ci && npm run build",
      "destination_dir":"affiliate/filamentpath/site/dist",
      "root_dir":""
    }
  }'
```

**Reversibilidad**: ✅ DELETE project. Sitio queda vivo en `.pages.dev` hasta el delete propagation (~1 min).

**Bloqueadores**:
- GitHub App de CF Pages debe estar instalada **una vez** por operador (manual UI).
- El repo debe tener al menos un commit en `production_branch`.

**Esfuerzo**: 4-6h (incluye conectar custom domain, retries de webhook propagation).

---

### 5. Build settings programáticos

Cubierto en paso 4 vía `build_config`. **Env vars** se setean en paso separado:

- Endpoint: `PATCH /accounts/{account_id}/pages/projects/{project_name}` con `deployment_configs.production.env_vars`.
- Doc: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Comunidad confirmando endpoint para env vars: https://community.cloudflare.com/t/create-environment-variables-by-api-for-pages-workers/407352

Para secretos (ConvertKit API key, Anthropic key), usar `type: "secret_text"` (encrypted at rest).

**Esfuerzo**: 1-2h (incremental sobre paso 4).

---

### 6. Email Routing — subdomain emails

**API**: ✅ Email Routing Rules API.
- Doc: https://developers.cloudflare.com/api/resources/email_routing/subresources/rules/methods/create/
- SDK Node: `client.emailRouting.rules.create({ zone_id, actions: [{type:'forward', value:['ops@operador.com']}], matchers: [{type:'literal', field:'to', value:'hi@filamentpath.com'}] })`

**Auth**: API token con `Email Routing:Edit`.

**Pre-requisito**: enable Email Routing en el zone (one-time, hay endpoint `POST /zones/{zone_id}/email/routing/enable`).

**Reversibilidad**: ✅ Rules y addresses se borran sin costo.

**KYC**: el destination address (el email del operador) requiere verificación por email (link click). Es un mail one-time al operador, no recurring friction.

**Esfuerzo**: 2-3h.

---

### 7. ConvertKit / Kit API v4

**API**: ✅ v4 lanzada. Base URL `https://api.kit.com/v4/`.
- Doc: https://developers.kit.com/v4
- Endpoint clave (suscribir + agregar a form): `POST /v4/forms/{form_id}/subscribers/{id}` con header `X-Kit-Api-Key: <key>`.
- Crear formularios: hay endpoints para listar y crear forms; ver Forms API en docs.

**Auth**: API key (personal account, simple). OAuth para apps multi-tenant — para nuestro caso, key personal alcanza.

**Free tier**: hasta 10,000 suscriptores. Sin costo de API.

**Reversibilidad**: ✅ Forms, broadcasts y subscribers se pueden borrar via API.

**Notas**: El subscriber debe existir antes de agregar a form (dos calls: `POST /v4/subscribers` luego `POST /v4/forms/{id}/subscribers/{id}`). Double-opt-in se controla per-form.

**Esfuerzo**: 3-5h (incluye templating del welcome + secuencia educativa desde `affiliate/baristapath/docs/email-strategy.md`).

---

### 8. Google Search Console — submit sitemap

**API**: ✅ Search Console API v3.
- Endpoint: `PUT https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}`
- Doc: https://developers.google.com/webmaster-tools/v1/sitemaps/submit
- Scope OAuth: `https://www.googleapis.com/auth/webmasters`

**Auth**: OAuth (preferido para cuenta del operador) o service account (más limpio para automatización; requiere agregar la service account email como user de la property en Search Console — paso UI one-time).

**Ejemplo (Python)**:
```python
# Submitir sitemap a una property ya verificada
from googleapiclient.discovery import build
service = build('searchconsole', 'v1', credentials=creds)
service.sitemaps().submit(
    siteUrl='https://filamentpath.com/',
    feedpath='https://filamentpath.com/sitemap-index.xml'
).execute()
```

**Reversibilidad**: ✅ `sitemaps().delete()` existe.

**Esfuerzo**: 2-3h (OAuth flow + service account setup es lo que más toma).

---

### 9. Search Console — verificación de dominio (DNS TXT)

**API**: ⚠️ Google Site Verification API.
- Doc: https://developers.google.com/site-verification
- Combina con paso 2 (CF DNS API) para crear el TXT record.

**Flow automatizado**:
1. `webResource.getToken()` con `verificationMethod: "DNS_TXT"` → devuelve el token (`google-site-verification=<hash>`).
2. POST a CF DNS API: crear TXT record en `_dns-only` o `@` con `content=<token>`.
3. Esperar propagación (5-30 min típico cuando CF maneja ambos lados).
4. `webResource.insert()` con `verificationMethod: "DNS_TXT"` → Google chequea y registra ownership.

**Auth**: OAuth user-context (la verification se asocia a un Google user, no a service account; podés agregar service accounts como **owners** después, pero la verificación inicial requiere user OAuth).

**Bloqueador suave**: la API requiere OAuth interactivo la **primera vez por nuevo Google account**. Para sites adicionales en la misma cuenta, el refresh token persiste. Conclusion: one-time setup operador por cuenta Google, no por sitio.

**Esfuerzo**: 3-5h.

---

### 10. Amazon Associates — registro de site nuevo

**API**: ❌ **No existe API para registrarse en Associates ni para agregar sites.**

**Realidad**:
- El alta inicial al programa es UI con tax interview + review humana de Amazon. Una vez.
- **Agregar sites adicionales a una cuenta ya aprobada**: vía UI en Associates Central → Account Settings → Manage Your Tracking IDs → Add Website. **No hay endpoint público.**
- Cada site puede tener su propio tracking ID (`baristapath79-20`, `filamentpath79-20`, etc.) bajo la misma cuenta.

**TOS — multiple sites**:
- Amazon **permite** múltiples sites bajo una sola Associates account. Cada uno declarado.
- **Prohibido**: múltiples Associates accounts del mismo operador. **Esto sí es ban.**
- Update abril 2026 del operating agreement: prohibido "earning commissions through multiple programs on the same traffic" — apunta a cross-network attribution, no a multi-site. Re-leer cuando se active el segundo nicho.
- Fuente: https://affiliate-program.amazon.com/help/operating/compare

**Bloqueador real**: agregar site nuevo requiere ~10 min UI del operador. **No automatizable**, pero es one-time-per-niche, no recurring.

**Red flag**: cada site nuevo declarado puede gatillar una mini-review por parte de Amazon (no siempre). Si el site está mock-data-only sin tráfico real, no agregarlo todavía — esperar a tener 10-15 posts originales + privacy policy + disclosure visible.

**Esfuerzo**: n/a (manual operador, ~10 min/nicho).

---

### 11. Amazon Product Advertising API / Creators API

**API**: ⚠️ Existe pero con gates.
- PA-API 5.0 deprecada **15 mayo 2026**. Migrar a **Creators API**.
- Doc PA-API legacy: https://webservices.amazon.com/paapi5/documentation/
- Creators API docs: https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction

**Requisitos para activar**:
- Cuenta Associates aprobada.
- **3 qualified sales** en los primeros 180 días post-aprobación (gate de elegibilidad inicial).
- **Mantenimiento**: necesitás generar 3 qualified sales en cada ventana de 30 días, sino la API se desactiva (no la cuenta — la API). Reactivar requiere generar 3 sales más vía SiteStripe links sin la API.
- Fuente: https://www.keywordrush.com/blog/amazon-pa-api-associatenoteligible-error-is-there-a-new-10-sales-rule/

**Auth Creators API**: credenciales nuevas creadas dentro de Associates Central → Creators API section. Las viejas AWS keys de PA-API **no sirven**.

**Rate limits**: PA-API era 8640 req/día por default + scaling con ventas. Creators API mantiene esquema similar (re-verificar al migrar).

**Reversibilidad**: ✅ rotar credentials no afecta la cuenta.

**TOS para automatización**: API calls deben identificarse correctamente en User-Agent (no impersonating browser). Datos no se pueden cachear más de 24h (excepto precios — 1h). Datos no se pueden mezclar con scraping.

**Esfuerzo**: 6-10h (autenticación SigV4-like + cache layer + manejo de rate limits + fallback cuando se desactiva por sales gap).

---

### 12. Generación de contenido — Anthropic API

**API**: ✅ Ya integrada en el stack.
- Messages API: https://platform.claude.com/docs/en/api/messages
- Batch API (50% descuento, async <24h): https://platform.claude.com/docs/en/build-with-claude/batch-processing

**Límites batch**: 100,000 requests o 256 MB por batch (lo que llegue primero). Output tokens hasta 300K por request en Opus 4.7 / Opus 4.6 / Sonnet 4.6.

**Pricing (mayo 2026)**: Sonnet 4.6 a $3/M input + $15/M output. Haiku 4.5 a $1/$5. Opus 4.7 a $5/$25. Batch al 50%.

**Estimación costo content batch**:
- 300 páginas × 800 tokens output promedio × Sonnet 4.6 batch ($7.5/M output) ≈ **$1.80 por sitio completo**.
- Con prompt caching agresivo (system prompt + glosario nicho + schema): otro 20-40% de ahorro.

**TOS Amazon**: cuidado con "AI-generated content sin valor agregado". Amazon ya banea esto en KDP y va para el mismo lado en Associates. **Mitigación**: cada review tiene methodology page citando criterios; cada howto referencia first-party experimentation. AI es draft + research, no publish-as-is.

**Esfuerzo**: 0h adicionales (ya integrado).

---

### 13. Generación de imágenes

**Need**: logos del nicho, OG images, hero shots no-Amazon. Product shots vienen de PA-API (CDN de Amazon, licencia uso afiliado).

**APIs candidatas**:

| Proveedor | Modelo | Precio | Latencia | Calidad logos | Calidad photoreal |
|---|---|---|---|---|---|
| Replicate | FLUX schnell | $0.003/img | 1-3s | media | media |
| Replicate | FLUX dev | $0.030/img | 5-10s | alta | alta |
| Replicate | FLUX pro | $0.055/img | 5-10s | alta | muy alta |
| OpenAI | DALL-E 3 / gpt-image-1 | $0.04-0.12/img | 5-15s | alta | alta |
| fal.ai | FLUX schnell | $0.005/img | <2s | media | media |

**Recomendación**: **Replicate FLUX dev** para logos (one-shot por nicho, calidad importa) + **FLUX schnell** para OG dinámicos si los hacemos (300 pages × $0.003 = $0.90/sitio).

- Replicate API doc: https://replicate.com/docs
- FLUX en Replicate: https://replicate.com/blog/flux-state-of-the-art-image-generation

**TOS**: ✅ Replicate FLUX dev tiene licencia commercial (verificar al integrar; FLUX `[dev]` está bajo non-commercial license en algunos contextos — usar FLUX `[schnell]` Apache 2.0 o FLUX `[pro]` commercial para safety legal).

**Red flag editorial**: **no usar AI para product shots fake** (eso es deceptive review = ban Amazon + ban editorial trust). Solo para brand identity y OG covers genéricas.

**Esfuerzo**: 3-5h.

---

### 14. Indexing acceleration

**IndexNow** (Bing, Yandex, Naver, Seznam, Yep):
- ✅ API pública gratis. Single endpoint: `https://api.indexnow.org/indexnow`.
- Doc: https://www.bing.com/indexnow/getstarted
- Setup: archivo `{key}.txt` en root del sitio con el key como contenido. POST con `host`, `key`, `urlList`.
- Sin rate limits agresivos (10,000 URLs/payload por submission, recomendado 100/min sostenido).

**Google**: ❌ No soporta IndexNow. Google Indexing API existe pero está **restringida a JobPosting + BroadcastEvent en VideoObject**.
- Doc: https://developers.google.com/search/apis/indexing-api/v3/using-api
- Usar la Indexing API para otro contenido viola TOS y Google explícitamente recomienda no hacerlo.

**Workaround legítimo para Google**: sitemap.xml bien estructurado + ping vía Search Console API + internal linking sólido + alta calidad de contenido. No hay "instant index" oficial.

**Ejemplo IndexNow**:
```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host":"filamentpath.com",
    "key":"<32-char-key>",
    "urlList":["https://filamentpath.com/best/best-fdm-printer-under-500/","https://filamentpath.com/howto/calibrate-bed-level/"]
  }'
```

**Esfuerzo**: 1-2h (hook al sitemap diff post-deploy).

---

### 15. Cloudflare Web Analytics

**API**: ✅ GraphQL Analytics API.
- Doc: https://developers.cloudflare.com/analytics/graphql-api/
- Endpoint: `POST https://api.cloudflare.com/client/v4/graphql`
- Datasets relevantes para Web Analytics: `rumPageloadEventsAdaptiveGroups`, `rumPerformanceEventsAdaptiveGroups`.

**Auth**: API token con `Account Analytics:Read`.

**Caveat**: la UI de Web Analytics y la GraphQL API divergen en algunos métricos (UI muestra datos agregados, GraphQL es row-level). Para nuestro use case (tracking de tráfico por nicho), GraphQL alcanza.

**Reversibilidad**: ✅ es read-only.

**Esfuerzo**: 2-4h (queries + dashboard interno).

---

### 16. SEO data — validación de nicho

**APIs candidatas**:

| Proveedor | Modelo de precio | Mínimo entrada | Costo por keyword |
|---|---|---|---|
| **DataForSEO** | PAYG | $50 deposit | $0.0006/SERP query, $0.05/1000 keyword volumes |
| Ahrefs | Suscripción + créditos | $500/mes (API addon) | 50-150 units/call |
| Semrush | Business plan + units | $500/mes + units sep. | 10K units por 1K keywords live |
| Ubersuggest free | UI only | $0 | n/a (no API real) |

**Recomendación**: **DataForSEO**. PAYG es el match natural para spawn de nichos (cargas $50 y validás 3-5 nichos antes de re-cargar).
- Doc: https://docs.dataforseo.com/
- Keywords Data API + DataForSEO Labs API cubren volumen, difficulty, SERP, related keywords.
- Implementar `allintitle` competition: usar SERP API con `query=allintitle:<keyword>` → contar resultados. Funciona, es lo que Ubersuggest hace internamente. Permitido por TOS (es una query de Google estándar, no scraping del SERP de UI).

**Esfuerzo**: 4-6h.

---

### 17. Stripe Connect — vender productos digitales / scaffold-as-service

**API**: ✅ Stripe Connect (API onboarding).
- Doc: https://docs.stripe.com/connect/api-onboarding
- Account types: Standard (Stripe Dashboard del seller), Express (custom UI parcial), Custom (full custom UI, max compliance burden).

**Auth**: secret key del platform account.

**KYC**:
- Para operador (platform): one-time. Requiere business info + tax ID + bank.
- Para sellers (si hacemos marketplace de scaffolds): por seller. Stripe maneja el KYC mediante hosted onboarding URL → seller completa, Stripe valida, seller recibe pagos.

**Reversibilidad**: ⚠️ Cuenta conectada se puede desactivar pero queda registrada en Stripe. Datos KYC no se borran (regulatorio).

**Bloqueador para operador en Panamá**: Stripe requiere business entity en jurisdicción soportada para platform accounts. **Panamá no está en la lista** de países Stripe en 2026 (verificar). Workarounds: US LLC + Mercury + Stripe (lo que el research de Panamá ya sugiere para el escenario "el proyecto escala").

**Alternativa para Fase 3 (vender eBook $29)**: Gumroad o LemonSqueezy. Ambos manejan tax/VAT compliance globalmente y aceptan operadores desde más jurisdicciones. **Recomendación: empezar con Gumroad** (lo que ya menciona `email-strategy.md`).

**Esfuerzo**: 12-20h si vamos directo a Stripe Connect (depende mucho de la estructura legal). 2-4h si usamos Gumroad como abstracción.

---

## 3. Red flags — TOS y zonas a evitar

### 3.1 Amazon Associates

- ❌ **Múltiples Associates accounts del mismo operador** = ban inmediato. Una cuenta, múltiples tracking IDs (uno por sitio).
- ❌ **AI content sin valor agregado** = ban. Cada page con AI debe tener review humano, methodology citation, o first-party data injection. Documentado en `affiliate/CLAUDE.md` anti-gray-hat.
- ❌ **Link cloaking / shorteners genéricos sobre Amazon links**. Usar SiteStripe links nativos.
- ❌ **Falta del disclosure "As an Amazon Associate I earn from qualifying purchases"** en cada page con afiliado links = warning → ban.
- ⚠️ **PA-API / Creators API: caching limits.** Datos no más de 24h, precios no más de 1h. Si nuestro sitio muestra precios stale, Amazon puede deactivar API access.
- ⚠️ **Site nuevo declarado**: cada site debe estar agregado a Associates antes de poner afilliate links. Plopear afiliate tags antes de declaración = riesgo de no atribución + posible flag.

### 3.2 Google

- ❌ **Indexing API para non-job/non-livestream content** = potencial pérdida de acceso a la API + degradación SEO. Confirmado por Google: https://www.seroundtable.com/google-indexing-api-unsupported-content-39470.html
- ⚠️ **Programmatic SEO masivo sin valor único** = sandboxing / no indexing. Mitigación: variar templates, agregar UGC-style data (quizzes results, calculators), evitar 300 pages con 90% mismo wording.

### 3.3 Cloudflare Registrar

- ⚠️ **API en beta** (abril 2026). Schemas pueden cambiar. Mantener tests de integración + ADR cuando se integre.

### 3.4 ConvertKit / Kit

- ⚠️ **Free tier vs commerce**. Si vendemos productos digitales desde la lista, free tier no tiene commerce nativo. Cuando se active venta, upgrade a paid o usar Gumroad como capa de commerce externa.
- ⚠️ **GDPR / double opt-in**. Para audiencia EU, opt-in confirmado es regulatorio. Habilitar en cada form.

### 3.5 Replicate / FLUX

- ⚠️ **FLUX `[dev]` license**. Lee fine print: en algunos contextos es non-commercial. Para uso comercial seguro: FLUX `[schnell]` (Apache 2.0) o FLUX `[pro]` (license commercial Black Forest Labs).
- ❌ **AI product shots fake** = ban Amazon + pérdida trust. No.

### 3.6 Stripe (operador Panamá)

- ❌ **Stripe no opera con business entities en Panamá** (verificar 2026). Bloqueador estructural si vamos directo Stripe. Workaround: US LLC o usar Gumroad/LemonSqueezy como abstracción.

---

## 4. Roadmap propuesto — qué automatizar primero

Orden por **ROI = utilidad relativa / esfuerzo de integración**, priorizando reducir el tiempo del operador en spawn de nicho nuevo.

### Tier 1 — Automatizar ya (week 1-2 del scaffold project)
**Justificación**: alto ROI, bajo esfuerzo, todos verde-luz TOS.

1. **#14 IndexNow** (1-2h, $0). Hook post-deploy que pingea sitemap diff a Bing/Yandex/Naver/Seznam. Funciona desde día 1 sin gates de Amazon.
2. **#3 SSL verification polling** (1-2h, $0). Después de paso 1+2, esperar SSL → green light para resto del pipeline.
3. **#5 Build settings programáticos** (1-2h, $0). Combinable con #4.
4. **#2 DNS records** (2-3h, $0). Operación atomic con #1.
5. **#6 Email Routing** (2-3h, $0). Subdomain emails para `hi@<nicho>.com` → forward operador.
6. **#8 Search Console sitemap submit** (2-3h, $0). Sumar a CI post-deploy.

**Subtotal Tier 1**: 9-15h, $0 ongoing, reduce ~2h de friction operador por nicho.

### Tier 2 — Automatizar cuando spawn 2do nicho (week 3-4)
**Justificación**: ROI bueno pero requieren OAuth flows / billing setup.

7. **#1 Cloudflare Registrar API** (4-6h, $10-12/dominio). One-time billing setup operador. Después, full auto.
8. **#4 CF Pages create project** (4-6h, $0). Requiere GitHub App instalada (one-time operador).
9. **#9 Search Console verify domain** (3-5h, $0). OAuth one-time.
10. **#7 ConvertKit / Kit forms + welcome** (3-5h, $0 free tier). Welcome email + secuencia educativa templatizada.
11. **#13 Image generation logos** (3-5h, $5-15/nicho una vez). Logo + 2-3 OG hero images.

**Subtotal Tier 2**: 17-27h, costos one-shot por nicho ~$15-30.

### Tier 3 — Automatizar cuando spawn 3er nicho o cuando validemos contenido AI (week 5-8)
**Justificación**: gates de Amazon (sales requirement) hacen que sea late-stage.

12. **#11 PA-API / Creators API integration** (6-10h, $0). Solo se activa post 3 sales/180d. Mientras tanto, contenido usa mock data.
13. **#16 DataForSEO** (4-6h, $50+ deposit). Validación nicho #20+#21 automatizable.
14. **#15 CF Web Analytics dashboard** (2-4h, $0). Para monitoring portfolio cross-nicho.

**Subtotal Tier 3**: 12-20h.

### Manual forever (o hasta API existir)
- **#10 Amazon Associates alta de site nuevo**: 10 min UI operador por nicho.
- Inicial alta a Associates: ya hecho una vez.
- Stripe Connect platform setup: hold hasta que tengamos estructura legal US.

### Total esfuerzo estimado
- **Tier 1 + 2**: 26-42h para tener un "spawn niche" semi-auto que requiere ~30 min de operador (Associates site add + OAuth aprobaciones one-time, ya cubiertas si es 2do nicho).
- **+Tier 3**: 38-62h totales para incluir PA-API + SEO data + analytics.

Comparado con receta manual actual de `affiliate/SCAFFOLD.md`: spawn de un nicho hoy lleva ~4-8h dispersas de operador (research dominio + UI clicks + copy-paste de IDs). Post-automation: ~30 min concentrados.

---

## 5. Mínimo viable orquestador — "spawn niche" end-to-end

Si construimos solo con APIs verde-luz (Tier 1 + Tier 2 + content + PA-API), el comando `npm run spawn-niche -- --slug=filamentpath` ejecutaría:

### Fase A — Bootstrap (auto, ~10 min)
1. Crear directorio `affiliate/filamentpath/` siguiendo SCAFFOLD.md pasos 1-7.
2. Generar logo + OG image vía Replicate FLUX dev (#13).
3. Commit + push branch `claude/scaffold-filamentpath`.
4. Open PR con TODOs para operador en description.

### Fase B — Infra (auto, ~15 min)
5. Cloudflare Registrar API: registrar `filamentpath.com` (#1). **Requiere billing profile y confirmación operador para el cargo $10-12** — gate explícito.
6. CF DNS API: setup records mínimos (apex, www CNAME a `.pages.dev`) (#2).
7. CF Pages API: crear project, conectar repo, set build config + env vars (#4 + #5).
8. Universal SSL polling hasta active (#3).
9. CF Email Routing: rule `hi@filamentpath.com` → operador (#6).
10. Google Site Verification API: token DNS_TXT (#9).
11. CF DNS API: insertar el TXT record.
12. Google Site Verification API: verify ownership (#9).
13. Search Console API: agregar property + submit sitemap (#8).

### Fase C — Content (auto, ~30 min para 100 pages, $5-15 en Anthropic)
14. Anthropic Batch API: generar 50 mock products + 10 best-of + 10 compare con schema del nicho (#12).
15. DataForSEO: validar volúmenes (#20 protocol) + KGR (#21 protocol) de keywords top (#16).
16. Si valida verde, generar batch 2 (50 más + howto + glossary).
17. Push content commits.
18. CF Pages auto-redeploy.

### Fase D — Monetización (auto, ~5 min)
19. ConvertKit/Kit API: crear form lead magnet + welcome email + secuencia 5 emails desde template (#7).
20. CF Pages env vars: set CONVERTKIT_FORM_ID + KEY (#5).

### Fase E — Indexing (auto, ~2 min)
21. IndexNow: ping todos los URLs del sitemap (#14).
22. Cloudflare Web Analytics: validar que el script está activo (#15).

### Fase F — Gate de operador (manual, ~30 min one-time por nicho)
- 🔴 **Operador**: agregar `filamentpath.com` como site en Associates Central → Manage Tracking IDs → Add Website (#10). Esperar approval (~horas-días).
- 🟡 **Operador**: review del PR + merge a main (~10 min).
- 🟡 **Operador**: validar logo y OG image generados (10 min).

### Fase G — Post-3-sales (auto cuando se desbloquee)
23. Cuando Associates report muestre 3 sales en 180d, ejecutar onboarding Creators API (#11).
24. Re-generar pages que usaban mock data con datos reales de PA-API.
25. Push + redeploy.

### Resumen quantitativo del orquestador

- **Tareas full auto**: 12 de las 14 originales (#1-#9, #11-#16; ver detalles arriba).
- **Tareas con setup-once operador**: GitHub App de CF Pages (one-time global), Search Console OAuth (one-time global), billing profile CF (one-time global), aprobación Site Add en Amazon (per nicho, ~10 min UI).
- **Bloqueadores TOS/API**: 1 (#10 Amazon Associates site add — no hay API). Aceptable porque es one-time por nicho.
- **Gate financiero por sales**: PA-API (#11) requiere 3 sales primero. No es bloqueador del spawn, sí del enrichment.

---

## 6. Conclusión y siguiente paso recomendado

El pipeline de spawn de nicho **es 85-90% automatizable** con APIs oficiales en 2026. El único muro estructural irreductible es el alta de site en Amazon Associates (10 min UI por nicho). PA-API tiene un gate de revenue pero no es bloqueador del spawn (funcionamos con mock data hasta validar).

**Siguiente paso operador**: revisar este doc y decidir si:
1. Implementamos Tier 1 ahora (semana actual, 9-15h) para reducir friction de filamentpath spawn.
2. Esperamos a baristapath generar las 3 sales primero y arrancamos con un scaffold completo end-to-end cuando tengamos PA-API live.
3. Atacamos por capas (Tier 1 primero → Tier 2 cuando filamentpath valide nicho).

Recomendación de Claude: **opción 3**. Tier 1 paga rápido en time saved sin tocar gates externos. Tier 2 alinea con el milestone de "filamentpath dominio registrado" que ya está en cola. Tier 3 espera la señal de sales reales de baristapath.

---

## 7. Fuentes consultadas

### Cloudflare
- [Cloudflare Registrar API beta announcement](https://blog.cloudflare.com/registrar-api-beta/)
- [Cloudflare Registrar docs](https://developers.cloudflare.com/registrar/)
- [Cloudflare Pages API operations](https://developers.cloudflare.com/api/operations/pages-project-create-project)
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Cloudflare DNS API](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/)
- [Cloudflare Email Routing Rules API](https://developers.cloudflare.com/api/resources/email_routing/subresources/rules/methods/create/)
- [Cloudflare Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/)
- [Cloudflare GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/)
- [Cloudflare Pages env vars](https://developers.cloudflare.com/pages/configuration/build-configuration/)

### ConvertKit / Kit
- [Kit API v4 intro](https://developers.kit.com/v4)
- [Kit add subscriber to form](https://developers.kit.com/api-reference/forms/add-subscriber-to-form)

### Google
- [Search Console API sitemaps.submit](https://developers.google.com/webmaster-tools/v1/sitemaps/submit)
- [Search Console API reference](https://developers.google.com/webmaster-tools/v1/api_reference_index)
- [Google Site Verification API](https://developers.google.com/site-verification)
- [Google Indexing API restrictions](https://developers.google.com/search/apis/indexing-api/v3/using-api)
- [Google reiterates: no Indexing API for non-supported content](https://www.seroundtable.com/google-indexing-api-unsupported-content-39470.html)

### Amazon
- [Amazon Associates Operating Agreement updates](https://affiliate-program.amazon.com/help/operating/compare)
- [PA-API 5.0 docs (deprecated May 2026)](https://webservices.amazon.com/paapi5/documentation/)
- [Creators API docs](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction)
- [Amazon PA-API AssociateNotEligible: 3 sales / 30 days](https://www.keywordrush.com/blog/amazon-pa-api-associatenoteligible-error-is-there-a-new-10-sales-rule/)
- [Amazon 2026 Creator API guide](https://logie.ai/news/amazons-2026-creator-api-guide/)

### Anthropic
- [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Claude batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

### Image generation
- [Replicate FLUX](https://replicate.com/blog/flux-state-of-the-art-image-generation)
- [Replicate pricing](https://replicate.com/pricing)

### Indexing
- [IndexNow get started (Bing)](https://www.bing.com/indexnow/getstarted)
- [Does Google support IndexNow (2026)](https://pressonify.ai/blog/indexnow-instant-indexing-press-releases-2026)

### SEO data
- [DataForSEO pricing](https://dataforseo.com/pricing)
- [DataForSEO complete guide 2026](https://nextgrowth.ai/dataforseo-api-guide/)
- [Ahrefs API pricing](https://upai.lat/blog/ahrefs-api-pricing)
- [Semrush API pricing](https://thatmarketingbuddy.com/blog/semrush-api-pricing)

### Stripe
- [Stripe Connect API onboarding](https://docs.stripe.com/connect/api-onboarding)
- [Stripe Connect overview](https://stripe.com/connect)

### Cross-reference interno
- `affiliate/SCAFFOLD.md` — receta manual v0
- `affiliate/baristapath/research/amazon-associates-from-panama.md` — alta inicial Associates desde Panamá
- `affiliate/baristapath/docs/deploy-setup.md` — pasos manuales actuales CF Pages
- `affiliate/baristapath/docs/email-strategy.md` — ConvertKit setup actual
- `affiliate/CLAUDE.md` — anti-gray-hat policy
