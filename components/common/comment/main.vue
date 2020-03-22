<template>
  <div id="comment-box" class="comment-box" :class="{ mobile: isMobile }">
    <transition name="module" mode="out-in">
      <div v-if="fetching" key="skeleton" class="tools">
        <div class="total-skeleton">
          <skeleton-line class="count-skeleton" />
          <skeleton-line class="like-skeleton" />
        </div>
        <div class="sort-skeleton">
          <skeleton-line />
        </div>
      </div>
      <div v-else key="tools" class="tools">
        <div class="total">
          <div class="count">
            <strong class="count">{{ comment.pagination.total || 0 }}</strong>
            <span>{{ $i18n.text.comment.count }}</span>
          </div>
          <a href class="like" :class="{ liked: isLikedPage }" @click.stop.prevent="likePage">
            <i class="iconfont icon-like" />
            <strong>{{ likes || 0 }}</strong>
            <span>{{ (isMobile && !isEnLang) ? '赞' : $i18n.text.comment.like }}</span>
          </a>
          <a href class="sponsor" @click.stop.prevent="handleSponsor">
            <i class="iconfont icon-hao" />
          </a>
        </div>
        <div class="sort">
          <a
            href
            class="sort-btn"
            :class="{ actived: sortMode === constants.SortType.Desc }"
            @click.stop.prevent="sortComemnts(constants.SortType.Desc)"
          >{{ $i18n.text.comment.new }}</a>
          <a
            href
            class="sort-btn"
            :class="{ actived: sortMode === constants.SortType.Hot }"
            @click.stop.prevent="sortComemnts(constants.SortType.Hot)"
          >{{ $i18n.text.comment.hot }}</a>
        </div>
      </div>
    </transition>
    <transition name="module" mode="out-in" @after-enter="loadCommentsAnimateDone">
      <div v-if="isFetching" key="skeleton" class="list-box list-skeleton">
        <ul class="comment-list">
          <li v-for="item in (isMobile ? 3 : 5)" :key="item" class="comment-item">
            <div class="gravatar">
              <skeleton-base />
            </div>
            <div class="content">
              <skeleton-paragraph :lines="4" />
            </div>
          </li>
        </ul>
      </div>
      <div
        v-else-if="!comment.data.length"
        key="empty"
        class="empty-box"
        v-text="$i18n.text.comment.empty"
      />
      <div v-else key="list" ref="commentList" class="list-box">
        <transition-group name="fade" tag="ul" class="comment-list" @after-enter="addCommentAnimateDone">
          <li
            v-for="comment in comment.data"
            :id="`comment-item-${comment.id}`"
            :key="comment.id"
            class="comment-item"
          >
            <div v-if="!isMobile" class="cm-avatar">
              <a
                target="_blank"
                rel="external nofollow noopener"
                :href="comment.author.site"
                @click.stop="clickUser($event, comment.author)"
              >
                <img
                  :alt="comment.author.name || $i18n.text.comment.anonymous"
                  :src="humanizeGravatarUrl(getGravatarUrlByEmail(comment.author.email))"
                  draggable="false"
                >
              </a>
            </div>
            <div class="cm-body">
              <div class="cm-header">
                <a
                  class="user-name"
                  target="_blank"
                  rel="external nofollow noopener"
                  :href="comment.author.site"
                  @click.stop="clickUser($event, comment.author)"
                >
                  {{ comment.author.name | firstUpperCase }}
                </a>
                <comment-ua v-if="comment.agent" :ua="comment.agent" />
                <span v-if="comment.ip_location && !isMobile" class="location">
                  <span>{{ comment.ip_location.country }}</span>
                  <span v-if="comment.ip_location.country && comment.ip_location.city">&nbsp;-&nbsp;</span>
                  <span>{{ comment.ip_location.city }}</span>
                </span>
                <span class="flool">#{{ comment.id }}</span>
              </div>
              <div class="cm-content">
                <p v-if="!!comment.pid" class="reply">
                  <span v-text="$i18n.text.comment.reply">回复</span>
                  <span>&nbsp;</span>
                  <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.pid}`)">
                    <span>#{{ comment.pid }}&nbsp;</span>
                    <strong v-if="findReplyParent(comment.pid)">@{{ findReplyParent(comment.pid) }}</strong>
                  </a>
                  <span>：</span>
                </p>
                <div v-html="marked(comment.content)"></div>
              </div>
              <div class="cm-footer">
                <span class="create_at">{{ comment.create_at | timeAgo(language) }}</span>
                <a href class="reply" @click.stop.prevent="replyComment(comment)">
                  <i class="iconfont icon-reply" />
                  <span v-text="$i18n.text.comment.reply">回复</span>
                </a>
                <a
                  href
                  class="like"
                  :class="{
                    liked: getCommentLiked(comment.id),
                    actived: !!comment.likes
                  }"
                  @click.stop.prevent="likeComment(comment)"
                >
                  <i class="iconfont icon-zan" />
                  <span>{{ $i18n.text.comment.ding }} ({{ comment.likes }})</span>
                </a>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
    <transition name="module">
      <div v-if="!isFetching && comment.pagination.total_page > 1" class="pagination-box">
        <ul v-if="sortMode === constants.SortType.Hot" class="pagination-list">
          <li v-for="(item, index) in comment.pagination.total_page" :key="index" class="item">
            <a
              href
              class="pagination-btn"
              :class="{ 'actived disabled': item === comment.pagination.current_page }"
              @click.stop.prevent="item === comment.pagination.current_page
                ? false 
                : loadComemntList({ page: item })"
            >{{ item }}</a>
          </li>
        </ul>
        <ul v-else class="pagination-list">
          <li class="item">
            <a href class="pagination-btn prev disabled" @click.stop.prevent>
              <span>—</span>
              <span v-text="$i18n.text.comment.pagenation.old" />
            </a>
          </li>
          <li v-for="(item, index) in comment.pagination.total_page" :key="index" class="item">
            <a
              href
              class="pagination-btn"
              :class="{ 'actived disabled': paginationReverseActive(item) }"
              @click.stop.prevent="paginationReverseActive(item)
                ? false 
                : loadComemntList({ page: comment.pagination.total_page + 1 - item })"
            >{{ item }}</a>
          </li>
          <li class="item">
            <a href class="pagination-btn next disabled" @click.stop.prevent>
              <span v-text="$i18n.text.comment.pagenation.new" />
              <span>—</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <form id="post-box" class="post-box" name="comment">
      <!-- 用户编辑部分 -->
      <transition name="module" mode="out-in">
        <div v-if="!userCacheMode || userCacheEditing" key="edit" class="user">
          <div class="name">
            <input
              v-model="user.name"
              required
              type="text"
              name="name"
              autocomplete="on"
              :class="language"
              :placeholder="$i18n.text.comment.profile.name + ' *'"
            >
          </div>
          <div class="email">
            <input
              v-model="user.email"
              required
              type="email"
              name="email"
              autocomplete="on"
              :class="language"
              :placeholder="$i18n.text.comment.profile.email + ' *'"
              @blur="upadteUserGravatar"
            >
          </div>
          <div class="site">
            <input
              v-model="user.site"
              type="url"
              name="url"
              autocomplete="on"
              :class="language"
              :placeholder="$i18n.text.comment.profile.site"
            >
          </div>
          <div v-if="userCacheEditing" class="save">
            <button type="submit" @click="updateUserCache($event)">
              <i class="iconfont icon-success" />
            </button>
          </div>
        </div>
        <!-- 用户设置部分 -->
        <div v-else-if="userCacheMode && !userCacheEditing" key="user" class="user">
          <div class="edit">
            <strong class="name">{{ user.name | firstUpperCase }}</strong>
            <a href class="setting" @click.stop.prevent>
              <i class="iconfont icon-setting" />
              <span
                class="account-setting"
                v-text="$i18n.text.comment.setting.account"
              />
              <ul class="user-tool">
                <li
                  @click.stop.prevent="userCacheEditing = true"
                  v-text="$i18n.text.comment.setting.edit"
                />
                <li
                  @click.stop.prevent="claerUserCache"
                  v-text="$i18n.text.comment.setting.clear"
                />
              </ul>
            </a>
          </div>
        </div>
      </transition>
      <div class="postbox">
        <div class="user">
          <div v-if="!isMobile" class="gravatar">
            <img
              :alt="user.name || $i18n.text.comment.anonymous"
              :src="humanizeGravatarUrl(user.gravatar)"
              draggable="false"
            >
          </div>
        </div>
        <div class="editor">
          <transition name="module">
            <div v-if="!!pid" key="reply" class="will-reply">
              <div class="reply-user">
                <span>
                  <span v-text="$i18n.text.comment.reply" />
                  <span>&nbsp;</span>
                  <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${replyCommentSlef.id}`)">
                    <strong>#{{ replyCommentSlef.id }} @{{ replyCommentSlef.author.name }}：</strong>
                  </a>
                </span>
                <a href class="cancel iconfont icon-cancel" @click.stop.prevent="cancelCommentReply" />
              </div>
              <div class="reply-preview" v-html="marked(replyCommentSlef.content)" />
            </div>
          </transition>
          <comment-pen
            ref="markdownInput"
            v-model="draftContent"
            :enabled-preview-mode="previewMode"
            :disabled="isPostingComment || isFetching"
            :is-posting="isPostingComment"
            @togglePreviewMode="handleTogglePreviewMode"
            @submit="submitComment"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { isBrowser } from '~/environment'
  import marked from '~/plugins/marked'
  import systemConstants from '~/constants/system'
  import { getFileCDNUrl } from '~/transformers/url'
  import { getGravatarByEmail } from '~/transformers/thumbnail'
  import { scrollTo, Easing } from '~/services/scroller'
  import { isGuestbookRoute } from '~/services/route-validator'
  import { getJSONStorageReader } from '~/services/local-storage'
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
      if (isBrowser) {
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

  #comment-box {
    padding: $gap;
    background-color: $module-bg;

    &.mobile {
      > .list-box {
        > .comment-list {
          > .comment-item {
            padding: 0;
            margin-top: $gap;

            > .cm-body {
              padding: $sm-gap $gap;
            }
          }
        }
      }

      > .post-box {
        > .user {
          padding: 0;
          height: auto;
          flex-direction: column;

          > .name,
          > .email,
          > .site,
          > .save {
            width: 80%;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: $gap;
          }

          > .save {
            width: 30%;
            margin-bottom: 0;
          }
        }

        > .postbox {
          > .user {
            margin: 0;
          }
        }
      }
    }

    > .tools {
      display: flex;
      padding-bottom: $gap;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $module-hover-bg;

      .count-skeleton,
      .like-skeleton,
      .sort-skeleton {
        height: 2rem;
      }
      
      .total-skeleton {
        display: flex;
        width: 70%;

        .count-skeleton {
          width: 20%;
          margin-right: 1rem;
        }

        .like-skeleton {
          width: 40%;
        }
      }

      .sort-skeleton {
        width: 20%;
      }

      > .total {
        display: flex;

        > .like,
        > .sponsor,
        > .count {
          padding: $xs-gap .5em;
          margin-right: $sm-gap;
          background-color: $module-hover-bg;
        }

        @keyframes sponsorBtnBg {
          0% {
            background: $primary-opacity-9;
          }
          50% {
            background: rgba($accent, .8);
          }
          100% {
            background: $primary-opacity-9;
          }
        }

        > .sponsor {
          margin-right: 0;
          color: $white;
          animation: sponsorBtnBg 1s infinite;
        }

        > .like {
          @include background-transition();

          > .iconfont {
            margin-right: $xs-gap / 2;
          }

          &:hover {
            background-color: $module-hover-bg-darken-20;
          }

          &.liked {
            > .iconfont {
              color: $red;
            }
          }
        }
      }

      > .sort {
        > .sort-btn {
          margin-left: $gap;

          &.actived {
            color: $link-hover-color;
            font-weight: bold;
          }
        }
      }
    }

    > .list-skeleton {
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

    > .empty-box {
      font-weight: bold;
      text-align: center;
      height: 6rem;
      line-height: 6rem;
    }

    > .list-box {
      > .comment-list {
        padding: 0;
        margin: 0;
        list-style-type: none;

        > .comment-item {
          position: relative;
          padding-left: 2rem;
          margin-top: $lg-gap;

          &:last-child {
            margin-bottom: $lg-gap;
          }

          &:hover {
            .cm-body {
              background-color: $module-hover-bg-darken-20;
            }
          }

          > .cm-avatar {
            display: block;
            position: absolute;
            left: 0;
            top: $gap * 2;
            background-color: $module-hover-bg;

            > a {
              display: block;
              border: ($radius * 2) solid $module-bg;
              width: 4em;
              height: 4em;

              > img {
                width: 100%;
                height: 100%;
              }
            }
          }

          > .cm-body {
            display: block;
            width: 100%;
            height: 100%;
            padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 3);
            background-color: $module-hover-bg;
            @include background-transition();

            > .cm-header {
              display: block;
              position: relative;

              > .user-name {
                font-weight: bold;
                margin-right: $gap;

                &:hover {
                  text-decoration: underline;
                } 
              }

              .os,
              .browser,
              .location {
                color: $text-disabled;
                font-size: $font-size-small;
                margin-right: $gap;

                .iconfont {
                  margin-right: $xs-gap / 2;
                }
              }

              > .flool {
                float: right;
                line-height: 2rem;
                color: $text-dividers;
                font-size: $font-size-small;
                font-weight: 900;
              }
            }

            > .cm-content {
              padding-right: $xs-gap;

              > .reply {
                color: $text-disabled;
                font-weight: bold;

                > a {
                  text-decoration: none;
                }
              }
            }

            > .cm-footer {
              display: flex;

              > .create_at,
              > .reply,
              > .like {
                font-size: $font-size-small;
                margin-right: $gap;
              }

              > .create_at {
                color: $text-disabled;
              }

              > .like {
                &:hover {
                  color: $red;
                }

                &.liked {
                  color: $red;
                  font-weight: bold;
                }

                &.actived {
                  font-weight: bold;
                }
              }

              > .reply,
              > .like {
                opacity: .8;
                transition: visibility $transition-time-fast, opacity $transition-time-fast, color $transition-time-fast;

                &:hover {
                  opacity: 1;
                }

                > .iconfont {
                  opacity: .8;
                  margin-right: $xs-gap / 2;
                }
              }
            }
          }
        }
      }
    }

    > .pagination-box {
      margin-bottom: $lg-gap;

      > .pagination-list {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        list-style-type: none;

        > .item {
          margin: 0 0.5em;

          > .pagination-btn {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            display: inline-block;
            line-height: 2rem;
            text-align: center;
            @include background-transition();

            &.prev,
            &.next {
              width: 5em;
              font-size: $font-size-h6;

              &:hover {
                background: none;
              }
            }

            &.disabled {
              cursor: no-drop;
              opacity: .5;
            }

            &.actived,
            &:hover {
              background-color: $module-hover-bg;
            }
          }
        }
      }
    }

    > .post-box {
      display: block;
      padding-top: $gap;
      border-top: 1px dashed $module-hover-bg-darken-20;

      > .user {
        width: 100%;
        height: 2em;
        line-height: 2em;
        display: flex;
        margin-bottom: $gap;
        padding-left: 5.2rem;

        > .edit {
          flex-grow: 1;
          text-align: right;
          line-height: 2em;
          position: relative;

          > .setting {
            font-size: $font-size-h6;
            margin-left: $gap;
            display: inline-block;
            position: relative;

            &:hover {
              > .user-tool {
                display: block;
              }
            }

            > .iconfont {
              margin-right: $xs-gap;
            }

            > .account-setting {
              text-transform: capitalize;
            }

            > .user-tool {
              display: none;
              position: absolute;
              right: 0;
              top: 2em;
              margin: 0;
              padding: 0;
              padding-top: .5rem;
              list-style-type: square;
              z-index: $z-index-normal + 1;
              color: $text-reversal;

              > li {
                padding: 0 $gap;
                background-color: rgba($accent, 0.5);

                &:hover {
                  background-color: rgba($accent, 0.8);
                }
              }
            }
          }
        }

        > .save {
          width: 10%;
          margin-left: $gap;
          flex-grow: 1;
          line-height: 2em;
          text-align: center;

          > button {
            width: 100%;
            height: 100%;
            background-color: $module-hover-bg;
            @include background-transition();

            &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }
        }

        > .name,
        > .email,
        > .site {
          flex-grow: 1;

          > input {
            width: 100%;
            height: 2em;
            line-height: 2em;
            text-indent: 3px;
            background-color: $module-hover-bg;
            @include background-transition();

            &:focus,
            &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }
        }

        > .name,
        > .email {
          margin-right: $gap;
        }
      }

      > .postbox {
        width: 100%;
        display: flex;

        > .user {
          margin-right: 1em;

          > .gravatar {
            display: block;
            margin-bottom: .5em;
            width: 4rem;
            height: 4rem;
            background-color: $module-hover-bg-darken-20;

            > img {
              width: 100%;
              height: 100%;
              transition: transform .5s ease-out;
            }
          }
        }

        > .editor {
          flex-grow: 1;
          overflow: hidden;

          > .will-reply {
            font-size: $font-size-h6;
            margin-bottom: 1em;

            > .reply-user {
              display: flex;
              justify-content: space-between;
              margin-bottom: $gap;
              padding: 0 $gap;
              height: 2.6em;
              line-height: 2.6em;
              background-color: $module-hover-bg;
              @include background-transition();

               &:hover {
                background-color: $module-hover-bg-darken-10;
              }
            }

            > .reply-preview {
              max-height: 10em;
              overflow: auto;
              padding: $gap;
              background-color: $module-hover-bg;
              @include background-transition();

               &:hover {
                background-color: $module-hover-bg-darken-10;
              }
            }
          }
        }
      }
    }
  }
</style>
