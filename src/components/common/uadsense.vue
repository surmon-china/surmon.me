<template>
  <Adsense
    :ins-class="insClass || ''"
    :ins-style="insStyle"
    data-ad-format="auto"
    data-ad-slot="7405264495"
    data-full-width-responsive="true"
  />
</template>

<script lang="ts">
  /**唯一一个通用矩形广告模块 */
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'UAdsense',
    props: {
      insClass: String,
      insStyle: String
    }
  })
</script>
