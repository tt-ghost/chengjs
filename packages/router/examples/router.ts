import Router from '../src'
import home from './views/home/index'
import user from './views/user/index'

const config = {
  base: '/examples',
  mode: 'history',
  component: 'examples home',
  routes: [{
    path: '/home',
    name: 'home',
    component: home,
    children: []
  }, {
    path: '/user/:userID',
    name: 'user',
    component: user,
    redirect: '/setting'
  }, {
    path: '/setting',
    component: () => import('./views/setting')
  }]
}
const router = new Router(config)
console.log(router)
export default router
