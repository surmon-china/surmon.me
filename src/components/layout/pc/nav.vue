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
      <!-- holiday mail -->
      <template v-if="false">
        <span class="separator"></span>
        <a
          :href="AD_CONFIG.nav.holiday"
          target="_blank"
          class="item holiday"
          rel="external nofollow noopener"
        >
          <i class="iconfont icon-1111"></i>
          <span>超级红包</span>
        </a>
      </template>
      <!-- taobao -->
      <template v-if="false">
        <span class="separator"></span>
        <a
          :href="AD_CONFIG.nav.taobao"
          target="_blank"
          class="item taobao"
          rel="external nofollow noopener"
        >
          <i class="iconfont icon-taobao"></i>
          <span class="text" v-i18n="LANGUAGE_KEYS.AD_LINK_TAOBAO" />
        </a>
      </template>
      <!-- aliyun -->
      <template v-if="true">
        <span class="separator"></span>
        <a
          :href="AD_CONFIG.nav.aliyun"
          target="_blank"
          class="item aliyun"
          rel="external nofollow noopener"
        >
          <i class="iconfont icon-aliyun"></i>
          <span class="text" v-i18n="LANGUAGE_KEYS.AD_LINK_ALIYUN" />
          <span class="superscript">
            <i class="iconfont icon-hot"></i>
          </span>
        </a>
      </template>
      <!-- throwerror -->
      <template v-if="false">
        <span class="separator"></span>
        <a
          target="_blank"
          class="item throwerror"
          rel="external nofollow noopener"
          :href="APP_CONFIG.LINKS.throwerror"
        >
          <i class="iconfont icon-debug"></i>
          <span class="text">TE.io</span>
        </a>
      </template>
      <!-- foxfinder -->
      <template v-if="false">
        <span class="separator"></span>
        <a
          target="_blank"
          class="item foxfinder"
          rel="external nofollow noopener"
          :href="APP_CONFIG.LINKS.foxfinder"
        >
          <i class="iconfont icon-fox-colour"></i>
          <span class="text">FF.io</span>
        </a>
      </template>
      <span class="separator"></span>
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
        display: block;
        position: relative;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 $lg-gap;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: $mini-radius;
        color: $text-secondary;
        font-family: 'webfont-normal', DINRegular;
        letter-spacing: 0.5px;
        margin-bottom: $sm-gap;
        transition:
          color $transition-time-fast,
          background-color $transition-time-fast;
        @include radius-box($sm-radius);

        &:hover {
          color: $primary-lighter;
          background-color: $module-bg-translucent;
        }

        > .superscript {
          margin-left: $sm-gap;

          .iconfont {
            margin-right: 0;
            color: $red;
          }
        }

        &.holiday {
          color: red;
        }
        &.taobao {
          color: $taobao-primary;
        }
        &.aliyun {
          color: $aliyun-primary;
        }
        &.throwerror {
          color: $throwerror-primary;
        }
        &.foxfinder {
          color: $foxfinder-primary;
        }

        &.app {
          color: $primary;
          > .iconfont {
            color: $primary;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        &.link-active {
          color: $primary;
          background-color: $module-bg-lighter;

          &.guestbook {
            background: linear-gradient(
              to bottom,
              $module-bg-lighter,
              transparent
            );
          }
        }

        .iconfont {
          width: 1em;
          margin-right: $gap;
          display: inline-block;
          font-weight: normal;
        }
      }

      .separator {
        display: block;
        height: 0;
        background-color: transparent;
        border-top: 1px dotted $module-bg-darker-2;
        margin-bottom: $sm-gap;
      }
    }
  }
</style>
