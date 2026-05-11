// Auto-generado por scripts/synthesize-voices.mjs. No editar a mano.
// Mapeo año → ruta del audio en /public/audios. Vacío hasta el primer run.

export const CARTA_AUDIOS: Record<number, string> = {
};

export function getCartaAudioUrl(year: number): string | undefined {
  return CARTA_AUDIOS[year];
}
