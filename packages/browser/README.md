## @chengjs/browser

浏览器检查工具

### 使用

- 安装

```bash
npm i @chengjs/browser
```

- 使用

```js
import { userAgentParser } from '@chengjs/browser'

const cloned = userAgentParser()
```

`<script>` 方式引入，可通过 `window.userAgentParser` 访问

