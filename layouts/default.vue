<template>
  <div id="app" :class="theme" v-cloak>
    <Clipboard />
    <PcMainView v-if="!isMobile" />
    <MobileMainView v-else />
  </div>
</template>

<script>
  import PcMainView from '~/components/layout/pc/main'
  import MobileMainView from '~/components/layout/mobile/main'
  import Clipboard from '~/components/widget/clipboard'
  export default {
    name: 'app',
    head() {
      return this.isMobile ? { bodyAttrs: { class: 'mobile' }} : {}
    },
    components: {
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
  }
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
