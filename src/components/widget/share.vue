<template>
  <div class="share">
    <a
      v-for="(social, index) in socials"
      :key="index"
      rel="nofollow noopener"
      class="share-ejector"
      :title="'Share to: ' + social.name"
      :class="social.class || social.name"
      @click.prevent="openShareWindow(social.name, social.url)"
    >
      <i class="iconfont" :class="`icon-${social.icon || social.class || social.name}`"></i>
    </a>
    <span class="share-ejector link" @click="copyPageUrl">
      <i class="iconfont icon-link"></i>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'
  import { getPageUrl } from '/@/transforms/url'
  import { copy } from '/@/utils/clipboard'
  import { META } from '/@/config/app.config'

  export default defineComponent({
    name: 'Share',
    setup() {
      const route = useRoute()
      const getUrl = () => getPageUrl(route.fullPath)
      const getTitle = () => document.title || META.title
      const getDescription = () => (
        document.getElementsByName('description')[0].getAttribute('content') ||
        META.description
      )

      const copyPageUrl = () => {
        // this.$ga.social('复制当页链接', GAEventActions.Click, getUrl())
        // this.$ga.event('复制当页链接', GAEventActions.Click, GAEventTags.Share)
        copy(getUrl())
      }

      const openShareWindow = (social, url) => {
        const targetUrl = url().includes('mailto')
          ? url().replace(/\s|\||Surmon.me/g, '')
          : encodeURI(url())
        // this.$ga.social(social, '分享', targetUrl)
        // this.$ga.event(
        //   '当页分享',
        //   GAEventActions.Click,
        //   GAEventTags.Share
        // )
        /*
        * screen.availWidth 获得屏幕宽度
        * screen.availHeight 获得屏幕高度
        * 居中的算法是：
        * 左右居中： (屏幕宽度 - 窗口宽度)/2
        * 上下居中： (屏幕高度 - 窗口高度)/2
        */
        // 给打开的窗口命名
        const windowName = `分享 ${META.title}`
        // 窗口宽度，需要设置
        const awidth = screen.availWidth / 6 * 2
        // 窗口高度，需要设置
        const aheight = screen.availHeight / 5 * 2
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
          url: () => `https://service.weibo.com/share/share.php?url=${getUrl()}&title=${getTitle()}&source=${getUrl()}&sourceUrl=${getUrl()}&content=${getDescription()}`
        },
        {
          name: 'twitter',
          url: () => `https://twitter.com/share?text=${getTitle()}&url=${getUrl()}`
        },
        {
          name: 'QQ空间',
          class: 'qzone',
          url: () => `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${getUrl()}&title=${getTitle()}&summary=${getDescription()}&site=${getUrl()}`
        },
        {
          name: '豆瓣',
          class: 'douban',
          url: () => `https://www.douban.com/recommend/?url=${getUrl()}&title=${getTitle()}`
        },
        {
          name: '人人',
          class: 'renren',
          url: () => `https://widget.renren.com/dialog/share?resourceUrl=${getUrl()}&srcUrl=${getUrl()}&title=${getTitle()}&description=${getDescription()}`
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
          url: () => `https://www.linkedin.com/shareArticle?title=${getTitle()}&summary=${getDescription()}&mini=true&url=${getUrl()}`
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
  @import 'src/assets/styles/init.scss';

  .share {
    @include visibility-transition();

    > .share-ejector {
      cursor: pointer;
      display: inline-block;
      text-align: center;
      @include background-transition();

      &.wechat:hover {
        background-color: rgb(123, 179, 46);
      }

      &.weibo:hover {
        background-color: rgb(230, 22, 45);
      }

      &.qzone:hover {
        background-color: rgb(43, 130, 217);
      }

      &.douban:hover {
        background-color: rgb(0, 119, 17);
      }

      &.renren:hover {
        background-color: rgb(0, 94, 172);
      }

      &.evernote:hover {
        background-color: rgb(139, 224, 86);
      }

      &.twitter:hover {
        background-color: rgb(85, 172, 238);
      }

      &.facebook:hover {
        background-color: rgb(59, 89, 152);
      }

      &.linkedin:hover {
        background-color: rgb(0, 123, 181);
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