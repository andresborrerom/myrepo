import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './brand.config.ts'],
  theme: {
    extend: {
      colors: {
        arena: '#E8DCC4',
        'arena-warm': '#F2E8D2',
        arcilla: {
          400: '#C97B5C',
          500: '#B05F40',
          600: '#8E4A2E'
        },
        tinta: {
          800: '#3B2F26',
          900: '#241D17'
        },
        botella: '#3D5240',
        regla: '#C9C4B8'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
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
