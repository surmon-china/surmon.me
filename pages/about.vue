<template>
  <div class="about-page" :class="{ mobile: isMobile }">
    <div class="about-me">
      <div class="description">
        <div class="item">
          <i class="iconfont icon-swordsman" />
          <p class="bio">
            <span>{{ isEnLang ? `I'm Surmon, a digital nomad.` : `浪蝶游蜂，迈步九云中` }}</span>
          </p>
        </div>
        <div class="item">
          <i class="iconfont icon-dollar"></i>
          <a
            target="_blank"
            href="https://github.com/sponsors/surmon-china"
            rel="external nofollow noopenter"
            @mousedown="handleSponsor"
          >GitHub Sponsor</a>
          <span>&nbsp;|&nbsp;</span>
          <a
            target="_blank"
            href="https://www.paypal.me/surmon"
            rel="external nofollow noopenter"
            @mousedown="handleSponsor"
          >PayPal me</a>
          <span>&nbsp;|&nbsp;</span>
          <a
            target="_blank"
            href="/sponsor"
            rel="external nofollow noopenter"
            @mousedown="handleSponsor"
          >More</a>
        </div>
        <div class="item">
          <i class="iconfont icon-comment-discussion" />
          <a
            target="_blank"
            rel="external nofollow noopenter"
            href="https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4"
          >
            <span>{{ isEnLang ? 'QQ group' : '寂寞同性交友群' }}</span>
          </a>
          <span>&nbsp;|&nbsp;</span>
          <a
            target="_blank"
            rel="external nofollow noopenter"
            href="https://t.me/joinchat/F6wOlxYwSCUpZTYj3WTAWA"
          >{{ isEnLang ? 'Telegram group' : '电报群' }}</a>
        </div>
        <div class="item">
          <i class="iconfont icon-music" />
          <span class="music">
            <nuxt-link to="/music">
              Jazz-HipHop, Electronic, Disco, Rock, Popular
            </nuxt-link>
            <a
              href="https://open.spotify.com/user/v0kz9hpwpbqnmtnrfhbyl812o"
              target="_blank"
              class="spotify"
              rel="external nofollow noopenter"
            >
              <i class="iconfont icon-spotify" />
            </a>
            <a
              href="https://music.163.com/#/playlist?id=638949385"
              target="_blank"
              class="music-163"
              rel="external nofollow noopenter"
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
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-github" />
                <span class="text">GitHub</span>
              </a>
              <a
                href="https://twitter.com/surmon_me"
                target="_blank"
                class="item twitter"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-twitter" />
                <span class="text">Twitter</span>
              </a>
              <a
                href="https://www.instagram.com/surmon666"
                target="_blank"
                class="item instagram"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-instagram" />
                <span class="text">Instagram</span>
              </a>
            </span>
            <span v-if="!isMobile" class="mini">
              <a
                href="https://t.me/surmon"
                target="_blank"
                class="item telegram"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-telegram" />
              </a>
              <a
                href="https://www.linkedin.com/in/surmon"
                target="_blank"
                class="item linkedin"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-linkedin" />
              </a>
              <a
                href="https://www.zhihu.com/people/surmon"
                target="_blank"
                class="item zhihu"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-zhihu" />
              </a>
              <a
                v-if="false"
                href="https://www.youtube.com/channel/UCoL-j6T28PLSJ2U6ZdONS0w"
                target="_blank"
                class="item youtube"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-youtube" />
              </a>
              <a
                href="https://space.bilibili.com/27940710"
                target="_blank"
                class="item bilibili"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-bilibili" />
              </a>
              <a
                href="https://stackoverflow.com/users/6222535/surmon?tab=profile"
                target="_blank"
                class="item stackoverflow"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-stackoverflow" />
              </a>
              <a
                href="https://leetcode-cn.com/u/surmon"
                bak-href="https://leetcode.com/surmon"
                target="_blank"
                class="item algorithm"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-leetcode" />
              </a>
              <a
                href="https://www.quora.com/profile/Surmon/activity"
                target="_blank"
                class="item quora"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-quora" />
              </a>
            </span>
          </span>
        </div>
        <div class="item">
          <i class="iconfont icon-like" />
          <span class="like-text">{{ isEnLang ? 'code. beauty. whisky. music. vagrant.' : '酒池肉林、日夜笙歌、依翠偎红、五音六律、目营心匠、桀骜不羁' }}</span>
        </div>
        <div class="item">
          <i class="iconfont icon-tibet-1" />
          <a href class="my-map" @click.stop.prevent="openMyMap">{{
            isEnLang
              ? 'Every path I went astray built my Rome.'
              : '路为纸，地成册，行作笔，心当墨；思无界，行有疆'
          }}</a>
        </div>
        <div class="item">
          <i class="iconfont icon-friend" />
          <span class="friends">
            <a
              v-for="(link, name) in friendLinks"
              :key="link"
              :href="link"
              target="_blank"
              rel="external nofollow noopenter"
            >「 {{ name }} 」</a>
          </span>
        </div>
      </div>
      <div class="gravatar">
        <div class="background be-2">
          <img
            :src="'/images/about-background-be-2.jpg' | byCDN"
            alt="background"
            class="image"
          >
        </div>
        <div class="background be-1">
          <img
            :src="'/images/about-background-be-1.jpg' | byCDN"
            alt="background"
            class="image"
          >
        </div>
        <div class="background star-1">
          <img
            :src="'/images/about-background-star-1.png' | byCDN"
            alt="background-star"
            class="image"
          >
        </div>
        <div class="background star-2">
          <img
            :src="'/images/about-background-star-2.png' | byCDN"
            alt="background-star"
            class="image"
          >
        </div>
        <img :src="gravatar" class="avatar" draggable="false">
        <div class="description">
          <h3 class="name">
            <strong>Surmon</strong>
          </h3>
          <p class="skill">{{ isEnLang ? 'Digital nomad' : '数字游民' }}</p>
        </div>
        <a
          v-if="!isMobile"
          href
          class="followme"
          @click.stop.prevent
        >{{ $i18n.text.friendMe }}</a>
        <div v-if="!isMobile" class="wechat" @mouseenter="handleFollowMe"></div>
      </div>
    </div>
    <a
      v-if="!isMobile"
      class="about-aliyun-mammon"
      rel="external nofollow noopener"
      target="_blank"
      :href="adConfig.url"
    >
      <img :src="adConfig.src">
    </a>
    <div class="about-map">
      <iframe class="iframe" src="/partials/map.html" />
    </div>
    <div class="about-project">
      <a
        target="_blank"
        class="project-link"
        rel="external nofollow noopener"
        :href="appConfig.links.project"
      >
        <p class="title">
          <i class="iconfont icon-experiment" />
          <span>{{ $i18n.nav.project }}</span>
        </p>
        <p class="description">{{ isEnLang ? `"What I do,  just keep repeating."` : '了解更多关于我的项目的进展' }}</p>
      </a>
      <div class="animation">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import adConfig from '~/config/ad.config'
  import appConfig from '~/config/app.config'
  import systemConstants from '~/constants/system'
  import { getFileCDNUrl } from '~/transformers/url'

  export default {
    name: 'About',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.about + ' | '}About`
      }
    },
    fetch({ store }) {
      return store.dispatch('global/fetchAdminInfo')
    },
    computed: {
      appConfig: () => appConfig,
      adConfig: () => adConfig.aboutPage,
      friendLinks: () => appConfig.friendLinks,
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      },
      gravatar() {
        return this.$store.state.global.adminInfo.gravatar || getFileCDNUrl('/images/gravatar.jpg')
      }
    },
    methods: {
      handleFollowMe() {
        this.$ga.event(
          '加微信码',
          systemConstants.GAEventActions.View,
          systemConstants.GAEventTags.AboutPage
        )
      },
      handleSponsor() {
        this.$ga.event(
          '赞赏 Sponsor',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.AboutPage
        )
      },
      openMyMap() {
        this.$ga.event(
          '轨迹地图',
          systemConstants.GAEventActions.View,
          systemConstants.GAEventTags.AboutPage
        )
        this.$store.commit('global/toggleMyMapOnState')
      },
    }
  }
</script>

<style lang="scss" scoped>
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

        > .item {
          line-height: 2.5em;
          min-height: 2.5em;
          margin-bottom: 1.2rem;
          &:last-child {
            margin-bottom: 0;
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
            border-bottom: 1px solid;
            font-family: 'webfont-bolder', DINRegular;
          }

          > .music {
            .spotify {
              margin-left: $xs-gap;
              color: #1DB954;
            }

            .music-163 {
              color: #C20C0C;
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
                border-radius: $radius * 2;
                color: $text-reversal;
                user-select: none;
                @include background-transition();

                > .text {
                  font-size: $font-size-small;
                }

                &.github {
                  background-color: #24282d;
                  &:hover {
                    background-color: #000;
                  }
                }

                &.twitter {
                  background-color: #1b95e0;
                  &:hover {
                    background-color: #0c7abf;
                  }
                }

                &.instagram {
                  opacity: 0.8;
                  background: #f09433;
                  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
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
                color: $text-reversal;
                opacity: 0.8;
                @include visibility-transition();

                &:hover {
                  opacity: 1;
                }

                .iconfont {
                  font-size: $font-size-small;
                }

                &.telegram {
                  background-color: #54a5dd;
                }
                &.zhihu {
                  background-color: #3582f7;
                }
                &.youtube {
                  background-color: #ec3323;
                }
                &.bilibili {
                  background-color: #449fd1;
                }
                &.stackoverflow {
                  background-color: #e6863d;
                }
                &.algorithm {
                  background-color: #fea116;
                }
                &.quora {
                  background-color: #b92b27;
                }
                &.linkedin {
                  background-color: #478cc5;
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
          z-index: $z-index-normal + 1;
          margin-top: 5rem;
          max-width: 100%;
          border-radius: 100%;
          border: 5px solid $module-bg;
          box-sizing: content-box;
          transition: transform $transition-time-slow;
        }

        > .description {
          text-align: center;

          > .skill {
            margin-top: .466rem;
          }
        }

        > .followme {
          margin-top: 1.666rem;
          display: inline-block;
          color: $primary;
          border: 1px solid $primary;
          border-radius: 1px;
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
          background-image: cdn-url('/images/wechat.jpeg');
          background-size: contain;
          background-position: bottom;
          z-index: $z-index-normal + 1;
          background-color: $white;
          @include hidden();
          @include visibility-transition();
        }
      }
    }

    .about-aliyun-mammon {
      display: block;
      margin-bottom: $lg-gap;
      background-color: $module-bg;
      opacity: .8;
      @include visibility-transition();

      &:hover {
        opacity: 1;
      }

      img {
        width: 100%;
      }
    }

    .about-map {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      background-color: $module-bg;

      > .iframe {
        width: 100%;
        height: 19rem;
      }
    }

    .about-project {
      padding: $sm-gap;
      overflow: hidden;
      position: relative;
      background-color: $module-bg;

      .animation { 
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;

        .wave {
          background: url('/images/wave.svg') repeat-x;
          background-size: contain;
          position: absolute;
          width: 6400px;
          height: 60px;
          bottom: 0;
          animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
          transform: translate3d(0, 0, 0);
        }

        .wave:nth-of-type(2) {
          margin-left: 100px;
          animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite;
          opacity: 1;
        }

        @keyframes wave {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-1600px, 0, 0);
          }
        }
      }

      .project-link {
        width: 100%;
        height: 17rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg;
        }

        .title {
          text-transform: uppercase;
          font-family: 'webfont-normal', DINRegular;
          margin-bottom: $gap;
          font-size: 3em;
        }

        .description {
          margin-bottom: 3rem;
        }
      }
    }

    &.mobile {
      margin: 0;

      > .about-me,
      > .about-map {
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

      > .about-map {
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
