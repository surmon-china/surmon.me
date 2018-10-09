<template>
  <div class="comment-box" id="comment-box" :class="{ mobile: mobileLayout }">
    <div class="tools">
      <div class="total">
        <div class="count">
          <strong class="count">{{ comment.data.pagination.total || 0 }}</strong>
          <span>&nbsp;</span>
          <span v-text="$i18n.text.comment.count">条评论</span>
        </div>
        <a href="" 
           class="like" 
           :class="{ liked: pageLiked }"
           @click.stop.prevent="likePage">
          <i class="iconfont icon-like"></i>
          <strong>{{ likes || 0 }}</strong>
          <span v-text="(mobileLayout && isGuestbookPage && language === 'zh') ? '人喜欢' : $i18n.text.comment.like"></span>
        </a>
        <a href="" class="shang" @click.stop.prevent="shang">
          <i class="iconfont icon-shang"></i>
        </a>
      </div>
      <div class="sort">
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, -1) }" 
           @click.stop.prevent="sortComemnts(-1)"
           v-text="$i18n.text.comment.new">最新</a>
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, 2) }" 
           @click.stop.prevent="sortComemnts(2)"
           v-text="$i18n.text.comment.hot">最热</a>
      </div>
    </div>
    <transition name="module" mode="out-in">
      <div class="empty-box"
           v-if="!comment.data.data.length && !comment.fetching"
           v-text="$i18n.text.comment.empty">Go right to the heart of the matter.</div>
      <loading-box v-else-if="comment.fetching"></loading-box>
      <div class="list-box" v-else>
        <transition-group name="fade" tag="ul" class="comment-list">
          <li class="comment-item" 
              :id="`comment-item-${comment.id}`" 
              :key="index"
              v-for="(comment, index) in comment.data.data">
            <div class="cm-avatar" v-if="!mobileLayout">
              <a target="_blank"
                 rel="external nofollow noopener"
                 :href="comment.author.site" 
                 @click.stop="clickUser($event, comment.author)">
                <img :alt="comment.author.name || $i18n.text.comment.anonymous"
                     :src="gravatar(comment.author.email) || `${cdnUrl}/images/anonymous.jpg`">
              </a>
            </div>
            <div class="cm-body">
              <div class="cm-header">
                <a class="user-name" 
                   target="_blank" 
                   rel="external nofollow noopener"
                   :href="comment.author.site" 
                   @click.stop="clickUser($event, comment.author)">{{ comment.author.name | firstUpperCase }}</a>
                <span class="os" v-html="osParse(comment.agent)" v-if="comment.agent"></span>
                <span class="ua" v-html="browserParse(comment.agent)" v-if="comment.agent"></span>
                <span class="location" v-if="comment.ip_location && !mobileLayout">
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
                  <a href="" @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.pid}`)">
                    <span>#{{ comment.pid }}&nbsp;</span>
                    <strong v-if="fondReplyParent(comment.pid)">@{{ fondReplyParent(comment.pid) }}</strong>
                  </a>
                  <span>：</span>
                </p>
                <div v-html="marked(comment.content)"></div>
              </div>
              <div class="cm-footer">
                <span class="create_at">{{ comment.create_at | timeAgo(language) }}</span>
                <a href="" class="reply" @click.stop.prevent="replyComment(comment)">
                  <i class="iconfont icon-reply"></i>
                  <span v-text="$i18n.text.comment.reply">回复</span>
                </a>
                <a href="" 
                   class="like" 
                   :class="{ liked: commentLiked(comment.id), actived: !!comment.likes }"
                   @click.stop.prevent="likeComment(comment)">
                  <i class="iconfont icon-zan"></i>
                  <span v-text="$i18n.text.comment.ding">顶</span>
                  <span>&nbsp;({{ comment.likes }})</span>
                </a>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
    <transition name="module">
      <div class="pagination-box" v-if="comment.data.pagination.total_page > 1">
        <ul class="pagination-list" v-if="Object.is(sortMode, 2)">
          <li class="item" :key="index" v-for="(item, index) in comment.data.pagination.total_page">
            <a href="" 
               class="pagination-btn" 
               :class="{ 'actived disabled': Object.is(item, comment.data.pagination.current_page) }"
               @click.stop.prevent="Object.is(item, comment.data.pagination.current_page) 
               ? false 
               : loadComemntList({ page: item })">{{ item }}</a>
          </li>
        </ul>
        <ul class="pagination-list" v-else>
          <li class="item">
            <a href="" class="pagination-btn prev disabled" @click.stop.prevent>
              <span>— </span>
              <span v-text="$i18n.text.comment.pagenation.old">old</span>
            </a>
          </li>
          <li class="item" :key="index" v-for="(item, index) in comment.data.pagination.total_page">
            <a href="" 
               class="pagination-btn" 
               :class="{ 'actived disabled': paginationReverseActive(item) }"
               @click.stop.prevent="paginationReverseActive(item)
                  ? false 
                  : loadComemntList({ 
                      page: comment.data.pagination.total_page + 1 - item 
                  })">{{ item }}</a>
          </li>
          <li class="item">
            <a href="" class="pagination-btn next disabled" @click.stop.prevent>
              <span v-text="$i18n.text.comment.pagenation.new">new</span>
              <span> —</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <form class="post-box" name="comment" id="post-box">
      <!-- 用户编辑部分 -->
      <transition name="module" mode="out-in">
        <div class="user" v-if="!userCacheMode || userCacheEditing">
          <div class="name">
            <input required
                   type="text" 
                   name="name"
                   :class="language"
                   autocomplete="on"
                   :placeholder="$i18n.text.comment.profile.name + ' *'"
                   v-model="user.name">
          </div>
          <div class="email">
            <input required
                   type="email" 
                   name="email"
                   :class="language"
                   :placeholder="$i18n.text.comment.profile.email + ' *'"
                   autocomplete="on"
                   v-model="user.email" 
                   @blur="upadteUserGravatar">
          </div>
          <div class="site">
            <input type="url"
                   name="url"
                   :class="language"
                   autocomplete="on"
                   :placeholder="$i18n.text.comment.profile.site"
                   v-model="user.site">
          </div>
          <div class="save" v-if="userCacheEditing">
            <button type="submit" @click="updateUserCache($event)">
              <i class="iconfont icon-success"></i>
            </button>
          </div>
        </div>
        <!-- 用户设置部分 -->
        <div class="user" v-else-if="userCacheMode && !userCacheEditing">
          <div class="edit">
            <strong class="name">{{ user.name | firstUpperCase }}</strong>
            <a href="" class="setting" @click.stop.prevent>
              <i class="iconfont icon-setting"></i>
              <span class="account-setting" v-text="$i18n.text.comment.setting.account">账户设置</span>
              <ul class="user-tool">
                <li @click.stop.prevent="userCacheEditing = true"
                    v-text="$i18n.text.comment.setting.edit">编辑信息</li>
                <li @click.stop.prevent="claerUserCache"
                    v-text="$i18n.text.comment.setting.clear">清空信息</li>
              </ul>
            </a>
          </div>
        </div>
      </transition>
      <div class="editor-box">
        <div class="user">
          <div class="gravatar" v-if="!mobileLayout">
            <img :alt="user.name || $i18n.text.comment.anonymous"
                 :src="user.gravatar || `${cdnUrl}/images/anonymous.jpg`">
          </div>
        </div>
        <div class="editor">
          <transition name="module">
            <div class="will-reply" v-if="!!pid">
              <div class="reply-user">
                <span>
                  <span v-text="$i18n.text.comment.reply">回复</span>
                  <span>&nbsp;</span>
                  <a href="" @click.stop.prevent="toSomeAnchorById(`comment-item-${replyCommentSlef.id}`)">
                    <strong>#{{ replyCommentSlef.id }} @{{ replyCommentSlef.author.name }}：</strong>
                  </a>
                </span>
                <a href="" class="cancel iconfont icon-cancel" @click.stop.prevent="cancelCommentReply"></a>
              </div>
              <div class="reply-preview" v-html="marked(replyCommentSlef.content)"></div>
            </div>
          </transition>
          <div class="markdown">
            <div class="markdown-editor" 
                 ref="markdown"
                 contenteditable="true"
                 :placeholder="$i18n.text.comment.placeholder"
                 @keyup="commentContentChange($event)">
            </div>
            <div class="markdown-preview" 
                 :class="{ actived: previewMode }"
                 v-html="previewContent"></div>
          </div>
          <div class="editor-tools">
            <a href="" class="emoji" title="emoji" @click.stop.prevent>
              <i class="iconfont icon-emoji"></i>
              <div class="emoji-box">
                <ul class="emoji-list">
                  <li class="item"
                      :key="index"
                      @click="insertEmoji(emoji)"
                      v-for="(emoji, index) in emojis">{{ emoji }}</li>
                </ul>
              </div>
            </a>
            <a href="" class="image" title="image" @click.stop.prevent="insertContent('image')">
              <i class="iconfont icon-image"></i>
            </a>
            <a href="" class="link" title="link" @click.stop.prevent="insertContent('link')">
              <i class="iconfont icon-link-horizontal"></i>
            </a>
            <a href="" class="code" title="code" @click.stop.prevent="insertContent('code')">
              <i class="iconfont icon-code-comment"></i>
            </a>
            <a href="" class="preview" title="preview" @click.stop.prevent="togglePreviewMode">
              <i class="iconfont icon-eye"></i>
            </a>
            <button type="submit" 
                    class="submit" 
                    :disabled="comment.posting"
                    @click="submitComment($event)">
              <span>{{ comment.posting ? $i18n.text.comment.submiting : $i18n.text.comment.submit }}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import marked from '~/plugins/marked'
  import gravatar from '~/plugins/gravatar'
  import eventBus from '~/utils/event-bus'
  import { scrollTo } from '~/utils/scroll-to-anywhere'
  import { browserParse, osParse } from '~/utils/ua-os-browser'
  
  export default {
    name: 'vue-comment',
    data() {
      return {
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
    props: {
      likes: {
        type: [String, Number],
        required: true
      },
      postId: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      ...mapState({
        comment: state => state.comment,
        language: state => state.option.language,
        mobileLayout: state => state.option.mobileLayout,
        blacklist: state => state.option.globalOption.data.blacklist,
      }),
      pageLiked() {
        return this.historyLikes.pages.includes(this.postId)
      },
      isArticlePage() {
        return this.$route.params.article_id
      },
      isGuestbookPage() {
        return Object.is(this.$route.name, 'guestbook')
      },
      replyCommentSlef() {
        return this.comment.data.data.find(comment => Object.is(comment.id, this.pid))
      }
    },
    mounted() {
      this.initUser()
      if (!this.comment.data.pagination.total_page) {
        this.loadComemntList()
      }
    },
    destroyed() {
      this.$store.commit('comment/CLEAR_LIST')
    },
    methods: {
      browserParse,
      osParse,
      shang() {
        window.utils.openImgPopup(`${this.cdnUrl}/images/shang.jpg`, 'shang')
      },
      // markdown解析服务
      marked(content) {
        return marked(content, null, false)
      },
      // 头像服务
      gravatar(email) {
        if (!this.regexs.email.test(email)) return null
        const gravatar_url = gravatar.url(email, { 
          // size: '96', 
          // rating: 'pg',
          // default: 'https://gravatar.surmon.me/anonymous.jpg', 
          protocol: 'https'
        });
        return gravatar_url.replace('https://s.gravatar.com/avatar', 'https://gravatar.surmon.me')
      },
      // 初始化本地用户即本地用户的点赞历史
      initUser() {
        if (localStorage) {
          const user = localStorage.getItem('user')
          const historyLikes = localStorage.getItem('user_like_history')
          if (historyLikes) this.historyLikes = JSON.parse(historyLikes)
          if (user) {
            this.user = JSON.parse(user)
            this.upadteUserGravatar()
            this.userCacheMode = true
          }
        }
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
        localStorage.setItem('user', JSON.stringify(this.user))
        this.userCacheEditing = false
      },
      // 清空用户数据
      claerUserCache() {
        this.userCacheMode = false
        this.userCacheEditing = false
        localStorage.removeItem('user')
        Object.keys(this.user).forEach(key => {
          this.user[key] = ''
        })
      },
      // 更新当前用户头像
      upadteUserGravatar() {
        const emailIsVerified = this.regexs.email.test(this.user.email)
        this.user.gravatar = emailIsVerified ? this.gravatar(this.user.email) : null
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
        if (!Object.is(this.sortMode, sort)) {
          this.sortMode = sort
          this.loadComemntList()
        }
      },
      // 翻页反向计算
      paginationReverseActive(index) {
        const pagination = this.comment.data.pagination
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
        const parent = this.comment.data.data.find(comment => Object.is(comment.id, comment_id))
        return parent ? parent.author.name : null
      },
      // 喜欢当前页面
      likePage() {
        if (this.pageLiked) return false
        this.$store.dispatch('likeArticleOrPageOrComment', { type: 2, id: this.postId })
        .then(data => {
          this.historyLikes.pages.push(this.postId)
          localStorage.setItem('user_like_history', JSON.stringify(this.historyLikes))
        })
        .catch(err => {
          console.warn('喜欢失败', err)
          alert(this.$i18n.text.comment.profile.actionerr)
        })
      },
      // 点赞某条评论
      likeComment(comment) {
        if (this.commentLiked(comment.id)) return false
        this.$store.dispatch('likeArticleOrPageOrComment', { type: 1, id: comment.id })
        .then(data => {
          this.historyLikes.comments.push(comment.id)
          localStorage.setItem('user_like_history', JSON.stringify(this.historyLikes))
        })
        .catch(err => {
          console.warn('评论点赞失败', err)
          alert(this.$i18n.text.comment.profile.actionerr)
        })
      },
      // 获取某条评论是否被点赞
      commentLiked(comment_id) {
        return this.historyLikes.comments.includes(comment_id)
      },
      // 获取评论列表
      loadComemntList(params = {}) {
        params.sort = this.sortMode
        this.$store.dispatch('loadCommentsByPostId', Object.assign(params, { post_id: this.postId }))
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
          console.warn('评论发布失败\n1：邮箱被列入黑名单\n2：内容包含黑名单关键词')
          return false
        }
        if (!this.user.site) {
          Reflect.deleteProperty(this.user, 'site')
        }
        this.$store.dispatch('postComment', {
          pid: this.pid,
          post_id: this.postId,
          content: this.comemntContentText,
          author: this.user,
          agent: navigator.userAgent
        }).then(data => {
          // 发布成功后清空评论框内容并更新本地信息
          const content = data.result.content
          const emoji233333 = eventBus.emoji233333
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
              const emoji = '/images/emojis/666.png'
              emoji233333.update({
                emoji,
                speed: 12,
                staggered: true,
                increaseSpeed: 0.4
              })
              preImage(emoji, emoji233333.launch.bind(emoji233333))
            } else if (content.includes('呵呵')) {
              const emoji = '/images/emojis/hehe.png'
              emoji233333.update({ emoji, staggered: false, speed: 8, increaseSpeed: 0.04 })
              preImage(emoji, emoji233333.launch.bind(emoji233333))
            }
          }
          this.previewMode = false
          this.userCacheMode = true
          this.cancelCommentReply()
          this.clearCommentContent()
          localStorage.setItem('user', JSON.stringify(this.user))
        }).catch(err => {
          console.warn('评论发布失败', err)
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
    font-size: 1em;
    line-height: 2em;
    margin: .5em 0;
    word-wrap: break-word;

    a {
      text-decoration: underline;
    }

    img {
      margin: .5rem 0;
      max-width: 100%;
      border-radius: 2px;
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
    background-color: $module-bg;
    padding: 1em;

    &.mobile {

      > .list-box {

        > .comment-list {

          > .comment-item {
            padding: 0;
            margin-bottom: 1rem;

            > .cm-body {
              padding: .6em;
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
            margin-bottom: 1rem;
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
      padding: 1em 0;
      padding-top: 0;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $module-hover-bg;
      margin-bottom: .6em;

      > .total {
        display: flex;
        font-size: 1em;

        > .like,
        > .shang,
        > .count {
          padding: .2em .5em;
          background-color: $module-hover-bg;
        }

        @keyframes shangBtnBg {
          0%   {
            background: $primary-opacity-9;
          }
          50% {
            background: rgba(#50a849, .8);
          }
          100% {
            background: $primary-opacity-9;
          }
        }

        > .shang {
          margin-left: .5em;
          color: white;
          animation: shangBtnBg 1s infinite;
        }

        > .like {
          margin-left: .5em;

          > .iconfont {
            margin-right: .5em;
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
          margin-left: 1em;

          &.actived {
            color: $black;
            font-weight: bold;
          }
        }
      }
    }

    > .empty-box {
      font-weight: bold;
      text-align: center;
      height: 5rem;
      line-height: 5rem;
    }

    > .list-box {

      > .comment-list {
        padding: 0;
        margin: 0;
        list-style-type: none;

        > .comment-item {
          position: relative;
          padding: .6em 0 .6em 1.5em;

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
            top: 2em;
            background-color: $module-hover-bg;

            > a {
              display: block;
              border: .3em solid $module-bg;
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
            padding: .6em .6em .6em 3.2em;
            background-color: $module-hover-bg;

            > .cm-header {
              display: block;
              position: relative;

              > .user-name {
                font-weight: bold;
                margin-right: .8em;
                // font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;

                &:hover {
                  text-decoration: underline;
                } 
              }

              > .os,
              > .ua,
              > .location {
                color: $disabled;
                font-size: .8em;
                margin-right: .8em;

                .iconfont {
                  margin-right: .2em;
                }
              }

              > .flool {
                color: $dividers;
                font-weight: 900;
                font-size: .8em;
                display: inline-block;
                line-height: 2rem;
                float: right;
              }
            }

            > .cm-content {
              font-size: .95em;

              > .reply {
                color: $disabled;
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
                font-size: .8em;
                margin-right: 1em;
              }

              > .create_at {
                color: $disabled;
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
                  margin-right: .2em;
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
      margin-top: .5rem;

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
              font-size: .9em;

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
      border-top: 1px dashed $module-hover-bg-darken-20;
      margin-top: 1rem;
      padding-top: 1rem;

      > .user {
        width: 100%;
        height: 2em;
        line-height: 2em;
        display: flex;
        margin-bottom: 1rem;
        padding-left: 5.2rem;

        > .edit {
          flex-grow: 1;
          text-align: right;
          line-height: 2em;
          position: relative;

          > .name {
            // font-family: DINRegular, -apple-system, Microsoft YaHei, Arial, Helvetica, sans-serif;
          }

          > .setting {
            font-size: 1rem;
            margin-left: 1rem;
            display: inline-block;
            position: relative;

            &:hover {

              > .user-tool {
                display: block;
              }
            }

            > .iconfont {
              margin-right: .5rem;
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
              color: $white;

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
          margin-left: 1em;
          flex-grow: 1;
          line-height: 2em;
          text-align: center;
          // font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;

          > button {
            display: block;
            width: 100%;
            background-color: $module-hover-bg;

            &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }
        }

        > .name,
        > .email,
        > .site {
          // font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
          flex-grow: 1;

          > input {
            width: 100%;
            height: 2em;
            background-color: $module-hover-bg;

            &:focus,
            &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }
        }

        > .name,
        > .email {
          margin-right: 1em;
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
            font-size: .95em;
            margin-bottom: 1em;

            > .reply-user {
              display: flex;
              justify-content: space-between;
              margin-bottom: 1rem;
              padding: 0 1rem;
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
              padding: 1rem;

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
              font-size: .95em;
              line-height: 1.8em;
              background-color: $module-hover-bg;

              &:empty:before{
                content: attr(placeholder);
                color: $disabled;
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
              @include css3-prefix(transform, translateY(-100%));
              background-color: rgba(235, 235, 235, 0.85);
              transition: transform .2s;

              &.actived {
                height: 100%;
                transition: transform .2s;
                @include css3-prefix(transform, translateY(0));
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
                background-color: $module-bg;

                > .emoji-list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  font-size: 1.3em;
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
              width: 7em;
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
