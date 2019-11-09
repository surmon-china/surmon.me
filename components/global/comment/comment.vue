<template>
  <div class="comment-box" id="comment-box" :class="{ mobile: isMobile }">
    <transition name="module" mode="out-in">
      <div class="tools" key="skeleton" v-if="fetching">
        <div class="total-skeleton">
          <skeleton-line class="count-skeleton" />
          <skeleton-line class="like-skeleton" />
        </div>
        <div class="sort-skeleton">
          <skeleton-line />
        </div>
      </div>
      <div class="tools" key="tools" v-else>
        <div class="total">
          <div class="count">
            <strong class="count">{{ comment.pagination.total || 0 }}</strong>
            <span v-text="$i18n.text.comment.count"></span>
          </div>
          <a href class="like" :class="{ liked: isLikedPage }" @click.stop.prevent="likePage">
            <i class="iconfont icon-like"></i>
            <strong>{{ likes || 0 }}</strong>
            <span v-text="(isMobile && !isEnLang) ? '赞' : $i18n.text.comment.like"></span>
          </a>
          <a href class="sponsor" @click.stop.prevent="sponsor">
            <i class="iconfont icon-hao"></i>
          </a>
        </div>
        <div class="sort">
          <a
            href
            class="sort-btn"
            :class="{ actived: Object.is(sortMode, constants.SortType.Desc) }"
            @click.stop.prevent="sortComemnts(constants.SortType.Desc)"
            v-text="$i18n.text.comment.new"
          >最新</a>
          <a
            href
            class="sort-btn"
            :class="{ actived: Object.is(sortMode, constants.SortType.Hot) }"
            @click.stop.prevent="sortComemnts(constants.SortType.Hot)"
            v-text="$i18n.text.comment.hot"
          >最热</a>
        </div>
      </div>
    </transition>
    <transition name="module" mode="out-in" @after-enter="loadCommentsAnimateDone">
      <div class="list-box list-skeleton" key="skeleton" v-if="isFetching">
        <ul class="comment-list">
          <li class="comment-item" :key="item" v-for="item in (isMobile ? 3 : 5)">
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
        key="empty"
        class="empty-box"
        v-else-if="!comment.data.length"
        v-text="$i18n.text.comment.empty"
      ></div>
      <div class="list-box" key="list" ref="commentList" v-else>
        <transition-group name="fade" tag="ul" class="comment-list" @after-enter="addCommentAnimateDone">
          <li
            class="comment-item"
            :id="`comment-item-${comment.id}`"
            :key="comment.id"
            v-for="comment in comment.data"
          >
            <div class="cm-avatar" v-if="!isMobile">
              <a
                target="_blank"
                rel="external nofollow noopener"
                :href="comment.author.site"
                @click.stop="clickUser($event, comment.author)"
              >
                <img
                  :alt="comment.author.name || $i18n.text.comment.anonymous"
                  :src="humanizeGravatarUrl(getGravatarUrlByEmail(comment.author.email))"
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
                <comment-ua :ua="comment.agent" v-if="comment.agent" />
                <span class="location" v-if="comment.ip_location && !isMobile">
                  <span>{{ comment.ip_location.country }}</span>
                  <span v-if="comment.ip_location.country && comment.ip_location.city">&nbsp;-&nbsp;</span>
                  <span>{{ comment.ip_location.city }}</span>
                </span>
                <span class="flool">#{{ comment.id }}</span>
              </div>
              <div class="cm-content">
                <p class="reply" v-if="!!comment.pid">
                  <span v-text="$i18n.text.comment.reply">回复</span>
                  <span>&nbsp;</span>
                  <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.pid}`)">
                    <span>#{{ comment.pid }}&nbsp;</span>
                    <strong v-if="fondReplyParent(comment.pid)">@{{ fondReplyParent(comment.pid) }}</strong>
                  </a>
                  <span>：</span>
                </p>
                <div v-html="marked(comment.content)"></div>
              </div>
              <div class="cm-footer">
                <span class="create_at">{{ comment.create_at | timeAgo(language) }}</span>
                <a href class="reply" @click.stop.prevent="replyComment(comment)">
                  <i class="iconfont icon-reply"></i>
                  <span v-text="$i18n.text.comment.reply">回复</span>
                </a>
                <a
                  href
                  class="like"
                  :class="{ liked: getCommentLiked(comment.id), actived: !!comment.likes }"
                  @click.stop.prevent="likeComment(comment)"
                >
                  <i class="iconfont icon-zan"></i>
                  <span v-text="$i18n.text.comment.ding"></span>
                  <span>&nbsp;({{ comment.likes }})</span>
                </a>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
    <transition name="module">
      <div class="pagination-box" v-if="!isFetching && comment.pagination.total_page > 1">
        <ul class="pagination-list" v-if="Object.is(sortMode, constants.SortType.Hot)">
          <li class="item" :key="index" v-for="(item, index) in comment.pagination.total_page">
            <a
              href
              class="pagination-btn"
              :class="{ 'actived disabled': Object.is(item, comment.pagination.current_page) }"
              @click.stop.prevent="Object.is(item, comment.pagination.current_page) 
               ? false 
               : loadComemntList({ page: item })"
            >{{ item }}</a>
          </li>
        </ul>
        <ul class="pagination-list" v-else>
          <li class="item">
            <a href class="pagination-btn prev disabled" @click.stop.prevent>
              <span>—</span>
              <span v-text="$i18n.text.comment.pagenation.old"></span>
            </a>
          </li>
          <li class="item" :key="index" v-for="(item, index) in comment.pagination.total_page">
            <a
              href
              class="pagination-btn"
              :class="{ 'actived disabled': paginationReverseActive(item) }"
              @click.stop.prevent="paginationReverseActive(item)
                ? false 
                : loadComemntList({ 
                    page: comment.pagination.total_page + 1 - item 
                  })"
            >{{ item }}</a>
          </li>
          <li class="item">
            <a href class="pagination-btn next disabled" @click.stop.prevent>
              <span v-text="$i18n.text.comment.pagenation.new"></span>
              <span>—</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <form class="post-box" name="comment" id="post-box">
      <!-- 用户编辑部分 -->
      <transition name="module" mode="out-in">
        <div class="user" key="edit" v-if="!userCacheMode || userCacheEditing">
          <div class="name">
            <input
              required
              type="text"
              name="name"
              autocomplete="on"
              :class="language"
              :placeholder="$i18n.text.comment.profile.name + ' *'"
              v-model="user.name"
            >
          </div>
          <div class="email">
            <input
              required
              type="email"
              name="email"
              autocomplete="on"
              :class="language"
              :placeholder="$i18n.text.comment.profile.email + ' *'"
              v-model="user.email"
              @blur="upadteUserGravatar"
            >
          </div>
          <div class="site">
            <input
              type="url"
              name="url"
              autocomplete="on"
              :class="language"
              :placeholder="$i18n.text.comment.profile.site"
              v-model="user.site"
            >
          </div>
          <div class="save" v-if="userCacheEditing">
            <button type="submit" @click="updateUserCache($event)">
              <i class="iconfont icon-success"></i>
            </button>
          </div>
        </div>
        <!-- 用户设置部分 -->
        <div class="user" key="user" v-else-if="userCacheMode && !userCacheEditing">
          <div class="edit">
            <strong class="name">{{ user.name | firstUpperCase }}</strong>
            <a href class="setting" @click.stop.prevent>
              <i class="iconfont icon-setting"></i>
              <span
                class="account-setting"
                v-text="$i18n.text.comment.setting.account"
              ></span>
              <ul class="user-tool">
                <li
                  @click.stop.prevent="userCacheEditing = true"
                  v-text="$i18n.text.comment.setting.edit"
                ></li>
                <li
                  @click.stop.prevent="claerUserCache"
                  v-text="$i18n.text.comment.setting.clear"
                ></li>
              </ul>
            </a>
          </div>
        </div>
      </transition>
      <div class="editor-box">
        <div class="user">
          <div class="gravatar" v-if="!isMobile">
            <img
              :alt="user.name || $i18n.text.comment.anonymous"
              :src="humanizeGravatarUrl(user.gravatar)"
            >
          </div>
        </div>
        <div class="editor">
          <transition name="module">
            <div class="will-reply" key="reply" v-if="!!pid">
              <div class="reply-user">
                <span>
                  <span v-text="$i18n.text.comment.reply"></span>
                  <span>&nbsp;</span>
                  <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${replyCommentSlef.id}`)">
                    <strong>#{{ replyCommentSlef.id }} @{{ replyCommentSlef.author.name }}：</strong>
                  </a>
                </span>
                <a href class="cancel iconfont icon-cancel" @click.stop.prevent="cancelCommentReply"></a>
              </div>
              <div class="reply-preview" v-html="marked(replyCommentSlef.content)"></div>
            </div>
          </transition>
          <div class="markdown">
            <div
              class="markdown-editor"
              ref="markdown"
              contenteditable="true"
              :placeholder="$i18n.text.comment.placeholder"
              @keyup="commentContentChange($event)"
            ></div>
            <div class="markdown-preview" :class="{ actived: previewMode }" v-html="previewContent"></div>
          </div>
          <div class="editor-tools">
            <a href class="emoji" title="emoji" @click.stop.prevent>
              <i class="iconfont icon-emoji"></i>
              <div class="emoji-box">
                <ul class="emoji-list">
                  <li
                    class="item"
                    :key="index"
                    @click="insertEmoji(emoji)"
                    v-for="(emoji, index) in emojis"
                    v-text="emoji"
                  ></li>
                </ul>
              </div>
            </a>
            <a href class="image" title="image" @click.stop.prevent="insertContent('image')">
              <i class="iconfont icon-image"></i>
            </a>
            <a href class="link" title="link" @click.stop.prevent="insertContent('link')">
              <i class="iconfont icon-link-horizontal"></i>
            </a>
            <a href class="code" title="code" @click.stop.prevent="insertContent('code')">
              <i class="iconfont icon-code-comment"></i>
            </a>
            <a href class="preview" title="preview" @click.stop.prevent="togglePreviewMode">
              <i class="iconfont icon-eye"></i>
            </a>
            <button
              type="submit"
              class="submit"
              :disabled="commentPosting || isFetching"
              @click="submitComment($event)"
            >
              <span v-text="commentPosting ? $i18n.text.comment.submiting : $i18n.text.comment.submit"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { isBrowser } from '~/environment'
  import marked from '~/plugins/marked'
  import gravatar from '~/plugins/gravatar'
  import { getFileCDNUrl } from '~/transforms/url'
  import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'
  import { isArticleDetailRoute, isGuestbookRoute } from '~/services/route-validator'
  import { localUser, localHistoryLikes } from '~/services/local-storage'
  import CommentUa from './ua'

  export default {
    name: 'vue-comment',
    components: {
      CommentUa
    },
    props: {
      fetching: {
        type: Boolean,
        default: false
      },
      likes: {
        type: Number,
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
        comemntContentHtml: '',
        comemntContentText: '',
        previewContent: '',
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
        },
        regexs: {
          email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        },
        emojis: ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻']
      }
    },
    computed: {
      ...mapState({
        comment: state => state.comment.data,
        commentFetching: state => state.comment.fetching,
        commentPosting: state => state.comment.posting,
        constants: state => state.global.constants,
        language: state => state.global.language,
        isMobile: state => state.global.isMobile,
        blacklist: state => state.global.appOption.data.blacklist,
      }),
      isFetching() {
        // 1. 宿主组件还在加载时，列表和 tool 都呈加载状态
        // 2. 宿主组件加载完成，如果自己还在请求，则列表呈加载状态
        // 3. 自己已请求完，宿主组件还在加载，列表和 tool 都呈加载状态
        return this.fetching || this.commentFetching
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
        return this.comment.data.find(comment => Object.is(comment.id, this.pid))
      }
    },
    mounted() {
      this.initAppOptionBlackList()
      if (isBrowser) {
        this.observeLozad()
      }
    },
    activated() {
      this.initUser()
      // 1. 组件不再负责初始加载评论列表数据的职责
      // 2. 组件仅负责初评论列表数据翻页、排序的职责
      // 3. 当容器组件还在请求时，组件全量 Loading
      // 4. 当只有评论列表在请求时，列表单独 Loading
    },
    destroyed() {
      this.$store.commit('comment/clearListData')
    },
    deactivated() {
      this.lozadObserver = null
      this.$store.commit('comment/clearListData')
    },
    methods: {
      // 初始化本地用户即本地用户的点赞历史
      initUser() {
        const user = localUser.get()
        const historyLikes = localHistoryLikes.get()
        historyLikes && (this.historyLikes = historyLikes)
        if (user) {
          this.user = user
          this.upadteUserGravatar()
          this.userCacheMode = true
        }
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
        this.lozadObserver = lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        this.lozadObserver.observe()
      },
      // 初始化黑名单
      initAppOptionBlackList() {
        this.$store.dispatch('global/fetchAppOption')
      },
      sponsor() {
        this.$ga.event('内容赞赏', '点击', 'tool')
        this.isMobile
          ? window.utils.openImgPopup(getFileCDNUrl('/images/sponsor-mobile.jpg'), 'sponsor-mobile')
          // sponsor 业务不使用 CDN
          : window.utils.openIframePopup('/sponsor', 'sponsor')
      },
      // markdown解析服务
      marked(content) {
        return marked(content, null, false)
      },
      // 头像服务
      getGravatarUrlByEmail(email) {
        if (!this.regexs.email.test(email)) {
          return null
        }
        return gravatar.url(email, { protocol: 'https' }).replace(
          'https://s.gravatar.com/avatar',
          this.$API.GRAVATAR
        ) + `?x-oss-process=style/gravatar`
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
        if (!this.regexs.email.test(this.user.email)) {
          return alert(this.$i18n.text.comment.profile.emailerr)
        }
        if (this.user.site && !this.regexs.url.test(this.user.site)) {
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
        this.user.gravatar = this.regexs.email.test(this.user.email)
          ? this.getGravatarUrlByEmail(this.user.email)
          : null
      },
      // 编辑器相关
      commentContentChange() {
        const html = this.$refs.markdown.innerHTML
        const text = this.$refs.markdown.innerText
        if (!Object.is(html, this.comemntContentHtml)) {
          this.comemntContentHtml = html
        }
        if (!Object.is(text, this.comemntContentText)) {
          this.comemntContentText = text
        }
      },
      updateCommentContent({ start = '', end = '' }) {
        if (!start && !end) return false
        // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
        const selectedText = (window.getSelection || document.getSelection)().toString()
        const currentText = this.$refs.markdown.innerText
        if (!!selectedText) {
          const newText = currentText.replace(selectedText, start + selectedText + end)
          this.$refs.markdown.innerText = newText
        } else {
          this.$refs.markdown.innerText = this.$refs.markdown.innerText += (start + end)
          this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
        }
        this.commentContentChange()
      },
      clearCommentContent(content) {
        this.comemntContentHtml = ''
        this.$refs.markdown.innerHTML = this.comemntContentHtml
        this.commentContentChange()
      },
      insertContent(type) {
        const contents = {
          image: {
            start: `![`,
            end: `](https://)`
          },
          link: {
            start: `[`,
            end: `](https://)`
          },
          code: {
            start: '\n```javascript\n',
            end: '\n```'
          }
        }
        this.updateCommentContent(contents[type])
      },
      insertEmoji(emoji) {
        this.updateCommentContent({ end: emoji })
      },
      // 切换预览模式
      togglePreviewMode() {
        this.previewContent = this.marked(this.comemntContentText)
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
        const pagination = this.comment.pagination
        return Object.is(index, pagination.total_page + 1 - pagination.current_page)
      },
      // 点击用户
      clickUser(event, user) {
        if (!user.site) event.preventDefault()
      },
      // 跳转到某条指定的id位置
      toSomeAnchorById(id) {
        const targetDom = document.getElementById(id)
        if (targetDom) {
          const isToEditor = Object.is(id, 'post-box')
          scrollTo(targetDom, 200, { offset: isToEditor ? 0 : -300 })
          // 如果是进入编辑模式，则需要激活光标
          if (isToEditor) {
            const p = this.$refs.markdown
            const s = window.getSelection()
            const r = document.createRange()
            r.setStart(p, p.childElementCount)
            r.setEnd(p, p.childElementCount)
            s.removeAllRanges()
            s.addRange(r)
          }
        }
      },
      // 回复评论
      replyComment(comment) {
        this.pid = comment.id
        this.toSomeAnchorById('post-box')
      },
      // 取消回复
      cancelCommentReply() {
        this.pid = 0
      },
      // 找到回复来源
      fondReplyParent(comment_id) {
        const parent = this.comment.data.find(comment => Object.is(comment.id, comment_id))
        return parent ? parent.author.name : null
      },
      // 喜欢当前页面
      likePage() {
        if (this.isLikedPage) {
          return false
        }
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
        scrollTo('#comment-box', 180, { easing: Easing['ease-in'] })
        params.sort = this.sortMode
        this.$store.dispatch('comment/fetchList', Object.assign(params, { post_id: this.postId }))
      },
      // 提交评论
      submitComment(event) {
        // 为了使用原生表单拦截，不使用事件修饰符
        event.preventDefault()
        if (!this.user.name) {
          return alert(this.$i18n.text.comment.profile.name + '?')
        }
        if (!this.user.email) {
          return alert(this.$i18n.text.comment.profile.email + '?')
        }
        if (!this.regexs.email.test(this.user.email)) {
          return alert(this.$i18n.text.comment.profile.emailerr)
        }
        if (this.user.site && !this.regexs.url.test(this.user.site)) {
          return alert(this.$i18n.text.comment.profile.siteerr)
        }
        if (!this.comemntContentText || !this.comemntContentText.replace(/\s/g, '')) {
          return alert(this.$i18n.text.comment.profile.content + '?')
        }
        const lineOverflow = this.comemntContentText.split('\n').length > 36
        const lengthOverflow = this.comemntContentText.length > 2000
        if (lineOverflow || lengthOverflow) {
          return alert(this.$i18n.text.comment.profile.contenterr)
        }
        // 使用服务单配置的黑名单在本地校验邮箱和关键字
        if (this.blacklist.mails.includes(this.user.email) || 
           (this.blacklist.keywords.length && 
            eval(`/${this.blacklist.keywords.join('|')}/ig`).test(this.comemntContentText))) {
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
          content: this.comemntContentText,
          agent: navigator.userAgent
        }).then(data => {
          // 发布成功后清空评论框内容并更新本地信息
          const content = data.result.content
          const emoji233333 = this.$root.$emoji233333
          if (emoji233333 && emoji233333.launch) {
            // 为表情做一次缓冲
            const preImage = (url, callback) => {
              const img = new Image()
              img.src = url
              if (img.complete) return callback(img)
              img.onload = () => callback(img)
            }
            if (content.includes('2333') || content.includes('哈哈')) {
              const emoji = emoji233333.defaultEmoji
              emoji233333.update({
                emoji,
                speed: 12,
                staggered: true,
                increaseSpeed: 0.4,
              })
              preImage(emoji, emoji233333.launch.bind(emoji233333))
            } else if (content.includes('666')) {
              const emoji = getFileCDNUrl('/images/emojis/666.png')
              emoji233333.update({
                emoji,
                speed: 12,
                staggered: true,
                increaseSpeed: 0.4
              })
              preImage(emoji, emoji233333.launch.bind(emoji233333))
            } else if (content.includes('呵呵')) {
              const emoji = getFileCDNUrl('/images/emojis/hehe.png')
              emoji233333.update({ emoji, staggered: false, speed: 8, increaseSpeed: 0.04 })
              preImage(emoji, emoji233333.launch.bind(emoji233333))
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
    }
  }
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
      display: flex;
      align-items: baseline;
      flex-wrap: wrap-reverse;
      position: relative;
      overflow: hidden;
      margin-top: .6em;
      margin-bottom: 1em;
      padding-top: 2.5em;
      border-radius: $radius;
      background-color: rgba(0, 0, 0, 0.8);

      &:before {
        color: white;
        content: attr(data-lang)" CODE";
        height: 2.5em;
        line-height: 2.5em;
        font-size: 1em;
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
        padding: 1em;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        line-height: 1.6em;
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

        > .editor-box {
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
          0%   {
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
          color: white;
          animation: sponsorBtnBg 1s infinite;
        }

        > .like {

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
            color: $black;
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

            > .cm-avatar {

              > a {
                > img {
                  transition: transform .5s ease-out;
                  transform: rotate(360deg);
                }
              }
            }

            > .cm-body {
              background-color: $module-hover-bg-darken-20;
            }
          }

          > .cm-avatar {
            display: block;
            position: absolute;
            left: 0;
            top: 2rem;
            background-color: $module-hover-bg;

            > a {
              display: block;
              border: ($radius * 2) solid $module-bg;
              width: 4em;
              height: 4em;

              > img {
                width: 100%;
                height: 100%;
                transition: transform .5s ease-out;
              }
            }
          }

          > .cm-body {
            display: block;
            width: 100%;
            height: 100%;
            padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 3);
            background-color: $module-hover-bg;

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
              > .location {
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

                  &:hover {
                    color: $red;
                  }
                }
              }

              > .reply,
              > .like {
                opacity: .8;

                > .iconfont {
                  opacity: .8;
                  margin-right: $xs-gap / 2;
                }

                &:hover {
                  opacity: 1;
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
              z-index: 99;
              color: $text-reversal;

              > li {
                padding: 0 1rem;
                background-color: rgba(green, 0.5);
              }

              > li:hover {
                background-color: rgba(green, 0.8);
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

      > .editor-box {
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
          position: relative;
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

               &:hover {
                background-color: $module-hover-bg-darken-10;
              }
            }

            > .reply-preview {
              max-height: 10em;
              overflow: auto;
              padding: $gap;

              background-color: $module-hover-bg;

               &:hover {
                background-color: $module-hover-bg-darken-10;
              }
            }
          }

          > .markdown {
            position: relative;
            overflow: hidden;

            > .markdown-editor {
              min-height: 6em;
              max-height: 36em;
              overflow: auto;
              outline: none;
              padding: .5em;
              cursor: auto;
              font-size: $font-size-h6;
              line-height: 1.8em;
              background-color: $module-hover-bg;

              &:empty:before{
                content: attr(placeholder);
                color: $text-disabled;
              }

              &:focus{
                content:none;
              }

              &:hover {
                background-color: $module-hover-bg-darken-10;
              }
            }

            > .markdown-preview {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 0;
              overflow: auto;
              margin: 0;
              padding: .5em;
              transform: translateY(-100%);
              background-color: rgba(235, 235, 235, 0.85);
              transition: transform .2s;

              &.actived {
                height: 100%;
                transition: transform .2s;
                transform: translateY(0);
              }
            }
          }

          > .editor-tools {
            height: 2em;
            line-height: 2em;
            background-color: $module-hover-bg-opacity-9;

            > .emoji {

              > .emoji-box {
                display: none;
                position: absolute;
                bottom: 2em;
                left: 0;
                top: 0;
                width: 100%;
                overflow-y: auto;
                background-color: $module-bg;

                > .emoji-list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  font-size: $font-size-h3;
                  display: flex;
                  flex-wrap: wrap;

                  > .item {
                    padding: 0 .4em;
                    cursor: pointer;

                    &:hover {
                      background-color: $module-hover-bg;
                    }
                  }
                }
              }

              &:hover {
                > .emoji-box {
                  display: block;
                }
              }
            }

            > .emoji,
            > .image,
            > .link,
            > .code,
            > .preview {
              width: 2em;
              height: 2em;
              text-align: center;
              display: inline-block;

              &:hover {
                background-color: $module-hover-bg-darken-20;
              }
            }

            > .submit {
              float: right;
              width: 8rem;
              height: 100%;
              background-color: $module-hover-bg-darken-20;

              &:hover {
                background-color: $module-hover-bg-darken-40;
              }
            }
          }
        }
      }
    }
  }
</style>
