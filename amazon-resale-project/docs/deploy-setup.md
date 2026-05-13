# Deploy setup — Cloudflare Pages

> Status: sitio listo en `amazon-resale-project/site/`, build verificado en
> GitHub Actions (`.github/workflows/site-build.yml`). Pendiente: conectar
> Cloudflare Pages al repo (acción del operador, ~10-15 min).

---

## Por qué Cloudflare Pages (no Vercel ni Netlify)

Decidido en ADR 0004:

- Free tier con **bandwidth ilimitado** (único host serverless mainstream).
- **Compatible con uso comercial** (Vercel Hobby lo prohíbe; Netlify
  suspende al exceder 100 GB/mes).
- CDN global edge, latencia baja sin configurar.
- Integración nativa con Cloudflare Web Analytics (analytics primario
  del proyecto).

---

## Pasos del operador para el primer deploy (≈10-15 min)

1. **Crear cuenta Cloudflare** en `cloudflare.com` (gratis).
2. Dashboard → **Workers & Pages** → Create application → **Pages** →
   Connect to Git.
3. Autorizar GitHub, seleccionar el repo `andresborrerom/myrepo`.
4. **Configuración de build**:
   - Production branch: `claude/amazon-resale-project-t7o0P`
     (cambiamos a `main` cuando merge a main).
   - Framework preset: **Astro**.
   - Build command: `cd amazon-resale-project/site && npm ci && npm run build`
   - Build output directory: `amazon-resale-project/site/dist`
   - Root directory: dejar vacío (el comando ya hace `cd`).
   - Node version: 22 (en environment variables si CF no la detecta).
5. **Save and Deploy.** CF Pages buildea y entrega URL del tipo
   `<random-words>.pages.dev`.
6. **Postear la URL** en este doc + en el issue de tracking si abrimos
   uno, para tenerla a mano.

Tiempo estimado del primer build: 1-3 minutos.

---

## Estado de indexing

**Actualmente `public/robots.txt` bloquea TODO crawl** (`Disallow: /`).
Esto es a propósito — no queremos que Google indexe el sitio con
contenido mock antes de tener dominio final + datos reales + validaciones
verdes (#19, #20, #21).

### Cuándo flipar a "permitir indexing"

Cuando se cumplan estas 4 condiciones:

1. ✅ Validaciones #19, #20, #21 en verde (Kitchen ≥3%, volúmenes
   confirmados, KGR funciona).
2. ✅ Dominio final elegido y conectado a CF Pages.
3. ✅ Affiliate tag real reemplazado (post-aprobación Associates).
4. ✅ Al menos 50 páginas con datos reales (no mock) — implica Keepa
   mes 2 done.

### Cómo se flipa

1. Editar `amazon-resale-project/site/public/robots.txt`:

   ```
   User-agent: *
   Allow: /

   Sitemap: https://<dominio>/sitemap-index.xml
   ```
2. Editar `astro.config.mjs` → site URL al dominio final.
3. Push → CF Pages re-deploya automático.
4. Submitir el sitemap en **Google Search Console** + **Bing Webmaster
   Tools**.

---

## Custom domain

Cuando elijamos dominio (issue de research en curso → ver
`research/domain-shortlist.md` cuando esté):

1. Comprar dominio (recomendado: **Cloudflare Registrar** porque vende
   a wholesale y la integración con Pages es transparente).
2. CF Pages → Custom domains → Add. Si el dominio también está en
   Cloudflare, DNS se apunta automático.
3. Actualizar `astro.config.mjs` → `site: 'https://<dominio>'`.
4. Push → CF Pages re-deploya con canonical correcto.
5. Verificar 301 redirects de `.pages.dev` al dominio final si CF no
   lo hace automático.

---

## Secrets para configurar (cuando se activen)

GitHub Actions Secrets (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — solo si querés deploys vía wrangler desde GH
  Actions (alternativa a integración nativa CF Pages). No necesario al
  inicio.
- `CLOUDFLARE_ACCOUNT_ID` — idem.
- `PINTEREST_CLIENT_ID` / `PINTEREST_CLIENT_SECRET` — cuando Pinterest
  apruebe Standard API (issue #22).
- `KEEPA_API_KEY` — cuando suscribamos Keepa (mes 2).
- `AMAZON_ASSOCIATES_TAG` — cuando Amazon apruebe (mes 3-4).

---

## Validaciones post-deploy (≈10 min, una vez deployado)

- [ ] URL `.pages.dev` responde 200.
- [ ] Home renderiza productos del mock (no `undefined`, no errores).
- [ ] Una página de cada template carga: `/products/<asin>`,
  `/best/<slug>`, `/compare/<slug>`.
- [ ] 404 page (visita una URL inválida).
- [ ] `robots.txt` accesible y dice `Disallow: /`.
- [ ] `sitemap-index.xml` accesible (aunque no submitido a Google).
- [ ] JSON-LD valida en Google Rich Results Test (probar 3 templates).
- [ ] Mobile-friendly (Chrome DevTools mobile preview).

---

## Troubleshooting

**Build falla en CF Pages pero pasa local.** Suele ser Node version
mismatch. Forzar Node 22 en Environment variables (`NODE_VERSION=22`).

**Páginas muestran "undefined" en specs.** El schema de content
collections en `src/content/config.ts` no matchea el frontmatter de
algún `.md`. CF Pages debería abortar; si no, mirar `dist/` local.

**CF Pages no detecta el monorepo.** Asegurarse de que Root directory
está vacío en config y el build command usa `cd amazon-resale-project/site`.
