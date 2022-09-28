<template>
  <div class="lens-page">
    <page-banner :blur="false" :position="68" image="/images/page-lens/banner.jpeg">
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
    <div class="container">
      <page-title class="module-title instagram" :level="4">
        <ulink class="link" :href="VALUABLE_LINKS.INSTAGRAM">Newest · instagram</ulink>
      </page-title>
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
            <page-title class="module-title youtube" :level="5">
              <template #left>
                <ulink class="link" :href="getYouTubePlaylistURL(list.id)">
                  {{ list.snippet.title }}
                  ({{ list.contentDetails.itemCount }})
                </ulink>
              </template>
              <template #right>
                <span class="brand">YouTube · Channel</span>
              </template>
            </page-title>
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
    </div>
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
  import PageBanner from '/@/components/common/fullpage/banner.vue'
  import PageTitle from '/@/components/common/fullpage/title.vue'
  import LensSkeleton from './skeleton.vue'
  import InstagramGrid from './instagram/grid.vue'
  import YoutubePlaylist from './youtube/playlist.vue'

  export default defineComponent({
    name: 'LensPage',
    components: {
      PageBanner,
      PageTitle,
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
          description: `${META.author} 的视频创作`
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
    .module-title {
      .link {
        color: $text-secondary;
        font-weight: bold;
        &:hover {
          color: $link-color;
        }
      }

      &.instagram {
        --item-primary: #{$instagram-primary};
        background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
      }

      &.youtube {
        --item-primary: #{$youtube-primary};
        background: linear-gradient(to right, $module-bg-opaque, transparent);

        .icon {
          color: var(--item-primary);
          margin-right: $sm-gap;
          font-size: $font-size-h3;
          font-weight: normal;
        }

        .brand {
          color: $text-disabled;
          font-size: $font-size-small;
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
