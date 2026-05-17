import PasswordGate from '@/components/PasswordGate';
import AdminClient from './AdminClient';
import CoberturaPanel from './CoberturaPanel';
import { isAdminAuth } from '@/lib/auth';
import { fetchAllAportesAdmin } from '@/lib/aportes-fetch';
import { getCobertura } from '@/lib/cartas-fetch';

export const metadata = { title: 'Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!isAdminAuth()) {
    return (
      <PasswordGate
        title="Admin de la casa"
        subtitle="Solo Andrés. Para curar, editar y borrar."
        endpoint="/api/admin/auth"
      />
    );
  }

  // Admin ve TODO (incluyendo flagged/pending) usando service_role server-side.
  const [aportes, cobertura] = await Promise.all([
    fetchAllAportesAdmin(),
    getCobertura()
  ]);

  return (
    <div className="space-y-6 pb-10">
      <CoberturaPanel data={cobertura} />
      <AdminClient initialAportes={aportes} />
    </div>
  );
}
