<template>
  <div class="about-page" :class="{ dark: isDarkTheme }">
    <div class="banner">
      <div class="background">
        <video class="video" loop muted autoplay :controls="false">
          <source :src="backgroundVideo" type="video/mp4" />
        </video>
      </div>
      <div class="avatar">
        <uimage class="image" :src="getAdminAvatar(adminInfo?.avatar)" />
        <h2 class="name">{{ adminInfo?.name || '-' }}</h2>
        <p class="role">{{ adminInfo?.slogan || '-' }}</p>
        <div class="bio-text" :class="language">
          <i18n v-bind="i18ns.biography" />
        </div>
        <div class="socials">
          <span class="normal">
            <ulink class="item github" :href="VALUABLE_LINKS.GITHUB">
              <i class="iconfont icon-github" />
              <span class="text">GitHub</span>
            </ulink>
            <ulink class="item twitter" :href="VALUABLE_LINKS.TWITTER">
              <i class="iconfont icon-twitter" />
              <span class="text">Twitter</span>
            </ulink>
            <ulink class="item instagram" :href="VALUABLE_LINKS.INSTAGRAM">
              <i class="iconfont icon-instagram" />
              <span class="text">Instagram</span>
            </ulink>
            <ulink class="item youtube" :href="VALUABLE_LINKS.YOUTUBE_CHANNEL">
              <i class="iconfont icon-youtube" />
              <span class="text">YouTube</span>
            </ulink>
          </span>
          <span class="mini">
            <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM">
              <i class="iconfont icon-telegram" />
            </ulink>
            <ulink class="item linkedin" :href="VALUABLE_LINKS.LINKEDIN">
              <i class="iconfont icon-linkedin" />
            </ulink>
            <ulink class="item douban" :href="VALUABLE_LINKS.DOUBAN">
              <i class="iconfont icon-douban" />
            </ulink>
            <ulink class="item zhihu" :href="VALUABLE_LINKS.ZHIHU">
              <i class="iconfont icon-zhihu" />
            </ulink>
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="links">
        <router-link
          class="item"
          v-for="(item, index) in links"
          :key="index"
          :to="getPageRoute(item.to)"
        >
          <i class="iconfont" :class="item.icon"></i>
          <divider class="divider" type="vertical" />
          <span class="text"><i18n v-bind="item.i18n" /></span>
        </router-link>
      </div>
      <div class="discussion">
        <ulink class="item qq-group" :href="VALUABLE_LINKS.QQ_GROUP">
          <i class="iconfont icon-qq"></i>
          <divider class="divider" type="vertical" />
          <span class="text"><i18n v-bind="i18ns.QQGroup" /></span>
        </ulink>
        <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM_GROUP">
          <i class="iconfont icon-telegram"></i>
          <divider class="divider" type="vertical" />
          <span class="text"><i18n v-bind="i18ns.TelegramGroup" /></span>
        </ulink>
        <button class="item sponsor" @click="handleSponsor">
          <i class="iconfont icon-heart" />
          <divider class="divider" type="vertical" />
          <span class="text"><i18n zh="赠瑰留香" en="Sponsor Me" /></span>
        </button>
        <ulink class="item spotify" :href="VALUABLE_LINKS.SPOTIFY">
          <i class="iconfont icon-spotify" />
          <divider class="divider" type="vertical" />
          <span class="text">My Spotify</span>
        </ulink>
        <ulink class="item music-163" :href="VALUABLE_LINKS.MUSIC_163">
          <i class="iconfont icon-163music-logo" />
          <divider class="divider" type="vertical" />
          <span class="text">BGM list</span>
        </ulink>
      </div>
      <div class="qrcodes">
        <div
          class="item"
          :class="item.class"
          :key="index"
          v-for="(item, index) in qrcodes"
          @mouseenter="handleGTagEvent(item.class.replace('-', '_') + '_qrcode')"
        >
          <div class="background"></div>
          <div class="icon">
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span class="qrcode">
            <uimage class="image" cdn :src="item.qrcode" />
          </span>
          <ulink class="link" :href="item.link">{{ item.text }}</ulink>
        </div>
      </div>
      <div class="calendar">
        <aggregate-calendar />
      </div>
      <div class="maps">
        <div class="location">
          <div class="map">
            <iframe class="iframe" src="/partials/location.html" />
          </div>
          <div class="living">
            <i class="iconfont icon-location"></i>
            <div class="text"><i18n v-bind="i18ns.livingNow" /></div>
          </div>
        </div>
        <div class="roadmap" :placeholder="isZhLang ? i18ns.roadmap.zh : i18ns.roadmap.en">
          <div class="wrapper">
            <button class="fullscreen" @click="handleOpenMap">
              <i class="iconfont icon-fullscreen"></i>
            </button>
            <iframe class="iframe" :src="VALUABLE_LINKS.GOOGLE_LIVE_MAP" frameborder="0" />
            <client-only>
              <popup v-model:visible="isOnRoadMap">
                <iframe
                  :src="VALUABLE_LINKS.GOOGLE_LIVE_MAP"
                  allowfullscreen
                  frameborder="0"
                  class="roadmap-modal"
                />
              </popup>
            </client-only>
          </div>
        </div>
      </div>
      <div class="footer-links">
        <div class="friendlinks">
          <template v-for="(item, index) in FRIEND_LINKS" :key="index">
            <divider type="vertical" size="lg" v-if="index !== 0" />
            <a :href="item.url" class="item" target="_blank" rel="external nofollow noopener">
              {{ item.name }}
            </a>
          </template>
        </div>
        <div class="speciallinks">
          <template v-for="(item, index) in SPECIAL_LINKS" :key="index">
            <divider type="vertical" size="lg" v-if="index !== 0" />
            <a :href="item.url" class="item" target="_blank" rel="external nofollow noopener">
              {{ item.name }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { useMetaStore } from '/@/stores/meta'
  import { useUniversalFetch } from '/@/universal'
  import { getPageRoute } from '/@/transforms/route'
  import { getTargetStaticURL } from '/@/transforms/url'
  import { GAEventCategories } from '/@/constants/gtag'
  import { VALUABLE_LINKS, FRIEND_LINKS, SPECIAL_LINKS } from '/@/config/app.config'
  import { useAboutPageMeta, getAdminAvatar, i18ns } from './helper'
  import AggregateCalendar from './calendar/index.vue'

  export default defineComponent({
    name: 'PCAboutPage',
    components: {
      AggregateCalendar
    },
    setup() {
      const { i18n, gtag, globalState, isZhLang, isDarkTheme } = useEnhancer()
      const metaStore = useMetaStore()
      const adminInfo = computed(() => metaStore.adminInfo.data)

      const links = [
        {
          to: RouteName.Lens,
          icon: `icon-lens`,
          i18n: i18ns.myVlogs
        },
        {
          to: RouteName.Merch,
          icon: `icon-rubik`,
          i18n: i18ns.merchBar
        },
        {
          to: RouteName.Archive,
          icon: `icon-peachblossom`,
          i18n: i18ns.myArchive
        },
        {
          to: RouteName.Freelancer,
          icon: `icon-coin-s`,
          i18n: i18ns.hireMe
        },
        {
          to: RouteName.Guestbook,
          icon: `icon-comment`,
          i18n: i18ns.guestbook
        }
      ]

      const qrcodes = [
        {
          class: 'douban',
          qrcode: `/images/qrcodes/douban.png`,
          icon: 'icon-douban',
          link: VALUABLE_LINKS.DOUBAN,
          text: `Douban Archive`
        },
        {
          class: 'wechat-channel',
          qrcode: `/images/qrcodes/wechat-channel.png`,
          icon: 'icon-wechat-channel',
          text: 'WeChat Channel'
        },
        {
          class: 'wechat',
          qrcode: `/images/qrcodes/wechat.jpg`,
          icon: 'icon-wechat',
          text: 'Friend me on WeChat'
        },
        {
          class: 'instagram',
          qrcode: `/images/qrcodes/instagram.png`,
          icon: 'icon-instagram',
          link: VALUABLE_LINKS.INSTAGRAM,
          text: `Instagram Plogs`
        },
        {
          class: 'youtube',
          qrcode: `/images/qrcodes/youtube.png`,
          icon: 'icon-youtube',
          link: VALUABLE_LINKS.YOUTUBE_CHANNEL,
          text: 'YouTube Channel'
        }
      ]

      const handleGTagEvent = (event: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.About
        })
      }

      const isOnRoadMap = ref(false)
      const handleOpenMap = () => {
        isOnRoadMap.value = true
        handleGTagEvent('roadmap_modal')
      }

      const handleSponsor = () => {
        globalState.switchTogglers.sponsorModal()
        handleGTagEvent('sponsor_modal')
      }

      // MARK: 非常有必要，vite 对 video.source.src 的解析有问题，会将其认为是 asset，而非 static resource，从而编译失败
      const backgroundVideo = getTargetStaticURL('/assets/page-about-background.mp4')

      // meta
      useAboutPageMeta()
      // prefetch
      useUniversalFetch(() => metaStore.fetchAdminInfo())

      return {
        i18ns,
        qrcodes,
        links,
        language: i18n.language,
        VALUABLE_LINKS,
        FRIEND_LINKS,
        SPECIAL_LINKS,
        getAdminAvatar,
        getPageRoute,
        isZhLang,
        isDarkTheme,
        isOnRoadMap,
        backgroundVideo,
        adminInfo,
        handleGTagEvent,
        handleSponsor,
        handleOpenMap
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .roadmap-modal {
    width: 88vw;
    height: 88vh;
  }

  .about-page {
    width: 100%;
    overflow: hidden;

    &.dark {
      .maps {
        .location {
          .iframe {
            filter: invert(1) hue-rotate(200deg) brightness(0.5) contrast(0.9);
          }
        }
        .roadmap {
          .iframe {
            filter: invert(1) hue-rotate(200deg) grayscale(60%) contrast(0.9);
          }
        }
      }
    }

    .banner {
      $banner-height: 22rem;
      margin-bottom: $gap * 2;

      .background {
        display: block;
        position: absolute;
        width: 100%;
        height: $banner-height;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: $z-index-normal + 1;
        background-color: $module-bg-darker-1;

        &::before {
          content: '';
          position: absolute;
          display: block;
          height: 1rem;
          bottom: -0.5rem;
          left: 0;
          right: 0;
          background-image: radial-gradient(circle, transparent 70%, $text-reversal 70%);
          background-size: 0.7em 1em;
          background-position: 0 -0.5em;
        }

        .video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 0% 30%;
          pointer-events: none;
        }
      }

      .avatar {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        background-color: $module-bg;
        @include radius-box($lg-radius);
        background-image: cdn-url('/images/page-about/background.png'),
          linear-gradient($module-bg-opaque 40%, #00000000 100%);
        background-size: contain;
        background-repeat: repeat-x;
        background-blend-mode: lighten;

        > .image {
          $size: 8rem;
          width: $size;
          height: $size;
          z-index: $z-index-normal + 2;
          margin-top: $banner-height - 4rem;
          max-width: 100%;
          border-radius: 100%;
          border: 5px solid $module-bg;
          box-sizing: content-box;
          transition: transform $transition-time-slow;
          &:hover {
            transform: rotate(360deg);
          }
        }

        .name,
        .role {
          text-align: center;
          color: $text;
        }

        .bio-text {
          line-height: 5rem;
          font-size: $font-size-h3;
          font-family: 'webfont-bolder', DINRegular;
          &.en {
            font-weight: bold;
          }
        }

        .socials {
          $button-size: 3rem;
          display: flex;
          justify-content: center;
          height: $button-size;
          margin-top: $lg-gap;
          margin-bottom: $gap * 2;

          .normal {
            display: inline-flex;
            align-items: center;
            margin-right: $gap;

            .item {
              padding: 0 $gap;
              margin-right: $gap;
              height: 100%;
              display: inline-flex;
              align-items: center;
              border-radius: $sm-radius;
              color: $white;
              transition: all $transition-time-fast;

              .iconfont {
                font-size: $font-size-h4;
                margin-right: $sm-gap;
              }

              .text {
                font-weight: bold;
              }

              &.github {
                background-color: $github-primary;
                &:hover {
                  background-color: $github-primary-hover;
                }
              }
              &.twitter {
                background-color: $twitter-primary;
                &:hover {
                  background-color: $twitter-primary-hover;
                }
              }
              &.youtube {
                margin: 0;
                background-color: $youtube-primary;
                &:hover {
                  background-color: mix($black, $youtube-primary, 8%);
                }
              }
              &.instagram {
                opacity: 0.8;
                background: $instagram-primary;
                background: $instagram-gradient;
                &:hover {
                  opacity: 1;
                }
              }
            }
          }

          > .mini {
            > .item {
              display: inline-block;
              width: $button-size;
              height: $button-size;
              line-height: $button-size;
              margin-right: $gap;
              text-align: center;
              border-radius: $sm-radius;
              color: $white;
              opacity: 0.8;
              transition: all $transition-time-fast;

              &:hover {
                opacity: 1;
              }

              .iconfont {
                font-size: $font-size-h4;
              }

              &.telegram {
                background-color: $telegram-primary;
              }
              &.douban {
                background-color: $douban-primary;
              }
              &.zhihu {
                background-color: $zhihu-primary;
              }
              &.stackoverflow {
                background-color: $stackoverflow-primary;
              }
              &.algorithm {
                background-color: $leetcode-primary;
              }
              &.quora {
                background-color: $quora-primary;
              }
              &.linkedin {
                background-color: $linkedin-primary;
              }
            }
          }
        }
      }
    }

    .links,
    .discussion {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: $gap * 2;
      width: 100%;
      margin-bottom: 2rem;

      .item {
        height: 5rem;
        display: flex;
        justify-content: start;
        align-items: center;
        @include common-bg-module($transition-time-fast);
        @include radius-box($lg-radius);

        .iconfont {
          margin-left: 2.8rem;
          font-size: $font-size-h3;
        }

        .divider {
          opacity: 0.6;
          border-color: initial;
        }

        .text {
          font-size: $font-size-h4;
          font-weight: bold;
        }
      }
    }

    .links {
      .item {
        color: $text-secondary;
        &:hover {
          color: $text-reversal;
          background-color: $primary;
        }
      }
    }

    .discussion {
      .item {
        color: var(--item-primary);
        &:hover {
          color: $white;
          background-color: var(--item-primary);
        }

        &.qq-group {
          --item-primary: #{$qq-primary};
        }
        &.telegram {
          --item-primary: #{$telegram-primary};
        }
        &.spotify {
          --item-primary: #{$spotify-primary};
        }
        &.music-163 {
          --item-primary: #{$music163-primary};
        }
        &.sponsor {
          --item-primary: #{$red};
        }
      }
    }

    .qrcodes {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: $gap * 2;
      width: 100%;
      height: 18rem;
      margin-bottom: 2rem;

      .item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        @include common-bg-module();
        @include radius-box($lg-radius);
        &.wechat {
          --item-primary: #{$wechat-primary};
          .background {
            height: 45%;
          }
        }
        &.douban {
          --item-primary: #{$douban-primary};
        }
        &.instagram {
          --item-primary: #{$instagram-primary};
          .background {
            background: $instagram-primary;
            background: $instagram-gradient;
          }
        }
        &.youtube {
          --item-primary: #{$youtube-primary};
        }
        &.wechat-channel {
          --item-primary: #{$wechat-channel-primary};
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          text-align: right;
          background: var(--item-primary);
          filter: opacity(0.8);
        }

        .icon {
          $size: $font-size-h1 * 8;
          position: absolute;
          left: -50%;
          bottom: -45%;
          width: $size;
          height: $size;
          line-height: $size;
          display: block;
          text-align: center;
          opacity: 0.1;

          .iconfont {
            font-size: $size;
            color: var(--item-primary);
          }
        }

        .qrcode {
          margin-top: $lg-gap;
          z-index: $z-index-normal + 1;
          .image {
            width: 12rem;
            @include radius-box($sm-radius);
          }
        }

        .link {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-bottom: $sm-gap;
          padding-bottom: 2px;
          border-bottom: 2px solid;
          font-weight: bold;
          color: var(--item-primary);
          opacity: 0.8;
          transition: opacity $transition-time-fast;
          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .calendar {
      margin-bottom: $gap * 2;
      padding: $gap;
      border-radius: $lg-radius;
      @include common-bg-module();
    }

    .maps {
      $size: 210px;
      position: relative;
      display: flex;
      width: 100%;
      margin-bottom: $gap * 2;

      .location .map,
      .location .living,
      .roadmap {
        padding: $sm-gap;
        @include common-bg-module();
        @include radius-box($lg-radius);
      }

      .location {
        display: flex;
        flex-direction: column;
        flex-shrink: 1;
        margin-right: $gap * 2;
        height: calc(#{$size} + #{$sm-gap * 2});

        .map {
          width: calc(#{$size} + #{$sm-gap});

          .iframe {
            width: 100%;
            height: 100%;
            @include radius-box($xs-radius);
          }
        }

        .living {
          flex-shrink: 0;
          display: inline-flex;
          margin-top: $lg-gap;
          padding: 0 1em;
          width: 100%;
          height: 4em;
          line-height: 4em;
          color: $text-secondary;

          .iconfont {
            margin-right: $sm-gap;
          }
          .text {
            font-weight: bold;
          }
        }
      }

      .roadmap {
        flex: 1;
        overflow: hidden;
        @extend .center-placeholder;

        .wrapper {
          $google-bar: 54px;
          position: relative;
          height: $size;
          border-radius: $xs-radius;
          overflow: hidden;

          .fullscreen {
            position: absolute;
            top: $gap;
            right: $gap;
            z-index: $z-index-normal + 1;
            display: block;
            width: 2em;
            height: 2em;
            border-radius: $xs-radius;
            background-color: $module-bg;
            font-size: $font-size-h4;
            color: $text-secondary;
            @include background-transition();
            @include backdrop-blur(1px);
            &:hover {
              color: $text;
              background-color: $module-bg-opaque;
            }
          }

          .iframe {
            width: 100%;
            height: $size + $google-bar;
            margin-top: -$google-bar;
          }
        }
      }
    }

    .footer-links {
      display: flex;
      justify-content: space-between;
      margin-bottom: $gap * 2;
      padding: 2rem;
      @include common-bg-module();
      @include radius-box($lg-radius);

      .item {
        font-weight: bold;
        border-bottom: 1px solid;
      }

      .speciallinks {
        .item {
          color: $text-disabled;
          &:hover {
            color: $text;
          }
        }
      }
    }
  }
</style>
