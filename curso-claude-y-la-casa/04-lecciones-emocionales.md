# Lecciones emocionales y de UX

Para la pista A del curso (no-developers). Patrones que hacen que esta app se sienta como un regalo personal y no como un producto genérico.

---

## 1. Diseña la EXPERIENCIA, no las features

Andrés nunca pidió "una sección de cumpleaños". Pidió "un lugar para que mis hermanos y los nietos le manden tarjetas de cumpleaños con fotos y voz". La diferencia es enorme:

- "Sección de cumpleaños" → Claude habría hecho un feed cronológico genérico
- La experiencia descrita → Claude propuso `/cumpleanos/[id]` con cover, body, canción, audio, video, multi-autor

**Lección para el estudiante**: cuando pidas algo a Claude, no describas el componente. Describe la sensación que quieres que viva el usuario.

---

## 2. La paleta y la tipografía son la diferencia entre "amateur" y "regalo de verdad"

El proyecto pasó por tres iteraciones de identidad visual:

1. **v1**: Tailwind por defecto. Funcional, feo.
2. **v2**: Editorial Apartamento (cream, clay, olive, Fraunces serif italic). Bonito.
3. **v3**: Hacienda colombiana (sabana, cuero, oro, motivos ecuestres). **Aquí Andrés empezó a sentirlo como "su" regalo, no como una página web.**

**Lección**: invertir el tiempo en lograr una paleta y tipografía coherentes con la persona homenajeada paga 100x. La gente percibe el cuidado.

---

## 3. Los detalles memorables son lo que la gente recuerda

El caballito que galopa por el índice del Vestíbulo no era "necesario". Pero es lo que Andrés cuenta cuando le muestra la app a otros. Lo recuerda papá.

Otros detalles memorables del proyecto:
- El "75" gigante en oro sobre la foto de carátula
- El monograma "AB · 75" en serif italic
- El sello de cera dorado en los sobres cerrados
- La animación de la carta abriendo con fade
- El push notification de las 8 AM con el mensaje "Tu carta de hoy te espera 🐎"

**Lección**: hazle a Claude la pregunta "¿qué detalle memorable podemos agregar acá?" después de tener lo básico funcionando.

---

## 4. La historia del homenajeado debe permear el código

`contexto.md` tiene 270 líneas de historia familiar real: dónde nació papá, cuándo se mudó a Marbella, los nombres de los perros de la finca, los lugares que aparecen en las cartas, los apodos.

Sin ese archivo, Claude habría escrito cartas genéricas. Con ese archivo, Claude pudo proponer una carta titulada "Conocer Europa" sobre el viaje familiar de 1993, con detalle real (la tía de Elsa María en Wörms, las paletas Magnum, etc.).

**Lección para el estudiante**: antes de empezar a construir, escribe un `contexto.md` con TODO lo que sabes del homenajeado. Lugares, fechas, personas, frases, manías. Eso es el combustible.

---

## 5. Iterar es respetar al usuario, no fracasar

Cada componente fue iterado 3-5 veces. El árbol familiar pasó por:
1. Lista vertical → "feo"
2. SVG estilizado → "no es como lo imagino"
3. Foto real de ceiba con nodos posicionados → "ahora sí"

Andrés nunca trató las dos primeras como fracaso. Las trató como pasos hacia entender lo que realmente quería.

**Lección**: cuando Claude te muestra la primera versión y no es lo que querías, **mira por qué**. Tu reacción es información que Claude usa para acercarse a tu visión.

---

## 6. Lo que NO debes pedir: una sola megaspec al principio

Andrés nunca abrió la conversación diciendo "construyamos una PWA con cartas + tarjetas + árbol + buzón + admin + push notifications". Eso habría producido algo genérico.

Empezó con UNA carta. Después agregó la segunda. Luego pidió "una sección donde mis hermanos suban tarjetas". Cada feature nació de una necesidad real.

**Lección**: empieza por la cosa MÁS PEQUEÑA que ya valga el regalo. Construye solo lo que sea inminente. Las features se descubren al uso, no al diseño.

---

## 7. La ritualidad es lo que hace memorable

El "una carta al día durante 75 días" no es una feature técnica. Es un **ritual de duelo a la inversa** — celebrar a alguien que está vivo, día tras día. Papá abre la app cada mañana y descubre algo de él que la familia recordó.

Sin la ritualidad, la app sería un repositorio de cartas que papá podría leer todas en una tarde y olvidar. Con la ritualidad, dura 75 días.

**Lección**: piensa qué ritmo emocional quieres construir. Un evento único, una secuencia diaria, un descubrimiento progresivo, un calendario de adviento, etc.

---

## 8. Cuando Claude se equivoca, no es el fin del mundo

Este proyecto tiene un archivo entero (`errores-que-generaron-reproceso.md`) documentando bugs que generaron reproceso. Algunos serios — por ejemplo, papá un día abrió una carta vacía porque Claude no filtró placeholders.

Andrés no se frustró abandonando. Reportó claramente el problema, Claude lo corrigió, ambos documentaron la lección. **El proyecto avanzó MÁS rápido después de esas correcciones, no más lento**.

**Lección**: cuando Claude rompa algo, descríbelo lo más concreto posible ("abrí la carta y me salió X cuando esperaba Y"). Eso es lo más útil que puedes hacer.

---

## 9. La voz de la familia es más importante que el código

Las tarjetas más emocionantes del proyecto:
- La carta del caballo de Luchi (manuscrita, escaneada, no transcrita)
- El audio de Aleria diciendo "feliz cumpleaños abuelito" (subido como `.m4a`, reproducido en la tarjeta)
- Los dibujos de Pedro Pablo (One Piece, sol con figuras "tú y yo")
- La tarjeta colaborativa Borrero-Musi con 4 autores en una sola pantalla

Esto NO se podría haber escrito. Tenía que VENIR de la familia.

**Lección**: el código es solo el lienzo. Lo que importa es que cada miembro de la familia se sienta invitado a poner algo de sí mismo en él. Construye para que sea FÁCIL para ellos contribuir.

---

## 10. El primer regalo es para el destinatario, no para Instagram

Andrés nunca pensó "esto va a quedar lindo en LinkedIn". Pensó "papá va a abrir esto en su iPhone, en Marbella, el día de su cumpleaños". Cada decisión visual y técnica respondió a ese imaginario.

**Lección**: visualiza concretamente el momento de uso. Quién, dónde, con qué dispositivo, a qué hora, en qué estado emocional. Eso te ancla.
