/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#1a1a1a',
          200: '#151515',
          300: '#101010',
          900: '#0f0f0f',
        },
        neon: {
          blue: '#00f0ff',
          orange: '#ff7b00',
          purple: '#b400ff',
        },
        accent: {
          success: '#00ff66',
          warning: '#ffcc00',
          error: '#ff3333',
        },
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
        rotateGear: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        rotateGear: 'rotateGear 20s linear infinite',
        slowRotateGear: 'rotateGear 40s linear infinite reverse',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        circuitPulse: 'circuitPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};