<template>
  <div v-cloak id="app-root" :class="theme">
    <!-- <client-only>
    </client-only> -->
    <emoji-rain />
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
  import { useTheme } from '/@/services/theme'
  import { useGlobalState } from '/@/state'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/main-new.vue'
  // import MobileMainView from '/@/components/layout/mobile/main.vue'

  export default defineComponent({
    name: 'App',
    components: {
      EmojiRain,
      PcMain,
      // MobileMainView
    },
    setup() {
      const theme = useTheme()
      const globalState = useGlobalState()
      const layoutComponent = computed(() => {
        return globalState.userAgent.isMobile
          ? PcMain.name
          : PcMain.name
          // : PcMainView.name
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
