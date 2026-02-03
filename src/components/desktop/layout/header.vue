<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Theme } from '/@/composables/theme'
  import { Language, LocalesKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { HEADER_ELEMENT_ID } from '/@/constants/element-anchor'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { menus } from './menu'

  const props = defineProps<{
    enabledNav: boolean
  }>()

  const { gtag, theme, i18n: _i18n } = useEnhancer()

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
  <header :id="HEADER_ELEMENT_ID" class="header" v-disabled-wallflower>
    <div class="header-container container">
      <div class="header-brand">
        <uimage cdn src="/images/logo.svg" class="header-logo" :alt="APP_PROFILE.title" />
        <webfont class="header-slogan">
          <i18n :k="LocalesKey.APP_SLOGAN" />
        </webfont>
        <router-link to="/" class="header-link" :title="APP_PROFILE.title" @mousedown="handleRootNavEvent" />
      </div>
      <div class="tools">
        <button class="button menu" v-if="enabledNav">
          <i class="iconfont icon-top-menu"></i>
        </button>
        <button class="button language" title="Switch language" @click="toggleLanguage">
          <i class="iconfont" :class="languageIcon"></i>
        </button>
        <button class="button theme" @click="toggleTheme">
          <client-only>
            <i class="iconfont" :class="themeIcon" :data-value="theme.theme.value"></i>
          </client-only>
        </button>
      </div>
    </div>
    <div class="header-nav" v-if="enabledNav">
      <nav class="nav-list container">
        <template v-for="(menu, index) in menus" :key="menu.id">
          <span v-if="index > 0" class="divider"></span>
          <ulink class="item" :class="menu.id" :to="menu.route" :href="menu.url">
            <uimage v-if="menu.imageIcon" class="image-icon" :src="menu.imageIcon" />
            <i v-else-if="menu.icon" class="font-icon iconfont" :class="menu.icon"></i>
            <webfont class="text" bolder :uppercase="!menu.disabledUppercase">
              <i18n :k="menu.i18nKey" />
            </webfont>
            <span v-if="menu.newWindow" class="new-window">
              <i class="iconfont icon-new-window-s"></i>
            </span>
            <!-- <span v-if="menu.hot" class="superscript">
              <i class="iconfont icon-hot"></i>
            </span> -->
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
    &:hover {
      .header-nav {
        @include mix.visible();
      }
    }

    .header-container {
      height: 100%;
      display: flex;
      justify-content: space-between;

      .header-brand {
        height: 100%;
        display: flex;
        position: relative;
        align-items: center;
        padding-left: $gap-xs;
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
          width: 8.4rem;
          margin-right: $gap * 3;
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

      .tools {
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
          margin: 0 $gap-xs;
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
      height: 3rem;
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
          padding: $gap-tiny $gap-xs;
          color: $color-text-reversal;
          border-radius: $radius-md;
          opacity: 0.7;
          @include mix.visibility-transition();
          &:hover,
          &.link-active {
            opacity: 1;
          }

          &.link-active {
            color: $primary-lighter;
            background-color: $module-bg-opaque;
          }

          .font-icon {
            margin-right: $gap-xs;
          }

          .image-icon {
            width: 1em;
            height: 1em;
            margin-right: $gap-xs;
            border-radius: $radius-xs;
          }

          .superscript {
            margin-left: $gap-tiny;
          }

          .new-window {
            margin-left: $gap-tiny;
            margin-right: -$gap-tiny;
            margin-top: -$gap-tiny;
            font-size: $font-size-quinary;
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
