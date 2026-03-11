<script lang="ts" setup>
  import Markdown from '/@/components/common/markdown.vue'
  defineProps<{ content: string }>()
</script>

<template>
  <markdown class="message-markdown" :markdown="content" :compact="true" />
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .message-markdown {
    ::v-deep(p),
    ::v-deep(ul),
    ::v-deep(ol) {
      margin-bottom: $gap-xs;
    }
  }
</style>
