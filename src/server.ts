import Koa from 'koa'
import path from 'path'
import { createSSRApp } from 'vue'
import renderer from '@vue/server-renderer';
import { VueEnv } from '/@/vuniversal/env'
import { createVueApp } from './main'

const app = new Koa()
const vueApp = createVueApp({ target: VueEnv.Server })
console.log('----vueApp', vueApp)

// app.use('/_assets', express.static(path.join(__dirname, '../client/_assets')));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
