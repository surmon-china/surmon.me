<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { RouteName } from '/@/app/router'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { useAdminInfoStore } from '/@/stores/basic'
  import { useUniversalFetch } from '/@/universal'
  import { getPageRoute } from '/@/transforms/route'
  import PageBanner from '/@/components/common/banner.vue'
  import { useAboutPageMeta, useAdminAvatar, i18ns } from '../shared'

  const { isZhLang } = useEnhancer()
  const adminInfo = useAdminInfoStore()

  useAboutPageMeta()
  useUniversalFetch(() => adminInfo.fetch())
</script>

<template>
  <div class="about-page">
    <page-banner :is-mobile="true" image="/images/page-about/banner-mobile.webp" :image-position="70" cdn>
      <template #title>
        <i18n :k="LanguageKey.PAGE_ABOUT" />
      </template>
    </page-banner>
    <div class="profile">
      <div class="avatar">
        <uimage class="image" :src="useAdminAvatar(adminInfo.data?.avatar)" />
      </div>
      <h2 class="name">{{ adminInfo.data?.name || '-' }}</h2>
      <h5 class="slogan">{{ adminInfo.data?.slogan || '-' }}</h5>
      <h4 class="description">
        <webfont bolder>{{ isZhLang ? META.zh_description_short : META.en_description }}</webfont>
      </h4>
      <divider dashed />
      <p class="biography" v-html="isZhLang ? i18ns.biography.zh : i18ns.biography.en"></p>
    </div>
    <div class="buttons">
      <router-link class="item" :to="getPageRoute(RouteName.Archive)">
        <i class="iconfont icon-quill" />
        <i18n v-bind="i18ns.archive" />
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Snippets)">
        <i class="iconfont icon-buddhism" />
        <i18n v-bind="i18ns.snippets" />
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Guestbook)">
        <i class="iconfont icon-comment" />
        <i18n v-bind="i18ns.guestbook" />
      </router-link>
      <ulink class="item discord" :href="VALUABLE_LINKS.DISCORD_GROUP">
        <i class="iconfont icon-discord" />
        <i18n v-bind="i18ns.discordGroup" />
      </ulink>
      <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM_GROUP">
        <i class="iconfont icon-telegram" />
        <i18n v-bind="i18ns.telegramGroup" />
      </ulink>
      <ulink class="item rss" :href="VALUABLE_LINKS.RSS">
        <i class="iconfont icon-rss" />
        <i18n v-bind="i18ns.rss" />
      </ulink>
    </div>
    <divider dashed />
    <div class="links col-3">
      <ulink class="item center github" :href="VALUABLE_LINKS.GITHUB">
        <i class="iconfont icon-github" />
        <span class="text">GitHub</span>
      </ulink>
      <ulink class="item center instagram" :href="VALUABLE_LINKS.INSTAGRAM">
        <i class="iconfont icon-instagram" />
        <span class="text">Instagram</span>
      </ulink>
      <ulink class="item center threads" :href="VALUABLE_LINKS.THREADS_FOLLOW">
        <i class="iconfont icon-threads" />
        <span class="text">Threads</span>
      </ulink>
    </div>
    <div class="links col-4">
      <ulink class="item telegram icon-only" :href="VALUABLE_LINKS.TELEGRAM">
        <i class="iconfont icon-telegram" />
      </ulink>
      <ulink class="item linkedin icon-only" :href="VALUABLE_LINKS.LINKEDIN">
        <i class="iconfont icon-linkedin" />
      </ulink>
      <ulink class="item zhihu icon-only" :href="VALUABLE_LINKS.ZHIHU">
        <i class="iconfont icon-zhihu" />
      </ulink>
      <ulink class="item douban icon-only" :href="VALUABLE_LINKS.DOUBAN_MOVIE">
        <i class="iconfont icon-douban" />
      </ulink>
    </div>
    <div class="qrcodes">
      <div class="item">
        <uimage cdn class="image" src="/images/qrcodes/whatsapp.webp" />
      </div>
      <div class="item">
        <uimage cdn class="image" src="/images/qrcodes/wechat.webp" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .about-page {
    .profile {
      position: relative;
      padding: $gap-lg;
      padding-top: $gap * 5;
      border-bottom-left-radius: $radius-sm;
      border-bottom-right-radius: $radius-sm;
      background-color: $module-bg-opaque;

      .avatar {
        width: 100%;
        position: absolute;
        top: -$gap * 4;
        left: 0;
        text-align: center;

        .image {
          $size: 7rem;
          width: $size;
          height: $size;
          z-index: $z-index-normal + 2;
          border-radius: 100%;
          border: 6px solid $module-bg-opaque;
          box-sizing: content-box;
        }
      }

      .name,
      .slogan {
        text-align: center;
        margin-top: 0;
        margin-bottom: $gap-xs;
      }

      .slogan {
        line-height: $line-height-base * 1.2;
      }

      .description {
        margin: 0;
        line-height: $line-height-base * 1.3;
        text-align: center;
      }

      .biography {
        text-indent: 2em;
        line-height: $line-height-base * 1.4;
        margin-bottom: 0;

        ::v-deep(a) {
          font-weight: bold;
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }
      }
    }

    .buttons {
      margin-top: $gap-lg;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: $gap-lg;

      .item {
        height: 3em;
        display: flex;
        align-items: center;
        padding-left: 1em;
        border-radius: $radius-sm;
        background-color: $module-bg;
        font-weight: bold;
        letter-spacing: 1px;
        overflow: hidden;
        .iconfont {
          margin-right: $gap-sm;
          font-weight: normal;
        }

        &.discord {
          background-color: $discord-primary;
          color: $white;
        }
        &.telegram {
          background-color: $telegram-primary;
          color: $white;
        }
        &.rss {
          background-color: $rss-primary;
          color: $white;
        }
      }
    }

    .links {
      margin-top: $gap-lg;
      display: grid;
      grid-gap: $gap-lg;
      &.col-2 {
        grid-template-columns: repeat(2, 1fr);
      }
      &.col-3 {
        grid-template-columns: repeat(3, 1fr);
      }
      &.col-4 {
        grid-template-columns: repeat(4, 1fr);
      }

      .item {
        display: inline-flex;
        align-items: center;
        height: 3rem;
        padding: 0 1em;
        border-radius: $radius-sm;
        color: $white;
        overflow: hidden;
        &.center {
          justify-content: center;
        }
        &.text-only {
          background-color: $surmon;
        }
        &.icon-only {
          justify-content: center;
          .iconfont {
            font-size: $font-size-h3;
            margin: 0;
          }
        }

        .iconfont {
          margin-right: $gap-sm;
        }

        .text {
          font-weight: bold;
        }

        &.github {
          background-color: $github-primary;
        }
        &.threads {
          background-color: $threads-primary;
        }
        &.instagram {
          background: $instagram-primary;
          background: $instagram-gradient;
        }
        &.telegram {
          background-color: $telegram-primary;
        }
        &.douban {
          background-color: $douban-primary;
        }
        &.zhihu {
          background-color: $zhihu-primary;
        }
        &.youtube {
          background-color: $youtube-primary;
        }
        &.linkedin {
          background-color: $linkedin-primary;
        }
      }
    }

    .qrcodes {
      margin-top: $gap-lg;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: $gap-lg;

      .item {
        width: 100%;
        padding: $gap;
        border-radius: $radius-sm;
        overflow: hidden;
        background-color: $module-bg-opaque;

        .image {
          width: 100%;
          height: 100%;
          border-radius: $radius-xs;
        }
      }
    }
  }
</style>
