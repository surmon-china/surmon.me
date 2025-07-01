<script lang="ts" setup>
  import { computed } from 'vue'
  import { APP_META } from '/@/configs/app.config'
  import { Language, LanguageKey } from '/@/language'
  import { RouteName, CategorySlug } from '/@/app/router'
  import { Theme } from '/@/composables/theme'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useAdminInfoStore } from '/@/stores/basic'
  import { getAssetURL } from '/@/transforms/url'
  import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'

  const { i18n: _i18n, theme, cdnDomain } = useEnhancer()
  const adminInfoStore = useAdminInfoStore()
  const defaultAvatar = getAssetURL(cdnDomain, '/images/anonymous.png')

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
    return languageIconMap[_i18n.language.value]
  })

  useUniversalFetch(() => adminInfoStore.fetch())
</script>

<template>
  <aside class="aside">
    <div class="aside-user">
      <uimage class="avatar" :src="adminInfoStore.data?.avatar || defaultAvatar" :alt="APP_META.author" />
      <div class="profile">
        <h3 class="name">{{ APP_META.author }}</h3>
        <webfont class="slogan">
          <i18n :k="LanguageKey.APP_SLOGAN" />
        </webfont>
      </div>
    </div>
    <div class="aside-tool">
      <button class="item" @click="theme.toggle">
        <i class="iconfont" :class="themeIcon"></i>
      </button>
      <div class="separator"></div>
      <button class="item" @click="_i18n.toggle">
        <i class="iconfont" :class="languageIcon"></i>
      </button>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <router-link to="/" class="item">
          <i class="iconfont icon-home"></i>
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
        <router-link class="item" :to="getPageRoute(RouteName.Snippets)">
          <i class="iconfont icon-buddhism"></i>
          <webfont bolder uppercase>
            <i18n :k="LanguageKey.PAGE_SNIPPETS" />
          </webfont>
        </router-link>
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
        <router-link class="item" :to="getPageRoute(RouteName.Guestbook)">
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

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .aside {
    $border-color: funs.darken($mobile-aside-bg, 3%);
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
      padding: 2rem 1.8rem;
      border-bottom: 1px solid $border-color;

      .avatar {
        flex-shrink: 0;
        width: $size;
        height: $size;
        margin-right: $gap-lg;
        border: 2px solid $white;
        background-color: $body-bg;
        @include mix.radius-box(100%);
      }

      .profile {
        height: $size;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        overflow: hidden;

        .name {
          font-weight: bold;
          margin-top: 0;
          margin-bottom: $gap-sm;
        }

        .slogan {
          margin: 0;
          max-width: 100%;
          color: $surmon;
          @include mix.text-overflow();
        }
      }
    }

    .aside-tool {
      display: flex;
      height: 4.5rem;
      border-bottom: 1px solid $border-color;

      .separator {
        width: 1px;
        height: 100%;
        background-color: $border-color;
      }

      .item {
        flex: 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size-h2;
      }
    }

    .aside-nav {
      width: 100%;
      margin-top: $gap-sm;

      .nav-list {
        padding: 0;
        margin: 0;

        .item {
          display: block;
          width: 100%;
          height: 3em;
          line-height: 3em;
          margin-bottom: 0.5em;
          padding-left: $gap * 2;
          color: $white;
          &:last-child {
            margin-bottom: 0;
          }

          .iconfont {
            margin-right: 1em;
            font-weight: normal;
          }

          &.link-active {
            font-weight: bold;
            color: $primary;
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
              border-radius: $radius-xs;
            }
          }
        }
      }
    }
  }
</style>
