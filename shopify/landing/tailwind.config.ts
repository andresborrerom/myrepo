import type { Config } from 'tailwindcss';

// Paleta semántica — los nombres de tokens son agnósticos del nicho, los hex
// son específicos a la marca actual (Singladura, náutico-premium).
// Si cambia la marca pero no el tono, basta con ajustar los hex de abajo.

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './brand.config.ts'],
  theme: {
    extend: {
      colors: {
        // Fondos claros — evocan vela, papel naval, blanco roto premium
        arena: '#F5F1E8',
        'arena-warm': '#EFE8D6',

        // Acento de marca — bermellón de bandera marítima
        arcilla: {
          400: '#C45A48',
          500: '#A03A2C',
          600: '#7E2A1F'
        },

        // Textos y fondos oscuros — azul marino profundo (atlántico nocturno)
        tinta: {
          800: '#1B3A5C',
          900: '#0F2942'
        },

        // Acción positiva / verdes de check — bronce instrumento náutico
        botella: '#A88958',

        // Borders sutiles — gris cuerda
        regla: '#D9D2C3'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.55' }],
        xl: ['1.35rem', { lineHeight: '1.4' }],
        '2xl': ['1.7rem', { lineHeight: '1.3' }],
        '3xl': ['2.25rem', { lineHeight: '1.2' }],
        '4xl': ['2.9rem', { lineHeight: '1.1' }],
        '5xl': ['3.6rem', { lineHeight: '1.05' }]
      },
      maxWidth: {
        prose: '68ch'
      }
    }
  },
  plugins: []
};

export default config;
