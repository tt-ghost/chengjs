import { OriginLocation, Location, Route } from './router.d'

export function join (base: string, path: string) {
  const clean = s => s.trim().replace(/^\./g, '').replace(/^\//g, '').replace(/\/$/g, '')
  base = clean(base)
  path = clean(path)
  return base + '/' + path
}

export function resolve(loca: OriginLocation = location): Location {
  const { hash, host, pathname, port, protocol, search } = loca
  const query = resolveSearch(search)

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

export function resolveLocation (local: OriginLocation = location): Location {
  return resolve(local)
}

export function match(routes: Route[], base: string = '', local?: OriginLocation): Route {
  const loca: Location = resolveLocation(local)

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