<template>
  <aside class="aside">
    <div class="aside-user">
      <div class="avatar">
        <uimage :src="avatar" :alt="author" />
      </div>
      <div class="profile">
        <h3 class="name">{{ author }}</h3>
        <webfont class="slogan">
          <i18n :k="LanguageKey.APP_SLOGAN" />
        </webfont>
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
        <router-link to="/" class="item">
          <i class="iconfont icon-home-fill"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_HOME" />
          </webfont>
        </router-link>
        <router-link class="item" :to="getCategoryFlowRoute(CategorySlug.Code)">
          <i class="iconfont icon-code"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.CATEGORY_CODE" />
          </webfont>
        </router-link>
        <router-link class="item" :to="getCategoryFlowRoute(CategorySlug.Insight)">
          <i class="iconfont icon-insight"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.CATEGORY_INSIGHT" />
          </webfont>
        </router-link>
        <ulink class="item" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-github"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_GITHUB" />
          </webfont>
          <span class="newscript">
            <i class="iconfont icon-new-window-s"></i>
          </span>
        </ulink>
        <router-link class="item" :to="getPageRoute(RouteName.Archive)">
          <i class="iconfont icon-quill"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_ARCHIVE" />
          </webfont>
        </router-link>
        <router-link class="item" :to="getPageRoute(RouteName.About)">
          <i class="iconfont icon-swordsman"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_ABOUT" />
          </webfont>
        </router-link>
        <router-link class="item guestbook" :to="getPageRoute(RouteName.Guestbook)">
          <i class="iconfont icon-comment"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_GUESTBOOK" />
          </webfont>
        </router-link>
        <router-link class="item app" :to="getPageRoute(RouteName.App)">
          <uimage cdn class="icon" src="/images/page-app/logo.png" />
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_APP" />
          </webfont>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Language, LanguageKey } from '/@/language'
  import { RouteName, CategorySlug } from '/@/app/router'
  import { Theme } from '/@/composables/theme'
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMetaStore } from '/@/stores/meta'
  import { getDefaultAvatar } from '/@/transforms/avatar'
  import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'
  import { VALUABLE_LINKS, META } from '/@/config/app.config'

  export default defineComponent({
    name: 'MobileAside',
    setup() {
      const { theme, i18n } = useEnhancer()
      const metaStore = useMetaStore()
      const avatar = computed(() => metaStore.adminInfo.data?.avatar || getDefaultAvatar())

      const themeIcon = computed(() => {
        const themeIconMap = {
          [Theme.Light]: 'icon-sun',
          [Theme.Dark]: 'icon-moon'
        }
        return themeIconMap[theme.theme.value]
      })

      const languageIcon = computed(() => {
        const languageIconMap = {
          [Language.Chinese]: 'icon-chinese',
          [Language.English]: 'icon-english'
        }
        return languageIconMap[i18n.language.value]
      })

      useUniversalFetch(() => metaStore.fetchAdminInfo())

      return {
        VALUABLE_LINKS,
        LanguageKey,
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .aside {
    $border-color: darken($mobile-aside-bg, 3%);
    display: block;
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    color: $white;

    .aside-user {
      $size: 58px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      padding: $gap * 2;
      border-bottom: 1px solid $border-color;

      .avatar {
        width: $size;
        height: $size;
        flex-shrink: 0;

        img {
          max-width: 100%;
          border: 2px solid $white;
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
      margin-top: $sm-gap;

      .nav-list {
        padding: 0;
        margin: 0;

        .item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 3em;
          margin-bottom: 0.5em;
          padding: 0 1em;
          border: none;
          text-decoration: none;
          color: $white;
          &:last-child {
            margin-bottom: 0;
          }

          &.link-active {
            color: $primary;
            font-weight: bold;
            background-color: $body-bg;
          }

          &.app {
            display: flex;
            align-items: center;
            margin-top: $gap;
            color: $surmon;
            .icon {
              width: 1em;
              height: 1em;
              margin-right: 1em;
              border-radius: $xs-radius;
            }
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
