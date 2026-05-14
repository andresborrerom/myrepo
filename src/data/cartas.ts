// Una carta por cada año de vida de Alejandro: 1951 → 2026 (75 cartas).
// La idea: el día del cumpleaños se revelan las primeras y luego una al día
// durante 75 días. La familia las llena en este archivo.
//
// Para sembrar nuevas cartas, agrega una entrada con `year` único.
// El campo `fromId` debe coincidir con un id en src/data/family.ts.

import { FAMILY } from './family';

export type Carta = {
  year: number;             // 1951..2026, único
  fromId: string;           // id en FAMILY
  title?: string;           // opcional, ej: "El año que naciste"
  body: string;             // texto en español. Saltos de línea = párrafos.
  audioUrl?: string;        // ruta a /public/cartas/xxxx.m4a si hay audio
  publishOn?: string;       // ISO; si está vacío, visible desde el cumpleaños
};

export const BIRTH_YEAR = 1951;
export const TURNS_75_YEAR = 2026;

// Cartas sembradas (placeholders editables — Andrés y la familia las van
// reemplazando). Mientras estén con `body` vacío se muestran como "por venir".
export const CARTAS: Carta[] = [
  {
    year: 1951,
    fromId: 'andres',
    title: 'El año que naciste',
    body:
      'En 1951 llegabas al mundo en Cali. Setenta y cinco años después seguimos ' +
      'celebrando que naciste. Esta casa digital es nuestro abrazo.\n\n' +
      'Con amor, todos.'
  },
  {
    year: 1963,
    fromId: 'andres',
    title: 'El año que no quisiste bajarte del avión',
    body:
      'Tenías doce años, papá. Dejabas Cali con su luz, su valle, su brisa ' +
      'caliente, y aterrizabas en Bogotá: una ciudad fría, llena de gente ' +
      'apurada, con nubes bajas y un acento que no era el tuyo. No querías. ' +
      'Lo dijiste fuerte y lo dijiste callado, y nadie te preguntó.\n\n' +
      'Lo que no podías saber ese año es que sin esa llegada no habría nada ' +
      'de lo que hoy nos rodea. Tus cinco hijos nacimos en esta ciudad. Las ' +
      'casas que construiste con tus manos están plantadas en su sabana. Los ' +
      'jardines, las rosas que viajan desde aquí al mundo entero — todo nace ' +
      'de un niño caleño que no quería estar acá.\n\n' +
      'Aquel duelo de los doce años se convirtió, sin que te dieras cuenta, ' +
      'en el suelo de nuestra vida. Hoy te decimos: gracias por haberte ' +
      'quedado. Gracias por hacer de una ciudad ajena un hogar para cinco ' +
      'familias y para todos los que vinieron después.\n\n' +
      'De tus cinco hijos.'
  },
  {
    year: 1974,
    fromId: 'luis-fernando',
    title: 'El año que me hiciste papá tuyo',
    body: '[Luis Fernando llenará esta carta]'
  },
  {
    year: 1976,
    fromId: 'alexandra',
    title: 'Cuando llegué yo',
    body: '[Alexandra llenará esta carta]'
  },
  {
    year: 1978,
    fromId: 'carolina',
    title: 'La hija del medio',
    body: '[Carolina llenará esta carta]'
  },
  {
    year: 1980,
    fromId: 'andres',
    title: 'Cuando me trajiste a casa',
    body: '[Andrés llenará esta carta]'
  },
  {
    year: 1992,
    fromId: 'camilo',
    title: 'El benjamín',
    body: '[Camilo llenará esta carta]'
  },
  {
    year: 1997,
    fromId: 'andres',
    title: 'El año en que cruzaste el mar',
    body:
      'En diciembre te mudaste a Marbella. Habías pasado treinta y cuatro ' +
      'años en Bogotá: la casa que armaste para cinco familias, los ' +
      'edificios que dibujaste para otras, las rosas que aprendiste a ' +
      'cultivar. Después de todo eso, escogiste otro paisaje, otro idioma ' +
      'del Mediterráneo, otra forma de estar.\n\n' +
      'Desde entonces vuelves a Bogotá para vernos. Y nosotros vamos a ' +
      'Marbella para contarte. La distancia se llena de vuelos y de ' +
      'llamadas. Y, desde hoy, también de esta casa digital — que existe ' +
      'precisamente porque ningún océano va a separar a esta familia.\n\n' +
      'De tus cinco hijos.'
  },
  {
    year: 1998,
    fromId: 'andres',
    title: 'Tu salto del charco',
    body:
`1998 fue tu primer año entero en Marbella. También fue el mío entrando a la universidad — en el 97 yo estaba de chúcaro diciendo "policía un día, policía toda la vida!", y para cuando empezó el 98 tú ya tenías el Mediterráneo enfrente, y yo a punto de empezar universidad. Empezábamos nuevos capítulos.

Papa: desde entonces me has hecho falta. Soy malo para hablar por teléfono y tú para chatear. Y los dos somos buenos para estar juntos cuando estamos en la misma ciudad. Nos faltaron varias rondas de golf, almuerzos domingueros y concentramos en poco meses los whiskeys del año.

Me abriste la puerta a seguirte y yo me quedé pensando en mi mamá. Me quedé en una Bogotá que era mi zona de confort, en sus calles que me sabía de memoria, en los amigos que no me daba ganas de soltar. Para bien o para mal, decidí no cruzar el mar.

Y aquí te digo algo que me ha costado decir en voz alta: me desordené diez años por una falta de guía que elegí desperdiciar. No te lo cuento como reproche. Te lo cuento como prueba de cuánto vale tu cercanía. Cuánta diferencia hace una llamada tuya, un sermón, un silencio tuyo en la sala. La gente como tú no se da cuenta del piso que pone para los demás.

Pero también te digo lo otro: aunque te fuiste, nunca te has ido. He sentido tu abrazo desde lejos, padre mío. En el techo que me regalaste y bajo el cual viven Luchi y Pepe. En cada vez que estoy a punto de equivocarme y oigo tu voz adentro (a dormir q mañana se madruga!) En la manera en que le hablo a Lucía cuando saca a relucir su adolescencia. En los silencios con Marcela que aprendí a heredar con cierta sabiduría en algunos momentos. Has estado conmigo todo el tiempo, y cuando me dicen q me parezco a ti para regañarme me hace gracia porque lo que me produce es algo de orgullo.

Gracias por irte cuando había que irse porque tenías que cuidarte. Gracias por dejar la puerta abierta. Gracias por enseñarme que el amor no se mide en metros sino en apoyo y guía, cuando el hijo la elige recibir.

Te adoro,
Andrés.`
  },
  {
    year: 2000,
    fromId: 'andres',
    title: 'El año en que tu papá se volvió escuela',
    body:
      'Cinco años después de despedir a tu papá, ustedes los hermanos ' +
      'quisieron que su nombre no se quedara solo en una lápida. ' +
      'Inauguraron, en El Corzo de Facatativá, un colegio que llevara su ' +
      'nombre: la Fundación Fernando Borrero Caicedo.\n\n' +
      'Empezó con 34 niños — los hijos de los trabajadores que cuidan las ' +
      'rosas de la familia. Hoy son 619.\n\n' +
      'Cada uno de ellos pronuncia el apellido de tu padre todos los días. ' +
      'Cada vez que alguien en Estados Unidos compra un ramo de Elite en ' +
      'Whole Foods, sin saberlo está mandando algo a ese colegio que lleva ' +
      'el nombre de tu papá.\n\n' +
      'Tu padre no se fue. Se volvió escuela.\n\n' +
      'De tus cinco hijos.'
  }
];

