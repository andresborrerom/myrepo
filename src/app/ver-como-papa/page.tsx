import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ver como papá' };

// Borra la cookie de familia y redirige al vestíbulo. Sirve para que la
// familia pueda previsualizar exactamente lo que ve papá (sin override
// de insider). Para volver al modo familia: entrar a /aporta y re-autenticar.
export default function VerComoPapa() {
  cookies().delete('casa-aporta-gate');
  redirect('/');
}
