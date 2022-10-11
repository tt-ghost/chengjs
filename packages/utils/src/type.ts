const BASE_TYPE = [
  'string',
  'number',
  'boolean',
  'undefined',
  'bigint',
  'symbol',
  null
]
export const is = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
export const isBaseType = (val: unknown) =>
  val === null || BASE_TYPE.indexOf(typeof val) !== -1
export const isFunction = (val: unknown) => is(val, 'Function')
export const isString = (val: unknown) => is(val, 'String')
export const isBoolean = (val: unknown) => is(val, 'Boolean')
export const isNumber = (val: unknown) => is(val, 'Number')
export const isNull = (val: unknown) => is(val, 'Null')
export const isUndefined = (val: unknown) => is(val, 'Undefined')
export const isSymbol = (val: unknown) => is(val, 'Symbol')
export const isBigInt = (val: unknown) => is(val, 'BigInt')
export const isArray = (val: unknown) => Array.isArray(val)
export const isObject = (val: unknown) => is(val, 'Object')
export const isPromise = (val: unknown) => is(val, 'Promise')
export const isRegExp = (val: unknown) => is(val, 'RegExp')
export const isDom = (val: unknown) => val instanceof Element
// eslint-disable-next-line
export const isDate = (val: any) => {
  // 为数字或Date对象时，Invalid Date 也是Date 类型， 需排除掉
  if ((is(val, 'Date') || isString(val)) && !isNaN(new Date(val).valueOf())) {
    return true
  }
  // 为数字时，去掉正负极限，去掉小数
  if (
    isNumber(val) &&
    val !== Infinity &&
    val !== -Infinity &&
    val === parseInt(val)
  ) {
    return true
  }
  return false
}
