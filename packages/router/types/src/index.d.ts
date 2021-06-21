import { Route, RouteConf } from './router.d';
export default class Router {
    mode: string;
    routes: Array<Route>;
    base: string;
    route: Route;
    constructor(config: RouteConf);
    push(url: string, onComplete: () => void): void;
    replace(url: string, onComplete: () => void): void;
    go(step: number): void;
    beforeEach(cb: (to: Route, from: Route, next: () => void) => void): void;
    listener(e: {
        state: {
            url: string;
            onComplete?: (route: Route) => void;
        };
    }): void;
}
