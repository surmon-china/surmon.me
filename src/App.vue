<template>
  <div id="app">
    <header-view></header-view>
      <div id="main" class="main">
        <div class="container">
          <nav-view></nav-view>
          <article class="article">
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

console.log(Header)

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

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
