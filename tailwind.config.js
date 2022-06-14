module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundColor: theme => ({
     
        'primary': '#013C2A',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
              }),
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] ,
        

      },
    },
    maxWidth: {
      '1/2': '50%',
    },
    screens: {
      'sm': '350px',
      // => @media (min-width: 576px) { ... }

      'md': '750px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }

      'max5': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'max4': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'max3': {'max': '1200px'},
      // => @media (max-width: 1023px) { ... }

      'max2': {'max': '900px'},
      // => @media (max-width: 767px) { ... }

      'max1': {'max': '600px'},
      // => @media (max-width: 639px) { ... }

    },
  },
  
  plugins: [],
}
