// Datos canónicos de la familia. Editar aquí cuando lleguen fotos, fechas
// exactas y datos faltantes. Esta es la única fuente de verdad: el árbol,
// el buzón y los perfiles leen desde acá.

export type Person = {
  id: string;
  name: string;
  shortName?: string;
  birthYear?: number;
  birthDate?: string; // ISO 'YYYY-MM-DD'. Si está, el calendario lo usa.
  age?: number;
  parentId?: string | null; // null = raíz (Alejandro). undefined no soportado.
  role: 'patriarca' | 'hijo' | 'nieto';
  photo?: string; // ruta en /public o URL pública. Vacío = avatar de iniciales.
  bio?: string;
  color?: string; // tailwind bg class para colorear su rama (solo en hijos).
};

export const PATRIARCH_ID = 'alejandro';

export const FAMILY: Person[] = [
  {
    id: PATRIARCH_ID,
    name: 'Alejandro Borrero Ospina',
    shortName: 'Alejandro',
    birthYear: 1951,
    birthDate: '1951-05-21',
    age: 75,
    role: 'patriarca',
    parentId: null,
    bio:
      'Caleño de nacimiento, bogotano por destino, marbellí por elección. ' +
      'Arquitecto y constructor (Borrero y Sánchez Cía). Hijo de Fernando ' +
      'Borrero Caicedo. Padre de cinco — a cada uno le construyó una casa ' +
      'para vivir con su familia. Abuelo de ocho. Constructor de hogares, ' +
      'jardines y de un mundo más bello, una flor a la vez.'
  },

  // --- Hijos --- (cada uno con un color para identificar su rama)
  { id: 'luis-fernando', name: 'Luis Fernando Borrero', shortName: 'Luis Fernando', age: 52, birthDate: '1973-08-16', role: 'hijo', parentId: PATRIARCH_ID, color: 'bg-clay-500' },
  { id: 'alexandra',     name: 'Alexandra Borrero',     shortName: 'Alexandra',     age: 50, birthDate: '1975-08-20', role: 'hijo', parentId: PATRIARCH_ID, color: 'bg-olive-600' },
  { id: 'carolina',      name: 'Carolina Borrero',      shortName: 'Carolina',      age: 48, birthDate: '1977-05-31', role: 'hijo', parentId: PATRIARCH_ID, color: 'bg-clay-700' },
  { id: 'andres',        name: 'Andrés Borrero',        shortName: 'Andrés',        age: 46, birthDate: '1979-08-08', role: 'hijo', parentId: PATRIARCH_ID, color: 'bg-olive-700' },
  { id: 'camilo',        name: 'Camilo Borrero',        shortName: 'Camilo',        age: 34, birthDate: '1991-07-03', role: 'hijo', parentId: PATRIARCH_ID, color: 'bg-clay-400' },

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

// Devuelve el hijo (la rama) al que pertenece una persona. Para el patriarca
// devuelve null. Para hijos, ellos mismos. Para nietos, su padre.
export function getRama(personId: string): Person | null {
  const p = getPerson(personId);
  if (!p) return null;
  if (p.role === 'patriarca') return null;
  if (p.role === 'hijo') return p;
  return p.parentId ? getPerson(p.parentId) || null : null;
}

export function getColorRama(personId: string): string {
  const rama = getRama(personId);
  return rama?.color || 'bg-clay-500';
}
