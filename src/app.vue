<template>
  <div v-cloak id="app-root" :class="theme">
    <client-only>
      <progress-bar />
      <emoji-rain />
      <popup-root />
    </client-only>
    <captured>
      <component :is="LayoutComponent">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="page">
            <suspense>
              <component :is="Component" />
            </suspense>
          </transition>
        </router-view>
      </component>
    </captured>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onErrorCaptured } from 'vue'
  import { isProd, isClient } from '/@/enverionment'
  import { useEnhancer } from '/@/enhancer'
  import Captured from '/@/components/common/captured.vue'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/main.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'
  import ProgressBar from '/@/components/common/progress.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Captured,
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
