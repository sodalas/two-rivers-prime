/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        river: {
          50: '#f4f9f8',
          100: '#dcefed',
          500: '#3a6f73',
          700: '#2b5457',
          900: '#1c3a3c',
        },
        field: {
          500: '#8c7a3e',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
