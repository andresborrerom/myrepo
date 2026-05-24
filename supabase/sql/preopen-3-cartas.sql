-- One-off: pre-abrir 3 cartas adicionales para Alejandro para que tenga
-- contenido para leer hoy (estamos en día 4 post-cumple y la lógica vieja
-- solo había desbloqueado 1).
--
-- Estos 3 años fueron escogidos al azar entre los años con carta (excepto
-- 1951 que ya está abierta).
--
-- También resetea last_reveal_date a NULL para que pueda abrir 1 NUEVA
-- carta hoy (las 3 pre-abiertas son extras, no consumen el cupo del día).
--
-- Pega en Supabase → SQL Editor → Run.

UPDATE alejandro_state
SET
  revealed_years = (
    -- Unión de lo que ya tiene + estos 3 (sin duplicados)
    SELECT jsonb_agg(DISTINCT y::int)
    FROM (
      SELECT jsonb_array_elements_text(revealed_years)::int AS y FROM alejandro_state WHERE id = 'singleton'
      UNION
      SELECT unnest(ARRAY[1979, 1983, 1985])
    ) merged
  ),
  last_reveal_date = NULL,
  updated_at = now()
WHERE id = 'singleton';
