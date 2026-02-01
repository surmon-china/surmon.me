<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getAssetURL } from '/@/transforms/url'

  interface Props {
    backgroundImage?: string
    backgroundImageY?: number
    cdn?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    backgroundImageY: 20,
    cdn: false
  })

  const { cdnDomain } = useEnhancer()

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
  <div class="mobile-page-banner">
    <div class="background" :style="backgroundImageStyle"></div>
    <div class="content">
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

  .mobile-page-banner {
    position: relative;
    z-index: $z-index-normal;
    height: $mobile-banner-height;
    margin-top: -$gap;
    margin-left: -$gap;
    margin-right: -$gap;

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
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: $white;

      .title {
        margin-top: 0;
        margin-bottom: $gap-lg;
        font-size: 2em;
      }

      .description {
        font-size: $font-size-h4;
        font-weight: bold;
      }
    }
  }
</style>
