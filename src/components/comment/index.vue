<script lang="ts" setup>
  import {
    ref,
    reactive,
    computed,
    watch,
    toRaw,
    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    onUnmounted,
    nextTick
  } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useIdentityStore, UserType } from '/@/stores/identity'
  import { useCommentStore, CommentFetchParams } from '/@/stores/comment'
  import { GAEventCategories } from '/@/constants/gtag'
  import * as ANCHORS from '/@/constants/anchor'
  import * as URL_HASHS from '/@/constants/anchor'
  import { UNDEFINED } from '/@/constants/value'
  import { SortType } from '/@/constants/state'
  import { Author } from '/@/interfaces/comment'
  import { LanguageKey } from '/@/language'
  import { scrollToAnchor } from '/@/utils/scroller'
  import { MAX_COMMENT_LENGTH, luanchEmojiRain, logger } from './helper'
  import CommentTopbar from './topbar.vue'
  import CommentMain from './list/main.vue'
  import CommentList from './list/list.vue'
  import CommentLoadmore from './loadmore.vue'
  import CommentPublisherMain from './publisher/main.vue'
  import CommentPublisher from './publisher/publisher.vue'
  import CommentPen from './publisher/pen.vue'

  export interface Props {
    postId: number
    fetching?: boolean
    plain?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    fetching: false,
    plain: false
  })

  const { i18n, gtag, gState, route } = useEnhancer()
  const identityStore = useIdentityStore()
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
    replyPId: 0
  })

  const guestProfile = ref<Author>({
    name: '',
    email: '',
    site: ''
  })

  const rootPenState = reactive({
    content: '',
    previewed: false
  })

  const clearRootPenContent = () => {
    rootPenState.content = ''
  }
  const closeRootPenPreview = () => {
    rootPenState.previewed = false
  }

  const cancelCommentReply = () => {
    commentState.replyPId = 0
  }
  const replyComment = (commentId: number) => {
    commentState.replyPId = commentId
    gtag?.event('reply_comment', {
      event_category: GAEventCategories.Comment
    })
  }

  const fetchCommentList = (params: CommentFetchParams = {}, loadmore?: boolean) => {
    const _params = {
      ...params,
      sort: commentState.sort,
      post_id: props.postId
    }
    return commentStore.fetchList(_params, loadmore)
  }

  const fetchSortComments = (sort: SortType) => {
    if (commentState.sort !== sort) {
      commentState.sort = sort
      fetchCommentList()
      scrollToAnchor(ANCHORS.COMMENT_ELEMENT_ID)
    }
  }

  const fetchPageComments = (page: number) => {
    const comments = commentStore.comments
    const lastCommentId = ANCHORS.getCommentItemElementId(comments[comments.length - 2].id)
    fetchCommentList({ page }, true).then(() => {
      nextTick().then(() => {
        scrollToAnchor(lastCommentId)
      })
    })
  }

  const handleDeleteComment = (commentId: number) => {
    commentStore.deleteComment(commentId).catch((error) => {
      logger.failure('delete comment failed', error)
      alert(error.message)
    })
  }

  const createComment = async (payload: { content: string; pid: number }) => {
    gtag?.event('submit_comment', {
      event_category: GAEventCategories.Comment
    })

    // content length
    if (!payload.content || !payload.content.trim()) {
      throw `${i18n.t(LanguageKey.COMMENT_POST_CONTENT)} ?`
    }
    if (payload.content.length > MAX_COMMENT_LENGTH) {
      throw `${i18n.t(LanguageKey.COMMENT_POST_ERROR_CONTENT)} ?`
    }

    // temp user profile
    const isGuest = identityStore.user.type === UserType.Null
    const guestProfileValue = guestProfile.value
    if (isGuest) {
      if (!guestProfileValue.name) {
        throw i18n.t(LanguageKey.COMMENT_POST_NAME) + '?'
      }
      if (!guestProfileValue.email) {
        throw i18n.t(LanguageKey.COMMENT_POST_EMAIL) + '?'
      }
    }

    const author: Author = isGuest
      ? toRaw(guestProfileValue)
      : identityStore.user.type === UserType.Local
        ? identityStore.user.localProfile!
        : {
            name: identityStore.user.disqusProfile.name,
            site: identityStore.user.disqusProfile.url
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
        agent: gState.userAgent.original,
        author
      })
      // set user profile
      if (isGuest) {
        identityStore.saveLocalUser({
          ...author,
          email_hash: newComment.author.email_hash
        })
      }
      // random emoji rain
      luanchEmojiRain(payload.content)
    } catch (error: any) {
      logger.failure('submit comment failed:', error)
      throw error.message
    }
  }

  const validateFormById = (formId: string) => {
    const formElement = document.getElementById(formId)! as HTMLFormElement
    const check_status = formElement.checkValidity()
    formElement.reportValidity()
    return check_status ? Promise.resolve() : Promise.reject()
  }

  const handleRootSubmit = async (content: string) => {
    await validateFormById(ANCHORS.COMMENT_PUBLISHER_ELEMENT_ID)
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
    await validateFormById(ANCHORS.COMMENT_REPLY_PUBLISHER_ELEMENT_ID)
    postingKey.value = PostKey.Reply
    try {
      await createComment({ content, pid: commentState.replyPId })
      cancelCommentReply()
    } catch (error: any) {
      alert(error)
    } finally {
      postingKey.value = UNDEFINED
    }
  }

  onBeforeMount(() => {
    watch(isLoading, (loading) => {
      if (loading) {
        cancelCommentReply()
      }
    })
  })

  onBeforeUnmount(() => {
    cancelCommentReply()
  })

  onUnmounted(() => {
    commentStore.clearList()
  })

  onMounted(() => {
    const urlHash = route.hash.slice(1)
    if (urlHash.startsWith(URL_HASHS.COMMENT_ITEM_URL_HASH_PREFIX)) {
      const commentID = URL_HASHS.getCommentIdByUrlHash(urlHash)
      const elementID = ANCHORS.getCommentItemElementId(commentID)
      if (elementID && document.getElementById(elementID)) {
        setTimeout(() => scrollToAnchor(elementID), 400)
      }
    }
  })
