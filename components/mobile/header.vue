<template>
  <header class="header">
    <form class="search" 
          :class="{ actived: search }" 
          @submit.stop.prevent="toSearch()">
      <input type="text" 
             class="input" 
             required 
             v-model.trim="keyword" 
             :placeholder="$i18n.text.search" 
             @keyup.enter.stop.prevent="toSearch">
      <span class="close" @click.stop.prevent="search = false">
        <i class="iconfont icon-cancel"></i>
      </span>
    </form>
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-header">
          <a href="" class="navbar-menu" @click.stop.prevent="toggleSidebar(!mobileSidebar)">
            <i class="iconfont icon-menu"></i>
          </a>
          <nuxt-link to="/" class="navbar-logo">
            <img src="/images/logo.svg">
          </nuxt-link>
          <a href="" class="navbar-search" @click.stop.prevent="search = !search">
            <i class="iconfont icon-search"></i>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'mobile-header',
    data() {
      return {
        search: false,
        keyword: ''
      }
    },
    computed: {
      mobileSidebar() {
        return this.$store.state.option.mobileSidebar
      }
    },
    watch: {
      '$route'(newVel, oldVel) {
        this.search = false
        this.toggleSidebar(false)
      }
    },
    methods: {
      toSearch() {
        this.$router.push({ name: 'search-keyword', params: { keyword: this.keyword }})
      },
      toggleSidebar(open) {
        this.$store.commit('option/SET_MOBILE_SIDEBAR', open)
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $navbar-height;
    background-color: $module-bg-opacity-9;
    z-index: 999;

    .search {
      position: absolute;
      display: flex;
      width: 100%;
      height: $navbar-height;
      top: 0;
      left: 0;
      z-index: 9999;
      opacity: 0;
      background-color: $white;
      transform: translateY(-100%);

      > .input {
        width: 80%;
        padding: 1em;
        height: $navbar-height;
      }

      > .close {
        width: 20%;
        text-align: center;
        height: $navbar-height;
        line-height: $navbar-height;
      }

      &.actived {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    .navbar {

      .navbar-container {
        height: $navbar-height;

        .navbar-header {
          height: $navbar-height;
          display: flex;
          position: relative;
          align-items: center;
          width: 100%;
          justify-content: space-between;

          .navbar-menu,
          .navbar-search {
            border: none;
            display: inline-block;
            height: $navbar-height;
            width: 20%;
            line-height: $navbar-height;
            text-align: center;
          }

          .navbar-logo {
            width: 30%;
          }
        }
      }
    }
  }
</style>
