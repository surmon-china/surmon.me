<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { isImageMediaIns, isVideoMediaIns } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { getCdnProxyURL } from '/@/transforms/url'

  interface Props {
    media: InstagramMediaItem
    objectFit?: 'contain' | 'cover'
    lazyImage?: boolean
    videoLoop?: boolean
    videoMuted?: boolean
    videoAutoPlay?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    objectFit: 'contain'
  })

  const emit = defineEmits<{
    (e: 'load', payload: { width: number; height: number }): void
  }>()

  const { cdnDomain, isCNUser } = useEnhancer()

  const getMediaUrl = (url: string) => {
    return isCNUser ? getCdnProxyURL(cdnDomain, url) : url
  }

  const handleImageLoad = async (event: Event) => {
    const element = event.target as HTMLImageElement
    const width = element.naturalWidth
    const height = element.naturalHeight
    emit('load', { width, height })
  }

  const handleVideoLoad = async (event: Event) => {
    const element = event.target as HTMLVideoElement
    const width = element.videoWidth
    const height = element.videoHeight
    emit('load', { width, height })
  }
</script>

<template>
  <div class="media-wrapper">
    <img
      v-if="isImageMediaIns(media)"
      class="image"
      draggable="false"
      :class="objectFit"
      :src="getMediaUrl(media?.media_url)"
      :alt="media.caption"
      :loading="lazyImage ? 'lazy' : 'eager'"
      @load="handleImageLoad"
    />
    <video
      v-else-if="isVideoMediaIns(media)"
      class="video"
      :class="objectFit"
      :controls="false"
      :loop="videoLoop"
      :muted="videoMuted"
      :autoplay="videoAutoPlay"
      :src="getMediaUrl(media.media_url)"
      @loadeddata="handleVideoLoad"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .media-wrapper {
    .image,
    .video {
      width: 100%;
      height: 100%;
      object-position: center;

      &.contain {
        object-fit: contain;
      }
      &.cover {
        object-fit: cover;
      }
    }
  }
</style>
