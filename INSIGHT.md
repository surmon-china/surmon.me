
### SSR state context serialize

fork from: https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src/serialize.js
document: https://github.com/yahoo/serialize-javascript


### PreFetch

```js
const { createSSRApp, defineComponent } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const asyncChildren = defineComponent({
  name: 'asyncChildren',
  async setup() {
    // some async error...
    // e.g. axios.fetch...
    // throw new Error('async child error!')
    return Promise.reject('async child error!')
  },
  template: `<div class="async-children">{{ test.abc }}</div>`
})

const app = createSSRApp({
  name: 'App',
  components: {
    asyncChildren
  },
  template:
  `
    <div class="app">
      <suspense>
        <async-children />
      </suspense>
    </div>
  `,
  errorCaptured(error) {
    console.log('-----errorCaptured', error)
  }
})

app.config.errorHandler = (error) => {
  console.log('-----errorHandler', error)
}

renderToString(app).then(res => {
  console.log('----renderToString', res)
}).catch(error => {
  console.log('----renderToString error', error)
})

```

- [Issue](https://github.com/vuejs/vue-next/issues/2736)

`serverPrefetch` 和 `async setup` 都不能被用作 “抛错即处理” 的预期目的，因为 `renderToString` 的实现中忽略了 `Promise.reject` 返回的结果状态，可参见[此处源码](https://github.com/vuejs/vue-next/blob/master/packages/server-renderer/src/render.ts#L96)，所以只能在 SSR 层面自行实现 `validate` & `preFetch`。

validate 与路由参数耦合，故可以在路由层面进行验证，配置在路由（meta） & 消费在路由（中间件）。
preFetch 由 自定义 hook（客户端）& （手动 get route component）服务端 分别调用。

### Vite
