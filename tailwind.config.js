/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        dark: {
          50:  '#1E2840',
          100: '#141B2D',
          200: '#0F1520',
          300: '#0C1118',
          900: '#0B0F1A',
        },
        neon: {
          blue:   '#13FFAA',
          cyan:   '#00F5FF',
          orange: '#ff7b00',
          purple: '#CE84CF',
          pink:   '#DD335C',
          green:  '#13FFAA',
        },
        accent: {
          success: '#00ff66',
          warning: '#ffcc00',
          error:   '#ff3333',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.4)' },
        },
        rotateGear: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0,245,255,0.4), 0 0 20px rgba(0,245,255,0.2)' },
          '50%':      { boxShadow: '0 0 20px rgba(0,245,255,0.8), 0 0 40px rgba(0,245,255,0.4)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        orbitX: {
          '0%':   { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(0,245,255,0.4)' },
          '50%':      { borderColor: 'rgba(178,75,243,0.8)' },
        },
        robotBob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        eyeGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(0px)' },
          '50%':      { opacity: '1',   filter: 'blur(1px)' },
        },
        waveArm: {
          '0%':   { transform: 'rotate(0deg)'   },
          '20%':  { transform: 'rotate(-30deg)' },
          '40%':  { transform: 'rotate(10deg)'  },
          '60%':  { transform: 'rotate(-30deg)' },
          '80%':  { transform: 'rotate(10deg)'  },
          '100%': { transform: 'rotate(0deg)'   },
        },
        progressFill: {
          '0%':   { width: '0%'    },
          '100%': { width: '100%'  },
        },
      },
      animation: {
        glow:           'glow 2s ease-in-out infinite',
        rotateGear:     'rotateGear 20s linear infinite',
        slowRotateGear: 'rotateGear 40s linear infinite reverse',
        fadeIn:         'fadeIn 0.5s ease-in-out',
        circuitPulse:   'circuitPulse 4s ease-in-out infinite',
        float:          'float 4s ease-in-out infinite',
        floatSlow:      'floatSlow 6s ease-in-out infinite',
        glowPulse:      'glowPulse 2.5s ease-in-out infinite',
        scanLine:       'scanLine 3s linear infinite',
        shimmer:        'shimmer 3s linear infinite',
        borderGlow:     'borderGlow 3s ease-in-out infinite',
        robotBob:       'robotBob 3s ease-in-out infinite',
        eyeGlow:        'eyeGlow 1.5s ease-in-out infinite',
        waveArm:        'waveArm 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
