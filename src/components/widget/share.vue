<script lang="ts">
  export enum SocialMedia {
    Wechat = 'wechat',
    Weibo = 'weibo',
    Twitter = 'twitter',
    douban = 'douban',
    Evernote = 'evernote',
    Facebook = 'facebook',
    LinkedIn = 'linkedin'
  }
</script>

<script lang="ts" setup>
  import qs from 'qs'
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { GAEventCategories } from '/@/constants/gtag'
  import { renderTextToQRCodeDataURL } from '/@/transforms/qrcode'
  import { getPageURL } from '/@/transforms/url'
  import { openWindow } from '/@/utils/opener'
  import { copy } from '/@/utils/clipboard'
  import { META } from '/@/config/app.config'

  interface ShareParams {
    url: string
    title: string
    description: string
  }

  interface SocialItem {
    id: SocialMedia
    name: string
    class: string
    handler?(params: ShareParams): void
    url?(params: ShareParams): string
  }

  const defaultSocials: SocialItem[] = [
    {
      id: SocialMedia.Wechat,
      name: '微信',
      class: 'wechat',
      handler: async (params) => {
        const dataURL = await renderTextToQRCodeDataURL(params.url)
        window.$popup.vImage(dataURL)
      }
    },
    {
      id: SocialMedia.Weibo,
      name: '微博',
      class: 'weibo',
      url: (params) => {
        return (
          `https://service.weibo.com/share/share.php?` +
          qs.stringify({
            url: params.url,
            source: params.url,
            sourceUrl: params.url,
            title: params.title,
            content: params.description
          })
        )
      }
    },
    {
      id: SocialMedia.Twitter,
      name: 'Twitter',
      class: 'twitter',
      url: (params) => {
        return (
          `https://twitter.com/share?` +
          qs.stringify({
            url: params.url,
            text: params.title
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
          qs.stringify({
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
          `https://www.linkedin.com/sharing/share-offsite/?` +
          qs.stringify({
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
          `https://www.douban.com/share/service?` +
          qs.stringify({
            href: params.url,
            name: params.title
            // image: '',
            // updated: '',
            // bm: ''
          })
        )
      }
    },
    {
      id: SocialMedia.Evernote,
      name: 'Evernote',
      class: 'evernote',
      url: (params) => {
        return (
          `https://www.evernote.com/clip.action?` +
          qs.stringify({
            url: params.url,
            title: params.title
          })
        )
      }
    }
  ]

  const props = defineProps<{
    socials?: Array<SocialMedia>
  }>()

  const { i18n: _i18n, gtag, route, isZhLang } = useEnhancer()
  const enabledSocials = computed(() => {
    return props.socials?.length ? defaultSocials.filter((s) => props.socials?.includes(s.id)) : defaultSocials
  })

  const getURL = () => getPageURL(route.fullPath)
  const getTitle = () => document.title || META.title
  const getDescription = () => {
    const pageDescription = document.getElementsByName('description')?.[0]?.getAttribute('content')
    return pageDescription || _i18n.t(LanguageKey.APP_SLOGAN)!
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

  const handleShare = (social: SocialItem) => {
    gtag?.event('share_social', {
      event_category: GAEventCategories.Share,
      event_label: social.id
    })

    const shareParams: ShareParams = {
      url: getURL(),
      title: getTitle(),
      description: getDescription()
    }

    if (social.handler) {
      social.handler(shareParams)
    } else {
      openWindow(social.url!(shareParams), { name: `Share: ${META.title}` })
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
      <i class="iconfont" :class="`icon-${social.class}`" />
    </button>
    <button class="share-ejector link" title="Copy link" @click="copyPageURL">
      <i class="iconfont icon-link"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .share {
    @include visibility-transition();

    > .share-ejector {
      cursor: pointer;
      display: inline-block;
      text-align: center;
      @include background-transition();

      &.wechat:hover {
        background-color: $wechat-primary !important;
      }
      &.weibo:hover {
        background-color: $weibo-primary !important;
      }
      &.douban:hover {
        background-color: $douban-primary !important;
      }
      &.evernote:hover {
        background-color: $evernote-primary !important;
      }
      &.twitter:hover {
        background-color: $twitter-primary-hover !important;
      }
      &.facebook:hover {
        background-color: $facebook-primary !important;
      }
      &.linkedin:hover {
        background-color: $linkedin-primary !important;
      }
      &.link:hover {
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
