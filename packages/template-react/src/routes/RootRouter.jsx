import React from 'react';
import "regenerator-runtime/runtime.js";
import { BrowserRouter, Route } from 'react-router-dom'
import Load from './Load'

export default () => {
  return <BrowserRouter>
    <Route exact path='/' component={Load(() => import('../views/App'))} />
    <Route exact path='/user' component={Load(() => import('../views/user/Home'))} />
    <Route exact path='/goods' component={Load(() => import('../views/goods/Home'))} />
    <Route exact path='/goods/detail' component={Load(() => import('../views/goods/Detail'))} />
  </BrowserRouter>
}
