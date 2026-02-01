<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getAssetURL } from '/@/transforms/url'

  interface Props {
    backgroundImage?: string
    backgroundImageY?: number
    backgroundVideo?: string
    backgroundVideoY?: number
    blur?: number
    cdn?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    backgroundImageY: 20,
    backgroundVideoY: 48,
    blur: 0,
    cdn: false
  })

  const { cdnDomain } = useEnhancer()

  const backgroundVideoSource = computed(() => {
    return props.cdn && props.backgroundVideo
      ? getAssetURL(cdnDomain, props.backgroundVideo)
      : props.backgroundVideo
  })

  const backgroundImage = computed(() => {
    return props.cdn && props.backgroundImage
      ? getAssetURL(cdnDomain, props.backgroundImage)
      : props.backgroundImage
  })

  const backgroundImageStyle = computed<CSSProperties | null>(() => {
    if (!backgroundImage.value) return null
    return {
      backgroundImage: `url(${backgroundImage.value})`,
      backgroundPositionY: `${props.backgroundImageY}%`
    }
  })
</script>

<template>
  <div class="desktop-page-banner">
    <div class="background" :style="backgroundImageStyle">
      <video
        class="video"
        loop
        muted
        autoplay
        :controls="false"
        :style="{ objectPosition: `0% ${props.backgroundVideoY}%` }"
        :src="backgroundVideoSource"
        v-if="backgroundVideoSource"
      ></video>
    </div>
    <div class="content" :class="{ blur: Boolean(blur) }" :style="{ '--blur': `${blur}px` }">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .desktop-page-banner {
    position: relative;
    height: $full-column-page-banner-height;
    z-index: $z-index-normal;

    .background {
      position: absolute;
      z-index: $z-index-underground;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $module-bg-darker-1;
      background-size: cover;
      background-position-x: center;
      @include mix.dark-theme {
        filter: brightness(0.8);
      }

      .video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: $white;
      &.blur {
        @include mix.backdrop-blur(var(--blur));
      }

      .title {
        font-size: 3em;
        margin-top: 0;
        margin-bottom: $gap-lg;
      }

      .description {
        font-size: $font-size-h4;
        font-weight: bold;
      }
    }
  }
</style>
