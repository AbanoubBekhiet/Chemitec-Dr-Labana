/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007CA5',
        secondary: '#7CA538',
        'blue-200': '#55B4D4',
        'blue-800': '#024D67',
        'blue-400': '#009FC6',
        'text-primary': '#222222',
        'text-secondary': '#9E9E9E',
      },
      fontSize: {
        h1: ['48px', '1'],
        h2: ['32px', '1'],
        h3: ['24px', '1'],
        h4: ['20px', '1.3'],
        h5: ['18px', '1'],
        'body-large': ['16px', '1'],
        'body-medium': ['14px', '1'],
        'body-small': ['12px', '1'],
        'button-text': ['16px', '1'],
        caption: ['12px', '1'],
      },
      fontFamily: {
        en: ['"DM Sans"', 'Rubik', 'sans-serif'],
        ar: ['Rubik', '"DM Sans"', 'sans-serif'],
        fr: ['"DM Sans"', 'Rubik', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '60px',
          sm: '16px',
        },
      },
      maxWidth: {
        '5xl': '80rem',
      }
    },
  },
  plugins: [],
};
