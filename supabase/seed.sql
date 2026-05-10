-- Seed mínimo para desarrollo local y demos.
-- Crea: 1 administradora, 1 copropiedad de 4 unidades, conceptos básicos,
-- tasa IBC vigente, y un par de facturas.

-- Tasa IBC vigente (ejemplo: 18% E.A.). Se actualiza por el job mensual.
insert into tasa_ibc (modalidad, vigente_desde, vigente_hasta, ibc_ea, resolucion)
values ('consumo_y_ordinario', date '2026-04-01', date '2026-07-01', 0.180000,
        'Resolución SF demo')
on conflict do nothing;

-- Administradora demo
with a as (
  insert into administradora (nit, digito_verificacion, razon_social, tipo_persona, email_contacto, plan)
  values ('900000001', 1, 'Administradora Suegrita SAS', 'juridica', 'admin@suegrita.demo', 'esencial')
  on conflict (nit) do nothing
  returning id
),
-- Copropiedad demo
c as (
  insert into copropiedad (administradora_id, nit, digito_verificacion, razon_social, tipo, direccion,
                           municipio_dane, estrato, numero_unidades_total)
  select a.id, '901000001', 5, 'Conjunto Residencial Demo PH', 'residencial',
         'Cra 1 # 1-1', '11001', 4, 4
  from a
  on conflict (nit) do nothing
  returning id
)
-- Unidades 4×25% = 100%
insert into unidad (copropiedad_id, tipo, numero, area_m2, coeficiente)
select c.id, 'apartamento', n, 80.00, 2500000
from c, (values ('Apto 101'),('Apto 102'),('Apto 201'),('Apto 202')) as t(n);

-- Conceptos
insert into concepto (copropiedad_id, codigo, nombre, tipo, metodo_calculo, cuenta_puc)
select c.id, 'EXP-ORD', 'Expensa ordinaria', 'expensa_ordinaria', 'por_coeficiente', '4135'
from copropiedad c where c.nit = '901000001'
on conflict do nothing;

insert into concepto (copropiedad_id, codigo, nombre, tipo, metodo_calculo, cuenta_puc)
select c.id, 'MORA', 'Intereses de mora', 'intereses_mora', 'manual', '4145'
from copropiedad c where c.nit = '901000001'
on conflict do nothing;
