export type TarjetaCumple = {
  id: string;
  fromName: string;
  fromShortName?: string;
  fromRelation?: string;
  branchColor?: string;
  greeting?: string;
  body?: string;
  signoff?: string;
  signature?: string;
  song?: {
    title: string;
    artist: string;
    youtubeVideoId: string;
  };
  coverImage?: {
    src: string;
    alt: string;
    objectPosition?: string;
    layout?: 'overlay' | 'stacked';
  };
  bodyImage?: {
    src: string;
    alt: string;
  };
  bodyImagesExtra?: {
    src: string;
    alt: string;
  }[];
  bodyAfterImagesText?: string;
  bodyVideo?: {
    src: string;
    poster?: string;
    label?: string;
  };
  bodyAudio?: {
    src: string;
    label?: string;
  };
  // Múltiples autores dentro de la tarjeta (ej. familia entera).
  // Cada uno se renderiza con su nombre en script + divisor + texto.
  bodyAuthors?: {
    name: string;
    text: string;
  }[];
};

const marceBody =
`¡75 años! Y mientras pensaba en esta carta, no pude evitar viajar en el tiempo al día en que nos conocimos… jamás olvidaré tu cara roja como un tomate, tu mirada fija en tus hijos (especialmente en Pocho, el "adulto responsable" de ese momento 😄), tu preocupación por el famoso corte de pelo de Camilo… ¡y para completar, los bomberos subiendo la montaña preguntando por un grupo perdido! Definitivamente, ese día fue todo menos normal… y totalmente inolvidable.

Desde entonces, hemos compartido tantos momentos que me llenan el corazón: esas copas de vino que parecen saber mejor cuando las tomo contigo y que siempre terminan en carcajadas; nuestras conversaciones en el sauna que con tanto cariño me prendes porque sabes cuánto lo disfruto; las Navidades entre risas, con los chistes de la suegrita (¡y ustedes dos juntos siendo pura candela! 🔥), donde a veces salgo un poquito damnificada… pero siempre feliz de verte reír así.

Hoy, al escribirte, me doy cuenta de algo muy especial: la enorme alegría que me ha dado tenerte en mi vida. Qué lindos recuerdos, qué momentos tan llenos de vida, qué sensación tan bonita celebrar estos 75 años tuyos. Eres, sin duda, el corazón de esta familia, y gracias a ti tantos momentos se convierten en recuerdos que llevaremos siempre con nosotros.

Siempre te he escrito desde el agradecimiento, por todo lo que nos das… pero hoy quiero hacerlo desde la alegría: la alegría de haberte conocido, de compartir contigo, y de tener el inmenso orgullo de poder llamarte suegrito.

Que la vida te llene de salud, energía y muchísimos momentos más para seguir celebrando juntos.`;

const camiloBody =
`¡Feliz cumpleaños! Hoy celebramos nada menos que 75 años de vida, de historias, de aprendizajes y, sobre todo, de amor entregado a quienes te rodeamos. Y no puedo dejar pasar este día sin decirte lo importante que eres para mí y lo orgulloso y agradecido que me siento de tenerte como padre.

Siempre he admirado tu generosidad. Esa manera tan natural que tienes de dar sin esperar nada a cambio, de ayudar, de estar presente y de preocuparte por todos. A lo largo de mi vida he visto cómo haces sentir especiales a las personas que quieres, y creo que eso es uno de los regalos más grandes que alguien puede tener. Tu bondad ha dejado huella en nuestra familia y en todos los que han tenido la suerte de conocerte.

También quiero que sepas que has sido un gran padre. No perfecto —porque nadie lo es—, pero sí presente, cariñoso y auténtico. Me has enseñado muchísimo con tus palabras, pero aún más con tu ejemplo. Muchas veces pienso en todo lo que hiciste por nosotros sin hacer ruido, simplemente porque así eres tú: generoso, trabajador y siempre dispuesto a dar lo mejor.

Hoy quiero que disfrutes de este cumpleaños rodeado de cariño, porque te lo mereces. Ojalá puedas sentir el orgullo y el amor que todos sentimos por ti. Tus 75 años son una celebración enorme para nuestra familia, y para mí son también una oportunidad para darte las gracias por tantas cosas que quizá no digo lo suficiente.

Gracias por cada conversación, cada consejo, cada esfuerzo y cada gesto de amor a lo largo de todos estos años. Espero que este nuevo año de vida te traiga alegría, tranquilidad y muchos momentos felices.`;

