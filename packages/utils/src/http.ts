// https://developer.mozilla.org/zh-CN/docs/Web/API/fetch

const DEFAULTS = {
  method: 'GET',
  mode: 'cors',
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  }
}

const mergeOption = opt => {
  const { headers = {}, ...others } = opt || {}
  // const {headers = {}, ...others} = opt||{}
  return Object.assign({}, others, {
    headers: { ...DEFAULTS.headers, ...headers }
  })
}

export default class HTTP {
  public baseURL: string
  public headers: { [key: string]: string | number | boolean }

  constructor(opt) {
    const { baseURL, headers } = mergeOption(opt)
    this.baseURL = baseURL
    this.headers = headers
  }
  async fetch(url: string, opt) {
    await this.fetch(url, opt)
  }
  create(apis: { [key: string]: string }): {
    [key: string]: (
      data?: { [key: string]: any },
      opt?: { [key: string]: any }
    ) => Promise<any>
  } {
    const result = {}
    for (const name in apis) {
      result[name] = Promise.resolve().then()
    }
    return result
  }

  cancel() {
    return
  }
}

// const http = new HTTP({
//   baseURL: '/api',
//   headers: {
//     cache: 'no-cache'
//   }
// })

// const apis = {
//   getUser: 'POST:/user/info'
// }

// const api = http.create(apis)
// const [err, res] = await api.getUser(
//   { name: 'chengjs' },
//   { headers: { 'Content-Type': 'application/json' } }
// )

// api.getUser({})
