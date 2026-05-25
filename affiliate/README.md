# affiliate/ — portfolio de sitios afiliados

Carpeta paraguas para todos los sitios afiliados del operador (Andres Borrero).
Cada subcarpeta es un nicho independiente, replicable y desplegable por
separado.

## Estructura

```
affiliate/
├── README.md                   ← este archivo
├── CLAUDE.md                   ← protocolos cross-niche
├── SCAFFOLD.md                 ← cómo bootstrap un nicho nuevo
├── baristapath/                ← nicho 1: coffee equipment (live)
│   ├── site/                   ← código Astro
│   ├── docs/                   ← ADRs, runbooks
│   ├── progreso.md             ← single source of truth de timing
│   └── ...
├── filamentpath/               ← nicho 2: 3D printing (bootstrap)
└── courses-source/             ← cursos: MVPs y prompt generador (cross-niche)
```

## Principios

1. **Independencia entre nichos.** Cada subcarpeta tiene su propio
   `package.json`, su propio Astro config, su propio dominio, su propio
   pipeline Cloudflare Pages. Un bug en uno no rompe otros.
2. **Branding separado.** Para Google E-E-A-T cada sitio es un publisher
   distinto; nunca compartimos brand voice entre nichos.
3. **Template compartido vía replicación, no vía imports.** Cuando un
   componente probado en `baristapath` debe portarse a `filamentpath`,
   se copia (con generalización). Abstracciones vía package compartido
   se justifican solo cuando hay 3+ nichos sufriendo divergencia.
4. **Replicación automatizable.** `SCAFFOLD.md` documenta la receta
   manual; objetivo mediano plazo es un script `scaffold-niche.mjs` que
   genere el esqueleto inicial con un slug + brand voice.

## Estado del portfolio

| Nicho | Slug | Dominio | Estado | Pages live | Revenue |
|---|---|---|---|---|---|
| Coffee equipment | `baristapath` | baristapath.com | Live (Gates 1+2+5 ✅) | 268 | $0 (pre-3-sales) |
| 3D printing (FDM) | `filamentpath` | filamentpath.com (pending registro) | Bootstrap | 0 | n/a |

## Cross-niche docs

- `CLAUDE.md` — protocolos que aplican a todos los nichos.
- `SCAFFOLD.md` — receta para bootstrap nuevo nicho.
- `courses-source/` — material para business de cursos derivado de MVPs
  del operador. Es cross-niche por naturaleza (los MVPs no son
  exclusivos de un nicho afiliado).

## Por qué `affiliate/` y no `amazon-resale-project/`

Decisión 2026-05-24 del operador: el modelo de negocio se replica por
nicho. Renombrar de un proyecto único a un paraguas refleja la
estrategia real (1 sitio probado + N réplicas).
