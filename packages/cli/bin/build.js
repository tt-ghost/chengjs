import path from 'path'
import fs from 'fs'
import http from 'http'
import esbuild from 'esbuild'
import defaultConfig from './config'
import { merge, validate } from './util'

const configName = 'cheng.config.js'
const userConfigPath = path.resolve(process.cwd(), configName)
const userConfig = require(userConfigPath)
let config = defaultConfig()

// 1、判断配置文件时候存在
const isExist = fs.existsSync(userConfigPath)
if (isExist) {
  // 2、配置字段检查
  const valid = validate(userConfig)
  if (valid) {
    // 3、配置合并
    config = merge(config, userConfig)
  }
}

// 4、运行配置
const { server, ...others } = config
if (server) {
  esbuild.serve(server, others).then(serverResult => {
    console.log('serverResult: ', serverResult)
    // server.stop()

    http
      .createServer((req, res) => {
        const options = {
          hostname: serverResult.host,
          port: serverResult.port,
          path: req.url,
          method: req.method,
          headers: req.headers
        }

        // Forward each incoming request to esbuild
        const proxyReq = http.request(options, proxyRes => {
          // If esbuild returns "not found", send a custom 404 page
          if (proxyRes.statusCode === 404) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end('<h1>A custom 404 page</h1>')
            return
          }

          // Otherwise, forward the response from esbuild to the client
          res.writeHead(proxyRes.statusCode, proxyRes.headers)
          proxyRes.pipe(res, { end: true })
        })

        // Forward the body of the request to esbuild
        req.pipe(proxyReq, { end: true })
      })
      .listen(3000)
  })
} else {
  esbuild.buildSync(others)
}
