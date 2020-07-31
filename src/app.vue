<template>
  <div v-cloak id="app-root" :class="theme">
    <client-only>
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
  import { useGlobalState } from '/@/state'
  import { useStore } from '/@/store'
  import { useTheme } from '/@/services/theme'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/index.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'

  export default defineComponent({
    name: 'App',
    components: {
      EmojiRain
    },
    setup() {
      const theme = useTheme()
      const store = useStore()
      const globalState = useGlobalState()
      const LayoutComponent = computed(() => {
        return globalState.userAgent.isMobile
          ? MobileMain
          : PcMain
      })

      return {
        theme: theme.theme,
        LayoutComponent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #app {
    color: $text;

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
