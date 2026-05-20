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
    }
  },
  {
    id: 'alexandra',
    fromName: 'Alexandra Borrero',
    fromShortName: 'Alexandra',
    fromRelation: 'Hija',
    branchColor: 'bg-olive-600',
    song: {
      title: "That's Life",
      artist: 'Frank Sinatra',
      youtubeVideoId: 'UCENTf_LWYA'
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
  }
];

export function getTarjetaCumple(id: string): TarjetaCumple | undefined {
  return TARJETAS_CUMPLE.find((t) => t.id === id);
}

export function getTeaserCumple(t: TarjetaCumple, max = 180): string {
  const first = (t.body || '').split(/\n\s*\n/)[0] || '';
  return first.length > max ? first.slice(0, max).trimEnd() + '…' : first;
}
