<template>
  <div class="vue-duoshuo">
    <div class="ds-thread" data-thread-key="123" data-title="我是留言板" data-url="http://localhost:8080/guestbook"></div>
  </div>
</template>

<script>

export default {
  name: 'vue-duoshuo',
  props: ['dataThreadKey', 'dataTitle', 'dataUrl'],
  data: function() {
    return {
    }
  },
  mounted: function() {
    console.log(this)
  }
}
</script>

<style>
</style>
