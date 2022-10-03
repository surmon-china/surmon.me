<template>
  <div class="lens-page">
    <page-banner class="page-banner" :position="68" image="/images/page-lens/banner.jpeg">
      <template #title>
        <webfont>
          <i18n zh="凡心所向，素履以往" en="Because it's there" />
        </webfont>
      </template>
      <template #description>
        <i18n>
          <template #zh>生如逆旅，一苇以航</template>
          <template #en>"why did you want to climb mount Everest?"</template>
        </i18n>
      </template>
    </page-banner>
    <container class="page-bridge"></container>
    <container class="page-content">
      <h4 class="module-title instagram">
        <ulink class="link" :href="VALUABLE_LINKS.INSTAGRAM">浮光掠影 | photography</ulink>
        <ulink class="brand" :href="VALUABLE_LINKS.INSTAGRAM">
          <i class="iconfont icon-instagram"></i>
          <span class="text">Instagram</span>
        </ulink>
      </h4>
      <placeholder :data="instagramMedias" :loading="instagramMedias.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <lens-skeleton
            :columns="6"
            :rows="2"
            :height="155"
            key="loading"
            class="module-loading"
          />
        </template>
        <template #default>
          <div class="module-content">
            <instagram-grid :medias="instagramMedias.data" :limit="24" />
          </div>
        </template>
      </placeholder>
      <div class="module-content">
        <youtube-playlist :playlists="youtubePlaylistData">
          <template #title="{ list }">
            <h4 class="module-title youtube">
              <ulink class="link" :href="getYouTubePlaylistURL(list.id)">
                {{ list.snippet.title }}
                ({{ list.contentDetails.itemCount }})
              </ulink>
              <ulink class="brand" :href="VALUABLE_LINKS.YOUTUBE_CHANNEL">
                <i class="iconfont icon-youtube"></i>
                <span class="text">YouTube · Channel</span>
              </ulink>
            </h4>
          </template>
          <template #loading>
            <lens-skeleton
              :columns="5"
              :rows="1"
              :height="166"
              key="loading"
              class="module-loading"
            />
          </template>
          <template #empty>
            <empty class="module-empty" key="empty">
              <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
            </empty>
          </template>
        </youtube-playlist>
      </div>
    </container>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { useUniversalFetch } from '/@/universal'
  import { Language, LanguageKey } from '/@/language'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { getYouTubePlaylistURL } from '/@/transforms/media'
  import { firstUpperCase } from '/@/transforms/text'
  import PageBanner from '/@/components/common/banner.vue'
  import LensSkeleton from './skeleton.vue'
  import InstagramGrid from './instagram/grid.vue'
  import YoutubePlaylist from './youtube/playlist.vue'

  export default defineComponent({
    name: 'LensPage',
    components: {
      PageBanner,
      LensSkeleton,
      InstagramGrid,
      YoutubePlaylist
    },
    setup() {
      const { i18n, meta, isZhLang } = useEnhancer()
      const { instagramMedias, youtubePlayList } = useStores()
      const youtubePlaylistData = computed(() => {
        return youtubePlayList.data.filter((list) => list.contentDetails.itemCount > 1)
      })

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_LENS, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_LENS), enTitle] : [enTitle]
        return {
          pageTitle: titles.join(' | '),
          description: `${META.author} 的浮光掠影`,
          ogType: 'image'
        }
      })

      useUniversalFetch(() => {
        return Promise.all([
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          instagramMedias.fetch().catch(() => {}),
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          youtubePlayList.fetch().catch(() => {})
        ])
      })

      return {
        VALUABLE_LINKS,
        LanguageKey,
        instagramMedias,
        youtubePlaylistData,
        getYouTubePlaylistURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .lens-page {
    .page-bridge {
      position: relative;
      height: 4rem;
      background-color: $module-bg;
      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1rem;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        background-image: radial-gradient(circle, transparent 70%, $module-bg 70%);
        background-size: 0.8em 1em;
        background-position: 0 -0.5em;
      }
    }

    .module-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: $text;
      margin: 3rem 0;

      &.instagram {
        --brand-primary: #{$instagram-primary};
      }
      &.youtube {
        --brand-primary: #{$youtube-primary};
      }

      .link {
        font-weight: bold;
        color: $text-secondary;
        &:hover {
          color: $link-color;
        }
      }

      .brand {
        font-size: $font-size-small;
        color: $text-disabled;
        &:hover {
          color: var(--brand-primary);
        }

        .iconfont {
          margin-right: $sm-gap;
          font-weight: normal;
        }
      }
    }

    .module-empty {
      min-height: 12rem;
      margin-bottom: $gap * 2;
      font-weight: bold;
      font-size: $font-size-h3;
      @include radius-box($sm-radius);
      @include common-bg-module();
    }

    .module-loading {
      margin-bottom: $gap * 2;
    }

    .module-content {
      margin-bottom: $gap * 2;
    }
  }
</style>
