/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Background scale - Warm blacks
        bg: {
          DEFAULT: '#0c0a09',
          raised: '#141211',
          elevated: '#1c1917',
          card: '#1c1917',
          hover: '#292524',
        },
        // Border scale - Warm grays
        border: {
          DEFAULT: '#292524',
          subtle: '#1c1917',
          hover: '#44403c',
          light: '#57534e',
        },
        // Text scale - Warm whites
        text: {
          primary: '#fafaf9',
          secondary: '#a8a29e',
          muted: '#78716c',
          tertiary: '#57534e',
        },
        // Accents - Terracotta/Sage/Sand
        accent: {
          DEFAULT: '#e07a5f',
          hover: '#e88d72',
          muted: 'rgba(224, 122, 95, 0.1)',
          glow: 'rgba(224, 122, 95, 0.25)',
        },
        sage: {
          DEFAULT: '#81b29a',
          hover: '#94c3ad',
          muted: 'rgba(129, 178, 154, 0.1)',
        },
        sand: {
          DEFAULT: '#f2cc8f',
          hover: '#f5d9a8',
          muted: 'rgba(242, 204, 143, 0.1)',
        },
        // Semantic
        success: '#81b29a',
        error: '#e07a5f',
        warning: '#f2cc8f',
      },
      fontFamily: {
        display: ['Clash Display', 'Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xl': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '3xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '4xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '5xl': ['4rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '6xl': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '7xl': ['6.5rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-accent': '0 0 40px rgba(224, 122, 95, 0.15)',
        'glow-sand': '0 0 40px rgba(242, 204, 143, 0.12)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #e07a5f 0%, #f2cc8f 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-subtle': {
          'background': 'linear-gradient(135deg, #fafaf9 0%, #a8a29e 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.line-clamp-2': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
        '.line-clamp-3': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
      });
    },
  ],
};
