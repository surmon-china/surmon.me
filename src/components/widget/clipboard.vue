<template>
  <div id="clipboard">
    <input ref="clipboard" v-model="text" type="text" class="clipboard-input">
  </div>
</template>

<script>
  export default {
    name: 'Clipboard',
    data() {
      return {
        text: ''
      }
    },
    mounted() {
      this.$root.$copyToClipboard = this.copyToClipboard
    },
    methods: {
      copyToClipboard(text) {
        this.text = text
        window.clickCopy = true
        setTimeout(() => {
          this.$refs.clipboard.select()
          document.execCommand('Copy')
          window.clickCopy = false
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  #clipboard {
    height: 0px;
    opacity: 0;
  }
</style>
