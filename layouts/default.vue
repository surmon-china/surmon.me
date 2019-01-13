<template>
  <div id="app" :class="theme" v-cloak>
    <div id="app-tools">
      <input type="text" v-model="clipboardText" class="clipboard-input" ref="clipboard">
    </div>
    <PcMainView v-if="!isMobile" @setTheme="setTheme" />
  </div>
</template>

<script>
  import PcMainView from '~/components/layout/pc/main'
  import * as humanizedStorage from '~/utils/local-storage'
  export default {
    name: 'app',
    components: {
      PcMainView
    },
    data() {
      return {
        theme: 'default',
        clipboardText: ''
      }
    },
    mounted() {
      this.$root.$emoji233333 = null
      this.$root.$copyToClipboard = this.copyToClipboard
    },
    computed: {
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    methods: {
      setTheme(theme) {
        this.theme = theme
        humanizedStorage.set('theme', theme)
      },
      copyToClipboard(text) {
        this.clipboardText = text
        // 维护中间量用于给拦截器做标识
        window.clickCopy = true
        setTimeout(() => {
          this.$refs.clipboard.select()
          document.execCommand('Copy')
          window.clickCopy = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    color: $text;

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    #app-tools {
      height: 0px;
      opacity: 0;
    }
  }
</style>
