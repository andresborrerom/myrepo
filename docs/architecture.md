# Arquitectura

Objetivo: producto SaaS multi-tenant para administración de PH en Colombia, con **costo operativo lo más cercano a cero posible** mientras tengamos pocos clientes, escalable cuando crezcamos, y mantenible por una persona técnica a tiempo parcial.

## 1. Principios

1. **Servidor-menos antes que servidor.** Cada componente que podamos delegar a un PaaS con free tier, lo delegamos. No queremos administrar Linux, parches, ni respaldos manuales.
2. **Una sola base de datos relacional, fuerte en SQL.** PostgreSQL. Toda la lógica contable y de cartera se beneficia de transacciones ACID y constraints declarativos.
3. **Multi-tenant por fila (row-level security), no por base de datos.** Más barato y simple. RLS en Postgres asegura aislamiento.
4. **Cumplimiento legal antes que features cool.** Sin Ley 675 + datos personales + tributario, no hay producto.
5. **Local-first cuando aplique.** Reportes pesados se generan en background, no bloqueamos la UI.
6. **Reversibilidad.** No hardcodear vendors. La integración con pasarela de pagos, facturación electrónica DIAN y email/WhatsApp pasa por un *port* (interfaz) con *adaptadores* intercambiables.

## 2. Stack recomendado

| Capa | Tecnología | Por qué | Costo inicial |
|---|---|---|---|
| Frontend | **Next.js 15** (App Router) + TypeScript + React | Estándar de mercado, SSR, gran ecosistema, deploys instantáneos | $0 |
| UI | **Tailwind CSS + shadcn/ui** | Componentes accesibles, copiables, sin lock-in de design system | $0 |
| Backend / API | **Next.js Route Handlers + Server Actions** | Mismo repo, mismo lenguaje, baja fricción | $0 |
| Base de datos | **Supabase (PostgreSQL gestionado)** | Postgres real, RLS nativo, auth, storage, realtime, edge functions | $0 hasta 500MB y 50k MAU |
| Auth | **Supabase Auth** (email + OTP + Google) | Integrado, gratuito, soporta MFA | $0 |
| Storage de archivos | **Supabase Storage** | Para actas, EEFF, comprobantes | $0 hasta 1GB |
| Hosting | **Vercel** | Deploys por push, preview por PR, edge global | $0 hobby / $20 pro cuando facturemos |
| Email transaccional | **Resend** | API moderna, templates en React, $0 hasta 3k/mes | $0 |
| WhatsApp | **WhatsApp Cloud API** (Meta) | Oficial, gratuito hasta 1k conversaciones/mes en Centro/Sur América | $0 |
| Pasarela de pagos | **Wompi** (Bancolombia) | KYC más rápido en CO, soporta PSE, tarjeta, Nequi, Bancolombia QR | Comisión por transacción |
| Facturación electrónica DIAN | **Alegra** o **Siigo Nube** vía API (proveedor tecnológico autorizado) | No reinventamos certificación DIAN | Plan básico ~$30k COP/mes |
| Tareas en background | **Supabase Edge Functions + cron** | Cobros mensuales, intereses, recordatorios | $0 |
| Errores | **Sentry** | Free tier 5k eventos/mes | $0 |
| Analítica producto | **PostHog** (cloud free) | Funnels, retención, sin GDPR/Ley 1581 dolor de cabeza | $0 hasta 1M eventos |
| Monitoreo uptime | **Better Uptime** o **UptimeRobot** | Free tier alcanza | $0 |
| CI/CD | **GitHub Actions** | Tests + lint + deploy preview | $0 (público) / 2000 min privado |

**Costo proyectado primer año (5–20 copropiedades):** USD 0–25 / mes en infra + comisiones por transacción + ~$30k COP/mes de facturador electrónico cuando aplique.

### Alternativas consideradas y descartadas (de momento)

