import { isFunction, isSymbol, isBaseType, isArray, isObject } from './type'

export const deepClone = (val: any) => {
  const map = new Map()
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
