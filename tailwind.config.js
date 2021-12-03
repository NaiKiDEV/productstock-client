module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        black: '#272727',
        lightblack: '#363636',
        darkgrey: '#5c5c5c',
        grey: '#747474',
        brightgreen: '#1cd189',
        green: '#14A76C',
        darkgreen: '#0e8a73',
        blue: '#49C5B1',
        mutedgreen: '#3a9e8d',
        darkblue: '#2D3750',
        lightdarkblue: '#384967',
        lightblue: '#A2B2C8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
