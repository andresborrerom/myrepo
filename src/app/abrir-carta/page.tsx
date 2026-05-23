import { CARTAS, BIRTH_YEAR } from '@/data/cartas';
import { getDayIndex } from '@/lib/cartas-fetch';
import AbrirCartaRedirect from './AbrirCartaRedirect';

export const metadata = { title: 'Abre tu carta' };
export const dynamic = 'force-dynamic';

export default function AbrirCartaPage() {
  const dayIdx = getDayIndex();

  // Años con carta sembrada que ya se "desbloquearon" según el calendario.
  const releasedYears =
    dayIdx === null
      ? []
      : CARTAS.map((c) => c.year)
          .filter((y) => y - BIRTH_YEAR <= dayIdx)
          .sort((a, b) => a - b);

  return <AbrirCartaRedirect releasedYears={releasedYears} antesDelCumple={dayIdx === null} />;
}
