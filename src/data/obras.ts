// Las obras del estudio de arquitectura de Alejandro: Borrero y Sánchez Cía.
// Edita libremente cuando llegue más info o material físico de la familia.
//
// Para agregar una obra nueva: copia un objeto, cambia id (sin espacios), y
// lo que sepas. Los campos opcionales pueden quedar vacíos.

export type Obra = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  yearBuilt?: number;
  description?: string;
  family_note?: string;  // Anécdota o vínculo familiar
  photo?: string;        // ruta en /public/obras/ o URL pública
};

export const OBRAS: Obra[] = [
  {
    id: 'garden',
    name: 'Edificio Garden',
    address: 'Calle 93 #5-25',
    city: 'Bogotá',
    family_note: 'Aquí nació Andrés y vivió sus primeros 20 años.'
  },
  {
    id: 'buganvilia',
    name: 'Conjunto Buganvilia',
    address: 'Autopista Norte con Calle 147',
    city: 'Bogotá'
  },
  {
    id: 'ciruelos',
    name: 'Los Ciruelos',
    city: 'Bogotá'
  },
  {
    id: 'mirador',
    name: 'Mirador de la Cañada',
    city: 'Bogotá',
    family_note: 'Casa de Alexandra. Y la casa que papá ocupa cuando vuelve de Marbella.'
  }
];
