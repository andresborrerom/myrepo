// Configuración editable de marca y copy.
// Cambiar aquí el nombre, mensaje y FAQ. No tocar componentes para personalizar.
// Si cambia el nicho, este archivo es el ÚNICO que se reescribe.

export const brand = {
  // Identidad
  name: 'Casa Madre',
  tagline: 'Comprar en España desde Latinoamérica, sin perderte por el camino.',
  domain: 'casamadre.com', // provisional, validar disponibilidad

  // Hero
  heroEyebrow: 'Acompañamiento independiente para inversores latinoamericanos',
  heroHeadline: 'Tu casa en España, paso a paso, sin sorpresas.',
  heroSubheadline:
    'Te acompañamos en el proceso completo de comprar inmueble en España desde Latinoamérica: del primer plan hasta las llaves. Sin comisión inmobiliaria. Sin sesgos. Con un hermano del otro lado.',
  heroCta: 'Apúntate a la lista',
  heroCtaSub: 'Plazas limitadas — abrimos el primer grupo en septiembre 2026.',

  // Propuesta de valor (3 puntos)
  pillars: [
    {
      title: 'Independencia real',
      body: 'Cobramos honorarios, no comisión inmobiliaria. Nuestro cliente eres tú, no el vendedor. Buscamos lo que te conviene, no lo que cobra mejor.'
    },
    {
      title: 'En terreno y en LATAM',
      body: 'Camilo opera en España, Andrés en Latinoamérica. Visitas reales, contexto cultural, mismo huso de tu llamada. No es un call center.'
    },
    {
      title: 'Decisión de inversión, no de impulso',
      body: 'Background en inversiones (UC Berkeley MBA) y arquitectura. Evaluamos cada inmueble como activo: retorno, construcción, fiscalidad, riesgo cambiario.'
    }
  ],

  // Para quién es (y para quién no)
  forWhom: {
    isFor: [
      'Latinoamericanos con patrimonio 200k€-3M€ buscando diversificar en Europa.',
      'Familias considerando un plan B residencial en España (visa de inversionista, no lucrativa, nómada).',
      'Empresarios que quieren un inmueble que genere alquiler en EUR mientras lo usan vacaciones.'
    ],
    isNotFor: [
      'Quien busca el piso más barato sin asesoría — hay portales para eso.',
      'Quien necesita financiación >70% del valor — España es restrictiva con no residentes, no podemos prometer milagros.',
      'Quien quiere comprar y vender en <2 años — el coste de transacción no lo justifica.'
    ]
  },

  // FAQ
  faq: [
    {
      q: '¿Cuánto cuesta el servicio?',
      a: 'El acompañamiento completo (búsqueda + due diligence + cierre) tiene un paquete fijo entre 4 000 € y 6 000 €, según ciudad y complejidad. No cobramos comisión sobre el inmueble. Curso digital pre-grabado por separado.'
    },
    {
      q: '¿Necesito tener la visa antes?',
      a: 'No. De hecho, parte del trabajo es ayudarte a elegir la vía migratoria adecuada (con abogado partner) según tu situación. La golden visa cerró en 2025 pero hay 4 alternativas sólidas.'
    },
    {
      q: '¿Pueden gestionar la compra si no viajo a España?',
      a: 'Sí. Hacemos visitas con video, due diligence en terreno, y la firma se puede hacer remota con poder notarial. Casi la mitad de nuestros clientes no pisan España hasta tener llaves.'
    },
    {
      q: '¿Por qué creo en ustedes?',
      a: 'Andrés Borrero: UC Berkeley MBA, 15 años en inversiones. Camilo Borrero: vive en Andalucía hace 15 años. Padre arquitecto en Marbella desde 1997. La empresa nace de la combinación que ningún competidor tiene.'
    },
    {
      q: '¿Cuándo empiezan?',
      a: 'Primer grupo: septiembre 2026, limitado a 5 clientes para garantizar atención. La lista de espera reserva tu plaza sin compromiso de pago.'
    }
  ],

  // Footer
  footer: {
    copyright: '© 2026 Casa Madre. Todos los derechos reservados.',
    email: 'hola@casamadre.com',
    legal: [
      { label: 'Aviso legal', href: '/legal' },
      { label: 'Privacidad', href: '/privacidad' }
    ]
  }
};

export type Brand = typeof brand;
