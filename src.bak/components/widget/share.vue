<template>
  <div class="share">
    <button
      class="share-ejector"
      v-for="(social, index) in socials"
      :key="index"
      :title="'Share to: ' + social.name"
      :class="social.class || social.name"
      @click="openShareWindow(social.name, social.url)"
    >
      <i class="iconfont" :class="`icon-${social.icon || social.class || social.name}`" />
    </button>
    <button class="share-ejector link" @click="copyPageUrl">
      <i class="iconfont icon-link"></i>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { useEnhancer } from '../../../src/app/enhancer'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'
  import { getPageUrl } from '/@/transforms/url'
  import { copy } from '/@/utils/clipboard'
  import { META } from '/@/config/app.config'

  export default defineComponent({
    name: 'Share',
    setup() {
      const { route, gtag } = useEnhancer()
      const getUrl = () => getPageUrl(route.fullPath)
      const getTitle = () => document.title || META.title
      const getDescription = () =>
        document.getElementsByName('description')[0].getAttribute('content') || META.description

      const copyPageUrl = () => {
        copy(getUrl())
        gtag?.event('复制当页链接', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Share
        })
      }

      const openShareWindow = (social, url) => {
        const targetUrl = url().includes('mailto')
          ? url().replace(/\s|\||Surmon.me/g, '')
          : encodeURI(url())
        // screen.availWidth 获得屏幕宽度
        // screen.availHeight 获得屏幕高度
        // 居中的算法是：
        // 左右居中： (屏幕宽度 - 窗口宽度)/2
        // 上下居中： (屏幕高度 - 窗口高度)/2
        // 给打开的窗口命名
        const windowName = `分享 ${META.title}`
        // 窗口宽度，需要设置
        const awidth = (screen.availWidth / 6) * 2
        // 窗口高度，需要设置
        const aheight = (screen.availHeight / 5) * 2
        // 窗口顶部位置，一般不需要改
        const atop = (screen.availHeight - aheight) / 2
        // 窗口放中央，一般不需要改
        const aleft = (screen.availWidth - awidth) / 2
        // 新窗口的参数
        const baseParam = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
        // 新窗口的左部位置，顶部位置，宽度，高度
        const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${baseParam}`
        // 打开新窗口
        const _window = window.open(targetUrl, windowName, params)
        // 新窗口获得焦点
        _window?.focus()

        gtag?.event('当页分享', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Share
        })
      }

      const socials = [
        {
          name: '微信',
          class: 'wechat',
          url: () => `/partials/qrcode.html?url=${getUrl()}`
        },
        {
          name: '微博',
          class: 'weibo',
          url: () =>
            `https://service.weibo.com/share/share.php?url=${getUrl()}&title=${getTitle()}&source=${getUrl()}&sourceUrl=${getUrl()}&content=${getDescription()}`
        },
        {
          name: 'twitter',
          url: () => `https://twitter.com/share?text=${getTitle()}&url=${getUrl()}`
        },
        {
          name: 'QQ空间',
          class: 'qzone',
          url: () =>
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${getUrl()}&title=${getTitle()}&summary=${getDescription()}&site=${getUrl()}`
        },
        {
          name: '豆瓣',
          class: 'douban',
          url: () => `https://www.douban.com/recommend/?url=${getUrl()}&title=${getTitle()}`
        },
        {
          name: '人人',
          class: 'renren',
          url: () =>
            `https://widget.renren.com/dialog/share?resourceUrl=${getUrl()}&srcUrl=${getUrl()}&title=${getTitle()}&description=${getDescription()}`
        },
        {
          name: '印象笔记',
          class: 'evernote',
          url: () => `https://www.evernote.com/clip.action?url=${getUrl()}&title=${getTitle()}`
        },
        {
          name: 'facebook',
          url: () => `https://www.facebook.com/sharer/sharer.php?u=${getUrl()}`
        },
        {
          name: 'linkedin',
          url: () =>
            `https://www.linkedin.com/shareArticle?title=${getTitle()}&summary=${getDescription()}&mini=true&url=${getUrl()}`
        }
      ]

      return {
        socials,
        copyPageUrl,
        openShareWindow
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
        background-color: $wechat-primary;
      }
      &.weibo:hover {
        background-color: $weibo-primary;
      }
      &.qzone:hover {
        background-color: $qzone-primary;
      }
      &.douban:hover {
        background-color: $douban-primary;
      }
      &.renren:hover {
        background-color: $renren-primary;
      }
      &.evernote:hover {
        background-color: $evernote-primary;
      }
      &.twitter:hover {
        background-color: $twitter-primary-hover;
      }
      &.facebook:hover {
        background-color: $facebook-primary;
      }
      &.linkedin:hover {
        background-color: $linkedin-primary;
      }
      &.link:hover {
        background-color: #e67a1c;
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
