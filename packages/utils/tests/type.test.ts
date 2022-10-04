import { isBaseType, isDate } from '../src/main'

describe('type 模块测试', () => {
  test('isBaseType', () => {
    // isBaseType
    expect(isBaseType(undefined)).toBe(true)
    expect(isBaseType([])).toBe(false)
    // isDate
    expect(isDate(new Date())).toBe(true)
    expect(isDate(123123)).toBe(true)
    expect(isDate('2022-12-12')).toBe(true)

    expect(isDate(new Date(''))).toBe(false)
    expect(isDate(Infinity)).toBe(false)
    expect(isDate(-Infinity)).toBe(false)
  })
})
