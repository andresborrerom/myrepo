# SCAFFOLD.md — replicar un nicho desde un template probado

Esta receta describe cómo bootstrap un nuevo nicho `affiliate/<slug>/`
copiando estructura de uno ya validado (e.g. `baristapath/`). Es manual
hoy; el objetivo es convertirla en `scaffold-niche.mjs` cuando tengamos
2-3 réplicas hechas y el patrón sea estable.

## Pre-requisitos

- Nicho aprobado vía ADR (e.g. ADR 0005 para 3D printing).
- Operador registró dominio.
- Decisión sobre sub-nicho de entrada documentada.

## Receta manual (replicar de `baristapath` → `<nuevo-slug>`)

### Paso 1: copiar esqueleto Astro

```bash
cd affiliate/
cp -r baristapath/site <nuevo-slug>/site
cd <nuevo-slug>/site
rm -rf node_modules dist .astro
```

### Paso 2: re-brandear

Buscar y reemplazar (cuidado con falsos positivos en URLs externas):

| Buscar | Reemplazar por | Archivos típicos |
|---|---|---|
| `baristapath` | `<nuevo-slug>` | `astro.config.mjs`, `package.json`, `src/data/author.ts` |
| `Coffee Equipment Reviews` | `<Nuevo nombre de marca>` | `Base.astro`, `package.json description` |
| `baristapath79-20` | `<nuevo-tag>-20` (placeholder hasta Associates) | `src/data/affiliate.ts` o equivalente |
| `baristapath.com` | `<nuevo-dominio>.com` | canonicals, sitemap |

Verificar manualmente:
- `Base.astro` header/nav: enlaces y nav primaria del nicho viejo
- `index.astro` home: hero copy, secciones
- `methodology.astro`: copy específico del nicho
- `about.astro`: byline y bio del autor
- `privacy.astro`: dominio en disclosures

### Paso 3: vaciar content collections

```bash
rm -rf src/content/products/*
rm -rf src/content/best/*
rm -rf src/content/compare/*
rm -rf src/content/reviews/*
rm -rf src/content/howto/*
rm -rf src/content/troubleshoot/*
rm -rf src/content/glossary/*
rm -rf src/content/brands/*
rm -rf src/content/categories/*
rm -rf src/content/guides/*
```

Mantener los `.schema.ts` (estructura) pero ajustarlos a los specs del
nuevo nicho. Para 3D printing por ejemplo, el schema de `products/`
necesita campos como `buildVolume`, `xyResolution`, `layerHeight`,
`bedTemperature` en lugar de `boilerCapacity`, `pumpPressure`,
`grinderType`.

### Paso 4: replicar docs

```bash
mkdir -p ../<nuevo-slug>/docs/decisions
cp ../baristapath/docs/glosario.md ../<nuevo-slug>/docs/glosario.md  # vaciar entradas específicas
cp ../baristapath/docs/methodology.md ../<nuevo-slug>/docs/methodology.md  # adaptar metodología review
```

ADRs específicos del nuevo nicho se redactan desde cero (no copy-paste
de baristapath ADRs).

### Paso 5: progreso.md inicial

```bash
cp ../baristapath/progreso.md ../<nuevo-slug>/progreso.md
```

Limpiar: eliminar todo el historial específico de coffee. Mantener
estructura (hito actual / próximo / bloqueadores / cronograma / historial
vacío).

### Paso 6: workflow CI

Agregar a `.github/workflows/site-build.yml` un segundo job (o duplicar
el workflow):

```yaml
- 'affiliate/<nuevo-slug>/site/**'
```

Cuando tengamos 3+ nichos, refactorizar a workflow paramétrico con matrix.

### Paso 7: CLAUDE.md específico (opcional)

Si el nicho tiene reglas específicas (e.g. resin requires safety
disclaimers stronger than coffee), crear `affiliate/<nuevo-slug>/CLAUDE.md`
con override del cross-niche `affiliate/CLAUDE.md`.

### Paso 8: deploy

Operador:
- Cloudflare Pages → New Project → mismo repo, root directory
  `affiliate/<nuevo-slug>/site`, build command `npm run build`, output
  `dist`.
- Conectar dominio custom.
- Email Routing si quiere subdomain emails.

### Paso 9: validaciones de nicho (replicar protocolo coffee)

- #20 Volúmenes Ubersuggest en queries top 20 del nicho.
- #21 allintitle KGR en 10 queries seed.
- Si verde: bootstrap content batch 1 (50 mock products + 10 best-of +
  10 compare).

## Checklist de validación pre-launch

- [ ] `npm run build` verde
- [ ] `npm test` verde
- [ ] Workflow CI configurado
- [ ] Dominio conectado a Cloudflare Pages
- [ ] sitemap.xml accesible en `<dominio>/sitemap-index.xml`
- [ ] robots.txt en modo `Allow` (no `Disallow` como template)
- [ ] Reemplazado afilliate tag con el real (o placeholder explícito)
- [ ] Author bio + about page específicos del nicho (no copy-paste)
- [ ] Privacy + methodology pages con dominio correcto
- [ ] Anti-gray-hat review pass sobre 5 sample reviews

## Diferencias intencionales por nicho

Documentar en cada ADR de nicho qué se aparta del template baristapath y
por qué. Esto guía la futura abstracción.

| Aspecto | `baristapath` | `filamentpath` (planeado) | Razón divergencia |
|---|---|---|---|
| Specs table fields | brewer-specific | printer-specific | Nicho distinto |
| Calculator | cost-per-cup | cost-per-print | Calculator del nicho |
| Quiz | "which espresso machine" | "which 3D printer" | Quiz del nicho |
| Lead magnet | Espresso setup guide PDF | Filament starter guide PDF | Magnet del nicho |
| Direct programs | n/a (coffee mfr's no tienen) | Bambu, Creality, Anycubic | Disponibilidad direct |

## Roadmap del scaffold automatizable

| Versión | Cuándo | Qué automatiza |
|---|---|---|
| v0 (manual) | Hoy | Esta receta + checklist humano |
| v1 (script básico) | Cuando filamentpath valide nicho (mes 3-4) | `scaffold-niche.mjs <slug>` que copia esqueleto + re-brandea + abre PR con TODOs |
| v2 (agente) | Cuando tengamos 3+ nichos vivos | Claude Code Agent que bootstrap nicho dado ADR aprobada, despacha research, abre issues con tareas operador |
| v3 (full) | Visión: cualquier persona puede pedir nicho nuevo | UI o CLI → agente → sitio live en 24-48h con validaciones automáticas |

## Anti-anti-pattern

NO replicar contenido literal entre nichos. Los SEO algos detectan
duplicados cross-domain. Replicamos estructura, no copy. Cada nicho
escribe sus propias FAQs, comparaciones, methodology page, etc.
