import { isFunction, isSymbol, isBaseType, isArray, isObject } from './type'

/**
 * 深度复制js数据，支持基本类型、对象、数组、对象、循环引用的复制
 * @param val 待深度赋值的数据
 * @returns 新复制的数据
 * @example
 * 
 * 详情访问：https://www.yuque.com/chengzi-qxeon/chengjs/xkoirz#MPKu9
 * 
 * const sym = Symbol('chengjs')
 * const data = {
 *   name: 'Hello Chengjs Utils',
 *   fn: () => [],
 *   list: [() => [], 'test'],
 *   num: 2,
 *   big: BigInt(2),
 *   sym: sym,
 *   undef: undefined
 * }
 * data.self = data
 * const cloned = deepClone(data)
 * deepClone(data)
 */
export const deepClone = (val: unknown) => {
  const map = new Map()
  // eslint-disable-next-line
  const clone = (val: any) => {
    if (isFunction(val)) return undefined
    if (isSymbol(val)) return Symbol(val.description)
    if (isBaseType(val)) return val
    if (isArray(val)) {
      const newVal = []
      // 循环引用返回第一次clone的引用
      if (map.has(val)) return map.get(val)
      map.set(val, newVal)

      newVal.push(
        ...val.map(item => {
          if (isFunction(item)) return null
          return clone(item)
        })
      )

      return newVal
    }
    if (isObject(val)) {
      const newVal = {}
      // 循环引用返回第一次clone的引用
      if (map.has(val)) return map.get(val)
      map.set(val, newVal)

      for (const key in val) {
        if (isFunction(val[key])) continue

        newVal[key] = clone(val[key])
      }
      return newVal
    }
  }
  return clone(val)
}

/**
 * 生成指定长度的随机字符串，首字符为字母
 * @param len 随机字符串长度
 * @returns 指定长度的随机字符串
 */
export const random = (len = 8) => {
  const num = '0123456789'
  const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const char = letter + num
  const first = letter.charAt(Math.floor(Math.random() * letter.length))
  let last = ''

  if (len <= 0) len = 8

  if (len > 1) {
    for (let i = 0; i < len - 1; i++) {
      last += char.charAt(Math.floor(Math.random() * char.length))
    }
  }
  return first + last
}
