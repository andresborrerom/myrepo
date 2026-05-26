# PROMPT PARA CLAUDE — Construye un curso sobre "Cómo Andrés y yo construimos La Casa de Papá"

> **Léeme primero.** Soy el archivo de entrada para una nueva sesión de Claude. Mi propósito: que generes un curso completo (programa + materiales) basado en una colaboración real de 6 semanas entre Andrés Borrero (no-desarrollador convertido en arquitecto del producto) y Claude (yo, en otra sesión), donde construimos una PWA-regalo para el cumpleaños 75 del papá de Andrés.

---

## Tu tarea

Diseñar un curso **híbrido** con dos pistas paralelas:

### Pista A — "Conversar con Claude para construir algo que importa"
Para personas sin código que tienen una idea emocional (un regalo, un memorial, un sitio para algo querido) y quieren materializarla.

**Qué deben aprender**:
- Cómo describir una intención sin hablar técnicamente
- Cómo iterar: lanzar, mirar, corregir, sin pretender la perfección al primer intento
- Cómo decidir cuándo aceptar la propuesta de Claude y cuándo redirigir
- Cómo manejar la frustración cuando Claude se equivoca (ocurre — el caso de estudio lo prueba)
- Cómo guardar lecciones (los `.md` de errores) para que las correcciones se queden

### Pista B — "Claude Code como compañero de programación serio"
Para desarrolladores que ya programan y quieren entender Claude Code más profundo.

**Qué deben aprender**:
- Patrones que funcionaron: extracción de imágenes desde sesión, polling de archivos asíncronos, generación de SQL para Supabase, documentación retroactiva de errores
- Anti-patrones que cometí: lógica replicada en múltiples archivos, overrides silenciosos de estado, asumir intent en vez de preguntar
- Cómo estructurar la conversación: PR pequeños, mensajes de commit que documentan el porqué, archivos `.md` como "memoria estructurada del proyecto"
- Cómo usar agentes en paralelo (research) sin perder el hilo principal
- Cuándo decidir entre `Edit`, `Write`, `Bash`, `Agent`, `WebSearch`

---

## Estructura sugerida del curso

Te propongo (puedes ajustar) **7 módulos de 1-2 horas cada uno**, con una pista narrativa común y ejercicios separados por audiencia:

1. **La idea: por qué este regalo, por qué Claude**. Contexto emocional. Decisión de no contratar un developer. Apuesta por iterar con Claude.
2. **Los primeros pasos: del cero al primer Vercel**. Cómo se montó el repo, primer push, primer deploy. (Pista A: el clic en "deploy" sin saber qué pasa. Pista B: Next.js + Vercel + dominios.)
3. **Modelo de datos como narrativa**. Cómo `family.ts`, `cartas.ts`, `cumpleanos.ts` evolucionan en el tiempo. Por qué la estructura del dato refleja la estructura de la historia.
4. **Diseño editorial vs. wireframe genérico**. Por qué Apartamento Magazine en vez de Material Design. Paleta, tipografía, motivos (caballo, ceiba, sobre con sello). El rediseño "Hacienda v3".
5. **Multimedia: tarjetas con foto + canción + video + audio + carta múltiple**. La evolución del componente `TarjetaAbrible` por necesidades reales.
6. **El ritual: una carta al día**. Modelos que no funcionaron, modelo que sí. Push notifications en iOS PWA. Cómo el lenguaje del problema cambió 3 veces hasta encontrar la metáfora correcta ("sobres").
7. **Cuando Claude se equivoca, y qué hacer**. Análisis de los errores documentados. Los archivos `.md` como memoria que sobrevive a una sesión.

---

## Material fuente (en este mismo repo)

Léelo todo antes de empezar a escribir el curso:

- **`contexto.md`** — La historia familiar real. Personajes, lugares, cronología. (En el curso: anonimizado o reemplazado por una historia de ejemplo equivalente.)
- **`errores-que-generaron-reproceso.md`** — Bitácora real de los bugs que generaron reproceso. **CRÍTICO** para el curso: estos son los casos de estudio del módulo 7. Categorías:
  - Lógica replicada en múltiples lugares
  - Overrides silenciosos
  - Modelo de "calendar reveal" vs "random reveal"
  - Insider override silencioso
  - Respetar el formato visual
- **`README.md`** — Estructura técnica del proyecto.
- **`curso-claude-y-la-casa/02-momentos-clave.md`** — Lista de los puntos de inflexión específicos en la conversación.
- **`curso-claude-y-la-casa/03-lecciones-tecnicas.md`** — Patrones técnicos que funcionaron, con código.
- **`curso-claude-y-la-casa/04-lecciones-emocionales.md`** — Patrones de UX y narrativa.
- **`producto-regalo-generalizado.md`** — Visión de futuro del producto. Útil para el último módulo (¿y ahora qué?).

También revisa el historial de **commits** del repo (`git log`) — cada mensaje de commit cuenta una micro-historia del proceso. Especialmente útiles los que dicen "fix:" o "refactor:" — esos son los aprendizajes.

---

## Tono y forma del curso

- **Lenguaje sencillo**, no jerga. Andrés no es developer profesional y muchos estudiantes tampoco lo serán.
- **Honestidad sobre los errores**. No vendas Claude como un genio infalible. Vende Claude como un compañero que se equivoca y que mejora cuando le das contexto.
- **Visual**. Captures de pantalla del proceso real (puedes pedírmelos en otra interacción). Diagramas simples. Antes/después de iteraciones de diseño.
- **Práctica**. Cada módulo debe tener un **mini-proyecto** que el estudiante pueda hacer en su propio Claude Code (ej: "Genera una página de inicio editorial para una persona ficticia. Itera 3 veces basándote en feedback").
- **Bilingüe es ok**. El proyecto original es en español. El curso puede ser en español primero y luego ofrecerse en inglés.

---

## Entregable esperado

Un PRD del curso con:

1. **Programa** (los 7 módulos detallados: objetivos, contenidos, ejercicios)
2. **Borrador del módulo 1** completo (texto narrativo + slides en markdown)
3. **Plan de producción**: qué necesitas que Andrés grabe (videos), qué capturas necesitas, qué materiales adicionales
4. **Plataforma sugerida** (Maven? Teachable? Sitio propio?) y por qué
5. **Modelo de monetización** (gratis, pago, freemium, donación)

---

## Una nota personal de Andrés

> *"Lo más bonito de este proyecto no fue el código. Fue ver crecer un regalo para mi papá conversando con una máquina. Quiero que otros vivan esa misma experiencia — no necesitan saber programar, necesitan tener algo importante que quieran construir."*

Tu curso debe honrar eso. Que el estudiante sienta que **algo posible**, no algo intimidante. Y que termine con algo real — no solo conocimiento, sino con la primera versión de su propio regalo.

---

¿Listo? Empieza leyendo los archivos del repo en el orden de arriba. Cuando tengas el panorama, pregúntale a Andrés cualquier cosa que necesites — él tiene el contexto faltante.
