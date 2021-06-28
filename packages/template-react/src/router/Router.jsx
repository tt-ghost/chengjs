import React from 'react';
import "regenerator-runtime/runtime.js";
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
import config from './config'

/**
 * 替换path前置后置空格及斜线
 * @param {string} s path地址
 * @returns 返回前置及后置斜线和空格的字符串
 */
function replaceSlash (s) {
  return s.replace(/^[\/\s]*/g, '').replace(/[\/\s]*$/g, '')
}

/**
 * 拍平路由表
 * @param {array} routes 路由表
 * @param {string} base 路由base地址
 * @returns 返回拍平后的路由表，对children字段拍平
 */
function flattenRoutes(routes, base = '') {

  let newRoutes = []
  
  routes.forEach(route => {
    
    let { children, path, ...newRoute } = route
    base = replaceSlash(base)
    path = replaceSlash(path)
    base = base ? '/' + base : base
    path = path ? '/' + path : path
    newRoute.path = (base + path) || '/'

    newRoutes.push(newRoute)

    if (children && children.length) {
      newRoutes = newRoutes.concat(flattenRoutes(children, newRoute.path))
    }
  })
  return newRoutes
}

/**
 * 包裹同步组件为异步
 * @param {promise} com import的异步组件
 * @returns 返回异步组件wrapper
 */
function loadComponent(com) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await com();

      this.setState({
        component: component
      });
    }

    componentWillUnmount() {
      this.setState({
        component: null
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
}

/**
 * 根路由组件
 */
function WrapperRouter(props = {}) {
  const { mode = 'history', base = '', routes = [] } = config
  const Router = mode === 'history' ? BrowserRouter : HashRouter
  const newRoutes = flattenRoutes(routes, base)
  const { getUser } = props

  return <Router base={base} { ...props }>

    {newRoutes.map(route => {
      const { path, exact = true, component, ...props } = route

      return component ? <Route
        key={path}
        exact={exact}
        path={path}
        component={loadComponent(component)}
        {...props}
      /> : null
    })}

  </Router>
}

export default WrapperRouter
