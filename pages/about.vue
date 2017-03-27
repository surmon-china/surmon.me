<template>
  <div class="page" :class="{ mobile: mobileLayout }">
    <div class="detail">
      <div class="content">
        <div class="about">
          <div class="about-all">
            <div class="about-me">
              <div class="gravatar" v-if="!mobileLayout">
                <img :src="gravatar">
              </div>
              <p class="item">
                <i class="iconfont icon-user"></i>
                <span>I'm Surmon, a (95+) (小) javascript (鲜) stack (肉) developer.</span>
              </p>
              <p class="item">
                <i class="iconfont icon-comment-discussion"></i>
                <span>国套委：</span>
                <a target="_blank" 
                   rel="nofollow" 
                   href="https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4">288325802</a>
              </p>
              <p class="item">
                <i class="iconfont icon-address"></i>
                <span>欢迎西安的同学请我喝(yue)咖(...)啡</span>
              </p>
              <p class="item">
                <i class="iconfont icon-music"></i>
                <nuxt-link to="/music">Folk, Jazz-HipHop, EM, Rock, PostRock, New Ag</nuxt-link>
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
                  <a href="https://www.quora.com/profile/Surmon" 
                     target="_blank" 
                     rel="external nofollow">
                    <i class="iconfont icon-quora"></i>
                  </a>
                  <a href="https://www.zhihu.com/people/surmon/activities" 
                     target="_blank" 
                     rel="external nofollow">
                    <i class="iconfont icon-zhihu"></i>
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
              <div class="item">
                <i class="iconfont icon-code"></i>
                <span class="skills">凡心所向，素履所往；生如逆旅，一苇以航</span>
              </div>
            </div>
            <div class="about-map">
              <iframe src="/partials/map.html" style="width: 100%; height: 236px;"></iframe>
            </div>
            <div class="about-project">
              <router-link to="/project" class="project-link">
                <p class="title">To my Project</p>
                <p class="item">前去了解更多关于我的开源项目的进展</p>
                <p class="item">オープンソースプロジェクトの進捗状況を理解するために、</p>
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
                padding: 1em;
              }

              > .about-project {

                > .project-link {

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
            padding: 2em 3em;
            margin-bottom: 1em;
            background-color: $module-bg;
            overflow: hidden;

            &:before {
              content: "";
              display: block;
              border-width: 0 13em 12em 0;
              border-color: transparent rgba(238,238,238,0.7) transparent transparent;
              background: transparent;
              border-style: solid;
              width: 0;
              position: absolute;
              top: 0;
              right: 0;
              z-index: 2;
              opacity: .6;
            }

            .gravatar {
              position: absolute;
              right: 4em;
              top: 4em;
              width: 14em;
              height: 14em;
              padding: .3em;
              border: 1px dashed #ccc;
              opacity: .8;
              @include css3-prefix(transition, transform .7s);

              img {
                max-width: 100%;
              }

              &:hover {
                @include css3-prefix(transform, rotate(2deg) scale(1.1));
              }
            }

            .item {
              line-height: 2.5em;
              min-height: 2.5em;

              &:last-child {
                margin-bottom: 0;
              }

              > .iconfont {
                margin-right: 2em;
                display: inline-block;
                color: rgba(191, 191, 191, 0.5);
                width: 2rem;
                text-align: center;
              }

              > .accounts {

                > a {
                  margin-right: 1.5em;
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
            height: 14em;
            padding: .5em;
            overflow: hidden;
            background-color: $module-bg;

            .project-link {
              height: 13em;
              padding-top: 1.5em;
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
