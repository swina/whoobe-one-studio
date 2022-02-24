var webpack = require('webpack');
module.exports = {
  pluginOptions: {
    windicss: {
      // see https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    },
  },
  configureWebpack: {
    module: {
      rules: [ {
        test: /\.md$/,
       loader: 'raw-loader', // npm install -D raw-loader
      }]
    }
  },
  pwa : {
    themeColor : '#7618b1',
    msTileColor: '#000000',
    favicon32: 'img/icons/favicon-32x32.png',
    favicon16: 'img/icons/favicon-16x16.png',
    appleTouchIcon: 'img/icons/apple-touch-icon.png',
    maskIcon: 'img/icons/safari-pinned-tab.svg',
    msTileImage: 'img/icons/mstile-144x144.png'
  },
  productionSourceMap: false,
  
}