const alissaBody =
`Hoy quiero aprovechar este día tan especial para felicitarte y desearte un cumpleaños lleno de alegría, salud y momentos bonitos. El año que viene sé que no me vuelvo a perder tu fiesta.

Además de felicitarte, quiero aprovechar para darte las gracias de corazón.

Gracias por todo lo que haces por nosotros, por estar siempre ahí y por tu generosidad y apoyo constante. En lo personal, quiero agradecerte especialmente el cariño y el apoyo que me has dado durante mi tratamiento. En momentos difíciles, sentir ese respaldo y esa preocupación sincera significa muchísimo más de lo que a veces sé expresar.

También gracias por regalarnos tantos momentos bonitos en familia, por los viajes, las risas y los recuerdos tan divertidos que compartimos y que quedan para siempre. Son experiencias que valoramos muchísimo y que forman parte de nuestra historia familiar.

Que disfrutes muchísimo de tu día, rodeado de las personas que te quieren mucho como tu familia y amigos maravillosos y celebrando como te mereces.`;

const andresBody =
`75 años que nos invitan a festejar en grande y atravesar el mundo para acompañarte. Es un momento importante, no lo dejemos pasar por alto. Un pequeño alto en el camino y poner la vida en pausa para estar presentes en todo sentido, contigo y con nadie más así sea por un día. Démonos la libertad que la vida y sus responsabilidades nos ha quitado para cantarte a todo pulmón y reírnos de la suerte que tenemos los Borrero, en cada parte de su árbol, de tener un padre que nos ha dado un piso en el que nos despreocupemos de las necesidades básicas que pide cada familia y que en este mundo ya no es menor conseguir.

Una pausa de parte tuya para ver que te queremos, que te queremos mimar de vuelta si nos lo permites, que queremos estar más cerca de ti si te das el tiempo de visitarnos, que no te quedes en hotel que en las casas que nos has dado cabes y estarás mucho más cómodo con el calor que dan hijos, hijas, nueras y nietos. Que si no es jugando golf, que sea en la playa, en el patio, en el restaurante al que te queremos llevar, sea o no de altísima calidad de servicio michelín que te mereces, pero que te asegura un plato de todo tu gusto con fríjoles o con langosta.

He preparado una nueva vida en un nuevo país, en donde queremos consentirte Marce, Luchi, Pepe y yo con todo el amor y respeto que te tenemos. Hotel 7 estrellas que ofrece el calor de hogar que entiendo te agobia 365 días al año pero que seguro disfrutarás al menos unos cuantos, repartidos por el mundo donde cada familia te espera con los brazos abiertos.

Acerquémonos padre mío, con amor cariño y respeto por lo que la vida de todos ha traído y que los miedos y retos que en cada lugar cada quien ha vencido (o sigue luchando para hacerlo) no sean impedimento de compartir risas, abrazos, desayunos, un postre con tres cucharas y unos cuentos de mi papa que queremos oír por primera vez o de nuevo, con tus nietos que preguntan más de lo que imaginas por ti.

¡¡FELIZ CUMPLEAÑOS!! Y que celebremos cada año que sigue como este. Cuenta conmigo.`;

const carolinaBody =
`Hoy quisiera detener el tiempo y hablarte directamente al corazón. Sé que no lo digo tantas veces como debería, o tal vez la distancia no lo hace tan fácil de demostrar, pero quiero que sepas esto con total certeza: siempre veo todo lo que haces por nosotros y estoy increíblemente agradecida con Dios por haberte hecho nuestro papá.

Cuando Él decidió confiarte la vida de nosotros, tus hijos y nietos, sabía exactamente lo que hacía. Te eligió a ti porque en tu alma siempre se refleja su propio amor. Yo veo tu paciencia, esfuerzo y valentía. Veo tus manos fuertes de tanto trabajar a lo largo de tu vida, pero dispuestas siempre a sostener, abrazar y guiar.

Sé que hay días en los que sientes que me falta decírtelo y demostrártelo, y días en los que he fallado como persona y como hija. Y eso me pesa demasiado, aunque siempre has estado dispuesto a perdonarme y a acogerme de vuelta. Dios también lo ve. Y en mis momentos de mayor debilidad es donde tu fuerza más me ha sostenido.

Siempre has sido un papá que muestra su amor a través de abrazos, que corrige con sabiduría y que ama sin condiciones.

Me has enseñado a ser independiente, a reconocer lo bueno de la vida y a levantarme cuando caigo.

Sé que no estás solo en esta hermosa labor: Papá Dios camina contigo en cada paso. Cuando nos miras con amor, Él nos mira a través de ti. Cuando te has sacrificado por nosotros y entendido nuestras debilidades, estás reflejando su enorme corazón.

Te has ganado todas las bendiciones del mundo, tu labor no pasa desapercibida y tu legado vivirá para siempre.

Tus nietas y yo siempre estaremos aquí para seguir el camino juntos (con todo lo que nos depare) y para juntos disfrutar las maravillas que nos rodean y que tanto nos enseñaste a valorar.

Te queremos con toda nuestra alma y de verdad, de todo corazón, te deseo solo lo mejor del mundo para cada día de tu vida.

Celebra como sabes hacerlo, rodeado de tanta gente que te quiere. Me hubiera encantado estar allá contigo, pero sé que todo llegará en su momento perfecto.`;

