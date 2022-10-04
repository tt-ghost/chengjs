import { parseURL } from '../src/main'

describe('parser 模块测试', () => {
  test('parseURL', () => {
    // parseURL
    const url1 =
      'http://www.test.com:8080/user/info?name=chengjs&tag=1&tag=2#title'
    const result1 = {
      protocol: 'http',
      domain: 'www.test.com',
      port: '8080',
      path: '/user/info',
      params: {
        name: 'chengjs',
        tag: [1, 2]
      },
      hash: 'title'
    }
    expect(parseURL(url1)).toEqual(result1)

    const url2 = 'ftp://127.0.0.1/user/info?name=chengjs&tag=1&tag=2#title'
    const result2 = {
      protocol: 'ftp',
      domain: '127.0.0.1',
      port: '',
      path: '/user/info',
      params: {
        name: 'chengjs',
        tag: [1, 2]
      },
      hash: 'title'
    }
    expect(parseURL(url2)).toEqual(result2)
  })
})
