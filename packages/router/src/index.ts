import { join, resolveLocation, match } from './url'
// import { Route, RouteConf, State } from '../types/src/router'

export default class Router{
  mode: string
  routes: Route[]
  base: string
  route: Route

  constructor(config: RouteConf) {
    this.mode = config.mode || 'history'
    this.routes = config.routes || []
    this.base = config.base || ''
    this.route = resolveLocation()
    window.addEventListener('popstate', this.listener.bind(this))
  }

  push(url: string, onComplete: (e: any) => void): void {
    const state: State = {
      key: Date.now(),
      url
    }

    window.history.pushState(state, null, url)
    dispatchEvent(
      new PopStateEvent('popstate', { state: { ...state, onComplete } })
    )
  }

  replace(url: string, onComplete: () => void): void {
    const state: State = {
      key: Date.now(),
      url
    }

    window.history.replaceState(state, null, url)
    dispatchEvent(
      new PopStateEvent('popstate', { state: { ...state, onComplete } })
    )
  }

  go(step: number): void {
    window.history.go(step)
  }

  beforeEach(cb: (to: Route, from: Route, next: () => void) => void) {
    // cb(to, from, next)
  }

  listener(e: {
    state: { url: string; onComplete?: (route: Route) => void }
  }): void {
    const { url, onComplete } = e.state
    const { base } = this
    const matched: Route = match(this.routes, base)

    if (typeof onComplete === 'function') {
      onComplete(matched)
    }
  }
}
