<template>
  <div v-cloak id="app-root" :class="theme">
    <client-only>
      <progress-bar />
      <emoji-rain />
      <popup-root />
    </client-only>
    <component :is="LayoutComponent">
      <suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <spin />
        </template>
      </suspense>
    </component>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue'
  import { isProd, isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/index.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'
  import ProgressBar from '/@/components/common/progress.vue'

  export default defineComponent({
    name: 'App',
    components: {
      EmojiRain,
      ProgressBar
    },
    setup() {
      const { theme, store, isMobile } = useEnhancer()
      const LayoutComponent = computed(() => {
        return isMobile.value
          ? MobileMain
          : PcMain
      })
      return {
        LayoutComponent,
        theme: theme.theme,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #app-root {
    color: $text;

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
