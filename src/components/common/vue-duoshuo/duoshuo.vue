<template>
  <div class="ds-thread"></div>
</template>

<script>
  export default {
    name: 'vue-duoshuo',
    props: ['dataUrl'],
    mounted: function() {
      // console.log('初始化')
      if (this.dataUrl) this.$el.setAttribute('data-url', this.dataUrl)
      if (window.DUOSHUO) DUOSHUO.EmbedThread(this.$el)
    },
    ready: function() {
      // console.log('初始化')
      if (this.dataUrl) this.$el.setAttribute('data-url', this.dataUrl)
      if (window.DUOSHUO) DUOSHUO.EmbedThread(this.$el)
    }
  }
</script>
