const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: path.join(__dirname, '../release'),
    filename: '[name]/[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '~': path.join(__dirname, '../src')
    }
  },
  stats: {
    children: false
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{ loader: 'css-loader?minimize=true' }, 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'url-loader?limit=1000000'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../public'),
        to: path.join(__dirname, '../release')
      }
    ]),
    new ExtractTextPlugin('[name]/[name].css')
  ]
}
