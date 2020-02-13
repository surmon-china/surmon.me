<template>
  <aside class="aside" :class="{ open: open }">
    <div class="aside-user">
      <div class="avatar">
        <img :src="gravatar" alt="Surmon" draggable="false">
      </div>
      <div class="profile">
        <h3 class="name">Surmon</h3>
        <p class="slogan" v-text="$i18n.text.slogan"></p>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <nuxt-link to="/" class="item" exact>
          <i class="iconfont icon-home"></i>
          <span v-text="$i18n.nav.home"></span>
        </nuxt-link>
        <nuxt-link to="/category/code" class="item">
          <i class="iconfont icon-code"></i>
          <span v-text="$i18n.nav.code"></span>
        </nuxt-link>
        <nuxt-link to="/category/think" class="item">
          <i class="iconfont icon-thinking"></i>
          <span v-text="$i18n.nav.think"></span>
        </nuxt-link>
        <a
          target="_blank"
          class="item"
          rel="external nofollow noopener"
          :href="appConfig.links.project"
        >
          <i class="iconfont icon-experiment"></i>
          <span v-text="$i18n.nav.project"></span>
        </a>
        <nuxt-link to="/sitemap" class="item">
          <i class="iconfont icon-book"></i>
          <span v-text="$i18n.nav.map"></span>
        </nuxt-link>
        <nuxt-link to="/vlog" class="item">
          <i class="iconfont icon-vlog"></i>
          <span v-text="$i18n.nav.vlog"></span>
        </nuxt-link>
        <nuxt-link to="/about" class="item">
          <i class="iconfont icon-user"></i>
          <span v-text="$i18n.nav.about"></span>
        </nuxt-link>
        <nuxt-link to="/service" class="item">
          <i class="iconfont icon-tool"></i>
          <span v-text="$i18n.nav.service"></span>
        </nuxt-link>
        <nuxt-link to="/guestbook" class="item guestbook">
          <i class="iconfont icon-comment"></i>
          <span v-text="$i18n.nav.guestbook"></span>
        </nuxt-link>
        <nuxt-link to="/app" class="item app">
          <i class="iconfont icon-app"></i>
          <span v-text="$i18n.nav.app"></span>
        </nuxt-link>
      </nav>
    </div>
  </aside>
</template>

<script>
  import Vue from 'vue'
  import appConfig from '~/config/app.config'
  import { getFileCDNUrl } from '~/transformers/url'

  export default Vue.extend({
    name: 'MobileAside',
    props: {
      open: {
        type: Boolean,
        defualt: false
      }
    },
    mounted() {
      return this.$store.dispatch('global/fetchAdminInfo')
    },
    computed: {
      appConfig: () => appConfig,
      gravatar() {
        return this.$store.state.global.adminInfo.gravatar || getFileCDNUrl('/images/gravatar.jpg')
      }
    }
  })
</script>

<style lang="scss" scoped>
  aside {
    display: block;
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    transform: scale(0.8, 0.8);
    transition: $mobile-aisde-transition;

    &.open {
      opacity: 1;
      transform: scale(1, 1);
    }

    > .aside-user {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: $gap;
      border-bottom: 1px solid darken($mobile-aside-bg, 5%);

      > .avatar {
        width: 35%;

        > img {
          max-width: 100%;
          border: 2px solid $module-bg;
        }
      }

      > .profile {
        color: $body-bg;
        width: 100%;

        > .name {
          font-weight: bold;
          margin-bottom: $gap;
        }

        > .slogan {
          margin: 0;
          color: $primary;
          @include text-overflow();
        }
      }
    }

    > .aside-nav {
      width: 100%;

      .nav-list {
        padding: 0;
        margin: 0;

        .item {
          display: block;
          width: 100%;
          height: 3em;
          line-height: 3em;
          padding: 0 1em;
          margin-bottom: .5em;
          border: none;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          color: $module-bg;

          &.app {
            margin-top: $gap;
            color: $primary;
          }

          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            color: $primary;
            background-color: $body-bg;
          }

          &.link-active {
            color: $primary;
            font-weight: bold;
            background-color: $body-bg;
          }

          .iconfont {
            width: 1em;
            margin-right: 1em;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
