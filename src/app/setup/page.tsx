import PasswordGate from '@/components/PasswordGate';
import SetupClient from './SetupClient';
import { isAdminAuth } from '@/lib/auth';

export const metadata = { title: 'Setup' };
export const dynamic = 'force-dynamic';

export default function SetupPage() {
  if (!isAdminAuth()) {
    return (
      <PasswordGate
        title="Setup de la casa"
        subtitle="Operación una sola vez. Necesita admin."
        endpoint="/api/admin/auth"
      />
    );
  }
  return <SetupClient />;
}
