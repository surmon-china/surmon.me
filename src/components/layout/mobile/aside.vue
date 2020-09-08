<template>
  <aside class="aside" :class="{ open: open }">
    <div class="aside-user">
      <div class="avatar">
        <uimage :src="gravatar" alt="Surmon" />
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
        <router-link class="item" :to="getCategoryArchiveRoute(CategorySlug.Code)">
          <i class="iconfont icon-code"></i>
          <span v-i18n="LANGUAGE_KEYS.CATEGORY_CODE"></span>
        </router-link>
        <router-link class="item" :to="getCategoryArchiveRoute(CategorySlug.Insight)">
          <i class="iconfont icon-thinking"></i>
          <span v-i18n="LANGUAGE_KEYS.CATEGORY_INSIGHT"></span>
        </router-link>
        <ulink class="item" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-experiment"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_GITHUB"></span>
        </ulink>
        <router-link class="item" :to="getPageRoute(RouteName.Archive)">
          <i class="iconfont icon-peachblossom"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_ARCHIVE"></span>
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.Lens)">
          <i class="iconfont icon-vlog"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_LENS"></span>
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.About)">
          <i class="iconfont icon-user"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_ABOUT"></span>
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.Service)">
          <i class="iconfont icon-tool"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_SERVICE"></span>
        </router-link>
        <router-link class="item guestbook" :to="getPageRoute(RouteName.Guestbook)">
          <i class="iconfont icon-comment"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_GUESTBOOK"></span>
        </router-link>
        <router-link class="item app" :to="getPageRoute(RouteName.App)">
          <i class="iconfont icon-app"></i>
          <span v-i18n="LANGUAGE_KEYS.PAGE_APP"></span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { defineComponent, computed } from 'vue'
  import { useStore } from '/@/store'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { getPageRoute, getCategoryArchiveRoute } from '/@/transforms/route'
  import { RouteName, CategorySlug } from '/@/router'
  import { LANGUAGE_KEYS } from '/@/language/key'

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
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        RouteName,
        CategorySlug,
        getPageRoute,
        getCategoryArchiveRoute,
        gravatar
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .aside {
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
      padding: $gap * 2;
      padding-bottom: $gap;
      border-bottom: 1px solid darken($mobile-aside-bg, 5%);

      > .avatar {
        width: 35%;

        > img {
          max-width: 100%;
          border: 3px solid $module-bg;
          @include radius-box($sm-radius);
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
