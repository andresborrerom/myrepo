# Proyecto Shopify — Borrero Bros

Tienda Shopify de **producto digital / servicio** montada entre Andrés (Panamá) y Camilo (España). Meta declarada: **20 000 € / mes de ingreso recurrente**.

Esta carpeta es el cuaderno de bitácora del proyecto. No hay código todavía — primero alineamos negocio, fiscal y operaciones; el código (tema Shopify, integraciones, landing) viene después.

## Lectura sugerida (en orden)

1. [`01-plan-negocio.md`](./01-plan-negocio.md) — visión, unit economics, qué significa "20k€/mes" en clientes y precio.
2. [`02-producto-nicho.md`](./02-producto-nicho.md) — framework para elegir qué vendemos. **Decisión pendiente.**
3. [`03-fiscal.md`](./03-fiscal.md) — Panamá vs España vs Estonia. **Decisión pendiente.**
4. [`04-operaciones.md`](./04-operaciones.md) — quién hace qué entre los dos, husos horarios, rituales.
5. [`05-stack.md`](./05-stack.md) — Shopify + apps + integraciones; cuándo Shopify NO es la mejor opción.
6. [`06-marketing.md`](./06-marketing.md) — canales de adquisición y embudo.
7. [`07-roadmap-90dias.md`](./07-roadmap-90dias.md) — plan accionable día 1 a día 90.
8. [`08-nichos-investigados.md`](./08-nichos-investigados.md) — 4 nichos con competidores reales, ventaja injusta y techo de ingresos. ⭐ **Recomendación documentada.**
9. [`09-marca-naming.md`](./09-marca-naming.md) — 10 nombres candidatos + paleta + tono de voz para el nicho recomendado.

## Código

- [`landing/`](./landing/) — Next.js 14 + Tailwind + Supabase. Landing de waitlist lista para deploy. Cambiar copy en `landing/brand.config.ts`. Ver `landing/README.md` para setup.

## Estado

| Bloque | Estado |
|---|---|
| Modelo de negocio | ✅ Producto digital / servicio (acompañamiento de alto ticket) |
| Investigación de nichos | ✅ Hecha, con recomendación |
| Nicho concreto elegido | ⏳ Pendiente de discusión con Cami |
| Jurisdicción fiscal | ⏳ Pendiente (ver `03-fiscal.md`) |
| Marca + dominio | ⏳ Top 3 propuesto, validar dominios |
| Landing de waitlist | ✅ Construido, falta deploy + Supabase |
| Tienda Shopify | ⏳ Pendiente |
| Primera venta | ⏳ Pendiente |

## Decisiones tomadas

- **2026-05-18** — Modelo: producto digital / servicio (no físico, no dropshipping, no POD).
- **2026-05-18** — Estructura: dos socios, uno en Panamá (Andrés) y uno en España (Cami).
- **2026-05-18** — Cuaderno de bitácora vive en este repo (`myrepo/shopify/`) por simplicidad. Se separará a su propio repo cuando empiece código.
- **2026-05-18** — Recomendación tentativa de nicho: **Inmobiliario España para inversores LATAM** (ver `08-nichos-investigados.md`). Pendiente confirmar con Cami.
