<template>
  <aside class="aside">
    <div class="aside-user">
      <div class="avatar">
        <uimage :src="avatar" :alt="author" />
      </div>
      <div class="profile">
        <h3 class="name">{{ author }}</h3>
        <p class="slogan">
          <i18n :lkey="LANGUAGE_KEYS.APP_SLOGAN" />
        </p>
      </div>
    </div>
    <div class="aside-tool">
      <div class="item" @click="toggleTheme">
        <i class="iconfont" :class="themeIcon"></i>
      </div>
      <div class="item" @click="tooggleLanguage">
        <i class="iconfont" :class="languageIcon"></i>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <router-link to="/" class="item" exact>
          <i class="iconfont icon-home-fill"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_HOME" />
        </router-link>
        <router-link class="item" :to="getCategoryFlowRoute(CategorySlug.Code)">
          <i class="iconfont icon-code"></i>
          <i18n :lkey="LANGUAGE_KEYS.CATEGORY_CODE" />
        </router-link>
        <router-link class="item" :to="getCategoryFlowRoute(CategorySlug.Insight)">
          <i class="iconfont icon-thinking"></i>
          <i18n :lkey="LANGUAGE_KEYS.CATEGORY_INSIGHT" />
        </router-link>
        <ulink class="item" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-github"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_GITHUB" />
          <span class="newscript">
            <i class="iconfont icon-new-window-s"></i>
          </span>
        </ulink>
        <router-link class="item" :to="getPageRoute(RouteName.Archive)">
          <i class="iconfont icon-peachblossom"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_ARCHIVE" />
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.About)">
          <i class="iconfont icon-swordsman"></i>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_ABOUT" />
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
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName, CategorySlug } from '/@/app/router'
  import { useMetaStore } from '/@/store/meta'
  import { useUniversalFetch } from '/@/universal'
  import { Theme } from '/@/services/theme'
  import { Language } from '/@/language/data'
  import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'
  import { getDefaultAvatar } from '/@/transforms/avatar'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { VALUABLE_LINKS, META } from '/@/config/app.config'

  export default defineComponent({
    name: 'MobileAside',
    setup() {
      const { theme, i18n } = useEnhancer()
      const metaStore = useMetaStore()
      const avatar = computed(() => metaStore.adminInfo.data?.avatar || getDefaultAvatar())

      const themeIcon = computed(() => {
        const themeIconMap = {
          [Theme.Default]: 'icon-sun',
          [Theme.Dark]: 'icon-moon'
        }
        return themeIconMap[theme.theme.value]
      })

      const languageIcon = computed(() => {
        const languageIconMap = {
          [Language.Zh]: 'icon-chinese',
          [Language.En]: 'icon-english'
        }
        return languageIconMap[i18n.language.value]
      })

      useUniversalFetch(() => metaStore.fetchAdminInfo())

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        RouteName,
        CategorySlug,
        getPageRoute,
        getCategoryFlowRoute,
        avatar,
        author: META.author,
        themeIcon,
        languageIcon,
        toggleTheme: theme.toggle,
        tooggleLanguage: i18n.toggle
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .aside {
    $border-color: darken($mobile-aside-bg, 5%);
    display: block;
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    color: $white;

    .aside-user {
      $size: 65px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      padding: $gap * 2;
      border-bottom: 1px dotted $border-color;

      .avatar {
        width: $size;
        height: $size;
        flex-shrink: 0;

        img {
          max-width: 100%;
          border: 3px solid rgba($grey, 0.8);
          @include radius-box(100%);
        }
      }

      .profile {
        height: $size;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        margin-left: $lg-gap;

        .name {
          font-weight: bold;
          margin-top: 0;
          margin-bottom: $sm-gap;
        }

        .slogan {
          margin: 0;
          max-width: 10rem;
          color: $surmon;
          @include text-overflow();
        }
      }
    }

    .aside-tool {
      padding: $gap 0;
      display: flex;
      border-bottom: 1px solid $border-color;

      .item {
        width: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size-h2;
      }
    }

    .aside-nav {
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
          font-weight: 700;
          color: $white;

          &.app {
            margin-top: $gap;
            color: $surmon;
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
            font-weight: normal;
          }

          .newscript {
            margin-left: $sm-gap;
            font-size: $font-size-small;
          }
        }
      }
    }
  }
</style>
