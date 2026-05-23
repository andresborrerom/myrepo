# Proyecto Shopify — Borrero Bros

Tienda Shopify de **producto digital / servicio** montada entre Andrés (Panamá) y Camilo (España). Meta declarada: **20 000 € / mes de ingreso recurrente**.

Esta carpeta es el cuaderno de bitácora del proyecto. No hay código todavía — primero alineamos negocio, fiscal y operaciones; el código (tema Shopify, integraciones, landing) viene después.

## Navegación rápida

Abrí [`index.html`](./index.html) en el navegador para ver el dashboard del proyecto con todas las secciones renderizadas en una sola vista, timeline a 12 semanas y próximas acciones.

Para servirlo localmente: `python3 -m http.server` desde esta carpeta y abrí `http://localhost:8000/index.html`. Si lo abrís sin servidor, los `.md` se enlazan abajo y se renderizan en GitHub directamente.

## Lectura sugerida (en orden)

1. [`01-plan-negocio.md`](./01-plan-negocio.md) — visión, unit economics, qué significa "20k€/mes" en clientes y precio.
2. [`02-producto-nicho.md`](./02-producto-nicho.md) — framework para elegir qué vendemos. **Decisión pendiente.**
3. [`03-fiscal.md`](./03-fiscal.md) — Análisis 2026 actualizado de 4 opciones (España, Panamá, Estonia, LLC USA). **Recomendación: SL España microempresa.** Pendiente confirmar con asesor.
4. [`04-operaciones.md`](./04-operaciones.md) — quién hace qué entre los dos, husos horarios, rituales.
5. [`05-stack.md`](./05-stack.md) — Shopify + apps + integraciones; cuándo Shopify NO es la mejor opción.
6. [`06-marketing.md`](./06-marketing.md) — canales de adquisición y embudo.
7. [`07-roadmap-90dias.md`](./07-roadmap-90dias.md) — Plan accionable con fechas reales: lun 18 may → sáb 16 ago 2026. Hitos por semana, owners, presupuesto total e indicadores de éxito.
8. [`08-nichos-investigados.md`](./08-nichos-investigados.md) — 4 nichos con competidores reales, ventaja injusta y techo de ingresos. ⭐ **Recomendación documentada.**
9. [`09-marca-naming.md`](./09-marca-naming.md) — Naming en 2 rounds de validación con investigación real. **Singladura** es el candidato vivo, pendiente de verificación manual de dominios + marcas.
10. [`10-automatizacion.md`](./10-automatizacion.md) — Qué se automatiza y qué no por producto, stack concreto, roadmap de cuándo automatizar qué.
11. [`11-flujo-captura-cierre.md`](./11-flujo-captura-cierre.md) — Manual operativo del producto 2: 15 etapas desde awareness a referido, con owner, herramienta, plantilla y métrica por etapa.
12. [`12-logo-brief.md`](./12-logo-brief.md) — Brief para encargar logo a freelance externo: 4 direcciones conceptuales, paleta, tipografía, entregables, presupuesto orientativo, anti-brief.
13. [`13-curso-outline.md`](./13-curso-outline.md) — Outline del curso digital (producto 1, 497 €). 6 módulos + plantillas + bonus. Decisión de arranque en gate del 5 ago 2026.
14. [`14-fiscal-kit-asesor.md`](./14-fiscal-kit-asesor.md) — Kit de conversación con asesor fiscal: 23 preguntas al asesor español + 9 al asesor panameño/colombiano, salidas esperadas, cómo encontrar asesores, cronología.
15. [`plantillas/`](./plantillas/) — Artefactos operativos copy-paste-ready. Top of funnel completo (PDF lead magnet, 5 emails nurture, cuestionario Tally, prompt cualificación Claude). Mid/bottom funnel pendiente.

## Código

- [`landing/`](./landing/) — Next.js 14 + Tailwind + Supabase. Landing de waitlist lista para deploy. Cambiar copy en `landing/brand.config.ts`. Ver `landing/README.md` para setup.

## Estado

| Bloque | Estado |
|---|---|
| Modelo de negocio | ✅ Producto digital / servicio (acompañamiento de alto ticket) |
| Investigación de nichos | ✅ Hecha, con recomendación |
| Nicho concreto elegido | ✅ Confirmado — inmobiliario España para inversores LATAM |
| Cami adentro | ✅ Sí, confirmado 2026-05-18 |
| Jurisdicción fiscal | 🟢 SL España microempresa, alta convicción tras investigación 2026. Pendiente confirmar con asesor (ver `14-fiscal-kit-asesor.md`) |
| Marca + dominio | 🟡 Singladura procedible — pendiente verificación manual (OEPM, EUIPO, IMPI, SIC, dominios) |
| Landing de waitlist | ✅ Construido con Singladura provisional, falta deploy + Supabase |
| Brief de logo | ✅ Listo para encargar tras verificación |
| Outline curso digital | ✅ Preparado para gate del 5 ago 2026 |
| Tienda Shopify | ⏳ Pendiente |
| Primera venta | ⏳ Pendiente |

## Decisiones tomadas

- **2026-05-18** — Modelo: producto digital / servicio (no físico, no dropshipping, no POD).
- **2026-05-18** — Estructura: dos socios, uno en Panamá (Andrés) y uno en España (Cami).
- **2026-05-18** — Cuaderno de bitácora vive en este repo (`myrepo/shopify/`) por simplicidad. Se separará a su propio repo cuando empiece código.
- **2026-05-18** — Recomendación tentativa de nicho: **Inmobiliario España para inversores LATAM** (ver `08-nichos-investigados.md`).
- **2026-05-18** — Cami confirma estar adentro. Nicho B queda fijo. Avanzamos a diseño de operación.
- **2026-05-23** — Naming round 1 descartado (Casa Madre, Plano Maestro, Cimientos) por dominios tomados y marcas competidoras.
- **2026-05-23** — Naming round 2: Lares y Indianos descartados con evidencia (Grupo Social Lares, Grito de Lares, Tequila Indianos, microofensa de clase del término "indiano"). Singladura procedible pendiente de verificación manual.
- **2026-05-23** — Tras investigación fiscal actualizada 2026, se descartan SA Panamá, OÜ Estonia y LLC USA para el arranque por tres anclas a España (regla del inmueble art. 70 LIVA, residencia fiscal efectiva V1964-20, volumen año 1 bajo). Recomendación: **SL España microempresa** (19% sobre primeros 50k€ + 21% resto). Pendiente confirmar con asesor.
