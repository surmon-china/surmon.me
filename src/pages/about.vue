<template>
  <div class="about-page" :class="{ mobile: isMobile }">
    <div class="about-me">
      <div class="description">
        <div class="item">
          <i class="iconfont icon-swordsman" />
          <p class="bio">
            <i18n
              zh="浪蝶游蜂，迈步九云中"
              en="I'm Surmon, a digital nomad."
            />
          </p>
        </div>
        <div class="item">
          <i class="iconfont icon-dollar"></i>
          <a
            target="_blank"
            href="https://github.com/sponsors/surmon-china"
            rel="external nofollow noopener"
            @mousedown="handleTouchSponsor"
          >GitHub Sponsor</a>
          <span class="separator">|</span>
          <a
            target="_blank"
            href="https://www.paypal.me/surmon"
            rel="external nofollow noopener"
            @mousedown="handleTouchSponsor"
          >PayPal me</a>
          <span class="separator">|</span>
          <a
            target="_blank"
            href="/sponsor"
            rel="external nofollow noopener"
            @mousedown="handleTouchSponsor"
          >More</a>
        </div>
        <div class="item">
          <i class="iconfont icon-comment-discussion" />
          <a
            target="_blank"
            rel="external nofollow noopener"
            href="https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4"
          >
            <i18n zh="寂寞同性交友群" en="QQ group" />
          </a>
          <span class="separator">|</span>
          <a
            target="_blank"
            rel="external nofollow noopener"
            href="https://t.me/joinchat/F6wOlxYwSCUpZTYj3WTAWA"
          >
            <i18n zh="电报群" en="Telegram group" />
          </a>
        </div>
        <div class="item">
          <i class="iconfont icon-music" />
          <span class="music">
            <router-link to="/music">Jazz-HipHop, Electronic, Disco, Rock, Popular</router-link>
            <a
              href="https://open.spotify.com/user/v0kz9hpwpbqnmtnrfhbyl812o"
              target="_blank"
              class="spotify"
              rel="external nofollow noopener"
            >
              <i class="iconfont icon-spotify" />
            </a>
            <a
              href="https://music.163.com/#/playlist?id=638949385"
              target="_blank"
              class="music-163"
              rel="external nofollow noopener"
            >
              <i class="iconfont icon-163music-logo" />
            </a>
          </span>
        </div>
        <div class="item">
          <i class="iconfont icon-social" />
          <span class="social-media-accounts">
            <span class="normal">
              <a
                href="https://github.com/surmon-china"
                target="_blank"
                class="item github"
                rel="external nofollow noopener"
              >
                <i class="iconfont icon-github" />
                <span class="text">GitHub</span>
              </a>
              <a
                href="https://twitter.com/surmon_me"
                target="_blank"
                class="item twitter"
                rel="external nofollow noopener"
              >
                <i class="iconfont icon-twitter" />
                <span class="text">Twitter</span>
              </a>
              <a
                href="https://www.instagram.com/surmon666"
                target="_blank"
                class="item instagram"
                rel="external nofollow noopener"
              >
                <i class="iconfont icon-instagram" />
                <span class="text">Instagram</span>
              </a>
            </span>
            <desktop-only>
              <span class="mini">
                <a
                  href="https://t.me/surmon"
                  target="_blank"
                  class="item telegram"
                  rel="external nofollow noopener"
                >
                  <i class="iconfont icon-telegram" />
                </a>
                <a
                  href="https://www.linkedin.com/in/surmon"
                  target="_blank"
                  class="item linkedin"
                  rel="external nofollow noopener"
                >
                  <i class="iconfont icon-linkedin" />
                </a>
                <a
                  href="https://www.douban.com/people/nocower"
                  target="_blank"
                  class="item douban"
                  rel="external nofollow noopener"
                >
                  <i class="iconfont icon-douban" />
                </a>
                <a
                  href="https://www.zhihu.com/people/surmon"
                  target="_blank"
                  class="item zhihu"
                  rel="external nofollow noopener"
                >
                  <i class="iconfont icon-zhihu" />
                </a>
                <a
                  href="https://space.bilibili.com/27940710"
                  target="_blank"
                  class="item bilibili"
                  rel="external nofollow noopener"
                >
                  <i class="iconfont icon-bilibili" />
                </a>
                <a
                  href="https://stackoverflow.com/users/6222535/surmon?tab=profile"
                  target="_blank"
                  class="item stackoverflow"
                  rel="external nofollow noopener"
                  v-if="false"
                >
                  <i class="iconfont icon-stackoverflow" />
                </a>
                <a
                  href="https://leetcode-cn.com/u/surmon"
                  bak-href="https://leetcode.com/surmon"
                  target="_blank"
                  class="item algorithm"
                  rel="external nofollow noopener"
                  v-if="false"
                >
                  <i class="iconfont icon-leetcode" />
                </a>
                <a
                  href="https://www.quora.com/profile/Surmon/activity"
                  target="_blank"
                  class="item quora"
                  rel="external nofollow noopener"
                >
                  <i class="iconfont icon-quora" />
                </a>
              </span>
            </desktop-only>
          </span>
        </div>
        <div class="item">
          <i class="iconfont icon-like" />
          <span class="like-text">
            <i18n
              zh="酒池肉林、日夜笙歌、依翠偎红、五音六律、目营心匠、桀骜不羁"
              en="code. beauty. whisky. music. vagrant."
            />
          </span>
        </div>
        <div class="item">
          <i class="iconfont icon-tibet-1" />
          <span class="my-map" @click="toggleLiveMap">
            <i18n
              zh="路为纸，地成册，行作笔，心当墨；思无界，行有疆"
              en="Every path I went astray built my Rome."
            />
          </span>
          <popup :visible="isOnLiveMap" @close="toggleLiveMap">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w"
              frameborder="0"
              class="live-map"
            />
          </popup>
        </div>
        <div class="item">
          <i class="iconfont icon-friend" />
          <span class="friends">
            <a
              v-for="(link, name) in APP_CONFIG.FRIEND_LINKS"
              :key="link"
              :href="link"
              target="_blank"
              rel="external nofollow noopener"
            >「 {{ name }} 」</a>
          </span>
        </div>
      </div>
      <div class="gravatar">
        <div class="background be-2">
          <uimage
            cdn
            class="image"
            alt="background"
            src="/images/page-about/background-be-2.jpg"
          />
        </div>
        <div class="background be-1">
          <uimage
            cdn
            class="image"
            alt="background"
            src="/images/page-about/background-be-1.jpg"
          />
        </div>
        <div class="background star-1">
          <uimage
            cdn
            class="image"
            alt="background-star"
            src="/images/page-about/background-star-1.png"
          />
        </div>
        <div class="background star-2">
          <uimage
            cdn
            class="image"
            alt="background-star"
            src="/images/page-about/background-star-2.png"
          />
        </div>
        <img :src="gravatar" class="avatar" draggable="false">
        <div class="description">
          <h3 class="name">
            <strong>Surmon</strong>
          </h3>
          <p class="skill">
            <i18n zh="数字游民" en="Digital nomad" />
          </p>
        </div>
        <desktop-only>
          <span class="followme" v-i18n="LANGUAGE_KEYS.FRIEND_ME" />
          <div class="wechat" @mouseenter="handleHoverFollowMe">
            <uimage
              cdn
              class="qrcode"
              src="/images/page-about/wechat-qrcode.jpg"
            />
            <span class="tooltip">
              <i18n zh="扫码加微，解锁灵魂" en="Scan the QR code in WeChat" />
            </span>
          </div>
        </desktop-only>
      </div>
    </div>
    <template v-if="AD_CONFIG.aboutPageSwiper">
      <desktop-only>
        <div class="mammon">
          <swiper class="swiper" :options="adSwiperOption">
            <swiper-slide
              v-for="(item, index) in AD_CONFIG.aboutPageSwiper"
              :key="index"
            >
              <a
                class="item"
                rel="external nofollow noopener"
                target="_blank"
                :href="item.url"
              >
                <img
                  :src="item.src"
                  :alt="item.alt || item.title"
                  :title="item.title || item.alt"
                >
              </a>
            </swiper-slide>
            <template #pagination>
              <div class="swiper-pagination" />
            </template>
          </swiper>
        </div>
      </desktop-only>
    </template>
    <div class="location-map">
      <iframe class="iframe" src="/partials/map.html" />
    </div>
    <div class="about-project">
      <a
        target="_blank"
        class="project-link"
        rel="external nofollow noopener"
        :href="APP_CONFIG.LINKS.project"
      >
        <p class="title">
          <i class="iconfont icon-terminal" />
          <span class="description">
            <i18n
              zh="更多动态"
              en="Get more"
            />
          </span>
        </p>
        <!-- TODO: 应该集成到 nodejs，否则不稳定 https://github.com/sallar/github-contributions-chart -->
        <img src="https://ghchart.rshah.org/surmon-china">
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, toRef } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'
  import AD_CONFIG from '/@/config/ad.config'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'About',
    /*
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.about + ' | '}About`
      }
    },
    fetch({ store }) {
      return store.dispatch('global/fetchAdminInfo')
    },
    */
    setup(props) {
      const { gtag, globalState, store, isMobile } = useEnhancer()
      const isOnLiveMap = toRef(globalState.switchBox, 'liveMap')
      const gravatar = computed(() => (
        store.state.option.adminInfo?.gravatar ||
        getFileCDNUrl('/images/gravatar.jpg')
      ))

      const handleHoverFollowMe = () => {
        gtag?.event('加微信码', {
          event_category: GAEventActions.View,
          event_label: GAEventTags.AboutPage
        })
      }

      const handleTouchSponsor = () => {
        gtag?.event('赞赏 Sponsor', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.AboutPage
        })
      }

      const toggleLiveMap = () => {
        globalState.switchTogglers.liveMap()
        if (globalState.switchBox.liveMap) {
          gtag?.event('轨迹地图', {
            event_category: GAEventActions.View,
            event_label: GAEventTags.AboutPage
          })
        }
      }

      const adSwiperOption = {
        loop: true,
        direction: 'vertical',
        autoplay: {
          delay: 2666,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        autoHeight: true,
        mousewheel: true,
        observeParents: true,
        preloadImages: false,
        lazy: true
      }

      return {
        APP_CONFIG,
        AD_CONFIG,
        LANGUAGE_KEYS,
        adSwiperOption,
        isMobile,
        isOnLiveMap,
        gravatar,
        handleHoverFollowMe,
        handleTouchSponsor,
        toggleLiveMap
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .live-map {
    width: 88vw;
    height: 88vh;
  }

  .about-page {
    width: 100%;
    overflow:  hidden;

    .about-me {
      width: 100%;
      height: auto;
      margin-bottom: $lg-gap;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      > .description {
        flex-grow: 1;
        padding: 2rem 3rem;
        background-color: $module-bg;
        @include radius-box($lg-radius);
        @include common-bg-module();

        > .item {
          line-height: 2.5em;
          min-height: 2.5em;
          margin-bottom: 1.2rem;
          &:last-child {
            margin-bottom: 0;
          }

          .separator {
            margin: 0 $sm-gap;
          }

          > .iconfont {
            width: 2em;
            margin-right: 1em;
            display: inline-block;
            font-size: $font-size-h4;
            text-align: center;
            color: $text-dividers;

            &.icon-social {
              color: #ffa800;
            }

            &.icon-tibet-1 {
              color: $primary;
            }

            &.icon-like {
              color: $red;
            }

            &.icon-friend {
              color: $accent;
            }
          }

          > .bio {
            display: inline-block;
            font-family: 'webfont-bolder', DINRegular;
            margin: 0;

            &::first-letter {
              font-size: $font-size-h2;
              margin-right: 2px;
            }
          }

          > .like-text {
            font-family: 'webfont-bolder', DINRegular;
          }

          > .my-map {
            cursor: pointer;
            border-bottom: 1px solid;
            font-family: 'webfont-bolder', DINRegular;
          }

          > .music {
            .spotify,
            .music-163 {
              margin-left: $xs-gap;
            }

            .spotify {
              color: $spotify-primary;
            }
            .music-163 {
              color: $music163-primary;
            }
          }

          > .friends {
            > a {
              margin-right: 1em;
              text-transform: capitalize;
            }
          }

          > .social-media-accounts {
            $button-size: 2rem;

            > .normal {
              > .item {
                display: inline-block;
                height: $button-size;
                line-height: $button-size;
                padding: 0 $sm-gap;
                margin-right: $sm-gap;
                border-radius: $sm-radius;
                color: $white;
                @include background-transition();

                .iconfont {
                  margin-right: $xs-gap;
                }

                .text {
                  font-size: $font-size-small;
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
                margin-right: $sm-gap;
                text-align: center;
                border-radius: 100%;
                color: $white;
                opacity: 0.8;
                @include visibility-transition();

                &:hover {
                  opacity: 1;
                }

                .iconfont {
                  font-size: $font-size-small;
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

      .gravatar {
        position: relative;
        width: 19rem;
        margin-left: $lg-gap;
        flex-grow: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        background-color: $module-bg;
        @include radius-box($lg-radius);
        @include common-bg-module();

        @keyframes aboutbg-be-1 {
          0% { transform: translate3d(0%, 0%, 0) }
          25% { transform: translate3d(-50%, -50%, 0) }
          50% { transform: translate3d(-50%, 0%, 0) }
          75% { transform: translate3d(0%, -50%, 0) }
          100% { transform: translate3d(0%, 0%, 0) }
        }

        @keyframes aboutbg-be-2 {
          0% { transform: translate3d(0%, 0%, 0) }
          25% { transform: translate3d(0%, -50%, 0) }
          50% { transform: translate3d(-20%, 0%, 0) }
          75% { transform: translate3d(-30%, -50%, 0) }
          100% { transform: translate3d(0%, 0%, 0) }
        }

        @keyframes aboutbg-star {
          0% { opacity: 1; }
          25% { opacity: .5; }
          50% { opacity: .8; }
          75% { opacity: .2; }
          100% { opacity: 1; }
        }

        > .background {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 26%;
          top: 0;
          right: 0;
          z-index: $z-index-normal;
          overflow: hidden;

          &.be-1 {
            opacity: .66;

            > .image {
              width: auto;
              height: 200%;
              animation: aboutbg-be-1 88s linear infinite;
            }
          }

          &.be-2 {
            opacity: 1;

            > .image {
              width: auto;
              height: 200%;
              animation: aboutbg-be-2 66s linear infinite;
            }
          }

          &.star-1,
          &.star-2 {
            width: auto;
            height: auto;
            right: 1rem;

            > .image {
              width: 5rem;
              height: auto;
              animation: aboutbg-star 6s linear infinite;
            }
          }
        }

        &:hover {
          > .avatar {
            transform: rotate(360deg);
          }

          > .wechat {
            @include visible();
          }
        }

        > .avatar {
          width: 8rem;
          height: 8rem;
          z-index: $z-index-normal + 2;
          margin-top: 5rem;
          max-width: 100%;
          border-radius: 100%;
          border: 5px solid $module-bg;
          box-sizing: content-box;
          transition: transform $transition-time-slow;
        }

        > .description {
          text-align: center;
          color: $text;

          > .skill {
            margin-top: .466rem;
          }
        }

        > .followme {
          margin-top: 1.666rem;
          display: inline-block;
          color: $primary;
          border: 1px solid $primary;
          border-radius: $xs-radius;
          width: 56%;
          height: 2.68rem;
          text-align: center;
          line-height: 2.46rem;

          &:hover {
            color: $text-reversal;
            background-color: $primary;
          }
        }

        > .wechat {
          position: absolute;
          left: 0;
          bottom: 0rem;
          width: 100%;
          height: 74%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: $z-index-normal + 1;
          @include hidden();
          @include visibility-transition();

          .qrcode {
            margin-top: 3rem;
            margin-bottom: $gap;
            width: 80%;
          }

          .tooltip {
            color: $text;
            font-size: $font-size-small;
          }
        }
      }
    }

    .mammon {
      width: 100%;
      margin-bottom: $lg-gap;
      background-color: $module-bg;
      @include radius-box($lg-radius);

      .swiper {
        height: 6rem;

        img {
          width: 100%;
          @include hover-effect();
        }
      }
    }

    .location-map {
      overflow: hidden;
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      background-color: $module-bg;
      @include radius-box($lg-radius);
      @include common-bg-module();

      iframe {
        width: 100%;
        height: 19rem;
        border-radius: $xs-radius;
      }
    }

    .about-project {
      overflow: hidden;
      position: relative;
      display: flex;
      width: 100%;
      height: 12rem;

      .project-link {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        @include common-bg-module();
        @include radius-box($lg-radius);

        .title {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-right: $lg-gap * 3;

          .iconfont {
            font-size: 4em;
            color: #98c471;
            line-height: 1em;
            padding: 0;
            margin-top: $sm-gap;
            margin-bottom: $gap;
          }
          .description {
            $color: rgb(214, 229, 133);
            display: block;
            line-height: 1.7em;
            text-align: center;
            padding: 0 .2em;
            color: $color;
            border: 1px solid $color;
            font-size: $font-size-small;
          }
        }
      }
    }

    &.mobile {
      margin: 0;

      > .about-me,
      > .location-map {
        margin-bottom: $gap;
      }

      > .about-me {
        flex-direction: column-reverse;

        > .gravatar {
          width: 100%;
          margin-left: 0;
          margin-bottom: $gap;
          flex-direction: row;
          padding: $lg-gap 0;

          > .background {
            height: 100%;

            &.star-1,
            &.star-2 {
              > .image {
                width: 4rem;
              }
            }

            > .image {
              width: 200%;
              height: auto;
            }
          }

          > .avatar {
            width: 6rem;
            height: 6rem;
            margin-top: 0;
            margin-left: 6%;
          }

          > .description {
            width: 50%;
            margin-left: 5%;
            text-align: left;
            z-index: $z-index-normal + 1;
            color: $text-reversal;

            > .name,
            > .skill {
              margin: 1rem 0;
            }
          }

          > .favorite {
            margin: 1rem 0;
            margin-bottom: 2rem;
          }
        }

        > .description {
          width: 100%;
          padding: 1em;
          overflow: hidden;

          > .item {
            @include text-overflow();

            > .iconfont {
              margin-right: $sm-gap;
            }
          }
        }
      }

      > .location-map {
        > .iframe {
          height: 11rem;
        }
      }

      > .about-project {
        > .project-link {
          height: 10rem;

          > .title {
            font-size: 2em;
          }
        }
      }
    }
  }
</style>
