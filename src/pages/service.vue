<template>
  <div
    class="service-page"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <div class="banner">
      <div class="content container">
        <h2 class="title">{{ $i18n.text.service.slogan }}</h2>
        <div class="submit">
          <button
            class="email-me"
            :title="$i18n.text.service.emailMe"
            @click="submitProject"
          >{{ $i18n.text.service.emailMe }}</button>
        </div>
        <a
          v-if="!isMobile"
          class="upwork"
          target="_blank"
          rel="external nofollow noopenter"
          href="https://www.upwork.com/freelancers/~0142e621258ac1770d"
        >
          <span>({{ $i18n.text.service.hireMe }}</span>
          <i class="iconfont icon-upwork"></i>
          <span>)</span>
        </a>
      </div>
    </div>
    <div class="module">
      <div class="module-content container">
        <ul class="module-list">
          <li class="item">
            <p class="icon web">
              <i class="iconfont icon-html5"></i>
            </p>
            <h3 class="name">Web {{ isEnLang ? 'Client' : '客户端' }}</h3>
            <p class="desc">Vue {{ isEnLang ? 'application' : '应用开发' }}</p>
            <p class="desc">React {{ isEnLang ? 'application' : '应用开发' }}</p>
            <p class="desc">Angular {{ isEnLang ? 'application' : '应用开发' }}</p>
          </li>
          <li class="item">
            <p class="icon nodejs">
              <i class="iconfont icon-nodejs"></i>
            </p>
            <h3 class="name">Nodejs</h3>
            <p class="desc">Nodejs {{ isEnLang ? 'application' : '整站建设' }}</p>
            <p class="desc">Nodejs {{ isEnLang ? 'online bussniess' : 'Web 服务开发' }}</p>
            <p class="desc">Nodejs {{ isEnLang ? 'CLI application' : '命令行工具开发' }}</p>
          </li>
          <li class="item">
            <p class="icon app">
              <i class="iconfont icon-app"></i>
            </p>
            <h3 class="name">Application</h3>
            <p class="desc">Weex {{ isEnLang ? 'application' : '应用开发' }}</p>
            <p class="desc">ReactNative {{ isEnLang ? 'application' : '应用开发' }}</p>
            <p class="desc">Electron {{ isEnLang ? 'application' : '应用开发' }}</p>
          </li>
          <li class="item">
            <p class="icon wechat">
              <i class="iconfont icon-wechat"></i>
            </p>
            <h3 class="name">Wechat</h3>
            <p class="desc">{{ isEnLang ? 'HTML5 page' : 'H5 开发' }}</p>
            <p class="desc">{{ isEnLang ? 'WeChat official account' : '公众号开发' }}</p>
            <p class="desc">{{ isEnLang ? 'WeChat mini program' : '小程序开发' }}</p>
          </li>
          <li class="item">
            <p class="icon consult">
              <i class="iconfont icon-tool"></i>
            </p>
            <h3 class="name">{{ isEnLang ? 'Consultant' : '技术咨询' }}</h3>
            <p class="desc">{{ isEnLang ? 'Everything about WEB' : '语言、框架疑难杂症' }}</p>
            <p class="desc">{{ isEnLang ? 'Business and technical' : '业务与技术方案设计' }}</p>
            <p class="desc">{{ isEnLang ? 'Technical consultant' : '长期技术顾问指导' }}</p>
          </li>
        </ul>
      </div>
    </div>
    <transition name="fade">
      <div v-if="!isMobile" class="mammon container">
        <adsense-responsive ins-style="display:inline-block;width:1050px;height:192px" />
      </div>
    </transition>
    <div class="step">
      <div class="step-content container">
        <ul class="step-list">
          <li class="item">
            <h3 class="name">1. {{ isEnLang ? 'Consult' : '提交需求' }}</h3>
            <p class="desc">{{ isEnLang ? 'Product requirements document' : '提供构思成熟的需求文档' }}</p>
            <p class="desc">{{ isEnLang ? 'Prototype design document' : '及清晰可用的设计图或原型' }}</p>
          </li>
          <li class="item">
            <h3 class="name">2. {{ isEnLang ? 'Confirm' : '确认需求' }}</h3>
            <p class="desc">{{ isEnLang ? 'Price and schedule' : '确认报价及开发周期' }}</p>
            <p class="desc">{{ isEnLang ? 'Development cycle' : '协商开发周期和要点' }}</p>
          </li>
          <li class="item">
            <h3 class="name">3. {{ isEnLang ? 'Develop' : '预付开发' }}</h3>
            <p class="desc">{{ isEnLang ? 'Payment the trust and deposit' : '预付部分或全部' }}</p>
            <p class="desc">{{ isEnLang ? 'Develop project' : '进入开发流程' }}</p>
          </li>
          <li class="item">
            <h3 class="name">4. {{ isEnLang ? 'Review' : '预收修正' }}</h3>
            <p class="desc">{{ isEnLang ? 'Review and experience' : '提供预览演示' }}</p>
            <p class="desc">{{ isEnLang ? 'Fixbug and optimize' : '细节修正及调优' }}</p>
          </li>
          <li class="item">
            <h3 class="name">5. {{ isEnLang ? 'Delivery' : '交付维护' }}</h3>
            <p class="desc">{{ isEnLang ? 'Pay balance' : '付清尾款，交付项目' }}</p>
            <p class="desc">{{ isEnLang ? 'Maintenance cycle' : '一定周期内持续维护' }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="rule">
      <div class="rule-content container">{{ ruleContent }}</div>
    </div>
  </div>
</template>

<script>
  import appConfig from '~/config/app.config'
  import systemConstants from '~/constants/system'
  export default {
    name: 'Service',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.service + ' | '}Service`
      }
    },
    methods: {
      submitProject() {
        this.$ga.event(
          '咨询邮件',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.ServicePage
        )
        const subject = this.isEnLang
          ? `Technical consultant / ${appConfig.meta.title}`
          : `嗨！Surmon，久仰大名！`
        const body = this.isEnLang
          ? 'Hi Surmon, My name is '
          : `我有一个需求：%0D%0A %0D%0A - 需求简述： %0D%0A %0D%0A - 需求文档：%0D%0A %0D%0A - 预算金额：%0D%0A %0D%0A - 预算周期：`
        const mailAddress =
          'mailto:surmon@foxmail.com' +
          (this.isMobile ? '' : `?subject=${subject}&body=${body}`)
        window.location.href = mailAddress
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.global.isMobile
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isDarkTheme() {
        return this.$store.getters['global/isDarkTheme']
      },
      ruleContent() {
        return this.isEnLang
          ? `"Any application that can be written in JavaScript, will eventually be written in JavaScript."`
          : '如果你认为自己的能力足以支撑一位出色、省心、优秀、帅气、完美的的全栈工程师的生产力，请 EMail 我；非常优秀，没有之一'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-page {
    width: 100%;

    &.mobile {
      > .banner {
        height: 14rem;

        > .content {
          width: 100%;

          > .title {
            margin-top: 3rem;
            margin-bottom: 2rem;
            font-size: $font-size-h1;
          }
        }
      }

      > .module {
        margin: 0 auto;
        margin-top: 1rem;

        > .module-content {
          width: 100%;

          > .module-list {
            flex-direction: column;

            > .item {
              width: 100%;
              height: auto;
              margin-right: 0;
              margin-bottom: 1rem;

              > .icon {
                margin-bottom: -0.5em;
              }
            }
          }
        }
      }

      > .step {
        padding: 0;
        background-color: transparent;

        > .step-content {
          width: 100%;

          > .step-list {
            padding: 0;
            flex-direction: column;

            > .item {
              width: 100%;
              height: auto;
              margin-bottom: 1rem;
              padding-bottom: 0;
              background-color: $module-bg;
            }
          }
        }
      }

      > .rule {
        height: auto;
        line-height: 3rem;

        > .rule-content {
          width: 100%;
          padding: 1rem;
          text-align: left;
          text-indent: 2em;

          > .text {
            margin: 0;
          }
        }
      }
    }

    &.dark {
      .banner {
        .content {
          .title {
            color: $text;
          }

          .submit {
            .email-me {
              color: $text;
              border-color: $text;
            }
          }

          .upwork {
            color: $text;
          }
        }
      }
    }

    .banner {
      height: 31rem;
      background: $module-hover-bg cdn-url('/images/service.jpg');
      background-size: cover;
      background-position: center 60%;
      background-attachment: fixed;

      .content {
        height: 100%;
        overflow: hidden;
        text-align: center;

        .title {
          color: $text-reversal;
          margin-top: 7rem;
          margin-bottom: 4rem;
          font-weight: 500;
          font-size: $font-size-h1 * 2;
          font-family: 'webfont-normal', DINRegular;
        }

        .submit {
          margin-bottom: 2rem;

          .email-me {
            $width: 10rem;
            $height: 4rem;

            position: relative;
            width: $width;
            height: $height;
            border: 1px solid;
            border-color: $text-reversal;
            line-height: $height;
            text-align: center;
            letter-spacing: 1px;
            font-weight: bold;
            text-transform: uppercase;
            color: $text-reversal;
            transition: color $transition-time-fast, border-color $transition-time-fast;

            &::after {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: $width;
              height: $height;
              pointer-events: none;
              background-color: transparent;
              transform: scale(1.8);
            }

            &:hover {
              color: $primary;
              border-color: $primary;

              &::after {
                background-color: $primary;
                transform: scale(1);
                opacity: 0;
                transition: transform .16s, opacity .16s, background-color 0.25s;
              }
            }
          }
        }

        .upwork {
          color: $text-reversal;
          border-bottom: 1px solid;
          border-color: transparent;
          transition: color $transition-time-fast, border-color $transition-time-fast;

          &:hover {
            color: $primary;
            border-color: $primary;
          }
        }
      }
    }

    > .module {
      margin: ($gap * 2) auto;

      > .module-content {
        > .module-list {
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          justify-content: space-between;

          > .item {
            flex: 1;
            width: auto;
            height: auto;
            padding-top: $lg-gap;
            padding-bottom: $gap;
            overflow: hidden;
            text-align: center;
            background-color: $module-bg;
            margin-right: $lg-gap;
            @include background-transition($transition-time-normal);

            &:last-child {
              margin-right: 0;
            }

            &:hover {
              background-color: $module-bg-opacity-9;

              .icon {
                &.web {
                  color: #d45835;
                }
                &.nodejs {
                  color: #43853d;
                }
                &.app {
                  color: $primary;
                }
                &.wechat {
                  color: #6fc04b;
                }
                &.consult {
                  color: #CD7F32;
                }
              }

              .desc {
                color: $text;
              }
            }

            > .icon {
              @include color-transition($transition-time-normal);

              > .iconfont {
                font-size: $font-size-h3 * 3;
              }
            }

            > .desc {
              @include color-transition($transition-time-normal);
              color: $text-disabled;
              margin-bottom: 1.2em;
            }
          }
        }
      }
    }

    > .mammon {
      height: auto;
      margin-bottom: $gap * 2;
      background-color: $module-bg;
    }

    > .step {
      background-color: $module-bg;

      > .step-content {
        > .step-list {
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          justify-content: space-between;

          > .item {
            width: 20%;
            height: auto;
            padding-top: $xs-gap;
            padding-bottom: $lg-gap;
            text-align: center;

            > .desc {
              color: $text-disabled;
            }
          }
        }
      }
    }

    > .rule {
      height: 5rem;
      line-height: 5rem;
      background-color: $primary;

      > .rule-content {
        color: $text-reversal;
        margin: 0 auto;
        text-align: center;
      }
    }
  }
</style>
