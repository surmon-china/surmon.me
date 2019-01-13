<template>
  <div id="share">
    <div class="share-box" :class="{ mobile: isMobile }">
      <a
        :title="social.name"
        rel="nofollow noopener"
        class="share-link"
        :key="index"
        :class="social.class || social.name"
        v-for="(social, index) in socials"
        @click.prevent="shareWindow(social.name, social.url)"
      >
        <i class="iconfont" :class="`icon-${social.icon || social.class || social.name}`"></i>
      </a>
      <span class="share-link link" @click="copyPageUrl">
        <i class="iconfont icon-link"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    data() {
      return {
        socials: [
          {
            name: '微信',
            class: 'wechat',
            url: () => `http://qr.topscan.com/api.php?text=${this.url}&w=300&el=h&m=10`
          },
          {
            name: '微博',
            class: 'weibo',
            url: () => `http://service.weibo.com/share/share.php?url=${this.url}&title=${this.title()}&source=${this.url}&sourceUrl=${this.url}&content=${this.description()}`
          },
          {
            name: 'QQ空间',
            class: 'qzone',
            url: () => `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.url}&title=${this.title()}&summary=${this.description()}&site=${this.url}`
          },
          {
            name: '豆瓣',
            class: 'douban',
            url: () => `https://www.douban.com/recommend/?url=${this.url}&title=${this.title()}`
          },
          {
            name: '人人',
            class: 'renren',
            url: () => `http://widget.renren.com/dialog/share?resourceUrl=${this.url}&srcUrl=${this.url}&title=${this.title()}&description=${this.description()}`
          },
          {
            name: '印象笔记',
            class: 'evernote',
            url: () => `https://www.evernote.com/clip.action?url=${this.url}&title=${this.title()}`
          },
          {
            name: 'twitter',
            url: () => `http://twitter.com/share?text=${this.title()}&url=${this.url}`
          },
          {
            name: 'facebook',
            url: () => `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
          },
          {
            name: 'linkedin',
            url: () => `http://www.linkedin.com/shareArticle?title=${this.title()}&summary=${this.description()}&mini=true&url=${this.url}`
          },
          /*
          {
            name: 'email',
            class: 'mail',
            url: () => `mailto:?subject=${this.title()}&body=${this.url}`
          }
          */
        ]
      }
    },
    computed: {
      url() {
        return `https://surmon.me${this.$route.fullPath}`
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    methods: {
      copyPageUrl() {
        this.$ga.social('主站复制', '分享', this.url)
        this.$root.$copyToClipboard(this.url)
      },
      description() {
        try {
          if (document) {
            return document.getElementsByName('description')[0].getAttribute('content')
          }
        } catch (err) { 
          return ''
        }
      },
      title() {
        try {
          if (document) return document.title
        } catch (err) {
          return 'Surmon.me'
        }
      },
      shareWindow(social, url) {
        const targetUrl = url().includes('mailto')
          ? url().replace(/\s|\||Surmon.me/g, '')
          : encodeURI(url())
        this.$ga.social(social, '分享', targetUrl)
        /*
        * screen.availWidth 获得屏幕宽度
        * screen.availHeight 获得屏幕高度
        * 居中的算法是：
        * 左右居中： (屏幕宽度 - 窗口宽度)/2
        * 上下居中： (屏幕高度 - 窗口高度)/2
        *
        */
        // 给打开的窗口命名
        const windowName = '分享 Surmon.me'
        // 窗口宽度,需要设置
        const awidth = screen.availWidth / 6 * 2
        // 窗口高度,需要设置
        const aheight = screen.availHeight / 5 * 2
        // 窗口顶部位置,一般不需要改
        const atop = (screen.availHeight - aheight) / 2
        // 窗口放中央,一般不需要改
        const aleft = (screen.availWidth - awidth) / 2
        // 新窗口的参数
        const baseParam = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
        // 新窗口的左部位置，顶部位置，宽度，高度
        const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${baseParam}`
        // 打开新窗口
        const _window = window.open(targetUrl, windowName, params)
        // 新窗口获得焦点
        _window.focus()
      }
    }
  }
</script>

<style lang="scss" scoped>
  #share {

    .share-box {

      &.mobile {

        > .share-link {
          display: none;

          &[class*="wechat"],
          &[class*="weibo"],
          &[class*="qzone"] {
            display: inline-block;
          }
        }
      }

      > .share-link {
        cursor: pointer;
        display: inline-block;
        text-align: center;

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

        &.google-plus:hover {
          background-color: rgb(221, 75, 57);
        }

        &.linkedin:hover {
          background-color: rgb(0, 123, 181);
        }

        &.mail:hover {
          background-color: #5dc732;
        }

        &.link:hover {
          background-color: #e67a1c;
        }

        &:hover {

          > .iconfont {
            color: #fff;
          }
        }
      }
    }
  }
</style>
