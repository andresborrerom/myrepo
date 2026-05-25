# Coffee Equipment Reviews — Astro Site

Programmatic SEO site for home coffee equipment (espresso machines, grinders,
pour-over brewers). Built with Astro 5, content collections, and a static
Cloudflare Pages target. See `affiliate/baristapath/docs/decisions/0004-stack-tecnico.md`
for the full architectural rationale.

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
│   │   └── products/           # 50+ product .md files (mock ASINs)
│   ├── layouts/
│   │   └── Base.astro          # <head>, header, footer, JSON-LD plumbing
│   ├── pages/
│   │   ├── index.astro         # Home: latest reviews, featured products, links
│   │   ├── products/[asin].astro    # Single product review
│   │   ├── best/[slug].astro        # "Best X under $Y" buying guides
│   │   └── compare/[slug].astro     # "A vs B" head-to-heads
│   └── styles/
│       └── global.css          # Vanilla CSS, mobile-first, dark-mode aware
└── README.md
```

### Content model

Each product is a Markdown file in `src/content/products/<slug>.md` with
frontmatter validated by `src/content/config.ts`. Required fields include
`asin`, `name`, `brand`, `type` (espresso-machine | grinder | accessory |
brewer), `price`, `price_tier`, `features` (object), `pros`, `cons`, `tags`,
`best_for`, and `updated_at`.

`features` is intentionally loose (record of string/number/boolean) because
spec keys vary by product type — espresso machines have `boiler_type`,
grinders have `burr_type` and `burr_size_mm`, etc.

### Adding a best-of page

Append an entry to the `pages` array in `src/pages/best/[slug].astro`. The
filter function and sort comparator drive selection from the products
collection.

### Adding a comparison page

Append an entry to the `comparisons` array in `src/pages/compare/[slug].astro`.
References use ASIN to stay stable across slug changes.

## Month-1 TODO list

The bootstrap is intentionally minimal. Items below need to land before the
site is production-ready:

- [ ] Choose and register the production domain (replace `https://example.com`
      in `astro.config.mjs`).
- [ ] Stand up Cloudflare Pages project pointed at the chosen domain.
- [ ] Generate Cloudflare Web Analytics token and replace the commented
      snippet in `src/layouts/Base.astro` (search "TODO: add Cloudflare Web
      Analytics").
- [ ] Apply to Amazon Associates, wait for approval, then replace
      `PLACEHOLDER-20` with the production tracking ID. Tag appears in
      `src/pages/products/[asin].astro`, `src/pages/best/[slug].astro`,
      `src/pages/compare/[slug].astro`, and `src/pages/index.astro` — a
      single grep-and-replace catches all of them.
- [ ] Validate Associates disclosure language matches latest Amazon
      operating agreement requirements (footer copy in
      `src/layouts/Base.astro`).
- [ ] Move from mock ASIN data to Keepa-sourced data (ADR 0004 mes 2): add
      a build-time fetcher that refreshes `price`, `image_url`, and
      availability per ASIN.
- [ ] Add OG image generation per product (currently uses `image_url` or
      falls back to no image).
- [ ] Add robots.txt and verify generated sitemap.
- [ ] Add a 404 page and verify Cloudflare's static-site 404 behavior.
- [ ] Run Lighthouse / PageSpeed audit; address any CWV issues.
- [x] Decided to stay in monorepo under `affiliate/baristapath/` (2026-05-24);
      umbrella `affiliate/` hosts replicas for additional niches.

## Notes on mock data

All 50+ product entries use realistic specs and editorial copy based on
public knowledge of each product. ASINs and prices are mock — they may
not match current Amazon listings. They serve as scaffolding for templates,
schema validation, and SEO structure. Real ASIN + price data ingestion is
ADR 0004 phase 2 work (Keepa integration).
