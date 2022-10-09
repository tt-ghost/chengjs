import { isFunction, isSymbol, isBaseType, isArray, isObject } from './type'

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