export const TARJETAS_CUMPLE: TarjetaCumple[] = [
  {
    id: 'marce',
    fromName: 'Marcela Cabarcas',
    fromShortName: 'Marce',
    fromRelation: 'Nuerita',
    branchColor: 'bg-olive-700',
    greeting: 'Querido suegrito,',
    body: marceBody,
    signoff: 'Con todo mi cariño,',
    signature: 'Marce',
    song: {
      title: 'El Rey',
      artist: 'Vicente Fernández',
      youtubeVideoId: '5jmE8UsaM2U'
    },
    coverImage: {
      src: '/images/cumpleanos/marce-papa.jpg',
      alt: 'Marce y Alejandro en la playa al anochecer',
      objectPosition: 'center',
      layout: 'overlay'
    },
    bodyVideo: {
      src: '/videos/marce.mov',
      label: 'Un video de Marce'
    }
  },
  {
    id: 'alexandra',
    fromName: 'Alexandra Borrero',
    fromShortName: 'Alexandra',
    fromRelation: 'Hija',
    branchColor: 'bg-olive-600',
    song: {
      title: 'Father and Son',
      artist: 'Cat Stevens',
      youtubeVideoId: 'P6zaCV4niKk'
    },
    coverImage: {
      src: '/images/cumpleanos/alexandra-portada.jpg',
      alt: 'Collage de Alexandra con su papá a través de los años',
      layout: 'stacked'
    },
    bodyImage: {
      src: '/images/cumpleanos/alexandra-tarjeta.jpg',
      alt: 'Tarjeta de Alexandra para Alejandro en sus 75 años'
    }
  },
  {
    id: 'camilo',
    fromName: 'Camilo Borrero',
    fromShortName: 'Camilo',
    fromRelation: 'Hijo',
    branchColor: 'bg-clay-400',
    greeting: 'Querido papá:',
    body: camiloBody,
    signoff: 'Gracias Papa,',
    signature: 'Te quiero mucho.',
    song: {
      title: 'Take Five',
      artist: 'Dave Brubeck',
      youtubeVideoId: '-DHuW1h1wHw'
    },
    coverImage: {
      src: '/images/cumpleanos/camilo-portada.jpg',
      alt: 'Collage de Camilo con su papá a través de los años',
      layout: 'stacked'
    }
  },
  {
    id: 'luchi',
    fromName: 'Lucía Borrero',
    fromShortName: 'Luchi',
    fromRelation: 'Nieta (hija de Andrés)',
    branchColor: 'bg-olive-500',
    song: {
      title: 'Los Buenos Tiempos',
      artist: 'Carlos Vives',
      youtubeVideoId: 'JH70Fkh-XD4'
    },
    coverImage: {
      src: '/images/cumpleanos/luchi-portada.jpg',
      alt: 'Collage de Luchi con su abuelo a través de los años',
      layout: 'stacked'
    },
    bodyImage: {
      src: '/images/cumpleanos/luchi-tarjeta.jpg',
      alt: 'Tarjeta manuscrita de Luchi para su abuelo en sus 75 años'
    },
    bodyImagesExtra: [
      {
        src: '/images/cumpleanos/luchi-caballo-verde.jpg',
        alt: 'Caballo verde hecho con bolígrafo 3D'
      },
      {
        src: '/images/cumpleanos/luchi-caballo-azul.jpg',
        alt: 'Caballo azul hecho con bolígrafo 3D'
      }
    ],
    bodyAfterImagesText:
`Gracias por siempre estar ahí para mí.
Muchas gracias por hacerme sentir parte de la familia.
Gracias por el regalo del caballo.
Gracias porque este año estuvo lleno de alegría para ti.
Gracias por los recuerdos lindos que hemos creado este año.
Gracias por ayudarme a formar la persona que soy hoy.
Gracias por tu generosidad.
Gracias por todo el tiempo que me has brindado.
Gracias por los abrazos que me has dado.
Gracias por siempre creer en mí.
Gracias por tu paciencia.
Gracias por reír conmigo.
Gracias por mostrarme lo que es una pasión.
Gracias por todas las sonrisas.
Gracias por todas las vueltas.
Gracias por llenar mi vida.`
  },
  {
    id: 'carolina',
    fromName: 'Carolina Borrero',
    fromShortName: 'Carolina',
    fromRelation: 'Hija',
    branchColor: 'bg-clay-700',
    greeting: 'Querido papá:',
    body: carolinaBody,
    signoff: 'Miles de besos y abrazos, te quiero enormemente.',
    signature: 'Tu hija Carolina',
    song: {
      title: 'Oye',
      artist: 'La Sonora Dinamita',
      youtubeVideoId: 'HevEkdeWKmo'
    },
    coverImage: {
      src: '/images/cumpleanos/carolina-tarjeta.jpg',
      alt: 'Tarjeta festiva de Carolina para Alejandro',
      layout: 'stacked'
    }
  },
  {
    id: 'andres',
    fromName: 'Andrés Borrero',
    fromShortName: 'Pocho',
    fromRelation: 'Hijo',
    branchColor: 'bg-olive-700',
    greeting: '¡Padre mío!! ¡Feliz cumpleaños a ti!',
    body: andresBody,
    signoff: 'Te adoro,',
    signature: 'Andrés',
    song: {
      title: 'My Way',
      artist: 'Frank Sinatra',
      youtubeVideoId: 'qQzdAsjWGPg'
    },
    coverImage: {
      src: '/images/cumpleanos/andres-portada.jpg',
      alt: 'Collage de Andrés (Pocho) con su papá a través de los años',
      layout: 'stacked'
    }
  },
  {
    id: 'pedro-pablo',
    fromName: 'Pedro Pablo Borrero Cabarcas',
    fromShortName: 'Pedro Pablo',
    fromRelation: 'Nieto (hijo de Andrés)',
    branchColor: 'bg-olive-500',
    song: {
      title: 'What a Wonderful World',
      artist: 'Louis Armstrong',
      youtubeVideoId: 'rBrd_3VMC3c'
    },
    coverImage: {
      src: '/images/cumpleanos/pedro-pablo-portada.jpg',
      alt: 'Tarjeta "Felices 75 Abuelito" con collage de fotos de Pedro Pablo y su abuelo',
      layout: 'stacked'
    },
    bodyImagesExtra: [
      {
        src: '/images/cumpleanos/pedro-pablo-dibujo-1.jpg',
        alt: 'Carta manuscrita de Pedro Pablo: Felices 75 años abuelito'
      },
      {
        src: '/images/cumpleanos/pedro-pablo-dibujo-2.jpg',
        alt: 'Dibujo de Pedro Pablo: One Piece, barco pirata con personajes'
      },
      {
        src: '/images/cumpleanos/pedro-pablo-dibujo-3.jpg',
        alt: 'Dibujo de Pedro Pablo: el abuelo, un caballo y él'
      }
    ]
  },
  {
    id: 'alissa',
    fromName: 'Alissa',
    fromShortName: 'Ali',
    branchColor: 'bg-clay-600',
    greeting: 'Querido Alejandro,',
    body: alissaBody,
    signoff: 'Te queremos mucho,',
    signature: 'Martin y Ali',
    song: {
      title: 'Color Esperanza',
      artist: 'Diego Torres',
      youtubeVideoId: 'Nb1VOQRs-Vs'
    },
    coverImage: {
      src: '/images/cumpleanos/alissa-papa.jpg',
      alt: 'Ali y Alejandro en la playa al anochecer',
      layout: 'overlay'
    }
  },
  {
    id: 'aleria',
    fromName: 'Aleria Borrero',
    fromShortName: 'Ale',
    fromRelation: 'Nieta (hija de Carolina)',
    branchColor: 'bg-clay-500',
    greeting: 'Abuelito:',
    body:
`Espero que la pases súper bien el día de tu cumpleaños, espero que te lluevan bendiciones. Te quiero mucho y ya quiero verte muy pronto. ¡Te extraño! Y que Dios te bendiga.`,
    signature: 'Ale',
    coverImage: {
      src: '/images/cumpleanos/aleria-tarjeta.jpg',
      alt: 'Dibujo de Aleria: sol con dos figuras "tú y yo" y "Feliz cumple abuelito"',
      layout: 'stacked'
    },
    bodyAudio: {
      src: '/videos/AUDIO-aleria.m4a',
      label: 'Un mensaje de voz de Ale'
    }
  },
  {
    id: 'carlota',
    fromName: 'Carlota Borrero',
    fromShortName: 'Tota',
    fromRelation: 'Nieta (hija de Carolina)',
    branchColor: 'bg-clay-400',
    greeting: '¡Hola abuelito!',
    body:
`Espero que mañana tengas un día muy especial y que disfrutes tu día especial de mañana. Espero que la pases súper híper mega bien. Te mando mil besos, te quiero, ¡besos!! Muaaaaa`,
    signature: 'Tota',
    coverImage: {
      src: '/images/cumpleanos/carlota-tarjeta.jpg',
      alt: 'Tarjeta de Tota: "feliz cumpleaños Abuelito!" con sol naranja y montaña azul. "Eres el mejor abuelo del mundo entero"',
      layout: 'stacked'
    },
    bodyAudio: {
      src: '/videos/AUDIO-carlota.m4a',
      label: 'Un mensaje de voz de Tota'
    }
  },
  {
    id: 'miranda',
    fromName: 'Miranda Borrero',
    fromShortName: 'Miri',
    fromRelation: 'Nieta (hija de Alexandra)',
    branchColor: 'bg-olive-600',
    song: {
      title: 'Quiero Amanecer',
      artist: 'Lucho Bermúdez',
      youtubeVideoId: 'BIQctjID_v0'
    },
    coverImage: {
      src: '/images/cumpleanos/miranda-portada.jpg',
      alt: 'Tarjeta de Miranda: "Feliz Cumpleaños" con torta de tres pisos azul y verde',
      layout: 'stacked'
    },
    bodyImage: {
      src: '/images/cumpleanos/miranda-tarjeta.jpg',
      alt: 'Carta manuscrita de Miranda sobre un green de golf'
    }
  },
  {
    id: 'borrero-musi',
    fromName: 'Familia Borrero-Musi',
    fromShortName: 'Borrero-Musi',
    fromRelation: 'Luis Fer, Susi, Alejo y Valentina',
    branchColor: 'bg-clay-500',
    song: {
      title: 'El Camino de la Vida',
      artist: 'Trío América',
      youtubeVideoId: '8fMnvRwHCGg'
    },
    coverImage: {
      src: '/images/cumpleanos/borrero-musi-portada.jpg',
      alt: 'Collage de la familia Borrero-Musi con el abuelo a través de los años',
      layout: 'stacked'
    },
    bodyImage: {
      src: '/images/cumpleanos/borrero-musi-susi.jpg',
      alt: 'Texto de Susi sobre fondo de hojas de árbol — "Feliz cumpleaños número 75"'
    },
    bodyAuthors: [
      {
        name: 'Alejo',
        text:
`Despertar con mi abuelo y acostarme en la cama mientras comía mermelada en tostadas provocó 2 cosas dentro de mí. Un gusto por lo dulce y una comprensión de lo mucho que me quería mi abuelo.

A través de los hemisferios, su amor y dedicación a sus nietos ha sido mágico y tal vez la próxima vez que cumpla 75 años pueda ir a su fiesta de cumpleaños y devolver el amor que he tenido tanta suerte de recibir.`
      },
      {
        name: 'Valentina',
        text:
`Feliz cumpleaños número 75, Abuelo.

Te deseamos un año lleno de paz y tiempo con las personas que más quieres. Nos hace muy felices celebrar este momento contigo y esperamos que el año que viene esté lleno de buenos momentos con familia y amigos.`
      },
      {
        name: 'Luis Fer',
        text:
`Papá mío: ¡qué vida buena que hemos tenido! Buena salud y mala memoria, pero, sobre todo, bendiciones y amor por donde sea. Gratitud infinita a Dios, a la vida, pero, sobre todo, a ti, por haber sido el mejor padre del mundo.

Estoy esperando a tu cumpleaños 90 para decirlo a cuatro vientos, pero a los 75 es hora de dar la primera vuelta al ruedo, porque ya hemos ganado.

Espero seguir disfrutando de tu amor y gran compañía todas las semanas, todos los años, y que me queden muchas oportunidades para devolverte tantas oportunidades, apoyo y amor.

¡Dios te bendiga siempre!`
      }
    ]
  }
];

export function getTarjetaCumple(id: string): TarjetaCumple | undefined {
  return TARJETAS_CUMPLE.find((t) => t.id === id);
}

export function getTeaserCumple(t: TarjetaCumple, max = 180): string {
  const first = (t.body || '').split(/\n\s*\n/)[0] || '';
  return first.length > max ? first.slice(0, max).trimEnd() + '…' : first;
}
