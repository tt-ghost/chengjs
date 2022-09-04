const fs = require('fs')
const path = require('path')

module.exports = function () {
  const finename = '.gitignore'
  const isExist = fs.existsSync(path.resolve(__dirname, finename))
  const content = `
registry=https://registry.npmmirror.com/
sass_binary_site=https://npmmirror.com/mirrors/node-sass/
phantomjs_cdnurl=https://npmmirror.com/mirrors/phantomjs/
electron_mirror=https://npmmirror.com/mirrors/electron/
chromedriver_cdnurl=https://npmmirror.com/mirrors/chromedriver/
operadriver_cdnurl=https://npmmirror.com/mirrors/operadriver/
profiler_binary_host_mirror=https://npmmirror.com/mirrors/node-inspector/
npm_config_profiler_binary_host_mirror=https://npmmirror.com/mirrors/node-inspector/
`
  if (!isExist) {
    fs.writeFileSync(finename, content, { encoding: 'utf8' })
  } else {
    console.warn('.gitignore has existed!')
  }
}
