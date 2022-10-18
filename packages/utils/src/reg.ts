/**
 * url 协议的正则字符串
 */
export const REG_URI_PROTOCOL = '(?:([a-z]+):\\/\\/)?'

/**
 * url domain的正则字符串
 */
export const REG_URI_DOMAIN = '((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)'

/**
 * url port的正则字符串
 */
export const REG_URI_PORT = '(?::(\\d+))?'

/**
 * url path的正则字符串
 */
export const REG_URI_PATH = '((?:\\/[a-z-\\d]+)*)'
