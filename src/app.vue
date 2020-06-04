<template>
  <div v-cloak id="app-root" :class="theme">
    <!-- <client-only>
    </client-only> -->
    <emoji-rain />
    <component :is="'pc-main-view'">
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
  import { useI18n } from '/@/services/i18n'
  import { useGlobalState } from '/@/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { META } from '/@/config/app.config'
  import EmojiRain from '/@/components/widget/emoji-rain.vue'
  import PcMainView from '/@/components/layout/pc/main-new.vue'
  // import MobileMainView from '/@/components/layout/mobile/main.vue'

  export default defineComponent({
    name: 'App',
    components: {
      EmojiRain,
      PcMainView,
      // MobileMainView
    },
    setup() {
      const i18n = useI18n()
      const theme = useTheme()
      const globalState = useGlobalState()
      const layoutComponent = computed(() => {
        return globalState.userAgent.isMobile
          ? PcMainView.name
          : PcMainView.name
          // : PcMainView.name
      })

      onMounted(() => {
        if (isClient && isProd) {
          console.clear()
          console.log(
            `%c${i18n.t(LANGUAGE_KEYS.APP_SLOGAN)} %c${META.email}`,
            `%c${META.email}`,
            'color:#666;font-size:3em;',
            'color:#666;font-size:13px;'
          )
        }
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
