<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>
import NuxtLoading from './components/nuxt-loading.vue'

let layouts = {

  "_default": process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/layouts/default.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/layouts/default.vue')

}

export default {
  head: {"title":"Surmon.me - Talk is cheap. Show me the code","titleTemplate":"%s | Surmon.me","__dangerouslyDisableSanitizers":["script"],"meta":[{"charset":"utf-8"},{"name":"author","content":"surmon@foxmail.com"},{"name":"viewport","content":"initial-scale=1, maximum-scale=1, user-scalable=no"},{"hid":"keywords","name":"keywords","content":"surmon, 司马萌, 前端技术开发, javascript"},{"hid":"description","name":"description","content":"凡心所向 素履所往 生如逆旅 一苇以航"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"author","type":"text/plain","href":"/humans.txt"}],"script":[{"innerHTML":"window.duoshuoQuery = { short_name: 'surmon' }","type":"text/javascript"},{"src":"https://static.duoshuo.com/embed.js"}],"noscript":[{"innerHTML":"This website requires JavaScript."}]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  
  mounted () {
    this.$loading = this.$refs.loading
    this.$nuxt.$loading = this.$loading
  },
  
  methods: {
    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      if (typeof layouts[_layout] === 'function') {
        return this.loadLayout(_layout)
      }
      this.layout = layouts[_layout]
      return Promise.resolve(this.layout)
    },
    loadLayout (_layout) {
      return layouts[_layout]()
      .then((Component) => {
        layouts[_layout] = Component
        this.layout = layouts[_layout]
        return this.layout
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
        console.error(e)
      })
    }
  },
  components: {
    NuxtLoading
  }
}
</script>


<style src="swiper/dist/css/swiper.css" lang="css"></style>

<style src="highlight.js/styles/agate.css" lang="css"></style>

<style src="~assets/sass/app.scss" lang="sass"></style>

