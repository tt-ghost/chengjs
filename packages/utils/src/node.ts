/**
 * 获取局域网ip地址
 */
export function getIP() {
  const interfaces = require('os').networkInterfaces()

  for (const key in interfaces) {
    const faces = interfaces[key]
    const result = faces.find(
      ({ family,address, internal }) =>
        family === 'IPv4' && address !== '127.0.0.1' && !internal
    )
    if (result) return result.address
    return ''
  }
}
