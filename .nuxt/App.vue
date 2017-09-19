<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="nuxt.err ? 'nuxt' : layout"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '/Users/surmon/Projects/Node.js/surmon.me/node_modules/_swiper@3.4.2@swiper/dist/css/swiper.css'

import '/Users/surmon/Projects/Node.js/surmon.me/node_modules/_highlight.js@9.12.0@highlight.js/styles/ocean.css'

import '../assets/sass/app.scss'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"Surmon.me - Talk is cheap. Show me the code","titleTemplate":"%s | Surmon.me","htmlAttrs":{"xmlns":"http://www.w3.org/1999/xhtml","lang":"zh"},"meta":[{"charset":"utf-8"},{"http-equiv":"cleartype","content":"on"},{"name":"author","content":"surmon@foxmail.com"},{"name":"MobileOptimized","content":"320"},{"name":"HandheldFriendly","content":"True"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, user-scalable=no"},{"hid":"keywords","name":"keywords","content":"surmon,马赐崇,司马萌,Vue教程,前端技术开发,javascript技术"},{"hid":"description","name":"description","content":"凡心所向 素履所往 生如逆旅 一苇以航"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"author","type":"text/plain","href":"/humans.txt"}],"script":[],"noscript":[{"innerHTML":"This website requires JavaScript."}],"style":[]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options._nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}
</script>

