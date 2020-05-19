<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list" :class="{ en: isEnLang }">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span class="text" v-text="$i18n.nav.home"></span>
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <i class="iconfont icon-code"></i>
        <span class="text" v-text="$i18n.nav.code"></span>
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <i class="iconfont icon-thinking"></i>
        <span class="text" v-text="$i18n.nav.think"></span>
      </nuxt-link>
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        :href="appConfig.links.project"
      >
        <i class="iconfont icon-experiment"></i>
        <span class="text" v-text="$i18n.nav.project"></span>
      </a>
      <nuxt-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span class="text" v-text="$i18n.nav.music"></span>
      </nuxt-link>
      <nuxt-link to="/vlog" class="item">
        <i class="iconfont icon-vlog"></i>
        <span class="text" v-text="$i18n.nav.vlog"></span>
      </nuxt-link>
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        :href="appConfig.links.instagram"
      >
        <i class="iconfont icon-instagram"></i>
        <span class="text" v-text="$i18n.nav.instagram"></span>
      </a>
      <nuxt-link to="/about" class="item">
        <i class="iconfont icon-user"></i>
        <span class="text" v-text="$i18n.nav.about"></span>
      </nuxt-link>
      <nuxt-link to="/service" class="item">
        <i class="iconfont icon-tool"></i>
        <span class="text" v-text="$i18n.nav.service"></span>
      </nuxt-link>
      <nuxt-link to="/guestbook" class="item guestbook">
        <i class="iconfont icon-comment"></i>
        <span class="text" v-text="$i18n.nav.guestbook"></span>
      </nuxt-link>
      <!-- <a
        v-if="false"
        :href="adConfig.nav.holiday"
        target="_blank"
        class="item ad holiday"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-1111"></i>
        <span>超级红包</span>
      </a>
      <a
        v-if="false"
        :href="adConfig.nav.taobao"
        target="_blank"
        class="item ad taobao"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-taobao"></i>
        <span class="text" v-text="$i18n.nav.taobao"></span>
      </a> -->
      <a
        :href="adConfig.nav.aliyun"
        target="_blank"
        class="item ad aliyun"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-aliyun"></i>
        <span class="text" v-text="$i18n.nav.aliyun"></span>
        <span class="superscript">
          <i class="iconfont icon-hot"></i>
        </span>
      </a>
      <a
        target="_blank"
        class="item ad throwerror"
        rel="external nofollow noopener"
        :href="appConfig.links.throwerror"
      >
        <i class="iconfont icon-debug"></i>
        <span class="text">TE.io</span>
      </a>
      <a
        target="_blank"
        class="item ad foxfinder"
        rel="external nofollow noopener"
        :href="appConfig.links.foxfinder"
      >
        <i class="iconfont icon-fox-colour"></i>
        <span class="text">FF.io</span>
      </a>
      <nuxt-link to="/app" class="item app">
        <i class="iconfont icon-app"></i>
        <span class="text" v-text="$i18n.nav.app"></span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
  import adConfig from '~/config/ad.config'
  import appConfig from '~/config/app.config'
  export default {
    name: 'PcNav',
    computed: {
      adConfig: () => adConfig,
      appConfig: () => appConfig,
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      }
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

      &.en {
        .item {
          .text {
            font-size: $font-size-h6;
          }
        }
      }

      .item {
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
        font-family: 'webfont-normal', DINRegular;
        letter-spacing: 0.5px;
        margin-bottom: $sm-gap;
        @include color-transition();

        &:hover {
          color: $primary;
        }

        > .superscript {
          margin-left: $xs-gap;

          @keyframes superscript-icon-color {
            0% { color: $accent }
            30% { color: $primary }
            60% { color: $black }
            80% { color: $red }
          }

          > .iconfont {
            margin-right: 0;
            color: $red;
            transition: color 0s;
            animation: superscript-icon-color .66s infinite;
          }
        }

        &:not(.ad) + .ad {
          border-top: 1px dashed $module-hover-bg;
        }

        &.ad {
          height: 5rem;
          line-height: 5rem;
          border-bottom: 1px dashed $module-hover-bg;
          margin: 0;
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

        &.throwerror {
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
          margin-right: $gap;
          display: inline-block;
        }
      }
    }
  }
</style>
