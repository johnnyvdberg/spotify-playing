import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        control: '6cqi',
      },
      fontSize: {
        control: '5cqi',
        title: '3.9676cqi',
        meta: '3.1733cqi',
      },
      boxShadow: {
        // Custom box-shadow using 5cqw and 0.5cqw
        albumart: '0 0 50px 5px rgba(32, 32, 32, 0.9)',
      },
      transitionDuration: {
        2000: '2000ms',
      },
    },
  },
  plugins: [daisyui],
};
