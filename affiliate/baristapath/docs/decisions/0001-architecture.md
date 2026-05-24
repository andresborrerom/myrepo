# ADR 0001 — Estructura del repositorio y flujo de trabajo

**Fecha:** 2026-05-13
**Estado:** Aceptada

## Contexto

Necesitamos un repo que sirva simultáneamente como (a) base de
conocimiento del negocio, (b) tablero de decisiones, (c) host de scripts
y agentes autónomos. El operador trabaja desde móvil y desktop, prefiere
GitHub como único punto de entrada, y quiere usar Claude Code para casi
todo.

## Decisión

- **Carpetas por dominio**, no por tipo de archivo: `research/`,
  `market/`, `ops/`, `finance/`, `agents/`. Más fácil de navegar desde
  móvil que estructuras técnicas (`src/`, `lib/`, etc.).
- **ADRs (`docs/decisions/`)** para decisiones no triviales. Numerados.
  Cada uno: contexto + decisión + consecuencias + alternativas.
- **GitHub Issues** como cola de tareas y preguntas abiertas. Etiquetas
  por dominio (`research`, `legal`, `finance`, `agent`).
- **GitHub Actions** como runtime de los agentes. Cron diario/semanal.
  Salida = commits a paths predecibles + issues nuevos.
- **Sin secretos en el repo**. Todo va a GitHub Actions Secrets.
- **Privacidad del repo**: privado durante Fase 0–1 (investigación +
  validación). Considerar abrirlo si conviene (p. ej. Actions ilimitados
  en repos públicos, marketing). Se revisita en ADR cuando aplique.

## Consecuencias

- Todo es navegable y editable desde móvil.
- El historial git es el log de auditoría del negocio.
- Los agentes pueden trabajar 24/7 sin que el operador esté conectado.
- Hay overhead de documentación, asumido principalmente por Claude.

## Alternativas descartadas

- **Notion / Obsidian**: peor para automatización, peor desde CLI, no
  versionado git.
- **Monorepo con paquete npm/python desde el día 1**: prematuro, no
  necesitamos build system aún.
- **Repo público desde el inicio**: prematuro; primero validamos modelo
  sin exponer tesis competitiva.
