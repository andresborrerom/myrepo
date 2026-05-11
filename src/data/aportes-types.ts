// Tipos compartidos para aportes. La tabla en Supabase tiene exactamente
// estas columnas.

export type AporteKind = 'texto' | 'foto' | 'audio' | 'video' | 'carta';
export type AporteStatus = 'pending' | 'published' | 'flagged' | 'rejected';

export type Aporte = {
  id: string;
  from_id: string;          // Quien firma el aporte (puede ser un nieto)
  on_behalf_of_id: string;  // Quien lo sube físicamente (puede ser el papá)
  kind: AporteKind;
  year: number | null;       // Solo para 'carta'
  title: string | null;
  body: string | null;
  media_url: string | null;
  status: AporteStatus;
  flag_reason: string | null;
  created_at: string;
  updated_at: string;
};

export const APORTE_KIND_LABEL: Record<AporteKind, string> = {
  texto: 'Texto',
  foto:  'Foto',
  audio: 'Audio',
  video: 'Video',
  carta: 'Carta (para un año específico)'
};

export const APORTE_KIND_ICON: Record<AporteKind, string> = {
  texto: '📝',
  foto:  '📷',
  audio: '🎙️',
  video: '🎬',
  carta: '✍️'
};
