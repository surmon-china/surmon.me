<script setup lang="ts">
  import Markdown from '/@/components/common/markdown.vue'
  defineProps<{ content: string }>()
</script>

<template>
  <markdown class="assistant-message-markdown" :markdown="content" :compact="true" />
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .assistant-message-markdown {
    ::v-deep(p) {
      margin-bottom: 0;
    }

    ::v-deep(li) {
      &:hover {
      }
    }
  }
</style>
