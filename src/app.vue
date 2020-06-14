<template>
  <div v-cloak id="app-root" :class="theme">
    <client-only>
      <emoji-rain />
      <popup-root />
    </client-only>
    <component :is="layoutComponent">
      <transition name="fade" mode="out-in">
        <suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <loading />
          </template>
        </suspense>
      </transition>
    </component>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue'
  import { isProd, isClient } from '/@/vuniversal/env'
  import { useGlobalState } from '/@/state'
  import { useTheme } from '/@/services/theme'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/main.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'

  export default defineComponent({
    name: 'App',
    components: {
      EmojiRain,
      PcMain,
      MobileMain
    },
    setup() {
      const theme = useTheme()
      const globalState = useGlobalState()
      const layoutComponent = computed(() => {
        return globalState.userAgent.isMobile
          ? MobileMain.name
          : PcMain.name
      })

      return {
        theme: theme.theme,
        layoutComponent,
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
