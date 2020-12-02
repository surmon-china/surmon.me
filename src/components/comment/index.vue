<template>
  <div
    :id="ElementID.Warpper"
    :class="{ mobile: isMobile }"
    class="comment-box"
  >
    <comment-topbar
      :total="commentData.pagination?.total"
      :likes="likes"
      :post-id="postId"
      :fetching="isFetching"
      :sort="state.sort"
      @sort="getSortComments"
    />
    <comment-list
      :fetching="isFetching"
      :comments="commentData.data"
      @reply="replyComment"
    />
    <comment-pagination
      :fetching="isFetching"
      :pagination="commentData.pagination"
      :sort="state.sort"
      @page="getPageComments"
    />
    <comment-publisher
      :disabled="isPostingComment || isFetching"
      :cached="userState.cached"
      :editing="userState.editing"
      :reply-pid="state.replyPid"
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
  import { defineComponent, ref, reactive, computed, watch, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
  import { getNamespace, Modules } from '/@/store'
  import { CommentModuleActions, CommentModuleListMutations } from '/@/store/comment'
  import { useEnhancer } from '/@/enhancer'
  import { getJSON, setJSON, remove } from '/@/services/storage'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { isArticleDetail, isGuestbook } from '/@/transforms/route'
  import { focusPosition } from '/@/utils/editable'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import { GAEventTags, GAEventActions } from '/@/constants/gtag'
  import { SortType } from '/@/constants/state'
  import { USER } from '/@/constants/storage'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { ElementID, scrollToElementAnchor } from './helper'
  import CommentTopbar from './topbar.vue'
  import CommentList from './list/index.vue'
  import CommentPagination from './pagination.vue'
  import CommentPublisher from './publisher.vue'
  import CommentPen from './pen.vue'

  const luanchEmojiRain = (content: string) => {
    const luanchRain = window.$luanchEmojiRain
    if (content.includes('2333') || content.includes('哈哈')) {
      luanchRain({
        speed: 12,
        staggered: true,
        increaseSpeed: 0.4,
        emoji: getFileCDNUrl('/images/emojis/haha.png')
      })
    } else if (content.includes('666') || content.includes('赞')) {
      luanchRain({
        speed: 12,
        staggered: true,
        increaseSpeed: 0.4,
        emoji: getFileCDNUrl('/images/emojis/666.png')
      })
    } else if (content.includes('呵呵')) {
      luanchRain({
        staggered: false,
        speed: 8,
        increaseSpeed: 0.04,
        emoji: getFileCDNUrl('/images/emojis/hehe.png')
      })
    } else if (Math.random() <= 0.6) {
      // 否则以 60% 的概率随机出现
      luanchRain({
        scale: 0.6,
        staggered: true,
        speed: 8,
        increaseSpeed: 0.04,
        emoji: getFileCDNUrl('/images/emojis/funny.png')
      })
    }
  }

  export default defineComponent({
    name: 'Comment',
    components: {
      CommentTopbar,
      CommentList,
      CommentPagination,
      CommentPublisher,
      CommentPen
    },
    props: {
      fetching: {
        type: Boolean,
        default: false
      },
      likes: {
        type: Number,
        default: 0
      },
      postId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const { store, route, i18n, gtag, globalState, isMobile } = useEnhancer()
      const blockList = computed(() => store.state.option.appOption.data?.blacklist)
      const commentData = computed(() => store.state.comment.comments)
      const isFetchingComment = computed(() => store.state.comment.fetching)
      const isPostingComment = computed(() => store.state.comment.posting)
      const isArticlePage = computed(() => isArticleDetail(route.name))
      const isGuestbookPage = computed(() => isGuestbook(route.name))
      const markdownInputElement = ref<any>()

      const isFetching = computed(() => {
        // 1. 宿主组件还在加载时，列表和 tool 都呈加载状态
        // 2. 宿主组件加载完成，如果自己还在请求，则列表呈加载状态
        // 3. 自己已请求完，宿主组件还在加载，列表和 tool 都呈加载状态

        // 1. 组件不再负责初始加载评论列表数据的职责
        // 2. 组件仅负责初评论列表数据翻页、排序的职责
        // 3. 当容器组件还在请求时，组件全量 Loading
        // 4. 当只有评论列表在请求时，列表单独 Loading
        return props.fetching || isFetchingComment.value
      })

      const state = reactive({
        sort: SortType.Desc,
        replyPid: 0
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
        state.replyPid = 0
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
        state.replyPid = commentId
        // 滚动到目标位置，并激活光标
        scrollToElementAnchor(ElementID.Publisher, 300)
        if (markdownInputElement.value) {
          focusPosition(markdownInputElement.value)
        }
      }

      // 获取评论列表
      const fetchCommentList = (params: any = {}) => {
        // 每次重新获取数据时都需要回到评论框顶部，因为都是新数据
        scrollToElementAnchor(ElementID.Warpper, -73)
        store.dispatch(getNamespace(Modules.Comment, CommentModuleActions.FetchList), {
          ...params,
          sort: state.sort,
          post_id: props.postId,
          delay: 368
        })
      }

      const getSortComments = (sort: SortType) => {
        if (state.sort !== sort) {
          state.sort = sort
          fetchCommentList()
        }
      }

      const getPageComments = (page: number) => {
        fetchCommentList({ page })
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
        const hitKeyword = (
          keywords.length &&
          eval(`/${keywords.join('|')}/ig`).test(penState.content)
        )
        if (hitMail || hitKeyword) {
          alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_SUBMIT))
          console.warn('评论发布失败\n1：被 Akismet 过滤\n2：邮箱/IP 被列入黑名单\n3：内容包含黑名单关键词')
          return false
        }

        // post
        return store.dispatch(getNamespace(Modules.Comment, CommentModuleActions.PostComment), {
          pid: state.replyPid,
          post_id: props.postId,
          content: penState.content,
          agent: globalState.userAgent.original,
          author: profile
        }).then(resultData => {
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
          luanchEmojiRain(resultData.result.content)
        }).catch(error => {
          console.warn('评论发布失败，可能原因：被 Akismet 过滤，或者：\n', error)
          alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_SUBMIT))
        })
      }

      watch(
        () => isFetching.value,
        isFetching => {
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
        store.commit(getNamespace(
          Modules.Comment,
          CommentModuleListMutations.ClearListData
        ))
      })

      return {
        ElementID,
        isMobile,
        isFetching,
        isPostingComment,
        state,
        userState,
        profileState,
        penState,
        editUserProfile,
        syncUserProfileToStorage,
        clearUserProfile,
        togglePenPreview,
        commentData,
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
  @import 'src/assets/styles/init.scss';

  .comment-box {
    padding: $gap;
    @include common-bg-module();
    @include radius-box($lg-radius);
  }
</style>
