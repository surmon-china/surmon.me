<template>
  <div class="mammon">
    <Adsense
      ins-class="mammon-ins"
      ins-style="display:inline-block;width:594px;height:180px"
      data-ad-slot="4117530525"
      class="mammon-box"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ArticleMammon'
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .mammon {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .mammon-box,
    ::v-deep(.mammon-ins) {
      width: 100%;
      height: 180px;
      overflow: hidden;
    }
  }
</style>
