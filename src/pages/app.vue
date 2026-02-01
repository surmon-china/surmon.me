<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { Language, LocalesKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { firstUpperCase } from '/@/transforms/text'
  import { APP_PROFILE, RESOURCE_LINKS, BFF_CONFIG } from '/@/configs/app.config'

  const APP_LOGO_URL = '/images/page-app/logo.png'

  const props = defineProps<{
    isMobile?: boolean
  }>()

  const { gtag, isZhLang, i18n: _i18n } = useEnhancer()
  const handleAppEvent = (name: string) => {
    gtag?.event(name, {
      event_category: GAEventCategories.App
    })
  }

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LocalesKey.PAGE_APP, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_APP)!, enTitle] : [enTitle]
    const description = `${APP_PROFILE.title} App ${isZhLang.value ? '下载' : 'download'}`
    return {
      pageTitles: titles,
      description,
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
      <h2 class="title">{{ APP_PROFILE.title }}</h2>
      <p class="description">
        <webfont><i18n :k="LocalesKey.APP_SLOGAN" /></webfont>
      </p>
      <div class="screen">
        <uimage alt="app-hot" class="screen-img" src="/images/page-app/hot.webp" cdn />
        <div class="download">
          <uimage class="qrcode" alt="qrcode" src="/images/page-app/qrcode.png" cdn />
          <button class="button android-download" disabled>
            <i class="icon iconfont icon-android"></i>
            <span class="text">Android</span>
            <i class="iconfont icon-download"></i>
          </button>
          <button class="button ios-download" disabled>
            <i class="icon iconfont icon-apple"></i>
            <span class="text">iOS</span>
            <i class="iconfont icon-download"></i>
          </button>
          <ulink
            class="button source-code"
            :href="RESOURCE_LINKS.GITHUB_SURMON_ME_NATIVE"
            @mousedown="handleAppEvent('app_source_code')"
          >
            <i class="icon iconfont icon-github"></i>
            <span class="text">Source Code</span>
            <i class="new-window iconfont icon-new-window-s"></i>
          </ulink>
        </div>
      </div>
      <p class="rss">
        <i18n>
          <template #zh>
            （ 此项目已废弃！建议使用
            <a class="link" :href="BFF_CONFIG.route_path_rss" target="_blank">RSS 订阅</a> ）
          </template>
          <template #en>
            [ DEPRECATED! Use
            <a class="link" :href="BFF_CONFIG.route_path_rss" target="_blank">RSS subscription</a> ]
          </template>
        </i18n>
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
    min-height: 50rem;
    height: $full-page-content-height;

    .app {
      text-align: center;

      .logo {
        margin-bottom: $gap-lg;
        img {
          width: 4.6rem;
          border-radius: 1em;
        }
      }

      .title {
        margin-bottom: $gap-sm;
        font-weight: bold;
        color: $primary;
      }

      .rss {
        margin-top: $gap-lg;
        margin-bottom: 0;
        color: $color-text-secondary;

        .link {
          @include mix.text-underline();
        }
      }

      .screen {
        margin-top: 2rem;
        width: 27rem;
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
          $size: 9.6rem;
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
            height: 2.4rem;
            display: flex;
            align-items: center;
            margin-top: $gap-lg;
            padding: 0 1em;
            border: 1px solid;
            border-radius: $radius-sm;
            transition: all $motion-duration-fast;

            .icon {
              font-size: $font-size-h4;
              margin-right: $gap-xs;
            }

            &.android-download,
            &.ios-download {
              background: $module-bg;
              justify-content: space-between;

              .text {
                flex-grow: 1;
                text-align: left;
              }
            }

            &.source-code {
              color: $github-primary;
              &:hover {
                color: $github-primary-hover;
              }

              .new-window {
                margin-left: $gap-xs;
                font-size: $font-size-quinary;
              }
            }
          }
        }
      }
    }

    &.mobile {
      min-height: 40rem;
      height: $mobile-page-content-height;

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
