<script lang="ts" setup>
  import { ref } from 'vue'
  import { PopupMediaState } from './state'

  interface Props extends PopupMediaState {
    src: string
  }

  const props = defineProps<Props>()

  const mediaAspectRatio = ref('auto')
  const status = ref<'loading' | 'loaded' | 'error'>('loading')

  const handleMediaError = () => {
    status.value = 'error'
  }

  const handleImageLoad = async (event: Event) => {
    const element = event.target as HTMLImageElement
    const width = element.naturalWidth
    const height = element.naturalHeight
    mediaAspectRatio.value = `${width} / ${height}`
    status.value = 'loaded'
  }

  const handleVideoLoad = async (event: Event) => {
    const element = event.target as HTMLVideoElement
    const width = element.videoWidth
    const height = element.videoHeight
    mediaAspectRatio.value = `${width} / ${height}`
    status.value = 'loaded'
  }
</script>

<template>
  <div class="popup-media" :data-status="status" :style="{ aspectRatio: mediaAspectRatio }">
    <img
      v-if="props.type === 'image'"
      class="image"
      draggable="false"
      :src="props.src"
      v-bind="props.attrs"
      @load="handleImageLoad"
      @error="handleMediaError"
    />
    <video
      v-else-if="props.type === 'video'"
      class="video"
      autoplay
      controls
      :src="props.src"
      v-bind="props.attrs"
      @loadeddata="handleVideoLoad"
      @error="handleMediaError"
    />
    <transition name="module">
      <div class="loading" v-if="status === 'loading'">
        <loading-indicator gap="lg" width="1.8rem" height="1.2rem" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .popup-media {
    position: relative;
    width: 20rem;
    height: 12rem;
    max-width: 90vw;
    max-height: 82vh;
    border-radius: $radius-sm;
    will-change: width, height, aspect-ratio;
    @include mix.in-mobile {
      width: 60vw;
      height: 12rem;
      min-width: 50vw;
      min-height: 4rem;
      max-width: 88vw;
      max-height: 92vh;
    }

    &[data-status='loaded'] {
      width: fit-content !important;
      height: fit-content !important;
    }

    .image,
    .video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      @include mix.radius-box($radius-sm);
    }

    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
    }
  }
</style>
