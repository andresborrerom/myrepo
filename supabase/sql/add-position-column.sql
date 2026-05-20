-- Permite reordenar manualmente los aportes en /arbol/[id].
-- Pega esto en Supabase → SQL Editor → New query → Run.
--
-- Cómo se usa la columna:
-- - position INT, default 0
-- - Las consultas en /arbol/[id] ordenan por position ASC, created_at DESC
-- - Los aportes nuevos entran con position=0 y aparecen al principio
--   (ordenados por recencia entre sí) hasta que alguien los reordena
-- - Cuando alguien arrastra los aportes de una persona, el cliente
--   asigna position=0..N a la nueva secuencia y persiste

ALTER TABLE aportes ADD COLUMN IF NOT EXISTS position INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS aportes_from_position_idx
  ON aportes(from_id, position, created_at DESC);
