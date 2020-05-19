<template>
  <div class="app-page" :class="{ mobile: isMobile }">
    <div class="app">
      <div class="logo">
        <img
          alt="app-logo"
          draggable="false"
          :src="'/images/app-logo.png' | byCDN"
        >
      </div>
      <h2 class="title">{{ appConfig.meta.title }}</h2>
      <p class="desc">{{ $i18n.text.slogan }}</p>
      <!-- <p class="version">v1.1.4 (2020-03-06)</p> -->
      <div class="screen">
        <img
          alt="app-hot"
          class="screen-img"
          :src="'/images/app-hot.png' | byCDN"
        >
        <div class="download">
          <img
            :src="'/images/app-qrcode.png' | byCDN"
            class="qrcode"
            alt="qrcode"
            draggable="false"
          >
          <a
            target="_blank"
            class="btn"
            :href="appConfig.links.appApkFile"
            @click="handleAndroidApp($event)"
          >
            <i class="iconfont icon-android"></i>
            <span class="text">{{ $i18n.text.device.android }}</span>
          </a>
          <a
            class="btn"
            target="_blank"
            rel="external nofollow noopenter"
            :href="appConfig.links.appProject + '#ios'"
            @mousedown="handleAppAction('APP IOS')"
          >
            <i class="iconfont icon-mac"></i>
            <span class="text">{{ $i18n.text.device.ios }}</span>
          </a>
          <a
            class="btn code"
            target="_blank"
            rel="external nofollow noopenter"
            :href="appConfig.links.appProject"
            @mousedown="handleAppAction('APP GitHub 地址')"
          >
            <i class="iconfont icon-git"></i>
            <span class="text">Source Code</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import appConfig from '~/config/app.config'
  import systemConstants from '~/constants/system'
  export default {
    name: 'Application',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.app + ' | '}App`
      }
    },
    computed: {
      appConfig: () => appConfig,
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    methods: {
      handleAppAction(name) {
        this.$ga.event(
          name,
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.AppPage
        )
      },
      handleAndroidApp(event) {
        this.handleAppAction('APP Android 下载')
        if (!window.confirm(
          this.isEnLang
            ? 'Will open raw.githubusercontent.com to download android app...'
            : 'Android apk 文件托管在 GitHub，希望你可以顺利访问~'
        )) {
          event.preventDefault()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 68rem;
    height: $active-content-full-height;

    &.mobile {
      min-height: 53rem;
      height: calc(100vh - #{$mobile-header-height + $lg-gap + $mobile-footer-height + $gap});;

      > .app {
        padding-top: $lg-gap;

        > .screen {
          width: 100%;
          margin-top: 3rem;
          margin-bottom: 1rem;
          text-align: center;

          > .screen-img {
            opacity: .4;
            width: 90%;
          }

          > .download {
            @include visible();
          }
        }
      }
    }

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
        user-select: none;

        &:hover {
          > .screen-img {
            opacity: .4;
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

          > .btn {
            width: 12rem;
            line-height: $line-height-base * 1.6;
            color: $primary;
            margin-top: 2rem;
            border: 1px solid $primary;
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
              border-color: $primary-opacity-5;
              background: linear-gradient(
                to bottom right,
                rgba($red, .7),
                $text-reversal,
                $primary-opacity-9,
                $text-reversal,
                rgba($accent, .7)
              );
            }
          }
        }
      }
    }
  }
</style>
