<template>
  <div v-cloak id="app-root" :class="theme">
    <client-only>
      <emoji-rain />
      <popup-root />
    </client-only>
    <component :is="LayoutComponent">
      <transition name="fade" mode="out-in">
        <suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <su-loading />
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
  import { useStore, getNamespace, Modules } from '/@/store'
  import { OptionModuleActions } from '/@/store/option'
  import { CategoryModuleActions } from '/@/store/category'
  import { TagModuleActions } from '/@/store/tag'
  import { useTheme } from '/@/services/theme'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMain from '/@/components/layout/pc/main.vue'
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

      // TODO: 应该分发至关注点
      // await Promise.all([
      //   store.dispatch(getNamespace(Modules.Tag, TagModuleActions.FetchList)),
      //   store.dispatch(getNamespace(Modules.Category, CategoryModuleActions.FetchList)),
      //   store.dispatch(getNamespace(Modules.Option, OptionModuleActions.FetchAdminInfo))
      // ])

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
