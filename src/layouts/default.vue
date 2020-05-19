<template>
  <div v-cloak id="app" :class="theme">
    <client-only>
      <emoji-rain />
      <clipboard />
    </client-only>
    <pc-main-view v-if="!isMobile" />
    <mobile-main-view v-else />
  </div>
</template>

<script>
  import Vue from 'vue'
  import EmojiRain from '~/components/widget/emoji-rain.vue'
  import Clipboard from '~/components/widget/clipboard.vue'
  import PcMainView from '~/components/layout/pc/main.vue'
  import MobileMainView from '~/components/layout/mobile/main.vue'
  import { isBrowser, isProdMode } from '~/environment'

  export default Vue.extend({
    name: 'App',
    components: {
      EmojiRain,
      Clipboard,
      PcMainView,
      MobileMainView
    },
    computed: {
      theme() {
        return this.$store.state.global.theme
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    mounted() {
      if (isBrowser && isProdMode) {
        console.clear()
        console.log(
          `%c${window.$nuxt.$i18n.text.slogan} %csurmon@foxmail.com`,
          'color:#666;font-size:3em;',
          'color:#666;font-size:13px;'
        )
      }
    }
  })
</script>

<style lang="scss" scoped>
  #app {
    color: $text;

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
