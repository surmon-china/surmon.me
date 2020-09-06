<template>
  <aside class="aside" :class="{ open: open }">
    <div class="aside-user">
      <div class="avatar">
        <img :src="gravatar" alt="Surmon" draggable="false">
      </div>
      <div class="profile">
        <h3 class="name">Surmon</h3>
        <p class="slogan" v-i18n="LANGUAGE_KEYS.APP_SLOGAN"></p>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <router-link to="/" class="item" exact>
          <i class="iconfont icon-home"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_HOME"></span>
        </router-link>
        <router-link to="/category/code" class="item">
          <i class="iconfont icon-code"></i>
          <span v-i18n="LANGUAGE_KEYS.CATEGORY_CODE"></span>
        </router-link>
        <router-link to="/category/think" class="item">
          <i class="iconfont icon-thinking"></i>
          <span v-i18n="LANGUAGE_KEYS.CATEGORY_THINK"></span>
        </router-link>
        <a
          target="_blank"
          class="item"
          rel="external nofollow noopener"
          :href="APP_CONFIG.LINKS.project"
        >
          <i class="iconfont icon-experiment"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_PROJECT"></span>
        </a>
        <router-link to="/archive" class="item">
          <i class="iconfont icon-book"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_ARCHIVE"></span>
        </router-link>
        <router-link to="/vlog" class="item">
          <i class="iconfont icon-vlog"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_LENS"></span>
        </router-link>
        <router-link to="/about" class="item">
          <i class="iconfont icon-user"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_ABOUT"></span>
        </router-link>
        <router-link to="/service" class="item">
          <i class="iconfont icon-tool"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_SERVICE"></span>
        </router-link>
        <router-link to="/guestbook" class="item guestbook">
          <i class="iconfont icon-comment"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_GUESTBOOK"></span>
        </router-link>
        <router-link to="/app" class="item app">
          <i class="iconfont icon-app"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_APP"></span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
  import * as APP_CONFIG from '/@/config/app.config'
  import { defineComponent, computed } from 'vue'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useStore } from '/@/store'

  export default defineComponent({
    name: 'MobileAside',
    props: {
      open: {
        type: Boolean,
        defualt: false
      }
    },
    setup() {
      const store = useStore()
      const gravatar = computed(() => (
        store.state.option.adminInfo?.gravatar ||
        getFileCDNUrl('/images/gravatar.jpg')
      ))

      return {
        APP_CONFIG,
        LANGUAGE_KEYS,
        gravatar
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  aside {
    display: block;
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    transform: scale(0.8, 0.8);
    transition: $mobile-aside-transition;

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
