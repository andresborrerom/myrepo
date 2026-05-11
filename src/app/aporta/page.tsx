import PasswordGate from '@/components/PasswordGate';
import AportaClient from './AportaClient';
import { isFamilyAuth } from '@/lib/auth';
import { getPublicClient } from '@/lib/supabase';
import type { Aporte } from '@/data/aportes-types';

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

  // Carga el contador y los últimos 3 aportes publicados.
  const supabase = getPublicClient();
  let total = 0;
  let ultimos: Aporte[] = [];
  if (supabase) {
    const { count } = await supabase
      .from('aportes')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published');
    total = count || 0;

    const { data } = await supabase
      .from('aportes')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3);
    ultimos = (data || []) as Aporte[];
  }

  return <AportaClient initialTotal={total} initialUltimos={ultimos} />;
}
