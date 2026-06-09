/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#0EA5E9',
        'brand-dark': '#075985',
        eco:   '#16A34A',
        accent:'#4ADE80',
      },
      fontFamily: {
        sans: [
          'Pretendard Variable', 'Pretendard',
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif',
        ],
      },
      maxWidth: {
        container: '1600px',
      },
    },
  },
  plugins: [],
}
