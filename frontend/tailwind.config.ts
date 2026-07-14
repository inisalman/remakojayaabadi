import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#102A43',
        navy: '#0B1F3A',
        brand: {
          50: '#EFF8FF',
          100: '#D9EEFF',
          300: '#7DC6FF',
          500: '#1688E8',
          600: '#0B6FC5',
          700: '#07569E',
        },
      },
      boxShadow: {
        panel: '0 24px 70px rgba(11, 31, 58, 0.14)',
      },
    },
  },
  plugins: [],
}