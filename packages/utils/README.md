## @chengjs/utils

javascript 无依赖工具函数库

### 使用

- 安装

```shell
npm i @chengjs/utils -S
```

- 使用

```js
import { deepClone } from '@chengjs/utils'

const cloned = deepClone({ name: 'Hello Chengjs Utils' })
```

`<script>` 方式引入，可通过 `window.utils.deepClone` 访问

### API

#### `deepClone(data: any)` 深度复制

```js
import { deepClone } from '@chengjs/utils'

const sym = Symbol('chengjs')
const data = {
  name: 'Hello Chengjs Utils',
  fn: () => [],
  list: [() => [], 'test'],
  num: 2,
  big: BigInt(2),
  sym: sym,
  undef: undefined
}
data.self = data
const cloned = deepClone(data)

console.log(cloned === data) // false
console.log(cloned.self === cloned) // true
console.log('fn' in cloned) // false
console.log(cloned[0]) // undefined
console.log(cloned[1]) // 'test'
console.log(cloned.num) // 2
console.log(cloned.big === BigInt(2)) // true
console.log(cloned.sym === sym) // false
console.log(typeof cloned.sym) // symbol
console.log(cloned.sym.description) // 'chengjs'
console.log('undef' in cloned) // true
```

#### `random(len?: number)` 生成随机字符串

生成指定长度随机数，随机因子为 `大小写英文字母` + `0-9数字`，且首字母不为数字。

默认长度：8

```js
random()
```

#### `new HTTP(config?: CJ.HTTP_OPTION)` 创建原生 fetch 请求封装

TS 定义 [CJ.HTTP_OPTION](https://github.com/tt-ghost/chengjs/blob/master/packages/utils/types/main.d.ts#L18)，具体解释请访问 [MDN FETCH_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0)

```js
// main.js
const http = new HTTP({
  baseURL: '/api',
  headers: { cache: 'no-cache', token: 'xxx' }
})

// api 接口定义，接口前可 [method]: 开头，通过http.create(apis) 统一处理
const apis = {
  getUser: '/user/info',
  updateUser: 'PUT: /user/info',
  sendUser: 'POST: http://test.com/user/add'
  // ...
}

const api = http.create(apis) // 返回 {[key: string]: (data, config) => Promise<Response>}
// 默认发送 GET 请求 /api/user/info
const res = await api.getUser()

// 发送 PUT 请求 /api/user/info
const res = await api.updateUser({ name: 'chengjs' })

// 发送 POST 请求，第二个参数选项的 method 比 url 路径中声明的method优先级高
const res = await api.updateUser({ name: 'chengjs' }, { method: 'POST' })

// 地址中包含域名，会忽略 baseURL，发送 POST 请求到 http://test.com/user/add
const res = await api.sendUser({ name: 'chengjs' })
```

#### `parseURL(url: string)` 解析 URL

- 示例一

```js
parseURL('http://www.test.com:8080/user/info?name=chengjs&tag=1&tag=2#title')

// {
//   protocol: 'http',
//   domain: 'www.test.com',
//   port: '8080',
//   path: '/user/info',
//   params: {
//     name: 'chengjs',
//     tag: [1, 2]
//   },
//   hash: 'title'
// }
```

- 示例二

```js
parseURL('ftp://127.0.0.1/user/info?name=chengjs&tag=1&tag=2#title')

// {
//   protocol: 'ftp',
//   domain: '127.0.0.1',
//   port: '',
//   path: '/user/info',
//   params: {
//     name: 'chengjs',
//     tag: [1, 2]
//   },
//   hash: 'title'
// }
```

#### 类型判断

```typescript
// 从原型判断类型
is(val: unknown, type: string): boolean

// 判断时候为基础类型数据
isBaseType(val: unknown)

// 判断时候为日期类型，注意正负整数、有效日期对象、有效日期字符串都认为日期
isDate(val: unknown)
isDate(new Date()) // true
isDate(1) // true
isDate(Infinity) // false
isDate(-Infinity) // true
isDate('2022-12-31') // true
isDate('2022-12-32') // false
isDate('') // false

// 其他类型判断
isFunction(val: unknown)
isString(val: unknown)
isBoolean(val: unknown)
isNumber(val: unknown)
isNull(val: unknown)
isUndefined(val: unknown)
isSymbol(val: unknown)
isBigInt(val: unknown)
isArray(val: unknown)
isObject(val: unknown)
isPromise(val: unknown)
isRegExp(val: unknown)
isDom(val: unknown)
```
