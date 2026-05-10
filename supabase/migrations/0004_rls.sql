-- Migration 0004: Row Level Security.
-- Política base: todo dato se filtra por administradora_id (y opcionalmente
-- copropiedad_id) usando la tabla membership. Supabase Auth pone auth.uid()
-- como el id del usuario.
--
-- Reglas globales:
--   1. Sin sesión → no se ve nada.
--   2. admin_general (rol del owner de la administradora) → ve todo dentro
--      de SU administradora.
--   3. Roles por copropiedad → ven solo sus copropiedades.
--   4. Propietarios y residentes → ven SU unidad y sus facturas/pagos.
--   5. Service role (jobs, edge functions con clave de servicio) → bypass.

-- =========================================================================
-- Helpers
-- =========================================================================

-- Lista de administradora_ids visibles por el usuario actual.
create or replace function current_admin_ids() returns setof uuid
language sql stable security definer set search_path = public as $$
  select distinct administradora_id
    from membership
    where user_id = auth.uid() and vigente
$$;

-- Lista de copropiedad_ids visibles por el usuario actual (cualquier rol).
create or replace function current_copropiedad_ids() returns setof uuid
language sql stable security definer set search_path = public as $$
  select distinct c.id
    from membership m
    join copropiedad c
      on c.administradora_id = m.administradora_id
     and (m.copropiedad_id is null or m.copropiedad_id = c.id)
    where m.user_id = auth.uid() and m.vigente
$$;

