<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <div class="music">
          音乐播放器
        </div>
      </div>
    </div>
    <div class="comment">
      <duoshuo data-thread-key="music" data-title="我是播放器"></duoshuo>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Music'
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
        overflow:  hidden;

        .music {
          padding: 1em;
          height: 40em;
        }
      }
    }
  }
</style>
