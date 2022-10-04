import Router from '../src'

test('Router测试', () => {
  const genLocal = () => {
    return {
      base: '/',
      mode: 'history',
      route: {
        hash: '',
        host: 'localhost',
        path: '/',
        port: '',
        protocol: 'http:',
        query: {}
      },
      routes: []
    }
  }
  expect(new Router({})).toEqual(genLocal())
  expect(new Router({ base: '/base' })).toEqual({
    ...genLocal(),
    base: '/base'
  })
})
