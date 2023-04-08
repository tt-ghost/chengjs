## @chengjs/style

css lib

### 使用

- 安装

```bash
npm i @chengjs/style -S
```

- 使用

```js
// import css
import '@chengjs/style/reset.css'
import '@chengjs/style/layout.css'
```

```html
<html>
  <head>
    <link href="./layout.css" rel="stylesheet" />
    <style>
      .cj-layout-item{
        background-color:#ccc;
      }
      :root{
        /* 自定义间距及一行多个元素块 */
        --cj-layout-margin: 1%;
        --cj-layout-count: 6;
      }
    </style>
  </head>
<body>
<div class="cj-layout">
      <div class="cj-layout-item">1</div>
      <div class="cj-layout-item">2</div>
      <div class="cj-layout-item">3</div>
      <div class="cj-layout-item">4</div>
    </div>
</body>
</html>
```

