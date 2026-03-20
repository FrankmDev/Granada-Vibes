/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* All colors reference CSS custom properties from tokens.css */
        bg:       'var(--color-bg)',
        raised:   'var(--color-bg-raised)',
        card:     'var(--color-bg-card)',
        subtle:   'var(--color-bg-subtle)',

        border:        'var(--color-border)',
        'border-subtle': 'var(--color-border-subtle)',

        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',

        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
          muted:   'var(--color-accent-muted)',
          glow:    'var(--color-accent-glow)',
        },

        gold: {
          DEFAULT: 'var(--color-gold)',
          muted:   'var(--color-gold-muted)',
        },

        secondary: {
          DEFAULT: 'var(--color-secondary)',
          muted:   'var(--color-secondary-muted)',
        },

        success: {
          DEFAULT: 'var(--color-success)',
          muted:   'var(--color-success-muted)',
        },

        error: {
          DEFAULT: 'var(--color-error)',
          muted:   'var(--color-error-muted)',
        },

        difficulty: {
          easy:     'var(--color-difficulty-easy)',
          moderate: 'var(--color-difficulty-moderate)',
          hard:     'var(--color-difficulty-hard)',
        },
      },

      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'xs':  ['0.75rem',  { lineHeight: '1.6' }],
        'sm':  ['0.875rem', { lineHeight: '1.7' }],
        'base': ['1rem',    { lineHeight: '1.8' }],
        'lg':  ['1.125rem', { lineHeight: '1.7' }],
        'xl':  ['1.25rem',  { lineHeight: '1.5' }],
        '2xl': ['1.5rem',   { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem',  { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        '5xl': ['3rem',     { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem',  { lineHeight: '1.05', letterSpacing: '-0.04em' }],
      },

      borderRadius: {
        'xs':   '4px',
        'sm':   '8px',
        DEFAULT: '12px',
        'md':   '12px',
        'lg':   '16px',
        'xl':   '20px',
        '2xl':  '32px',
        'full': '9999px',
      },

      boxShadow: {
        'soft-sm': '0 2px 8px rgba(10, 10, 10, 0.15)',
        'soft':    '0 4px 16px rgba(10, 10, 10, 0.2)',
        'soft-md': '0 8px 24px rgba(10, 10, 10, 0.25)',
        'soft-lg': '0 12px 32px rgba(10, 10, 10, 0.3)',
        'glow-accent':    '0 12px 40px var(--color-accent-glow)',
        'glow-gold':      '0 12px 40px var(--color-gold-muted)',
        'glow-secondary': '0 12px 40px var(--color-secondary-muted)',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo':  'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':   'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '700': '700ms',
      },

      animation: {
        'fade-in':      'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up':   'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':        'float 8s ease-in-out infinite',
        'float-slow':   'float 12s ease-in-out infinite',
        'pulse-slow':   'pulseSlow 3s ease-in-out infinite',
        'pulse-live':   'pulseLive 1.5s ease-in-out infinite',
        'marquee':      'marquee 50s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.1)' },
        },
        pulseLive: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.line-clamp-1': { 'display': '-webkit-box', '-webkit-line-clamp': '1', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' },
        '.line-clamp-2': { 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' },
        '.line-clamp-3': { 'display': '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' },
      });
    },
  ],
};
