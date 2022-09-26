/**
 * 复制字符串到系统剪切板中
 * @param text 待复制的文本
 * @returns void
 * @examples
 * ```js
 * copy('copy test')
 * ```
 */
export async function copy(text: string): Promise<void> {
  if (typeof window === "undefined") return;

  const readPromise = await navigator.permissions.query({
    name: "clipboard-read",
  } as any);
  const writePromise = await navigator.permissions.query({
    name: "clipboard-write",
  } as any);
  const [readPerm, writePerm] = await Promise.all([readPromise, writePromise]);

  if (
    ["granted", "prompt"].indexOf(readPerm.state) > -1 ||
    ["granted", "prompt"].indexOf(writePerm.state) > -1
  ) {
    await navigator.clipboard.writeText(text);
  } else {
    await Promise.reject("请授权剪切板");
  }
}

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

export const deepClone = (val: any) => {
  const map = new Map();
  const clone = (val: any) => {
    if (isFunction(val)) return undefined;
    if (isSymbol(val)) return Symbol(val.description);
    if (isBaseType(val)) return val;
    if (isArray(val)) {
      const newVal = [];
      // 循环引用返回第一次clone的引用
      if (map.has(val)) return map.get(val);
      map.set(val, newVal);

      newVal.push(
        ...val.map((item) => {
          if (isFunction(item)) return null;
          return clone(item);
        })
      );

      return newVal;
    }
    if (isObject(val)) {
      const newVal = {};
      // 循环引用返回第一次clone的引用
      if (map.has(val)) return map.get(val);
      map.set(val, newVal);

      for (const key in val) {
        if (isFunction(val[key])) continue;

        newVal[key] = clone(val[key]);
      }
      return newVal;
    }
  };
  return clone(val);
};
