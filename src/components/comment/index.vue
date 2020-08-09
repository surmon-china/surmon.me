<template>
  <div
    id="comment-box"
    class="comment-box"
    :class="{ mobile: isMobile }"
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
      v-model:profile="userState.profile"
      :cached="userState.cached"
      :editing="userState.editing"
      :reply-pid="state.replyPid"
      @cancel-reply="resetCommentReply"
      @edit-profile="editUserProfile"
      @save-profile="syncUserProfileToStorage"
      @clear-profile="clearUserProfile"
    >
      <template #pen>
        <comment-pen
          ref="markdownInput"
          v-model="penState.content"
          :preview="penState.preview"
          :disabled="isPostingComment || isFetching"
          :posting="isPostingComment"
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
  import { getJSON, setJSON } from '/@/services/storage'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { getGravatarByEmail } from '/@/transforms/thumbnail'
  import { isArticleDetail, isGuestbook } from '/@/transforms/route'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import { SortType } from '/@/constants/state'
  import { USER } from '/@/constants/storage'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getGravatarUrlByEmail, scrollToElementAnchor } from './helper'
  import CommentTopbar from './topbar.vue'
  import CommentList from './list/index.vue'
  import CommentPagination from './pagination.vue'
  import CommentPublisher from './publisher.vue'
  import CommentPen from './pen.vue'

  const luanchEmojiRain = (content: string) => {
    const luanchRain = window.luanchEmojiRain
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
      const { store, route, i18n, globalState, isMobile } = useEnhancer()
      const blockList = computed(() => store.state.option.appOption.data?.blacklist)
      const commentData = computed(() => store.state.comment.comments)
      const isFetchingComment = computed(() => store.state.comment.fetching)
      const isPostingComment = computed(() => store.state.comment.posting)
      const isArticlePage = computed(() => isArticleDetail(route.name))
      const isGuestbookPage = computed(() => isGuestbook(route.name))

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

      const initUserState = {
        cached: false,
        editing: false,
        profile: {
          name: '',
          email: '',
          site: '',
          gravatar: null
        }
      }
      // TODO: profile 也许需要独立才可以双向绑定
      const userState = reactive({ ...initUserState })

      const penState = reactive({
        content: '2389u12389u1293',
        preview: false
      })

      const syncUserStorageToState = () => {
        const user = getJSON(USER)
        if (user) {
          Object.assign(userState, {
            cached: true,
            profile: {
              ...user,
              gravatar: getGravatarUrlByEmail(user.email)
            }
          })
        }
      }

      const syncUserProfileToStorage = () => {
        const _profile = {
          ...userState.profile,
          gravatar: getGravatarUrlByEmail(userState.profile.email)
        }
        Object.assign(userState, {
          cached: true,
          editing: false,
          profile: _profile
        })
        setJSON(USER, userState.profile)
      }

      const clearUserProfile = () => {
        Object.assign(userState, { ...initUserState })
        setJSON(USER, userState.profile)
      }

      const editUserProfile = () => {
        userState.editing = true
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
        // this.$ga.event(
        //   '欲回评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        state.replyPid = commentId
        scrollToElementAnchor('post-box', -300)
        // 激活光标
        // if (this.$refs.markdownInput) {
        //   this.$refs.markdownInput.focusPosition()
        // }
      }

      // 获取评论列表
      const fetchCommentList = (params: any = {}) => {
        // 每次重新获取数据时都需要回到评论框顶部，因为都是新数据
        // scrollTo('#comment-box', 160, {
        //   easing: Easing['ease-in'],
        //   offset: -80
        // })
        store.dispatch(getNamespace(Modules.Comment, CommentModuleActions.FetchList), {
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
        fetchCommentList({ page })
      }

      const submitComment = async () => {
        // this.$ga.event(
        //   '欲发评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        if (!userState.profile.name) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_NAME) + '?')
        }
        if (!userState.profile.email) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_EMAIL) + '?')
        }
        if (!emailRegex.test(userState.profile.email)) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_EMAIL))
        }
        if (userState.profile.site && !urlRegex.test(userState.profile.site)) {
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
        const hitMail = mails.includes(userState.profile.email)
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
          author: userState.profile
        }).then(resultData => {
          // clear local data
          penState.preview = false
          userState.cached = true
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
        isMobile,
        isFetching,
        isPostingComment,
        state,
        userState,
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
        getPageComments
      }
    }
  })
</script>

<style lang="scss" src="./markdown.scss"></style>
<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #comment-box {
    padding: $gap;
    @include common-bg-module();
    @include radius-box($lg-radius);
  }
</style>
