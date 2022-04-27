<template>
  <div class="freelancer-page">
    <page-banner :position="66" class="page-banner" image="/images/page-feeelancer/banner.jpg">
      <template #title>
        <webfont>
          <i18n :k="LanguageKey.PAGE_FREELANCER_SLOGAN" />
        </webfont>
      </template>
      <template #description>
        <div class="desc">
          <button class="submit-email" title="Email me" @click="handleSubmitEmail">
            <i18n :k="LanguageKey.PAGE_FREELANCER_EMAIL_ME" />
          </button>
          <ulink class="upwork" :href="VALUABLE_LINKS.UPWORK">
            <i18n>
              <template #zh>或在<i class="iconfont icon-upwork"></i>雇佣我</template>
              <template #en>Hire me on<i class="iconfont icon-upwork"></i></template>
            </i18n>
          </ulink>
        </div>
      </template>
    </page-banner>
    <div class="module">
      <div class="container">
        <ul class="module-list">
          <li class="item" :key="index" v-for="(service, index) in services">
            <p class="icon" :class="service.id">
              <i class="iconfont" :class="service.iconfont"></i>
            </p>
            <h3 class="name">
              <span v-if="typeof service.name === 'string'">{{ service.name }}</span>
              <i18n v-else :en="service.name.en" :zh="service.name.zh" />
            </h3>
            <p class="desc" :key="i" v-for="(desc, i) in service.descriptions">
              <i18n :en="desc.en" :zh="desc.zh" />
            </p>
          </li>
        </ul>
      </div>
    </div>
    <client-only transition>
      <div class="module">
        <div class="container">
          <Adsense
            class="mammon"
            ins-class="mammon-ins"
            ins-style="display:inline-block;width:1026px;height:200px"
            data-ad-slot="3013952710"
          />
        </div>
      </div>
    </client-only>
    <div class="step">
      <div class="step-content container">
        <ul class="step-list">
          <li class="item" :key="index" v-for="(step, index) in steps">
            <h3 class="name">
              <i18n :zh="step.name.zh" :en="step.name.en" />
            </h3>
            <p class="desc" :key="i" v-for="(desc, i) in step.descriptions">
              <i18n :en="desc.en" :zh="desc.zh" />
            </p>
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
  import { defineComponent } from 'vue'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { GAEventCategories } from '/@/constants/gtag'
  import { Language, LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMetaStore } from '/@/stores/meta'
  import { firstUpperCase } from '/@/transforms/text'
  import { emailLink } from '/@/transforms/email'
  import PageBanner from '/@/components/common/fullpage/banner.vue'

  export default defineComponent({
    name: 'FreelancerPage',
    components: {
      PageBanner
    },
    setup() {
      const { i18n, meta, gtag, isZhLang } = useEnhancer()
      const metaStore = useMetaStore()

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_FREELANCER, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_FREELANCER), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | ') }
      })

      const handleSubmitEmail = () => {
        gtag?.event('freelance_send_email', {
          event_category: GAEventCategories.Universal
        })

        window.open(
          emailLink({
            email: metaStore.appOptions.data?.site_email!,
            subject: isZhLang.value
              ? `嗨！Surmon，久仰大名！`
              : `Technical consultant / ${META.title}`,
            body: isZhLang.value
              ? `我有一个需求：\n\n - 需求简述： \n - 需求文档：\n - 预算金额：\n - 预算周期：`
              : `Hi! Surmon, I\'m ?`
          })
        )
      }

      const services = [
        {
          id: 'web',
          iconfont: 'icon-html5',
          name: {
            zh: 'Web 客户端',
            en: 'Web Client'
          },
          descriptions: [
            { zh: 'Vue 应用开发', en: 'Vue application' },
            { en: 'React application', zh: 'React 应用开发' },
            { en: 'Angular application', zh: 'Angular 应用开发' }
          ]
        },
        {
          id: 'nodejs',
          iconfont: 'icon-nodejs',
          name: 'Node.js',
          descriptions: [
            { en: 'Node.js application', zh: 'Node.js 整站建设' },
            { en: 'Node.js online bussniess', zh: 'Node.js Web 服务开发' },
            { en: 'Node.js CLI application', zh: 'Node.js 命令行工具开发' }
          ]
        },
        {
          id: 'app',
          iconfont: 'icon-app',
          name: {
            zh: '混合应用',
            en: 'Hybrid App'
          },
          descriptions: [
            { en: 'Flutter application', zh: 'Flutter 应用开发' },
            { en: 'React Native application', zh: 'React Native 应用开发' },
            { en: 'Electron application', zh: 'Electron 应用开发' }
          ]
        },
        {
          id: 'wechat',
          iconfont: 'icon-wechat',
          name: {
            zh: '微信周边',
            en: 'WeChat'
          },
          descriptions: [
            { en: 'HTML5 web page', zh: 'H5 开发' },
            { en: 'WeChat official account', zh: '公众号开发' },
            { en: 'WeChat mini program', zh: '小程序开发' }
          ]
        },
        {
          id: 'consult',
          iconfont: 'icon-tool',
          name: {
            zh: '技术咨询',
            en: 'Consultant'
          },
          descriptions: [
            { en: 'Everything about web', zh: '语言、框架疑难杂症' },
            { en: 'Business and technical', zh: '业务与技术方案设计' },
            { en: 'Technical consultant', zh: '长期技术顾问指导' }
          ]
        }
      ]

      const steps = [
        {
          name: {
            zh: '1. 提交需求',
            en: '1. Consult'
          },
          descriptions: [
            { en: 'Product requirements document', zh: '提供构思成熟的需求文档' },
            { en: 'Prototype design document', zh: '清晰可用的设计图或原型' }
          ]
        },
        {
          name: {
            zh: '2. 确认需求',
            en: '2. Confirm'
          },
          descriptions: [
            { en: 'Price and schedule', zh: '确认报价及开发周期' },
            { en: 'Development cycle', zh: '协商开发周期和要点' }
          ]
        },
        {
          name: {
            zh: '3. 预付开发',
            en: '3. Develop'
          },
          descriptions: [
            { en: 'Payment the trust and deposit', zh: '预付部分或全部' },
            { en: 'Develop project', zh: '进入开发流程' }
          ]
        },
        {
          name: {
            zh: '4. 预收修正',
            en: '4. Review'
          },
          descriptions: [
            { en: 'Review and experience', zh: '提供预览演示' },
            { en: 'Fixbug and optimize', zh: '细节修正调优' }
          ]
        },
        {
          name: {
            zh: '5. 交付维护',
            en: '5. Delivery'
          },
          descriptions: [
            { en: 'Pay balance', zh: '付清尾款，交付项目' },
            { en: 'Maintenance cycle', zh: '一定周期内持续维护' }
          ]
        }
      ]

      return {
        VALUABLE_LINKS,
        LanguageKey,
        services,
        steps,
        handleSubmitEmail
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .freelancer-page {
    width: 100%;

    .page-banner {
      .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .submit-email {
          display: block;
          margin-bottom: 2rem;
          width: 10rem;
          border: 1px solid;
          border-color: $white;
          line-height: 3.8rem;
          text-align: center;
          letter-spacing: 1px;
          font-weight: bold;
          text-transform: uppercase;
          color: $white;
          transition: color $transition-time-fast, border-color $transition-time-fast;
          @include radius-box($xs-radius);
          &:hover {
            color: $primary;
            border-color: $primary;
          }
        }

        .upwork {
          color: $white;
          border-bottom: 1px solid;
          border-color: transparent;
          font-size: $font-size-h5;
          transition: color $transition-time-fast, border-color $transition-time-fast;
          &:hover {
            color: $primary;
            border-color: $primary;
          }

          .iconfont {
            margin: 0 $sm-gap;
          }
        }
      }
    }

    .module {
      margin: ($gap * 2) auto;

      .module-list {
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
          margin-right: $gap * 2;
          @include radius-box($sm-radius);
          @include common-bg-module($transition-time-fast);
          &:last-child {
            margin-right: 0;
          }

          &:hover {
            background-color: $module-bg-opaque;

            .desc {
              color: $text;
            }
          }

          > .icon {
            @include color-transition($transition-time-fast);
            &.web {
              color: $html5-primary;
            }
            &.nodejs {
              color: $nodejs-primary;
            }
            &.app {
              color: $primary;
            }
            &.wechat {
              color: $wechat-primary;
            }
            &.consult {
              color: $stackoverflow-primary;
            }

            .iconfont {
              font-size: $font-size-h3 * 3;
            }
          }

          > .desc {
            @include color-transition($transition-time-fast);
            color: $text-disabled;
            margin-bottom: 1.2em;
          }
        }
      }
    }

    .mammon {
      height: calc(200px + $gap * 2);
      padding: $gap;
      @include common-bg-module();
      @include radius-box($sm-radius);
    }

    .step {
      @include common-bg-module();

      > .step-content {
        > .step-list {
          height: 16rem;
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          justify-content: space-between;

          > .item {
            width: 20%;
            height: auto;
            padding-top: $gap;
            text-align: center;

            > .desc {
              color: $text-disabled;
            }
          }
        }
      }
    }

    .rule {
      height: 5rem;
      line-height: 5rem;
      background-color: $primary;

      .rule-content {
        color: $text-reversal;
        margin: 0 auto;
        text-align: center;
      }
    }
  }
</style>
