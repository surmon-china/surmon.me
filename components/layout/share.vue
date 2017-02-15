<template>
  <div id="share">
    <div class="share-box">
      <a title="微信" 
         rel="nofollow"
         class="share-link wechat"
         @click.prevent="shareWindow(`http://qr.topscan.com/api.php?text=${url}&w=300&el=h&m=10`)">
        <i class="iconfont icon-wechat"></i>
      </a>
      <a title="微博" 
         rel="nofollow"
         class="share-link weibo"
         @click.prevent="shareWindow(`http://service.weibo.com/share/share.php?url=${url}&title=${title()}&source=${url}&sourceUrl=${url}&content=${description()}`)">
        <i class="iconfont icon-weibo"></i>
      </a>
      <a title="QQ空间" 
         rel="nofollow"
         class="share-link qzone"
         @click.prevent="shareWindow(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title()}&summary=${description()}&site=${url}`)">
        <i class="iconfont icon-qzone"></i>
      </a>
      <a title="豆瓣" 
         rel="nofollow"
         class="share-link douban"
         @click.prevent="shareWindow(`https://www.douban.com/recommend/?url=${url}&title=${title()}`)">
        <i class="iconfont icon-douban"></i>
      </a>
      <a title="人人网" 
         rel="nofollow"
         class="share-link renren"
         @click.prevent="shareWindow(`http://widget.renren.com/dialog/share?resourceUrl=${url}&srcUrl=${url}&title=${title()}&description=${description()}`)">
        <i class="iconfont icon-renren"></i>
      </a>
      <a title="印象笔记" 
         rel="nofollow"
         class="share-link evernote"
         @click.prevent="shareWindow(`https://www.evernote.com/clip.action?url=${url}&title=${title()}`)">
        <i class="iconfont icon-evernote"></i>
      </a>
      <a title="twitter" 
         rel="nofollow"
         class="share-link twitter"
         @click.prevent="shareWindow(`http://twitter.com/share?text=${title()}&url=${url}`)">
        <i class="iconfont icon-twitter"></i>
      </a>
      <a title="facebook" 
         rel="nofollow"
         class="share-link facebook"
         @click.prevent="shareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}`)">
        <i class="iconfont icon-facebook"></i>
      </a>
      <a title="google plus" 
         rel="nofollow"
         class="share-link google-plus"
         @click.prevent="shareWindow(`https://plus.google.com/share?url=${url}`)">
        <i class="iconfont icon-google-plus"></i>
      </a>
      <a title="linkedin" 
         rel="nofollow"
         class="share-link linkedin"
         @click.prevent="shareWindow(`http://www.linkedin.com/shareArticle?title=${title()}&summary=${description()}&mini=true&url=${url}`)">
        <i class="iconfont icon-linkedin"></i>
      </a>
      <a title="email" 
         rel="nofollow"
         class="share-link mail"
         @click.prevent="shareWindow(`mailto:?subject=%E5%A4%9A%E5%B7%B4%E8%83%BA%20%7C%20Surmon.me&body=https%3A%2F%2Fsurmon.me%2Farticle%2F3`)">
        <i class="iconfont icon-mail"></i>
      </a>
      <span ref="share_copy_btn"
            class="share-link link" 
            rel="nofollow"
            :data-clipboard-text="url">
        <i class="iconfont icon-link"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    mounted() {
      this.clipboard = new Clipboard(this.$refs.share_copy_btn)
    },
    computed: {
      url() {
        return `https://surmon.me${this.$route.fullPath}`
      }
    },
    methods: {
      description() {
        try { if (document) return document.getElementsByName('description')[0].getAttribute('content') } 
        catch (err) { return '' }
      },
      title() {
        try { if (document) return document.title } 
        catch (err) { return 'Surmon.me' }
      },
      shareWindow(url) {
        url = url.includes('mailto') ? url : encodeURI(url)
        let winName = "newWin"; //给打开的窗口命名
        // screen.availWidth 获得屏幕宽度
        // screen.availHeight 获得屏幕高度
        // 居中的算法是：
        // 左右居中： (屏幕宽度 - 窗口宽度)/2
        // 上下居中： (屏幕高度 - 窗口高度)/2
        let awidth = screen.availWidth/6*2; //窗口宽度,需要设置
        let aheight = screen.availHeight/5*2; //窗口高度,需要设置
        let atop = (screen.availHeight - aheight)/2; //窗口顶部位置,一般不需要改
        let aleft = (screen.availWidth - awidth)/2; //窗口放中央,一般不需要改
        let param0 = "scrollbars=0,status=0,menubar=0,resizable=2,location=0"; //新窗口的参数
        //新窗口的左部位置，顶部位置，宽度，高度
        let params = "top=" + atop + ",left=" + aleft + ",width=" + awidth + ",height=" + aheight + "," + param0 ;
        const win = window.open(url, winName, params); //打开新窗口
        win.focus(); //新窗口获得焦点
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  #share {

    .share-box {

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
