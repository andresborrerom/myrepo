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
  },
  {
    year: 2017,
    fromId: 'andres',
    title: 'El año en que llegó Pepe',
    body:
`2017. 6 de julio. Después de buscarlo con Marce dos o tres años, después de dos pérdidas que pesan aunque uno no las cuente, llegó. Mi hijo. Mi motor.

Papa: no sé bien cómo decirte la felicidad que me ha dado este niño. Empecé a ser papá en 2013, cuando Marce y Luchi me adoptaron a mí — no al revés. Ellas dos me enseñaron que yo quería familia. Que después de tanto desorden, lo que más me apetecía era una mesa con voces. Sin Luchi y sin Marce nunca habría buscado a Pepe.

Pero Pepe es otra cosa. Es el hijo que uno arma cuando ya sabe lo que quiere. Lo cargué la primera vez y entendí ese tipo de amor del que tú nunca hablaste mucho pero que debiste sentir cinco veces. El que no se explica. El que lleva a hacer cosas que uno no creía que haría — madrugar, perder noches, leer libros de niños cien veces. Te perdono cada vez que dijiste "ya entenderás cuando seas papa". Sí entendí.

Hoy tiene ocho años. Y lo gracioso, padre mío, es que es parecido a ti. La gente se lo dice como si fuera regaño — "ay, Pepe, igual al abuelo" — y yo por dentro me río, porque para mí es el mejor cumplido. Le gusta la arquitectura más que a mí. Le gusta viajar más que a mí. Tiene ese sentido de la elegancia que yo nunca tuve y que tú sí — se peina, se ajusta el cuello, le importa que las cosas combinen, y me dice "oso" porque le doy algo de pena por mi frescura para ciertas cosas. A los ocho años. Yo a los 46 nada q aprendo eso de querer verme mejor y si me visto bien es porque algo me regalaste.

Quiero que sean cercanos. Mucho. Solo si lo quieres recibir. Sé que es desatento. Sé que vive en otro mundo que no nos tocó como el de las pantallas y demás. Pero cuéntale historias. Cuando se va a dormir le fascina oírlas y preguntar mil cosas. Alguna vez que lo acompañes vas a ver de lo q hablo.

Mientras tanto, padre mío, a mi manera disfruto que me necesite y sigo procurando que algún día no me necesite — esa es la meta. Que se vaya. Que se haga su vida. Pero antes, quiero darle lo mejor que tengo. Y mucho de lo mejor que tengo me lo has dado tú.

Gracias por dejarme tu manera de mirar a los hijos donde uno procura que nada les falte. La inspiración me llegó algo tarde desde Luchi y la doblé con Pepe, pero llegó. Gracias por estar en el alto piso que nos das para que yo pueda estar más pendiente de sus emociones y temores y menos de cómo voy a darle de comer.

Pepe es tuyo también. Habla mas de su abuelo de lo que crees. Te admira. Y aunque él es un apachurre que probablemente no disfrutas mucho en su forma libre de ser, quiero que sepas cuánto te quiere.

Te adoro,
Andrés.`
  },
  {
    year: 2012,
    fromId: 'andres',
    title: 'Mayo del 2012',
    body:
`Treinta y tres años, papa, y por primera vez se me ocurrió que tal vez ya era hora. Que el desorden ya había sido suficiente. Que faltaba alguien.

Conocí a Marce ese mes. Tenía una hija de cuatro años que se llamaba Lucía, y una manera de mirarme que no me dejaba mentir. La escogí — y todavía no entiendo del todo cómo tuve esa claridad. La escogí porque es buena mujer. Porque se desvive por sus hijos. Porque eligió una carrera (y un trabajo muy duro!) donde cría y educa por encima de buscar plata y altos puestos. Porque me dio una hija inmediata — Luchi, que en febrero del 2013 ya estaba viviendo con nosotros en La Calera — y una suegra alcahuetas que le sigue volando a mi casa en el segundo que la necesitamos, sin parpadear.

Pero te confieso algo, papa: hoy entiendo de otra manera lo difícil que es un matrimonio. Lo difícil que es mirar al otro y saber que las discusiones de hace cinco años son las mismas que vamos a tener dentro de treinta. Lo posible que es tomar la decisión de acabarlo. Te entiendo distinto hoy de lo que lo hicimos cuando te fuiste de la casa. Creo que he tenido hasta suerte de seguir casado, y la agradezco; pero sí reconozco lo importante que es valorarlo mucho y más para seguir intentado envejecer juntos.

Y aunque yo no viví tus matrimonios, viendo a Marce reconozco las cosas que valoro más y me pregunto si en algo nos parecimos: la cualidad de hacer hogar. La cualidad de priorizar lo de adentro para que uno pueda salir tranquilo a buscar crecimiento afuera. Lo de pelar las naranjas en cuartos cuando alguien está enfermo, lo de saber qué uniforme va mañana, lo de acompañar las tareas así sean tablas de multiplicar que no se sabe. Esas cosas que no se notan hasta que faltan.

Marce fue el fin de mi desorden. Punto. A los 33 acepté por fin el reto de cargar responsabilidades, y lo gracioso es que no me sentí cargado — me sentí aliviado. Puedo decirte con la mano en el corazón: antes la pasaba más bueno, pero con toda seguridad después de Marce fui más feliz. Las dos cosas son verdad y no se contradicen.

Que estés tranquilo, papa: voy bien acompañado. Pero también sé que nunca hay garantía de envejecer juntos — eso lo entendí también con los años. De pronto gracias a esa misma incertidumbre me he puesto a cuidar más lo que más valoro: mi hogar con Marce, con Luchi, con Pepe. La casa que tú me regalaste es hogar porque ella es su eje.

Y para que esto no se ponga muy serio, padre mío, te confieso una cosa con sonrisa: lo que más me divierte cuando vamos a visitarte es ver cómo Marce se desordena contigo. Con nadie más se suelta así. Algo tendrás de imán, o algo le enseñé yo de mi propio desorden — vaya uno a saber. Porque esos vinos no se los toma con esa frescura fácilmente en otro sitio.

Porque ella se jacta de ser mi buena influencia y sé que lo es; seguramente cuando estamos contigo reconoce que ya tengo otra en frente y se deja ir por unas horas.

Te adoro,
Andrés.`
  },
  {
    year: 2025,
    fromId: 'andres',
    title: 'El año que Luchi se fue a Cornell',
    body:
`2025. Luchi aplicó. Luchi entró. Luchi se va a Cornell.

Papa, no sé si entiendes lo que ese paso significó para mí. Cuando me llegó con la noticia, lo primero que pensé fue en ti. Porque gracias a ti — gracias al piso alto que nos sigues dando — pude acompañarla en todo el proceso sin miedo. Sin tener que decirle nunca "Luchi, esa no nos alcanza muñeta, déjalo para la maestría que ya habrá más adelante". Pude decirle: "ve por la que tú quieras y logres enana! Yo me encargo del resto". Esa frase no la habría podido decir sin ti.

Y ahí, padre mío, te digo algo que me ha dolido en silencio durante años. Yo creo que tuve el talento para hacer lo que ella está haciendo. Pero nunca tuve la estructura. Y siento, a veces, que ese fue el primero de algunas desilusiones que te he causado en la vida.

Pero ahora me llega Luchi, llenándome de felicidad y de orgullo, y al fin entiendo desde el otro lado el posible vacío que sentiste cuando rechacé ir "por todo" y me quedé en mi zona de confort. Es exactamente eso: ver a tu hijo con la oportunidad puesta sobre la mesa y verlo decidir no tomarla. Te entiendo, por fin, en eso también.

Por eso quiero que este triunfo de Luchi lo sientas tuyo también. Aunque no lleve sangre Borrero, te aseguro que sacó lo bueno de los Borrero. Y gran parte de su decisión — para bien o para mal — es porque me ha visto a mí en su vida como yo te veo a ti. Como un papá.

Gracias por esta oportunidad que le das a ella de asistir, y que me das a mí de llevarla tan lejos como su esfuerzo y su dedicación se merecen.

Déjame contarte cómo es esta niña a sus 18 años, padre mío. Tiene un norte clarísimo en la vida. Su determinación me deja boquiabierto. Pone siempre la responsabilidad por encima de la juerga. No le cabe en la cabeza la posibilidad de tomarse un trago de más. Nunca me ha tenido esperando en la puerta a que salga de la fiesta — siempre es ella la que está esperando a que yo llegue por ella. Me hizo madrugar muchos sábados y domingos para llevarla a montar a caballo — su gran pasión secreta, que en Cornell va a seguir viviendo junto con sus estudios. Y nunca sacrifica el orden y la disciplina por momentos de falsa alegría, consciente del costo que tienen.

¿Te suena a alguien?

Luchi es Becerra de sangre, pero es más Alejandro Borrero que yo en ejemplo y en comportamiento.

Te adoro,
Andrés.`
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
