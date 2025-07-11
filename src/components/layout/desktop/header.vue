<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Theme } from '/@/composables/theme'
  import { Language, LocaleKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { HEADER_ELEMENT_ID } from '/@/constants/element-anchor'
  import { APP_META } from '/@/configs/app.config'
  import { menus } from './menu'

  const { i18n: _i18n, gtag, theme, globalState } = useEnhancer()
  // enable header nav bar when full page layout
  const isEnabledNav = computed(() => !globalState.pageLayout.value.isNormal)

  const themeIcon = computed(() => {
    const themeIconMap = {
      [Theme.Light]: 'icon-sun',
      [Theme.Dark]: 'icon-moon'
    }
    return themeIconMap[theme.theme.value]
  })

  const toggleTheme = () => {
    theme.toggle()
    gtag?.event('switch_theme', {
      event_category: GAEventCategories.Widget,
      event_label: theme.theme.value
    })
  }

  const languageIcon = computed(() => {
    const languageIconMap = {
      [Language.Chinese]: 'icon-chinese',
      [Language.English]: 'icon-english'
    }
    return languageIconMap[_i18n.language.value]
  })

  const toggleLanguage = () => {
    _i18n.toggle()
    gtag?.event('switch_language', {
      event_category: GAEventCategories.Widget,
      event_label: _i18n.l.value?.name
    })
  }

  const handleRootNavEvent = () => {
    gtag?.event('root_header_home_nav', {
      event_category: GAEventCategories.Universal
    })
  }
</script>

<template>
  <header :id="HEADER_ELEMENT_ID" v-disabled-wallflower class="header" :class="{ 'enable-nav': isEnabledNav }">
    <div class="header-container container">
      <div class="header-header">
        <uimage cdn src="/images/logo.svg" class="header-logo" :alt="APP_META.title" />
        <webfont class="header-slogan">
          <i18n :k="LocaleKey.APP_SLOGAN" />
        </webfont>
        <router-link to="/" class="header-link" :title="APP_META.title" @mousedown="handleRootNavEvent" />
      </div>
      <div class="toolbox">
        <button class="button menu" v-if="isEnabledNav">
          <i class="iconfont icon-top-menu"></i>
        </button>
        <button class="button language" title="Switch language" @click="toggleLanguage">
          <i class="iconfont" :class="languageIcon"></i>
        </button>
        <button class="button theme" :class="theme.theme.value" @click="toggleTheme">
          <i class="iconfont" :class="themeIcon"></i>
        </button>
      </div>
    </div>
    <div class="header-nav">
      <nav class="nav-list container">
        <template v-for="(menu, index) in menus" :key="menu.id">
          <span v-if="index > 0" class="divider"></span>
          <ulink class="item" :class="menu.id" :to="menu.route" :href="menu.url">
            <uimage v-if="menu.imageIcon" class="image-icon" :src="menu.imageIcon" />
            <i v-else-if="menu.icon" class="font-icon iconfont" :class="menu.icon"></i>
            <webfont class="text" bolder :uppercase="!menu.disabledUppercase">
              <i18n :k="menu.i18nKey" />
            </webfont>
            <span v-if="menu.hot" class="superscript">
              <i class="iconfont icon-hot-fill"></i>
            </span>
            <span v-if="menu.newWindow" class="new-window">
              <i class="iconfont icon-new-window-s"></i>
            </span>
          </ulink>
        </template>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    z-index: $z-index-header;
    background-color: $module-bg;
    border-bottom: 1px solid $module-bg-darker-2;
    @include mix.backdrop-blur(5px);

    &.enable-nav:hover {
      .header-nav {
        @include mix.visible();
      }
    }

    .header-container {
      height: 100%;
      display: flex;
      justify-content: space-between;

      .header-header {
        height: 100%;
        display: flex;
        position: relative;
        align-items: center;
        padding-left: $gap-sm;
        width: 29em;
        overflow: hidden;

        @keyframes logo-blink {
          0% {
            mask-position: -30%;
          }
          100% {
            mask-position: 666%;
          }
        }

        .header-logo {
          width: 11rem;
          margin-right: $gap * 4;
          filter: $theme-logo-rotate;
          .logo-st {
            fill: $primary;
          }
        }

        .header-slogan {
          color: $primary;
          font-size: $font-size-h5;
        }

        .header-link {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .toolbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
        @include mix.visibility-transition();
        &:hover {
          opacity: 1;
        }

        .button {
          position: relative;
          display: block;
          text-transform: uppercase;
          margin: 0 $gap;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          &.menu {
            cursor: none;
          }
          &.language {
            font-size: $font-size-h4;
          }
        }
      }
    }

    .header-nav {
      width: 100%;
      height: 4rem;
      background-color: $primary-lighter;
      @include mix.hidden();
      @include mix.visibility-transition();

      .nav-list {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .divider {
          height: 8px;
          width: 1px;
          background-color: $module-bg-translucent;
        }

        .item {
          position: relative;
          display: inline-flex;
          align-items: center;
          color: $color-text-reversal;
          opacity: 0.7;
          @include mix.visibility-transition();
          &:hover,
          &.link-active {
            opacity: 1;
          }

          &.link-active {
            .text {
              text-decoration: underline;
              text-underline-offset: 0.5em;
              text-decoration-thickness: 2px;
            }
          }

          .font-icon {
            margin-right: $gap-sm;
          }

          .image-icon {
            width: 1em;
            height: 1em;
            margin-right: $gap-sm;
            border-radius: $radius-xs;
          }

          .superscript {
            margin-left: $gap-xs;
          }

          .new-window {
            margin-left: $gap-xs;
            margin-right: -$gap-xs;
            margin-top: -$gap-sm;
            font-size: $font-size-small - 3;
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
