<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { RouteName } from '/@/app/router'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { useAdminInfoStore } from '/@/stores/basic'
  import { useUniversalFetch } from '/@/universal'
  import { getPageRoute } from '/@/transforms/route'
  import PageBanner from '/@/components/common/banner.vue'
  import { useAboutPageMeta, useAdminAvatar, i18ns } from './shared'

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
        <webfont bolder>{{ isZhLang ? META.zh_description : META.en_description }}</webfont>
      </h4>
      <divider dashed />
      <p class="biography" v-html="isZhLang ? i18ns.biography.zh : i18ns.biography.en"></p>
    </div>
    <div class="links">
      <div class="list col-2">
        <router-link class="item text-only" :to="getPageRoute(RouteName.Archive)">
          <i class="iconfont icon-quill" />
          <i18n v-bind="i18ns.archive" />
        </router-link>
        <router-link class="item text-only" :to="getPageRoute(RouteName.Guestbook)">
          <i class="iconfont icon-comment" />
          <i18n v-bind="i18ns.guestbook" />
        </router-link>
      </div>
      <divider dashed />
      <div class="list col-2">
        <ulink class="item discord" :href="VALUABLE_LINKS.DISCORD_GROUP">
          <i class="iconfont icon-discord" />
          <i18n v-bind="i18ns.discordGroup" />
        </ulink>
        <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM_GROUP">
          <i class="iconfont icon-telegram" />
          <i18n v-bind="i18ns.telegramGroup" />
        </ulink>
      </div>
    </div>
    <div class="links">
      <div class="list col-3">
        <ulink class="item center github" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-github" />
          <span class="text">GitHub</span>
        </ulink>
        <ulink class="item center twitter" :href="VALUABLE_LINKS.TWITTER">
          <i class="iconfont icon-twitter" />
          <span class="text">Twitter</span>
        </ulink>
        <ulink class="item center instagram" :href="VALUABLE_LINKS.INSTAGRAM">
          <i class="iconfont icon-instagram" />
          <span class="text">Instagram</span>
        </ulink>
      </div>
      <divider dashed />
      <div class="list col-4">
        <ulink class="item telegram icon-only" :href="VALUABLE_LINKS.TELEGRAM">
          <i class="iconfont icon-telegram" />
        </ulink>
        <ulink class="item linkedin icon-only" :href="VALUABLE_LINKS.LINKEDIN">
          <i class="iconfont icon-linkedin" />
        </ulink>
        <ulink class="item youtube icon-only" :href="VALUABLE_LINKS.YOUTUBE_CHANNEL">
          <i class="iconfont icon-youtube" />
        </ulink>
        <ulink class="item douban icon-only" :href="VALUABLE_LINKS.DOUBAN_MOVIE">
          <i class="iconfont icon-douban" />
        </ulink>
      </div>
    </div>
    <div class="qrcodes">
      <div class="item">
        <uimage cdn class="image" src="/images/qrcodes/wechat.webp" />
      </div>
      <div class="item">
        <uimage cdn class="image" src="/images/qrcodes/wechat-channel.webp" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .about-page {
    .profile {
      position: relative;
      padding: $lg-gap;
      padding-top: $gap * 5;
      border-bottom-left-radius: $lg-radius;
      border-bottom-right-radius: $lg-radius;
      background-color: $module-bg-opaque;
      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1rem;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        background-image: radial-gradient(circle, transparent 70%, $module-bg-opaque 70%);
        background-size: 0.7em 1em;
        background-position: 0 -0.5em;
      }

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
        margin-bottom: $xs-gap;
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

    .links {
      margin-top: $lg-gap;
      padding: $gap;
      border-radius: $lg-radius;
      background-color: $module-bg-opaque;
      overflow: hidden;

      .list {
        display: grid;
        grid-gap: $lg-gap;
        &.col-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        &.col-3 {
          grid-template-columns: repeat(3, 1fr);
        }
        &.col-4 {
          grid-template-columns: repeat(4, 1fr);
        }

        .image-item {
          max-width: 100%;
        }

        .item {
          display: inline-flex;
          align-items: center;
          height: 3rem;
          padding: 0 1em;
          border-radius: $sm-radius;
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
            margin-right: $sm-gap;
          }

          .text {
            font-weight: bold;
          }

          &.github {
            background-color: $github-primary;
          }
          &.twitter {
            background-color: $twitter-primary;
          }
          &.instagram {
            background: $instagram-primary;
            background: $instagram-gradient;
            @include visibility-transition();
          }
          &.discord {
            background-color: $discord-primary;
          }
          &.telegram {
            background-color: $telegram-primary;
          }
          &.douban {
            background-color: $douban-primary;
          }
          &.youtube {
            background-color: $youtube-primary;
          }
          &.linkedin {
            background-color: $linkedin-primary;
          }
        }
      }
    }

    .qrcodes {
      margin-top: $lg-gap;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: $lg-gap;

      .item {
        width: 100%;
        padding: $gap;
        border-radius: $lg-radius;
        overflow: hidden;
        background-color: $module-bg-opaque;

        .image {
          width: 100%;
          height: 100%;
          border-radius: $xs-radius;
        }
      }
    }
  }
</style>
