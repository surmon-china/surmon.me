<template>
  <aside class="aside" :class="{ open: open }">
    <div class="aside-user">
      <div class="avatar">
        <uimage :src="gravatar" alt="Surmon" />
      </div>
      <div class="profile">
        <h3 class="name">Surmon</h3>
        <p class="slogan">
          <i18n :lkey="LANGUAGE_KEYS.APP_SLOGAN" />
        </p>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <router-link to="/" class="item" exact>
          <i class="iconfont icon-home-fill"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_HOME" />
        </router-link>
        <router-link class="item" :to="getCategoryArchiveRoute(CategorySlug.Code)">
          <i class="iconfont icon-code"></i>
          <i18n :lkey="LANGUAGE_KEYS.CATEGORY_CODE" />
        </router-link>
        <router-link class="item" :to="getCategoryArchiveRoute(CategorySlug.Insight)">
          <i class="iconfont icon-thinking"></i>
          <i18n :lkey="LANGUAGE_KEYS.CATEGORY_INSIGHT" />
        </router-link>
        <ulink class="item" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-github"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_GITHUB" />
        </ulink>
        <router-link class="item" :to="getPageRoute(RouteName.Archive)">
          <i class="iconfont icon-peachblossom"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_ARCHIVE" />
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.Lens)">
          <i class="iconfont icon-lens"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_LENS" />
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.About)">
          <i class="iconfont icon-user"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_ABOUT" />
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.Job)">
          <i class="iconfont icon-horse"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_JOB" />
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.Freelancer)">
          <i class="iconfont icon-tool"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_FREELANCER" />
        </router-link>
        <router-link class="item guestbook" :to="getPageRoute(RouteName.Guestbook)">
          <i class="iconfont icon-comment"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_GUESTBOOK" />
        </router-link>
        <router-link class="item app" :to="getPageRoute(RouteName.App)">
          <i class="iconfont icon-app"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_APP" />
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { RouteName, CategorySlug } from '/@/app/router'
  import { useMetaStore } from '/@/store/meta'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { getPageRoute, getCategoryArchiveRoute } from '/@/transforms/route'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'MobileAside',
    props: {
      open: {
        type: Boolean,
        defualt: false
      }
    },
    setup() {
      const metaStore = useMetaStore()
      const gravatar = computed(
        () => metaStore.adminInfo.data?.gravatar || getFileCDNUrl('/images/gravatar.jpg')
      )

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
  @import 'src/styles/init.scss';

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
          margin-bottom: 0.5em;
          border: none;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          color: $module-bg;

          .iconfont {
            font-weight: normal;
          }

          &.app {
            margin-top: $gap;
            color: $primary;
          }

          &:last-child {
            margin-bottom: 0;
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
