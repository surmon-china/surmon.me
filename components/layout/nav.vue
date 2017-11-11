<template>
  <div class="aside-nav">
    <nav class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <i class="iconfont icon-code"></i>
        <span>Code</span>
      </nuxt-link>
      <nuxt-link to="/project" class="item">
        <i class="iconfont icon-tool"></i>
        <span>Project</span>
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <i class="iconfont icon-think"></i>
        <span>Think</span>
      </nuxt-link>
      <nuxt-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span>Music</span>
      </nuxt-link>
      <nuxt-link to="/category/movie" class="item" v-if="false">
        <i class="iconfont icon-movie"></i>
        <span>Movie</span>
      </nuxt-link>
      <nuxt-link to="/about" class="item">
        <i class="iconfont icon-user"></i>
        <span>About</span>
      </nuxt-link>
      <nuxt-link to="/service" class="item">
        <i class="iconfont icon-zan-top"></i>
        <span>Service</span>
      </nuxt-link>
      <nuxt-link to="/guestbook" class="item">
        <i class="iconfont icon-comment"></i>
        <span>Guestbook</span>
      </nuxt-link>
      <a href="https://s.click.taobao.com/vkjaBYw" 
         rel="external nofollow noopener"
         class="item ad taobao"
         target="_blank">
        <i class="iconfont icon-taobao"></i>
        <span>Taobao</span>
      </a>
      <a href="https://s.click.taobao.com/gflYBYw" 
         rel="external nofollow noopener"
         class="item ad aliyun"
         target="_blank">
        <i class="iconfont icon-aliyun"></i>
        <span>Aliyun</span>
      </a>
      <a href="https://errend.io"
         rel="external nofollow noopener"
         class="item ad errend"
         target="_blank">
        <i class="iconfont icon-debug"></i>
        <span>Errend.io</span>
      </a>
      <nuxt-link to="/app" class="item app">
        <i class="iconfont icon-app"></i>
        <span>App</span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'layout-nav'
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  .aside-nav {
    position: fixed;
    display: inline-block;
    width: 11.5em;
    top: 5.5em;
    left: calc((100% - 75em) / 2);

    .nav-list {
      padding: 0;
      margin: 0;

      > .item {
        border: none;
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 1px;
        color: #777;
        font-family: DINRegular, CenturyGothic;
        margin-bottom: .5em;

        &:hover {
          color: $primary;
        }
        
        &.ad {
          height: 5rem;
          line-height: 5rem;
          margin: 0;
          border-bottom: 1px dashed #d6d6d6;
        }

        &.taobao {
          color: #ff5000;
          border-top: 1px dashed #d6d6d6;

          > .iconfont {
            color: #ff5000;
          }
        }

        &.aliyun {
          color: black;

          > .iconfont {
            color: black;
          }
        }

        &:last-child {
          margin-top: 1rem;
          margin-bottom: 0;
        }

        &.link-active {
          background-color: #eee;
          font-weight: bold;
          color: $primary;
          background-color: $module-bg;
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
</style>
