<template>
  <placeholder
    :loading="fetching"
    :data="comments.length"
    @after-enter="loadCommentsAnimateDone"
  >
    <template #loading>
      <ul class="comment-list skeleton">
        <li v-for="item in (isMobile ? 3 : 5)" :key="item" class="comment-item">
          <div class="gravatar">
            <skeleton-base />
          </div>
          <div class="content">
            <skeleton-paragraph :lines="4" />
          </div>
        </li>
      </ul>
    </template>
    <template #placeholder>
      <div
        class="list-empty"
        v-i18n="LANGUAGE_KEYS.COMMENT_LIST_PLACEHOLDER"
      />
    </template>
    <template #default>
      <transition-group
        name="fade"
        tag="ul"
        ref="listElement"
        class="comment-list"
        @after-enter="addCommentAnimateDone"
      >
        <comment-item
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :liked="isCommentLiked(comment.id)"
          @like="likeComment"
          @reply="replyComment"
        />
      </transition-group>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount, PropType } from 'vue'
  import { useGlobalState } from '/@/state'
  import { getNamespace, Modules } from '/@/store'
  import { CommentModuleActions } from '/@/store/comment'
  import { isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import marked from '/@/services/marked'
  import { LozadObserver } from '/@/services/lozad'
  import { USER, USER_LIKE_HISTORY } from '/@/constants/storage'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { firstUpperCase } from '/@/transforms/text'
  import { getGravatarByEmail } from '/@/transforms/thumbnail'
  import { scrollTo, Easing } from '/@/utils/scroller'
  import storage from '/@/services/storage'
  import { LOZAD_CLASS_NAME } from '/@/services/lozad'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'
  import { useCommentsLike } from '/@/transforms/state'
  import { CommentEvent } from '../helper'
  import CommentItem from './item.vue'

  export default defineComponent({
    name: 'CommentList',
    components: {
      CommentItem,
    },
    props: {
      fetching: {
        type: Boolean,
        default: false
      },
      comments: {
        type: Array as PropType<Array<$TODO>>,
        required: true
      }
    },
    setup(props, context) {
      const { i18n, store, globalState, isMobile, isZhLang } = useEnhancer()
      const { like: likeCommentStorage, isLiked: isCommentLiked } = useCommentsLike()

      const listElement = ref<HTMLElement>()
      const lozadObserver = ref<LozadObserver | null>(null)

      const observeLozad = () => {
        const lozadElements = listElement.value?.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        lozadObserver.value = window.lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        lozadObserver.value.observe()
      }

      const loadCommentsAnimateDone = () => {
        observeLozad()
      }

      const addCommentAnimateDone = () => {
        observeLozad()
      }

      const replyComment = (commentId: number) => {
        context.emit(CommentEvent.Reply, commentId)
      }

      const likeComment = async (commentId: number) => {
        // this.$ga.event(
        //   '欲赞评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        if (isCommentLiked(commentId)) {
          return false
        }
        try {
          await store.dispatch(
            getNamespace(Modules.Comment, CommentModuleActions.PostCommentLike),
            commentId
          )
          likeCommentStorage(commentId)
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION)
          console.warn(message, error)
          alert(message)
        }
      }

      onMounted(() => observeLozad)
      onBeforeUnmount(() => {
        lozadObserver.value = null
      })

      return {
        LANGUAGE_KEYS,
        firstUpperCase,
        isMobile,
        listElement,
        loadCommentsAnimateDone,
        addCommentAnimateDone,
        isCommentLiked,
        likeComment,
        replyComment
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .comment-list.skeleton {
    .comment-item {
      padding-left: 0!important;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .gravatar {
        width: 5rem;
        height: 5rem;
      }

      .content {
        width: calc((100% - 5rem) * 0.9);
      }
    }
  }

  .list-empty {
    font-weight: bold;
    text-align: center;
    height: 6rem;
    line-height: 6rem;
  }

  .comment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
</style>
