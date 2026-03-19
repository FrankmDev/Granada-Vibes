/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Base - Clean white theme
        base: {
          DEFAULT: '#FAFAFA',
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        
        // Surface - Dark text
        surface: {
          DEFAULT: '#18181B',
          secondary: '#52525B',
          muted: '#A1A1AA',
          disabled: '#D4D4D8',
        },

        // Primary - Vibrant Coral
        primary: {
          DEFAULT: '#E84D27',
          hover: '#F06040',
          light: '#FEF2F0',
          dark: '#C43D1A',
        },

        // Secondary - Warm Amber
        secondary: {
          DEFAULT: '#F59E0B',
          hover: '#FBBF24',
          light: '#FFFBEB',
        },

        // Accent - Fresh Teal
        accent: {
          DEFAULT: '#059669',
          hover: '#10B981',
          light: '#ECFDF5',
        },

        // Purple for creativity
        purple: {
          DEFAULT: '#8B5CF6',
          light: '#F5F3FF',
        },

        // Rose for events
        rose: {
          DEFAULT: '#F43F5E',
          light: '#FFF1F2',
        },

        // Border
        edge: {
          DEFAULT: 'rgba(0, 0, 0, 0.06)',
          hover: 'rgba(0, 0, 0, 0.1)',
          strong: 'rgba(0, 0, 0, 0.15)',
        },

        // Semantic
        success: '#059669',
        error: '#E84D27',
        warning: '#F59E0B',
      },

      fontFamily: {
        // Display: Space Grotesk - Modern geometric
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Body: Plus Jakarta Sans - Clean modern
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // Mono
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      borderRadius: {
        'none': '0',
        'xs': '4px',
        'sm': '8px',
        'DEFAULT': '12px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        'full': '9999px',
      },

      boxShadow: {
        // Soft shadows
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-md': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 12px 32px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 20px 40px rgba(0, 0, 0, 0.12)',
        
        // Glow effects
        'glow-primary': '0 8px 30px rgba(232, 77, 39, 0.25)',
        'glow-secondary': '0 8px 30px rgba(245, 158, 11, 0.25)',
        'glow-accent': '0 8px 30px rgba(5, 150, 105, 0.25)',
        'glow-purple': '0 8px 30px rgba(139, 92, 246, 0.25)',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-left': 'fadeInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-right': 'fadeInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        
        // Floating
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        
        // Special effects
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'blob': 'blob 8s infinite',
        
        // Marquee
        'marquee': 'marquee 40s linear infinite',
        
        // Hover effects
        'bounce-subtle': 'bounceSubtle 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pop': 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.02)' },
          '70%': { transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #E84D27 0%, #F06040 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'gradient-accent': 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        'gradient-mesh': `
          radial-gradient(at 40% 20%, rgba(232, 77, 39, 0.08) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(245, 158, 11, 0.08) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(5, 150, 105, 0.05) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(139, 92, 246, 0.05) 0px, transparent 50%)
        `,
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        // Text gradients
        '.text-gradient-primary': {
          'background': 'linear-gradient(135deg, #E84D27 0%, #F06040 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-secondary': {
          'background': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-accent': {
          'background': 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-purple': {
          'background': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        // Line clamp
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
        
        // Glass morphism
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.8)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(24, 24, 27, 0.8)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        // Glow effects
        '.glow-primary': {
          'box-shadow': '0 8px 30px rgba(232, 77, 39, 0.25)',
        },
        '.glow-secondary': {
          'box-shadow': '0 8px 30px rgba(245, 158, 11, 0.25)',
        },
        '.glow-accent': {
          'box-shadow': '0 8px 30px rgba(5, 150, 105, 0.25)',
        },
        '.glow-purple': {
          'box-shadow': '0 8px 30px rgba(139, 92, 246, 0.25)',
        },
        
        // Pattern backgrounds
        '.pattern-dots': {
          'background-image': 'radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          'background-size': '16px 16px',
        },
        '.pattern-grid': {
          'background-image': `
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          'background-size': '24px 24px',
        },
        
        // Animation delays
        '.animation-delay-100': { 'animation-delay': '100ms' },
        '.animation-delay-200': { 'animation-delay': '200ms' },
        '.animation-delay-300': { 'animation-delay': '300ms' },
        '.animation-delay-400': { 'animation-delay': '400ms' },
        '.animation-delay-500': { 'animation-delay': '500ms' },
        '.animation-delay-600': { 'animation-delay': '600ms' },
        '.animation-delay-700': { 'animation-delay': '700ms' },
        '.animation-delay-800': { 'animation-delay': '800ms' },
        
        // Transition delays
        '.transition-delay-100': { 'transition-delay': '100ms' },
        '.transition-delay-200': { 'transition-delay': '200ms' },
        '.transition-delay-300': { 'transition-delay': '300ms' },
        
        // Stagger children
        '.stagger-children > *': {
          'opacity': '0',
          'transform': 'translateY(15px)',
          'animation': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        },
        '.stagger-children > *:nth-child(1)': { 'animation-delay': '0ms' },
        '.stagger-children > *:nth-child(2)': { 'animation-delay': '75ms' },
        '.stagger-children > *:nth-child(3)': { 'animation-delay': '150ms' },
        '.stagger-children > *:nth-child(4)': { 'animation-delay': '225ms' },
        '.stagger-children > *:nth-child(5)': { 'animation-delay': '300ms' },
        '.stagger-children > *:nth-child(6)': { 'animation-delay': '375ms' },
        '.stagger-children > *:nth-child(7)': { 'animation-delay': '450ms' },
        '.stagger-children > *:nth-child(8)': { 'animation-delay': '525ms' },
      });
    },
  ],
};
