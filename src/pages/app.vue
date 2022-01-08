<template>
  <div class="app-page" :class="{ mobile: isMobile }">
    <div class="app">
      <div class="logo">
        <uimage cdn alt="app-logo" src="/images/page-app/logo.png" />
      </div>
      <h2 class="title">{{ META.title }}</h2>
      <p class="desc">
        <i18n :lkey="LANGUAGE_KEYS.APP_SLOGAN" />
      </p>
      <p class="version">v1.1.4 (2020-03-06)</p>
      <div class="screen">
        <uimage cdn alt="app-hot" class="screen-img" src="/images/page-app/hot.png" />
        <div class="download">
          <uimage cdn class="qrcode" alt="qrcode" src="/images/page-app/qrcode.png" />
          <ulink
            class="button"
            :href="VALUABLE_LINKS.APP_APK_FILE"
            @click="handleAndroidApp($event)"
            @mousedown="handleAppEvent('download_android_app')"
          >
            <i class="icon iconfont icon-android"></i>
            <span class="text">Android</span>
            <i class="new-window iconfont icon-new-window-s"></i>
          </ulink>
          <ulink
            class="button"
            :href="VALUABLE_LINKS.SURMON_ME_NATIVE + '#ios'"
            @mousedown="handleAppEvent('download_ios_app')"
          >
            <i class="icon iconfont icon-apple"></i>
            <span class="text">iOS</span>
            <i class="new-window iconfont icon-new-window-s"></i>
          </ulink>
          <ulink
            class="source-code"
            :href="VALUABLE_LINKS.SURMON_ME_NATIVE"
            @mousedown="handleAppEvent('app_source_code')"
          >
            <i class="iconfont icon-git"></i>
            Source Code
          </ulink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Language } from '/@/language/data'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventCategories } from '/@/constants/gtag'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'AppPage',
    props: {
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const { i18n, meta, gtag, isZhLang } = useEnhancer()
      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_APP, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_APP), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.title} App 下载` }
      })

      const handleAppEvent = (name: string) => {
        gtag?.event(name, {
          event_category: GAEventCategories.App
        })
      }

      const handleAndroidApp = (event) => {
        if (
          !window.confirm(
            isZhLang.value
              ? 'Android apk 文件托管在 GitHub，希望你可以顺利访问~'
              : 'Will open raw.githubusercontent.com to download android app...'
          )
        ) {
          event.preventDefault()
        }
      }

      return {
        META,
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        handleAppEvent,
        handleAndroidApp
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .app-page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 68rem;
    height: $full-page-active-content-height;

    > .app {
      text-align: center;

      > .logo {
        margin-bottom: $lg-gap * 2;

        > img {
          width: 6rem;
          border-radius: 1em;
        }
      }

      > .title {
        color: $primary;
        font-weight: bold;
        text-transform: uppercase;
      }

      > .version {
        color: $text-divider;
      }

      > .screen {
        margin-top: 3rem;
        width: 36rem;
        position: relative;

        &:hover {
          > .screen-img {
            opacity: 0.4;
          }

          > .download {
            @include visible();
          }
        }

        > .screen-img {
          width: 100%;
          @include visibility-transition($transition-time-normal);
        }

        > .download {
          $size: 12rem;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          @include hidden();
          @include backdrop-blur(3px);
          @include visibility-transition($transition-time-normal);

          .qrcode {
            width: $size;
            height: auto;
            @include radius-box($sm-radius);
          }

          .button {
            width: $size;
            height: 3rem;
            display: flex;
            align-items: center;
            margin-top: 2rem;
            padding: 0 1em;
            border: 1px solid $primary;
            border-radius: $xs-radius;
            background: $module-bg;
            color: $primary;
            transition: all $transition-time-fast;
            &:hover {
              color: $text-reversal;
              border-color: $primary-translucent;
              background: $primary-lighter;
            }

            .icon {
              font-size: $font-size-h4;
              margin-right: $sm-gap;
            }

            .new-window {
              margin-left: $xs-gap;
              font-size: $font-size-small;
            }
          }

          .source-code {
            margin-top: 2rem;
            border-bottom: 1px solid;
            color: $text;
            &:hover {
              color: $primary;
            }

            .iconfont {
              margin-right: $xs-gap;
            }
          }
        }
      }
    }

    &.mobile {
      min-height: 53rem;
      height: calc(100vh - #{$mobile-header-height + $lg-gap + $lg-gap + $mobile-footer-height});

      > .app {
        > .screen {
          width: 100%;
          margin-top: 3rem;
          margin-bottom: 1rem;
          text-align: center;

          > .screen-img {
            opacity: 0.4;
            width: 90%;
          }

          > .download {
            @include visible();
          }
        }
      }
    }
  }
</style>
