<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { NAV_ELEMENT_ID } from '/@/constants/element-anchor'
  import { AI_ASSISTANT_NAME_ZH, AI_LOGO_WHITE } from '/@/components/common/ai-brand'
  import { getSiteURL } from '/@/transforms/url'
  import { menus } from './menu'

  const { appConfig, globalState } = useEnhancer()
</script>

<template>
  <div :id="NAV_ELEMENT_ID" class="desktop-nav" v-disabled-wallflower>
    <nav class="nav-list">
      <template v-for="menu in menus" :key="menu.id">
        <span v-if="menu.divider" class="divider"></span>
        <ulink class="item" :class="menu.id" :href="menu.url" :to="menu.route">
          <uimage v-if="menu.iconImage" class="icon-image" :src="menu.iconImage" />
          <i v-else-if="menu.iconFont" class="icon-font iconfont" :class="menu.iconFont"></i>
          <webfont class="text" :bolder="true" :uppercase="true">
            <i18n :k="menu.i18nKey" />
          </webfont>
          <span class="badge-text" v-if="menu.badgeText">{{ menu.badgeText }}</span>
          <span class="new-window-icon" v-if="menu.newWindow">
            <i class="iconfont icon-new-window-s"></i>
          </span>
        </ulink>
      </template>
      <span class="divider"></span>
      <button class="item ai-chat" @click="globalState.toggleSwitcher('aiChatModal', true)">
        <div class="ai-logo" :style="{ '--url': `url(${getSiteURL(AI_LOGO_WHITE)})` }"></div>
        <span class="ai-text">
          <i18n :zh="AI_ASSISTANT_NAME_ZH" en="ASK AI" />
        </span>
        <span class="badge-text">NEW</span>
      </button>
      <!-- AD -->
      <template v-for="(ad, index) in appConfig.AD_PC_NAV" :key="index">
        <span class="divider"></span>
        <ulink class="item" :href="ad.url" :style="{ color: ad.color }">
          <i class="icon-font iconfont" :class="ad.icon"></i>
          <span class="ad-text">
            <i18n v-if="ad.i18n" :zh="ad.i18n.zh" :en="ad.i18n.en" />
            <template v-else>{{ ad.text }}</template>
          </span>
          <span class="ad-badge-icon">
            <i class="iconfont icon-badge-ad"></i>
          </span>
        </ulink>
      </template>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .desktop-nav {
    width: $navbar-width;
    height: auto;

    .nav-list {
      width: $navbar-width;
      padding: 0;
      margin: 0;
      position: fixed;

      .item {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 3em;
        line-height: 3em;
        margin-bottom: $gap-xs;
        padding-inline: $gap;
        text-wrap: nowrap;
        text-align: left;
        text-decoration: none;
        letter-spacing: 0.5px;
        color: $color-text-secondary;
        transition: background-color $motion-duration-fast * 0.6;
        @include mix.radius-box($radius-sm);
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
        }

        &.sponsor {
          color: $red;
        }

        &.app {
          color: $surmon;
        }

        &.ai-chat {
          .ai-logo {
            margin-left: -2.5px;
            margin-right: 10px;
            width: 19px;
            height: 19px;
            background: $ai-primary-gradient;
            -webkit-mask: var(--url) center / contain no-repeat;
            mask: var(--url) center / contain no-repeat;
          }

          .ai-text {
            font-weight: bold;
            background-image: $ai-primary-gradient;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }

          .badge-text {
            color: $ai-primary-blue;
          }
        }

        .icon-font {
          width: 1em;
          margin-right: $gap-sm;
          display: inline-block;
        }

        .icon-image {
          width: 1em;
          height: 1em;
          margin-right: $gap-sm;
          border-radius: $radius-xs;
        }

        .badge-text {
          line-height: 1;
          margin-left: $gap-xs;
          padding-inline: 1px;
          padding-block: 1px;
          font-size: 8px;
          font-weight: bold;
          border: 1px solid;
          border-radius: $radius-tiny;
        }

        .new-window-icon {
          display: inline-block;
          margin-left: $gap-xs;
          transform: translateY(-$gap-tiny);
          .iconfont {
            font-size: $font-size-quinary;
          }
        }

        .ad-text {
          font-weight: bold;
        }

        .ad-badge-icon {
          margin-left: $gap-tiny;
          .iconfont {
            vertical-align: bottom;
          }
        }
      }

      .divider {
        display: block;
        margin-bottom: $gap-xs;
        height: 1px;
        background-image: linear-gradient(
          to right,
          transparent 0%,
          $module-bg-darker-2 14%,
          $module-bg-darker-2 70%,
          $module-bg-darker-1 90%,
          transparent 100%
        );
      }
    }
  }
</style>
