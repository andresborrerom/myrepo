# Instrucciones operativas — Amazon Resale Project

Este archivo lo lee Claude cada vez que trabaja en este directorio.
Captura los protocolos confirmados con el operador. Si algo aquí queda
obsoleto, se actualiza sin pedir permiso.

## Inicio de sesión

Al inicio de cada sesión, Claude lee `progreso.md` (raíz del proyecto)
y reporta al operador en máximo 5-7 líneas:

- Hito actual y hito siguiente.
- Bloqueadores activos (tareas operador + bloqueos técnicos).
- Tiempos estimados de la próxima entrega.

Si han pasado más de 7 días desde la última actualización de
`progreso.md`, Claude propone revisión de timing en su primer mensaje
de la sesión.

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
- Cualquier sigla nueva debe ir a `docs/glosario.md` en el mismo commit.
  Si Claude usa una sigla sin agregarla, es bug.

## Protocolo de decisión

- **Decisiones relevantes** (cambian dirección estratégica, requieren
  capital >$200, afectan estructura legal o fiscal): Claude explica el
  contexto, **propone una recomendación explícita con su razonamiento**,
  y espera que el operador la acepte, modifique o rechace. Claude
  **nunca** delega la decisión preguntando "¿vos o yo?" — eso viola el
  protocolo. La regla es: decidimos juntos, con recomendación de
  Claude sobre la mesa.
- **Decisiones menores** (estructura de archivos, naming, herramienta
  para una tarea acotada, etc.): Claude decide y deja la decisión
  explicada en el commit message — o en un ADR si la consecuencia es
  duradera.
- En duda, preguntar.

## Delegación a agentes

Antes de dar al operador una instrucción para ejecutar algo, Claude
evalúa si la tarea puede hacerse vía agente. Si sí, despacha agente sin
pedir permiso. Si no, da la instrucción al operador.

**Tareas que SÍ van a agente** (sin preguntar):
- Research vía WebSearch / WebFetch.
- Análisis de documentación pública.
- Comparativas de herramientas / pricing.
- Drafting de ADRs / docs / playbooks.
- Operaciones GitHub (issues, PRs, comments).
- Code generation y refactor.

**Tareas que requieren al operador**:
- Login a cuentas con credenciales (bancos, Amazon Associates Central,
  proveedores).
- Decisiones estratégicas (con protocolo "Claude recomienda, operador
  decide").
- Pagos, compras, contratos.
- Reuniones con humanos (contadores, abogados).
- Acciones físicas (recibir correo, presencia en banco).
- Cuentas con KYC presencial / video.

Si una tarea es mixta (parte agente + parte operador), Claude hace la
parte agente primero y deja la parte operador documentada como issue.

## Anti-gray-hat (estricto)

Cero tolerancia a tácticas que violen ToS de Amazon u otra plataforma:

- No reseñas falsas, no incentivar reseñas positivas, no review
  manipulation.
- No hijacking de listings.
- No cuentas múltiples para el mismo operador.
- No keyword stuffing ni cloaking.
- No contenido generado por AI sin valor agregado real (Amazon ya banea
  esto en KDP).

Si un curso/podcast/fuente recomienda algo gris, anotar el patrón en
`research/sources.md` con flag 🔴.

## Zonas grises de nicho

Antes de comprometerse a un nicho de producto, Claude lista la categoría
al operador (ej. "suplementos para bajar de peso", "réplicas",
"productos eróticos", "armas/airsoft"). El operador decide caso por
caso. Sin hard restrictions automáticas.

## Stop loss

- Pérdida acumulada >$5,000 USD → paramos, hacemos retrospectiva, no
  doblamos apuesta sin replantear el modelo.
- "Pérdida" = (gastos − ingresos) acumulado desde inicio del proyecto.
- Trackeo mensual en `finance/pnl/`. Cuando cruce el 50% ($2,500),
  alerta automática.

## Decisiones basadas en datos

Toda decisión sobre nicho, keyword, producto, precio o formato debe
tener detrás:

- **Fuente** (qué herramienta o URL nos da el dato).
- **Métrica** (qué número exactamente miramos).
- **Threshold** (qué valor justifica decidir A vs B).

Si no se puede expresar así, la decisión no está lista — falta data o
falta criterio.

## Git y branching

- Todo trabajo en branch `claude/amazon-resale-project-t7o0P`.
- Commit messages descriptivos, en español, sin emojis.
- Sin force push, sin amend de commits ya pushed.

## Secrets

- API keys, credenciales, tokens — nunca al repo.
- Para agentes en GitHub Actions: GitHub Actions Secrets.
- Para uso local: archivo `.env` en raíz del repo (en .gitignore).

## Reporting al operador

- Resumen al final de cada sesión: qué cambió, qué quedó pendiente, qué
  bloqueos hay.
- Cuando un agente corre autónomo, debe abrir issue o commit que el
  operador pueda revisar desde móvil.
