<script lang="ts" setup>
  import { Comment } from '/@/interfaces/comment'
  import type { CommentMeta } from './item.vue'

  const props = defineProps<{
    comment: Comment
    meta: CommentMeta
  }>()
</script>

<template>
  <span class="comment-ai-info" v-if="meta.isAiGenerated">
    <i class="iconfont icon-cpu"></i>
    <span>{{ meta.aiProvider }}</span>
  </span>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-ai-info {
    .iconfont {
      margin-right: $gap-tiny;
    }
  }
</style>
