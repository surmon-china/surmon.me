<script lang="ts" setup>
  import { computed } from 'vue'
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

  const { i18n: _i18n, seoMeta, isZhLang } = useEnhancer()
  const { instagramMedias, youtubePlayList } = useStores()
  const youtubePlaylistData = computed(() => {
    return youtubePlayList.data.filter((list) => list.contentDetails.itemCount > 1)
  })

  seoMeta(() => {
    const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_LENS, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_LENS), enTitle] : [enTitle]
    const description = isZhLang.value ? `${META.author} 的摄影作品` : `${META.author}'s Photography`
    return {
      pageTitle: titles.join(' | '),
      description: description
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
</script>

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
      <placeholder :data="instagramMedias.data" :loading="instagramMedias.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <lens-skeleton :columns="6" :rows="2" :height="155" key="loading" class="module-loading" />
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
            <lens-skeleton :columns="5" :rows="1" :height="166" key="loading" class="module-loading" />
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

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .lens-page {
    min-height: $full-page-active-content-height;

    .page-bridge {
      position: relative;
      height: 4rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
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
