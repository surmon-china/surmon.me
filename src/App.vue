<template>
  <div id="app">
    <background></background>
    <header-view></header-view>
    <main id="main">
      <nav-view></nav-view>
      <div class="article-content">
        <transition name="slide-up">
          <keep-alive>
            <router-view class="router-view"></router-view>
          </keep-alive>
        </transition>
      </div>
      <aside-view></aside-view>
    </main>
    <footer-view></footer-view>
  </div>
</template>

<script>
  import { Background, Header, Footer, Aside, Nav } from 'components/layout'
  export default {
    name: 'app',
    components: {
      Background,
      headerView: Header,
      footerView: Footer,
      asideView: Aside,
      navView: Nav
    }
  }
</script>

<style lang="scss">
  main {
    position: relative;

    .article-content {
      float: left;
      width: 42.5em;
      margin: 0 0 0 12.5em;
      position: relative;
      overflow: hidden;
    }
  }
</style>
