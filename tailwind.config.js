const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: "767px",
      md_min: "768px",
      md_max: "1023px",
      lg: "1024px"
    },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
      boxShadow: {
        'shadow-dark': '9px 7px 31px -10px rgba(0, 0, 0, .6)',
        'shadow-dark1': '8px 8px 19px -13px rgba(78, 78, 78, 1)'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'color-light': '#facd89',
        'color-light1': '#ddba83',
        'color-light2': '#9b5550',
        'color-light3': '#999999',
        'color-light4': '#FDF4F2FF',
        'color-light5': '#FFF6EBFF',
        'color-light6': '#FFEDD6FF',
        'color-dark': '#1a1a1a',
        'color-dark1': '#212121',
        'color-dark2': '#2e4856'
      },
      fontFamily: {
        "Montserrat-VariableFont_wght": ["Montserrat-VariableFont_wght"],
        "Sacramento-Regular": ["Sacramento-Regular"],
        "SourceSansPro-Regular" : ["SourceSansPro-Regular"],
        "SourceSansPro-SemiBold":["SourceSansPro-SemiBold"],
        "SourceSansPro-Italic":["SourceSansPro-Italic"],
        "April-June":["April June"],
        "PlayfairDisplay-VariableFont_wght":["PlayfairDisplay-VariableFont_wght"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
