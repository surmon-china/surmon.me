<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { Comment } from '/@/interfaces/comment'
  import { getCommentUrlHashById } from '/@/constants/element-anchor'
  import { getPageURL } from '/@/transforms/url'
  import { copy } from '/@/utils/clipboard'

  const props = defineProps<{
    comment: Comment
  }>()

  const { route } = useEnhancer()

  const copyCommentUrl = () => {
    const urlHash = getCommentUrlHashById(props.comment.id)
    const url = getPageURL(route.path, urlHash)
    copy(url)
  }
</script>

<template>
  <button class="comment-floor" @click="copyCommentUrl">#{{ comment.id }}</button>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-floor {
    color: $color-text-divider;
    font-size: $font-size-tertiary;
    font-weight: bold;
    &:hover {
      color: $color-link;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
</style>
