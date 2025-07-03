<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { RouteName } from '/@/app/router'
  import { GAEventCategories } from '/@/constants/gtag'
  import { VALUABLE_LINKS } from '/@/configs/app.config'
  import { getPageRoute } from '/@/transforms/route'
  import NpmStatistic from './statistic/npm.vue'
  import GithubStatistic from './statistic/github.vue'
  import ThreadsStatistic from './statistic/threads.vue'
  import DoubanStatistic from './statistic/douban.vue'
  import InstagramMedia from './media/instagram.vue'
  import YoutubeMedia from './media/youtube.vue'
  import AggregateCalendar from './calendar/index.vue'
  import FootprintMap from './footprint/index.vue'
  import AboutPageBanner from './banner.vue'
  import { useAboutPageMeta, i18ns } from '../shared'

  const { gtag, gState } = useEnhancer()
  const { adminInfo, appOption } = useStores()

  const handleGTagEvent = (event: string) => {
    gtag?.event(event, {
      event_category: GAEventCategories.About
    })
  }

  const handleSponsor = () => {
    gState.toggleSwitcher('sponsor', true)
    handleGTagEvent('sponsor_modal')
  }

  const handleStatement = () => {
    gState.toggleSwitcher('statement', true)
    handleGTagEvent('statement_modal')
  }

  const handleFeedback = () => {
    gState.toggleSwitcher('feedback', true)
    handleGTagEvent('feedback_modal')
  }

  // meta
  useAboutPageMeta()
  // prefetch
  useUniversalFetch(() => Promise.all([adminInfo.fetch(), appOption.fetch()]))

  const moduleButtons = [
    {
      class: 'photography',
      icon: 'icon-lens',
      i18n: i18ns.photography,
      route: getPageRoute(RouteName.Photography)
    },
    {
      class: 'snippets',
      icon: 'icon-buddhism',
      i18n: i18ns.snippets,
      route: getPageRoute(RouteName.Snippets)
    },
    {
      class: 'archive',
      icon: 'icon-quill',
      i18n: i18ns.archive,
      route: getPageRoute(RouteName.Archive)
    },
    {
      class: 'guestbook',
      icon: 'icon-comment',
      i18n: i18ns.guestbook,
      route: getPageRoute(RouteName.Guestbook)
    },
    {
      class: 'feedback',
      icon: 'icon-mail-plane',
      i18n: i18ns.feedback,
      onClick: handleFeedback
    },
    {
      class: 'telegram',
      icon: 'icon-telegram',
      i18n: i18ns.telegramGroup,
      href: VALUABLE_LINKS.TELEGRAM_GROUP
    },
    {
      class: 'discord',
      icon: 'icon-discord',
      i18n: i18ns.discordGroup,
      href: VALUABLE_LINKS.DISCORD_GROUP
    },
    {
      class: 'sponsor',
      icon: 'icon-peachblossom',
      i18n: i18ns.sponsor,
      onClick: handleSponsor
    },
    {
      class: 'statement',
      icon: 'icon-faq',
      i18n: i18ns.statement,
      onClick: handleStatement
    },
    {
      class: 'rss',
      icon: 'icon-rss',
      i18n: i18ns.rss,
      href: VALUABLE_LINKS.RSS
    }
  ]

  const specialLinks = Object.freeze([
    {
      name: 'GitHub',
      url: 'https://github.com'
    },
    {
      name: 'Vite',
      url: 'https://vitejs.dev/'
    },
    {
      name: 'Disqus',
      url: 'https://disqus.com/'
    }
  ])
</script>

<template>
  <div class="about-page">
    <about-page-banner @g-tag-event="handleGTagEvent" />
    <container class="page-content">
      <div class="module-buttons">
        <template :key="index" v-for="(item, index) in moduleButtons">
          <component
            class="item"
            :class="item.class"
            :is="item.onClick ? 'button' : 'ulink'"
            :href="item.href"
            :to="item.route"
            @click="item.onClick"
          >
            <span class="left">
              <i class="iconfont" :class="item.icon"></i>
              <span class="text"><i18n v-bind="item.i18n" /></span>
            </span>
            <span class="right">
              <i class="iconfont icon-next"></i>
            </span>
          </component>
        </template>
      </div>
      <div class="statistics">
        <github-statistic />
        <npm-statistic />
        <threads-statistic />
        <douban-statistic />
      </div>
      <div class="plogs">
        <instagram-media />
      </div>
      <div class="vlogs">
        <youtube-media />
      </div>
      <div class="footprint">
        <footprint-map />
      </div>
      <div class="calendar">
        <aggregate-calendar />
      </div>
      <div class="footer-links">
        <div class="friend-links">
          <template v-for="(link, index) in appOption.data?.friend_links || []" :key="index">
            <divider type="vertical" size="lg" v-if="index !== 0" />
            <a :href="link.value" class="item" target="_blank" rel="external nofollow noopener">
              {{ link.name }}
            </a>
          </template>
        </div>
        <div class="special-links">
          <template v-for="(item, index) in specialLinks" :key="index">
            <divider type="vertical" size="lg" v-if="index !== 0" />
            <a :href="item.url" class="item" target="_blank" rel="external nofollow noopener">
              {{ item.name }}
            </a>
          </template>
        </div>
      </div>
    </container>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .about-page {
    width: 100%;
    overflow: hidden;

    .page-content {
      margin: $gap * 2 0;
    }

    .module-buttons {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: $gap * 2;
      width: 100%;
      margin-bottom: 2rem;

      .item {
        height: 5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em 0 2em;
        @include mix.common-bg-module($motion-duration-fast);
        @include mix.radius-box($radius-lg);
        &.discord {
          --item-primary: #{$discord-primary};
          --item-hover: white;
        }
        &.telegram {
          --item-primary: #{$telegram-primary};
          --item-hover: white;
        }
        &.sponsor {
          --item-primary: #{$red};
          --item-hover: white;
        }
        &.statement {
          --item-primary: #{$surmon};
          --item-hover: white;
        }
        &.rss {
          --item-primary: #{$rss-primary};
          --item-hover: white;
        }
        &:hover {
          background-color: var(--item-primary, $primary);
          .left {
            .iconfont,
            .text {
              color: var(--item-hover, $color-text-reversal);
            }
          }

          .right {
            opacity: 1;
            transform: translateX(-$gap-sm);
            color: var(--item-hover, $color-text-reversal);
          }
        }

        .left {
          .iconfont {
            font-size: $font-size-h3;
            margin-right: 0.8em;
            color: var(--item-primary, $primary);
          }

          .text {
            letter-spacing: 1px;
            color: $color-text-secondary;
            font-size: $font-size-h4;
            font-weight: bold;
          }
        }

        .right {
          color: $color-text-divider;
          opacity: 0.4;
          transition:
            opacity $motion-duration-fast,
            transform $motion-duration-mid;
        }
      }
    }

    .statistics {
      margin-bottom: $gap * 2;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap * 2;
    }

    .plogs,
    .vlogs,
    .calendar {
      margin-bottom: $gap * 2;
      border-radius: $radius-lg;
      padding: $gap;
      @include mix.common-bg-module();
    }

    .footprint {
      width: 100%;
      margin-bottom: $gap * 2;
    }

    .footer-links {
      display: flex;
      justify-content: space-between;
      padding: 2rem $gap-lg;
      @include mix.common-bg-module();
      @include mix.radius-box($radius-lg);

      .item {
        font-weight: bold;
        @include mix.text-underline();
      }

      .special-links {
        .item {
          color: $color-text-disabled;
          &:hover {
            color: $color-text;
          }
        }
      }
    }
  }
</style>
