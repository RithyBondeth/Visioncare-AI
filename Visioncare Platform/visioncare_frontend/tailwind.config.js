/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'dark': '#1D232A',
        'darkgray': '#A6ADBB',
        'grey': '#F3F4F6',
        'sliver': '#6B7280'
      },
    },
    screens: {
      'tablet-xl': {'max': '825px'},
      'tablet-lg': {'max': '700px'},
      'tablet-md': {'max': '635px'},
      'phone-xl': {'max': '400px'},
      'phone-lg': {'max': '460px'},
      'monitor': {'min': '1600px'}
    }
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [
    daisyui,
    require('@tailwindcss/line-clamp'),
  ],
}