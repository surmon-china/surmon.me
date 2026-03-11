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
      margin-bottom: $gap-tiny;
    }

    ::v-deep(hr) {
      margin-block: $gap-xs;
      border-color: $module-bg-darker-1;
      border-style: dashed;
    }

    ::v-deep(h1),
    ::v-deep(h2),
    ::v-deep(h3) {
      margin-top: $gap-sm;
      margin-bottom: $gap-tiny;
    }

    ::v-deep(h1),
    ::v-deep(h2) {
      font-size: $font-size-h4;
    }
    ::v-deep(h3),
    ::v-deep(h4),
    ::v-deep(h5) {
      font-size: $font-size-h5;
    }
  }
</style>
