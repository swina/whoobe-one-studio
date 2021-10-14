const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors') 
module.exports = {
  purge: false,
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.vue',
  //   './src/**/*.jsx',
  // ],
  theme: {
    fontFamily: {
      display: ['Barlow Condensed','Abel','Alice','Amethysta', 'sans-serif']
    },
    
      colors: {
        // Build your palette here
        transparent: 'transparent',
        current: 'currentColor',
        white: colors.white,
        black: colors.black,
        gray: colors.coolGray,
        bluegray:colors.blueGray , 
        red: colors.red,
        blue: colors.blue,
        yellow: colors.amber,
        brown: colors.warmGray, 
        orange: colors.orange,
        green: colors.green , 
        lime: colors.lime ,
        teal: colors.teal , 
        indigo: colors.indigo,
        purple: colors.purple ,
        pink: colors.pink
    },
    extend: {

      border :{
        '12' : '1rem',
        '16' : '1.25m',
        '20' : '1.50rem'
      },
        fontFamily: {

        },
        zIndex: {
          '0' : '-1',
          '1' : '1',
          '2' : '2',
          '3' : '3',
          '4' : '4',
          '5' : '5',
          '6' : '6',
          '7' : '7',
          '8' : '8',
          '9' : '9',
          '11': '11',
          '12': '12',
          '13' : '13',
          '14' : '14',
          '15' : '15',
          '16' : '16',
          '17' : '17',
          '18' : '18',
          '19' : '19',
          '102': '102',
          '103' : '103',
          '104' : '104',
          '105' : '105',
          '106' : '106',
          '107' : '107',
          '108' : '108',
          '109' : '109', 
          'max': '1000',
          'top': '1001',
          'xtop'    : '1002',
          '2xtop'   : '2000',
          'highest' : '3000',
          'modal' : '4000'
        },
        lineHeight : {
          '11' : '2.75rem',
          '12' : '3.0rem',
          '13' : '3.25rem',
          '14' : '3.5rem',
          '15' : '3.755rem'
        },
        fontSize : {
          '6xl' : '3.25rem',
          '7xl' : '3.5rem',
          '8xl' : '3.75rem',
          '9xl' : '4rem',
          '10xl' : '5rem',
          '20xl' : '6rem'
        },
        width : {
          'little' : '15%',
          'sidebar' : '20%',
          'auto'  : 'auto',
          'half'  : '50%',
          'large' : '60%',
          'wide'  : '75%',
          'wider' : '80%',
          'superwide' : '85%',
          'extrawide' : '90%',
          '2xwide' : '95%'
        },
        height: {
          '72' : '18rem',
          '80' : '20rem',
          '96' : '24rem',
          '1/5': '20vh',
          '1/4': '25vh',
          '1/3': '33vh',
          '2/5': '40vh',
          '1/2': '50vh',
          '2/3': '66vh',
          '3/5': '60vh',
          '3/4': '75vh',
          '4/5': '80vh',
          '85' : '85vh',
          '90' : '90vh',
          '95' : '95vh'
        },
        scale: {
          '101': '1.01',
          '102': '1.02',
          '103': '1.03',
          '104': '1.04',
          '105' : '1.05',
          '106': '1.06',
          '107': '1.07',
          '108' : '1.08',
          '109' : '1.09',
          '111': '1.11',
          '112': '1.12',
          '113': '1.13',
          '114': '1.14',
          '115' : '1.15',
          '116': '1.16',
          '117': '1.17',
          '118' : '1.18',
          '119' : '1.19',
          '120' : '1.20'
        },
        gridTemplateRows: {
          'pancake' : 'auto 1fr auto'
        },
        spacing: {
          'full' : '100%',
          '1/2' : '50%',
          '1/3' : '33.333333%',
          '2/3' : '66.666667%', 
          '1/4' : '25%',
          '3/4' : '75%',
          '1/5' : '20%',
          '2/5' : '40%',
          '3/5' : '60%',
          '4/5' : '80%',
          '1/6' : '16.666667%',
          '2/6' : '33.333333%',
          '4/6' : '66.666667%',
          '5/6' : '83.333333%',
          '1/12' : '8.333333%',
          '2/12' : '16.666667%',
          '3/12' : '25%',
          '4/12' : '8.333333%',
          '5/12' : '16.666667%',
          '7/12' : '58.333333%',
          '8/12' : '66.666667%',
          '9/12' : '75%',
          '10/12' : '83.333333%',
          '11/12' : '91.666667%'  
        }
    },
  },
  variants: {
    invisible: ['responsive'],
    transform: ['responsive'],
    translate: ['responsive'],
    lineHeight: ['responsive', 'hover', 'focus'],
  },
  plugins: [
    plugin(function({ addComponents }) {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          fontWeight: '600',
          border: '0'
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          },
        },
        '.btn-purple': {
          backgroundColor: '#581c87',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#581c87'
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          },
        },
        '.btn-icon':{
          padding:'.25rem',
          borderRadius: '3px',
          width: '2rem',
          height: '2rem'
        },
        '.chip' :{
          padding:'.0rem .25rem',
          borderRadius: '3px',
        },
        '.toolbar-icon' :{
          padding:'.25rem',
          borderRadius: '3px',
          width: '2rem',
          height: '2rem',
          textAlign: 'center',
          border: '1px solid transparent',
          '&:hover': {
            border: '1px solid #cecece'
          },
        }
      }

      addComponents(buttons)
    })
  ]
  
  
}
