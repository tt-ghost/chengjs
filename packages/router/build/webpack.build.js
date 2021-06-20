const { merge } = require('webpack-merge')
const conf = require('./webpack.base.js')

module.exports = merge(conf, {
  module: {

  }
})