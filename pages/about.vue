<template>
  <div class="page" :class="{ mobile: mobileLayout }">
    <div class="detail">
      <div class="content">
        <div class="about">
          <div class="about-all">
            <div class="about-me">
              <div class="desc">
                <p class="item">
                  <i class="iconfont icon-user"></i>
                  <span>I'm Surmon, a (95+) (小) Javascript (鲜) stack (肉) developer.</span>
                </p>
                <p class="item">
                  <i class="iconfont icon-comment-discussion"></i>
                  <span>Taolu committee: </span>
                  <a target="_blank" 
                     rel="nofollow" 
                     href="https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4">288325802</a>
                  <span>.</span>
                </p>
                <p class="item">
                  <i class="iconfont icon-music"></i>
                  <nuxt-link to="/music">Folk, Jazz-HipHop, EM, Rock, PostRock, New Ag.</nuxt-link>
                </p>
                <p class="item">
                  <i class="iconfont icon-like"></i>
                  <span>love code. love beauty. love life.</span>
                </p>
                <p class="item">
                  <i class="iconfont icon-coffee"></i>
                  <span class="accounts">
                    <a href="mailto:surmon@foxmail.com" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-mail"></i>
                    </a>
                    <a href="https://github.com/surmon-china" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-github"></i>
                    </a>
                    <a href="https://stackoverflow.com/users/6222535/surmon?tab=profile" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-stackoverflow"></i>
                    </a>
                    <a href="https://segmentfault.com/u/surmon" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-segmentfault"></i>
                    </a>
                    <a href="https://juejin.im/user/5735611ac4c9710060f8fa5e" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-juejin"></i>
                    </a>
                    <a href="https://www.v2ex.com/member/surmon" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-v2ex"></i>
                    </a>
                    <a href="https://www.zhihu.com/people/surmon/activities" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-zhihu"></i>
                    </a>
                    <a href="https://www.quora.com/profile/Surmon" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-quora"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/surmon-ma-713bb6a2/" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-linkedin"></i>
                    </a>
                    <a href="https://weibo.com/nocower" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-weibo"></i>
                    </a>
                    <a href="https://twitter.com/surmon_me" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/surmon.me" 
                       target="_blank" 
                       rel="external nofollow">
                      <i class="iconfont icon-facebook"></i>
                    </a>
                  </span>
                </p>
                <p class="item">
                  <i class="iconfont icon-code"></i>
                  <span class="skills">凡心所向，素履所往；生如逆旅，一苇以航。</span>
                </p>
              </div>
              <div class="gravatar" v-if="!mobileLayout">
                <div class="background">
                  <img src="/images/about-background.jpg" alt="background" class="image">
                </div>
                <img :src="gravatar" class="avatar">
                <h2 class="name"><strong>Surmon</strong></h2>
                <p class="skill">JS Stack Developer.</p>
                <a class="favorite" href="" @click.stop.prevent="">Favorite</a>
              </div>
            </div>
            <div class="about-map" v-if="!mobileLayout">
              <iframe src="/partials/map.html" style="width: 100%; height: 236px;"></iframe>
            </div>
            <div class="about-project">
              <router-link to="/project" class="project-link">
                <p class="title">To my Project</p>
                <p class="item">前去了解更多关于我的开源项目的进展</p>
                <p class="item" v-if="!mobileLayout">オープンソースプロジェクトの進捗状況を理解するために、</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    head: {
      title: 'About'
    },
    computed: {
      gravatar() {
        const gravatar = this.$store.state.option.adminInfo.data.gravatar
        return !!gravatar 
                ? `${gravatar}?imageView2/1/w/360/h/360/interlace/1/q/75|imageslim` 
                : '/images/gravatar.jpg'
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {

    &.mobile {

      > .detail {
        margin: 0;

        > .content {

          > .about {

            > .about-all {

              > .about-me {

                > .desc {
                  padding: 1em;

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

              > .about-map {
                display: none;
              }

              > .about-project {
                height: auto;

                > .project-link {
                  height: auto;

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

              @keyframes aboutbg {
                0% { transform: translate3d(0%, 0%, 0) }
                25% { transform: translate3d(-50%, -60%, 0) }
                50% { transform: translate3d(-50%, 0%, 0) }
                75% { transform: translate3d(0%, -60%, 0) }
                100% { transform: translate3d(0%, 0%, 0) }
              }

              > .background {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 30%;
                top: 0;
                right: 0;
                z-index: 0;
                overflow: hidden;

                > .image {
                  width: 200%;
                  animation: aboutbg 88s linear infinite;
                }
              }

              &:hover {

                > .avatar {
                  @include css3-prefix(transform, rotate(360deg));
                }
              }

              > .avatar {
                width: 40%;
                z-index: 1;
                margin-top: 26%;
                max-width: 100%;
                border-radius: 100%;
                border: .4rem solid $module-bg;
                box-sizing: content-box;
                @include css3-prefix(transition, transform 1s);
              }

              > .skill {
                margin-top: .466rem;
              }

              > .favorite {
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
                  color: $white;
                  background-color: $primary;
                }
              }
            }

            > .desc {
              width: 73%;
              padding: 2em 3em;
              background-color: $module-bg;

              .item {
                line-height: 2.5em;
                min-height: 2.5em;

                &:first-child {

                  > span {
                    display: inline-block;

                    &::first-letter {
                      font-size: $font-size-h1;
                    }
                  }
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
                  color: rgba(191, 191, 191, 0.5);
                }

                > .accounts {

                  > a {
                    margin-right: 1.5em;

                    > .iconfont {
                      font-size: 1.5666rem;
                    }
                  }
                }
              }
            }
          }

          .about-map {
            width: 100%;
            padding: .5em;
            margin-bottom: 1em;
            overflow: hidden;
            background-color: $module-bg;
          }

          .about-project {
            width: 100%;
            height: 16em;
            padding: .5em;
            overflow: hidden;
            background-color: $module-bg;

            .project-link {
              height: 15em;
              padding-top: 3rem;
              display: block;
              text-align: center;

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
