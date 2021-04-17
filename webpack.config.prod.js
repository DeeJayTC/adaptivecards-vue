var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config.base')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    library: 'adaptivecards-vue',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'adaptivecards-vue.js'
  },
  externals: {
    'vue': 'Vue',
    'adaptivecards': 'adaptivecards',
    'adaptivecards-templating': 'adaptivecards-templating',
    'adaptive-expressions': 'adaptive-expressions'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'adaptivecards-vue.css'
    }),
    new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
})
