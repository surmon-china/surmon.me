<script lang="ts">
  export enum SocialMedia {
    Wechat = 'wechat',
    Twitter = 'twitter',
    Threads = 'threads',
    Weibo = 'weibo',
    douban = 'douban',
    Facebook = 'facebook',
    LinkedIn = 'linkedin'
  }
</script>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { getPageURL } from '/@/transforms/url'
  import { stringify } from '/@/transforms/query-string'
  import { renderTextToQRCodeDataURL } from '/@/transforms/qrcode'
  import { openPopupWindow } from '/@/utils/opener'
  import { copy } from '/@/utils/clipboard'

  interface ShareParams {
    url: string
    title: string
    ogTitle: string | void
    description: string
  }

  interface SocialItem {
    id: SocialMedia
    name: string
    class: string
    iconfont?: string
    handler?(params: ShareParams): void
    url?(params: ShareParams): string
  }

  // https://sharethis.com/platform/share-buttons/
  const defaultSocials: SocialItem[] = [
    {
      id: SocialMedia.Wechat,
      name: '微信',
      class: 'wechat',
      handler: (params) => {
        renderTextToQRCodeDataURL(params.url).then((dataURL) => {
          window.$popup?.image(dataURL)
        })
      }
    },
    {
      id: SocialMedia.Weibo,
      name: '微博',
      class: 'weibo',
      url: (params) => {
        return (
          `https://service.weibo.com/share/share.php?` +
          stringify({
            url: params.url,
            source: params.url,
            sourceUrl: params.url,
            title: params.ogTitle,
            content: params.description
          })
        )
      }
    },
    {
      id: SocialMedia.Twitter,
      name: 'Twitter',
      class: 'twitter',
      iconfont: 'twitter-x',
      url: (params) => {
        return (
          `https://twitter.com/intent/tweet?` +
          stringify({
            url: params.url,
            text: params.ogTitle
          })
        )
      }
    },
    {
      id: SocialMedia.Threads,
      name: 'Threads',
      class: 'threads',
      url: (params) => {
        return (
          `https://www.threads.net/intent/post?` +
          stringify({
            url: params.url,
            text: params.ogTitle
          })
        )
      }
    },
    {
      id: SocialMedia.Facebook,
      name: 'Facebook',
      class: 'facebook',
      url: (params) => {
        return (
          `https://www.facebook.com/share.php?` +
          stringify({
            t: params.ogTitle,
            u: encodeURI(params.url)
          })
        )
      }
    },
    {
      id: SocialMedia.LinkedIn,
      name: 'LinkedIn',
      class: 'linkedin',
      url: (params) => {
        return (
          `https://www.linkedin.com/shareArticle?` +
          stringify({
            title: params.ogTitle,
            url: params.url
          })
        )
      }
    },
    {
      id: SocialMedia.douban,
      name: '豆瓣',
      class: 'douban',
      url: (params) => {
        return (
          // https://www.douban.com/service/sharebutton
          `https://www.douban.com/recommend/?` +
          stringify({
            url: params.url,
            title: params.title
          })
        )
      }
    }
  ]

  const props = defineProps<{
    socials?: Array<SocialMedia>
    disabledCopyLink?: boolean
    disabledImageShare?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'shareAsImage'): void
  }>()

  const { gtag, route, isZhLang, i18n: _i18n } = useEnhancer()
  const enabledSocials = computed(() => {
    return props.socials?.length ? defaultSocials.filter((s) => props.socials?.includes(s.id)) : defaultSocials
  })

  const getURL = () => getPageURL(route.fullPath)
  const getTitle = () => document.title || APP_PROFILE.title
  const getOgTitle = () => document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? undefined
  const getDescription = () => {
    const pageDescription = document.getElementsByName('description')?.[0]?.getAttribute('content')
    return pageDescription || _i18n.t(LocalesKey.APP_SLOGAN)!
  }

  const copyPageURL = () => {
    const content = `${getTitle()} - ${getURL()}`
    copy(content).then(() => {
      alert(isZhLang.value ? '链接已复制到剪贴板！' : 'Link copied!')
    })
    gtag?.event('share_copy_url', {
      event_category: GAEventCategories.Share,
      event_label: content
    })
  }

  const shareAsImage = () => {
    emit('shareAsImage')
    gtag?.event('share_as_image', {
      event_category: GAEventCategories.Share,
      event_label: `${getTitle()} - ${getURL()}`
    })
  }

  const handleShare = (social: SocialItem) => {
    gtag?.event('share_social', {
      event_category: GAEventCategories.Share,
      event_label: social.id
    })

    const shareParams: ShareParams = {
      url: getURL(),
      title: getTitle(),
      ogTitle: getOgTitle(),
      description: getDescription()
    }

    if (social.handler) {
      social.handler(shareParams)
    } else if (social.url) {
      openPopupWindow(social.url(shareParams), { name: `Share: ${APP_PROFILE.title}` })
    }
  }
</script>

<template>
  <div class="share" v-disabled-wallflower>
    <button
      class="share-ejector"
      v-for="(social, index) in enabledSocials"
      :key="index"
      :title="'Share to: ' + social.name"
      :class="social.class"
      @click="handleShare(social)"
    >
      <i class="iconfont" :class="`icon-${social.iconfont ?? social.class}`" />
    </button>
    <button
      v-if="!props.disabledImageShare"
      class="share-ejector share-as-image"
      title="Share as image"
      @click="shareAsImage"
    >
      <i class="iconfont icon-image-share"></i>
    </button>
    <button v-if="!props.disabledCopyLink" class="share-ejector copy-link" title="Copy link" @click="copyPageURL">
      <i class="iconfont icon-link"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .share {
    @include mix.visibility-transition();

    > .share-ejector {
      cursor: pointer;
      display: inline-block;
      text-align: center;
      @include mix.background-transition();

      &.wechat:hover {
        background-color: $wechat-primary !important;
      }
      &.weibo:hover {
        background-color: $weibo-primary !important;
      }
      &.douban:hover {
        background-color: $douban-primary !important;
      }
      &.threads:hover {
        background-color: $threads-primary !important;
      }
      &.twitter:hover {
        background-color: $twitter-x-primary !important;
      }
      &.facebook:hover {
        background-color: $facebook-primary !important;
      }
      &.linkedin:hover {
        background-color: $linkedin-primary !important;
      }
      &.share-as-image:hover {
        background-color: $rss-primary !important;
      }
      &.copy-link:hover {
        background-color: $surmon !important;
      }

      &:hover {
        > .iconfont {
          color: $white;
        }
      }

      > .iconfont {
        display: block;
      }
    }
  }
</style>
