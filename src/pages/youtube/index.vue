<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { useUniversalFetch } from '/@/universal'
  import { LanguageKey } from '/@/language'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { getYouTubePlaylistURL } from '/@/transforms/media'
  import PageBanner from '/@/components/common/banner.vue'
  import YoutubeSkeleton from './skeleton.vue'
  import YoutubePlaylist from './playlist.vue'

  const { seoMeta, isZhLang } = useEnhancer()
  const { youtubePlayList } = useStores()
  const youtubePlaylistData = computed(() => {
    return youtubePlayList.data.filter((list) => list.contentDetails.itemCount > 1)
  })

  seoMeta(() => {
    return {
      pageTitle: 'YouTube',
      description: isZhLang.value ? `${META.author} 的视频` : `${META.author}'s YouTube`
    }
  })

  useUniversalFetch(() => youtubePlayList.fetch())
</script>

<template>
  <div class="youtube-page">
    <page-banner class="page-banner" video="/videos/clips/lake-1.mp4" :video-position="58" cdn>
      <template #title>
        <webfont>
          <i18n zh="山河入梦，春尽江南" :en="`${META.author}'s YouTube videos`" />
        </webfont>
      </template>
      <template #description>
        <i18n>
          <template #zh>
            <span>
              在我的 <ulink :href="VALUABLE_LINKS.YOUTUBE_CHANNEL" class="link">YouTube 频道</ulink> 查看更多
            </span>
          </template>
          <template #en>
            View all videos on my <ulink :href="VALUABLE_LINKS.YOUTUBE_CHANNEL" class="link">YouTube Channel</ulink>
          </template>
        </i18n>
      </template>
    </page-banner>
    <container class="page-bridge"></container>
    <container class="page-content">
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
            <youtube-skeleton :columns="5" :rows="1" :height="166" key="loading" class="module-loading" />
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
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .youtube-page {
    min-height: $full-page-active-content-height;

    .page-banner {
      .link {
        color: $white;
        text-decoration: underline;
        text-underline-offset: 6px;
      }
    }

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
      margin: 3rem 0;
      letter-spacing: 4px;
      color: $color-text;

      .link {
        font-weight: bold;
        color: $color-text-secondary;
        &:hover {
          color: $color-link;
        }
      }

      .brand {
        font-size: $font-size-small;
        color: $color-text-disabled;
        &:hover {
          color: $youtube-primary;
        }

        .iconfont {
          margin-right: $gap-sm;
          font-weight: normal;
        }
      }
    }

    .module-empty {
      min-height: 12rem;
      margin-bottom: $gap * 2;
      font-weight: bold;
      font-size: $font-size-h3;
      @include radius-box($radius-sm);
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
