import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4647AE',
          dark: '#3536A1',
          light: '#6B6CC4',
          tint: '#EFEEFB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          bg: '#E8EDF2',
        },
        ink: {
          DEFAULT: '#1E1E1E',
          secondary: '#30454C',
          muted: '#6B7280',
        },
        dark: {
          DEFAULT: '#1E1B4B',
          surface: '#2D2A6E',
          text: '#C7D2FE',
        },
        border: '#E2E8F0',
      },
      boxShadow: {
        card: '0 2px 8px rgba(30,27,75,0.08)',
        'card-hover': '0 8px 24px rgba(30,27,75,0.12)',
      },
    },
  },
  plugins: [],
}
