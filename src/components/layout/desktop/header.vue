<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { Theme } from '/@/composables/theme'
  import { HEADER_ELEMENT_ID } from '/@/constants/anchor'
  import { GAEventCategories } from '/@/constants/gtag'
  import { META } from '/@/config/app.config'
  import { menus } from './menu'

  const { i18n: _i18n, gtag, theme, gState } = useEnhancer()
  // enable header nav bar when full page layout
  const isEnabledNav = computed(() => !gState.layoutColumn.value.isNormal)

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

  const tooggleLanguage = () => {
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
        <uimage cdn src="/images/logo.svg" class="header-logo" :alt="META.title" />
        <webfont class="header-slogan">
          <i18n :k="LanguageKey.APP_SLOGAN" />
        </webfont>
        <router-link to="/" class="header-link" :title="META.title" @mousedown="handleRootNavEvent" />
      </div>
      <div class="toolbox">
        <button class="button menu" v-if="isEnabledNav">
          <i class="iconfont icon-top-menu"></i>
        </button>
        <button class="button language" title="Switch language" @click="tooggleLanguage">
          {{ _i18n.language.value || '-' }}
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    z-index: $z-index-header;
    background-color: $module-bg;
    border-bottom: 1px solid $module-bg-darker-2;
    @include backdrop-blur(5px);

    &.enable-nav:hover {
      .header-nav {
        @include visible();
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
        padding-left: $sm-gap;
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
        @include visibility-transition();
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
          &.menu {
            cursor: none;
          }
          &.language {
            font-weight: bold;
          }
        }
      }
    }

    .header-nav {
      width: 100%;
      height: 4rem;
      background-color: $primary-lighter;
      @include hidden();
      @include visibility-transition();

      .nav-list {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .divider {
          height: 6px;
          width: 1px;
          background-color: $module-bg-translucent;
        }

        .item {
          position: relative;
          display: inline-flex;
          align-items: center;
          color: $text-reversal;
          opacity: 0.7;
          @include visibility-transition();
          &:hover {
            opacity: 1;
          }
          &.link-active {
            .text {
              padding-top: 4px;
              padding-bottom: 2px;
              border-bottom: 2px solid;
            }
          }

          .font-icon {
            margin-right: $sm-gap;
          }

          .image-icon {
            width: 1em;
            height: 1em;
            margin-right: $sm-gap;
            border-radius: $xs-radius;
          }

          .superscript {
            margin-left: $xs-gap;
          }

          .new-window {
            margin-left: $xs-gap;
            margin-right: -$xs-gap;
            margin-top: -$sm-gap;
            font-size: $font-size-small - 3;
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
