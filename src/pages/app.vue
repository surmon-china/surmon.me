<template>
  <div class="app-page" :class="{ mobile: isMobile }">
    <div class="app">
      <div class="logo">
        <uimage cdn alt="app-logo" src="/images/page-app/logo.png" />
      </div>
      <h2 class="title">{{ META.title }}</h2>
      <p class="description">
        <webfont>
          <i18n :k="LanguageKey.APP_SLOGAN" />
        </webfont>
      </p>
      <div class="screen">
        <uimage cdn alt="app-hot" class="screen-img" src="/images/page-app/hot.png" />
        <div class="download">
          <uimage cdn class="qrcode" alt="qrcode" src="/images/page-app/qrcode.png" />
          <ulink
            class="button"
            :href="VALUABLE_LINKS.APP_APK_FILE"
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

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Language, LanguageKey } from '/@/language'
  import { GAEventCategories } from '/@/constants/gtag'
  import { firstUpperCase } from '/@/transforms/text'
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
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_APP, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_APP), enTitle] : [enTitle]
        return {
          pageTitle: titles.join(' | '),
          description: `${META.title} App 下载`
        }
      })

      const handleAppEvent = (name: string) => {
        gtag?.event(name, {
          event_category: GAEventCategories.App
        })
      }

      return {
        META,
        VALUABLE_LINKS,
        LanguageKey,
        handleAppEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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
        margin-bottom: $lg-gap * 2;
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
        color: $text-divider;
        text-decoration: line-through;
      }

      .rss {
        margin-top: 2rem;
        margin-bottom: 0;
        color: $text-secondary;

        .deprecated {
          font-weight: bold;
          margin-right: $xs-gap;
          color: $red;
        }

        .link {
          margin-left: $xs-gap;
          border-bottom: 1px solid;
        }

        .prefix {
          margin-right: $xs-gap;
        }
        .suffix {
          margin-left: $xs-gap;
        }
      }

      .screen {
        margin-top: 5rem;
        width: 36rem;
        position: relative;

        &:hover {
          .screen-img {
            opacity: 0.4;
          }

          .download {
            @include visible();
          }
        }

        .screen-img {
          width: 100%;
          @include visibility-transition($transition-time-normal);
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
            @include visible();
          }
        }
      }
    }
  }
</style>
