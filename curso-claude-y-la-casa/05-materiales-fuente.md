# Materiales fuente

Referencias y fuentes adicionales que el curso puede aprovechar. Apuntan a (a) archivos dentro de esta misma carpeta, (b) elementos del repo original si tienes acceso, (c) cosas externas.

---

## En esta misma carpeta

- **`README-PROMPT.md`** — Punto de entrada. Lee primero.
- **`01-contexto.md`** — Historia familiar real del homenajeado (anonimizar antes de publicar el curso).
- **`02-momentos-clave.md`** — Cronología emocional del proyecto en 10 fases.
- **`03-lecciones-tecnicas.md`** — 10 patrones que funcionaron + 7 anti-patrones, con código.
- **`04-lecciones-emocionales.md`** — 10 lecciones de UX y narrativa.
- **`06-bugs-aprendizajes.md`** — Bitácora completa de bugs que generaron reproceso. **Es el caso de estudio del módulo 7 del curso.**
- **`07-vision-producto.md`** — Plan de productizar este regalo como SaaS. Útil para el último módulo del curso ("¿y ahora qué?").

---

## En el repo original (si tienes acceso a `andresborrerom/myrepo`)

Si tienes el repo del proyecto original, los siguientes lugares dan material concreto:

### `git log --oneline` — la narrativa en commits

Cada mensaje de commit cuenta una micro-historia. Algunos commits especialmente narrativos para citar en el curso:

- *"v3 Hacienda: paleta nueva + Vestíbulo con hero, monograma y índice romano"* — el cambio de identidad visual.
- *"Vestíbulo: caballito que recorre el índice hacia el establo activo"* — el detalle memorable del proyecto.
- *"Fix random: pool = TODOS los años con carta (no slicing por día)"* — momento de aprendizaje del bug más grande.
- *"Fix: random NUNCA abre placeholders + 'Ya recibiste' usa estado real"* — corrección de cascada.
- *"Fix CartaGate: confiar al servidor, eliminar day-based check"* — el bug que apareció después de la primera "corrección".
- *"Recordatorio push diario + unifica cartas al modelo aleatorio"* — feature grande que llevó el ritual diario al teléfono.
- *"Tarjeta de la familia Borrero-Musi: múltiples autores en una tarjeta"* — primera tarjeta colaborativa.
- *"Recorrido: cada fila es un establo real + caballo de papa con foto"* — diseño que rompió el grid genérico.

### Estructura de archivos clave

```
src/
├── app/
│   ├── page.tsx                      ← Vestíbulo (hero, índice, recorrido)
│   ├── RecorridoIndex.tsx            ← Cliente con caballito que galopa
│   ├── arbol/
│   │   ├── page.tsx                  ← Foto de ceiba + nodos posicionados
│   │   └── ArbolCeiba.tsx            ← Cliente con layout del árbol
│   ├── cartas/
│   │   ├── page.tsx                  ← Grid de sobres
│   │   └── [year]/
│   │       ├── page.tsx              ← Carta individual
│   │       └── CartaGate.tsx         ← Gate de "una al día"
│   ├── cumpleanos/
│   │   ├── page.tsx                  ← Lista de tarjetas
│   │   ├── TarjetaCover.tsx          ← Portada de tarjeta
│   │   └── [id]/
│   │       ├── page.tsx              ← Tarjeta individual
│   │       └── TarjetaAbrible.tsx    ← Cliente que abre con animación
│   ├── abrir-carta/                  ← Destino de "abrir aleatoria"
│   ├── aporta/                       ← Formulario para la familia
│   ├── buzon/                        ← Feed
│   └── api/
│       ├── alejandro/                ← State + reveal del destinatario
│       ├── aporta/                   ← CRUD de aportes
│       ├── push/                     ← Subscribe + recordatorio
│       └── cron/                     ← Crons diarios (digest, recordatorio)
├── data/
│   ├── cartas.ts                     ← 23 cartas seed
│   ├── family.ts                     ← 14 personas
│   ├── cumpleanos.ts                 ← 12 tarjetas
│   └── ...
├── lib/
│   ├── cartas-fetch.ts               ← LA función central getReleasedYears
│   ├── reveal-state.ts               ← Cliente del estado
│   ├── supabase.ts                   ← Helpers de DB
│   └── push-client.ts                ← Service worker + subscribe
└── components/
    ├── Avatar.tsx
    ├── PushOptIn.tsx
    └── ...
```

