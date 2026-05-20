export type TarjetaCumple = {
  id: string;
  fromName: string;
  fromShortName?: string;
  fromRelation?: string;
  branchColor?: string;
  greeting?: string;
  body: string;
  signoff?: string;
  signature: string;
  song?: {
    title: string;
    artist: string;
    youtubeVideoId: string;
  };
};

const marceBody =
`¡75 años! Y mientras pensaba en esta carta, no pude evitar viajar en el tiempo al día en que nos conocimos… jamás olvidaré tu cara roja como un tomate, tu mirada fija en tus hijos (especialmente en Pocho, el "adulto responsable" de ese momento 😄), tu preocupación por el famoso corte de pelo de Camilo… ¡y para completar, los bomberos subiendo la montaña preguntando por un grupo perdido! Definitivamente, ese día fue todo menos normal… y totalmente inolvidable.

Desde entonces, hemos compartido tantos momentos que me llenan el corazón: esas copas de vino que parecen saber mejor cuando las tomo contigo y que siempre terminan en carcajadas; nuestras conversaciones en el sauna que con tanto cariño me prendes porque sabes cuánto lo disfruto; las Navidades entre risas, con los chistes de la suegrita (¡y ustedes dos juntos siendo pura candela! 🔥), donde a veces salgo un poquito damnificada… pero siempre feliz de verte reír así.

Hoy, al escribirte, me doy cuenta de algo muy especial: la enorme alegría que me ha dado tenerte en mi vida. Qué lindos recuerdos, qué momentos tan llenos de vida, qué sensación tan bonita celebrar estos 75 años tuyos. Eres, sin duda, el corazón de esta familia, y gracias a ti tantos momentos se convierten en recuerdos que llevaremos siempre con nosotros.

Siempre te he escrito desde el agradecimiento, por todo lo que nos das… pero hoy quiero hacerlo desde la alegría: la alegría de haberte conocido, de compartir contigo, y de tener el inmenso orgullo de poder llamarte suegrito.

Que la vida te llene de salud, energía y muchísimos momentos más para seguir celebrando juntos.`;

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
    }
  }
];

export function getTarjetaCumple(id: string): TarjetaCumple | undefined {
  return TARJETAS_CUMPLE.find((t) => t.id === id);
}

export function getTeaserCumple(t: TarjetaCumple, max = 180): string {
  const first = t.body.split(/\n\s*\n/)[0] || '';
  return first.length > max ? first.slice(0, max).trimEnd() + '…' : first;
}
