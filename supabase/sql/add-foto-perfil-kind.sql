-- Permite el kind 'foto-perfil' en la tabla aportes.
-- Pega esto en Supabase → SQL Editor → New query → Run.
--
-- Sin esto, intentar subir una foto de perfil desde /aporta da error:
--   new row for relation "aportes" violates check constraint "aportes_kind_check"

ALTER TABLE aportes DROP CONSTRAINT IF EXISTS aportes_kind_check;
ALTER TABLE aportes ADD CONSTRAINT aportes_kind_check
  CHECK (kind IN ('texto', 'foto', 'audio', 'video', 'carta', 'foto-perfil'));
