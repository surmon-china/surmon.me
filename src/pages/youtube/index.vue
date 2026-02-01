<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { useYouTubePlayListStore } from '/@/stores/socials'
  import { getYouTubePlaylistURL } from '/@/transforms/media'
  import PageBanner from '/@/components/desktop/widgets/page-banner.vue'
  import YoutubePlaylist from './playlist.vue'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE, IDENTITIES } from '/@/configs/app.config'

  const { goLinks, isZhLang } = useEnhancer()
  const youtubePlayListStore = useYouTubePlayListStore()
  const youtubePlaylistData = computed(() => {
    return youtubePlayListStore.data.filter((list) => list.contentDetails.itemCount > 1)
  })

  usePageSeo(() => {
    return {
      pageTitle: 'YouTube',
      description: isZhLang.value ? `${APP_PROFILE.author} 发布的长视频` : `${APP_PROFILE.author}'s YouTube`
    }
  })

  useUniversalFetch(() => youtubePlayListStore.fetch())
</script>

<template>
  <div class="youtube-page">
    <page-banner class="page-banner" background-video="/videos/clips/lake-1.mp4" :background-video-y="58" cdn>
      <template #title>
        <webfont>
          <i18n zh="山河入夢，春盡江南" :en="`${APP_PROFILE.author}'s YouTube videos`" />
        </webfont>
      </template>
      <template #description>
        <div class="links">
          <ulink class="item youtube" title="YouTube Channel" :href="goLinks.youtube">
            <span class="username">{{ IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID }}</span>
          </ulink>
        </div>
      </template>
    </page-banner>
    <div class="page-bridge"></div>
    <div class="page-content">
      <div class="container">
        <div class="module-content">
          <youtube-playlist :playlists="youtubePlaylistData">
            <template #empty>
              <empty class="module-empty" bold size="large">
                <i18n :k="LocalesKey.EMPTY_PLACEHOLDER" />
              </empty>
            </template>
            <template #loading>
              <ul class="module-skeleton">
                <div class="item" :key="item" v-for="item in 5 * 2">
                  <skeleton class="thumbnail" />
                </div>
              </ul>
            </template>
            <template #title="{ list }">
              <h4 class="module-title">
                <ulink class="link" :href="getYouTubePlaylistURL(list.id)">
                  {{ list.snippet.title }}
                  ({{ list.contentDetails.itemCount }})
                </ulink>
                <ulink class="brand" :href="goLinks.youtube">
                  <i class="iconfont icon-youtube"></i>
                  <span class="text">YouTube · Channel</span>
                </ulink>
              </h4>
            </template>
          </youtube-playlist>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .youtube-page {
    min-height: $full-page-content-height;

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
      height: 3rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .module-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      margin-top: 2.4rem;
      margin-bottom: 2.4rem;
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
        font-size: $font-size-h6;
        color: $color-text-disabled;
        &:hover {
          color: $youtube-primary;
        }

        .iconfont {
          margin-right: $gap-tiny;
          font-weight: normal;
        }
      }
    }

    .module-empty {
      min-height: 10rem;
      @include mix.radius-box($radius-sm);
      @include mix.common-bg-module();
    }

    .module-skeleton {
      margin: 0;
      padding: 0;
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: repeat(5, 1fr);

      .item {
        padding: $gap-sm;
        background-color: $module-bg;
        @include mix.radius-box($radius-sm);

        .thumbnail {
          height: 6rem;
        }
      }
    }

    .module-content {
      margin-bottom: $gap-lg;
    }
  }
</style>
