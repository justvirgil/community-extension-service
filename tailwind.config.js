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
        cream: '#f0f2f5',
        yellow: '#e0bc1c',
        'dark-blue': '#3e0d56',
        'light-blue': '#501070',
        'light-green': '#05c900'
      },
      overscrollBehavior: {
        none: 'none'
      }
    }
  },
  content: ['./src/**/*.{html,js}']
}
