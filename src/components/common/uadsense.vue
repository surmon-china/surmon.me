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
  /** universal rectangular Ad */
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'UAdsense',
    props: {
      insClass: String,
      insStyle: String
    }
  })
</script>
