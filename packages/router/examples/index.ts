import router from './router/index'

const root: Element = document.getElementById('root')

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

function get (id: string) {
  return document.getElementById(id)
}
const push: Element = get('push')
const go: Element = get('go')
const log: Element = get('log')
push.addEventListener('click', (e: { target: Element }): void => {
  router.push(e.target.innerText.split(':')[1], onComplete)
})

function onComplete(route) {
  loadPage(route.component)
}
// console.log(router.route)