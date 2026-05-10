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
function nacimientosFamiliares(): Hito[] {
  const hoy = TURNS_75_YEAR;
  return FAMILY
    .filter((p) => p.role !== 'patriarca' && p.age !== undefined)
    .map<Hito>((p) => ({
      year: hoy - (p.age as number),
      title: `Nace ${p.shortName || p.name}`,
      description:
        p.role === 'hijo' ? 'Tu hijo llega al mundo.' : 'Llega un nieto.',
      scope: 'familia'
    }));
}

// Hitos sembrados a mano. Andrés y familia los van completando.
const HITOS_SEMBRADOS: Hito[] = [
  { year: 1951, title: 'Nace Alejandro Borrero Ospina', description: 'En Bogotá.', scope: 'familia' },
  { year: 1951, title: 'Colombia gana la Vuelta a Colombia', scope: 'pais' },
  { year: 1969, title: 'Llegada del hombre a la Luna', description: 'Tú tenías 18 años.', scope: 'mundo' },
  // Placeholder de Elite Flower — el agente confirmará año y detalles.
  { year: 1996, title: 'Elite Flower (verificar año)', description: '[A confirmar con el agente investigador]', scope: 'obra' },
  { year: TURNS_75_YEAR, title: '75 años', description: 'Hoy.', scope: 'familia' }
];

export function getTimeline(): Hito[] {
  return [...HITOS_SEMBRADOS, ...nacimientosFamiliares()].sort(
    (a, b) => a.year - b.year || a.scope.localeCompare(b.scope)
  );
}
