<template>
  <div id="app">
    <background></background>
    <header-view></header-view>
    <main id="main">
      <nav-view></nav-view>
      <div class="main-content" :class="{ 'full-column': fullColumn }">
        <keep-alive>
          <nuxt></nuxt>
        </keep-alive>
      </div>
      <transition name="aside">
        <keep-alive>
          <aside-view v-if="!fullColumn"></aside-view>
        </keep-alive>
      </transition>
    </main>
    <tool-view></tool-view>
    <!-- <share-view></share-view> -->
    <footer-view></footer-view>
  </div>
</template>

<script>
  // import Share from '~components/layout/share'
  import { Background, Header, Footer, Aside, Tool, Nav } from '~components/layout'
  // console.log(Share)
  export default {
    name: 'app',
    components: {
      Background,
      HeaderView: Header,
      FooterView: Footer,
      AsideView: Aside,
      // ShareView: Share,
      ToolView: Tool,
      NavView: Nav
    },
    computed: {
      fullColumn () {
        return this.$store.state.option.fullColumn
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
      @include css3-prefix(transition, width .35s);

      &.full-column {
        width: 62.5em;
        @include css3-prefix(transition, width .35s);
      }
    }
  }
</style>