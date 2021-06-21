const path = require('path')
const HtmlPlugin =  require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const pkg = require('./package.json')
const {
  getBase,
  resolveEnv,
  useLess,
  useTs,
  useOptimization,
  useBanner
} = require('@chengjs/webpack-config')

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
    entry: './src/index.ts',
    output: {
      filename: 'router.min.js',
      path: path.resolve(__dirname, './dist'),
      library: {
        name: 'cjsRouter',
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
    entry: './examples/index.ts',
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
      port: 9001
    }
  })
}

module.exports = function(env, argv) {

  return resolveEnv(env, conf)
}

