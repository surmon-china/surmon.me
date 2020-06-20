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
        <h2 class="title" v-i18n="LANGUAGE_KEYS.PAGE_SERVICE_SLOGAN"></h2>
        <div class="submit">
          <button
            class="email-me"
            title="email me"
            @click="submitProject"
            v-i18n="LANGUAGE_KEYS.PAGE_SERVICE_EMAIL_ME"
          />
        </div>
        <a
          v-if="!isMobile"
          class="upwork"
          target="_blank"
          rel="external nofollow noopenter"
          href="https://www.upwork.com/freelancers/~0142e621258ac1770d"
        >
          <span>(</span>
          <i18n :lkey="LANGUAGE_KEYS.PAGE_SERVICE_HIRE_ME" />
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
            <h3 class="name">Web <i18n en="Client" zh="客户端" /></h3>
            <p class="desc">Vue <i18n en="application" zh="应用开发" /></p>
            <p class="desc">React <i18n en="application" zh="应用开发" /></p>
            <p class="desc">Angular <i18n en="application" zh="应用开发" /></p>
          </li>
          <li class="item">
            <p class="icon nodejs">
              <i class="iconfont icon-nodejs"></i>
            </p>
            <h3 class="name">Nodejs</h3>
            <p class="desc">Nodejs <i18n en="application" zh="整站建设" /></p>
            <p class="desc">Nodejs <i18n en="Web 服务开发" zh="online bussniess" /></p>
            <p class="desc">Nodejs <i18n en="命令行工具开发" zh="CLI application" /></p>
          </li>
          <li class="item">
            <p class="icon app">
              <i class="iconfont icon-app"></i>
            </p>
            <h3 class="name">Application</h3>
            <p class="desc">Weex <i18n en="application" zh="应用开发" /></p>
            <p class="desc">ReactNative <i18n en="application" zh="应用开发" /></p>
            <p class="desc">Electron <i18n en="application" zh="应用开发" /></p>
          </li>
          <li class="item">
            <p class="icon wechat">
              <i class="iconfont icon-wechat"></i>
            </p>
            <h3 class="name">Wechat</h3>
            <p class="desc"><i18n en="HTML5 page" zh="H5 开发" /></p>
            <p class="desc"><i18n en="WeChat official account" zh="公众号开发" /></p>
            <p class="desc"><i18n en="WeChat mini program" zh="小程序开发" /></p>
          </li>
          <li class="item">
            <p class="icon consult">
              <i class="iconfont icon-tool"></i>
            </p>
            <h3 class="name"><i18n en="Consultant" zh="技术咨询" /></h3>
            <p class="desc"><i18n en="Everything about WEB" zh="语言、框架疑难杂症" /></p>
            <p class="desc"><i18n en="Business and technical" zh="业务与技术方案设计" /></p>
            <p class="desc"><i18n en="Technical consultant" zh="长期技术顾问指导" /></p>
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
            <h3 class="name">
              <span>1. </span>
              <i18n zh="提交需求" en="Consult" />
            </h3>
            <p class="desc"><i18n en="Product requirements document" zh="提供构思成熟的需求文档" /></p>
            <p class="desc"><i18n en="Prototype design document" zh="及清晰可用的设计图或原型" /></p>
          </li>
          <li class="item">
            <h3 class="name">2. <i18n en="Confirm" zh="确认需求" /></h3>
            <p class="desc"><i18n en="Price and schedule" zh="确认报价及开发周期" /></p>
            <p class="desc"><i18n en="Development cycle" zh="协商开发周期和要点" /></p>
          </li>
          <li class="item">
            <h3 class="name">3. <i18n en="Develop" zh="预付开发" /></h3>
            <p class="desc"><i18n en="Payment the trust and deposit" zh="预付部分或全部" /></p>
            <p class="desc"><i18n en="Develop project" zh="进入开发流程" /></p>
          </li>
          <li class="item">
            <h3 class="name">4. <i18n en="Review" zh="预收修正" /></h3>
            <p class="desc"><i18n en="Review and experience" zh="提供预览演示" /></p>
            <p class="desc"><i18n en="Fixbug and optimize" zh="细节修正及调优" /></p>
          </li>
          <li class="item">
            <h3 class="name">5. <i18n en="Delivery" zh="交付维护" /></h3>
            <p class="desc"><i18n en="Pay balance" zh="付清尾款，交付项目" /></p>
            <p class="desc"><i18n en="Maintenance cycle" zh="一定周期内持续维护" /></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="rule">
      <div class="rule-content container">
        <i18n
          zh="如果你认为自己的能力足以支撑一位出色、省心、优秀、帅气、完美的的全栈工程师的生产力，请 EMail 我；非常优秀，没有之一"
          en="Any application that can be written in JavaScript, will eventually be written in JavaScript."
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useI18n } from '/@/services/i18n'
  import { useTheme, Theme } from '/@/services/theme'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useGlobalState } from '/@/state'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'Service',
    setup() {
      const i18n = useI18n()
      const theme = useTheme()
      const globalState = useGlobalState()
      const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
      const isMobile = computed(() => globalState.userAgent.isMobile)

      const handleSubmitEmail = () => {
        // this.$ga.event(
        //   '咨询邮件',
        //   GAEventActions.Click,
        //   GAEventTags.ServicePage
        // )
        const isZhLang =  i18n.language.value === Language.Zh
        const subject = isZhLang
          ? `嗨！Surmon，久仰大名！`
          : `Technical consultant / ${APP_CONFIG.META.title}`
        const body = isZhLang
          ? `我有一个需求：%0D%0A %0D%0A - 需求简述： %0D%0A %0D%0A - 需求文档：%0D%0A %0D%0A - 预算金额：%0D%0A %0D%0A - 预算周期：`
          : 'Hi Surmon, My name is '
        const mailAddress = 'mailto:surmon@foxmail.com' + (isMobile.value ? '' : `?subject=${subject}&body=${body}`)

        // window.location.href = mailAddress
        window.open(mailAddress)
      }

      return {
        isDarkTheme,
        isMobile,
        handleSubmitEmail,
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

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