- **Django + Postgres en VPS:** más control pero requiere un humano cuidando el servidor. Lo retomamos si la escala lo justifica.
- **Firebase:** datos no relacionales malos para contabilidad de partida doble.
- **Stripe:** no soporta PSE; clientes colombianos esperan Wompi/ePayco/PayU.
- **Twilio para WhatsApp:** caro vs Cloud API directa.

## 3. Topología

```
┌──────────────────────────────────────────────────────────┐
│                     Navegador (web)                      │
│   - Admin dashboard                                      │
│   - Portal residente                                     │
│   - Panel consejo / revisor fiscal                       │
└──────────────┬───────────────────────────────────────────┘
               │ HTTPS
┌──────────────▼───────────────────────────────────────────┐
│  Vercel (Next.js)                                        │
│   - SSR + Server Actions + Route Handlers                │
│   - Webhooks de pasarela y facturador                    │
└──────────────┬───────────────────────────────────────────┘
               │
   ┌───────────┴────────────┬─────────────────────┐
   ▼                        ▼                     ▼
┌──────────┐         ┌────────────┐         ┌──────────────┐
│ Supabase │         │   Wompi    │         │Alegra/Siigo  │
│ Postgres │         │ Pagos PSE  │         │ Factura      │
│ +Auth    │         │ Tarj/Nequi │         │ electrónica  │
│ +Storage │         └────────────┘         └──────────────┘
│ +EdgeFn  │
└──────────┘
   │
   ├─► Resend (email)
   ├─► WhatsApp Cloud API
   └─► Sentry / PostHog
```

## 4. Módulos del backend

Cada módulo es una carpeta en `src/modules/<modulo>` con su propio dominio, casos de uso, schemas, y handlers. Frontera explícita: módulos se hablan por eventos o por interfaces, no leen tablas ajenas.

1. `tenancy` — Administradoras, copropiedades, usuarios, roles, RLS.
2. `personas` — Propietarios, residentes, autorizaciones de datos.
3. `unidades` — Catastro interno, coeficientes.
4. `presupuesto` — Presupuesto anual, ejecución, fondos.
5. `contabilidad` — PUC, asientos, periodos, EEFF, partida doble.
6. `cartera` — Facturación mensual, pagos, intereses, acuerdos, paz y salvos, cobro jurídico.
7. `proveedores` — Causación, retenciones, egresos, conciliación bancaria.
8. `gobierno` — Asambleas, votaciones, consejo, actas.
9. `comunicaciones` — Envíos masivos, plantillas, acuses, PQRs.
10. `convivencia` — Reservas, visitantes, correspondencia, vehículos, mascotas, multas.
11. `documentos` — Versionado, firma digital, ACL.
12. `tributario` — Retenciones, libros oficiales, exógena, factura electrónica.
13. `integraciones` — Adaptadores de Wompi, ePayco, Alegra, WhatsApp, etc.
14. `auditoria` — Log inmutable, métricas, alertas.

## 5. Modelo de seguridad

- **Row Level Security (RLS) de Postgres** filtra por `tenant_id` y `copropiedad_id` automáticamente. Toda tabla lo lleva.
- Roles dentro de la copropiedad se chequean en *policies* SQL para datos sensibles (estados de cuenta de otros, actas de consejo, etc.).
- Auth usa Supabase Auth (JWT con `tenant_id` y `roles[]` como claims).
- MFA obligatorio para roles `admin_general`, `administrador`, `revisor_fiscal`.
- Logs de auditoría inmutables: tabla append-only + checksum encadenado.
- Cifrado en tránsito (TLS) y en reposo (Supabase). Backups diarios automáticos (free tier 7 días, plan Pro 30 días).
- **Datos personales (Ley 1581):** política de tratamiento publicada, registro de autorizaciones, mecanismo de revocación, exportación y borrado por solicitud.

## 6. Modelo de datos transversal

- IDs `uuid v7`.
- Soft delete (`deleted_at`) en todo lo relevante.
- `created_by`, `updated_by` (auditoría).
- `tenant_id`, `copropiedad_id` en cada tabla relevante (RLS).
- Campos monetarios: `bigint` en pesos colombianos enteros.
- Fechas: `timestamptz` siempre. Cálculos legales en zona horaria `America/Bogota`.

