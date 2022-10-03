// eslint-disable-next-line
namespace CJ {
  type BASE_TYPE = string | number
  // eslint-disable-next-line
  export interface URL {
    protocol: string
    domain: string
    port: string
    path: string
    hash: string
    params: { [key: string]: string | number | BASE_TYPE[] }
  }

  export type HTTP_HEADER =
    | Headers
    | { [key: string]: string | number | boolean }

  export interface HTTP_OPTION {
    method?:
      | 'GET'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'OPTIONS'
      | 'HEAD'
      | 'CONNECT'
      | 'TRACE'
      | 'PATCH'
    mode?: 'cors' | 'no-cors' | 'same-origin'
    baseURL?: string
    headers?: HTTP_HEADER
    body?: any
    credentials?: 'omit' | 'same-origin' | 'include'
    cache?:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'no-cache'
      | 'force-cache'
      | 'only-if-cached'
    redirect?: 'follow' | 'error' | 'manual'
    referrer?: 'no-referrer' | 'client' | string
    referrerPolicy?:
      | 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'unsafe-url'
    integrity?: string
    signal?: string
  }
}
