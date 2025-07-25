<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { Language, LocaleKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { APP_META, VALUABLE_LINKS } from '/@/configs/app.config'
  import { firstUpperCase } from '/@/transforms/text'

  const APP_LOGO_URL = '/images/page-app/logo.png'
  const props = defineProps<{
    isMobile?: boolean
  }>()

  const { i18n: _i18n, gtag, isZhLang } = useEnhancer()
  const handleAppEvent = (name: string) => {
    gtag?.event(name, {
      event_category: GAEventCategories.App
    })
  }

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_APP, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_APP)!, enTitle] : [enTitle]
    return {
      pageTitles: titles,
      description: `${APP_META.title} App ${isZhLang.value ? '下载' : 'download'}`,
      ogImage: APP_LOGO_URL
    }
  })
</script>

<template>
  <div class="app-page" :class="{ mobile: props.isMobile }">
    <div class="app">
      <div class="logo">
        <uimage alt="app-logo" :src="APP_LOGO_URL" cdn />
      </div>
      <h2 class="title">{{ APP_META.title }}</h2>
      <p class="description">
        <webfont><i18n :k="LocaleKey.APP_SLOGAN" /></webfont>
      </p>
      <div class="screen">
        <uimage alt="app-hot" class="screen-img" src="/images/page-app/hot.webp" cdn />
        <div class="download">
          <uimage class="qrcode" alt="qrcode" src="/images/page-app/qrcode.png" cdn />
          <ulink
            class="button"
            :href="VALUABLE_LINKS.GITHUB_SURMON_ME_NATIVE + '#android'"
            @mousedown="handleAppEvent('download_android_app')"
          >
            <i class="icon iconfont icon-android"></i>
            <span class="text">Android</span>
            <i class="new-window iconfont icon-new-window-s"></i>
          </ulink>
          <ulink
            class="button"
            :href="VALUABLE_LINKS.GITHUB_SURMON_ME_NATIVE + '#ios'"
            @mousedown="handleAppEvent('download_ios_app')"
          >
            <i class="icon iconfont icon-apple"></i>
            <span class="text">iOS</span>
            <i class="new-window iconfont icon-new-window-s"></i>
          </ulink>
          <ulink
            class="source-code"
            :href="VALUABLE_LINKS.GITHUB_SURMON_ME_NATIVE"
            @mousedown="handleAppEvent('app_source_code')"
          >
            <i class="iconfont icon-git"></i>
            Source Code
          </ulink>
        </div>
      </div>
      <p class="rss">
        <span class="prefix"><i18n zh="（" en="[" /></span>
        <span class="deprecated"><i18n zh="此项目已废弃！" en="DEPRECATED!" /></span>
        <i18n zh="建议使用" en="Recommend" />
        <a class="link" :href="VALUABLE_LINKS.RSS" target="_blank">
          <i18n zh="RSS 订阅" en="RSS subscription" />
        </a>
        <span class="suffix"><i18n zh="）" en="]" /></span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .app-page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 68rem;
    height: $full-page-active-content-height;

    .app {
      text-align: center;

      .logo {
        margin-bottom: $gap-lg * 2;
        img {
          width: 6rem;
          border-radius: 1em;
        }
      }

      .title {
        margin-bottom: 1rem;
        color: $primary;
        font-weight: bold;
        text-transform: uppercase;
      }

      .version {
        color: $color-text-divider;
        text-decoration: line-through;
      }

      .rss {
        margin-top: 2rem;
        margin-bottom: 0;
        color: $color-text-secondary;

        .deprecated {
          font-weight: bold;
          margin-right: $gap-xs;
          color: $red;
        }

        .link {
          margin-left: $gap-xs;
          @include mix.text-underline();
        }

        .prefix {
          margin-right: $gap-xs;
        }
        .suffix {
          margin-left: $gap-xs;
        }
      }

      .screen {
        margin-top: 3rem;
        width: 36rem;
        position: relative;

        &:hover {
          .screen-img {
            opacity: 0.4;
          }

          .download {
            @include mix.visible();
          }
        }

        .screen-img {
          width: 100%;
          @include mix.visibility-transition($motion-duration-mid);
        }

        .download {
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
          @include mix.hidden();
          @include mix.backdrop-blur(3px);
          @include mix.visibility-transition($motion-duration-mid);

          .qrcode {
            width: $size;
            height: auto;
            @include mix.radius-box($radius-sm);
          }

          .button {
            width: $size;
            height: 3rem;
            display: flex;
            align-items: center;
            margin-top: 2rem;
            padding: 0 1em;
            border: 1px solid $primary;
            border-radius: $radius-xs;
            background: $module-bg;
            color: $primary;
            transition: all $motion-duration-fast;
            &:hover {
              color: $color-text-reversal;
              border-color: $primary-translucent;
              background: $primary-lighter;
            }

            .icon {
              font-size: $font-size-h4;
              margin-right: $gap-sm;
            }

            .new-window {
              margin-left: $gap-xs;
              font-size: $font-size-small;
            }
          }

          .source-code {
            margin-top: 2rem;
            border-bottom: 1px solid;
            color: $color-text;
            &:hover {
              color: $primary;
            }

            .iconfont {
              margin-right: $gap-xs;
            }
          }
        }
      }
    }

    &.mobile {
      min-height: 53rem;
      height: calc(100vh - #{$mobile-header-height + $gap-lg + $gap-lg + $mobile-footer-height});

      .app {
        .screen {
          width: 100%;
          margin-top: 3rem;
          margin-bottom: 1rem;
          text-align: center;

          .screen-img {
            opacity: 0.4;
            width: 90%;
          }

          .download {
            @include mix.visible();
          }
        }
      }
    }
  }
</style>
