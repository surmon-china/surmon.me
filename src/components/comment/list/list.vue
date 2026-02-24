<script lang="ts" setup>
  import { CommentTreeItem } from '/@/stores/comment'
  import CommentItem from './item.vue'

  defineOptions({
    name: 'CommentList'
  })

  const props = defineProps<{
    level: 'root' | 'child'
    comments: CommentTreeItem[]
    replyingParentId: number | null
    hiddenReply: boolean
    hiddenAvatar: boolean
    hiddenUserAgent: boolean
  }>()

  const emit = defineEmits<{
    (e: 'like', commentId: number): void
    (e: 'dislike', commentId: number): void
    (e: 'delete', commentId: number): void
    (e: 'reply', commentId: number): void
    (e: 'cancel-reply', commentId: number): void
  }>()
</script>

<template>
  <ul class="comment-list" :class="level">
    <transition-group name="list">
      <comment-item
        v-for="item in comments"
        :key="item.comment.id"
        :comment="item.comment"
        :is-replying="replyingParentId === item.comment.id"
        :is-in-child-list="level === 'child'"
        :has-children="!!item.children.length"
        :hidden-reply="hiddenReply"
        :hidden-avatar="hiddenAvatar"
        :hidden-user-agent="hiddenUserAgent"
        @like="emit('like', $event)"
        @dislike="emit('dislike', $event)"
        @delete="emit('delete', $event)"
        @reply="emit('reply', $event)"
        @cancel-reply="emit('cancel-reply', $event)"
      >
        <template #reply>
          <slot name="reply" :comment="item.comment" :is-child="false"></slot>
        </template>
        <template #children v-if="item.children.length">
          <comment-list
            level="child"
            :comments="item.children"
            :replying-parent-id="replyingParentId"
            :hidden-reply="hiddenReply"
            :hidden-avatar="hiddenAvatar"
            :hidden-user-agent="hiddenUserAgent"
            @like="emit('like', $event)"
            @dislike="emit('dislike', $event)"
            @delete="emit('delete', $event)"
            @reply="emit('reply', $event)"
            @cancel-reply="emit('cancel-reply', $event)"
          >
            <template #reply>
              <slot name="reply" :comment="item.comment" :is-child="true"></slot>
            </template>
          </comment-list>
        </template>
      </comment-item>
    </transition-group>
  </ul>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;

    &.root {
    }

    &.child {
      margin-top: $gap-sm;
    }
  }
</style>
