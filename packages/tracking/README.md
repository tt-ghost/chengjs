## @chengjs/tracking

js 可视化埋点库

### 使用

- 安装

```bash
npm i @chengjs/tracking -S
```

- 使用

```js
import Tracking from '@chengjs/tracking'

new Tracking()
```

`<script>` 方式引入，可通过 `window.Tracking` 访问

### 介绍

#### 编辑埋点

创建样式
基础禁用事件样式 + 选择状态样式 + 添加了事件的埋点

所有元素添加监听事件

引入 sdk => 访问页面 => 进入设计模式，初始化环境（阻止所有点击等，创造悬浮窗口） => 选择埋点类型 =>

1、请求埋点 => api 拦截 (fetch + XMLHttpRequest)
2、Dom 事件埋点 =>

标记（生成唯一 id）=>

#### 上报埋点

引入 sdk => 访问页面 => 获取埋点数据 => 添加监听事件 + 拦截器 => 组织上报数据 => 上报
