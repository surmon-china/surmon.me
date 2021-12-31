<template>
  <div class="share">
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
    <button class="share-ejector link" @click="copyPageURL">
      <i class="iconfont icon-link"></i>
    </button>
  </div>
</template>

<script lang="ts">
  import qs from 'qs'
  import { defineComponent, PropType, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  import { renderTextToQRCodeDataURL } from '/@/transforms/qrcode'
  import { getPageUrl } from '/@/transforms/url'
  import { openWindow } from '/@/utils/opener'
  import { copy } from '/@/utils/clipboard'
  import { META } from '/@/config/app.config'

  export enum SocialMedia {
    Wechat = 'wechat',
    Weibo = 'weibo',
    Twitter = 'twitter',
    douban = 'douban',
    Evernote = 'evernote',
    Facebook = 'facebook',
    LinkedIn = 'linkedin'
  }

  interface ShareParams {
    url: string
    title: string
    description: string
  }

  interface SocialItem {
    id: SocialMedia
    name: string
    class: string
    handler?(share: ShareParams): void
    url?(share: ShareParams): string
  }

  const socials: SocialItem[] = [
    {
      id: SocialMedia.Wechat,
      name: '微信',
      class: 'wechat',
      handler: async (share) => {
        const dataURL = await renderTextToQRCodeDataURL(share.url)
        window.$popup.vImage(dataURL)
      }
    },
    {
      id: SocialMedia.Weibo,
      name: '微博',
      class: 'weibo',
      url: (share) => {
        return (
          `https://service.weibo.com/share/share.php?` +
          qs.stringify({
            url: share.url,
            source: share.url,
            sourceUrl: share.url,
            title: share.title,
            content: share.description
          })
        )
      }
    },
    {
      id: SocialMedia.Twitter,
      name: 'Twitter',
      class: 'twitter',
      url: (share) => {
        return (
          `https://twitter.com/share?` +
          qs.stringify({
            url: share.url,
            text: share.title
          })
        )
      }
    },
    {
      id: SocialMedia.Facebook,
      name: 'Facebook',
      class: 'facebook',
      url: (share) => {
        return (
          `https://www.facebook.com/sharer/sharer.php?` +
          qs.stringify({
            u: encodeURI(share.url)
          })
        )
      }
    },
    {
      id: SocialMedia.LinkedIn,
      name: 'LinkedIn',
      class: 'linkedin',
      url: (share) => {
        return (
          `https://www.linkedin.com/sharing/share-offsite/?` +
          qs.stringify({
            url: share.url
          })
        )
      }
    },
    {
      id: SocialMedia.douban,
      name: '豆瓣',
      class: 'douban',
      url: (share) => {
        return (
          // https://www.douban.com/service/sharebutton
          `https://www.douban.com/recommend/?` +
          qs.stringify({
            url: share.url,
            title: share.title,
            v: 1
          })
        )
      }
    },
    {
      id: SocialMedia.Evernote,
      name: '印象笔记',
      class: 'evernote',
      url: (share) => {
        return (
          `https://www.evernote.com/clip.action?` +
          qs.stringify({
            url: share.url,
            title: share.title
          })
        )
      }
    }
  ]

  export default defineComponent({
    name: 'Share',
    props: {
      socials: {
        type: Array as PropType<Array<SocialMedia>>,
        required: false
      }
    },
    setup(props) {
      const { route, gtag } = useEnhancer()
      const enabledSocials = computed(() => {
        return props.socials?.length
          ? socials.filter((s) => props.socials?.includes(s.id))
          : socials
      })

      const getURL = () => getPageUrl(route.fullPath)
      const getTitle = () => document.title || META.title
      const getDescription = () =>
        document.getElementsByName('description')?.[0]?.getAttribute('content') || META.sub_title

      const copyPageURL = () => {
        const content = `${getTitle()} - ${getURL()}`
        copy(content)
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

      return {
        enabledSocials,
        copyPageURL,
        handleShare
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
