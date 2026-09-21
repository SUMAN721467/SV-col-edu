/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1E3F',
          dark: '#061226',
          light: '#16325C',
          hover: '#173666',
        },
        gold: {
          DEFAULT: '#D9822B',
          light: '#F4A247',
          warm: '#F5AB48',
          bg: '#FFF7ED',
          border: '#FED7AA',
        },
        crimson: {
          DEFAULT: '#9E2A2B',
          light: '#B91C1C',
        },
        surface: {
          main: '#F8FAFD',
          card: '#FFFFFF',
          alt: '#F1F5F9',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        gold: '0 8px 20px -4px rgba(217, 130, 43, 0.25)',
        'gold-lg': '0 12px 24px -4px rgba(217, 130, 43, 0.4)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #0A1E3F 0%, #173666 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E58D2D 0%, #F5AB48 100%)',
      }
    },
  },
  plugins: [],
}
