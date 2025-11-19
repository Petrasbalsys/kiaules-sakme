/* eslint-env node */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html,scss,css}",
  ],
  theme: {
    extend: {
      // map tokens here if desired
      gridTemplateRows:
      {
        '20/80': '20% 80%',
        '80/20': '80% 20%',
        '60/40': '60% 40%',
        '40/60': '40% 60%',
      },
      gridTemplateColumns: {
        '80/20': '80% 20%',
        '20/80': '20% 80%',
        '60/40': '60% 40%',
        '40/60': '40% 60%',
      },
      fontFamily: {
        main: ["'Space Grotesk'", "sans-serif"],
      },
      colors: {
        'brand-yellow': '#f5f505',
      }
    },
  },
  plugins: [],
};