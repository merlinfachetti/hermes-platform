/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#080c12',
          1: '#0d1017',
          2: '#111827',
          3: '#161c27',
          4: '#1c2433',
        },
        border: {
          subtle: '#1a2030',
          default: '#1e2a3a',
          strong: '#253042',
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
          muted: '#475569',
          faint: '#334155',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
