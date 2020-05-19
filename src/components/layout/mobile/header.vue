<template>
  <header class="header">
    <form class="search" :class="{ actived: search }" @submit.stop.prevent="toSearch()">
      <input
        ref="input"
        v-model.trim="keyword"
        type="text"
        class="input"
        list="keywords"
        required
        :placeholder="$i18n.text.search"
        @keyup.enter.stop.prevent="toSearch"
      >
      <span class="close" @click.stop.prevent="search = false">
        <i class="iconfont icon-cancel"></i>
      </span>
      <client-only>
        <datalist v-if="tags.length" id="keywords" class="search-keywords">
          <option v-for="tag in tags" :key="tag.slug" class="iiem" :value="tag.name" :label="tag.description" />
        </datalist>
      </client-only>
    </form>
    <transition name="fade">
      <div v-if="search" class="search-mask"></div>
    </transition>
    <nav class="navbar">
      <a href class="navbar-menu" @click.stop.prevent="toggleSidebar(!onMobileSidebar)">
        <i class="iconfont icon-menu"></i>
      </a>
      <nuxt-link to="/" class="navbar-logo">
        <img :src="'/images/logo.svg' | byCDN">
      </nuxt-link>
      <a href class="navbar-search" @click.stop.prevent="openSearch">
        <i class="iconfont icon-search"></i>
      </a>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'MobileHeader',
    data() {
      return {
        search: false,
        keyword: ''
      }
    },
    computed: {
      tags() {
        return this.$store.state.tag.data
      },
      onMobileSidebar() {
        return this.$store.state.global.onMobileSidebar
      }
    },
    watch: {
      '$route'(newVel, oldVel) {
        this.search = false
        this.toggleSidebar(false)
      }
    },
    methods: {
      openSearch() {
        this.search = true
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      },
      toSearch() {
        this.$router.push({ name: 'search-keyword', params: { keyword: this.keyword }})
      },
      toggleSidebar(open) {
        this.$store.commit('global/updateMobileSidebarOnState', open)
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
    height: $mobile-header-height;
    background-color: $module-bg-opacity-9;
    z-index: $z-index-header;

    .search-mask {
      position: fixed;
      z-index: $z-index-normal;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      background-color: $module-hover-bg-darken-10;
    }

    .search {
      position: absolute;
      display: flex;
      z-index: $z-index-normal + 1;
      width: 100%;
      height: $mobile-header-height;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: $text-reversal;
      transform: translateY(-100%);

      > .input {
        width: 80%;
        height: 100%;
        padding: 1em;
      }

      > .close {
        width: 20%;
        height: 100%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      &.actived {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    .navbar {
      width: 100%;
      height: $mobile-header-height;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: space-between;

      .navbar-menu,
      .navbar-search {
        height: 100%;
        width: 20%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      .navbar-logo {
        width: 30%;
      }
    }
  }
</style>
