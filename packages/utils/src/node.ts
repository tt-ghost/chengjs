/**
 * 获取局域网ip地址
 */
export function getIP() {
  const interfaces = require("os").networkInterfaces();
  for (const key in interfaces) {
    const faces = interfaces[key];
    const result = faces.find(
      (face) =>
        face.family === "IPv4" && face.address !== "127.0.0.1" && !face.internal
    );
    if (result) return result.address;
  }
}
