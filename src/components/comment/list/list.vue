<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { Comment } from '/@/interfaces/comment'
  import { CommentTreeItem } from '/@/stores/comment'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LanguageKey } from '/@/language'
  import { CommentEvents, logger } from '../helper'
  import CommentItem from './item.vue'

  // MARK: keep this component as `defineComponent` to use for recursive component
  export default defineComponent({
    name: 'CommentList',
    components: {
      CommentItem
    },
    props: {
      comments: {
        type: Array as PropType<Array<CommentTreeItem>>,
        required: true
      },
      replyPid: {
        type: Number,
        required: true
      },
      isChildList: {
        type: Boolean,
        default: false
      },
      hiddenAvatar: {
        type: Boolean,
        default: false
      },
      hiddenUa: {
        type: Boolean,
        default: false
      },
      plainVote: {
        type: Boolean,
        default: false
      }
    },
    emits: [CommentEvents.Reply, CommentEvents.Delete, CommentEvents.CancelReply],
    setup(_, context) {
      const { i18n: _i18n, gtag } = useEnhancer()
      const { comment: commentStore, identity } = useStores()

      const buildeCommentTree = (comments: Comment[]): Array<CommentTreeItem> => {
        return comments.map((comment) => ({
          comment,
          children: []
        }))
      }

      const handleReplyComment = (commentId: number) => {
        context.emit(CommentEvents.Reply, commentId)
      }

      const handleCancelReply = (commentId: number) => {
        context.emit(CommentEvents.CancelReply, commentId)
      }

      const handleDeleteComment = async (commentId: number) => {
        context.emit(CommentEvents.Delete, commentId)
      }

      const handleVoteComment = async (commentId: number, isLike: boolean) => {
        gtag?.event('vote_comment', {
          event_category: GAEventCategories.Comment,
          event_label: isLike ? 'like' : 'dislike'
        })
        if (isLike && identity.isLikedComment(commentId)) {
          return false
        }
        if (!isLike && identity.isDislikedComment(commentId)) {
          return false
        }
        try {
          await commentStore.postCommentVote(commentId, isLike ? 1 : -1)
          isLike ? identity.likeComment(commentId) : identity.dislikeComment(commentId)
        } catch (error) {
          const message = _i18n.t(LanguageKey.POST_ACTION_ERROR)
          logger.failure(message, error)
          alert(message)
        }
      }

      return {
        identity,
        buildeCommentTree,
        handleReplyComment,
        handleCancelReply,
        handleDeleteComment,
        handleVoteComment
      }
    }
  })
</script>

<template>
  <ul class="comment-list" :class="isChildList ? 'child' : 'root'">
    <transition-group name="list-fade">
      <comment-item
        v-for="item in comments"
        :key="item.comment.id"
        :comment="item.comment"
        :liked="identity.isLikedComment(item.comment.id)"
        :disliked="identity.isDislikedComment(item.comment.id)"
        :has-child="!!item.children.length"
        :is-child="isChildList"
        :is-reply="replyPid === item.comment.id"
        :hidden-avatar="hiddenAvatar"
        :hidden-ua="hiddenUa"
        :plain-vote="plainVote"
        @vote="handleVoteComment"
        @delete="handleDeleteComment"
        @reply="handleReplyComment"
        @cancel-reply="handleCancelReply"
      >
        <template #reply>
          <slot name="reply" :comment="item.comment" :is-child="false"></slot>
        </template>
        <template #children v-if="item.children.length">
          <comment-list
            :comments="buildeCommentTree(item.children)"
            :is-child-list="true"
            :hidden-avatar="hiddenAvatar"
            :hidden-ua="hiddenUa"
            :plain-vote="plainVote"
            :reply-pid="replyPid"
            @delete="handleDeleteComment"
            @reply="handleReplyComment"
            @cancel-reply="handleCancelReply"
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .comment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;

    &.root {
    }

    &.child {
      margin-top: $gap;
    }
  }
</style>
