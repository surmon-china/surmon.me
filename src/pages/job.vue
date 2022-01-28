<template>
  <div class="job-page">
    <page-banner :blur="false" image="/images/page-job/banner-2.jpg">
      <template #title>
        <i18n zh="内推找我，绝对靠谱" en="We work together" />
      </template>
      <template #description>
        <i18n zh="一手人脉，假一赔万" en="We fight for future together" />
      </template>
    </page-banner>
    <div class="container">
      <client-only transition>
        <Adsense
          class="mammon"
          ins-class="mammon-ins"
          ins-style="display:inline-block;width:1050px;height:230px"
          data-ad-slot="3013952710"
        />
      </client-only>
      <ul class="jobs">
        <li class="item" :class="job.id" :key="index" v-for="(job, index) in jobs">
          <div
            class="logo"
            :style="{
              backgroundImage: `url('${getTargetCDNURL(job.logo)}')`
            }"
          >
            <uimage cdn class="qrcode" :src="job.qrcode" v-if="job.qrcode" />
          </div>
          <div class="content">
            <ulink class="title" :href="job.url">
              {{ job.company }}
              <span class="location" v-if="job.location">（{{ job.location }}）</span>
            </ulink>
            <p class="description" v-if="job.description" v-html="job.description" />
            <button class="submit" @click="handleSubmit(job)" v-if="job.email">
              {{ job.email().replace('@', '#') }}
              <i class="iconfont icon-mail-plane"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMetaStore } from '/@/store/meta'
  import { GAEventCategories } from '/@/constants/gtag'
  import { getTargetCDNURL } from '/@/transforms/url'
  import { firstUpperCase } from '/@/transforms/text'
  import { emailLink } from '/@/transforms/email'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { META } from '/@/config/app.config'
  import PageBanner from '/@/components/common/fullpage/banner.vue'

  export default defineComponent({
    name: 'JobPage',
    components: {
      PageBanner
    },
    setup() {
      const { i18n, meta, gtag, isZhLang } = useEnhancer()
      const adminEmail = computed(() => useMetaStore().appOptions.data?.site_email || '')

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_JOB, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_JOB), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `找 ${META.author} 内推` }
      })

      const jobs = [
        {
          id: 'qiniu',
          company: '七牛云',
          logo: '/images/page-job/qiniu.jpg',
          url: 'https://www.qiniu.com/company',
          location: '上海',
          description: '公司赚钱，Leader nice，同事完美，业务靠谱，极少加班',
          email: () => adminEmail.value
        },
        {
          id: 'bytedance',
          company: '字节跳动',
          logo: '/images/page-job/bytedance.jpg',
          qrcode: '/images/page-job/bytedance-qrcode.png',
          url: 'https://job.toutiao.com/s/J9oWrQQ',
          location: '国内',
          description: '饭好吃，不要钱<br> 薪资不低，加班给钱；马上上市，未来可期',
          email: () => adminEmail.value
        },
        {
          id: 'meituan',
          company: '美团点评',
          logo: '/images/page-job/meituan.png',
          url: 'http://zhaopin.meituan.com',
          description: '优惠券多 <br> 技术 OK',
          email: () => `iamjooger@gmail.com`
        },
        {
          id: 'ant',
          company: '蚂蚁金服',
          location: '国内',
          logo: '/images/page-job/ant.jpg',
          url: 'https://www.antgroup.com/about/join-us',
          description: '巨头市值，大牛群居',
          email: () => adminEmail.value
        },
        {
          id: 'github-veact',
          company: 'GitHub Veact Project',
          location: 'remote',
          logo: '/images/page-job/github.jpg',
          url: 'https://github.com/veactjs',
          description: 'Become the maintainer of the <code>veact</code> project',
          email: () => adminEmail.value
        },
        {
          id: 'todo',
          company: '假装是广告位',
          logo: '/images/page-job/github.jpg',
          description: '如果你有自认为不错的机会，请联系我~',
          email: () => adminEmail.value
        }
      ]

      const handleSubmit = (job: any) => {
        gtag?.event('job_send_mail', {
          event_category: GAEventCategories.Universal
        })

        const location = job.location ? `- ${job.location} ` : ''
        window.open(
          emailLink({
            email: job.email(),
            subject: `嗨！求内推！/ from ${META.title}`,
            body: `我想求内推「${job.company} ${location}」的机会/职位，我在简历在附件中。\n\nfrom ${META.title}`
          })
        )
      }

      return {
        jobs,
        handleSubmit,
        getTargetCDNURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .job-page {
    .mammon {
      margin: $gap * 2 0;
      height: 130px;
      overflow: hidden;
      @include radius-box($sm-radius);
      @include common-bg-module();
    }

    .jobs {
      padding: 0;
      margin: $gap * 2 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: $gap * 2;

      .item {
        display: block;
        height: auto;
        @include radius-box($sm-radius);
        @include common-bg-module();

        .logo {
          width: 100%;
          height: 16rem;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: $module-bg-darker-2;
          background-size: cover;
          background-position: center;

          .qrcode {
            height: 50%;
            background-color: $white;
            @include radius-box($sm-radius);
          }
        }

        .content {
          padding: $lg-gap;

          .title {
            margin: 0;
            font-weight: bold;
            font-size: $font-size-h4;
            border-bottom: 1px solid transparent;
            &:hover {
              text-decoration: none;
              border-color: initial;
            }

            .location {
              font-weight: normal;
            }
          }

          .description {
            margin-top: $gap;
            margin-bottom: 0;
            line-height: 2;
          }

          .submit {
            $height: 2.4em;
            display: block;
            width: 100%;
            margin-top: $lg-gap;
            line-height: $height;
            border: 1px solid;
            border-color: $primary;
            color: $primary;
            font-size: $font-size-small;
            text-align: center;
            letter-spacing: 1px;
            transition: color $transition-time-fast, background-color $transition-time-fast;
            @include radius-box($xs-radius);

            &:hover {
              color: $text-reversal;
              background-color: $primary;
            }
          }
        }
      }
    }
  }
</style>
