
import { createSSRApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import router from './router'
import store from './store'
import App from './app.vue'

// '~/plugins/composition-api',
// { src: '~/plugins/loaded-task' },
// { src: '~/plugins/extend' },
// { src: '~/plugins/marked' },
// { src: '~/plugins/highlight' },

import 'highlight.js/styles/ocean.css'
import 'swiper/css/swiper.css'
import '@/assets/styles/app.scss'

export const createVueApp = () => {
  const router = createRouter({
    routes,
    history: createWebHistory(),
    async scrollBehavior(to, from, savedPosition) {
      await scrollWaiter.wait()
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  const app = createSSRApp(App)
  app.provide('state', globalState)
  app.use(router)
  app.use(helmet)
  app.use(store)
  app.use(router)

  return { app, router }
}



