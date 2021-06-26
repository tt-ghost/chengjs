
export default {
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('../views/App'),
  }, {
    path: '/user',
    component: () => import('../views/user/Home'),
  }, {
    path: '/passport',
    children: [
      {
        path: '/login',
        component: () => import('../views/passport/Login'),
      }, {
        path: '/register',
        component: () => import('../views/passport/Register'),
      }
    ]
  }, {
    path: '/goods',
    component: () => import('../views/goods/Home'),
    children: [{
      path: '/'
    }]
  }]
}
