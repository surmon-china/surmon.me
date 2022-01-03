<template>
  <div class="about-page">
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
            <ulink class="item bilibili" :href="VALUABLE_LINKS.BILIBILI">
              <i class="iconfont icon-bilibili" />
            </ulink>
            <ulink class="item zhihu" :href="VALUABLE_LINKS.ZHIHU">
              <i class="iconfont icon-zhihu" />
            </ulink>
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="profile">
        <div class="content">
          <div class="item">
            <i class="iconfont icon-swordsman" />
            <span class="roadmap" :class="language" @click="toggleRoadMap">
              <i18n v-bind="i18ns.roadmap" />
            </span>
            <client-only>
              <popup :visible="isOnLiveMap" @close="toggleRoadMap">
                <iframe :src="VALUABLE_LINKS.GOOGLE_LIVE_MAP" frameborder="0" class="roadmap" />
              </popup>
            </client-only>
          </div>
          <div class="item">
            <i class="iconfont icon-music" />
            <span class="music">
              <router-link :to="getPageRoute(RouteName.Music)">
                Techno, Electronic, Disco, Rock, Popular
              </router-link>
              <ulink class="spotify" :href="VALUABLE_LINKS.SPOTIFY">
                <i class="iconfont icon-spotify" />
              </ulink>
              <ulink class="music-163" :href="VALUABLE_LINKS.MUSIC_163">
                <i class="iconfont icon-163music-logo" />
              </ulink>
            </span>
          </div>
          <div class="item">
            <i class="iconfont icon-coffee" />
            <router-link class="text-link" :to="getPageRoute(RouteName.Job)">
              <i18n v-bind="i18ns.findJob" />
            </router-link>
            <divider type="vertical" />
            <router-link class="text-link" :to="getPageRoute(RouteName.Freelancer)">
              <i18n v-bind="i18ns.hireMe" />
            </router-link>
            <divider type="vertical" />
            <router-link class="text-link" :to="getPageRoute(RouteName.Lens)">
              <i18n v-bind="i18ns.followMe" />
            </router-link>
            <divider type="vertical" />
            <router-link class="text-link" :to="getPageRoute(RouteName.Merch)">
              <i18n v-bind="i18ns.merchBar" />
            </router-link>
          </div>
          <div class="item">
            <i class="iconfont icon-discussion" />
            <ulink class="text-link" :href="VALUABLE_LINKS.QQ_GROUP">
              <i18n v-bind="i18ns.QQGroup" />
            </ulink>
            <divider type="vertical" />
            <ulink class="text-link" :href="VALUABLE_LINKS.TELEGRAM_GROUP">
              <i18n v-bind="i18ns.TelegramGroup" />
            </ulink>
          </div>
          <div class="item">
            <i class="iconfont icon-friend" />
            <span class="friends">
              <a
                v-for="(link, name) in FRIEND_LINKS"
                :key="link"
                :href="link"
                class="link"
                target="_blank"
                rel="external nofollow noopener"
              >
                {{ name }}
              </a>
            </span>
            <span>...</span>
          </div>
        </div>
        <div class="wechat">
          <div class="qrcode">
            <uimage cdn class="image" src="/images/page-about/wechat.jpg" />
            <div class="slogan">
              <span class="text">
                <i18n zh="扫码加微，点燃灵魂" en="Scan the QR code on WeChat" />
              </span>
            </div>
          </div>
          <div class="cover" @mouseenter="handleGTagEvent('wechat_qrcode')">
            <div class="friend-me">
              <i class="iconfont icon-wechat"></i>
              <i18n zh="众里寻他" en="WeChat" />
            </div>
          </div>
        </div>
      </div>
      <div class="location-box">
        <iframe class="iframe" src="/partials/map.html" />
      </div>
      <div class="github-box">
        <div class="sponsors">
          <ulink
            class="button github"
            :href="VALUABLE_LINKS.GITHUB_SPONSORS"
            @mousedown="handleGTagEvent('sponsor_github_link')"
          >
            <i class="iconfont icon-heart" />
            <span class="text">Sponsor me</span>
          </ulink>
          <ulink
            class="button paypal"
            :href="VALUABLE_LINKS.PAYPAL"
            @mousedown="handleGTagEvent('sponsor_paypal_link')"
          >
            <i class="iconfont icon-paypal" />
            <span class="text">PayPal me</span>
          </ulink>
          <ulink
            class="button more"
            :href="VALUABLE_LINKS.SPONSOR"
            @mousedown="handleGTagEvent('sponsor_more_payment_link')"
          >
            <i class="iconfont icon-qrcode" />
            <span class="text">More payment</span>
          </ulink>
        </div>
        <span class="divider"></span>
        <uimage cdn class="pal" src="/images/page-about/peace-and-love.jpg" />
        <span class="divider"></span>
        <ulink
          class="homepage-link"
          :href="VALUABLE_LINKS.GITHUB"
          @mousedown="handleGTagEvent('github_chart_link')"
        >
          <uimage cdn src="/ghchart.svg" />
        </ulink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, toRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { useMetaStore } from '/@/store/meta'
  import { useUniversalFetch } from '/@/universal'
  import { getPageRoute } from '/@/transforms/route'
  import { getTargetStaticURL } from '/@/transforms/url'
  import { GAEventCategories } from '/@/constants/gtag'
  import { VALUABLE_LINKS, FRIEND_LINKS } from '/@/config/app.config'
  import { useAboutPageMeta, getAdminAvatar, i18ns } from './helper'

  export default defineComponent({
    name: 'PCAboutPage',
    setup() {
      const { i18n, gtag, globalState } = useEnhancer()
      const metaStore = useMetaStore()
      const isOnLiveMap = toRef(globalState.switchBox, 'liveMap')
      const adminInfo = computed(() => metaStore.adminInfo.data)
      // MARK: 非常有必要，vite 对 video.source.src 的解析有问题，会将其认为是 asset，而非 static resource，从而编译失败
      const backgroundVideo = getTargetStaticURL('/assets/page-about-background.mp4')

      // meta
      useAboutPageMeta()
      // prefetch
      useUniversalFetch(() => metaStore.fetchAdminInfo())

      const handleGTagEvent = (event: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.About
        })
      }

      const toggleRoadMap = () => {
        globalState.switchTogglers.liveMap()
        handleGTagEvent('roadmap')
      }

      return {
        i18ns,
        language: i18n.language,
        VALUABLE_LINKS,
        FRIEND_LINKS,
        RouteName,
        getAdminAvatar,
        getPageRoute,
        isOnLiveMap,
        backgroundVideo,
        adminInfo,
        handleGTagEvent,
        toggleRoadMap
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .roadmap {
    width: 88vw;
    height: 88vh;
  }

  .about-page {
    width: 100%;
    overflow: hidden;

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

        &:hover {
          .image {
            transform: rotate(360deg);
          }
        }

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

              .iconfont {
                font-size: $font-size-h4;
                margin-right: $sm-gap;
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
              &.instagram {
                opacity: 0.8;
                margin: 0;
                background: $instagram-primary;
                background: $instagram-gradient;
                @include visibility-transition();
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
              @include visibility-transition();

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
              &.weibo {
                background-color: $weibo-primary;
              }
              &.bilibili {
                background-color: $bilibili-pink-primary;
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

    .profile {
      width: 100%;
      height: auto;
      display: flex;
      overflow: hidden;
      margin-bottom: $gap * 2;

      .content {
        flex-grow: 1;
        padding: $gap * 2 $lg-gap * 2;
        position: relative;
        @include common-bg-module();
        @include radius-box($lg-radius);
        font-size: $font-size-h5 + 1;

        > .item {
          line-height: 2.5em;
          min-height: 2.5em;
          margin-bottom: $lg-gap;
          font-weight: bold;
          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            > .iconfont {
              opacity: 0.7;
            }
          }

          .iconfont {
            font-weight: normal;
          }

          > .iconfont {
            $size: 2rem;
            width: $size;
            height: $size;
            margin-right: 1em;
            opacity: 0.4;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: $sm-radius;
            text-align: center;
            color: $white;
            transition: opacity $transition-time-fast;

            &.icon-swordsman {
              background-color: #9d1c33;
            }
            &.icon-coffee {
              background-color: $instagram-primary;
            }
            &.icon-music {
              background-color: $music163-primary;
            }
            &.icon-discussion {
              background-color: $telegram-primary;
            }
            &.icon-friend {
              background-color: $accent;
            }
          }

          .text-link {
            font-weight: bold;
            padding-bottom: 2px;
            border-bottom: 1px solid;
          }

          .roadmap {
            cursor: pointer;
            border-bottom: 1px solid;
            font-weight: normal;
            font-family: 'webfont-bolder', DINRegular;
            &.en {
              font-weight: bold;
            }
          }

          > .music {
            .spotify,
            .music-163 {
              margin-left: $sm-gap;
            }
            .spotify {
              color: $spotify-primary;
            }
            .music-163 {
              color: $music163-primary;
            }
          }

          > .friends {
            .link {
              margin-right: 1.8rem;
              text-transform: capitalize;
              font-weight: bold;
              padding-bottom: 2px;
              border-bottom: 1px solid;
            }
          }
        }
      }

      .wechat {
        position: relative;
        display: block;
        width: 22rem;
        overflow: hidden;
        margin-left: $gap * 2;
        padding: 1rem;
        @include common-bg-module();
        @include radius-box($lg-radius);

        .qrcode {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          @include radius-box($sm-radius);

          .image {
            width: 100%;
          }
          .slogan {
            flex-grow: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            text-align: center;
            color: #555;

            .text {
              font-weight: bold;
              border-bottom: 1px solid $text;
              padding-bottom: 0.5em;
            }
          }
        }
        .cover {
          /* opacity: 0; */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: $module-bg;
          backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: transparent;
            backdrop-filter: none;
            .friend-me {
              visibility: hidden;
            }
          }

          .friend-me {
            display: block;
            border: 1px solid;
            border-radius: $xs-radius;
            padding: 1em;
            font-weight: bold;
            writing-mode: vertical-lr;
            letter-spacing: 1em;
            text-transform: uppercase;

            .iconfont {
              font-weight: normal;
            }
          }
        }
      }
    }

    .location-box {
      overflow: hidden;
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $gap * 2;
      @include radius-box($lg-radius);
      @include common-bg-module();

      iframe {
        width: 100%;
        height: 19rem;
        border-radius: $xs-radius;
      }
    }

    .github-box {
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 12rem;
      margin-bottom: $gap * 2;
      @include common-bg-module();
      @include radius-box($lg-radius);

      .sponsors {
        display: inline-flex;
        flex-direction: column;

        .button {
          $button-size: 2.4rem;
          display: inline-flex;
          width: 100%;
          margin-bottom: $gap;
          line-height: $button-size;
          color: $white;
          @include radius-box($xs-radius);
          @include background-transition();
          &:last-child {
            margin: 0;
          }

          .iconfont {
            width: $button-size;
            height: $button-size;
            line-height: $button-size;
            text-align: center;
          }
          .text {
            padding: 0 $sm-gap;
            font-weight: bold;
            font-size: $font-size-small;
          }

          &.github,
          &.paypal,
          &.more {
            opacity: 0.9;
            @include visibility-transition();
            &:hover {
              opacity: 1;
            }
          }
          &.github {
            background-color: $github-primary;
            .iconfont {
              background-color: $github-primary-hover;
              color: $github-sponsor-primary;
            }
          }
          &.paypal {
            background-color: $paypal-primary;
            .iconfont {
              background-color: $paypal-primary-hover;
              color: $paypal-primary;
            }
          }
          &.more {
            background-color: rgba($accent, 0.8);
            .iconfont {
              background-color: $accent;
            }
          }
        }
      }

      .pal {
        display: block;
        height: 110px;
        @include radius-box($lg-radius);
      }

      .divider {
        height: 60%;
        width: 1px;
        background-color: $module-bg-darker-1;
        opacity: 0.5;
      }

      .homepage-link {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
