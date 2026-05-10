// Datos canónicos de la familia. Editar aquí cuando lleguen fotos, fechas
// exactas y datos faltantes. Esta es la única fuente de verdad: el árbol,
// el buzón y los perfiles leen desde acá.

export type Person = {
  id: string;
  name: string;
  shortName?: string;
  birthYear?: number;
  age?: number;
  parentId?: string | null; // null = raíz (Alejandro). undefined no soportado.
  role: 'patriarca' | 'hijo' | 'nieto';
  photo?: string; // ruta en /public o URL pública. Vacío = avatar de iniciales.
  bio?: string;
};

export const PATRIARCH_ID = 'alejandro';

export const FAMILY: Person[] = [
  {
    id: PATRIARCH_ID,
    name: 'Alejandro Borrero Ospina',
    shortName: 'Alejandro',
    birthYear: 1951,
    age: 75,
    role: 'patriarca',
    parentId: null,
    bio:
      'Arquitecto bogotano. Padre de cinco — a cada uno le construyó una casa ' +
      'para vivir con su familia. Abuelo de ocho. Constructor de hogares, ' +
      'jardines y de un mundo más bello, una flor a la vez.'
  },

  // --- Hijos ---
  { id: 'luis-fernando', name: 'Luis Fernando Borrero', shortName: 'Luis Fernando', age: 52, role: 'hijo', parentId: PATRIARCH_ID },
  { id: 'alexandra',     name: 'Alexandra Borrero',     shortName: 'Alexandra',     age: 50, role: 'hijo', parentId: PATRIARCH_ID },
  { id: 'carolina',      name: 'Carolina Borrero',      shortName: 'Carolina',      age: 48, role: 'hijo', parentId: PATRIARCH_ID },
  { id: 'andres',        name: 'Andrés Borrero',        shortName: 'Andrés',        age: 46, role: 'hijo', parentId: PATRIARCH_ID },
  { id: 'camilo',        name: 'Camilo Borrero',        shortName: 'Camilo',        age: 34, role: 'hijo', parentId: PATRIARCH_ID },

  // --- Nietos ---
  { id: 'alejo',        name: 'Alejo',        age: 16, role: 'nieto', parentId: 'luis-fernando' },
  { id: 'valentina',    name: 'Valentina',    age: 14, role: 'nieto', parentId: 'luis-fernando' },
  { id: 'miranda',      name: 'Miranda',      age: 18, role: 'nieto', parentId: 'alexandra' },
  { id: 'aleria',       name: 'Aleria',       age: 11, role: 'nieto', parentId: 'carolina' },
  { id: 'carlota',      name: 'Carlota',      age:  9, role: 'nieto', parentId: 'carolina' },
  { id: 'lucia',        name: 'Lucía',        age: 18, role: 'nieto', parentId: 'andres' },
  { id: 'pedro-pablo',  name: 'Pedro Pablo',  age:  8, role: 'nieto', parentId: 'andres' },
  { id: 'martin',       name: 'Martín',       age:  3, role: 'nieto', parentId: 'camilo' }
];

export function getPerson(id: string): Person | undefined {
  return FAMILY.find((p) => p.id === id);
}

export function getChildren(parentId: string): Person[] {
  return FAMILY.filter((p) => p.parentId === parentId);
}

export function getBranch(childId: string): Person[] {
  // Una "rama" es un hijo + sus hijos (los nietos de Alejandro).
  const child = getPerson(childId);
  if (!child) return [];
  return [child, ...getChildren(childId)];
}

export const HIJOS = FAMILY.filter((p) => p.role === 'hijo');
export const NIETOS = FAMILY.filter((p) => p.role === 'nieto');
