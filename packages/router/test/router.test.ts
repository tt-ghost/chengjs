import Router from '../src/index'

describe('Router测试', () => {
  test('new Router()', () => {
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
        routes: [],
      }
    }
    expect(new Router({})).toEqual(genLocal())
    expect(new Router({base: '/base'})).toEqual({...genLocal(), base: '/base'})
  })
})