export function getCarta(year: number): Carta | undefined {
  return CARTAS.find((c) => c.year === year);
}

// Para las cartas sin publishOn explícito: se distribuyen una por día desde
// el cumpleaños (21-may-2026), en orden cronológico de año. Carta 1951 = día
// del cumpleaños; 1952 = día siguiente; etc. Total: 75 cartas en 75 días.
const BIRTHDAY_REVEAL = new Date('2026-05-21T07:00:00-05:00');

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function computedRevealDate(year: number): Date {
  // Día relativo: 1951 → 0, 1952 → 1, ..., 2025 → 74.
  const dayOffset = year - BIRTH_YEAR;
  const d = new Date(BIRTHDAY_REVEAL);
  d.setDate(d.getDate() + dayOffset);
  return d;
}

export function getRevealDate(carta: Carta): Date {
  if (carta.publishOn) return new Date(carta.publishOn);
  return computedRevealDate(carta.year);
}

export function getCartasReveladas(now: Date = new Date()): Carta[] {
  return CARTAS
    .filter((c) => getRevealDate(c) <= now)
    .sort((a, b) => a.year - b.year);
}

// La carta cuyo día programado es hoy. Si hoy no toca ninguna, devuelve
// undefined. Útil para destacarla en el Vestíbulo.
export function getCartaDelDia(now: Date = new Date()): Carta | undefined {
  const hoy = startOfDay(now).getTime();
  return CARTAS.find((c) => startOfDay(getRevealDate(c)).getTime() === hoy);
}

export function getAuthor(carta: Carta) {
  return FAMILY.find((p) => p.id === carta.fromId);
}

// Lista completa de los 75 años, marcando cuáles ya tienen carta sembrada.
// Útil para mostrar el "calendario" de progreso a la familia.
export function getYearsCoverage() {
  const years: { year: number; hasCarta: boolean }[] = [];
  for (let y = BIRTH_YEAR; y <= TURNS_75_YEAR; y++) {
    years.push({ year: y, hasCarta: CARTAS.some((c) => c.year === y) });
  }
  return years;
}
