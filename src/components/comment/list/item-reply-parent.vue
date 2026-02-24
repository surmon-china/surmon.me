<script lang="ts" setup>
  import { computed } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { useCommentStore } from '/@/stores/comment'
  import { Comment, CommentAuthorStatus } from '/@/interfaces/comment'
  import { getCommentItemElementId } from '/@/constants/element-anchor'
  import { scrollToAnchor } from '/@/utils/scroller'

  const props = defineProps<{
    comment: Comment
  }>()

  const commentStore = useCommentStore()

  const parentId = computed(() => props.comment.parent_id!)
  const parentComment = computed(() => commentStore.commentMap.get(parentId.value))
  const isGhostParent = computed(() => parentComment.value?.author_status === CommentAuthorStatus.Ghost)

  const scrollToParentComment = () => {
    scrollToAnchor(getCommentItemElementId(parentId.value))
  }
</script>

<template>
  <p class="comment-reply-parent">
    <span class="reply">
      <i18n zh="回复" en="Reply to" />
    </span>
    <span class="tombstone" v-if="comment.orphaned">
      <i18n :k="LocalesKey.COMMENT_DELETED_COMMENT" />
    </span>
    <template v-else>
      <button class="parent" @click="scrollToParentComment">
        <span class="id">#{{ parentId }}</span>
        <span class="at ghost" v-if="isGhostParent"><i18n :k="LocalesKey.COMMENT_GHOST_USER" /></span>
        <span class="at active" v-else-if="parentComment?.author_name">@{{ parentComment.author_name }}</span>
      </button>
      <i18n zh="：" en=":" />
    </template>
  </p>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-reply-parent {
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
    margin-bottom: 0;
    font-weight: bold;
    font-size: $font-size-secondary;
    color: $color-text-disabled;

    .reply {
      margin-right: $gap-tiny;
    }

    .tombstone {
      font-style: italic;
      font-weight: normal;
      font-size: $font-size-tertiary;
      user-select: none;
    }

    .parent {
      font-weight: bold;
      color: $color-link;
      &:hover {
        color: $color-link-hover;
      }

      .at {
        margin-left: $gap-tiny;

        &.ghost {
          color: $color-text-disabled;
        }
      }
    }
  }
</style>
