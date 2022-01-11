<template>
  <div class="lens-page" :class="{ dark: isDarkTheme }">
    <page-banner :blur="false" :position="36" :image="bannerImageURL">
      <template #title>
        <i18n zh="凡心所向，素履以往" en="Because it's there" />
      </template>
      <template #description>
        <i18n>
          <template #zh>生如逆旅，一苇以航</template>
          <template #en>"why did you want to climb mount Everest?"</template>
        </i18n>
      </template>
    </page-banner>
    <div class="container">
      <page-title class="module-title instagram" :level="5">
        <ulink class="link" :href="VALUABLE_LINKS.INSTAGRAM">Newest · Instagram · Plogs</ulink>
      </page-title>
      <placeholder :data="lensStore.instagram.data" :loading="lensStore.instagram.fetching">
        <template #placeholder>
          <empty class="module-empty" key="empty">
            <i18n :lkey="LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <lens-skeleton :height="243" class="module-loading" key="loading" />
        </template>
        <template #default>
          <div class="module-content">
            <instagram :medias="lensStore.instagram.data" />
          </div>
        </template>
      </placeholder>
      <div class="module-content">
        <ul class="playlist">
          <li
            class="item"
            :title="list.title"
            :key="index"
            v-for="(list, index) in lensStore.youtube.data.filter(
              (list) => list.contentDetails.itemCount > 1
            )"
          >
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
            <youtube-video-list :playlist-id="list.id" @view="openYouTubeModal">
              <template #empty>
                <empty class="module-empty" key="empty">
                  <i18n :lkey="LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
                </empty>
              </template>
              <template #loading>
                <lens-skeleton :count="4" :height="198" class="module-loading" key="loading" />
              </template>
            </youtube-video-list>
          </li>
        </ul>
        <client-only>
          <popup :visible="isOnYouTubeModal" @close="closeYouTubeModal">
            <iframe
              class="youtube-modal"
              :src="getYouTubeVideoEmbedURL(youtubeModalVideo.snippet.resourceId.videoId)"
            />
          </popup>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useLensStore } from '/@/store/lens'
  import { useUniversalFetch, universalRef } from '/@/universal'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'
  import { firstUpperCase } from '/@/transforms/text'
  import { getYouTubePlaylistURL, getYouTubeVideoEmbedURL } from '/@/transforms/media'
  import { randomNumber } from '/@/utils/random'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/fullpage/banner.vue'
  import PageTitle from '/@/components/common/fullpage/title.vue'
  import LensSkeleton from './skeleton.vue'
  import Instagram from './instagram.vue'
  import YoutubeVideoList from './youtube.vue'

  export default defineComponent({
    name: 'LensPage',
    components: {
      PageBanner,
      PageTitle,
      LensSkeleton,
      Instagram,
      YoutubeVideoList
    },
    setup() {
      const { i18n, meta, isDarkTheme, isZhLang } = useEnhancer()
      const lensStore = useLensStore()
      const bannerImageURL = universalRef(
        'page-lens-banner',
        () => `/images/page-lens/banner-${randomNumber(2)}.jpg`
      )

      const youtubeModalVideo = ref<any>(null)
      const isOnYouTubeModal = computed(() => Boolean(youtubeModalVideo.value))
      const openYouTubeModal = (video: any) => {
        youtubeModalVideo.value = video
      }
      const closeYouTubeModal = () => {
        youtubeModalVideo.value = null
      }

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_LENS, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_LENS), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.author} 的视频创作` }
      })

      const fetchAllData = () => {
        return Promise.all([lensStore.fetchInstagramMedias(), lensStore.fetchYouTubePlaylist()])
      }

      useUniversalFetch(() => fetchAllData())

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        getYouTubePlaylistURL,
        getYouTubeVideoEmbedURL,
        lensStore,
        isDarkTheme,
        isOnYouTubeModal,
        openYouTubeModal,
        closeYouTubeModal,
        youtubeModalVideo,
        bannerImageURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .youtube-modal {
    width: 88vw;
    height: 76vh;
    position: relative;
  }

  .lens-page {
    .module-title {
      .link {
        color: $text;
        font-weight: bold;
        &:hover {
          color: $link-color;
        }
      }

      &.instagram {
        --item-primary: #{$instagram-primary};
        background: linear-gradient(to right, transparent, $module-bg-lighter, transparent);
      }

      &.youtube {
        --item-primary: #{$youtube-primary};
        background: $module-bg-lighter;

        .icon {
          color: var(--item-primary);
          margin-right: $sm-gap;
          font-size: $font-size-h3;
          font-weight: normal;
        }

        .brand {
          color: $text-disabled;
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

      .playlist {
        padding: 0;
        margin: 0;
        list-style: none;
      }
    }
  }
</style>
