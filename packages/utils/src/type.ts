const BASE_TYPE = [
  "string",
  "number",
  "boolean",
  "undefined",
  "bigint",
  "symbol",
  null,
];
export const is = (val: any, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};
export const isBaseType = (val: any) =>
  val === null || BASE_TYPE.indexOf(typeof val) !== -1;
export const isFunction = (val: any) => is(val, "Function");
export const isString = (val: any) => is(val, "String");
export const isBoolean = (val: any) => is(val, "Boolean");
export const isNumber = (val: any) => is(val, "Number");
export const isNull = (val: any) => is(val, "Null");
export const isUndefined = (val: any) => is(val, "Undefined");
export const isSymbol = (val: any) => is(val, "Symbol");
export const isBigInt = (val: any) => is(val, "BigInt");
export const isArray = (val: any) => Array.isArray(val);
export const isObject = (val: any) => is(val, "Object");
export const isPromise = (val: any) => is(val, "Promise");
export const isRegExp = (val: any) => is(val, "RegExp");
export const isDom = (val: any) => is(val, "Element");
export const isDate = (val: any) => {
  // 为数字或Date对象时，Invalid Date 也是Date 类型， 需排除掉
  if ((is(val, "Date") || isString(val)) && !isNaN(new Date(val).valueOf())) {
    return true;
  }
  // 为数字时，去掉正负极限，去掉小数
  if (
    isNumber(val) &&
    val !== Infinity &&
    val !== -Infinity &&
    val === parseInt(val)
  ) {
    return true;
  }
  return false;
};
