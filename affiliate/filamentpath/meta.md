# filamentpath — 3D printing affiliate site

**Estado:** Bootstrap (esqueleto no creado todavía)
**Aprobado en:** ADR 0005 (`affiliate/baristapath/docs/decisions/0005-segundo-nicho-3d-printing.md`)
**Fecha aprobación operador:** 2026-05-24

## Sub-nicho de entrada

**FDM-first** (filament printers + filamentos + accessories). Resin se
abre al mes 6 si los datos del nicho lo justifican.

## Dominio

`filamentpath.com` — pendiente registro por operador (~$10-14/año).

## Próximos pasos

1. Operador registra dominio `filamentpath.com` (10 min).
2. Operador me avisa para correr SCAFFOLD pasos 1-6 (replicar esqueleto
   de `baristapath/` → `filamentpath/`).
3. Agente bootstrap: 30-50 mock products (FDM printers + filaments +
   accessories) con schema 3D-printing-specific.
4. Validaciones de nicho (#20 volúmenes + #21 KGR).
5. Operador opera el printer Bambu A1 mini para reviews first-party (ver
   "Compra de printer" en `progreso.md` de operador).

## Compra de printer

Operador decidió comprar Bambu A1 mini (~$249) en junio 2026:
- Encaja con cumpleaños de su hijo
- Habilita reviews first-party desde week 1 del sitio
- Claude debe pedir al operador que la compre cuando el esqueleto del
  sitio esté listo y haya al menos 1 review page lista para llenar con
  first-party content.

Trigger: cuando `filamentpath/site/` esté deployado en CF Pages con
estructura mínima (no antes — capital justificado por evidencia).

## Diferencias intencionales vs baristapath

Documentadas en `SCAFFOLD.md` cross-niche. Resumen:
- Specs schema: build volume, XY res, layer height, bed temp, materials
- Calculator: cost-per-print (filamento + electricidad + tiempo)
- Quiz: which 3D printer (vs which espresso machine)
- Lead magnet: filament starter guide PDF
- Direct programs: Bambu Lab, Creality, Anycubic, Elegoo (a verificar
  términos cuando se active)

## Lo que NO copiar de baristapath

- Copy específico de coffee (about, methodology, FAQs)
- Brand voice "specialty coffee" → reemplazar por "maker/STEM hobbyist"
- Glosario coffee terms → glosario 3D printing terms
- Author bio que mencione coffee → bio que mencione background data
  scientist + maker hobbyist
