<template>
  <div class="app-page" :class="{ mobile: isMobile }">
    <div class="app">
      <div class="logo">
        <uimage cdn alt="app-logo" draggable="false" src="/images/page-app/logo.png" />
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
          >
            <i class="iconfont icon-android"></i>
            <span class="text">
              <i18n :lkey="LANGUAGE_KEYS.DEVICE_ANDROID" />
            </span>
          </ulink>
          <ulink
            class="button"
            :href="VALUABLE_LINKS.SURMON_APP_REPOSITORIE + '#ios'"
            @mousedown="handleAppAction('APP IOS')"
          >
            <i class="iconfont icon-apple"></i>
            <span class="text">
              <i18n :lkey="LANGUAGE_KEYS.DEVICE_IOS" />
            </span>
          </ulink>
          <ulink
            class="button code"
            :href="VALUABLE_LINKS.SURMON_APP_REPOSITORIE"
            @mousedown="handleAppAction('APP GitHub 地址')"
          >
            <i class="iconfont icon-git"></i>
            <span class="text">Source Code</span>
          </ulink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useEnhancer } from '../app/enhancer'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'Application',
    setup() {
      const { i18n, helmet, gtag, isMobile, isZhLang } = useEnhancer()

      helmet(() => {
        const prefix = isZhLang.value ? `${i18n.t(LANGUAGE_KEYS.PAGE_APP)} | ` : ''
        return { title: prefix + 'App' }
      })

      const handleAppAction = (name: string) => {
        gtag?.event(name, {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.AppPage
        })
      }

      const handleAndroidApp = (event) => {
        handleAppAction('APP Android 下载')
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
        isMobile,
        handleAppAction,
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
        color: $text-dividers;
      }

      > .screen {
        margin-top: 5rem;
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
          @include visibility-transition($transition-time-normal);

          > .qrcode {
            width: 12rem;
            height: auto;
          }

          > .button {
            width: 12rem;
            line-height: $line-height-base * 1.6;
            color: $primary;
            margin-top: 2rem;
            border: 1px solid $primary;
            border-radius: $xs-radius;
            text-align: center;
            text-transform: uppercase;
            background: $module-bg;
            transition: color $transition-time-fast, background $transition-time-fast;

            &.code {
              border-color: $text;
              color: $text;

              &:hover {
                background: $primary;
                border-color: $primary;
                color: $text-reversal;
              }
            }

            .text {
              margin-left: $xs-gap;
            }

            &:hover {
              color: $text-reversal;
              border-color: $primary-translucent;
              background: linear-gradient(
                to bottom right,
                rgba($red, 0.7),
                $text-reversal,
                $primary,
                $text-reversal,
                rgba($accent, 0.7)
              );
            }
          }
        }
      }
    }

    &.mobile {
      min-height: 53rem;
      height: calc(100vh - #{$mobile-header-height + $lg-gap + $mobile-footer-height + $gap});

      > .app {
        padding-top: $lg-gap;

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
