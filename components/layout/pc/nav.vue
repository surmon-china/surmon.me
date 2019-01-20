<template>
  <div id="nav" class="aside-nav">
    <nav is="nav" class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span v-text="$i18n.nav.home"></span>
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <i class="iconfont icon-code"></i>
        <span v-text="$i18n.nav.code"></span>
      </nuxt-link>
      <nuxt-link to="/project" class="item">
        <i class="iconfont icon-tool"></i>
        <span v-text="$i18n.nav.project"></span>
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <i class="iconfont icon-think"></i>
        <span v-text="$i18n.nav.think"></span>
      </nuxt-link>
      <nuxt-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span v-text="$i18n.nav.music"></span>
      </nuxt-link>
      <nuxt-link to="/vlog" class="item">
        <i class="iconfont icon-vlog"></i>
        <span v-text="$i18n.nav.vlog"></span>
      </nuxt-link>
      <nuxt-link to="/about" class="item">
        <i class="iconfont icon-user"></i>
        <span v-text="$i18n.nav.about"></span>
      </nuxt-link>
      <nuxt-link to="/service" class="item">
        <i class="iconfont icon-zan"></i>
        <span v-text="$i18n.nav.service"></span>
        <span class="superscript">
          <i class="iconfont icon-hot"></i>
        </span>
      </nuxt-link>
      <nuxt-link to="/guestbook" class="item guestbook">
        <i class="iconfont icon-comment"></i>
        <span v-text="$i18n.nav.guestbook"></span>
      </nuxt-link>
      <a
        :href="adsForPcNav.taobao"
        target="_blank"
        class="item ad taobao"
        rel="external nofollow noopener"
        v-if="false"
      >
        <i class="iconfont icon-taobao"></i>
        <span v-text="$i18n.nav.taobao"></span>
      </a>
      <a
        :href="adsForPcNav.aliyun"
        target="_blank"
        class="item ad aliyun"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-aliyun"></i>
        <span v-text="$i18n.nav.aliyun"></span>
      </a>
      <a
        href="https://errend.io"
        target="_blank"
        class="item ad errend"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-debug"></i>
        <span>Errend.io</span>
      </a>
      <nuxt-link to="/app" class="item app">
        <i class="iconfont icon-app"></i>
        <span v-text="$i18n.nav.app"></span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
  import adConfig from '~/config/ad.config'
  export default {
    name: 'layout-nav',
    computed: {
      adsForPcNav: () => adConfig.pc.nav
    }
  }
</script>

<style lang="scss" scoped>
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
        color: $secondary;
        font-family: webfont-normal, DINRegular;
        letter-spacing: 0.5px;
        margin-bottom: .5em;
        position: relative;

        &:hover {
          color: $primary;
        }

        > .superscript {
          margin-left: 1rem;

          @keyframes superscript-icon-color {
            0%   { color: chartreuse }
            15%  { color: green }
            30%  { color: red }
            45%  { color: darkviolet }
            60% { color: pink }
            86% { color: blue }
            100% { color: black }
          }

          > .iconfont {
            color: $red;
            transition: color 0s;
            animation: superscript-icon-color 1s infinite;
          }
        }
        
        &.ad {
          height: 5rem;
          line-height: 5rem;
          margin: 0;
          border-bottom: 1px dashed $module-hover-bg;
        }

        &.taobao {
          color: #ff5000;
          border-top: 1px dashed $module-hover-bg;

          > .iconfont {
            color: #ff5000;
          }
        }

        &.aliyun {
          color: black;
          border-top: 1px dashed $module-hover-bg;

          > .iconfont {
            color: black;
          }
        }

         &.app {
          color: $primary;

          > .iconfont {
            color: $primary;
          }
        }

        &:last-child {
          margin-top: 1rem;
          margin-bottom: 0;
        }

        &.link-active {
          font-weight: bold;
          color: $primary;
          background-color: $module-bg;

          &.guestbook {
            background: linear-gradient(to bottom, $module-bg, transparent);
          }
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
