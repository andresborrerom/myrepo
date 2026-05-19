// Configuración editable de marca y copy.
// Este es el ÚNICO archivo a tocar si cambia el nombre, el nicho o el copy.
//
// ⚠️ ESTADO ACTUAL: nombre "Singladura" provisional, pendiente de verificación
// manual de dominios + marcas (OEPM, EUIPO, IMPI, SIC). Ver shopify/09-marca-naming.md
// sección "Verificación manual obligatoria antes de comprar".
// Si Singladura no pasa la verificación, este archivo es lo único que cambia.

export const brand = {
  // Identidad
  name: 'Singladura',
  tagline: 'Tu travesía a la casa que querés en España.',
  domain: 'singladuracapital.com', // ⚠️ provisional — verificar en registrador antes de comprar

  // Hero
  heroEyebrow: 'Acompañamiento independiente para inversores latinoamericanos en España',
  heroHeadline: 'Tu casa en España, con rumbo claro desde el primer día.',
  heroSubheadline:
    'Acompañamos a familias y profesionales de Latinoamérica en la compra de inmuebles en España. Calculamos el rumbo, visitamos el puerto, tú firmas la escritura. Sin comisión inmobiliaria. Sin intermediarios opacos.',
  heroCta: 'Reservar conversación',
  heroCtaSub: 'Cupo limitado a 5 operaciones por trimestre. Próxima cohorte: septiembre 2026.',

  // Encabezados de sección
  sections: {
    pillarsTitle: 'Cómo trabajamos',
    forWhomTitle: '¿Es para ti?',
    forWhomYes: 'Sí, si...',
    forWhomNo: 'No, si...',
    faqTitle: 'Preguntas frecuentes',
    finalCtaTitle: 'Reserva tu plaza sin compromiso',
    finalCtaBody:
      'Próxima cohorte: 5 operaciones. Te avisamos al abrir agenda y reservas turno. Sin spam, sin venta agresiva.',
    finalCtaButton: 'Reservar mi plaza'
  },

  // Propuesta de valor (3 puntos)
  pillars: [
    {
      title: 'Independencia real',
      body: 'Cobramos honorarios fijos, nunca comisión sobre el inmueble. Nuestro cliente eres tú, no el vendedor. Buscamos lo que te conviene, no lo que paga mejor al intermediario.'
    },
    {
      title: 'En terreno y en tu huso horario',
      body: 'Camilo opera en España con visitas presenciales y contexto local. Andrés coordina desde Latinoamérica en tu mismo horario. No es un call center con guion: es un equipo con piel en el juego.'
    },
    {
      title: 'Decisión de inversión, no de impulso',
      body: 'Background en inversiones (UC Berkeley MBA, 15 años en mercados) y arquitectura (30+ años de oficio familiar). Cada inmueble se evalúa como activo: rentabilidad, construcción, fiscalidad, riesgo cambiario.'
    }
  ],

  // Para quién es (y para quién no)
  forWhom: {
    isFor: [
      'Latinoamericanos con patrimonio 200k€-3M€ buscando diversificar activos en euros.',
      'Familias considerando un plan B residencial en España (visa de inversión, no lucrativa, nómada digital).',
      'Empresarios que quieren un inmueble que genere alquiler en EUR mientras lo usan parte del año.'
    ],
    isNotFor: [
      'Quien busca el piso más barato sin asesoría — los portales abundan.',
      'Quien necesita financiación superior al 70% del valor — España es restrictiva con no residentes y no prometemos milagros.',
      'Quien quiere comprar y vender en menos de 2 años — el coste de transacción no lo justifica.'
    ]
  },

  // FAQ
  faq: [
    {
      q: '¿Cuánto cuesta el servicio?',
      a: 'Honorarios fijos entre 4 000 € y 6 000 € por operación completa (búsqueda, due diligence, cierre), según ciudad y complejidad. No cobramos comisión sobre el inmueble. El curso digital pre-grabado se vende por separado para quien prefiere autogestionarse.'
    },
    {
      q: '¿Necesito tener la visa antes de empezar?',
      a: 'No. Parte del trabajo es ayudarte a elegir la vía migratoria adecuada con nuestro abogado partner, según tu situación. La golden visa cerró en 2025 pero hay cuatro alternativas sólidas que cubrimos en la primera conversación.'
    },
    {
      q: '¿Pueden gestionar la compra si no viajo a España?',
      a: 'Sí. Visitamos en video en directo, hacemos due diligence en terreno y la firma se cierra remota con poder notarial. Cerca de la mitad de nuestros clientes no pisan España hasta recibir las llaves.'
    },
    {
      q: '¿Por qué confiar en ustedes?',
      a: 'Andrés Borrero: UC Berkeley MBA, 15 años en inversiones. Camilo Borrero: 15 años en Andalucía. Padre arquitecto en Marbella desde 1997. La empresa combina red local, criterio de inversor y huso horario LATAM — algo que ningún competidor reúne.'
    },
    {
      q: '¿Cuándo abren la próxima cohorte?',
      a: 'Septiembre 2026, limitada a 5 operaciones para garantizar atención profunda. La lista de espera reserva tu turno sin compromiso de pago.'
    }
  ],

  // Footer
  footer: {
    copyright: '© 2026 Singladura. Todos los derechos reservados.',
    email: 'hola@singladuracapital.com', // ⚠️ provisional, depende de dominio definitivo
    legal: [
      { label: 'Aviso legal', href: '/legal' },
      { label: 'Privacidad', href: '/privacidad' }
    ]
  }
};

export type Brand = typeof brand;
