<template>
  <body>
    <background></background>
    <header-view></header-view>
    <main id="main">
      <nav-view></nav-view>
      <div class="article-content">
        <router-view  class="router-view"
                      keep-alive
                      transition
                      transition-mode="out-in">
        </router-view>
      </div>
      <aside-view></aside-view>
    </main>
    <footer-view></footer-view>
  </body>
</template>

<script>
  import { Background, Header, Footer, Aside, Nav } from './components/layout'
  export default {
    name: 'app',
    components: {
      Background,
      headerView: Header,
      footerView: Footer,
      asideView: Aside,
      navView: Nav,

    }
  }
</script>

<style lang="scss">
  main {
    position: relative;

    .article-content {
      width: 42.5em;
      min-height: 400px;
      margin: 0 20em 0 12.5em;
      position: relative;
    }
  }
</style>
