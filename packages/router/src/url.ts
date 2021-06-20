import { OriginLocation, Location, Route } from './router.d'

export function join (base: string, url: string) {
  base = base.trim().replace(/^\.|\//g, '')
  url = url.trim().replace(/^\.|\//g, '')
  return base + '/' + url
}

export function resolve(loca: OriginLocation = location): Location {
  const { hash, host, pathname, port, protocol, search } = loca
  let query = resolveSearch(search)

  return {
    hash,
    host,
    path: pathname,
    port,
    protocol,
    // params,
    query
  }
}

export function resolveLocation (): Location {
  return resolve(location)
}

export function match(routes: Route[], base: string = ''): Route {
  const loca: Location = resolveLocation()

  return routes.find(route => (base + route.path) === loca.path)
}

export function resolveSearch (search: string): object {
  if (search.length < 2) return {}
    search = search.slice(1)
    const map: Map<string, string[]> = new Map()
    const result: object = {}

    search.split('&').forEach(q => {
      const tmp = q.split('=')
      if (map.has(tmp[0])) {
        map.get(tmp[0]).push(tmp[1])
      } else {
        map.set(tmp[0], [tmp[1]])
      }
    })
    for(const v of map) {
      if (v[1].length > 1) {
        result[v[0]] = v[1]
      } else {
        result[v[0]] = v[1][0]
      }
    }
    return result
}