/**
 * 解析URL
 * @param url url 地址
 * @returns object
 */
export const parseURL = (url: string): CJ.URL => {
  const [start, end = ''] = url.split('?')
  const [protocol, domainAndPath = ''] = start.split(/:?\/\//)
  // const [domain, port = 80] = domainAndPath.split(":");

  const [paramsString = '', hash = ''] = end.split('#')
  const paramsList = paramsString.split('&')
  const params = paramsList.reduce((result, val) => {
    const [key, value] = val
    // 数字类型转为数字
    const parsedVal = isNaN(Number(value)) ? value : Number(value)

    if (key in result) {
      if (Array.isArray(result[key])) {
        result[key].push(parsedVal)
      } else {
        result[key] = [result[key], parsedVal]
      }
    } else {
      result[key] = parsedVal
    }
    return result
  }, {})
  const domainRegStr = '((?:[a-zA-Z\\d][a-zA-Z\\d-]*\\.)+[a-zA-Z\\d]+)'
  const portRegStr = '(?::(\\d+))?'
  const pathRegStr = '((?:\\/[a-zA-Z-\\d]+)*)'
  const reg = new RegExp(domainRegStr + portRegStr + pathRegStr)
  const [, domain = '', port = '80', path = ''] = domainAndPath.match(reg) || []

  return {
    protocol,
    domain,
    port,
    path,
    params,
    hash
  }
}
