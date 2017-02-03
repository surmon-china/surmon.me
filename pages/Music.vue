<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <div class="music">
          come soon
        </div>
      </div>
    </div>
    <div class="comment" v-if="false">
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
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {

    .detail {
      margin-bottom: 1em;
      background-color: $module-bg;

      .content {
        width: 100%;
        overflow:  hidden;

        .music {
          padding: 1em;
          height: 11em;
          line-height: 9em;
          text-align: center;
          font-size: 4em;
          text-transform: capitalize;
        }
      }
    }
  }
</style>
