import { deepClone } from '../src/main'

describe('helper 模块测试', () => {
  test('deepClone', () => {
    const data = {
      name: 'chengjs',
      children: [
        {
          // 函数会被忽略
          get() {
            return this
          },
          children: []
        }
      ],
      // symbol 会复制，保留描述符
      symbol: Symbol('chengjs'),
      // bigint 会复制
      bigint: BigInt(123),
      // undefined 的属性会保留
      unde: undefined,
      self: null
    }
    // 循环引用可保留
    data.self = data
    const cloned = deepClone(data)
    expect(cloned === data).toBe(false)

    // symbol
    expect(cloned.symbol !== data.symbol).toEqual(true)
    expect(cloned.symbol.description).toBe(data.symbol.description)
    // bigint
    expect(cloned.bigint).toBe(BigInt(123))
    // undefined
    expect('unde' in cloned).toBe(true)

    expect(cloned.self === cloned).toBe(true)
    expect(cloned.children).toEqual([{ children: [] }])
  })
})
