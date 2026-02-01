<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { useAdminProfileStore } from '/@/stores/foundation'
  import { LocalesKey } from '/@/locales'
  import { RouteName } from '/@/app/router'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { useUniversalFetch } from '/@/app/universal'
  import { getPageRoute } from '/@/transforms/route'
  import { useAboutPageMeta, useAdminAvatar, i18ns } from '../shared'
  import { APP_PROFILE, BFF_CONFIG } from '/@/configs/app.config'
  import MobileBanner from '/@/components/mobile/widgets/page-banner.vue'

  const { appConfig, goLinks, isZhLang } = useEnhancer()
  const adminProfileStore = useAdminProfileStore()

  useAboutPageMeta()
  useUniversalFetch(() => adminProfileStore.fetch())
</script>

<template>
  <div class="about-page">
    <mobile-banner background-image="/images/page-about/mobile-banner-2.webp" :background-image-y="58" cdn>
      <template #title>
        <webfont bolder><i18n :k="LocalesKey.PAGE_ABOUT" /></webfont>
      </template>
    </mobile-banner>
    <div class="profile">
      <div class="avatar">
        <uimage class="image" :src="useAdminAvatar(adminProfileStore.data?.avatar)" />
      </div>
      <h2 class="name">{{ adminProfileStore.data?.name || '-' }}</h2>
      <h5 class="slogan">{{ adminProfileStore.data?.slogan || '-' }}</h5>
      <h4 class="description">
        <webfont bolder>{{ isZhLang ? APP_PROFILE.description_short_zh : APP_PROFILE.description_en }}</webfont>
      </h4>
      <div class="socials">
        <ulink class="item github" :href="goLinks.github">
          <i class="iconfont icon-github" />
        </ulink>
        <ulink class="item instagram" :href="goLinks.instagram">
          <i class="iconfont icon-instagram" />
        </ulink>
        <ulink class="item threads" :href="goLinks.threads">
          <i class="iconfont icon-threads" />
        </ulink>
        <ulink class="item telegram" :href="goLinks.telegram">
          <i class="iconfont icon-telegram" />
        </ulink>
        <ulink class="item zhihu" :href="goLinks.zhihu">
          <i class="iconfont icon-zhihu" />
        </ulink>
        <ulink class="item douban" :href="goLinks['douban-movie']">
          <i class="iconfont icon-douban" />
        </ulink>
      </div>
    </div>
    <div class="biography">
      <div class="bridge left"></div>
      <div class="bridge right"></div>
      <div
        class="content"
        :class="isZhLang ? 'zh' : 'en'"
        v-html="
          markdownToHTML((isZhLang ? appConfig.ABOUT_BIOGRAPHY_ZH : appConfig.ABOUT_BIOGRAPHY_EN) ?? '', {
            sanitize: false
          })
        "
      ></div>
    </div>
    <div class="buttons">
      <router-link class="item" :to="getPageRoute(RouteName.Archive)">
        <i class="iconfont icon-quill" />
        <span class="label"><i18n v-bind="i18ns.archive" /></span>
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Snippets)">
        <i class="iconfont icon-buddhism" />
        <span class="label"><i18n v-bind="i18ns.snippets" /></span>
      </router-link>
      <router-link class="item" :to="getPageRoute(RouteName.Guestbook)">
        <i class="iconfont icon-comment" />
        <span class="label"><i18n v-bind="i18ns.guestbook" /></span>
      </router-link>
      <ulink class="item discord" :href="goLinks['discord-server']">
        <i class="iconfont icon-discord" />
        <span class="label"><i18n v-bind="i18ns.discordGroup" /></span>
      </ulink>
      <ulink class="item telegram" :href="goLinks['telegram-group']">
        <i class="iconfont icon-telegram" />
        <span class="label"><i18n v-bind="i18ns.telegramGroup" /></span>
      </ulink>
      <ulink class="item rss" :href="BFF_CONFIG.route_path_rss">
        <i class="iconfont icon-rss" />
        <span class="label"><i18n v-bind="i18ns.rss" /></span>
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
      padding-inline: $gap;
      padding-top: 3.4rem;
      padding-bottom: 1.2rem;
      border-bottom-left-radius: $radius-sm;
      border-bottom-right-radius: $radius-sm;
      background-color: $module-bg-opaque;

      .avatar {
        width: 100%;
        position: absolute;
        top: -$gap-sm * 4;
        left: 0;
        text-align: center;

        .image {
          $size: 5.2rem;
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
      }

      .name {
        margin-bottom: $gap-tiny;
      }

      .slogan {
        margin-bottom: $gap-xs;
      }

      .description {
        margin-top: 0;
        margin-bottom: $gap-sm;
        line-height: $line-height-loose;
        text-align: center;
      }

      .socials {
        $button-size: 3em;
        height: $button-size;
        display: flex;
        justify-content: space-around;

        .item {
          display: inline-flex;
          align-items: center;
          width: $button-size;
          height: $button-size;
          border-radius: 100%;
          color: $white;
          overflow: hidden;
          justify-content: center;
          .iconfont {
            font-size: $font-size-h2;
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
    }

    .biography {
      margin-top: $gap;
      position: relative;
      padding-inline: $gap;
      padding-top: $gap-xs;
      padding-bottom: $gap;
      border-radius: $radius-sm;
      background-color: $module-bg-opaque;

      .bridge {
        $distance: 3rem;
        position: absolute;
        top: -$gap;
        width: $gap;
        height: $gap;
        background: linear-gradient(to bottom, $module-bg, $module-bg-darker-1);
        &.left {
          left: $distance;
        }
        &.right {
          right: $distance;
        }
      }

      .content {
        margin-bottom: 0;
        line-height: $line-height-base * 1.4;
        font-size: $font-size-base + 1;
        text-indent: 1em;

        &.zh {
          font-weight: 500;
        }

        &.en {
          font-weight: bold;
        }

        &::first-letter {
          color: $color-text-darker;
          font-size: $font-size-h2;
          font-weight: bold;
        }

        ::v-deep(a) {
          font-weight: bold;
          text-decoration: underline;
          text-underline-offset: 0.3em;
          text-decoration-style: dotted;
        }

        ::v-deep(p) {
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .buttons {
      margin-top: $gap;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: $gap;

      .item {
        height: 3em;
        display: flex;
        align-items: center;
        padding-left: $gap-sm;
        padding-right: $gap-tiny;
        border-radius: $radius-sm;
        background-color: $module-bg;
        overflow: hidden;

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

        .iconfont {
          margin-right: 0.5em;
        }

        .label {
          letter-spacing: 1px;
          font-weight: bold;
          @include mix.text-overflow();
        }
      }
    }

    .qrcodes {
      margin-top: $gap;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: $gap;

      .item {
        width: 100%;
        padding: $gap-xs;
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
