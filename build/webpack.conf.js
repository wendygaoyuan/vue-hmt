const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-hmt.min.js',
    library: `${pkg.name}`,
    libraryTarget: 'umd'
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  ]
};