### SSR state context

**Data flow:**

state data > serialize > script > client window > state

**Libs**

- serialize: https://github.com/yahoo/serialize-javascript
- meta: https://github.com/yahoo/serialize-javascript

### universalRef

**Data flow:**

global context object > app instance > state data > client...

### universalFetch

1. async setup func > App
2. onServerPrefetch > App

**Links:**

- [Issue](https://github.com/vuejs/vue-next/issues/2736)
- [PR](https://github.com/vuejs/vue-next/pull/2881)
- [server-renderer](https://github.com/vuejs/vue-next/blob/master/packages/server-renderer/src/render.ts#L96)

### Error

1. Node.js runtime error

node runtime error > renderErrorByApp

2. SSR/App render error

app render error > renderErrorByApp

3. router validate/404 error

router.push > router.beforeEach > route.validate > validate error | 404 error > router.guard > vue.errorHandler > catch error

### Bundle

**SPA mode**

```
vite

vite build
```

**SSR mode**

1. bundle BFF entry (by `libundler`)

2. bundle client (by vite)

rename `index.html` to `template.html`

3. bundle server (by vite SSR mode)

output one file
