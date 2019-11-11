<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span v-text="$i18n.nav.home"></span>
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <i class="iconfont icon-code"></i>
        <span v-text="$i18n.nav.code"></span>
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <i class="iconfont icon-thinking"></i>
        <span v-text="$i18n.nav.think"></span>
      </nuxt-link>
      <a
        href="https://github.surmon.me"
        target="_blank"
        class="item"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-experiment"></i>
        <span v-text="$i18n.nav.project"></span>
      </a>
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
        <i class="iconfont icon-tool"></i>
        <span v-text="$i18n.nav.service"></span>
      </nuxt-link>
      <nuxt-link to="/guestbook" class="item guestbook">
        <i class="iconfont icon-comment"></i>
        <span v-text="$i18n.nav.guestbook"></span>
      </nuxt-link>
      <a
        :href="adsForPcNav.holiday"
        target="_blank"
        class="item ad holiday"
        rel="external nofollow noopener"
        v-if="false"
      >
        <i class="iconfont icon-1111"></i>
        <span>超级红包</span>
      </a>
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
        <span class="superscript">
          <i class="iconfont icon-hot"></i>
        </span>
      </a>
      <a
        href="https://throwerror.io"
        target="_blank"
        class="item ad errend"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-debug"></i>
        <span>TE.io</span>
      </a>
      <a
        href="https://foxfinder.io"
        target="_blank"
        class="item ad foxfinder"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-fox-colour"></i>
        <span>FF.io</span>
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
    width: $navbar-width;
    height: auto;
    margin-right: $lg-gap;
    user-select: none;

    .nav-list {
      width: $navbar-width;
      padding: 0;
      margin: 0;
      position: fixed;

      > .item {
        border: none;
        display: block;
        position: relative;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 $lg-gap;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 1px;
        color: $text-secondary;
        font-family: webfont-normal, DINRegular;
        letter-spacing: 0.5px;
        margin-bottom: $sm-gap;

        &:hover {
          color: $primary;
        }

        > .superscript {
          margin-left: $xs-gap;

          @keyframes superscript-icon-color {
            0%  { color: chartreuse }
            15% { color: green }
            30% { color: red }
            45% { color: darkviolet }
            60% { color: pink }
            86% { color: blue }
            100% { color: black }
          }

          > .iconfont {
            color: $red;
            transition: color 0s;
            margin-right: 0;
            animation: superscript-icon-color 1s infinite;
          }
        }

        &:not(.ad) + .ad {
          border-top: 1px dashed $module-hover-bg;
        }

        &.ad {
          height: 5rem;
          line-height: 5rem;
          margin: 0;
          border-bottom: 1px dashed $module-hover-bg;
        }

        &.holiday {
          color: red;
        }

        &.taobao {
          color: #ff5000;
        }

        &.aliyun {
          color: #ff6a00;
        }

        &.errend {
          color: black;
        }

        &.foxfinder {
          color: #d15d26;
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
