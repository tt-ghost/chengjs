const { merge } = require('webpack-merge')
const conf = require('./webpack.base.js')

module.exports = merge(conf, {
  plugins: [
    new HtmlWebpackPlugin({
      template: '../examples/index.html'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    open: true,
    port: 9001
  }
})