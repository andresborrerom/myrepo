import { NextResponse } from 'next/server';
import { isAdminAuth } from '@/lib/auth';
import { getServiceClient, APORTES_BUCKET } from '@/lib/supabase';

// POST /api/setup — operaciones idempotentes para arrancar:
// 1. Crear bucket aportes-media si no existe
// 2. Verificar que la tabla aportes existe (si no, devuelve instrucción
//    de pegar el SQL manualmente)

export async function POST() {
  if (!isAdminAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Faltan env vars SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_URL' },
      { status: 500 }
    );
  }

  const steps: Record<string, string> = {};

  // 1. Bucket
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === APORTES_BUCKET);
    if (exists) {
      steps.bucket = 'ya existía';
    } else {
      const { error } = await supabase.storage.createBucket(APORTES_BUCKET, {
        public: true,
        fileSizeLimit: 50_000_000  // 50 MB
      });
      steps.bucket = error ? `error: ${error.message}` : 'creado';
    }
  } catch (e) {
    steps.bucket = `error: ${(e as Error).message}`;
  }

  // 2. Tabla aportes (intentamos un select; si falla con tabla inexistente,
  //    avisamos al admin que pegue el SQL en el editor de Supabase).
  try {
    const { error } = await supabase.from('aportes').select('id').limit(1);
    if (error) {
      steps.tabla =
        'error: la tabla "aportes" todavía no existe. Pega el SQL en el Editor de Supabase: ' +
        error.message;
    } else {
      steps.tabla = 'lista';
    }
  } catch (e) {
    steps.tabla = `error: ${(e as Error).message}`;
  }

  return NextResponse.json({ ok: true, steps });
}
