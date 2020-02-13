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
