<template>
  <placeholder
    :loading="isFetching"
    :data="comment.data.length"
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
          v-for="comment in comment.data"
          :key="comment.id"
          :comment="comment"
          :liked="comment"
          @to-comment="scrollToComment"
          @like="likeComment"
          @reply="replyComment"
        />
      </transition-group>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount, onUnmounted, PropType } from 'vue'
  import { mapState } from 'vuex'
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
  import { useGlobalState } from '/@/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'
  import { getCommentsLike } from '/@/transforms/state'
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
        type: Array as PropType<Array<$TODO>>
      }
    },
    setup(props, context) {
      const { i18n, store, globalState, isMobile, isZhLang } = useEnhancer()

      const listElement = ref<HTMLElement>()
      let lozadObserver = ref<LozadObserver | null>(null)
      let commentsLike: number[] = []
      // init likes
      if (isClient) {
        commentsLike = getCommentsLike()
      }

      const observeLozad = () => {
        const lozadElements = listElement.value?.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        lozadObserver = window.lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        lozadObserver.observe()
      }

      const loadCommentsAnimateDone = () => {
        observeLozad()
      }

      const addCommentAnimateDone = () => {
        observeLozad()
      }

      // 跳转到某条指定的id位置
      const scrollToComment = (commentId: number) => {
        const targetDom = document.getElementById(id)
        if (targetDom) {
          const isToEditor = id === 'post-box'
          scrollTo(targetDom, 200, { offset: isToEditor ? 0 : -300 })
          // 如果是进入编辑模式，则需要激活光标
          if (isToEditor && this.$refs.markdownInput) {
            this.$refs.markdownInput.focusPosition()
          }
        }
      }

      // 回复评论
      const replyComment = (comment) => {
        // this.$ga.event(
        //   '欲回评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        // this.pid = comment.id
        // this.scrollToComment('post-box')
      }
 
      // 点赞某条评论
      const likeComment = (comment) => {
        // this.$ga.event(
        //   '欲赞评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        // if (this.getCommentLiked(comment.id)) {
        //   return false
        // }
        // this.$store.dispatch('comment/fetchLikeComment', comment)
        //   .then(_ => {
        //     this.historyLikes.comments.push(comment.id)
        //     localHistoryLikes.set(this.historyLikes)
        //   })
        //   .catch(error => {
        //     console.warn('评论点赞失败', error)
        //     alert(this.$i18n.text.comment.profile.actionerr)
        //   })
      }

      // 获取某条评论是否被点赞
      const getCommentLiked = (comment_id) => {
        return this.historyLikes.comments.includes(comment_id)
      }

      onMounted(() => {
        observeLozad()
      })

      onBeforeUnmount(() => {
        lozadObserver = null
      })

      return {
        LANGUAGE_KEYS,
        firstUpperCase,
        listElement
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
