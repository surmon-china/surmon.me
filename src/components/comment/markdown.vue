<script lang="ts" setup>
  import { Markdown } from '/@/effects/markdown'
  const props = defineProps<{ content: string }>()
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
    --markdown-block-gap: 0.5em;
    --markdown-list-li-block-gap: 0.1em;
    --markdown-list-padding-left: 1em;
  }

  .comment-markdown {
    padding-bottom: 0.2em;

    > :first-child {
      margin-top: 0.2em;
    }

    > :is(blockquote, pre, table, .figure-wrapper):first-child {
      margin-top: 0.5em;
    }

    :deep(blockquote) {
      border-color: $module-bg-darker-3;
    }

    :deep(hr) {
      border-color: $module-bg-darker-3;
    }

    :deep(code) {
      border-color: $module-bg-darker-3;
      background-color: $module-bg-darker-2;
    }

    :deep(figure.image) {
      border-color: $module-bg-darker-3;

      figcaption {
        border-color: $module-bg-darker-2;
      }

      img {
        max-height: 10rem;
      }

      figcaption {
        display: none;
      }
    }
  }
</style>
