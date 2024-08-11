<script lang="ts" setup>
  import { NAV_ELEMENT_ID } from '/@/constants/anchor'
  import { useEnhancer } from '/@/app/enhancer'
  import { menus } from './menu'

  const { adConfig } = useEnhancer()
</script>

<template>
  <div :id="NAV_ELEMENT_ID" class="desktop-nav" v-disabled-wallflower>
    <nav class="nav-list">
      <template v-for="menu in menus" :key="menu.id">
        <span v-if="menu.divider" class="divider"></span>
        <ulink class="item" :class="menu.id" :href="menu.url" :to="menu.route">
          <uimage v-if="menu.imageIcon" class="image-icon" :src="menu.imageIcon" />
          <i v-else-if="menu.icon" class="font-icon iconfont" :class="menu.icon"></i>
          <webfont class="text" bolder :uppercase="!menu.disabledUppercase">
            <i18n :k="menu.i18nKey" />
          </webfont>
          <span class="superscript new-window" v-if="menu.newWindow">
            <i class="iconfont icon-new-window-s"></i>
          </span>
          <span class="superscript hot" v-if="menu.hot">
            <i class="iconfont icon-hot-fill"></i>
          </span>
        </ulink>
      </template>
      <!-- AD -->
      <template v-for="(ad, index) in adConfig.PC_NAV" :key="index">
        <span class="divider"></span>
        <ulink class="item" :href="ad.url" :style="{ color: ad.color }">
          <i class="font-icon iconfont" :class="ad.icon"></i>
          <span class="ad-text">
            <i18n v-if="ad.i18n" :zh="ad.i18n.zh" :en="ad.i18n.en" />
            <template v-else>{{ ad.text }}</template>
          </span>
          <span class="superscript">
            <i class="iconfont icon-ad"></i>
          </span>
        </ulink>
      </template>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .desktop-nav {
    width: $navbar-width;
    height: auto;

    .nav-list {
      width: $navbar-width;
      padding: 0;
      margin: 0;
      position: fixed;

      .item {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        height: 3em;
        margin-bottom: $gap-sm;
        padding: 0 $gap-lg;
        border-radius: $radius-mini;
        text-decoration: none;
        letter-spacing: 0.5px;
        color: $color-text-secondary;
        will-change: background-color;
        transition: background-color $motion-duration-fast * 0.6;
        @include radius-box($radius-sm);
        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          color: $primary-lighter;
          background-color: $module-bg-translucent;
        }

        &.link-active {
          color: $primary;
          background-color: $module-bg-lighter;
          &.guestbook {
            background: linear-gradient(to bottom, $module-bg-lighter, transparent);
          }
        }

        &.app {
          color: $surmon;
        }

        &.sponsor {
          color: $github-sponsor-primary;
        }

        .font-icon {
          width: 1em;
          margin-right: $gap;
          display: inline-block;
        }

        .image-icon {
          width: 1em;
          height: 1em;
          margin-right: $gap;
          border-radius: $radius-xs;
        }

        .ad-text {
          font-weight: bold;
        }

        .superscript {
          margin-left: $gap-sm;
          &.new-window {
            .iconfont {
              font-size: $font-size-small;
            }
          }
        }
      }

      .divider {
        display: block;
        margin-bottom: $gap-sm;
        height: 1px;
        background-image: linear-gradient(
          to right,
          transparent 0%,
          $module-bg-darker-2 14%,
          $module-bg-darker-2 50%,
          $module-bg-darker-1 80%,
          transparent 100%
        );
      }
    }
  }
</style>
