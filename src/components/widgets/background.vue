<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { getAssetURL } from '/@/transforms/url'
  const { cdnDomain, isDarkTheme } = useEnhancer()
  const backgroundImage = getAssetURL(cdnDomain, '/images/background.png')
</script>

<template>
  <div id="background">
    <div
      class="image"
      :class="{ dark: isDarkTheme }"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: $z-index-underground;
    background-color: $body-bg;

    .image {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.3;
      background-repeat: repeat-x;
      background-position: top center;
      &.dark {
        opacity: 0.2;
      }
    }
  }
</style>
