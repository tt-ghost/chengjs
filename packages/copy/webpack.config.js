const path = require('path')
const HtmlPlugin =  require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const {
  getBase,
  resolveEnv,
  useLess,
  useTs,
  useOptimization,
  useBanner
} = require('@chengjs/webpack-config')
const pkg = require('./package.json')
const conf = {}

// base env config
let base = getBase()
base = useTs(base)

// production env config
conf.prod = () => {
  base.mode = 'production'
  base = useLess(base)
  base = useOptimization(base)
  base = useBanner(base, {
    // raw: true,
    entryOnly: true,
    banner: `${pkg.name}
version: ${pkg.version}
author: ${pkg.author}
description: ${pkg.description}`
  })

  return merge(base, {
    entry: './src/main.ts',
    output: {
      filename: 'copy.min.js',
      path: path.resolve(__dirname, './dist'),
      library: {
        name: 'cjsCopy',
        type: 'umd',
        export: 'default'
      }
    }
  })
}

// development env config
conf.dev = () => {
  base.mode = 'development'
  base.devtool = 'source-map'
  base = useLess(base)
  return merge(base, {
    entry: './examples/copy-test.ts',
    output: {
      filename: '[name].js',
      path: __dirname
    },
    plugins: [
      new HtmlPlugin({
        template: './examples/index.html',
        filename: 'index.html'
      })
    ],
    devServer: {
      host: '0.0.0.0',
      port: 9000
    }
  })
}

module.exports = function(env, argv) {

  return resolveEnv(env, conf)
}

