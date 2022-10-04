import { join, resolve, match, resolveSearch } from '../src/url'

describe('测试url工具库', () => {
  // join(base, path)
  test('join(base, path) util test', () => {
    expect(join(' /base/', '/subpath')).toEqual('base/subpath')
    expect(join(' ./base ', './subpath')).toEqual('base/subpath')
    expect(join('base', './subpath/')).toEqual('base/subpath')
    expect(join('http://base.com/', './subpath/')).toEqual(
      'http://base.com/subpath'
    )
  })

  // resolve(local)
  test('resolve(local) util test', () => {
    const loca1 = {
      hash: '#school',
      host: '127.0,.0.1',
      pathname: '/user/get',
      port: '8080',
      protocol: 'https:',
      search: '?name=zhang&age=12'
    }
    expect(resolve(loca1)).toEqual({
      hash: '#school',
      host: '127.0,.0.1',
      path: '/user/get',
      port: '8080',
      protocol: 'https:',
      query: {
        name: 'zhang',
        age: '12'
      }
    })

    const loca2 = {
      hash: '#school',
      host: '127.0,.0.1',
      pathname: '/user/get',
      port: '8080',
      protocol: 'https:',
      search: '?name=zhang&age=12&age=13'
    }
    expect(resolve(loca2)).toEqual({
      hash: '#school',
      host: '127.0,.0.1',
      path: '/user/get',
      port: '8080',
      protocol: 'https:',
      query: {
        name: 'zhang',
        age: ['12', '13']
      }
    })
  })

  test('match(routes, base)', () => {
    const route = {
      path: '/name',
      host: '127.0.0.1',
      port: '80',
      protocol: 'https:',
      query: {}
    }

    const local = {
      hash: '',
      host: '127.0.0.1',
      pathname: '/user/name',
      port: '80',
      protocol: 'https:',
      search: ''
    }
    const routes = [route]
    const base = '/user'
    expect(match(routes, base, local)).toEqual(route)
  })

  // resolveSearch(search)
  test('resolveSearch(search)', () => {
    expect(resolveSearch('?name=zhang')).toEqual({ name: 'zhang' })
    expect(resolveSearch('?name=zhang&age=12')).toEqual({
      name: 'zhang',
      age: '12'
    })
    expect(resolveSearch('?name=zhang&age=12&age=13')).toEqual({
      name: 'zhang',
      age: ['12', '13']
    })
  })
})
