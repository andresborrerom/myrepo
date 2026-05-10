import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta cálida: tierra, papel, hojas, flor.
        cream: {
          50: '#FBF7F0',
          100: '#F5EEE1',
          200: '#EADFC7'
        },
        clay: {
          400: '#C97B5C',
          500: '#B05F40',
          600: '#8E4A2E',
          700: '#6B3620'
        },
        olive: {
          500: '#6B7A3A',
          600: '#54622D',
          700: '#3F4A21'
        },
        ink: {
          800: '#3A2F26',
          900: '#241D17'
        }
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif']
      },
      fontSize: {
        // Escala generosa para 75 años: 1rem base = 18px (ver globals.css).
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.15rem', { lineHeight: '1.55' }],
        xl: ['1.35rem', { lineHeight: '1.4' }],
        '2xl': ['1.7rem', { lineHeight: '1.3' }],
        '3xl': ['2.1rem', { lineHeight: '1.2' }],
        '4xl': ['2.6rem', { lineHeight: '1.1' }]
      },
      boxShadow: {
        warm: '0 8px 24px -12px rgba(107, 54, 32, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
