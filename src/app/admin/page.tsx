import PasswordGate from '@/components/PasswordGate';
import AdminClient from './AdminClient';
import { isAdminAuth } from '@/lib/auth';
import { getPublicClient } from '@/lib/supabase';
import type { Aporte } from '@/data/aportes-types';

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

  const supabase = getPublicClient();
  let aportes: Aporte[] = [];
  if (supabase) {
    // En admin queremos ver TODO, incluyendo flagged y rejected.
    // RLS con anon solo permite leer published — pero podemos usar service_role
    // server-side. Reemplazo para esta carga.
    const { data } = await supabase
      .from('aportes')
      .select('*')
      .order('created_at', { ascending: false });
    aportes = (data || []) as Aporte[];
  }

  return <AdminClient initialAportes={aportes} />;
}
