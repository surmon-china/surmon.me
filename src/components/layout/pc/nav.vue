<template>
  <div :id="NAV_ELEMENT_ID" class="aside-nav">
    <nav class="nav-list" :class="{ en: !isZhLang }">
      <template v-for="menu in menus" :key="menu.id">
        <span class="separator" v-if="menu.separator"></span>
        <router-link
          v-if="menu.route"
          class="item"
          :class="[menu.id, { hot: menu.hot }]"
          :to="menu.route"
          exact
        >
          <i class="iconfont" :class="menu.icon"></i>
          <span class="text">
            <i18n :lkey="menu.i18nKey" />
          </span>
          <span v-if="menu.hot" class="superscript">
            <i class="iconfont icon-hot-fill"></i>
          </span>
        </router-link>
        <ulink
          v-else-if="menu.url"
          class="item"
          :class="[menu.id, { hot: menu.hot }]"
          :href="menu.url"
        >
          <i class="iconfont" :class="menu.icon"></i>
          <span class="text">
            <i18n :lkey="menu.i18nKey" />
          </span>
          <span v-if="menu.hot" class="superscript">
            <i class="iconfont icon-hot-fill"></i>
          </span>
        </ulink>
      </template>
      <!-- AD -->
      <template v-for="(ad, index) in adConfig.PC_NAV" :key="index">
        <span class="separator"></span>
        <ulink class="item" :href="ad.url">
          <i class="iconfont" :class="ad.icon" :style="{ color: ad.color }"></i>
          <span class="text" :style="{ color: ad.color }">
            <template v-if="ad.i18n">
              <i18n :zh="ad.i18n.zh" :en="ad.i18n.en" />
            </template>
            <template v-else>
              {{ ad.text }}
            </template>
          </span>
          <span class="superscript">
            <i class="iconfont icon-ad"></i>
          </span>
        </ulink>
      </template>
    </nav>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { NAV_ELEMENT_ID } from '/@/constants/anchor'
  import { useEnhancer } from '/@/app/enhancer'
  import { menus } from './menu'
  export default defineComponent({
    name: 'PCNav',
    setup() {
      const { adConfig, isZhLang } = useEnhancer()
      return {
        NAV_ELEMENT_ID,
        menus,
        adConfig,
        isZhLang
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
        will-change: background-color;
        transition: background-color $transition-time-fast * 0.6;
        @include radius-box($sm-radius);

        &:hover {
          color: $primary-lighter;
          background-color: $module-bg-translucent;
        }

        > .superscript {
          margin-left: $sm-gap;

          .iconfont {
            width: auto;
            margin-right: 0;
            color: $red;
          }
        }

        &.hot {
          color: $red;
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
            background: linear-gradient(to bottom, $module-bg-lighter, transparent);
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
