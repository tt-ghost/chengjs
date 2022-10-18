/**
 * 获取局域网ip地址
 */
export function getIP() {
  const interfaces = require('os').networkInterfaces()
  for (const key in interfaces) {
    const faces = interfaces[key]
    const result = faces.find(
      item =>
        item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal
    )
    if (result) return result.address
  }
}
