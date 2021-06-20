const webpack = require('webpack')
const path = require('path')
const HtmlPlugin =  require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const {
  getBase,
  getIP,
  resolveEnv,
  useLess,
  useTs,
  useOptimization
} = require('@chengjs/webpack-config')


const conf = {}

// base env config
let base = getBase()
base = useTs(base)
console.log(23223, base)

// production env config
conf.prod = () => {
  base.mode = 'production'
  base = useLess(base)
  base = useOptimization(base)

  return merge(base, {
    entry: './src/main.ts',
    output: {
      filename: 'copy.min.js',
      path: path.resolve(__dirname, '../dist'),
      library: {
        name: 'cjsCopy',
        type: 'umd',
        export: 'default'
      }
    }
  })
}

// test env config
conf.test = () => {
  base.mode = 'production'
  base = useLess(base)
  base = useOptimization(base)

  return merge(base, {
    entry: './examples/copy-test.ts',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist')
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

