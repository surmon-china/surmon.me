<template>
  <div v-cloak id="app_root" class="app-root" :class="[theme, isMobile ? 'mobile' : 'desktop']">
    <client-only>
      <progress-bar :spin="!isMobile" />
      <emoji-rain />
      <popup-root />
    </client-only>
    <captured>
      <desktop-main v-if="!isMobile" />
      <mobile-main v-else />
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
      const { theme, isMobile } = useEnhancer()
      return {
        isMobile,
        theme: theme.theme
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/styles/init.scss';
  @import 'src/styles/theme.scss';

  .app-root {
    color: $text;

    &.default {
      @include defaultTheme();
    }

    &.dark {
      @include darkTheme();
    }

    &.desktop {
      .container {
        width: $container-width;
        margin: 0 auto;
      }
    }

    &.mobile {
      .container {
        width: 100%;
      }
    }

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
