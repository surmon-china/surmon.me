<template>
  <div :id="ANCHOR.COMMENT_ELEMENT_ID" class="comment-box">
    <comment-topbar
      :total="commentStore.pagination?.total"
      :loaded="commentStore.comments.length"
      :post-id="postId"
      :fetching="fetching"
      :loading="isLoading"
      :plain="plain"
      :sort="commentState.sort"
      @sort="fetchSortComments"
    />
    <divider class="divider" size="lg" />
    <comment-publisher
      :id="ANCHOR.COMMENT_PUBLISHER_ELEMENT_ID"
      :disabled="isLoading || isRootPosting"
      :total="commentStore.pagination?.total"
      :responsive="!plain"
      :fetching="fetching"
      :profile="guestProfile"
      :hidden-avatar="plain"
    >
      <template #pen>
        <comment-pen
          v-model="rootPenState.content"
          v-model:preview="rootPenState.preview"
          :auto-focus="!plain"
          :hidden-stationery="plain"
          :disabled="isRootPosting || isLoading"
          :posting="isRootPosting"
          @submit="handleRootSubmit"
        />
      </template>
    </comment-publisher>
    <divider class="divider" size="lg" />
    <comment-main
      :fetching="isLoading"
      :skeleton-count="plain ? 3 : 5"
      :has-data="Boolean(commentStore.commentTreeList.length)"
    >
      <template #list>
        <comment-list
          :comments="commentStore.commentTreeList"
          :reply-pid="commentState.replyPID"
          :hidden-avatar="plain"
          :hidden-ua="plain"
          @delete="handleDeleteComment"
          @reply="replyComment"
          @cancel-reply="cancelCommentReply"
        >
          <template #reply="payload">
            <comment-publisher
              :disabled="false"
              :profile="guestProfile"
              :bordered="true"
              :hidden-avatar="plain"
              :fixed-avatar="payload.isChild"
            >
              <template #pen>
                <comment-pen
                  :posting="isReplyPosting"
                  :bordered="true"
                  :auto-focus="true"
                  :hidden-stationery="plain"
                  @submit="handleReplySubmit"
                />
              </template>
            </comment-publisher>
          </template>
        </comment-list>
      </template>
      <template #pagination>
        <comment-loadmore
          :fetching="isFetching"
          :pagination="commentStore.pagination"
          :remain="commentStore.pagination?.total - commentStore.comments.length"
          @page="fetchPageComments"
        />
      </template>
    </comment-main>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    computed,
    watch,
    toRaw,
    onBeforeUnmount,
    onUnmounted,
    nextTick
  } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalStore, UserType } from '/@/store/universal'
  import { useCommentStore, CommentFetchParams, Author } from '/@/store/comment'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import * as ANCHOR from '/@/constants/anchor'
  import { UNDEFINED } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { SortType } from '/@/constants/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { scrollToElementAnchor } from '/@/utils/scroller'
  import { luanchEmojiRain } from './helper'
  import CommentTopbar from './topbar.vue'
  import CommentMain from './main.vue'
  import CommentList from './list/index.vue'
  import CommentLoadmore from './loadmore.vue'
  import CommentPublisher from './publisher.vue'
  import CommentPen from './pen.vue'

  export default defineComponent({
    name: 'Dsiqus',
    components: {
      CommentTopbar,
      CommentMain,
      CommentList,
      CommentLoadmore,
      CommentPublisher,
      CommentPen
    },
    props: {
      postId: {
        type: Number,
        required: true
      },
      fetching: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { i18n, gtag, globalState } = useEnhancer()
      const universalStore = useUniversalStore()
      const commentStore = useCommentStore()

      const isPosting = computed(() => commentStore.posting)
      const isFetching = computed(() => commentStore.fetching)
      const isLoading = computed(() => {
        return props.fetching || (!commentStore.comments.length && commentStore.fetching)
      })

      enum PostKey {
        Root = 'root',
        Reply = 'reply'
      }
      const postingKey = ref<PostKey>()
      const isRootPosting = computed(() => isPosting.value && postingKey.value === PostKey.Root)
      const isReplyPosting = computed(() => isPosting.value && postingKey.value === PostKey.Reply)

      const commentState = reactive({
        sort: SortType.Desc,
        replyPID: 0
      })

      const guestProfile = reactive<Author>({
        name: '',
        email: '',
        site: ''
      })

      const rootPenState = reactive({
        content: '',
        preview: false
      })

      const clearRootPenContent = () => {
        rootPenState.content = ''
      }
      const closeRootPenPreview = () => {
        rootPenState.preview = false
      }

      const cancelCommentReply = () => {
        commentState.replyPID = 0
      }
      const replyComment = (commentID: number) => {
        gtag?.event('reply_comment', {
          event_category: GAEventCategories.Comment
        })

        commentState.replyPID = commentID
      }

      const fetchCommentList = (params: CommentFetchParams = {}) => {
        return commentStore.fetchList({
          ...params,
          sort: commentState.sort,
          post_id: props.postId
        })
      }

      const fetchSortComments = (sort: SortType) => {
        if (commentState.sort !== sort) {
          commentState.sort = sort
          fetchCommentList()
          scrollToElementAnchor(ANCHOR.COMMENT_ELEMENT_ID)
        }
      }

      const fetchPageComments = (page: number) => {
        const comments = commentStore.comments
        const lastCommentID = ANCHOR.getCommentItemElementID(comments[comments.length - 2].id)
        fetchCommentList({ page, loadmore: true }).then(() => {
          nextTick().then(() => {
            scrollToElementAnchor(lastCommentID, null, 500)
          })
        })
      }

      const handleDeleteComment = (commentID: number) => {
        commentStore.deleteComment(commentID).catch((error) => {
          console.warn('delete comment failed', error)
          alert(error.message)
        })
      }

      const createComment = async (payload: { content: string; pid: number }) => {
        gtag?.event('submit_comment', {
          event_category: GAEventCategories.Comment
        })

        // content length
        if (!payload.content || !payload.content.trim()) {
          throw `${i18n.t(LANGUAGE_KEYS.COMMENT_POST_CONTENT)} ?`
        }
        if (payload.content.length > 3000) {
          throw `${i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_CONTENT)} ?`
        }

        // temp user profile
        const isGuest = universalStore.user.type === UserType.Null
        if (isGuest) {
          if (!guestProfile.name) {
            throw i18n.t(LANGUAGE_KEYS.COMMENT_POST_NAME) + '?'
          }
          if (!guestProfile.email) {
            throw i18n.t(LANGUAGE_KEYS.COMMENT_POST_EMAIL) + '?'
          }
          if (!emailRegex.test(guestProfile.email)) {
            throw i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_EMAIL)
          }
          if (guestProfile.site && !urlRegex.test(guestProfile.site)) {
            throw i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_URL)
          }
        }

        const author: Author = isGuest
          ? toRaw(guestProfile)
          : universalStore.user.type === UserType.Local
          ? universalStore.user.localProfile!
          : {
              name: universalStore.user.disqusProfile.name,
              site: universalStore.user.disqusProfile.url
            }
        if (!author.email) {
          Reflect.deleteProperty(author, 'email')
        }
        if (!author.site) {
          Reflect.deleteProperty(author, 'site')
        }

        try {
          const newComment = await commentStore.postComment({
            pid: payload.pid,
            post_id: props.postId,
            content: payload.content,
            agent: globalState.userAgent.original,
            author
          })
          // set user profile
          if (isGuest) {
            universalStore.saveLocalUser({
              ...author,
              email_hash: newComment.author.email_hash
            })
          }
          // random emoji rain
          luanchEmojiRain(payload.content)
        } catch (error: any) {
          console.warn('submit comment failed:', error)
          throw error.message
        }
      }

      const handleRootSubmit = async (content: string) => {
        postingKey.value = PostKey.Root
        try {
          await createComment({ content, pid: 0 })
          closeRootPenPreview()
          clearRootPenContent()
        } catch (error: any) {
          alert(error)
        } finally {
          postingKey.value = UNDEFINED
        }
      }

      const handleReplySubmit = async (content: string) => {
        postingKey.value = PostKey.Reply
        try {
          await createComment({ content, pid: commentState.replyPID })
          cancelCommentReply()
        } catch (error: any) {
          alert(error)
        } finally {
          postingKey.value = UNDEFINED
        }
      }

      watch(isLoading, (isFetching) => {
        if (isFetching) {
          cancelCommentReply()
        }
      })

      onBeforeUnmount(() => {
        cancelCommentReply()
      })
      onUnmounted(() => {
        commentStore.clearList()
      })

      return {
        ANCHOR,
        isFetching,
        isLoading,
        isPosting,
        isRootPosting,
        isReplyPosting,
        commentStore,
        commentState,
        rootPenState,
        guestProfile,
        replyComment,
        handleDeleteComment,
        handleRootSubmit,
        handleReplySubmit,
        cancelCommentReply,
        fetchSortComments,
        fetchPageComments
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .comment-box {
    padding: $gap;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .divider {
      border-color: $module-bg-darker-1 !important;
    }
  }
</style>
