

/**
 * 获取局域网ip地址 
 */
function getIP() {
  const interfaces = require('os').networkInterfaces();
  for (const key in interfaces) {
    const faces = interfaces[key]
    const result = faces.find(face => face.family === 'IPv4' && face.address !== '127.0.0.1' && !face.internal)
    if (result) return result.address
  }
}

/**
 * 根据环境参数获取对应配置
 */
function resolveEnv(env, conf) {
  const envs = Object.keys(env).filter(key => key in conf)
  const value = envs.find(key => env[key])
  try {
    const fn = conf[value]
    if (typeof fn !== 'function') throw new Error(`${value} should be a function!`)
    const config = fn()

    localLog(config)
    return config
  } catch (e) {
    throw new Error(e)
  }
}
/**
 * 添加本地开发时运行地址
 */
function localLog(config) {
  const { mode, devServer = {} } = config

  if (mode === 'development' && devServer) {
    const { host = '0.0.0.0', port } = devServer
    let ip = getIP()
    let log = `local server:\nhttp://${host}:${port}\n`

    if (ip !== host) log += `http://${ip}:${port}\n`

    console.log('\x1b[33m%s\x1b[0m', log)
  }
}

/**
 * 包装webpack loader配置
 */
function loader(conf) {
  if (!conf) return {}

  return {
    module: {
      rules: [
        conf
      ]
    }
  }
}

/**
 * 包装webpack plugin配置
 */
function plugin(ins) {
  if (!ins) return {}

  return {
    plugins: [ins]
  }
}

/**
 * 添加ts-loader
 */
function tsLoader(options = {}) {

  return {
    test: /\.ts$/,
    use: ['ts-loader'],
    exclude: /node_modules/
  }
}

/**
 * 添加style-loader
 */
function styleLoader(options = {}, base = {}) {
  const isProd = base.mode === 'production'

  return isProd
    ? {
      loader: require('mini-css-extract-plugin').loader,
      options: {}
    }
    : {
    loader: 'style-loader',
    options
  }
}

/**
 * 添加css-loader
 */
function cssLoader(options = {}, base = {}) {
  return 'css-loader'
}

/**
 * 添加less-loader
 */
function lessLoader(options = {}, base = {}) {
  return {
    loader: 'less-loader',
    options
  }
}

/**
 * 添加less plugin
 */
function lessPlugin(options = {}, base) {
  const isProd = base.mode === 'production'

  return isProd ? (() => {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const opt = Object.assign({
      filename: '[name].css',
      // chunkFilename: '[id].css',
    }, options)
    return new MiniCssExtractPlugin(opt)
  })() : null
}

/**
 * 添加banner plugin
 */
 function bannerPlugin(options = {}, base) {
  const webpack = require('webpack');

  return new webpack.BannerPlugin(options)
}

/**
 * 基础默认webpack config
 */
function getBase (config = {}) {
  return Object.assign({
    mode: process.env.NODE_ENV,
    entry: './src/main.js',
    output: {
      filename: '[name].js',
      path: process.cwd() + '/dist'
    },
    plugins: [],
    module: {
      rules: []
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue', '.less', '.sass', '.scss']
    },
    
  }, config)
}

/**
 * 开启压缩优化
 */
function useOptimization(base = getBase(), options = {}) {
  const { merge } = require('webpack-merge')

  function optimization () {
    const isProd = base.mode === 'production'
    if (!isProd) return {}

    return {
      minimizer: [
        (compiler) => {
          const TerserPlugin = require('terser-webpack-plugin');
          new TerserPlugin({
            /* 你的配置 */
          }).apply(compiler);
        },
        (compiler) => {
          const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
          new CssMinimizerPlugin().apply(compiler)
        }
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        // name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(le|c|sa)ss$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      emitOnErrors: true
    }
  }
  return merge(base, {
    optimization: optimization()
  })
}

/**
 * 开启less
 */
function useLess(base = getBase(), options = {
  loader: {},
  plugin: {},
  css: {},
  style: {}
}) {
  const { merge } = require('webpack-merge')

  return merge(base, loader({
    test: /\.(le|c)ss$/i,
    use: [
      styleLoader(options.style, base),
      cssLoader(options.css, base),
      lessLoader(options.loader, base)
    ]
  }), plugin(lessPlugin(options.plugin, base)))
}

/**
 * 开启ts
 */
function useTs(base = getBase(), options = {}) {
  const { merge } = require('webpack-merge')

  return merge(base, loader(tsLoader(options)))
}

/**
 * 添加banner
 */
 function useBanner(base = getBase(), options = {}) {
  const { merge } = require('webpack-merge')

  return merge(base, plugin(bannerPlugin(options, base)))
}

module.exports = {
  getBase,
  getIP,
  resolveEnv,
  useLess,
  useTs,
  useOptimization,
  useBanner
}




