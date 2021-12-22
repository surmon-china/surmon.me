<template>
  <div class="mammon">
    <u-adsense key="adsense" class="mammon-box" ins-class="mammon-ins" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UAdsense from '/@/components/common/uadsense.vue'
  export default defineComponent({
    name: 'ArticleMammon',
    components: {
      UAdsense
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .mammon {
    padding: $gap;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .mammon-box,
    ::v-deep(.mammon-ins) {
      width: 100%;
      height: 16rem;
      min-height: 16rem;
    }
  }
</style>
