<template>
  <div id="comment-box" class="comment-box" :class="{ mobile: isMobile }">
    <comment-topbar />
    <comment-list />
    <comment-pagination />
    <comment-publisher />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { isClient } from '/@/vuniversal/env'
  import marked from '/@/plugins/marked'
  import systemConstants from '/@/constants/system'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { getGravatarByEmail } from '/@/transforms/thumbnail'
  import { scrollTo, Easing } from '/@/services/scroller'
  import { isGuestbookRoute } from '/@/services/route-validator'
  import { getJSONStorageReader } from '/@/services/local-storage'
  import CommentUa from './ua'
  import CommentPen from './pen'

  const localUser = getJSONStorageReader(systemConstants.StorageField.User)
  const localHistoryLikes = getJSONStorageReader(systemConstants.StorageField.UserLikeHistory)
  const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/

  export default Vue.extend({
    name: 'Comment',
    components: {
      CommentUa,
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
    data() {
      return {
        lozadObserver: null,
        // 父级评论
        pid: 0,
        // 评论排序
        sortMode: -1,
        // 编辑器相关
        draftContent: '',
        previewMode: false,
        // 用户相关
        userCacheMode: false,
        userCacheEditing: false,
        user: {
          name: '',
          email: '',
          site: '',
          gravatar: null
        },
        // 用户历史数据
        historyLikes: {
          pages: [],
          comments: []
        }
      }
    },
    computed: {
      ...mapState({
        comment: state => state.comment.data,
        isFetchingComment: state => state.comment.fetching,
        isPostingComment: state => state.comment.posting,
        constants: state => state.global.constants,
        language: state => state.global.language,
        isMobile: state => state.global.isMobile,
        blacklist: state => state.global.appOption.data.blacklist
      }),
      isFetching() {
        // 1. 宿主组件还在加载时，列表和 tool 都呈加载状态
        // 2. 宿主组件加载完成，如果自己还在请求，则列表呈加载状态
        // 3. 自己已请求完，宿主组件还在加载，列表和 tool 都呈加载状态
        return this.fetching || this.isFetchingComment
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isLikedPage() {
        return this.historyLikes.pages.includes(this.postId)
      },
      isArticlePage() {
        return this.$route.params.article_id
      },
      isGuestbookPage() {
        return isGuestbookRoute(this.$route.name)
      },
      replyCommentSlef() {
        return this.comment.data.find(comment => comment.id === this.pid)
      }
    },
    methods: {
      // 初始化本地用户即本地用户的点赞历史
      initUser() {
        const user = localUser.get()
        const historyLikes = localHistoryLikes.get()
        if (user) {
          this.user = user
          this.upadteUserGravatar()
          this.userCacheMode = true
        }
        if (historyLikes) {
          this.historyLikes = historyLikes
        }
      },
      // 初始化黑名单
      initAppOptionBlackList() {
        this.$store.dispatch('global/fetchAppOption')
      },
      loadCommentsAnimateDone() {
        this.observeLozad()
      },
      addCommentAnimateDone() {
        this.observeLozad()
      },
      observeLozad() {
        const listElement = this.$refs.commentList
        const lozadElements = listElement && listElement.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        this.lozadObserver = window.lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        this.lozadObserver.observe()
      },
      handleSponsor() {
        this.$ga.event(
          '评论赞赏弹窗',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.Comment
        )
        this.isMobile
          ? window.utils.openImgPopup(getFileCDNUrl('/images/sponsor-mobile.png'))
          // sponsor 业务不使用 CDN
          : window.utils.openIframePopup('/sponsor', 'sponsor')
      },
      marked(content) {
        return marked(content, null, false)
      },
      getGravatarUrlByEmail(email) {
        return emailRegex.test(email)
          ? getGravatarByEmail(email)
          : null
      },
      humanizeGravatarUrl(gravatar) {
        return gravatar || getFileCDNUrl('/images/anonymous.jpg')
      },
      // 更新用户数据
      updateUserCache(event) {
        event.preventDefault()
        if (!this.user.name) {
          return alert(this.$i18n.text.comment.profile.name + '?')
        }
        if (!this.user.email) {
          return alert(this.$i18n.text.comment.profile.email + '?')
        }
        if (!emailRegex.test(this.user.email)) {
          return alert(this.$i18n.text.comment.profile.emailerr)
        }
        if (this.user.site && !urlRegex.test(this.user.site)) {
          return alert(this.$i18n.text.comment.profile.siteerr)
        }
        localUser.set(this.user)
        this.userCacheEditing = false
      },
      // 清空用户数据
      claerUserCache() {
        this.userCacheMode = false
        this.userCacheEditing = false
        localUser.remove()
        Object.keys(this.user).forEach(key => {
          this.user[key] = ''
        })
      },
      // 更新当前用户头像
      upadteUserGravatar() {
        this.user.gravatar = this.getGravatarUrlByEmail(this.user.email)
      },
      // 编辑器相关
      clearCommentContent(content) {
        this.draftContent = ''
      },
      handleTogglePreviewMode() {
        this.previewMode = !this.previewMode
      },
      // 评论排序
      sortComemnts(sort) {
        if (this.sortMode !== sort) {
          this.sortMode = sort
          this.loadComemntList()
        }
      },
      // 翻页反向计算
      paginationReverseActive(index) {
        const { pagination } = this.comment
        return index === pagination.total_page + 1 - pagination.current_page
      },
      // 点击用户
      clickUser(event, user) {
        if (!user.site) event.preventDefault()
      },
      // 跳转到某条指定的id位置
      toSomeAnchorById(id) {
        const targetDom = document.getElementById(id)
        if (targetDom) {
          const isToEditor = id === 'post-box'
          scrollTo(targetDom, 200, { offset: isToEditor ? 0 : -300 })
          // 如果是进入编辑模式，则需要激活光标
          if (isToEditor && this.$refs.markdownInput) {
            this.$refs.markdownInput.focusPosition()
          }
        }
      },
      // 回复评论
      replyComment(comment) {
        this.$ga.event(
          '欲回评论',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.Comment
        )
        this.pid = comment.id
        this.toSomeAnchorById('post-box')
      },
      // 取消回复
      cancelCommentReply() {
        this.pid = 0
      },
      // 找到回复来源
      findReplyParent(comment_id) {
        const parent = this.comment.data.find(comment => comment.id === comment_id)
        return parent ? parent.author.name : null
      },
      // 喜欢当前页面
      likePage() {
        if (this.isLikedPage) {
          return false
        }
        this.$ga.event(
          '喜欢当页',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.Comment
        )
        this.$store.dispatch(
          this.postId === this.constants.CommentPostType.Guestbook
            ? 'global/fetchLikeSite'
            : 'article/fetchLikeArticle',
          this.postId
        )
        .then(data => {
          this.historyLikes.pages.push(this.postId)
          localHistoryLikes.set(this.historyLikes)
        })
        .catch(err => {
          console.warn('喜欢失败', err)
          alert(this.$i18n.text.comment.profile.actionerr)
        })
      },
      // 点赞某条评论
      likeComment(comment) {
        this.$ga.event(
          '欲赞评论',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.Comment
        )
        if (this.getCommentLiked(comment.id)) {
          return false
        }
        this.$store.dispatch('comment/fetchLikeComment', comment)
          .then(_ => {
            this.historyLikes.comments.push(comment.id)
            localHistoryLikes.set(this.historyLikes)
          })
          .catch(error => {
            console.warn('评论点赞失败', error)
            alert(this.$i18n.text.comment.profile.actionerr)
          })
      },
      // 获取某条评论是否被点赞
      getCommentLiked(comment_id) {
        return this.historyLikes.comments.includes(comment_id)
      },
      // 获取评论列表
      loadComemntList(params = {}) {
        // 每次重新获取数据时都需要回到评论框顶部，因为都是新数据
        scrollTo('#comment-box', 160, {
          easing: Easing['ease-in'],
          offset: -80
        })
        this.$store.dispatch('comment/fetchList', {
          ...params,
          sort: this.sortMode,
          post_id: this.postId
        })
      },
      // 提交评论
      submitComment() {
        this.$ga.event(
          '欲发评论',
          systemConstants.GAEventActions.Click,
          systemConstants.GAEventTags.Comment
        )
        if (!this.user.name) {
          return alert(this.$i18n.text.comment.profile.name + '?')
        }
        if (!this.user.email) {
          return alert(this.$i18n.text.comment.profile.email + '?')
        }
        if (!emailRegex.test(this.user.email)) {
          return alert(this.$i18n.text.comment.profile.emailerr)
        }
        if (this.user.site && !urlRegex.test(this.user.site)) {
          return alert(this.$i18n.text.comment.profile.siteerr)
        }
        if (!this.draftContent || !this.draftContent.replace(/\s/g, '')) {
          return alert(this.$i18n.text.comment.profile.content + '?')
        }
        const lineOverflow = this.draftContent.split('\n').length > 36
        const lengthOverflow = this.draftContent.length > 2000
        if (lineOverflow || lengthOverflow) {
          return alert(this.$i18n.text.comment.profile.contenterr)
        }
        // 使用服务单配置的黑名单在本地校验邮箱和关键字
        const { mails, keywords } = this.blacklist
        if (
          mails.includes(this.user.email) ||
          (keywords.length && eval(`/${keywords.join('|')}/ig`).test(this.draftContent))
        ) {
          alert(this.$i18n.text.comment.profile.submiterr)
          console.warn('评论发布失败\n1：被 Akismet 过滤\n2：邮箱/IP 被列入黑名单\n3：内容包含黑名单关键词')
          return false
        }
        if (!this.user.site) {
          Reflect.deleteProperty(this.user, 'site')
        }
        this.$store.dispatch('comment/fetchPostComment', {
          pid: this.pid,
          post_id: this.postId,
          author: this.user,
          content: this.draftContent,
          agent: navigator.userAgent
        }).then(data => {
          // 发布成功后清空评论框内容并更新本地信息
          const content = data.result.content
          const luanchRain = window.luanchEmojiRain
          if (luanchRain) {
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
          this.previewMode = false
          this.userCacheMode = true
          this.cancelCommentReply()
          this.clearCommentContent()
          localUser.set(this.user)
        }).catch(error => {
          console.warn('评论发布失败，可能原因：被 Akismet 过滤，或者：\n', error)
          alert(this.$i18n.text.comment.profile.submiterr)
        })
      }
    },
    watch: {
      isFetching(isFetching) {
        if (isFetching) {
          this.cancelCommentReply()
        }
      }
    },
    mounted() {
      // 1. 组件不再负责初始加载评论列表数据的职责
      // 2. 组件仅负责初评论列表数据翻页、排序的职责
      // 3. 当容器组件还在请求时，组件全量 Loading
      // 4. 当只有评论列表在请求时，列表单独 Loading
      this.initAppOptionBlackList()
      if (isClient) {
        this.observeLozad()
        this.initUser()
      }
    },
    beforeDestroy() {
      this.lozadObserver = null
      this.cancelCommentReply()
    },
    destroyed() {
      this.$store.commit('comment/clearListData')
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

