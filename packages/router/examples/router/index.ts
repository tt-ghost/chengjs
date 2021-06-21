import Router from '../../src/index'
import home from '../component/home/index'
import user from '../component/user/index'

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
    component: () => import('../component/setting')
  }]
}
const router = new Router(config)
console.log(router)
export default router
