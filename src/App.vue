<template>
  <div id="app">
    <background></background>
    <header-view></header-view>
    <main id="main">
      <nav-view></nav-view>
      <div class="article-content" :class="{ 'pullpage': pageCols == 2 }">
        <transition name="slide-up">
          <keep-alive>
            <router-view class="router-view"></router-view>
          </keep-alive>
        </transition>
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
  import { Background, Header, Footer, Aside, Tool, Nav } from 'components/layout'
  export default {
    name: 'app',
    components: {
      Background,
      headerView: Header,
      footerView: Footer,
      asideView: Aside,
      toolView: Tool,
      navView: Nav
    },
    computed: {
      pageCols () {
        return this.$store.state.options.pageCols
      }
    },
    mounted () {
      this.changePageCol()
    },
    watch: {
      '$route'() {
        this.changePageCol()
      }
    },
    methods: {
      changePageCol() {
        const col = this.$route.meta.fullPage ? 2 : 3
        this.$store.commit('SET_PAGE_COL', col)
      }
    }
  }
</script>

<style lang="scss">
  @import './sass/mixins';
  @import './sass/variables';
  main {
    position: relative;

    .article-content {
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
