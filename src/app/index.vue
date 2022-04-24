<template>
  <div v-cloak class="app-root">
    <client-only>
      <progress-bar :spin="!isMobile" />
      <emoji-rain />
      <popup-root />
    </client-only>
    <captured>
      <responsive>
        <template #desktop><desktop-main /></template>
        <template #mobile><mobile-main /></template>
      </responsive>
    </captured>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import Captured from '/@/components/root/captured.vue'
  import DesktopMain from '/@/components/layout/desktop/main.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'

  export default defineComponent({
    name: 'App',
    components: {
      EmojiRain,
      Captured,
      DesktopMain,
      MobileMain
    },
    setup() {
      const { isMobile } = useEnhancer()
      return { isMobile }
    }
  })
</script>

<style lang="scss">
  @import 'src/styles/variables.scss';

  .app-root {
    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
