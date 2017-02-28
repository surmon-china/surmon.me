<template>
  <div class="comment-box">
    <div class="tools">
      <div class="total">
        <div class="count">
          <strong class="count">{{ comment.data.pagination.total || 0 }}</strong>
          <span>&nbsp;</span>
          <span>条评论</span>
        </div>
        <a href="" 
           class="like" 
           :class="{ liked: pageLiked }"
           @click.stop.prevent="likePage">
          <i class="iconfont icon-like"></i>
          <strong>{{ likes || 0 }}</strong>
          <span>人喜欢</span>
        </a>
      </div>
      <div class="sort">
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, 1) }" 
           @click.stop.prevent="sortComemnts(1)">最新</a>
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, 2) }"
           @click.stop.prevent="sortComemnts(2)">最早</a>
        <a href="" 
           class="sort-btn"
           :class="{ actived: Object.is(sortMode, 3) }" 
           @click.stop.prevent="sortComemnts(3)">最新</a>
      </div>
    </div>
    <div class="empty-box" v-if="!comment.data.data.length">Go right to the heart of the matter.</div>
    <ul class="comment-list">
      <li class="comment-item" v-for="comment in comment.data.data">
        <div class="cm-avatar">
          <a :href="comment.author.site" @click.stop.prevent="clickUser(comment)">
            <img :alt="comment.author.name || '匿名用户'"
                 :src="comment.author.gravatar || '/images/anonymous.jpg'">
          </a>
        </div>
        <div class="cm-body">
          <div class="cm-header">
            <a :href="comment.author.site" 
               class="user-name" 
               @click.stop.prevent="clickUser(comment)">{{ comment.author.name | firstUpperCase }}</a>
            <span class="os" v-html="OSParse(comment.agent)" v-if="comment.agent"></span>
            <span class="ua" v-html="UAParse(comment.agent)" v-if="comment.agent"></span>
            <span class="location">{{ comment.ip_location }}</span>
          </div>
          <div class="cm-content" v-html="marked(comment.content)">
            <!-- <span class="reply">回复 Lindyang：</span> -->
            <!-- <div>so？你想证明啥</div> -->
          </div>
          <div class="cm-footer">
            <span class="create_at">{{ comment.create_at | timeAgo }}</span>
            <a href="" class="reply" @click.stop.prevent="">
              <i class="iconfont icon-reply"></i>
              <span>回复</span>
            </a>
            <a href="" class="like" @click.stop.prevent="">
              <i class="iconfont icon-zan"></i>
              <span>顶(10)</span></a>
          </div>
        </div>
      </li>
    </ul>
    <div class="post-box">
      <div class="user">
        <div class="name">
          <input type="text" required placeholder="name *" v-model="user.name">
        </div>
        <div class="email">
          <input type="email" required placeholder="email *" v-model="user.email">
        </div>
        <div class="site">
          <input type="url" placeholder="site" v-model="user.site">
        </div>
      </div>
      <div class="editor-box">
        <div class="user">
          <div class="gravatar">
            <img src="https://avatar.duoshuo.com/avatar-50/912/312375.jpg" alt="">
          </div>
        </div>
        <div class="editor">
          <div class="markdown">
            <div class="markdown-editor" 
                 ref="markdown"
                 contenteditable="true"
                 @keyup="commentContentChange($event)">
            </div>
            <div class="markdown-preview" 
                 :class="{ active: previewMode }"
                 v-html="marked(comemntContentText)"></div>
          </div>
          <div class="editor-tools">
            <a href="" class="emoji" title="emoji" @click.stop.prevent>
              <i class="iconfont icon-emoji"></i>
              <div class="emoji-box">
                <ul class="emoji-list">
                  <li class="item" @click="insertEmoji('😃')">😃</li>
                  <li class="item" @click="insertEmoji('😂')">😂</li>
                  <li class="item" @click="insertEmoji('😅')">😅</li>
                  <li class="item" @click="insertEmoji('😉')">😉</li>
                  <li class="item" @click="insertEmoji('😌')">😌</li>
                  <li class="item" @click="insertEmoji('😔')">😔</li>
                  <li class="item" @click="insertEmoji('😓')">😓</li>
                  <li class="item" @click="insertEmoji('😢')">😢</li>
                  <li class="item" @click="insertEmoji('😍')">😍</li>
                  <li class="item" @click="insertEmoji('😘')">😘</li>
                  <li class="item" @click="insertEmoji('😜')">😜</li>
                  <li class="item" @click="insertEmoji('😡')">😡</li>
                  <li class="item" @click="insertEmoji('😭')">😭</li>
                  <li class="item" @click="insertEmoji('😱')">😱</li>
                  <li class="item" @click="insertEmoji('😳')">😳</li>
                  <li class="item" @click="insertEmoji('😵')">😵</li>
                  <li class="item" @click="insertEmoji('🙏')">🙏</li>
                  <li class="item" @click="insertEmoji('👌')">👌</li>
                  <li class="item" @click="insertEmoji('👍')">👍</li>
                  <li class="item" @click="insertEmoji('👎')">👎</li>
                  <li class="item" @click="insertEmoji('👏')">👏</li>
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
            <a href="" 
               class="preview" 
               title="preview"
               @click.stop.prevent="previewMode = !previewMode">
              <i class="iconfont icon-eye"></i>
            </a>
            <button class="submit" @click="submitComment">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import marked from '~plugins/marked'
  import { UAParse, OSParse } from '~utils/comment-ua-parse'
  export default {
    name: 'vue-comment',
    fetch() {
      console.log('fetch', this)
      return store.dispatch('loadCommentsByPostId')
    },
    data() {
      return {
        sortMode: 2,
        previewMode: false,
        pageLiked: false,
        comemntContentHtml: '',
        comemntContentText: '',
        user: {
          name: '',
          email: '',
          site: '',
          gravatar: ''
        }
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
      isArticlePage() {
        return !!this.$route.params.article_id
      },
      isGuestbookPage() {
        return Object.is(this.$route.name, 'guestbook')
      },
      comment() {
        return this.$store.state.comment
      }
    },
    methods: {
      UAParse,
      OSParse,
      // replaceSSL(html) {
      //   return !!html ? html.replace(/http:\/\//ig, '/proxy/') : html
      // },
      commentContentChange() {
        const html = this.$refs.markdown.innerHTML
        const text = this.$refs.markdown.innerText
        if (!Object.is(html, this.comemntContentHtml)) {
          this.comemntContentHtml = html
        }
        this.comemntContentText = text
      },
      updateCommentContent(content) {
        if (content) this.comemntContentHtml += content
        this.$refs.markdown.innerHTML = this.comemntContentHtml
        this.commentContentChange()
      },
      insertContent(type) {
        const contents = {
          image: `<div>![](https://)</div>`,
          link: `<div>[](https://)</div>`,
          code: '<div>```javascript<br><br>```</div>'
        }
        this.updateCommentContent(contents[type])
      },
      insertEmoji(emoji) {
        this.updateCommentContent(emoji)
      },
      marked: content => marked(content),
      sortComemnts(type) {
        console.log(type)
      },
      likePage() {
        this.pageLiked = true
        console.log('被喜欢了')
      },
      clickUser(user) {
        console.log('点击了某个用户', user)
      },
      replyComment(moment) {
        console.log('回复某条评论', moment)
      },
      likeCommentmoment() {
        console.log('喜欢某条评论', moment)
      },
      submitComment() {
        const emailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        const urlReg = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
        if (!this.user.name) return alert('请输入名字')
        if (!this.user.email) return alert('请输入邮箱')
        if (!emailReg.test(this.user.email)) return alert('邮箱不合法')
        if (this.user.site && !urlReg.test(this.user.site)) return alert('链接不合法')
        if(!this.comemntContentText) return alert('请输入内容')
        console.log('发布评论', this)
        this.$store.dispatch('postComment', {
          post_id: this.postId,
          content: this.comemntContentText,
          author: this.user,
          agent: navigator.userAgent
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .comment-box {
    background-color: $module-bg;
    padding: 1em;

    > .tools {
      display: flex;
      padding: 1em 0;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $module-hover-bg;
      margin-bottom: .6em;

      > .total {
        display: flex;
        font-size: 1em;

        > .like,
        > .count {
          padding: .2em .5em;
          background-color: $module-hover-bg;
        }

        > .like {
          margin-left: .5em;

          > .iconfont {
            margin-right: .5em;
          }

          &:hover {
            background-color: darken($module-hover-bg, 20%);
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
            font-weight: bold;
          }
        }
      }
    }

    > .empty-box {
      font-weight: bold;
      text-align: center;
    }

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
            background-color: darken($module-hover-bg, 20%);
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
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            position: relative;

            > .user-name {
              font-weight: bold;
              margin-right: .8em;
              font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;

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
          }

          > .cm-content {
            font-size: .95em;
            line-height: 2em;
            margin: .5em 0;
            word-wrap: break-word;

            > .reply {
              color: $disabled;
              font-weight: bold;
            }

            code {
              color: #bd4147;
              padding: .3em .5em;
              margin: 0 .5em;
              border-radius: $radius;
              background-color: $module-hover-bg;
            }

            pre {
              display: block;
              position: relative;
              overflow: hidden;
              margin-bottom: 1em;
              padding-left: 2.5em;
              background-color: rgba(0, 0, 0, 0.8);

              &:before {
                color: white;
                content: attr(data-lang)" CODE";
                height: 2.8em;
                line-height: 2.8em;
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
                position: absolute;
                left: 0;
                top: 2.8em;
                margin: 0;
                padding: 1em 0;
                width: 2.5em;
                height: calc(100% - 2.8em);
                text-align: center;
                background-color: rgba(0, 0, 0, 0.2);

                > .code-line-number {
                  padding: 0;
                  position: relative;
                  list-style-type: none;
                  line-height: 1.6em;
                  transition: background-color .05s;

                  &:hover {
                    &:before {
                      display: block;
                      opacity: 1;
                      visibility: visible;
                    }
                  }

                  &:before {
                    content: '';
                    height: 1.6em;
                    position: absolute;
                    top: 0;
                    left: 2.5em;
                    width: 66em;
                    background-color: rgba(154, 154, 154, 0.2);
                    display: none;
                    visibility: hidden;
                    opacity: 0;
                  }
                }
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

    > .post-box {
      display: block;
      border-top: 1px dashed darken($module-hover-bg, 30%);
      margin-top: 1rem;
      padding-top: 1rem;

      > .user {
        width: 100%;
        height: 2em;
        display: flex;
        margin-bottom: 1rem;
        padding-left: 5em;

        > .name,
        > .email,
        > .site {
          font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
          flex-grow: 1;

          > input {
            width: 100%;
            background-color: $module-hover-bg;

            &:focus,
            &:hover {
              background-color: darken($module-hover-bg, 10%);
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
            border: .3em solid #eee;
            margin-bottom: .5em;
            width: 4em;
            height: 4em;
            background-color: darken($module-hover-bg, 20%);

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

          > .markdown {
            position: relative;
            overflow: hidden;

            > .markdown-editor {
              min-height: 6em;
              max-height: 20em;
              overflow: auto;
              outline: none;
              padding: .5em;
              cursor: auto;
              font-size: .9em;
              line-height: 1.8em;
              background-color: $module-hover-bg;

              &:hover {
                background-color: darken($module-hover-bg, 10%);
              }
            }

            > .markdown-preview {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 0;
              overflow: auto;
              padding: .5em;
              @include css3-prefix(transform, translateY(-100%));
              background-color: rgba(235, 235, 235, 0.85);
              transition: transform .2s;

              &.active {
                height: 100%;
                transition: transform .2s;
                @include css3-prefix(transform, translateY(0));
              }
            }
          }

          > .editor-tools {
            height: 2em;
            line-height: 2em;
            background-color: darken($module-hover-bg, 20%);

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
                background-color: darken($module-hover-bg, 20%);
              }
            }

            > .submit {
              float: right;
              width: 7em;
              background-color: darken($module-hover-bg, 15%);

              &:hover {
                background-color: darken($module-hover-bg, 40%);
              }
            }
          }
        }
      }
    }
  }
</style>