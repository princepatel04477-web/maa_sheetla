/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // The markup uses an `xs:` prefix in the header and the floating WhatsApp
      // button. Without this screen those variants compile to nothing, so the
      // desktop "Direct Desk" label never appeared at all.
      screens: {
        xs: '400px',
      },
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
      // Tailwind v4 utility names (rounded-xs, shadow-xs, shadow-2xs,
      // backdrop-blur-xs, drop-shadow-xs) and `shadow-agency-card` are used
      // throughout the markup but this project is on Tailwind v3, where none of
      // them exist — every one was silently dropped. Defining them here makes the
      // existing class names resolve instead of rewriting 240+ call sites.
      borderRadius: {
        '2xs': '1px',
        xs: '2px',
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(28,25,23,0.04)',
        xs: '0 1px 3px rgba(28,25,23,0.07), 0 1px 2px rgba(28,25,23,0.04)',
        'kumkum-glow': '0 0 30px rgba(139,38,40,0.18)',
        'marigold-glow': '0 0 30px rgba(166,124,38,0.18)',
        'selvedge-card': '0 4px 20px -2px rgba(28,25,23,0.06), 0 2px 6px -1px rgba(28,25,23,0.04)',
        'agency-card': '0 4px 20px -2px rgba(28,25,23,0.10), 0 2px 6px -1px rgba(28,25,23,0.06)',
      },
      backdropBlur: {
        '2xs': '2px',
        xs: '4px',
      },
      dropShadow: {
        '2xs': '0 1px 1px rgba(28,25,23,0.10)',
        xs: '0 1px 2px rgba(28,25,23,0.14)',
      },
      // h-13 / h-17 / h-18 and pl-5.5 are used for the logo lockups and the
      // footer email column; none are in the default v3 spacing scale, so the
      // logo containers had no height at all below the `sm` breakpoint.
      spacing: {
        '0.2': '0.05rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '17': '4.25rem',
        '18': '4.5rem',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeReverse 35s linear infinite',
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
        },
        marquee: {
          '0%': { transform: 'translate3d(0%, 0, 0)' },
          '100%': { transform: 'translate3d(-100%, 0, 0)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translate3d(-100%, 0, 0)' },
          '100%': { transform: 'translate3d(0%, 0, 0)' },
        },
      }
    },
  },
  plugins: [],
};
