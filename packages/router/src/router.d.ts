export interface Route {
  path?: string,
  name?: string,
  component?: any,
  redirect?: string,
  meta?: object,
  children?: Route[]
}

export interface RouteConf {
  mode?: string,
  routes?: Route[],
  base?: string
}

export interface State {
  key: number,
  url: string
}

export interface OriginLocation {
  hash: string,
  host: string,
  pathname: string,
  port: string,
  protocol: string,
  search: string
}

export interface Location {
  hash: string,
  host: string,
  path: string,
  port: string,
  protocol: string,
  query: object
}