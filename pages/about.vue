<template>
  <div class="page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="content">
        <div class="about">
          <div class="about-all">
            <div class="about-me">
              <div class="desc">
                <div class="item webfont">
                  <i class="iconfont icon-user"></i>
                  <div class="bio">
                    <p class="text" v-if="isEnLang">I'm Surmon, a developer.</p>
                    <p class="text" v-else>浪蝶游蜂，迈步九云中</p>
                    <a
                      class="sponsor"
                      target="_blank"
                      href="/sponsor"
                      rel="external nofollow noopenter"
                    >
                      <small v-text="$i18n.text.about.sponsorMe"></small>
                    </a>
                  </div>
                </div>
                <div class="item">
                  <i class="iconfont icon-comment-discussion"></i>
                  <a
                    target="_blank"
                    rel="external nofollow noopenter"
                    href="https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4"
                  >
                    <span v-if="isEnLang">Taolu committee:</span>
                    <span v-else>国家套路委员会</span>
                  </a>
                  <span>&nbsp;|&nbsp;</span>
                  <a
                    target="_blank"
                    rel="external nofollow noopenter"
                    href="https://t.me/joinchat/F6wOlxYwSCUpZTYj3WTAWA"
                  >Telegram group</a>
                </div>
                <div class="item">
                  <i class="iconfont icon-music"></i>
                  <nuxt-link to="/music">Jazz-HipHop, Electronic, Disco, Rock, Punk</nuxt-link>
                </div>
                <div class="item webfont">
                  <i class="iconfont icon-like"></i>
                  <span v-if="isEnLang">code. beauty. whisky. music. vagrant.</span>
                  <span v-else>
                    <span>恋何物？</span>
                    <span>酒池肉林、日夜笙歌、依翠偎红、五音六律、目营心匠、桀骜不羁</span>
                  </span>
                </div>
                <div class="item">
                  <i class="iconfont icon-coffee"></i>
                  <span class="accounts">
                    <span>
                      <a
                        href="https://github.com/surmon-china"
                        target="_blank"
                        class="github"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-github"></i>
                      </a>
                      <a
                        href="mailto:surmon@foxmail.com"
                        target="_blank"
                        v-if="false"
                        class="mail"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-mail"></i>
                      </a>
                      <a
                        href="https://t.me/surmon"
                        target="_blank"
                        class="telegram"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-telegram"></i>
                      </a>
                      <a
                        href="https://juejin.im/user/5735611ac4c9710060f8fa5e"
                        target="_blank"
                        class="juejin"
                        v-if="false"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-juejin"></i>
                      </a>
                      <a
                        href="https://www.zhihu.com/people/surmon/activities"
                        target="_blank"
                        class="zhihu"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-zhihu"></i>
                      </a>
                      <a
                        href="https://weibo.com/surmon"
                        target="_blank"
                        class="weibo"
                        rel="external nofollow noopenter"
                        v-if="false"
                      >
                        <i class="iconfont icon-weibo"></i>
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCoL-j6T28PLSJ2U6ZdONS0w"
                        target="_blank"
                        class="youtube"
                        rel="external nofollow noopenter"
                        v-if="false"
                      >
                        <i class="iconfont icon-youtube"></i>
                      </a>
                      <a
                        href="https://space.bilibili.com/27940710/#/video"
                        target="_blank"
                        class="bilibili"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-bilibili"></i>
                      </a>
                    </span>
                    <span v-if="!isMobile">
                      <a
                        href="https://surmon.taobao.com"
                        target="_blank"
                        v-if="false"
                        class="taobao"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-taobao"></i>
                      </a>
                      <a
                        href="https://stackoverflow.com/users/6222535/surmon?tab=profile"
                        target="_blank"
                        class="stackoverflow"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-stackoverflow"></i>
                      </a>
                      <a
                        href="https://leetcode-cn.com/u/surmon"
                        bak-href="https://leetcode.com/surmon"
                        target="_blank"
                        class="algorithm"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-leetcode"></i>
                      </a>
                      <a
                        href="https://www.quora.com/profile/Surmon"
                        target="_blank"
                        class="quora"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-quora"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/surmon"
                        target="_blank"
                        class="linkedin"
                        v-if="false"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-linkedin"></i>
                      </a>
                      <a
                        href="https://twitter.com/surmon_me"
                        target="_blank"
                        class="twitter"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-twitter"></i>
                      </a>
                      <a
                        href="https://www.facebook.com/surmon.me"
                        target="_blank"
                        v-if="false"
                        class="facebook"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-facebook"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/surmon666/"
                        target="_blank"
                        class="instagram"
                        rel="external nofollow noopenter"
                      >
                        <i class="iconfont icon-instagram"></i>
                      </a>
                    </span>
                  </span>
                </div>
                <div class="item webfont">
                  <i class="iconfont icon-code"></i>
                  <span class="skills" v-if="isEnLang">Talk is cheap. Give me kiss.</span>
                  <span v-else>吾生有涯愿无尽，心期填海力移山</span>
                </div>
                <div class="item" v-if="!isMobile">
                  <i class="iconfont icon-friend"></i>
                  <span class="friends">
                    <a
                      href="http://skyrover.me"
                      target="_blank"
                      rel="external nofollow noopenter"
                    >「 skyrover 」</a>
                    <a
                      href="https://blog.jimmylv.info"
                      target="_blank"
                      rel="external nofollow noopenter"
                    >「 JimmyLv 」</a>
                  </span>
                </div>
              </div>
              <div class="gravatar">
                <div class="background be-2">
                  <img
                    src="/images/about-background-be-2.jpg"
                    alt="background"
                    class="image"
                  >
                </div>
                <div class="background be-1">
                  <img
                    src="/images/about-background-be-1.jpg"
                    alt="background"
                    class="image"
                  >
                </div>
                <div class="background star-1">
                  <img
                    src="/images/about-background-star-1.png"
                    alt="background-star"
                    class="image"
                  >
                </div>
                <div class="background star-2">
                  <img
                    src="/images/about-background-star-2.png"
                    alt="background-star"
                    class="image"
                  >
                </div>
                <img :src="gravatar" class="avatar">
                <div class="desc">
                  <h2 class="name">
                    <strong>Surmon</strong>
                  </h2>
                  <p class="skill">JS Stack Developer.</p>
                </div>
                <a
                  class="followme"
                  href
                  @click.stop.prevent
                  v-if="!isMobile"
                >{{ isEnLang ? 'Friend me' : '众里寻他' }}</a>
                <div class="wechat" @mouseenter="handleFollowMe" v-if="!isMobile"></div>
              </div>
            </div>
            <a
              class="about-mammon"
              rel="external nofollow noopener"
              target="_blank"
              :href="adConfig.url"
              v-if="!isMobile"
            >
              <img :src="adConfig.src" />
            </a>
            <div class="about-map" v-if="!isMobile">
              <iframe class="iframe" src="/partials/map.html"></iframe>
            </div>
            <div class="about-project">
              <a
                target="_blank"
                class="project-link"
                rel="external nofollow noopener"
                href="https://github.surmon.me"
              >
                <p class="title">Get More Projects</p>
                <p class="item">了解更多关于我的开源项目的进展</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import adConfig from '~/config/ad.config'
  export default {
    name: 'about',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.about + ' | '}About`
      }
    },
    fetch({ store }) {
      return store.dispatch('global/fetchAdminInfo')
    },
    methods: {
      handleFollowMe() {
        this.$ga.event('加微信码', '点击', 'tool')
      }
    },
    computed: {
      adConfig: () => adConfig.pc.aboutPage,
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      },
      gravatar() {
        const gravatar = this.$store.state.global.adminInfo.gravatar
        return gravatar
          ? `${gravatar}?imageView2/1/w/360/h/360/interlace/1/q/75|imageslim` 
          : `${this.cdnUrl}/images/gravatar.jpg`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {

    &.mobile {

      > .detail {
        margin: 0;

        > .content {

          > .about {

            > .about-all {

              > .about-me {
                flex-direction: column-reverse;

                > .gravatar {
                  width: 100%;
                  margin-bottom: 1rem;
                  flex-direction: row;
                  padding: 2rem 0;

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
                    width: 25%;
                    margin-top: 0;
                    margin-left: 6%;
                  }

                  > .desc {
                    width: 50%;
                    margin-left: 5%;
                    text-align: left;
                    z-index: 1;
                    color: $reversal;

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

                > .desc {
                  width: 100%;
                  padding: 1em;
                  overflow: hidden;

                  > .item {
                    @include text-overflow();

                    > .iconfont {
                      margin-right: 1rem;
                    }

                    > .accounts {
                      bottom: auto;
                    }
                  }
                }
              }

              > .about-project {
                height: auto;

                > .project-link {
                  height: auto;
                  padding-top: 1rem;
                  overflow: hidden;

                  > .title {
                    font-size: 2em;
                  }
                }
              }
            }
          }
        }
      }
    }

    > .detail {

      > .content {
        width: 100%;
        overflow:  hidden;

        > .about {

          .about-me {
            width: 100%;
            height: auto;
            margin-bottom: 1em;
            overflow: hidden;
            display: flex;
            justify-content: space-between;

            .gravatar {
              width: 25%;
              display: flex;
              align-items: center;
              flex-direction: column;
              position: relative;
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
                z-index: 0;
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
                  @include css3-prefix(transform, rotate(360deg));
                }


                > .wechat {
                  visibility: visible;
                  opacity: .8;
                }
              }

              > .avatar {
                width: 40%;
                z-index: 1;
                margin-top: 5rem;
                max-width: 100%;
                border-radius: 100%;
                border: .4rem solid $module-bg;
                box-sizing: content-box;
                @include css3-prefix(transition, transform 1s);
              }

              > .desc {
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
                  color: $reversal;
                  background-color: $primary;
                }
              }

              > .wechat {
                opacity: 0;
                visibility: hidden;
                position: absolute;
                top: .6rem;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('/images/wechat.jpg');
                background-size: contain;
                background-position: bottom;
                z-index: 9;
              }
            }

            > .desc {
              width: 73%;
              padding: 2em 3em;
              background-color: $module-bg;

              .item {
                line-height: 2.5em;
                min-height: 2.5em;
                margin-bottom: 1.2rem;

                &.webfont {
                  font-family: webfont-bolder, DINRegular;
                }

                &:last-child {
                  margin-bottom: 0;
                }

                > .iconfont {
                  width: 2rem;
                  font-size: 1.5rem;
                  text-align: center;
                  margin-right: 2rem;
                  display: inline-block;
                  color: rgba($black, 0.2);

                  &.icon-code {
                    color: $black;
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

                  .text {
                    display: inline-block;
                    margin: 0;

                    &::first-letter {
                      font-size: $font-size-h1;
                      margin-right: 2px;
                    }
                  }

                  .sponsor {
                    display: inline-block;
                    height: 2rem;
                    line-height: 2rem;
                    margin-left: 0.5rem;
                    padding: 0 0.5rem;
                    font-family: DINRegular;
                    background-color: $primary;
                    border-radius: $radius * 2;
                    opacity: .8;
                    user-select: none;

                    &:hover {
                      opacity: 1;
                    }

                    > small {
                      color: $text-reversal;
                    }
                  }
                }

                > .friends {

                  > a {
                    margin-right: 1em;
                    text-transform: capitalize;
                  }
                }

                > .accounts {

                  a {
                    margin-right: 1.35em;

                    > .iconfont {
                      font-size: 1.6rem;
                    }

                    &:hover {

                      &.github {
                        color: #24282d;
                      }

                      &.juejin {
                        color: #2b6df6;
                      }

                      &.telegram {
                        color: #54a5dd;
                      }

                      &.zhihu {
                        color: #3582f7;
                      }

                      &.weibo {
                        color: #d53437;
                      }

                      &.youtube {
                        color: #ec3323;
                      }

                      &.bilibili {
                        color: #449fd1;
                      }

                      &.stackoverflow {
                        color: #e6863d;
                      }

                      &.algorithm {
                        color: #fea116;
                      }

                      &.quora {
                        color: #b92b27;
                      }

                      &.linkedin {
                        color: #478cc5;
                      }

                      &.twitter {
                        color: #499feb;
                      }

                      &.instagram {
                        color: #000;
                      }
                    }
                  }
                }
              }
            }
          }

          .about-mammon {
            display: block;
            margin-bottom: 1em;
            background-color: $module-bg;
            opacity: .8;

            &:hover {
              opacity: 1;
            }

            img {
              width: 100%;
            }
          }


          .about-map {
            width: 100%;
            padding: .5em;
            margin-bottom: 1em;
            overflow: hidden;
            background-color: $module-bg;
            position: relative;
            
            > .iframe {
              width: 100%;
              height: 19rem;
            }
          }

          .about-project {
            width: 100%;
            height: 16em;
            padding: .5em;
            overflow: hidden;
            background-color: $module-bg;

            .project-link {
              height: 15em;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              &:hover {
                background-color: $module-hover-bg;
              }

              .title {
                margin-bottom: .5em;
                font-size: 3em;
                text-transform: uppercase;
              }
            }
          }
        }
      }
    }
  }
</style>
