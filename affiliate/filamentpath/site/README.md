# FilamentPath — Astro Site

Programmatic SEO site for FDM 3D printing equipment (printers, filaments,
accessories). Built with Astro 5, content collections, and a static
Cloudflare Pages target. See `affiliate/baristapath/docs/decisions/0005-segundo-nicho-3d-printing.md`
for the niche rationale and `affiliate/SCAFFOLD.md` for how this skeleton
was generated from the baristapath template.

## Local development

Requires Node 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Dev server runs on `http://localhost:4321/`.

## Build

```bash
npm run build
```

Output goes to `dist/`. Sitemap is generated automatically (`dist/sitemap-index.xml`).

```bash
npm run preview
```

Preview the built static site locally.

## Structure

```
site/
├── astro.config.mjs            # Site URL, integrations (mdx, sitemap)
├── package.json
├── tsconfig.json
├── src/
│   ├── content/
│   │   ├── config.ts           # Zod schema for the `products` collection
│   │   └── products/           # Product .md/.mdx files (12 mock entries for Sub-sprint 1)
│   ├── layouts/
│   │   └── Base.astro          # <head>, header, footer, JSON-LD plumbing
│   ├── pages/
│   │   ├── index.astro         # Home: latest reviews + author strip + methodology banner
│   │   ├── products/[asin].astro    # Single product review (specs, pros, cons, FAQ)
│   │   ├── about.astro
│   │   ├── methodology.astro
│   │   ├── privacy.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css          # Vanilla CSS, mobile-first, dark-mode aware
└── README.md
```

### Content model

Each product is a Markdown/MDX file in `src/content/products/<slug>.md` with
frontmatter validated by `src/content/config.ts`. Required fields include
`asin`, `name`, `brand`, `type` (`printer` | `filament` | `accessory`),
`price`, `price_tier`, `features` (typed by product type), `pros`, `cons`,
`tags`, `best_for`, and `updated_at`.

The `features` schema is a typed union (printer / filament / accessory).
See `src/content/config.ts` for the exact fields per type.

## Sub-sprint status

Sub-sprint 1 (scaffold): done. 12 mock products, schema adapted, methodology
+ glossary rewritten for 3D printing context. ASINs are placeholders
(`FILAMOCK###`).

Sub-sprint 2 (KGR validations): operator-driven. Pending.

Sub-sprint 3 (content scale): pending KGR verde. Will add best-of, compare,
how-to, troubleshoot pages.

## Operator TODO before launch

- [ ] Cloudflare Pages project pointed at `affiliate/filamentpath/site/`,
      build command `npm run build`, output `dist`.
- [ ] Connect `filamentpath.com` domain.
- [ ] Configure Email Routing (`hello@filamentpath.com`).
- [ ] Generate Cloudflare Web Analytics token and replace the commented
      snippet in `src/layouts/Base.astro`.
- [ ] Decide on Amazon Associates tag (separate `filamentpath-20` or reuse
      `baristapath79-20`). Update `src/components/AffiliateButton.astro`.
- [ ] Replace `FILAMOCK###` placeholders with real ASINs after Associates
      approval.
- [ ] Run KGR validations (#20 + #21) before scaling content.

## Notes on mock data

The 12 product entries use realistic specs collected from manufacturer
public pages. ASINs (`FILAMOCK001`-`FILAMOCK012`) are placeholders. Real
ASIN + price data refresh is operator work after Associates approval.

Entries flagged with `TODO: verify spec` in frontmatter or body indicate
fields that need confirmation against an authoritative source before
launch.
