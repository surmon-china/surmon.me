<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useInstagramLatestMediasStore } from '/@/stores/socials'
  import { isVideoMediaIns, isAlbumMediaIns, getInstagramCoverURL } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { getCdnProxyURL } from '/@/transforms/url'

  const { goLinks, cdnDomain, isCNUser } = useEnhancer()
  const instagramLatestMediasStore = useInstagramLatestMediasStore()

  const isPageLoading = ref(true)
  const igMedias = computed(() => instagramLatestMediasStore.data?.data.slice(0, 23) ?? [])
  const getMediaThumbnail = (media: InstagramMediaItem) => {
    const url = getInstagramCoverURL(media)
    return isCNUser ? getCdnProxyURL(cdnDomain, url) : url
  }

  onMounted(() => {
    instagramLatestMediasStore
      .fetch()
      .catch(() => null)
      .finally(() => {
        isPageLoading.value = false
      })
  })
</script>

<template>
  <placeholder :loading="isPageLoading" :has-data="!!igMedias.length">
    <template #placeholder>
      <empty size="large" bold />
    </template>
    <template #loading>
      <ul class="media-skeleton">
        <li class="item" v-for="i in 24" :key="i">
          <skeleton class="skeleton" />
        </li>
      </ul>
    </template>
    <template #default>
      <ul class="media-list">
        <li class="item" :key="index" v-for="(media, index) in igMedias">
          <ulink class="link" :href="media.permalink" :title="media.caption">
            <uimage class="cover" :alt="media.caption" :src="getMediaThumbnail(media)" />
            <div class="type-icon">
              <i class="iconfont icon-video" v-if="isVideoMediaIns(media)"></i>
              <i class="iconfont icon-album" v-else-if="isAlbumMediaIns(media)"></i>
              <i class="iconfont icon-camera" v-else></i>
            </div>
            <div class="mask">
              <i class="iconfont icon-music-play" v-if="isVideoMediaIns(media)"></i>
              <i class="iconfont icon-eye" v-else></i>
            </div>
          </ulink>
        </li>
        <li class="item">
          <ulink class="link more" :href="goLinks.instagram">•••</ulink>
        </li>
      </ul>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $item-size: 74px;

  .media-skeleton,
  .media-list {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: $gap-sm;

    .item {
      width: $item-size;
      height: $item-size;
    }
  }

  .media-skeleton {
    .item {
      .skeleton {
        width: 100%;
        height: 100%;
      }
    }
  }

  .media-list {
    .item {
      position: relative;
      overflow: hidden;

      .link {
        display: block;
        width: 100%;
        height: 100%;
        background-color: $module-bg-darker-1;
        opacity: 0.8;
        @include mix.visibility-transition();
        &:hover {
          opacity: 1;
          .mask {
            @include mix.visible();
          }
        }

        &.more {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $font-size-h3;
        }

        .cover {
          width: 100%;
          height: 100%;
          border-radius: $radius-xs;
          object-fit: cover;
        }

        .type-icon {
          opacity: 0.7;
          position: absolute;
          top: math.div($gap-tiny, 2);
          right: $gap-tiny;
          color: $white;
        }

        .mask {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $white;
          background-color: rgba(0, 0, 0, 0.3);
          @include mix.visibility-transition();
          @include mix.hidden();
        }
      }
    }
  }
</style>
