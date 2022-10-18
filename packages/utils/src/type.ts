/**
 * 基本数据类型列表
 */
const BASE_TYPE = [
  'string',
  'number',
  'boolean',
  'undefined',
  'bigint',
  'symbol',
  null
]
/**
 * 判断参数1时候为参数2的数据类型
 * @param val 待判断类型的数据
 * @param type 指定类型的字符串形式，首字母大写
 * @returns boolean 是否为指定数据类型
 */
export const is = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

/**
 * 判断参数是否为7种基本类型
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isBaseType = (val: unknown) =>
  val === null || BASE_TYPE.indexOf(typeof val) !== -1

/**
 * 判断参数是否为 function
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isFunction = (val: unknown) => is(val, 'Function')

/**
 * 判断参数是否为 string
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isString = (val: unknown) => is(val, 'String')

/**
 * 判断参数是否为 number
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isBoolean = (val: unknown) => is(val, 'Boolean')

/**
 * 判断参数是否为 number
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isNumber = (val: unknown) => is(val, 'Number')

/**
 * 判断参数是否为 null
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isNull = (val: unknown) => is(val, 'Null')

/**
 * 判断参数是否为 undefined
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isUndefined = (val: unknown) => is(val, 'Undefined')

/**
 * 判断参数是否为 symbol
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isSymbol = (val: unknown) => is(val, 'Symbol')

/**
 * 判断参数是否为 bigint
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isBigInt = (val: unknown) => is(val, 'BigInt')

/**
 * 判断参数是否为 array
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isArray = (val: unknown) => Array.isArray(val)

/**
 * 判断参数是否为 object
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isObject = (val: unknown) => is(val, 'Object')

/**
 * 判断参数是否为 promise
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isPromise = (val: unknown) => is(val, 'Promise')

/**
 * 判断参数是否为 regexp
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isRegExp = (val: unknown) => is(val, 'RegExp')

/**
 * 判断参数是否为 dom
 * @param val 待判断类型的数据
 * @returns boolean
 */
export const isDom = (val: unknown) => val instanceof Element

/**
 * 判断参数是否为有效日期类型，支持数字、字符串、日期对象
 * @param val 待判断类型的数据
 * @returns boolean
 */
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
