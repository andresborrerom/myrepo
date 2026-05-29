# Momentos clave de la conversación

Lista cronológica (aprox) de los puntos de inflexión en el proceso. Sirve para construir la narrativa del curso.

---

## Fase 1 — La idea y el cero

- Andrés llega con una intención emocional: regalarle a su papá una "casa digital" para los 75 años, escrita por él y por la familia.
- Decide NO contratar developer. Apuesta por Claude Code.
- Primera conversación: explica quién es papá, dónde vive, los 5 hijos, los 8 nietos. **Sin spec técnica**. Solo historia.
- Claude propone una PWA Next.js + Supabase + Vercel. Andrés acepta sin saber qué significa cada cosa.

## Fase 2 — Sembrar la primera carta

- Andrés escribe la primera carta — "El año en que naciste" (1951).
- Claude propone el formato editorial (Apartamento Magazine vibe). Andrés lo aprueba.
- Aparece el primer modelo de negocio interno: las cartas son por años, una por cada año vivido.

## Fase 3 — Crecimiento orgánico

- Más cartas se van sumando. Andrés llega cada día con un recuerdo nuevo.
- Algunas cartas tienen audio (la voz de los hijos). Aparece el componente de player.
- Otras tienen video. Aparece el video con autoplay y pausa de la canción de fondo.

## Fase 4 — Las tarjetas de cumpleaños

- Aparece una sección nueva: `/cumpleanos`. Cada miembro de la familia hace una "tarjeta" para papá.
- Cada tarjeta tiene cover image, body (texto o imagen), canción de fondo, opcional video/audio.
- El componente `TarjetaAbrible` evoluciona iteración tras iteración: cover overlay → cover stacked → cover con varios autores → carátula como puerta que abre con animación.

## Fase 5 — El árbol familiar

- Primera versión: lista vertical de personas. Andrés: "feo".
- Segunda versión: SVG estilizado de una ceiba. Andrés: "no es como la imagino".
- Tercera versión: foto real de una ceiba con nodos absolutamente posicionados. Andrés: "ahora sí".
- Lección: el ÁRBOL importa porque es la imagen mental que Andrés tiene de su familia.

## Fase 6 — El rediseño "Hacienda"

- Andrés se cansa del look genérico Tailwind. Pide algo "más editorial, más Hacienda colombiana".
- Claude lanza un agente para investigar referencias visuales (Hermès, Apartamento, finca colombiana, golf).
- El agente reporta: paleta sabana/cuero/oro, tipografía Fraunces italic, motivos (caballo, ceiba, sobre con sello).
- Se aplica al Vestíbulo primero. El resto migra progresivamente.
- Aparece el **caballito que galopa por el índice** — el detalle memorable.

## Fase 7 — El ritual diario (donde más se sufrió)

Aquí está la lección más grande del proyecto. La "carta al día" pasó por tres modelos:

1. **Modelo A — Calendar reveal**: cada día desbloquea un año específico. 1951 día 0, 1952 día 1... 
   - **Falló porque**: muchos años no tienen carta (los 50s mayormente vacíos). Día 4, solo 1 carta disponible.
2. **Modelo B — Cartas por orden (slicing)**: cada día desbloquea la siguiente carta en orden cronológico, ignorando años vacíos.
   - **Falló porque**: si Andrés sumaba una carta nueva para un año "anterior" en el orden, la cadencia se rompía.
3. **Modelo C — Pool aleatorio (definitivo)**: el pool son TODAS las cartas no-placeholder. Cadencia "una por día" vía `lastRevealDate`. Random entre las no abiertas.
   - **Funcionó porque**: cualquier nueva carta entra automáticamente al pool. Nunca se repite.

Y aparecieron bugs en cascada porque el modelo viejo estaba replicado en 3 archivos. **Esto es el caso de estudio central del módulo 7.**

## Fase 8 — Push notifications

- Andrés: "quiero que reciba un push cada mañana para abrir su carta del día".
- Claude: implementa service worker + Web Push + VAPID + cron en Vercel.
- Setup manual requerido del usuario (env vars, SQL en Supabase). Documentado claramente en el PR.
- Cron a 06:00 UTC (8 AM España). Documentado en `contexto.md` con la nota de DST.

## Fase 9 — La documentación retroactiva

- Después de varios bugs de reproceso, Andrés pide: "crea un .md con los errores que generaron reproceso. Que la próxima vez podamos señalarte el error y corregir más rápido."
- Nace `errores-que-generaron-reproceso.md` — la **memoria estructurada del proyecto** que sobrevive a una sesión.
- Más adelante: nace `contexto.md` con la mecánica del producto. Y este curso.

## Fase 10 — Productizar

- Andrés: "¿cómo hacemos para que otros puedan dar este regalo?".
- Nace `producto-regalo-generalizado.md` con el plan de productización.
- Decisión: este repo queda como artefacto/regalo terminado. La generalización vive en otro repo cuando llegue el momento.

---

## Patrones que aparecen una y otra vez

- **Iteración corta**: Andrés ve algo, decide ajustar, comparte feedback, Claude redibuja. Nunca pretende perfección al primer intento.
- **Diseño emocional primero, técnica después**: Andrés nunca pregunta "qué framework". Pregunta "¿se siente bien?".
- **Memoria estructurada**: los archivos `.md` son tan importantes como el código. Son lo que sobrevive a una sesión.
- **Honestidad sobre los errores**: Claude se equivoca varias veces. Andrés no lo trata como fracaso — lo trata como oportunidad de aprendizaje compartido.
