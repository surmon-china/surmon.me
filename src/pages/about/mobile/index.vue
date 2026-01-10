<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { LocaleKey } from '/@/locales'
  import { RouteName } from '/@/app/router'
  import { APP_PROFILE, VALUABLE_LINKS } from '/@/configs/app.config'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { useAdminProfileStore } from '/@/stores/basic'
  import { useUniversalFetch } from '/@/app/universal'
  import { getPageRoute } from '/@/transforms/route'
  import PageBanner from '/@/components/common/banner.vue'
  import { useAboutPageMeta, useAdminAvatar, i18ns } from '../shared'

  const { goLink } = useStores()
  const { isZhLang, appConfig } = useEnhancer()
  const adminProfile = useAdminProfileStore()

  useAboutPageMeta()
  useUniversalFetch(() => adminProfile.fetch())
</script>

<template>
  <div class="about-page">
    <page-banner :is-mobile="true" image="/images/page-about/banner-mobile.webp" :image-position="70" cdn>
      <template #title>
        <webfont bolder><i18n :k="LocaleKey.PAGE_ABOUT" /></webfont>
      </template>
    </page-banner>
    <div class="profile">
      <div class="avatar">
        <uimage class="image" :src="useAdminAvatar(adminProfile.data?.avatar)" />
      </div>
      <h2 class="name">{{ adminProfile.data?.name || '-' }}</h2>
      <h5 class="slogan">{{ adminProfile.data?.slogan || '-' }}</h5>
      <h4 class="description">
        <webfont bolder>{{ isZhLang ? APP_PROFILE.description_short_zh : APP_PROFILE.description_en }}</webfont>
      </h4>
      <div class="socials">
        <ulink class="item github" :href="goLink.map.github">
          <i class="iconfont icon-github" />
        </ulink>
        <ulink class="item instagram" :href="goLink.map.instagram">
          <i class="iconfont icon-instagram" />
        </ulink>
        <ulink class="item threads" :href="goLink.map.threads">
          <i class="iconfont icon-threads" />
        </ulink>
        <ulink class="item telegram" :href="goLink.map.telegram">
          <i class="iconfont icon-telegram" />
        </ulink>
        <ulink class="item zhihu" :href="goLink.map.zhihu">
          <i class="iconfont icon-zhihu" />
        </ulink>
        <ulink class="item douban" :href="goLink.map['douban-movie']">
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
      <ulink class="item discord" :href="goLink.map['discord-server']">
        <i class="iconfont icon-discord" />
        <span class="label"><i18n v-bind="i18ns.discordGroup" /></span>
      </ulink>
      <ulink class="item telegram" :href="goLink.map['telegram-group']">
        <i class="iconfont icon-telegram" />
        <span class="label"><i18n v-bind="i18ns.telegramGroup" /></span>
      </ulink>
      <ulink class="item rss" :href="VALUABLE_LINKS.RSS">
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
        margin-top: 0;
        margin-bottom: $gap;
        line-height: $line-height-base * 1.3;
        text-align: center;
      }

      .socials {
        $button-size: 3em;
        height: $button-size;
        margin-bottom: $gap-xs;
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
      margin-top: $gap-lg;
      position: relative;
      padding-top: $gap-sm;
      padding-bottom: $gap-lg;
      padding-inline: $gap-sm * 3;
      border-radius: $radius-sm;
      background-color: $module-bg-opaque;

      .bridge {
        $distance: 3rem;
        position: absolute;
        top: -$gap-lg;
        width: $gap-lg;
        height: $gap-lg;
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
        font-weight: 500;
        text-indent: 1em;

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
      margin-top: $gap-lg;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: $gap-lg;

      .item {
        height: 3em;
        display: flex;
        align-items: center;
        padding-left: $gap;
        padding-right: $gap-xs;
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
          margin-right: $gap-sm;
        }

        .label {
          letter-spacing: 1px;
          font-weight: bold;
          @include mix.text-overflow();
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
