<template>
  <div class="comment-box"></div>
</template>

<script>
  export default {
    name: 'vue-duoshuo',
    props: {
      url: {
        required: true
      },
      title: {
        required: true
      },
      threadKey: {
        required: true
      }
    },
    mounted() {
      if (this.url) this.$el.setAttribute('data-url', this.url)
      if (this.title) this.$el.setAttribute('data-title', this.title)
      if (this.threadKey) this.$el.setAttribute('data-thread-key', this.threadKey)
      this.$el.setAttribute('class', 'ds-thread comment-box')
      if (window.DUOSHUO) DUOSHUO.EmbedThread(this.$el)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .comment-box {
    padding: 1em;
    background-color: $module-bg;
  }
</style>
