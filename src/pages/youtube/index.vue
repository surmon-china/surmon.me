<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { APP_PROFILE, IDENTITIES } from '/@/configs/app.config'
  import { LocaleKey } from '/@/locales'
  import { getYouTubePlaylistURL } from '/@/transforms/media'
  import PageBanner from '/@/components/common/banner.vue'
  import YoutubeSkeleton from './skeleton.vue'
  import YoutubePlaylist from './playlist.vue'

  const { isZhLang } = useEnhancer()
  const { youtubePlayList, goLink } = useStores()
  const youtubePlaylistData = computed(() => {
    return youtubePlayList.data.filter((list) => list.contentDetails.itemCount > 1)
  })

  usePageSeo(() => {
    return {
      pageTitle: 'YouTube',
      description: isZhLang.value ? `${APP_PROFILE.author} 的长视频` : `${APP_PROFILE.author}'s YouTube`
    }
  })

  useUniversalFetch(() => youtubePlayList.fetch())
</script>

<template>
  <div class="youtube-page">
    <page-banner class="page-banner" video="/videos/clips/lake-1.mp4" :video-position="58" cdn>
      <template #title>
        <webfont>
          <i18n zh="山河入夢，春盡江南" :en="`${APP_PROFILE.author}'s YouTube videos`" />
        </webfont>
      </template>
      <template #description>
        <div class="links">
          <ulink class="item youtube" title="YouTube Channel" :href="goLink.map.youtube">
            <span class="username">{{ IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID }}</span>
          </ulink>
        </div>
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
              <ulink class="brand" :href="goLink.map.youtube">
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
              <i18n :k="LocaleKey.EMPTY_PLACEHOLDER" />
            </empty>
          </template>
        </youtube-playlist>
      </div>
    </container>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .youtube-page {
    min-height: $full-page-active-content-height;

    .page-banner {
      .links {
        display: inline-flex;
        align-items: center;

        .item {
          color: $white;
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }

          &.youtube {
            .username {
              font-size: $font-size-h3;
              font-family: $font-family-monospace;
            }
          }
        }
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
      @include mix.radius-box($radius-sm);
      @include mix.common-bg-module();
    }

    .module-loading {
      margin-bottom: $gap * 2;
    }

    .module-content {
      margin-bottom: $gap * 2;
    }
  }
</style>