-- Cierto si el usuario tiene rol específico en una copropiedad.
create or replace function has_role(_copropiedad_id uuid, _roles rol_copropiedad[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from membership m
      where m.user_id = auth.uid()
        and m.vigente
        and m.rol = any(_roles)
        and (
          m.rol = 'admin_general'
          or m.copropiedad_id = _copropiedad_id
        )
  )
$$;

-- ¿La unidad pertenece a una unidad_persona del usuario actual?
create or replace function user_owns_unidad(_unidad_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
      from unidad_persona up
      join persona p on p.id = up.persona_id
      join app_user au on au.documento_numero = p.documento_numero
                       and au.documento_tipo = p.documento_tipo
      where up.unidad_id = _unidad_id
        and (up.vigente_hasta is null or up.vigente_hasta >= current_date)
        and au.id = auth.uid()
  )
$$;

-- =========================================================================
-- Habilitar RLS
-- =========================================================================

alter table administradora       enable row level security;
alter table copropiedad          enable row level security;
alter table app_user             enable row level security;
alter table membership           enable row level security;
alter table persona              enable row level security;
alter table edificio             enable row level security;
alter table unidad               enable row level security;
alter table unidad_persona       enable row level security;
alter table tasa_ibc             enable row level security;
alter table concepto             enable row level security;
alter table factura              enable row level security;
alter table factura_item         enable row level security;
alter table pago                 enable row level security;
alter table aplicacion_pago      enable row level security;
alter table acuerdo_pago         enable row level security;
alter table acuerdo_cuota        enable row level security;
alter table paz_y_salvo          enable row level security;

-- =========================================================================
-- Políticas
-- =========================================================================

-- Administradora: el usuario ve la(s) suya(s).
create policy administradora_select on administradora
  for select using (id in (select current_admin_ids()));
create policy administradora_modify on administradora
  for all using (id in (select current_admin_ids()))
        with check (id in (select current_admin_ids()));

-- Copropiedad: visible si pertenece a una administradora del usuario.
create policy copropiedad_select on copropiedad
  for select using (administradora_id in (select current_admin_ids()));
create policy copropiedad_modify on copropiedad
  for all using (
    has_role(id, array['admin_general','administrador']::rol_copropiedad[])
  ) with check (
    administradora_id in (select current_admin_ids())
  );

-- app_user: cada quien ve y edita su propio perfil.
create policy app_user_self on app_user
  for all using (id = auth.uid()) with check (id = auth.uid());

-- membership: el usuario ve sus propias membresías; el admin_general puede gestionar las de su administradora.
create policy membership_self_select on membership
  for select using (user_id = auth.uid());
create policy membership_admin_manage on membership
  for all using (
    administradora_id in (
      select administradora_id from membership
        where user_id = auth.uid() and rol = 'admin_general' and vigente
    )
  ) with check (
    administradora_id in (
      select administradora_id from membership
        where user_id = auth.uid() and rol = 'admin_general' and vigente
    )
  );

-- Persona: visible para roles administrativos de la administradora.
create policy persona_select on persona
  for select using (administradora_id in (select current_admin_ids()));
create policy persona_modify on persona
  for all using (administradora_id in (select current_admin_ids()))
        with check (administradora_id in (select current_admin_ids()));

-- Edificio / Unidad: por copropiedad.
create policy edificio_all on edificio
  for all using (copropiedad_id in (select current_copropiedad_ids()))
        with check (copropiedad_id in (select current_copropiedad_ids()));

create policy unidad_all on unidad
  for all using (copropiedad_id in (select current_copropiedad_ids()))
        with check (copropiedad_id in (select current_copropiedad_ids()));

create policy unidad_persona_all on unidad_persona
  for all using (
    unidad_id in (select id from unidad where copropiedad_id in (select current_copropiedad_ids()))
  ) with check (
    unidad_id in (select id from unidad where copropiedad_id in (select current_copropiedad_ids()))
  );

-- Tasas IBC: lectura pública para la app, escritura solo por service_role.
create policy tasa_ibc_select on tasa_ibc
  for select using (true);

-- Concepto: por copropiedad.
create policy concepto_all on concepto
  for all using (copropiedad_id in (select current_copropiedad_ids()))
        with check (copropiedad_id in (select current_copropiedad_ids()));

-- Factura: roles administrativos ven todo de su copropiedad.
-- Propietarios/residentes solo las de SU unidad.
create policy factura_admin_view on factura
  for select using (
    has_role(copropiedad_id,
      array['admin_general','administrador','consejo','revisor_fiscal']::rol_copropiedad[])
  );
create policy factura_owner_view on factura
  for select using (user_owns_unidad(unidad_id));
create policy factura_admin_modify on factura
  for all using (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  ) with check (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  );

create policy factura_item_view on factura_item
  for select using (
    factura_id in (select id from factura)
  );
create policy factura_item_modify on factura_item
  for all using (
    factura_id in (
      select id from factura where has_role(copropiedad_id,
        array['admin_general','administrador']::rol_copropiedad[])
    )
  ) with check (
    factura_id in (
      select id from factura where has_role(copropiedad_id,
        array['admin_general','administrador']::rol_copropiedad[])
    )
  );

-- Pago / aplicación / acuerdo / paz_y_salvo: mismos criterios.
create policy pago_admin on pago
  for all using (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  ) with check (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  );
create policy pago_owner_view on pago
  for select using (unidad_id is not null and user_owns_unidad(unidad_id));

create policy aplicacion_pago_view on aplicacion_pago
  for select using (pago_id in (select id from pago));
create policy aplicacion_pago_modify on aplicacion_pago
  for all using (
    pago_id in (select id from pago)
  ) with check (
    pago_id in (select id from pago)
  );

create policy acuerdo_pago_admin on acuerdo_pago
  for all using (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  ) with check (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  );
create policy acuerdo_pago_owner_view on acuerdo_pago
  for select using (user_owns_unidad(unidad_id));

create policy acuerdo_cuota_view on acuerdo_cuota
  for select using (acuerdo_id in (select id from acuerdo_pago));
create policy acuerdo_cuota_modify on acuerdo_cuota
  for all using (acuerdo_id in (select id from acuerdo_pago))
        with check (acuerdo_id in (select id from acuerdo_pago));

create policy paz_y_salvo_admin on paz_y_salvo
  for all using (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  ) with check (
    has_role(copropiedad_id, array['admin_general','administrador']::rol_copropiedad[])
  );
create policy paz_y_salvo_owner_view on paz_y_salvo
  for select using (user_owns_unidad(unidad_id));

comment on function current_admin_ids() is
  'Administradoras visibles por el usuario actual. Usado por todas las policies de RLS.';
