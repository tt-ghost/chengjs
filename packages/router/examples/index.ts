import router from './router'
// import { Route } from '../src/router.d'

function get (id: string): HTMLElement {
  return document.getElementById(id)
}
const root = get('root')

function loadPage(component: any, props?: object) {
  console.log(1212, component, props)
  if (component instanceof Promise) {
    component.then(res => {
      return loadPage(component, props)
    })
  } else if (typeof component === 'function') {
    root.innerHTML = component(props)
  } else {
    root.innerHTML = component
  }
}


const push = get('push')
// const go = get('go') as HTMLElement
// const log = get('log') as HTMLElement
push.addEventListener('click', (e): void => {
  const target = e.target  as HTMLElement
  router.push(target.innerText.split(':')[1], onComplete)
})

function onComplete(route: Route): void {
  if (!route) return
  loadPage(route.component)
}
// console.log(router.route)