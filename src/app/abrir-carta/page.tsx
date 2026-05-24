import { getDayIndex, getReleasedYears } from '@/lib/cartas-fetch';
import AbrirCartaRedirect from './AbrirCartaRedirect';

export const metadata = { title: 'Abre tu carta' };
export const dynamic = 'force-dynamic';

export default function AbrirCartaPage() {
  const dayIdx = getDayIndex();
  const releasedYears = getReleasedYears();

  return <AbrirCartaRedirect releasedYears={releasedYears} antesDelCumple={dayIdx === null} />;
}
