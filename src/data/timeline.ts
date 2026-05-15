// Línea de tiempo de los 75 años. Editar libremente.
// Cada hito tiene año, título corto, descripción opcional, "scope":
// - 'mundo': contexto global (para hacer guiño cuando él era joven)
// - 'pais':  algo de Colombia / Bogotá
// - 'familia': nacimientos, bodas, casas, etc.
// - 'obra':  hitos profesionales (arquitectura, Elite Flower)

import { FAMILY } from './family';
import { TURNS_75_YEAR } from './cartas';

export type Hito = {
  year: number;
  title: string;
  description?: string;
  scope: 'mundo' | 'pais' | 'familia' | 'obra';
};

// Hitos derivados automáticamente del árbol (nacimientos de hijos y nietos).
// Prefiere birthDate (exacto). Si no hay, cae al cálculo por edad (puede
// estar off-by-one si la persona aún no cumplió este año).
function nacimientosFamiliares(): Hito[] {
  const hoy = TURNS_75_YEAR;
  return FAMILY
    .filter((p) => p.role !== 'patriarca')
    .map<Hito | null>((p) => {
      let year: number | null = null;
      if (p.birthDate) {
        const m = /^(\d{4})/.exec(p.birthDate);
        if (m) year = Number(m[1]);
      } else if (p.age !== undefined) {
        year = hoy - p.age;
      }
      if (year === null) return null;
      return {
        year,
        title: `Nace ${p.shortName || p.name}`,
        description:
          p.role === 'hijo' ? 'Tu hijo llega al mundo.' : 'Llega un nieto.',
        scope: 'familia'
      };
    })
    .filter((h): h is Hito => h !== null);
}

// Hitos sembrados a mano. Andrés y familia los van completando.
// Política: solo hitos desde el nacimiento de Alejandro (1951) en adelante.
const HITOS_SEMBRADOS: Hito[] = [
  { year: 1951, title: 'Nace Alejandro Borrero Ospina', description: 'En Cali, Valle del Cauca.', scope: 'familia' },
  {
    year: 1963,
    title: 'Llega a Bogotá',
    description:
      'Con doce años deja Cali y aterriza en una ciudad fría que no eligió. Sin saberlo, está sembrando todo lo que vendrá.',
    scope: 'familia'
  },
  { year: 1969, title: 'Llegada del hombre a la Luna', description: 'Tú tenías 18 años.', scope: 'mundo' },
  {
    year: 1997,
    title: 'Te mudas a Marbella',
    description: 'En diciembre cruzas el océano. Empiezas otra forma de estar.',
    scope: 'familia'
  },
  {
    year: 2000,
    title: 'Nace la Fundación Fernando Borrero Caicedo',
    description:
      'En honor a tu papá. Empezó con 34 niños hijos de trabajadores de Elite Flower; hoy son 619.',
    scope: 'obra'
  },
  {
    year: 2021,
    title: 'Excellence Flowers se vuelve The Elite Flower',
    description: 'Las rosas de tu familia pasan a ser parte del segundo exportador floricultor del país.',
    scope: 'obra'
  },
  { year: TURNS_75_YEAR, title: '75 años', description: 'Hoy.', scope: 'familia' }
];

export function getTimeline(): Hito[] {
  return [...HITOS_SEMBRADOS, ...nacimientosFamiliares()].sort(
    (a, b) => a.year - b.year || a.scope.localeCompare(b.scope)
  );
}
