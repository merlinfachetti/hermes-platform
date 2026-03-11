/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#0a0b0d',
          1: '#111318',
          2: '#181b21',
          3: '#1e222a',
          4: '#252b35',
        },
        border: {
          subtle: '#1e2530',
          default: '#252d3a',
          strong: '#2e3848',
        },
        accent: {
          blue: '#3b82f6',
          'blue-dim': '#1d4ed8',
          cyan: '#06b6d4',
          green: '#22c55e',
          yellow: '#eab308',
          red: '#ef4444',
          orange: '#f97316',
          purple: '#a855f7',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#94a3b8',
          tertiary: '#64748b',
          inverse: '#0a0b0d',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}


