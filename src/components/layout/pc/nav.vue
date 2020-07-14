<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list" :class="{ en: isEnLang }">
      <router-link to="/" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_HOME" />
      </router-link>
      <router-link to="/category/code" class="item">
        <i class="iconfont icon-code"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.CATEGORY_CODE" />
      </router-link>
      <router-link to="/category/think" class="item">
        <i class="iconfont icon-thinking"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.CATEGORY_THINK" />
      </router-link>
      <a
        target="_blank"
        class="item"
        rel="external nofollow noopener"
        :href="APP_CONFIG.LINKS.project"
      >
        <i class="iconfont icon-experiment"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_PROJECT" />
      </a>
      <router-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_MUSIC" />
      </router-link>
      <router-link to="/lens" class="item">
        <i class="iconfont icon-lens"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_LENS" />
      </router-link>
      <router-link to="/job" class="item">
        <i class="iconfont icon-horse"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_JOB" />
      </router-link>
      <router-link to="/about" class="item">
        <i class="iconfont icon-user"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_ABOUT" />
      </router-link>
      <router-link to="/service" class="item">
        <i class="iconfont icon-tool"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_SERVICE" />
      </router-link>
      <router-link to="/guestbook" class="item guestbook">
        <i class="iconfont icon-comment"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_GUESTBOOK" />
      </router-link>
      <!-- <a
        :href="AD_CONFIG.nav.holiday"
        target="_blank"
        class="item ad holiday"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-1111"></i>
        <span>超级红包</span>
      </a> -->
      <!-- <a
        :href="AD_CONFIG.nav.taobao"
        target="_blank"
        class="item ad taobao"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-taobao"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.AD_LINK_TAOBAO" />
      </a> -->
      <a
        :href="AD_CONFIG.nav.aliyun"
        target="_blank"
        class="item ad aliyun"
        rel="external nofollow noopener"
      >
        <i class="iconfont icon-aliyun"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.AD_LINK_ALIYUN" />
        <span class="superscript">
          <i class="iconfont icon-hot"></i>
        </span>
      </a>
      <!-- <a
        target="_blank"
        class="item ad throwerror"
        rel="external nofollow noopener"
        :href="APP_CONFIG.LINKS.throwerror"
      >
        <i class="iconfont icon-debug"></i>
        <span class="text">TE.io</span>
      </a> -->
      <a
        target="_blank"
        class="item ad foxfinder"
        rel="external nofollow noopener"
        :href="APP_CONFIG.LINKS.foxfinder"
      >
        <i class="iconfont icon-fox-colour"></i>
        <span class="text">FF.io</span>
      </a>
      <router-link to="/app" class="item app">
        <i class="iconfont icon-app"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_APP" />
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
  import * as APP_CONFIG from '/@/config/app.config'
  import AD_CONFIG from '/@/config/ad.config'
  import { defineComponent, computed } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { useI18n } from '/@/services/i18n'
  import { useStore } from '/@/store'
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'PcNav',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const globalState = useGlobalState()
      const isEnLang = computed(() => {
        i18n.language.value === Language.En
      })

      return {
        AD_CONFIG,
        APP_CONFIG,
        LANGUAGE_KEYS,
        isEnLang,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

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
          font-weight: normal;
        }
      }
    }
  }
</style>
