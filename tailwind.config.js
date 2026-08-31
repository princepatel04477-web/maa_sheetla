/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warp: '#FCFBF7',
        selvedge: '#FFFFFF',
        'selvedge-light': '#F6F2EC',
        kumkum: '#8B2628',
        'kumkum-deep': '#6D1B1D',
        marigold: '#A67C26',
        haldi: '#8A6715',
        khadi: '#1C1917',
        ash: '#665E59',
        hairline: 'rgba(28, 25, 23, 0.08)',
        'hairline-strong': 'rgba(28, 25, 23, 0.18)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        body: ['var(--font-body)', 'DM Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'kumkum-glow': '0 0 30px rgba(139,38,40,0.18)',
        'marigold-glow': '0 0 30px rgba(166,124,38,0.18)',
        'selvedge-card': '0 4px 20px -2px rgba(28,25,23,0.06), 0 2px 6px -1px rgba(28,25,23,0.04)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
