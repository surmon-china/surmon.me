<template>
  <div class="comment-box">
    <div class="tools">
      <a href="" class="like liked" @click.stop.prevent="">
        <i class="iconfont icon-like"></i>
        <strong class="count">7</strong>
        <span>人喜欢</span>
      </a>
      <div class="total">
        <strong class="count">20</strong>
        <span>&nbsp;</span>
        <span>条评论</span>
      </div>
      <div class="sort">
        <a href="" class="sort-btn" 
                   @click.stop.prevent="">最新</a>
        <a href="" class="sort-btn actived" 
                   @click.stop.prevent="">最早</a>
        <a href="" class="sort-btn" 
                   @click.stop.prevent="">最新</a>
      </div>
    </div>
    <ul class="comment-list">
      <li class="comment-item" v-for="comment in 10">
        <div class="cm-avatar">
          <a href="" @click.stop.prevent="">
            <img src="https://avatar.duoshuo.com/avatar-50/772/311955.jpg" alt="">
          </a>
        </div>
        <div class="cm-body">
          <div class="cm-header">
            <a href="" class="user-name">Surmon</a>
            <span class="os">
              <span class="os_mac"><i class="iconfont icon-mac"></i>Mac OS X</span>
            </span>
            <span class="ua">
              <span class="ua_chrome"><i class="iconfont icon-internet"></i>Chrome|56</span>
            </span>
            <span class="location">中国 西安</span>
            <!-- <span class="reply-count">18</span> -->
          </div>
          <div class="cm-content" v-if="[1,2,3,5,6,8].includes(comment)">学习了赞一个</div>
          <div class="cm-content" v-else>
            <span class="reply">回复 Lindyang：</span>
            <span>so？你想证明啥</span>
          </div>
          <div class="cm-footer">
            <span class="create_at">2017年12月4日 下午</span>
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
          <input type="text" placeholder="name *">
        </div>
        <div class="email">
          <input type="text" placeholder="email *">
        </div>
        <div class="site">
          <input type="text" placeholder="site">
        </div>
      </div>
      <div class="editor-box">
        <div class="user">
          <div class="gravatar">
            <img src="https://avatar.duoshuo.com/avatar-50/912/312375.jpg" alt="">
          </div>
          <p class="name">Surmon</p>
        </div>
        <div class="editor">
          <div class="markdown" 
               ref="markdown"
               contenteditable="true"
               @keyup="commentContentChange($event)"></div>
          <div class="editor-tools">
            <a href="" 
               class="emoji" 
               title="emoji"
               @click.stop.prevent="">
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
            <a href="" 
               class="image" 
               title="image"
               @click.stop.prevent="insertContent('image')">
              <i class="iconfont icon-image"></i>
            </a>
            <a href="" 
               class="link" 
               title="link"
               @click.stop.prevent="insertContent('link')">
              <i class="iconfont icon-link-horizontal"></i>
            </a>
            <a href="" 
               class="code" 
               title="code"
               @click.stop.prevent="insertContent('code')">
              <i class="iconfont icon-code-comment"></i>
            </a>
            <a href="" 
               class="preview" 
               title="preview"
               @click.stop.prevent="preview">
              <i class="iconfont icon-eye"></i>
            </a>
            <button class="submit">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vue-comment',
    data() {
      return {
        comemntContentHtml: '',
        comemntContentText: ''
      }
    },
    methods: {
      replaceSSL(html) {
        return !!html ? html.replace(/http:\/\//ig, '/proxy/') : html
      },
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
      preview() {
        console.log('preview')
      }
    }
  }
</script>

<style lang="scss" scoped>
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

      > .like {

        &.liked {

          > .iconfont {
            color: $red;
          }
        }

        > .count {
          margin-left: .45em;
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
              color: #949494;
              font-size: .8em;
              margin-right: .8em;

              .iconfont {
                margin-right: .2em;
              }
            }

            > .reply-count {
              position: absolute;
              background-color: #d0d0d0;
              padding: 0 .5em;
              border-radius: 100%;
              color: #969696;
              font-size: .8em;
              right: 0;
              bottom: 0;
            }
          }

          > .cm-content {
            font-size: .95em;
            line-height: 2em;
            margin: .5em 0;
            word-wrap: break-word;

            > .reply {
              color: #999;
              font-weight: bold;
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
              color: #949494;
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

          > .name {
            text-align: center;
            font-weight: bold;
            font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
          }
        }

        > .editor {
          flex-grow: 1;
          position: relative;

          > .markdown {
            min-height: 6em;
            max-height: 20em;
            overflow: auto;
            outline: none;
            padding: .5em;
            cursor: auto;
            font-size: .9em;
            line-height: 1.6em;
            background-color: $module-hover-bg;

            &:hover {
              background-color: darken($module-hover-bg, 10%);
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
                bottom: 2.4rem;
                left: 0;
                font-size: 1.3em;
                background-color: $module-bg;

                > .emoji-list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
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