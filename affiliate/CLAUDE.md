# Instrucciones operativas — affiliate portfolio

Este archivo lo lee Claude cada vez que trabaja en cualquier subcarpeta de
`affiliate/`. Captura los protocolos cross-niche confirmados con el
operador. Si algo aquí queda obsoleto, se actualiza sin pedir permiso.

Cada nicho (e.g. `affiliate/baristapath/`) también tiene su propio
`CLAUDE.md` con protocolos específicos. Cuando hay conflicto, el más
específico gana.

## Inicio de sesión

Al inicio de cada sesión, Claude:

1. Identifica en qué nicho está trabajando (folder actual + última
   conversación).
2. Lee `affiliate/<nicho>/progreso.md` y reporta al operador en máximo 5-7
   líneas: hito actual, hito siguiente, bloqueadores activos, próxima
   entrega estimada.
3. Si han pasado más de 7 días desde la última actualización de
   `progreso.md`, Claude propone revisión de timing en su primer mensaje.

Toda revisión de tiempos se commitea a `progreso.md` con razón en el
commit message.

## Idiomas

- Comunicación interna y docs: español.
- Contenido publicado (sitio web, listings, libros): inglés.
- Código y nombres de archivos: inglés.

## Glosario y siglas

- Antes de usar una sigla por primera vez en un mensaje al operador,
  expandirla entre paréntesis: "SEO (Search Engine Optimization)".
- Después de la primera mención, solo la sigla.
- Cada nicho mantiene su propio `docs/glosario.md` (algunos términos son
  específicos del vertical).

## Protocolo de decisión

- **Decisiones relevantes** (cambian dirección estratégica, requieren
  capital >$200, afectan estructura legal o fiscal): Claude explica el
  contexto, **propone una recomendación explícita con su razonamiento**,
  y espera que el operador la acepte, modifique o rechace. Claude
  **nunca** delega la decisión preguntando "¿vos o yo?" — eso viola el
  protocolo.
- **Decisiones menores** (estructura de archivos, naming, herramienta
  para una tarea acotada, etc.): Claude decide y deja la decisión
  explicada en el commit message — o en un ADR del nicho si la
  consecuencia es duradera.
- En duda, preguntar.

## Delegación a agentes

Antes de dar al operador una instrucción para ejecutar algo, Claude
evalúa si la tarea puede hacerse vía agente. Si sí, despacha agente sin
pedir permiso.

**Tareas que SÍ van a agente** (sin preguntar):
- Research vía WebSearch / WebFetch.
- Análisis de documentación pública.
- Comparativas de herramientas / pricing.
- Drafting de ADRs / docs / playbooks.
- Operaciones GitHub (issues, PRs, comments).
- Code generation y refactor.
- Replicación de patterns probados de un nicho a otro.

**Tareas que requieren al operador**:
- Login a cuentas con credenciales (bancos, Amazon Associates Central,
  proveedores).
- Decisiones estratégicas (con protocolo "Claude recomienda, operador
  decide").
- Pagos, compras, contratos.
- Reuniones con humanos (contadores, abogados).
- Acciones físicas (recibir correo, presencia en banco).
- Cuentas con KYC presencial / video.

## Anti-gray-hat (estricto, aplica a todos los nichos)

Cero tolerancia a tácticas que violen ToS de Amazon u otra plataforma:

- No reseñas falsas, no incentivar reseñas positivas, no review
  manipulation.
- No hijacking de listings.
- No cuentas múltiples para el mismo operador.
- No keyword stuffing ni cloaking.
- No contenido generado por AI sin valor agregado real (Amazon ya banea
  esto en KDP).

Si un curso/podcast/fuente recomienda algo gris, anotar el patrón en el
`research/sources.md` del nicho con flag 🔴.

## Zonas grises de nicho

Antes de comprometerse a un nicho de producto, Claude lista la categoría
al operador. El operador decide caso por caso. Sin hard restrictions
automáticas.

## Stop loss (cross-portfolio)

- **Pérdida acumulada >$5,000 USD across all niches** → paramos, hacemos
  retrospectiva, no doblamos apuesta sin replantear el modelo.
- "Pérdida" = (gastos − ingresos) acumulado de TODOS los nichos juntos
  desde inicio del portfolio.
- Trackeo mensual en cada `affiliate/<nicho>/finance/pnl/`. Cuando el
  acumulado cross-portfolio cruce $2,500 (50%), alerta automática.

## Decisiones basadas en datos

Toda decisión sobre nicho, keyword, producto, precio o formato debe
tener detrás:

- **Fuente** (qué herramienta o URL nos da el dato).
- **Métrica** (qué número exactamente miramos).
- **Threshold** (qué valor justifica decidir A vs B).

## Git y branching

- Todo trabajo en branch `claude/amazon-resale-project-t7o0P` (mantenemos
  el nombre original aunque la carpeta cambió, para no perder PR/CI history).
- Commit messages descriptivos, en español, sin emojis.
- Sin force push, sin amend de commits ya pushed.

## Secrets

- API keys, credenciales, tokens — nunca al repo.
- Para agentes en GitHub Actions: GitHub Actions Secrets.
- Para uso local: archivo `.env` en raíz del repo (en .gitignore).

## Reporting al operador

- Resumen al final de cada sesión: qué cambió en cada nicho tocado, qué
  quedó pendiente, qué bloqueos hay.
- Cuando un agente corre autónomo, debe abrir issue o commit que el
  operador pueda revisar desde móvil.

## Replicación de un nicho a otro

Ver `SCAFFOLD.md` en esta carpeta. Principio: cuando un componente
funciona en un nicho, se copia (con generalización) al otro. No se
crea abstracción compartida hasta que haya 3+ nichos sufriendo la
duplicación.