</script>

<template>
  <div :id="ANCHORS.COMMENT_ELEMENT_ID" class="comment-box">
    <comment-topbar
      :total="commentStore.pagination?.total"
      :loaded="commentStore.comments.length"
      :post-id="postId"
      :fetching="fetching"
      :loading="isLoading"
      :plain="plain"
      :sort="commentState.sort"
      @sort="fetchSortComments"
    >
      <template #extra>
        <slot name="topbar-extra"></slot>
      </template>
    </comment-topbar>
    <divider class="divider" size="lg" />
    <comment-publisher-main :fetching="fetching">
      <comment-publisher
        v-model:profile="guestProfile"
        :id="ANCHORS.COMMENT_PUBLISHER_ELEMENT_ID"
        :disabled="isLoading || isRootPosting"
        :total="commentStore.pagination?.total"
        :default-blossomed="plain ? true : false"
        :hidden-avatar="plain"
      >
        <template #pen>
          <comment-pen
            v-model="rootPenState.content"
            v-model:previewed="rootPenState.previewed"
            :auto-focus="plain ? false : true"
            :hidden-stationery="plain"
            :disabled="isRootPosting || isLoading"
            :posting="isRootPosting"
            @submit="handleRootSubmit"
          />
        </template>
      </comment-publisher>
    </comment-publisher-main>
    <divider class="divider" size="lg" />
    <comment-main
      :fetching="isLoading"
      :skeleton-count="plain ? 3 : 5"
      :has-data="Boolean(commentStore.commentTreeList.length)"
    >
      <template #extra v-if="!!$slots['list-top-extra']">
        <slot name="list-top-extra"></slot>
        <divider class="divider" size="lg" />
      </template>
      <template #list>
        <comment-list
          :comments="commentStore.commentTreeList"
          :reply-pid="commentState.replyPId"
          :hidden-avatar="plain"
          :hidden-ua="plain"
          :plain-vote="plain"
          @delete="handleDeleteComment"
          @reply="replyComment"
          @cancel-reply="cancelCommentReply"
        >
          <template #reply="payload">
            <comment-publisher
              v-model:profile="guestProfile"
              :id="ANCHORS.COMMENT_REPLY_PUBLISHER_ELEMENT_ID"
              :disabled="false"
              :bordered="true"
              :default-blossomed="true"
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
          :remain="commentStore.pagination ? commentStore.pagination?.total - commentStore.comments.length : 0"
          @page="fetchPageComments"
        />
      </template>
    </comment-main>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .comment-box {
    padding: $gap;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .divider {
      border-color: $module-bg-darker-1 !important;
    }
  }
</style>
