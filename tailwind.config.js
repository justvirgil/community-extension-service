export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif']
      },
      height: {
        '15xl': '44rem'
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      colors: {
        green: '#08743c',
        yellow: '#e0bc1c',
        'dark-blue': '#0d072b',
        'light-green': '#1da35e'
      },
      overscrollBehavior: {
        none: 'none'
      },
    }
  },
  content: ['./src/**/*.{html,js}']
}
