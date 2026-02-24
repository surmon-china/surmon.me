<script lang="ts" setup>
  import Markdown from '/@/components/common/markdown.vue'

  const props = defineProps<{
    content: string
  }>()
</script>

<template>
  <markdown
    class="comment-markdown"
    :markdown="content"
    :compact="true"
    :render-options="{ sanitize: true, codeLineNumbers: false }"
  />
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-markdown {
    overflow: hidden;
    padding-bottom: 0.2em;

    > :first-child {
      margin-top: 0.2em;
    }

    ::v-deep(hr) {
      border-color: $module-bg-darker-2;
    }
  }
</style>