## 7. Trabajos programados (cron)

| Job | Frecuencia | Qué hace |
|---|---|---|
| `generar-facturas-mes` | 1 del mes (o `dia_corte_facturacion`) | Crea facturas por unidad con expensas + extras |
| `aplicar-intereses-mora` | Diario 03:00 | Recalcula mora con tasa Superfinanciera vigente |
| `recordatorios-pago` | Día -3 vencimiento, día +1, +5, +10 | Email + WhatsApp |
| `descargar-tasa-superfinanciera` | Mensual | Actualiza tabla de tasas |
| `cierre-periodo` | Manual por administrador | Genera EEFF y bloquea periodo |
| `respaldo-actas-pdf` | Al firmar | Sube PDF a Storage con timestamp |
| `reporte-exogena-dian` | Anual | Genera formatos para DIAN |
| `escanear-secret` | En cada PR | GitHub action |

## 8. Observabilidad

- **Sentry**: errores backend y frontend.
- **PostHog**: funnels (residente paga, admin cierra mes), retención.
- **Logs estructurados** (JSON) en Vercel.
- **Healthcheck** público `/api/health` que valida DB y servicios externos.
- **Reporte mensual de SLA** para clientes corporativos.

## 9. Estructura del repo (propuesta)

```
/
├── README.md
├── docs/
│   ├── normativa.md
│   ├── benchmark.md
│   ├── architecture.md
│   ├── domain-model.md
│   └── roadmap.md
├── apps/
│   └── web/                # Next.js
│       ├── app/
│       ├── components/
│       └── ...
├── packages/
│   ├── db/                 # Migraciones SQL, seed, tipos generados
│   ├── core/               # Lógica de dominio pura (sin I/O)
│   │   ├── contabilidad/
│   │   ├── cartera/
│   │   └── ...
│   ├── integrations/
│   │   ├── wompi/
│   │   ├── alegra/
│   │   └── whatsapp/
│   └── ui/                 # Componentes shadcn compartidos
├── supabase/
│   ├── migrations/
│   ├── functions/          # Edge functions (crons)
│   └── seed.sql
└── .github/workflows/
```

Monorepo con **pnpm workspaces** + **Turborepo** para build incremental.

## 10. Pruebas

- **Unitarias** del paquete `core/` — lógica contable, cálculo de mora, cuórum, imputación de pagos.
- **Integración** contra Postgres real (testcontainers) — RLS, transacciones, constraints.
- **E2E** con Playwright para flujos críticos (login, generar factura, registrar pago, citar asamblea).
- **Property-based testing** con `fast-check` para invariantes contables (siempre balancea).
- Coverage objetivo del paquete `core/`: ≥ 90%.

## 11. Despliegue y entornos

- `dev` — local con Supabase CLI.
- `preview` — automático por PR en Vercel + base Supabase de staging.
- `prod` — `main` deploya a Vercel + Supabase prod.
- Migraciones SQL versionadas en `supabase/migrations`, aplicadas por CI.
- *Feature flags* con PostHog para apagar funciones nuevas sin redeploy.

## 12. Riesgos técnicos y mitigación

| Riesgo | Mitigación |
|---|---|
| Free tiers se agotan | Alertas de uso al 70%, plan de migración documentado |
| Vendor lock-in con Supabase | Postgres es estándar; podemos migrar a Neon/RDS sin reescribir lógica |
| Cambio de regulación DIAN | Adaptador de facturación detrás de un puerto; basta cambiar el implementador |
| Volumen de WhatsApp explota | Tarifa por conversación; cap por tenant configurable |
| Errores contables silenciosos | Constraints SQL + property tests + reconciliación nocturna automática |
| Filtración de datos | RLS, MFA, auditoría, política de mínimo privilegio, *secret scanning* en CI |
