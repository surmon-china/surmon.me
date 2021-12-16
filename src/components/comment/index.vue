<template>
  <div :id="COMMENT_ELEMENT_ID" class="comment-box">
    <comment-topbar
      :total="commentStore.pagination?.total"
      :likes="likes"
      :post-id="postId"
      :fetching="isFetching"
      :sort="state.sort"
      :mini-likes="plain"
      :hidden-sponsor="plain"
      @sort="getSortComments"
    />
    <comment-main
      :fetching="isFetching"
      :skeleton-count="plain ? 3 : 5"
      :has-data="Boolean(commentStore.commentTreeList.length)"
    >
      <template #list>
        <comment-list
          :comments="commentStore.commentTreeList"
          :hidden-gravatar="plain"
          :hidden-ua="plain"
          @reply="replyComment"
        />
      </template>
      <template #pagination>
        <comment-loadmore
          :fetching="isFetching"
          :pagination="commentStore.pagination"
          @page="getPageComments"
        />
      </template>
    </comment-main>
    <comment-publisher
      :disabled="isPostingComment || isFetching"
      :cached="userState.cached"
      :editing="userState.editing"
      :reply-pid="state.replyPID"
      :hidden-gravatar="plain"
      v-model:profile="profileState"
      @cancel-reply="resetCommentReply"
      @edit-profile="editUserProfile"
      @save-profile="syncUserProfileToStorage"
      @clear-profile="clearUserProfile"
    >
      <template #pen>
        <comment-pen
          v-model="penState.content"
          :preview="penState.preview"
          :disabled="isPostingComment || isFetching"
          :posting="isPostingComment"
          @input-ready="handleMarkdownInputReady"
          @toggle-preview="togglePenPreview"
          @submit="submitComment"
        />
      </template>
    </comment-publisher>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    onUnmounted
  } from 'vue'
  import { useMetaStore } from '/@/store/meta'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCommentStore, CommentFetchParams } from '/@/store/comment'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import { COMMENT_ELEMENT_ID, COMMENT_PUBLISHER_ELEMENT_ID } from '/@/constants/anchor'
  import { GAEventTags, GAEventActions } from '/@/constants/gtag'
  import { SortType } from '/@/constants/state'
  import { USER } from '/@/constants/storage'
  import { getJSON, setJSON, remove } from '/@/services/storage'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { focusPosition } from '/@/utils/editable'
  import { scrollToElementAnchor } from '/@/utils/scroller'
  import { luanchEmojiRain } from './helper'
  import CommentTopbar from './topbar.vue'
  import CommentMain from './main.vue'
  import CommentList from './list/index.vue'
  import CommentLoadmore from './loadmore.vue'
  import CommentPublisher from './publisher.vue'
  import CommentPen from './pen.vue'

  export default defineComponent({
    name: 'Comment',
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
      likes: {
        type: Number,
        default: 0
      },
      plain: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { i18n, gtag, globalState } = useEnhancer()
      const metaStore = useMetaStore()
      const commentStore = useCommentStore()
      const blockList = computed(() => metaStore.appOptions.data?.blacklist)
      const isPostingComment = computed(() => commentStore.posting)
      const markdownInputElement = ref<any>()

      const isFetching = computed(() => {
        // 1. 宿主组件还在加载时，列表和 tool 都呈加载状态
        // 2. 宿主组件加载完成，如果自己还在请求，则列表呈加载状态
        // 3. 自己已请求完，宿主组件还在加载，列表和 tool 都呈加载状态

        // 1. 组件不再负责初始加载评论列表数据的职责
        // 2. 组件仅负责初评论列表数据翻页、排序的职责
        // 3. 当容器组件还在请求时，组件全量 Loading
        // 4. 当只有评论列表在请求时，列表单独 Loading
        return props.fetching || commentStore.fetching
      })

      const state = reactive({
        sort: SortType.Desc,
        replyPID: 0
      })
      const userState = reactive({
        cached: false,
        editing: false
      })
      const baseProfile = {
        name: '',
        email: '',
        site: ''
      }
      const profileState = ref(baseProfile)
      const penState = reactive({
        content: '',
        preview: false
      })

      const syncUserStorageToState = () => {
        const user = getJSON(USER)
        if (user) {
          userState.cached = true
          userState.editing = false
          profileState.value = user
        }
      }

      const syncUserProfileToStorage = () => {
        userState.cached = true
        userState.editing = false
        setJSON(USER, profileState.value)
      }

      const clearUserProfile = () => {
        userState.cached = false
        userState.editing = false
        profileState.value = { ...baseProfile }
        remove(USER)
      }

      const editUserProfile = () => {
        userState.editing = true
      }

      const handleMarkdownInputReady = (markdownElement: HTMLElement) => {
        markdownInputElement.value = markdownElement
      }

      const resetCommentReply = () => {
        state.replyPID = 0
      }

      const clearPenContent = () => {
        penState.content = ''
      }

      const togglePenPreview = () => {
        penState.preview = !penState.preview
      }

      const replyComment = (commentId: number) => {
        gtag?.event('欲回评论', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Comment
        })
        state.replyPID = commentId
        // 滚动到目标位置，并激活光标
        scrollToElementAnchor(COMMENT_PUBLISHER_ELEMENT_ID, 300)
        if (markdownInputElement.value) {
          focusPosition(markdownInputElement.value)
        }
      }

      // 获取评论列表
      const fetchCommentList = (params: CommentFetchParams = {}) => {
        // 每次重新获取数据时都需要回到评论框顶部，因为都是新数据
        scrollToElementAnchor(COMMENT_ELEMENT_ID, -73)
        commentStore.fetchList({
          ...params,
          sort: state.sort,
          post_id: props.postId
        })
      }

      const getSortComments = (sort: SortType) => {
        if (state.sort !== sort) {
          state.sort = sort
          fetchCommentList()
        }
      }

      const getPageComments = (page: number) => {
        fetchCommentList({ page, loadmore: true })
      }

      const submitComment = async () => {
        gtag?.event('欲发评论', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Comment
        })
        const profile = profileState.value
        if (!profile.name) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_NAME) + '?')
        }
        if (!profile.email) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_EMAIL) + '?')
        }
        if (!emailRegex.test(profile.email)) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_EMAIL))
        }
        if (profile.site && !urlRegex.test(profile.site)) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_URL))
        }
        if (!penState.content || !penState.content.trim()) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_CONTENT) + '?')
        }

        // content length
        const lineOverflow = penState.content.split('\n').length > 36
        const lengthOverflow = penState.content.length > 2000
        if (lineOverflow || lengthOverflow) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_CONTENT))
        }

        // block list
        const { mails, keywords } = blockList.value
        const hitMail = mails.includes(profile.email)
        const hitKeyword =
          keywords.length && eval(`/${keywords.join('|')}/ig`).test(penState.content)
        if (hitMail || hitKeyword) {
          alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_SUBMIT))
          console.warn(
            '评论发布失败\n1：被 Akismet 过滤\n2：邮箱/IP 被列入黑名单\n3：内容包含黑名单关键词'
          )
          return false
        }

        // post
        return commentStore
          .postComment({
            pid: state.replyPID,
            post_id: props.postId,
            content: penState.content,
            agent: globalState.userAgent.original,
            author: profile
          })
          .then(() => {
            // clear local data
            penState.preview = false
            userState.cached = true
            userState.editing = false
            // reset reply state
            resetCommentReply()
            clearPenContent()
            // set user profile
            syncUserProfileToStorage()
            // random emoji rain
            luanchEmojiRain(penState.content)
          })
          .catch((error) => {
            console.warn('评论发布失败，可能原因：被 Akismet 过滤，或者：\n', error)
            alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_SUBMIT))
          })
      }

      watch(
        () => isFetching.value,
        (isFetching) => {
          if (isFetching) {
            resetCommentReply()
          }
        }
      )

      onMounted(() => {
        syncUserStorageToState()
      })

      onBeforeUnmount(() => {
        resetCommentReply()
      })

      onUnmounted(() => {
        commentStore.clearList()
      })

      return {
        COMMENT_ELEMENT_ID,
        isFetching,
        isPostingComment,
        commentStore,
        state,
        userState,
        profileState,
        penState,
        editUserProfile,
        syncUserProfileToStorage,
        clearUserProfile,
        togglePenPreview,
        replyComment,
        submitComment,
        resetCommentReply,
        getSortComments,
        getPageComments,
        handleMarkdownInputReady
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
  }
</style>
