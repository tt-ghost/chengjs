// https://developer.mozilla.org/zh-CN/docs/Web/API/fetch

import { REG_URI_DOMAIN } from './reg'

const DEFAULT_REQUEST_OPTION: CJ.HTTP_OPTION = {
  method: 'GET',
  mode: 'cors',
  baseURL: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: {},
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  referrer: 'client'
}

const mergeConfig = (config1, config2) => {
  const { headers: h1, method: m1, ...others1 } = config1 || {}
  const { headers: h2, method: m2, ...others2 } = config2 || {}
  return Object.assign(
    {},
    { ...others1, ...others2 },
    {
      method: (m2 || m1 || '').toUpperCase(),
      headers: Object.assign({}, h1 || {}, h2 || {})
    }
  )
}

/**
 * http 库
 * @example
 *  const http = new HTTP({
 *    baseURL: '/api',
 *    headers: { cache: 'no-cache', token: 'xxx' }
 *  })

 *  const apis = {
 *    getUser: '/user/info',
 *    updateUser: 'PUT: /user/info',
 *    sendUser: 'POST: http://test.com/user/add'
 *  }

 *  const api = http.create(apis)
 *  // 默认发送 GET 请求 /api/user/info
 *  const res = await api.getUser()
 *  // 发送 PUT 请求 /api/user/info
 *  const res = await api.updateUser({ name: 'chengjs' })
 *  // 发送 POST 请求，第二个参数选项的method 比 url路径中声明的method优先级高
 *  const res = await api.updateUser({ name: 'chengjs' }, { method: 'POST' })
 *  // 忽略 baseURL，发送 POST 请求到 http://test.com/user/add
 *  const res = await api.sendUser({ name: 'chengjs' })
 *
 */

export class HTTP {
  public config: any

  constructor(opt) {
    this.config = mergeConfig(DEFAULT_REQUEST_OPTION, opt)
  }
  async fetch(url: string, opt?: CJ.HTTP_OPTION) {
    return await window.fetch(url, opt as any)
  }

  parseAPI(api: string) {
    const result = {
      method: 'GET',
      url: api
    }
    if (api.indexOf(':') > -1) {
      const [, method = '', url = api] = api.match(/(^[a-zA-Z]+):\s*(.*)/) || []
      if (method) result.method = method.toUpperCase()
      if (url) result.url = url
    }
    return result
  }

  resolve(url = '') {
    if (new RegExp(REG_URI_DOMAIN, 'i').test(url)) {
      return url
    } else {
      return (
        this.config.baseURL.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
      )
    }
  }

  create(apis: { [key: string]: string }): {
    [key: string]: (
      data?: { [key: string]: any },
      opt?: { [key: string]: any }
    ) => Promise<any>
  } {
    const result = {}
    for (const name in apis) {
      const { method: urlMethod, url } = this.parseAPI(apis[name])

      result[name] = (data, config) => {
        const opt = {
          ...mergeConfig(this.config, config),
          method: urlMethod,
          body: data !== null ? JSON.stringify(data) : undefined
        }

        if (config.method) {
          opt.method = config.method.toUpperCase()
        }

        if (['GET', 'HEAD'].indexOf(opt.method) > -1) delete opt.body

        return this.fetch(this.resolve(url), opt).then(res => {

          let isJson = false
          res.headers.forEach((v, k) => {
            if(k.toLowerCase() === 'content-type' && v.indexOf('application/json') > -1){
              isJson = true
            }
          });
          if (isJson) return res.json();

          return res;
        })
      }
    }
    return result
  }
}
