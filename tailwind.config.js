const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'color-light': '#facd89',
        'color-light1': '#ddba83',
        'color-light2': '#9b5550',
        'color-light3': '#999999'
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
  plugins: [],
}
