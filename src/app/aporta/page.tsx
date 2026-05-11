import PasswordGate from '@/components/PasswordGate';
import AportaClient from './AportaClient';
import { isFamilyAuth } from '@/lib/auth';
import { fetchAportesCount, fetchPublishedAportes } from '@/lib/aportes-fetch';

export const metadata = { title: 'Aporta' };
export const dynamic = 'force-dynamic';

export default async function AportaPage() {
  if (!isFamilyAuth()) {
    return (
      <PasswordGate
        title="La casa de papá"
        subtitle="Aquí entras tú, familia. Pídele la contraseña a Andrés."
        endpoint="/api/aporta/auth"
      />
    );
  }

  const total = await fetchAportesCount();
  const ultimos = await fetchPublishedAportes({ limit: 3 });

  return <AportaClient initialTotal={total} initialUltimos={ultimos} />;
}
