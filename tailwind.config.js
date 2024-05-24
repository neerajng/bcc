import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '280px',
      xs:'375px',
      sm: '480px',
      md: '768px',//767 fine
      lg: '976px',//975 fine
      xl: '1440px',
    },
    extend: {},
  },
  plugins: [daisyui],
};