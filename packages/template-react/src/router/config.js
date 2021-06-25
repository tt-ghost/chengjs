
export default {
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('../views/App'),
  }, {
    path: '/user',
    component: () => import('../views/user/Home'),
  }, {
    path: '/goods',
    component: () => import('../views/goods/Home'),
    children: [{
      path: '/'
    }]
  }]
}
