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
        warp: '#0C0A0E',
        selvedge: '#171319',
        kumkum: '#E4611A',
        marigold: '#F2A03D',
        haldi: '#FFD9A0',
        khadi: '#F3EBE0',
        ash: '#8E8079',
        hairline: 'rgba(243,235,224,0.10)',
        'hairline-strong': 'rgba(243,235,224,0.22)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        body: ['var(--font-body)', 'DM Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'kumkum-glow': '0 0 30px rgba(228,97,26,0.25)',
        'marigold-glow': '0 0 30px rgba(242,160,61,0.25)',
        'selvedge-card': '0 10px 30px rgba(0,0,0,0.5)',
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
