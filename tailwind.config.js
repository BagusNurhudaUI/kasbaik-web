module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundColor: theme => ({
     
        'primary': '#013C2A',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
              }),
      
    },
    maxWidth: {
      '1/2': '50%',
    },
    // colors: {
    //   // Configure your color palette here
    //   'primary': '#013C2A',
    //   'yaya': '#15803d'
    // }
  },
  
  plugins: [],
}
