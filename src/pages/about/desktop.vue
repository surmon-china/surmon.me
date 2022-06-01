<template>
  <div class="about-page" :class="{ dark: isDarkTheme }">
    <div class="banner">
      <div class="background">
        <video class="video" loop muted autoplay :controls="false">
          <source :src="backgroundVideo" type="video/mp4" />
        </video>
      </div>
      <div class="avatar">
        <uimage class="image" :src="getAdminAvatar(adminInfo.data?.avatar)" />
        <h1 class="name">{{ adminInfo.data?.name || '-' }}</h1>
        <p class="role">{{ adminInfo.data?.slogan || '-' }}</p>
        <p class="bio-text">
          <webfont bolder>
            <i18n v-bind="i18ns.biography" />
          </webfont>
        </p>
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
            <button class="item wechat" @click="handleOpenWechat">
              <i class="iconfont icon-wechat" />
              <client-only>
                <popup v-model:visible="modalState.wechat" :scroll-close="false">
                  <div class="qrcode-modal wechat">
                    <div class="background"></div>
                    <uimage class="image" cdn src="/images/qrcodes/wechat.jpg" />
                    <span class="text">
                      👋 &nbsp;
                      <i18n en="Friend me on WeChat" zh="扫码加微，解锁灵魂"></i18n>
                    </span>
                  </div>
                </popup>
              </client-only>
            </button>
            <ulink class="item linkedin" :href="VALUABLE_LINKS.LINKEDIN">
              <i class="iconfont icon-linkedin" />
            </ulink>
            <ulink class="item douban" :href="VALUABLE_LINKS.DOUBAN">
              <i class="iconfont icon-douban" />
            </ulink>
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="links">
        <template :key="index" v-for="(item, index) in links">
          <component
            class="item"
            :class="item.class"
            :is="item.onClick ? 'button' : 'ulink'"
            :href="item.href"
            :to="item.route"
            @click="item.onClick"
          >
            <span class="left">
              <i class="iconfont" :class="item.icon"></i>
              <span class="text"><i18n v-bind="item.i18n" /></span>
            </span>
            <span class="right">
              <i class="iconfont icon-next"></i>
            </span>
          </component>
        </template>
      </div>
      <div class="statistics">
        <github-statistic />
        <npm-statistic />
        <twitter-statistic />
        <douban-statistic />
      </div>
      <div class="plogs">
        <instagram-media />
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
            <iframe class="iframe" :src="VALUABLE_LINKS.GOOGLE_ROAD_MAP" frameborder="0" />
            <client-only>
              <popup v-model:visible="modalState.roadMap">
                <iframe
                  :src="VALUABLE_LINKS.GOOGLE_ROAD_MAP"
                  allowfullscreen
                  frameborder="0"
                  class="roadmap-modal"
                />
              </popup>
            </client-only>
          </div>
        </div>
      </div>
      <div class="calendar">
        <aggregate-calendar />
      </div>
      <div class="footer-links">
        <div class="friendlinks">
          <template v-for="(link, index) in appOption.data?.friend_links || []" :key="index">
            <divider type="vertical" size="lg" v-if="index !== 0" />
            <a :href="link.value" class="item" target="_blank" rel="external nofollow noopener">
              {{ link.name }}
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
  import { defineComponent, reactive } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { useStores } from '/@/stores'
  import { useUniversalFetch } from '/@/universal'
  import { getPageRoute } from '/@/transforms/route'
  import { getTargetStaticURL } from '/@/transforms/url'
  import { GAEventCategories } from '/@/constants/gtag'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import AggregateCalendar from './calendar/index.vue'
  import InstagramMedia from './media/instagram.vue'
  import DoubanStatistic from './statistic/douban.vue'
  import GithubStatistic from './statistic/github.vue'
  import TwitterStatistic from './statistic/twitter.vue'
  import NpmStatistic from './statistic/npm.vue'
  import { useAboutPageMeta, getAdminAvatar, i18ns, SPECIAL_LINKS } from './shared'

  export default defineComponent({
    name: 'DesktopAboutPage',
    components: {
      AggregateCalendar,
      DoubanStatistic,
      GithubStatistic,
      NpmStatistic,
      TwitterStatistic,
      InstagramMedia
    },
    setup() {
      const { gtag, globalState, isZhLang, isDarkTheme } = useEnhancer()
      const { adminInfo, appOption } = useStores()

      const handleGTagEvent = (event: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.About
        })
      }

      const modalState = reactive({
        roadMap: false,
        wechat: false
      })

      const handleOpenWechat = () => {
        modalState.wechat = true
        handleGTagEvent('wechat_modal')
      }

      const handleOpenMap = () => {
        modalState.roadMap = true
        handleGTagEvent('roadmap_modal')
      }

      const handleSponsor = () => {
        globalState.toggleSwitcher('sponsor', true)
        handleGTagEvent('sponsor_modal')
      }

      const handleStatement = () => {
        globalState.toggleSwitcher('statement', true)
        handleGTagEvent('statement_modal')
      }

      const handleFeedback = () => {
        globalState.toggleSwitcher('feedback', true)
        handleGTagEvent('feedback_modal')
      }

      // MARK: 非常有必要，vite 对 video.source.src 的解析有问题，会将其认为是 asset，而非 static resource，从而编译失败
      const backgroundVideo = getTargetStaticURL('/assets/page-about-background.mp4')

      // meta
      useAboutPageMeta()
      // prefetch
      useUniversalFetch(() => Promise.all([adminInfo.fetch(), appOption.fetch()]))

      const links = [
        {
          class: 'lens',
          icon: 'icon-lens',
          i18n: i18ns.lens,
          route: getPageRoute(RouteName.Lens)
        },
        {
          class: 'merch',
          icon: 'icon-rubik',
          i18n: i18ns.merchBar,
          route: getPageRoute(RouteName.Merch)
        },
        {
          class: 'archive',
          icon: 'icon-quill',
          i18n: i18ns.archive,
          route: getPageRoute(RouteName.Archive)
        },
        {
          class: 'guestbook',
          icon: 'icon-comment',
          i18n: i18ns.guestbook,
          route: getPageRoute(RouteName.Guestbook)
        },
        {
          class: 'feedback',
          icon: 'icon-mail-plane',
          i18n: i18ns.feedback,
          onClick: handleFeedback
        },
        {
          class: 'telegram',
          icon: 'icon-telegram',
          i18n: i18ns.telegramGroup,
          href: VALUABLE_LINKS.TELEGRAM_GROUP
        },
        {
          class: 'discord',
          icon: 'icon-discord',
          i18n: i18ns.discordGroup,
          href: VALUABLE_LINKS.DISCORD_GROUP
        },
        {
          class: 'sponsor',
          icon: 'icon-heart',
          i18n: i18ns.sponsor,
          onClick: handleSponsor
        },
        {
          class: 'statement',
          icon: 'icon-faq',
          i18n: i18ns.statement,
          onClick: handleStatement
        },
        {
          class: 'rss',
          icon: 'icon-rss',
          i18n: i18ns.rss,
          href: VALUABLE_LINKS.RSS
        }
      ]

      return {
        i18ns,
        links,
        VALUABLE_LINKS,
        SPECIAL_LINKS,
        isZhLang,
        isDarkTheme,
        modalState,
        backgroundVideo,
        adminInfo,
        appOption,
        getAdminAvatar,
        handleGTagEvent,
        handleFeedback,
        handleStatement,
        handleOpenMap,
        handleOpenWechat
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .qrcode-modal {
    $image-size: 16rem;
    width: 23rem;
    height: 28rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.wechat {
      --item-primary: #{$wechat-primary};
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 45%;
      background: var(--item-primary);
    }

    .image {
      z-index: $z-index-normal + 1;
      width: $image-size;
      height: $image-size;
      margin-bottom: 2rem;
      background-color: $module-bg-opaque;
      @include radius-box($sm-radius);
    }

    .text {
      font-weight: bold;
      color: var(--item-primary);
    }
  }

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
      $banner-height: 20rem;
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
        background-image: url('/images/page-about/background.png'),
          linear-gradient($module-bg-opaque 40%, #00000000 100%);
        background-size: contain;
        background-repeat: repeat-x;
        background-blend-mode: lighten;

        > .image {
          $size: 8rem;
          width: $size;
          height: $size;
          z-index: $z-index-normal + 2;
          box-sizing: content-box;
          margin-top: $banner-height - 4rem;
          border: 8px solid $module-bg;
          border-radius: 100%;
          overflow: hidden;
          background-color: $module-bg;
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

        .name {
          margin-top: $sm-gap;
          margin-bottom: $gap;
        }

        .bio-text {
          margin-bottom: $gap * 2;
          font-size: $font-size-h3;
        }

        .socials {
          $button-size: 3rem;
          display: flex;
          justify-content: center;
          height: $button-size;
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
            display: flex;

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

              &.wechat {
                background-color: $wechat-primary;
              }
              &.telegram {
                background-color: $telegram-primary;
              }
              &.douban {
                background-color: $douban-primary;
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

    .links {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: $gap * 2;
      width: 100%;
      margin-bottom: 2rem;

      .item {
        height: 5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em 0 2em;
        @include common-bg-module($transition-time-fast);
        @include radius-box($lg-radius);
        &.discord {
          --item-primary: #{$discord-primary};
          --item-hover: white;
        }
        &.telegram {
          --item-primary: #{$telegram-primary};
          --item-hover: white;
        }
        &.sponsor {
          --item-primary: #{$red};
          --item-hover: white;
        }
        &.statement {
          --item-primary: #{$surmon};
          --item-hover: white;
        }
        &.rss {
          --item-primary: #{$rss-primary};
          --item-hover: white;
        }
        &:hover {
          background-color: var(--item-primary, $primary);
          .left {
            .iconfont,
            .text {
              color: var(--item-hover, $text-reversal);
            }
          }

          .right {
            opacity: 1;
            transform: translateX(-$sm-gap);
            color: var(--item-hover, $text-reversal);
          }
        }

        .left {
          .iconfont {
            font-size: $font-size-h3;
            margin-right: 0.8em;
            color: var(--item-primary, $primary);
          }

          .text {
            letter-spacing: 1px;
            color: $text-secondary;
            font-size: $font-size-h4;
            font-weight: bold;
          }
        }

        .right {
          color: $text-divider;
          opacity: 0.4;
          transition: opacity $transition-time-fast, transform $transition-time-normal;
        }
      }
    }

    .statistics {
      margin-bottom: $gap * 2;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap * 2;
    }

    .plogs,
    .vlogs,
    .calendar {
      margin-bottom: $gap * 2;
      border-radius: $lg-radius;
      padding: $gap;
      @include common-bg-module();
    }

    .maps {
      $size: 200px;
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
          padding: 0 1rem;
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
          $google-bar: 67px;
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
      padding: 2rem $lg-gap;
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
