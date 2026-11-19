import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coy: {
          50: '#fff1f4',
          100: '#ffe4ea',
          200: '#fecdde',
          300: '#fda2bf',
          400: '#fb6a99',
          500: '#f43f75',
          600: '#e11d62',
          700: '#be1050',
          800: '#9e1046',
          900: '#84123f',
          950: '#4a041f',
          dark: '#0e0f14',
          card: '#161822',
          border: '#272a3a',
          accent: '#ff2d60',
          purple: '#7928ca',
          gold: '#f59e0b',
        },
      },
      boxShadow: {
        'glow-pink': '0 0 25px -5px rgba(244, 63, 117, 0.4)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.4)',
        'glow-card': '0 12px 36px -10px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
