interface Route {
  path?: string,
  name?: string,
  component?: any,
  redirect?: string,
  meta?: object,
  children?: Route[]
}

interface RouteConf {
  mode?: string,
  routes?: Route[],
  base?: string
}

interface State {
  key: number,
  url: string
}

interface OriginLocation {
  hash: string,
  host: string,
  pathname: string,
  port: string,
  protocol: string,
  search: string
}

interface RouterLocation {
  hash: string,
  host: string,
  path: string,
  port: string,
  protocol: string,
  query: object
}