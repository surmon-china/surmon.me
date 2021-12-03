<template>
  <div class="job-page" :class="{ mobile: isMobile }">
    <page-banner image="/images/page-job/banner.jpg">
      <template #title>
        <i18n zh="内推找我，绝对靠谱" en="We work together" />
      </template>
      <template #description>
        <i18n zh="一手人脉，假一赔万" en="We fight for future together" />
      </template>
    </page-banner>
    <div class="container">
      <ul class="jobs">
        <li class="item" :class="job.id" :key="index" v-for="(job, index) in jobs">
          <div
            class="logo"
            :style="{
              backgroundImage: `url('${getFileCDNUrl(job.logo)}')`
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
              {{ job.email.replace('@', '#') }}
              <i class="iconfont icon-mail-plane"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import PageBanner from '/@/components/common/banner.vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { META } from '/@/config/app.config'

  export default defineComponent({
    name: 'JobPage',
    components: {
      PageBanner
    },
    setup() {
      const { i18n, meta, isMobile, isZhLang } = useEnhancer()
      const jobs = [
        {
          id: 'qiniu',
          company: '七牛云',
          logo: '/images/page-job/qiniu.jpg',
          url: 'https://www.qiniu.com/company',
          location: '上海',
          description: '公司赚钱，Leader nice，同事完美，业务靠谱，从不加班',
          email: META.email
        },
        {
          id: 'bytedance',
          company: '字节跳动',
          logo: '/images/page-job/bytedance.jpg',
          qrcode: '/images/page-job/bytedance-qrcode.png',
          url: 'https://job.toutiao.com/s/J9oWrQQ',
          location: '国内',
          description: '饭好吃，不要钱<br> 薪资不低，加班给钱；马上上市，未来可期',
          email: META.email
        },
        {
          id: 'meituan',
          company: '美团点评',
          logo: '/images/page-job/meituan.png',
          url: 'http://zhaopin.meituan.com',
          description: '优惠券多 <br> 技术 OK',
          email: `iamjooger@gmail.com`
        },
        {
          id: 'ant',
          company: '蚂蚁金服',
          location: '国内',
          logo: '/images/page-job/ant.jpg',
          url: 'https://www.antgroup.com/about/join-us',
          description: '巨头市值，大牛群居',
          email: META.email
        },
        {
          id: 'github-veact',
          company: 'GitHub Veact Project',
          location: 'remote',
          logo: '/images/page-job/github.jpg',
          url: 'https://github.com/veactjs',
          description: 'Become the maintainer of the <code>veact</code> project',
          email: META.email
        },
        {
          id: 'todo',
          company: '假装是广告位',
          logo: '/images/page-job/github-package.png',
          description: '如果你有自认为不错的机会，请联系我~',
          email: META.email
        }
      ]

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_JOB, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_JOB), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `找 ${META.author} 内推` }
      })

      const handleSubmit = (job: any) => {
        const subject = `嗨！求内推！`
        const body = `我想求内推 ${job.company} - ${
          job.location || ''
        } 的职位，我在简历在附件中。%0D%0A %0D%0A from ${META.title}`
        const mailAddress = `mailto:${job.email}?subject=${subject}&body=${body}`
        window.open(mailAddress)
      }

      return {
        jobs,
        isMobile,
        handleSubmit,
        getFileCDNUrl
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .job-page {
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
            text-transform: capitalize;
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

    &.mobile {
      .banner {
        height: 12rem;
        margin-bottom: $gap;
        @include radius-box($sm-radius);

        .title {
          font-size: $font-size-h1;
          margin-bottom: $gap;
        }
        .description {
          margin: 0;
        }
      }

      .container {
        width: 100%;

        .jobs {
          display: block;

          ::v-deep(.list) {
            width: 100%;
            .item {
              margin: 0;
              margin-bottom: $gap;

              .logo {
                height: 10rem;
              }
            }

            &:last-child {
              .item:last-child {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
