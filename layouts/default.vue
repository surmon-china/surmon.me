<template>
  <div id="app">
    <background></background>
    <header-view></header-view>
    <main id="main">
      <nav-view></nav-view>
      <div class="main-content" :class="{ 'pullpage': pageCols == 2 }">
        <nuxt></nuxt>
      </div>
      <transition name="slide-right">
        <keep-alive>
          <aside-view v-if="pageCols == 3"></aside-view>
        </keep-alive>
      </transition>
    </main>
    <footer-view></footer-view>
    <tool-view></tool-view>
  </div>
</template>

<script>
  import { Background, Header, Footer, Aside, Tool, Nav } from '~components/layout'
  export default {
    name: 'app',
    components: {
      Background,
      HeaderView: Header,
      FooterView: Footer,
      AsideView: Aside,
      ToolView: Tool,
      NavView: Nav
    },
    computed: {
      pageCols () {
        return this.$store.state.option.pageCols
      },
      severOptions() {
        return this.$store.state.option.severOptions
      }
    },
    mounted () {
      // this.changePageCol()
      this.$router.afterEach((route) => {
        // const fullPages = []
        console.log('当前route', route)
        // this.changePageCol()
      })
    },
    methods: {
      changePageCol() {
        const col = this.$route.meta.fullPage ? 2 : 3
        // if (['about', ]) {}
        if (this.pageCols !== col) this.$store.commit('option/SET_PAGE_COL', col)
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  main {
    position: relative;

    .main-content {
      float: left;
      width: 42.5em;
      margin: 0 0 0 12.5em;
      position: relative;
      overflow: hidden;
      @include css3-prefix(transition, width .5s);

      &.pullpage {
        @include css3-prefix(transition, width .5s);
        width: 62.5em;
      }
    }
  }
</style>