/**
 * name: @chengjs/router
 * version: v0.1.0
 * author: Chengzi <ttghost@126.com>
 */

function resolve(loca = location) {
    const { hash, host, pathname, port, protocol, search } = loca;
    const query = resolveSearch(search);
    return {
        hash,
        host,
        path: pathname,
        port,
        protocol,
        query
    };
}
function resolveLocation(local = location) {
    return resolve(local);
}
function match(routes, base = '', local) {
    const loca = resolve(local);
    return routes.find(route => base + route.path === loca.path);
}
function resolveSearch(search) {
    if (search.length < 2)
        return {};
    search = search.slice(1);
    const map = new Map();
    const result = {};
    search.split('&').forEach(q => {
        const tmp = q.split('=');
        if (map.has(tmp[0])) {
            map.get(tmp[0]).push(tmp[1]);
        }
        else {
            map.set(tmp[0], [tmp[1]]);
        }
    });
    for (const v of map) {
        if (v[1].length > 1) {
            result[v[0]] = v[1];
        }
        else {
            result[v[0]] = v[1][0];
        }
    }
    return result;
}

class Router {
    constructor(config) {
        this.mode = config.mode || 'history';
        this.routes = config.routes || [];
        this.base = config.base || '';
        this.route = resolveLocation();
        window.addEventListener('popstate', this.listener.bind(this));
    }
    push(url, onComplete) {
        const state = {
            key: Date.now(),
            url
        };
        window.history.pushState(state, null, url);
        dispatchEvent(new PopStateEvent('popstate', { state: { ...state, onComplete } }));
    }
    replace(url, onComplete) {
        const state = {
            key: Date.now(),
            url
        };
        window.history.replaceState(state, null, url);
        dispatchEvent(new PopStateEvent('popstate', { state: { ...state, onComplete } }));
    }
    go(step) {
        window.history.go(step);
    }
    beforeEach(cb) {
    }
    listener(e) {
        const { url, onComplete } = e.state;
        const { base } = this;
        const matched = match(this.routes, base);
        if (typeof onComplete === 'function') {
            onComplete(matched);
        }
    }
}

export { Router as default };
