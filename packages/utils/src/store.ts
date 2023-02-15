import { isObject, isNumber } from './type'
import { random } from './helper'

const parse = jsonString => JSON.parse(jsonString)
const stringify = json => JSON.stringify(json)

/**
 * 创建本地存储，支持空间隔离，获取值即存储时类型
 */

export class Store {
  // 储存类型
  type: 'local' | 'session'
  // 命名空间
  ns: string

  /**
   * 
   * @param config 实例化存储的配置信息
   * @param config.ns 明明空间，默认会随机生成，也可指定
   * @param config.type 浏览器存储类型，默认 'local'，可选：'local' | 'session'
   * @param config.data 实例化时直接存储的数据，支持常见数据类型，不支持循环引用
   */
  constructor(config?: CJ.StoreConfig) {
    const { type, ns, data } = config || {}

    this.ns = ns || random()
    this.type = type || 'local'
    this.setAll(data)
  }

  set(key: string, value: any, config?: CJ.StoreItemConfig): void {
    let { expire } = config || {}
    const { duration } = config || {}
    const now = Date.now()
    // 默认过期时间为当前时间后100年
    const ONE_HUNDRED_YEARS = 100 * 365 * 24 * 60 * 60 * 1000
    const DEFAULT_EXPIRE = now + ONE_HUNDRED_YEARS

    if (isNumber(expire)) {
      // expire = expire;
    } else if (isNumber(duration)) {
      expire = now + duration
    } else {
      expire = DEFAULT_EXPIRE
    }

    if (expire <= now) {
      return this.remove(key)
    }
    const data = { expire, value }
    switch (this.type) {
      case 'local':
      case 'session':
        window[this.type + 'Storage'].setItem(
          `${this.ns}_${key}`,
          stringify(data)
        )
        break
      default:
        break
    }
  }

  setAll(data: { [key: string]: any }): void {
    if (!isObject(data)) return
    for (const i in data as any) {
      this.set(i, data[i])
    }
  }

  get(key: string, withMeta = false): any {
    let result = null
    switch (this.type) {
      case 'local':
      case 'session': {
        const data = window[this.type + 'Storage'].getItem(`${this.ns}_${key}`)
        if (!data) break

        const { expire, value } = parse(data) || {}
        if (!isNumber(expire)) break

        if (expire <= Date.now()) {
          this.remove(key)
        } else {
          if (withMeta) {
            result = parse(data)
          } else {
            result = value
          }
        }
        break
      }
      default:
        break
    }
    return result
  }

  getAll(withMeta = false): { [key: string]: any } {
    const result = {}
    switch (this.type) {
      case 'local':
      case 'session': {
        const len = window[this.type + 'Storage'].length
        // 当前命名空间下的所有存储key
        const keys = []
        for (let i = 0; i < len; i++) {
          const fullkey = window[this.type + 'Storage'].key(i)
          const prefix = this.ns + '_'
          if (fullkey.startsWith(prefix)) {
            const key = fullkey.replace(new RegExp('^' + prefix), '')
            key && keys.push(key)
          }
        }
        keys.forEach(key => {
          const value = this.get(key, withMeta)
          if (value !== null) result[key] = this.get(key, withMeta)
        })
        break
      }
      default:
        break
    }
    return result
  }

  remove(key: string): void {
    switch (this.type) {
      case 'local':
      case 'session':
        window[this.type + 'Storage'].removeItem(`${this.ns}_${key}`)
        break
      default:
        break
    }
  }

  removeAll(): void {
    switch (this.type) {
      case 'local':
      case 'session': {
        const len = window[this.type + 'Storage'].length
        // 当前命名空间下的所有存储key
        const nsKeys = []
        for (let i = 0; i < len; i++) {
          const fullkey = window[this.type + 'Storage'].key(i)
          if (fullkey.startsWith(this.ns + '_')) nsKeys.push(fullkey)
        }
        nsKeys.forEach(key => {
          window[this.type + 'Storage'].removeItem(key)
        })
        break
      }
      default:
        break
    }
  }

  clear(): void {
    switch (this.type) {
      case 'local':
      case 'session':
        window[this.type + 'Storage'].clear()
        break
      default:
        break
    }
  }
}
