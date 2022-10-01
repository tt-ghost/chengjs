// import JSDOM from 'jsdom'
import { copy } from '../src/main'

test('复制文字到剪切板，返回Promise', async () => {
  // Object.defineProperty(document, 'execCommand', { value: jest.fn() })
  await expect(copy('copied')).resolves.toBe('copied')
})
