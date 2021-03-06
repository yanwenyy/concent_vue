'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// http://localhost:8081/manage/proposal/importList?token=
// http://localhost:8081#/reportForm/list?resid=I40289ebd0177d21ad21acd720177d34e27ef015e&&token=
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        // target: 'http://192.168.21.3:8090',//天宇
        // target: 'http://192.168.31.205:8090',//党崇山
        // target: 'http://192.168.2.151:8090',//赵会林
        // target: 'http://192.168.21.13:8090',//杨帆
        target: 'http://192.168.21.12:8090',//久松
        // target:'http://121.36.7.195:80',
        // target:'http://121.36.79.169',
        chazngeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/jsonapi': {
        target: 'http://36.112.155.134:9901',
        changeOrigin: true,
        pathRewrite: {
          '^/jsonapi': '/'
        }
      // http://36.112.155.134:9901
    }
    },

    // Various Dev Server settings
    // host: '0.0.0.0', // can be overwritten by process.env.HOST
    host: 'localhost',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
         * Source Maps
         */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
         * Source Maps
         */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
