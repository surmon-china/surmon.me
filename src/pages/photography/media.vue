<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { isImageMediaIns, isVideoMediaIns } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { getCdnProxyURL } from '/@/transforms/url'

  const props = defineProps<{
    media: InstagramMediaItem
    lazyImage?: boolean
    videoLoop?: boolean
    videoMuted?: boolean
    videoAutoPlay?: boolean
  }>()

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
      :src="getMediaUrl(media?.media_url)"
      :alt="media.caption"
      :loading="lazyImage ? 'lazy' : 'eager'"
      @load="handleImageLoad"
    />
    <video
      v-else-if="isVideoMediaIns(media)"
      class="video"
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
      object-fit: contain;
      object-position: center;
    }
  }
</style>