### Supabase SQL migrations

`supabase/sql/`:
- `add-foto-perfil-kind.sql` — agregar el kind 'foto-perfil' a aportes.
- `add-position-column.sql` — drag-and-drop reorder.
- `add-push-subscriptions.sql` — tabla de suscripciones push.
- `preopen-3-cartas.sql` — one-off para abrir cartas extras a papá.

---

## Recursos externos referenciados durante el proyecto

- [Apartamento Magazine](https://apartamentomagazine.com/) — referencia editorial fundamental.
- [Hermès Heritage](https://www.hermes.com/) — referencia de identidad visual ecuestre.
- [Hacienda Bambusa](https://www.haciendabambusa.com/) — referencia de "finca colombiana boutique".
- [Phosphor Icons](https://phosphoricons.com/) — íconos usados (sobres, etc.).
- [Iconify](https://icon-sets.iconify.design/) — búsqueda de íconos.
- [Lucide Icons](https://lucide.dev/) — alternativa.
- [CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/) — textura papel SVG.
- [@dnd-kit](https://dndkit.com/) — drag-and-drop library.
- [web-push npm](https://www.npmjs.com/package/web-push) — Web Push del lado servidor.
- [rembg](https://github.com/danielgatis/rembg) — background removal para fotos.

---

## YouTube tracks usados en las tarjetas (ejemplos para el curso)

Para mostrar cómo se integró música en las tarjetas:

- "El Rey" — Vicente Fernández (Marce)
- "That's Life" — Frank Sinatra (Alexandra, después cambió a "Father and Son")
- "Father and Son" — Cat Stevens (Alexandra final)
- "Take Five" — Dave Brubeck (Camilo)
- "Los Buenos Tiempos" — Carlos Vives (Luchi)
- "Oye" — La Sonora Dinamita (Carolina)
- "My Way" — Frank Sinatra (Pocho/Andrés)
- "What a Wonderful World" — Louis Armstrong (Pedro Pablo)
- "Color Esperanza" — Diego Torres (Alissa)
- "Mi Viejo" — Piero (sobrina)
- "Quiero Amanecer" — Lucho Bermúdez (Miranda)
- "El Camino de la Vida" — Trío América (Borrero-Musi)

Estas canciones funcionaron como **firma sonora** de cada autor — el destinatario escucha la canción que cada persona escogió pensando en él.

---

## Capturas de pantalla que el curso debería incluir

(Andrés tiene/puede generar estas. Pedirlas como tarea aparte.)

1. El vestíbulo con el hero del ceiba y el monograma AB·75.
2. Los establos del recorrido con el caballito en el margen izquierdo.
3. El árbol familiar con la ceiba y los nodos posicionados.
4. Una tarjeta cerrada (portada) y la misma abierta (revelada).
5. El grid de sobres en `/cartas` (cerrados con sello dorado vs abiertos).
6. Una carta abierta con su tipografía editorial.
7. Vista mobile del menú de navegación (bottom nav).
8. El push notification llegando al iPhone con "Tu carta de hoy te espera 🐎".

---

## Notas para Claude diseñando el curso

- El nivel de detalle en `06-bugs-aprendizajes.md` es **el corazón** del proyecto. No lo trivialices. Es lo que diferencia el curso de "introducción a Claude Code" de un curso real.
- Andrés es generoso con el contexto pero impaciente con la jerga. Mantén el lenguaje accesible incluso en la pista B.
- El proyecto fue construido en ~6 semanas con sesiones de 1-2 horas al día. Eso es una **prueba** para los estudiantes: con tiempo limitado se puede.
- El monto emocional del regalo (75 años, papá lejos en Marbella) es el HOOK del curso. No lo escondas en el módulo 1.
