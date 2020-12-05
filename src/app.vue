<template>
  <div v-cloak id="app-root" :class="theme">
    <client-only>
      <progress-bar />
      <emoji-rain />
      <popup-root />
    </client-only>
    <!-- unuse suspense -> async route component -> can't extract style to css file -->
    <captured>
      <component :is="LayoutComponent">
        <router-view v-slot="{ Component, route }">
          <div class="router-view">
            <transition
              name="page"
              mode="out-in"
              @before-enter="handlePageTransitionDone"
            >
              <suspense>
                <component :is="Component" :key="route.name" />
              </suspense>
            </transition>
          </div>
        </router-view>
      </component>
    </captured>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { getLayoutByRouteMeta } from '/@/services/layout'
  import ProgressBar from '/@/components/common/progress.vue'
  import Captured from '/@/components/common/captured.vue'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/main.vue'
  import MobileMain from '/@/components/layout/mobile/main.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Captured,
      EmojiRain,
      ProgressBar,
    },
    setup() {
      const { theme, route, globalState, isMobile } = useEnhancer()
      const LayoutComponent = computed(() => {
        return isMobile.value
          ? MobileMain
          : PcMain
      })

      const handlePageTransitionDone = () => {
        globalState.layoutColumn.setValue(
          getLayoutByRouteMeta(route.meta)
        )
      }

      return {
        LayoutComponent,
        theme: theme.theme,
        handlePageTransitionDone
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
