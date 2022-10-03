# @chengjs/standard 基础规范

## 使用

- 安装

```bash
npm i @chengjs/standard -D
```

- 使用

在 nodejs 环境下运行

```js
import {
  editorConfig,
  eslintIgnore,
  gitIgnore,
  npmrc,
  prettierIgnore
} from '@chengjs/standard'
// 在当前执行目录下添加 .editorconfig 文件
editorConfig()
// eslintIgnore、gitIgnore、npmrc、prettierIgnore 类似
```

`.prettier.js` 文件

```js
// .prettier.js
import { prettier } from '@chengjs/standard'
module.exports = {
  ...prettier
}
```
