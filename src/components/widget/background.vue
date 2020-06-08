<template>
  <div id="background">
    <div class="background-image" :class="{ dark: isDarkTheme }"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useTheme, Theme } from '/@/services/theme'
  export default defineComponent({
    name: 'Background',
    setup() {
      const theme = useTheme()
      const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
      return { isDarkTheme }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: $z-index-underground;
    background-color: $body-bg;

    > .background-image {
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
