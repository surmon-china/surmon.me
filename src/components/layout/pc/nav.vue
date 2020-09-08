<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list" :class="{ en: !isZhLang }">
      <router-link to="/" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_HOME" />
      </router-link>
      <router-link class="item" :to="getCategoryArchiveRoute(CategorySlug.Code)">
        <i class="iconfont icon-code"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.CATEGORY_CODE" />
      </router-link>
      <router-link class="item" :to="getCategoryArchiveRoute(CategorySlug.Insight)">
        <i class="iconfont icon-thinking"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.CATEGORY_INSIGHT" />
      </router-link>
      <ulink class="item" :href="VALUABLE_LINKS.GITHUB">
        <i class="iconfont icon-github"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_GITHUB" />
      </ulink>
      <router-link class="item" :to="getPageRoute(RouteName.Music)">
        <i class="iconfont icon-netease-music"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_MUSIC" />
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Lens)">
        <i class="iconfont icon-lens"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_LENS" />
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.About)">
        <i class="iconfont icon-user"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_ABOUT" />
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Job)">
        <i class="iconfont icon-horse"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_JOB" />
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Freelancer)">
        <i class="iconfont icon-tool"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_FREELANCER" />
      </router-link>
      <router-link class="item guestbook" :to="getPageRoute(RouteName.Guestbook)">
        <i class="iconfont icon-comment"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_GUESTBOOK" />
      </router-link>
      <template v-for="(ad, index) in ads">
        <template v-if="!ad.disabled">
          <span class="separator" :key="index"></span>
          <ulink class="item" :href="ad.url" :key="index">
            <i
              class="iconfont"
              :class="ad.icon"
              :style="{ color: ad.color }"
            ></i>
            <span class="text" :style="{ color: ad.color }">
              <template v-if="ad.i18n">
                <i18n :zh="ad.i18n.zh" :en="ad.i18n.en" />
              </template>
              <template v-else>
                {{ ad.text }}
              </template>
            </span>
            <span class="superscript" v-if="ad.hot">
              <i class="iconfont icon-hot"></i>
            </span>
          </ulink>
        </template>
      </template>
      <span class="separator"></span>
      <router-link class="item app" :to="getPageRoute(RouteName.App)">
        <i class="iconfont icon-app"></i>
        <span class="text" v-i18n="LANGUAGE_KEYS.PAGE_APP" />
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { getPageRoute, getCategoryArchiveRoute } from '/@/transforms/route'
  import { RouteName, CategorySlug } from '/@/router'
  import { PC_NAV as ads } from '/@/config/ad.config'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'PcNav',
    setup() {
      const { i18n, store, globalState, isZhLang } = useEnhancer()
      return {
        ads,
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        RouteName,
        CategorySlug,
        isZhLang,
        getPageRoute,
        getCategoryArchiveRoute
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
