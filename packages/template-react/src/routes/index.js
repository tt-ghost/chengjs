
export default {
  path: '/',
  component: () => import('../layouts/Default'),
  childRoutes: [
    { path: 'user', component: import('../views/user/Home') },
    { path: 'goods', component: import('../views/goods/Home') },
  ]
}
