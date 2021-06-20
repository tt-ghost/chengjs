import copy from '../src/main'

describe('copy test', () => {
  test('复制文字到剪切板，返回Promise', () => {
    Object.defineProperty(document, 'execCommand', { value: jest.fn() })
    expect(copy('copied')).rejects.toBe('copy failed!')
  })
});
