/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Background scale - Warm light tones (fresh & airy)
        bg: {
          DEFAULT: '#FAF8F5',      // Warm white/cream
          raised: '#F5F2ED',       // Slightly darker cream
          elevated: '#FFFFFF',     // Pure white for cards
          card: '#FFFFFF',
          hover: '#F0EDE7',
          glass: 'rgba(255, 255, 255, 0.85)',
        },
        // Border scale - Warm sophisticated grays
        border: {
          DEFAULT: '#E8E4DE',
          subtle: '#F0EDE7',
          hover: '#D9D4CC',
          light: '#C9C3B8',
          warm: 'rgba(199, 91, 59, 0.2)',
        },
        // Text scale - Warm darks (not pure black)
        text: {
          primary: '#2C2824',      // Warm charcoal
          secondary: '#5C5650',    // Medium warm gray
          muted: '#8B847A',        // Light warm gray
          tertiary: '#B5ADA2',     // Very light
        },
        // Primary Accent - Terracotta (warm, earthy)
        accent: {
          DEFAULT: '#C75B3B',
          hover: '#D4714F',
          muted: 'rgba(199, 91, 59, 0.08)',
          glow: 'rgba(199, 91, 59, 0.15)',
        },
        // Secondary Accent - Warm Gold
        gold: {
          DEFAULT: '#C9A84C',
          hover: '#D4B85A',
          muted: 'rgba(201, 168, 76, 0.08)',
          glow: 'rgba(201, 168, 76, 0.15)',
        },
        // Tertiary - Sage Green (Mediterranean)
        sage: {
          DEFAULT: '#7A9E7E',
          hover: '#8DB092',
          muted: 'rgba(122, 158, 126, 0.08)',
        },
        // Quaternary - Mediterranean Blue
        azure: {
          DEFAULT: '#4A7C8C',
          hover: '#5A94A6',
          muted: 'rgba(74, 124, 140, 0.08)',
        },
        // New accent - Soft Coral
        coral: {
          DEFAULT: '#E07A5F',
          hover: '#E88F75',
          muted: 'rgba(224, 122, 95, 0.08)',
        },
        // Semantic
        success: '#7A9E7E',
        error: '#C75B3B',
        warning: '#D4A35A',
      },
      fontFamily: {
        display: ['Outfit', 'DM Sans', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '4xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '5xl': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '6xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['6.5rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(44, 40, 36, 0.06)',
        'soft-lg': '0 8px 30px rgba(44, 40, 36, 0.08)',
        'soft-xl': '0 12px 40px rgba(44, 40, 36, 0.1)',
        'glow-accent': '0 0 60px rgba(199, 91, 59, 0.12)',
        'glow-gold': '0 0 60px rgba(201, 168, 76, 0.1)',
        'inner-soft': 'inset 0 2px 4px rgba(44, 40, 36, 0.04)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'luxe': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient-gold': {
          'background': 'linear-gradient(135deg, #C9A84C 0%, #D4B85A 50%, #C9A84C 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-terracotta': {
          'background': 'linear-gradient(135deg, #C75B3B 0%, #E07A5F 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-warm': {
          'background': 'linear-gradient(135deg, #C75B3B 0%, #C9A84C 100%)',
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
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.8)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.5)',
        },
      });
    },
  ],
};
