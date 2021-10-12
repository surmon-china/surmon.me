<template>
  <div id="background">
    <div class="image" :class="{ dark: isDarkTheme }"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '../../../src/app/enhancer'
  export default defineComponent({
    name: 'Background',
    setup() {
      const { isDarkTheme } = useEnhancer()
      return { isDarkTheme }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
      background: cdn-url('/images/background.png');

      &.dark {
        opacity: 0.2;
      }
    }
  }
</style>
