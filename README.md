# PH Colombia — Herramienta de Administración de Propiedad Horizontal

SaaS web para administración de copropiedades en Colombia: contabilidad, cartera, pagos, comunicaciones, asambleas, PQRs, reservas de áreas comunes y todo lo que exige la **Ley 675 de 2001** y normas conexas.

> Estado: **diseño / planeación**. No hay código de aplicación todavía. Esta carpeta contiene la arquitectura y los documentos fundacionales del producto.

## Filosofía del producto

1. **Cumplimiento normativo primero.** El motor sale a producción solo cuando cubre lo que exige la ley colombiana de PH (Ley 675/2001, normas tributarias DIAN, Ley 1581/2012 de datos personales, facturación electrónica si aplica).
2. **UX simple.** Las administradoras y los consejos no son técnicos. La pantalla principal debe contestar "¿quién debe?, ¿cuánto?, ¿qué tengo que hacer hoy?" en menos de 5 segundos.
3. **Costo de operación mínimo.** Stack con generoso free tier para que el primer año el margen no se coma la infra.
4. **Multi-conjunto desde el día uno.** Una administradora maneja varios edificios; el modelo de datos asume multi-tenant.

## Documentos

- [`docs/normativa.md`](docs/normativa.md) — Resumen ejecutivo de la Ley 675/2001 y obligaciones legales que el software debe cumplir.
- [`docs/benchmark.md`](docs/benchmark.md) — Análisis de competidores (Sygo, OctopusPH, Domus, etc.) y mínimo viable competitivo.
- [`docs/architecture.md`](docs/architecture.md) — Stack técnico, módulos, despliegue, costos.
- [`docs/domain-model.md`](docs/domain-model.md) — Entidades del negocio (copropiedad, unidad, residente, expensa, recibo, asamblea…).
- [`docs/roadmap.md`](docs/roadmap.md) — Fases, MVP, monetización.
- [`docs/sesion-validacion-suegrita.md`](docs/sesion-validacion-suegrita.md) — Guía para la sesión de 1h con la experta de dominio antes de codear.

## Roles del proyecto

- **Suegrita (experta de dominio)** — 10 años en administración de PH. Resuelve dudas de negocio, define reglas, valida flujos.
- **Equipo técnico** — Arquitectura, desarrollo, despliegue, soporte.
- **Suegrita (vende y financia)** — Comercializa, captura clientes, recibe ingresos netos.

## Licencia

Pendiente. Por defecto, todos los derechos reservados hasta que se decida licencia comercial vs open-core.
