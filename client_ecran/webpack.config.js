const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const config = {
  target: 'web',
  entry: './index.js',
  watch: false,
  output: {
    path: path.resolve(__dirname, '../views'),
    filename: 'ecran.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'ecran.ejs',
      template: './index.html'
    })
  ],
}

module.exports = config
