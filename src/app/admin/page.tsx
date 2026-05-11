import PasswordGate from '@/components/PasswordGate';
import AdminClient from './AdminClient';
import { isAdminAuth } from '@/lib/auth';
import { fetchAllAportesAdmin } from '@/lib/aportes-fetch';

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
  const aportes = await fetchAllAportesAdmin();

  return <AdminClient initialAportes={aportes} />;
}
