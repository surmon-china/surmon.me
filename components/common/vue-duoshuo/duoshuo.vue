<template>
  <div class="comment-box">
    <div class="hidden-comment">
      {{ this.$store.comment }}
    </div>
    <div class="duoshuo-comment" ref="duoshuo"></div>
  </div>
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
      console.log()
      if (this.url) this.$refs.duoshuo.setAttribute('data-url', this.url)
      if (this.title) this.$refs.duoshuo.setAttribute('data-title', this.title)
      if (this.threadKey) this.$refs.duoshuo.setAttribute('data-thread-key', this.threadKey)
      this.$refs.duoshuo.setAttribute('class', 'ds-thread')
      if (window.DUOSHUO) DUOSHUO.EmbedThread(this.$refs.duoshuo)
    },
    computed: {
      comments() {
        return this.$store.comment
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .duoshuo-comment {
    padding: 1em;
    background-color: $module-bg;
  }
</style>
