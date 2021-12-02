<template>
  <transition-group
    name="list-fade"
    tag="ul"
    ref="listElement"
    class="comment-list"
    @after-enter="addCommentAnimateDone"
  >
    <comment-item
      v-for="item in comments"
      :key="item.comment.id"
      :comment="item.comment"
      :liked="isCommentLiked(item.comment.id)"
      :is-child="isChildList"
      @like="likeComment"
      @reply="replyComment"
    >
      <template #children v-if="item.children.length">
        <comment-list
          :comments="buildeCommentTree(item.children)"
          :isChildList="true"
          @reply="replyComment"
        />
      </template>
    </comment-item>
  </transition-group>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount, PropType } from 'vue'
  import { useCommentStore, Comment, CommentTreeItem } from '/@/store/comment'
  import { useEnhancer } from '/@/app/enhancer'
  import { LozadObserver } from '/@/services/lozad'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'
  import { LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useCommentsLike } from '/@/transforms/state'
  import { CommentEvent } from '../helper'
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
      isChildList: {
        type: Boolean,
        default: false
      }
    },
    emits: [CommentEvent.Reply],
    setup(_, context) {
      const { i18n, gtag } = useEnhancer()
      const { like: likeCommentStorage, isLiked: isCommentLiked } = useCommentsLike()
      const commentStore = useCommentStore()

      const listElement = ref<any>()
      const lozadObserver = ref<LozadObserver | null>(null)

      const observeLozad = () => {
        const lozadElements = (listElement.value?.$el as HTMLElement)?.querySelectorAll(
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

      const replyComment = (commentID: number) => {
        context.emit(CommentEvent.Reply, commentID)
      }

      const likeComment = async (commentID: number) => {
        gtag?.event('欲赞评论', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Comment
        })
        if (isCommentLiked(commentID)) {
          return false
        }
        try {
          await commentStore.postCommentLike(commentID)
          likeCommentStorage(commentID)
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION)
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
        isCommentLiked,
        likeComment,
        replyComment,
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
  }
</style>
