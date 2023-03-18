# @chengjs/luban

微前端框架

## 1 安装

```bash
npm i @chengjs/luban -S
```

## 2 主应用使用

### 2.1 主应用为 `Vue`

#### 2.1.1 主应用入口 `main.js`

```js
// 主应用 main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Luban from '@chengjs/luban'

// create router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/user/*',
      component: () => import('./user.vue')
    }
  ]
})

// create app
Vue.createApp().use(router).use(Luban, {}).mount('#root')
```

#### 2.1.2 主应用子应用入口 `user.vue`

```html
<template>
  <Luban name="userModule" />
</template>
<script></script>
```

### 2.2 主应用为 `React`

#### 2.2.1 主应用入口 `main.jsx`

```jsx
// 主应用 main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Luban from '@chengjs/luban'
import User from './user.jsx'

// router
const router = createBrowserRouter([
  {
    path: '/user',
    element: <User />
  }
])

// render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
```

#### 2.2.2 主应用子应用入口 `user.jsx`

```jsx
export default () => <Luban name="userModule" />
```

## 3 子应用使用

### 3.1 `Vue` 项目

```js
// 子应用 luban.conf.js
import { useCreate, useMount, useUpdate, useDestory } from '@chengjs/luban'
import router from './router'

export default {
  name: 'userModule',
  mode: 'development',
  main: ctx => {
    // name
    let app = null
    // main app created
    useCreate(ctx => {})
    // dom ready
    useMount((ctx, el) => {
      ctx.on('auth-logout', () => {
        console.log('logout in user module')
      })
      app = ctx.Vue.createApp({}).use(router).mount(el)
    })
    useUpdate(ctx => {})
    useDestory(() => {
      app.unmount()
      app = null
    })
  }
}
```

## 4 通信
