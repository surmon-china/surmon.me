<template>
  <div id="comment-box" class="comment-box" :class="{ mobile: isMobile }">
    <comment-topbar
      :total="commentData.pagination.total"
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
      :comments="commentData.data"
      :pagination="commentData.pagination"
      @page="getPageComments"
    />
    <comment-publisher
      :fetching="isFetching"
      :user="userState"
      :content="penState.content"
      :preview="penState.preview"
      @to-comment="scrollToElementAnchor"
      @save-profile="syncUserState2Storage"
      @submit="submitComment"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, watch, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { isClient } from '/@/vuniversal/env'
  import { getJSON, setJSON } from '/@/services/storage'
  import { scrollTo } from '/@/utils/scroller'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { getGravatarByEmail } from '/@/transforms/thumbnail'
  import { isArticleDetail, isGuestbook } from '/@/transforms/route'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import { SortType } from '/@/constants/state'
  import { USER } from '/@/constants/storage'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import CommentTopbar from './topbar.vue'
  import CommentList from './list.vue'
  import CommentPagination from './pagination/index.vue'
  import CommentPublisher from './publisher/index.vue'

  const getGravatarUrlByEmail = (email: string) => {
    return emailRegex.test(email)
      ? getGravatarByEmail(email)
      : null
  }

  const scrollToElementAnchor = (elementId: string, offset = 0) => {
    const targetElement = document.getElementById(elementId)
    if (targetElement) {
      scrollTo(targetElement, 200, { offset })
    }
  }

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
      CommentPublisher
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
        return props.fetching || isFetchingComment.value
      })

      const state = reactive({
        sort: SortType.Desc,
        replyPid: 0
      })

      const userState = reactive({
        cached: false,
        editing: false,
        profile: {
          name: '',
          email: '',
          site: '',
          gravatar: null
        }
      })

      const penState = reactive({
        content: '',
        preview: false
      })

      const replyCommentSlef = computed(() => {
        return commentData.value.data.find(comment => comment.id === state.replyPid)
      })

      const syncUserStorage2State = () => {
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

      const setUserStorage = (profile: any) => {
        setJSON(USER, profile)
      }

      const setUserProfile = (profile: any, setStorage = false) => {
        const _profile = {
          ...profile,
          gravatar: getGravatarUrlByEmail(profile.email)
        }
        Object.assign(userState, {
          cached: true,
          editing: false,
          profile: _profile
        })
        if (setStorage) {
          setUserStorage(_profile)
        }
      }

      const syncUserState2Storage = () => {
        setUserProfile(userState.profile, true)
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

      const replyComment = (comment: any) => {
        // this.$ga.event(
        //   '欲回评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        state.replyPid = comment.id
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
        store.dispatch('comment/fetchList', {
          ...params,
          sort: state.replyPid,
          post_id: props.postId
        })
      }

      const getSortComments = (sort: SortType) => {
        if (state.replyPid !== sort) {
          state.replyPid = sort
          fetchCommentList()
        }
      }

      const getPageComments = (sort: SortType) => {
        if (state.replyPid !== sort) {
          state.replyPid = sort
          fetchCommentList()
        }
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
        try {
          const resultData = await store.dispatch('comment/fetchPostComment', {
            pid: state.replyPid,
            post_id: props.postId,
            content: penState.content,
            agent: globalState.userAgent.original,
            author: userState.profile
          })
          // clear local data
          penState.preview = false
          userState.cached = true
          // reset reply state
          resetCommentReply()
          clearPenContent()
          // set user profile
          syncUserState2Storage()
          // random emoji rain
          luanchEmojiRain(resultData.result.content)
        } catch (error) {
          console.warn('评论发布失败，可能原因：被 Akismet 过滤，或者：\n', error)
          alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_SUBMIT))
        }
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
        // 1. 组件不再负责初始加载评论列表数据的职责
        // 2. 组件仅负责初评论列表数据翻页、排序的职责
        // 3. 当容器组件还在请求时，组件全量 Loading
        // 4. 当只有评论列表在请求时，列表单独 Loading
        store.dispatch('global/fetchAppOption')
        syncUserStorage2State()
      })

      onBeforeUnmount(() => {
        resetCommentReply()
      })

      onUnmounted(() => {
        store.commit('comment/clearListData')
      })

      return {
        
      }
    }
  })
</script>

<style lang="scss" scoped>
  #comment-box {
    padding: $gap;
    background-color: $module-bg;
  }
</style>

<style lang="scss">
  .cm-content,
  .reply-preview,
  .markdown-preview {
    margin: $sm-gap 0;
    line-height: 2em;
    word-wrap: break-word;
    font-size: $font-size-h6;

    a {
      text-decoration: underline;
    }

    img {
      margin: .5rem 0;
      max-width: 100%;
      border-radius: 2px;
      cursor: pointer;
    }

    p {
      margin: 0;
    }

    code {
      color: #bd4147;
      padding: .3em .5em;
      margin: 0 .5em;
      border-radius: $radius;
      background-color: $module-hover-bg;
    }

    pre {
      $code-header-height: 2.8rem;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap-reverse;
      position: relative;
      overflow: hidden;
      margin-top: .6em;
      margin-bottom: 1em;
      padding-top: $code-header-height;
      border-radius: $radius;
      background-color: rgba(0, 0, 0, 0.8);

      &:before {
        color: $white;
        content: attr(data-lang)" CODE";
        height: $code-header-height;
        line-height: $code-header-height;
        font-size: $font-size-h6;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-weight: 700;
        background-color: rgba(68, 68, 68, 0.9);
        display: block;
        text-transform: uppercase;
        text-align: center;
      }

      > .code-lines {
        display: none;
      }

      > code {
        margin: 0;
        padding: 1rem;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        font-size: $font-size-h6;
        line-height: 1.8rem;
        color: rgba(255, 255, 255, 0.87);
        background-color: transparent;
      }
    }
  }
</style>

