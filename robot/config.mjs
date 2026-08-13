// Robot config — queries por sub + safety thresholds.
//
// Diseñado para MINIMIZAR falsos positivos (mejor 0 threads que 10 spammy).
// Los subs y queries se van refinando con feedback del operador.

export const NICHES = {
  baristapath: {
    domain: 'baristapath.com',
    subs: [
      // Ordenado de más permisivo a más estricto.
      // Más permisivo = mejor para account nueva.
      { name: 'Coffee', memberCount: 3_000_000, strictness: 'medium' },
      { name: 'espresso', memberCount: 700_000, strictness: 'high' },
      { name: 'HomeBarista', memberCount: 250_000, strictness: 'very-high' },
    ],
    // Search queries — Reddit search API. Buscamos preguntas commercial-intent
    // donde nuestro sitio puede aportar valor real. Match por título.
    queries: [
      // Beginner buying questions
      'first espresso machine',
      'first grinder',
      'starter setup',
      'beginner recommendations',
      // Sub-$500 tier (matches our budget content)
      'under $500',
      'under 500',
      'budget espresso',
      // Specific popular products we've reviewed
      'Bambino Plus',
      'Gaggia Classic',
      'Baratza Encore',
      'Niche Zero worth',
      // Vs / comparison intent
      'vs Gaggia',
      'vs Bambino',
      // Grinder for X pattern
      'grinder for Bambino',
      'grinder recommendation',
      // Milk drink specific
      'best for lattes',
      'milk drinks espresso',
    ],
    // Filtrar threads con >N comments (ya saturados, tarde para aportar).
    maxCommentsWhenFound: 15,
    // Filtrar threads más viejos que N horas.
    maxAgeHours: 48,
    // Filtrar threads con score negativo o muy viejo/muerto.
    minScore: 0,
  },
  // filamentpath se activa después de scaffold + KGR validations
  // filamentpath: { ... }
};

// Safety limits globales
export const LIMITS = {
  // No mandar más de N notifs por run (evita spam de Telegram al operador)
  maxNotificationsPerRun: 5,
  // Ignorar threads ya procesados en últimos N días
  seenThreadTTLDays: 30,
  // Retry API failures N veces
  maxRetries: 3,
};

// Warmup mode: cuando la account Reddit del operador tiene <50 karma,
// el robot NO incluye link en drafts. Solo comment de valor puro.
// El operador construye karma primero, después activamos linking.
export const WARMUP_MODE = process.env.WARMUP_MODE !== 'false'; // default: true
