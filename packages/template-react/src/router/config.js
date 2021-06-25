
export default {
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('../views/App'),
  }, {
    path: '/user',
    component: () => import('../views/user/Home'),
  }, {
    path: '/auth/login',
    component: () => import('../views/auth/Login'),
  }, {
    path: '/goods',
    component: () => import('../views/goods/Home'),
    children: [{
      path: '/'
    }]
  }]
}
