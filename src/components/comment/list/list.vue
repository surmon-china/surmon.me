<template>
  <ul class="comment-list" :class="isChildList ? 'child' : 'root'" ref="listElement">
    <transition-group name="list-fade" @after-enter="addCommentAnimateDone">
      <comment-item
        v-for="item in comments"
        :key="item.comment.id"
        :comment="item.comment"
        :liked="isLikedComment(item.comment.id)"
        :disliked="isDislikedComment(item.comment.id)"
        :has-child="Boolean(item.children.length)"
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
          <slot name="reply" :comment="item.comment" :isChild="false"></slot>
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
              <slot name="reply" :comment="item.comment" :isChild="true"></slot>
            </template>
          </comment-list>
        </template>
      </comment-item>
    </transition-group>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LozadObserver } from '/@/services/lozad'
  import { useUniversalStore } from '/@/store/universal'
  import { useCommentStore, Comment, CommentTreeItem } from '/@/store/comment'
  import { LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LanguageKey } from '/@/language'
  import { CommentEvents } from '../helper'
  import CommentItem from './item.vue'

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
        required: false
      }
    },
    emits: [CommentEvents.Reply, CommentEvents.Delete, CommentEvents.CancelReply],
    setup(_, context) {
      const { i18n, gtag } = useEnhancer()
      const commentStore = useCommentStore()
      const universalStore = useUniversalStore()

      const listElement = ref<any>()
      const lozadObserver = ref<LozadObserver | null>(null)

      const observeLozad = () => {
        const lozadElements = (listElement.value as HTMLElement)?.querySelectorAll(
          `.${LOZAD_CLASS_NAME}`
        )
        if (lozadElements?.length) {
          lozadObserver.value = window.$lozad(lozadElements, {
            loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.value.observe()
        }
      }

      const addCommentAnimateDone = () => {
        observeLozad()
      }

      const handleReplyComment = (commentID: number) => {
        context.emit(CommentEvents.Reply, commentID)
      }

      const handleCancelReply = (commentID: number) => {
        context.emit(CommentEvents.CancelReply, commentID)
      }

      const handleDeleteComment = async (commentID: number) => {
        context.emit(CommentEvents.Delete, commentID)
      }

      const handleVoteComment = async (commentID: number, isLike: boolean) => {
        gtag?.event('vote_comment', {
          event_category: GAEventCategories.Comment,
          event_label: isLike ? 'like' : 'dislike'
        })
        if (isLike && universalStore.isLikedComment(commentID)) {
          return false
        }
        if (!isLike && universalStore.isDislikedComment(commentID)) {
          return false
        }
        try {
          await commentStore.postCommentVote(commentID, isLike ? 1 : -1)
          isLike ? universalStore.likeComment(commentID) : universalStore.dislikeComment(commentID)
        } catch (error) {
          const message = i18n.t(LanguageKey.POST_ACTION_ERROR)
          console.warn(message, error)
          alert(message)
        }
      }

      const buildeCommentTree = (comments: Comment[]): Array<CommentTreeItem> => {
        return comments.map((comment) => ({
          comment,
          children: []
        }))
      }

      onMounted(() => {
        observeLozad()
      })
      onBeforeUnmount(() => {
        lozadObserver.value?.observer.disconnect()
        lozadObserver.value = null
      })

      return {
        listElement,
        addCommentAnimateDone,
        isLikedComment: universalStore.isLikedComment,
        isDislikedComment: universalStore.isDislikedComment,
        handleVoteComment,
        handleDeleteComment,
        handleReplyComment,
        handleCancelReply,
        buildeCommentTree
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
