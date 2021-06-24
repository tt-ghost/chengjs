/**
 * 根据环境返回less样式文件loader配置
 * @param {string} env 当前NODE_ENV环境
 * @param {object} config 相关loader配置信息
 * @returns less loader配置
 */
function useLessLoader(env, config) {
  const defaultConfig = {
    less: {},
    style: {},
    css: {},
    extract: {},
  }
  config = Object.assign({}, defaultConfig, config || {})

  return {
    test: /\.(le|c)ss$/i,
    use: [
      env === 'production' ? {
        loader: require('mini-css-extract-plugin').loader,
        options: config.extract
      } : {
        loader: 'style-loader',
        options: config.style
      },
      {
        loader: 'css-loader',
        options: config.css
      },
      {
        loader: 'less-loader',
        options: config.less
      }
    ]
  }
}
/**
 * 根据环境返回sass样式文件loader配置
 * @param {string} env 当前NODE_ENV环境
 * @param {object} config 相关loader配置信息
 * @returns sass loader配置
 */
 function useSassLoader(env, config) {
  const defaultConfig = {
    sass: {},
    style: {},
    css: {},
    extract: {},
    next: {},
  }
  config = Object.assign({}, defaultConfig, config || {})

  return {
    test: /\.(sc|c|sa)ss$/i,
    use: [
      env === 'production' ? {
        loader: require('mini-css-extract-plugin').loader,
        options: config.extract
      } : {
        loader: 'style-loader',
        options: config.style
      },
      {
        loader: 'css-loader',
        options: config.css
      },
      {
        loader: 'fast-sass-loader',
        options: config.sass
      },
      {
        // add @alifd/next-theme-loader to inject the scss variable of the custom theme package
        loader: '@alifd/next-theme-loader',
        options: config.next
      }
    ]
  }
}
/**
 * useImageLoader 
 * @returns image loader配置
 */
 function useImageLoader() {
  return {
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
}

/**
 * useSvgLoader 
 * @returns svg loader配置
 */
 function useSvgLoader() {
  return {
    test: /\.svg$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          encoding: false
        }
      }
    ]
  }
}

/**
 * useJsxLoader 
 * @returns jsx loader配置
 */
 function useJsxLoader() {
  return {
    test: /\.jsx?$/,
    use: [
      'babel-loader'
    ],
    exclude: /node_modules/
  }
}

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
 * 添加本地开发时运行地址
 */
 function useLocalLog(config) {
  const { mode, devServer = {} } = config

  if (mode === 'development' && devServer) {
    const { host = '0.0.0.0', port } = devServer
    let ip = getIP()
    let log = `local server:\nhttp://${host}:${port}\n`

    if (ip !== host) log += `http://${ip}:${port}\n`

    console.log('\x1b[33m%s\x1b[0m', log)
  }
}

module.exports = {
  useLessLoader,
  useImageLoader,
  useSvgLoader,
  useJsxLoader,
  useSassLoader,
  getIP,
  useLocalLog
}