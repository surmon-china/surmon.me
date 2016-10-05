<template>
  <div id="app">
    <header-view></header-view>
      <div id="main" class="container">
        <div class="row">
          <nav-view></nav-view>
          <article class="article-content">
            <router-view  class="router-view"
                          keep-alive
                          transition
                          transition-mode="out-in">
            </router-view>
          </article>
          <aside-view></aside-view>
        </div>
      </div>
    <footer-view></footer-view>
  </div>
</template>

<script>

import { Header, Footer, Aside, Nav } from './components/layout'

export default {
  name: 'app',
  components: {
    headerView: Header,
    footerView: Footer,
    asideView: Aside,
    navView: Nav
  }
}
</script>

<style lang="scss">
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 5em;
  }

  #main {
    width: 1140px;
    position: relative;

    .article-content {
      // width: 40em;
      min-height: 400px;
      margin: 0 20em 0 11em;
      position: relative;
    }
  }
</style>
