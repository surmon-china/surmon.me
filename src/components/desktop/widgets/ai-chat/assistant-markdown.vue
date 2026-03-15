<script lang="ts" setup>
  import { Markdown } from '/@/effects/markdown'
  const props = defineProps<{ content: string }>()
</script>

<template>
  <markdown
    class="assistant-message-markdown"
    :markdown="content"
    :compact="true"
    :render-options="{ cjkSpacing: true, codeLineNumbers: true }"
  />
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .assistant-message-markdown {
    --markdown-heading-line-height: #{$line-height-loose};
    --markdown-list-li-block-gap: #{$gap-tiny};
    --markdown-block-gap: #{$gap-tiny};
    --markdown-blockquote-border-width: 0.4em;
  }

  .assistant-message-markdown {
    overflow: hidden;
    text-autospace: normal;

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }

    :deep(hr) {
      margin-block: 0.5em;
      border-color: $module-bg-darker-1;
      border-style: dashed;
    }

    :deep(pre) {
      border-color: $module-bg-darker-1;
      background-color: transparent;
    }

    :deep(h1),
    :deep(h2),
    :deep(h3) {
      margin-top: $gap-xs;
      margin-bottom: $gap-tiny;
    }

    :deep(h1),
    :deep(h2) {
      font-size: $font-size-h4;
    }

    :deep(h3),
    :deep(h4),
    :deep(h5) {
      font-size: $font-size-h5;
    }
  }
</style>
