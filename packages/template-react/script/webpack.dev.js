const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { useSassLoader, useLocalLog } = require('./helper')
const base = require('./webpack.base')

module.exports = env =>  {
  const mode = 'development'
  const config = merge(base(env), {
    mode,
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        useSassLoader(mode)
      ]
    },
    devServer: {
      host: '0.0.0.0',
      port: 9000,
      historyApiFallback: true,
      hot: true
    },
    watch: true
  })

  useLocalLog(config)

  return config
}