<template>
  <div class="page">
    <div class="detail">
      <div class="content">
      </div>
    </div>
    <div class="comment">
      <duoshuo data-thread-key="page" data-title="我是留言板"></duoshuo>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page'
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/mixins';
  @import '../../sass/variables';
  .page {

    .detail {
      margin-bottom: 1em;
      background-color: $module-bg;

      .content {
        width: 100%;
        height: 17em;
        overflow:  hidden;
      }
    }
  }
</style>
