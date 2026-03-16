/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Base - Deep warm background
        base: {
          DEFAULT: '#0F0E0C',      // Deep espresso
          elevated: '#1A1916',     // Elevated surfaces
          card: '#23221F',         // Card backgrounds
          hover: '#2D2C28',        // Hover states
          muted: '#151412',        // Subtle backgrounds
        },
        
        // Surface - Light text on dark
        surface: {
          DEFAULT: '#FAF9F7',      // Primary text
          secondary: '#B8B5AD',    // Secondary text
          muted: '#6B6964',        // Muted text
          disabled: '#454440',     // Disabled states
        },

        // Accent - Terracotta energy
        terra: {
          DEFAULT: '#E85A3C',      // Primary accent
          hover: '#F07050',        // Hover state
          glow: 'rgba(232, 90, 60, 0.4)',
          subtle: 'rgba(232, 90, 60, 0.1)',
        },

        // Secondary - Warm sand/cream
        sand: {
          DEFAULT: '#C9A87C',      // Secondary accent
          hover: '#D4B88F',        // Hover state
          glow: 'rgba(201, 168, 124, 0.4)',
          subtle: 'rgba(201, 168, 124, 0.1)',
        },

        // Tertiary - Deep coral/rust
        coral: {
          DEFAULT: '#B85C4F',      // Tertiary accent
          hover: '#C76E61',        // Hover state
          glow: 'rgba(184, 92, 79, 0.4)',
          subtle: 'rgba(184, 92, 79, 0.1)',
        },

        // Special - Midnight blue accent
        midnight: {
          DEFAULT: '#3D5A80',      // Special accent
          hover: '#4A6B99',        // Hover state
          glow: 'rgba(61, 90, 128, 0.4)',
        },

        // Border system
        edge: {
          DEFAULT: 'rgba(250, 249, 247, 0.08)',
          hover: 'rgba(250, 249, 247, 0.15)',
          strong: 'rgba(250, 249, 247, 0.25)',
          terra: 'rgba(232, 90, 60, 0.3)',
          sand: 'rgba(201, 168, 124, 0.3)',
        },

        // Semantic
        success: '#7A9E7E',
        error: '#E85A3C',
        warning: '#C9A87C',
      },

      fontFamily: {
        // Display: Satoshi - Modern, refined, pairs perfectly with Work Sans
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        // Body: Work Sans - Clean, professional, highly legible
        body: ['"Work Sans"', 'system-ui', 'sans-serif'],
        // Mono for code/numbers
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '0.85', letterSpacing: '-0.06em' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        // Soft glows for dark theme
        'glow-terra': '0 0 40px rgba(232, 90, 60, 0.3)',
        'glow-sand': '0 0 40px rgba(201, 168, 124, 0.3)',
        'glow-coral': '0 0 40px rgba(184, 92, 79, 0.3)',
        
        // Elevation shadows
        'elevated': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'elevated-lg': '0 8px 40px rgba(0, 0, 0, 0.5)',
        'elevated-xl': '0 16px 64px rgba(0, 0, 0, 0.6)',
        
        // Inner shadows
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'luxe': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        
        // Floating elements
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        
        // Special effects
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'blob': 'blob 7s infinite',
        
        // Interactive
        'bounce-subtle': 'bounceSubtle 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 90, 60, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 90, 60, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-terra': 'linear-gradient(135deg, #E85A3C 0%, #F07050 100%)',
        'gradient-sand': 'linear-gradient(135deg, #C9A87C 0%, #D4B88F 100%)',
        'gradient-coral': 'linear-gradient(135deg, #B85C4F 0%, #C76E61 100%)',
        'gradient-mesh': 'linear-gradient(135deg, rgba(232, 90, 60, 0.1) 0%, rgba(201, 168, 124, 0.1) 50%, rgba(184, 92, 79, 0.1) 100%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        // Text gradients
        '.text-gradient-terra': {
          'background': 'linear-gradient(135deg, #E85A3C 0%, #F07050 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-sand': {
          'background': 'linear-gradient(135deg, #C9A87C 0%, #D4B88F 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-coral': {
          'background': 'linear-gradient(135deg, #B85C4F 0%, #C76E61 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-surface': {
          'background': 'linear-gradient(135deg, #FAF9F7 0%, #B8B5AD 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        // Line clamp utilities
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
        
        // Text balance
        '.text-balance': {
          'text-wrap': 'balance',
        },
        
        // Scrollbar hide
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
        
        // Glass morphism for dark theme
        '.glass': {
          'background': 'rgba(35, 34, 31, 0.8)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(250, 249, 247, 0.08)',
        },
        
        // Glow effects
        '.glow-terra': {
          'box-shadow': '0 0 40px rgba(232, 90, 60, 0.3)',
        },
        '.glow-sand': {
          'box-shadow': '0 0 40px rgba(201, 168, 124, 0.3)',
        },
        '.glow-coral': {
          'box-shadow': '0 0 40px rgba(184, 92, 79, 0.3)',
        },
        
        // Grain texture overlay
        '.grain': {
          'position': 'relative',
        },
        '.grain::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '0',
          'opacity': '0.03',
          'pointer-events': 'none',
          'background-image': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        },
      });
    },
  ],
};
