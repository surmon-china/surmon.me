<template>
  <div id="clipboard">
    <input type="text" v-model="text" class="clipboard-input" ref="clipboard">
  </div>
</template>

<script>
  export default {
    name: 'clipboard',
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
