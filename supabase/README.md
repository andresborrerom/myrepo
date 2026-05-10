# Supabase / PostgreSQL

Esquema y migraciones de la base de datos de la plataforma.

## Estructura

```
supabase/
├── migrations/
│   ├── 0001_extensions_and_tenancy.sql   Extensiones, administradora, copropiedad, usuarios, membresías
│   ├── 0002_personas_y_unidades.sql      Personas, edificios, unidades, coeficientes
│   ├── 0003_cartera.sql                  Tasa IBC, conceptos, facturas, pagos, acuerdos, paz y salvo
│   └── 0004_rls.sql                      Row Level Security: aislamiento por tenant
└── seed.sql                              Datos de ejemplo para desarrollo
```

## Modelo de aislamiento (multi-tenancy)

- **administradora_id** = tenant raíz (cliente que paga la suscripción).
- **copropiedad_id** = tenant secundario (la PH como persona jurídica).
- Cada tabla relevante referencia uno de los dos.
- `membership` define qué usuarios ven qué tenants y con qué rol.
- `RLS` (migración 0004) aplica los filtros automáticamente: cualquier query, incluso en SQL crudo, queda confinada a los tenants visibles por el usuario.

## Convenciones

- IDs UUID v4 (`gen_random_uuid()`). Migraremos a UUID v7 si Postgres 17+ está disponible.
- Soft delete con `deleted_at`.
- Timestamps `timestamptz` (los cálculos legales corren en `America/Bogota`).
- Montos: `bigint` en pesos colombianos enteros.
- Tasas: `numeric(7,6)` (hasta 0.999999 = 99.9999% E.A.).
- Coeficientes: `integer` en escala 10_000_000 (1.0 = 10_000_000) para suma exacta.

## Pruebas críticas (a implementar en `packages/db/test`)

1. La suma de coeficientes activos siempre es 10_000_000 (trigger `unidad_coeficientes_suma`).
2. RLS bloquea lecturas de copropiedades ajenas para roles no autorizados.
3. La numeración de facturas es consecutiva por copropiedad.
4. Una factura con `total != saldo + Σ aplicaciones` es inconsistente.
5. La tasa IBC siempre tiene cobertura para cualquier fecha de cálculo de mora.

## Cómo correr local

```bash
# Requiere Docker Desktop o Podman.
npx supabase start
npx supabase db reset    # aplica todas las migraciones + seed
```

## Roadmap del esquema

- [ ] **0005** Contabilidad (PUC, asientos, periodos, EEFF).
- [ ] **0006** Comunicaciones (plantillas, envíos, acuses, autorizaciones Ley 1581).
- [ ] **0007** Asambleas (convocatorias, asistencia, votaciones por coeficiente, actas).
- [ ] **0008** Convivencia (reservas, visitantes, multas).
- [ ] **0009** Documental (versionado de actas/reglamento/EEFF).
