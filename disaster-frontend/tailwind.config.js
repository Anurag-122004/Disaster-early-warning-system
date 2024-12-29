/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transform: {
        'preserve-3d': 'preserve-3d',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
};

