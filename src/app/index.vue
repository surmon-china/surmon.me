<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import NavProgress from '/@/components/widgets/navigation-progress/index.vue'
  import EmojiRain from '/@/components/widgets/emoji-rain.vue'
  import DesktopMain from '/@/components/layout/desktop/main.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'
  import Captured from './error/captured.vue'

  const { isMobile } = useEnhancer()
</script>

<template>
  <div class="app-root" v-cloak>
    <client-only>
      <nav-progress :spin="!isMobile" />
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

<style lang="scss">
  @use '/src/styles/base/variables' as *;

  .app-root {
    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
