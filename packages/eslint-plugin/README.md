# @chengjs/eslint-plugin

> eslint 规范最佳实践，支持 react、vue、vue3、typescript 等

## 使用

- 安装

```shell
npm i @chengjs/eslint-plugin -D
```

- 使用

项目根目录增加 `.eslintrc.js` 文件

```js
// .eslintrc.js
module.export = {
  extends: ['plugin:@chengjs/typescript']
}
```

- 说明

规范支持

```js
// typescript
extends: ['plugin:@chengjs/typescript']
// vue2
extends: ['plugin:@chengjs/vue']
// vue3
extends: ['plugin:@chengjs/vue3']
// react
extends: ['plugin:@chengjs/react']
// react 区别于继承与 plugin:react/all
extends: ['plugin:@chengjs/react-all']
```
