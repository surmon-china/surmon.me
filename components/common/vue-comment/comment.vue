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
        <a href="" class="sort-btn" @click.stop.prevent="">最新</a>
        <a href="" class="sort-btn actived" @click.stop.prevent="">最早</a>
        <a href="" class="sort-btn" @click.stop.prevent="">最新</a>
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
          <div class="cm-content" v-if="[4,7,9].includes(comment)">----------著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。作者：Surmon链接：https://surmo业转载请联系作者获得授权，非商业转载请注明出处。作者：Surmon链接：https://surmon著作权归作者所有。
          商业转载请联系作者获得授权，非商业转载请注明出处。
          </div>
          <div class="cm-content" v-if="[1,2,3,5,6,8].includes(comment)">学习了赞一个</div>
          <div class="cm-content" v-else="comment == 2">
            <span class="reply">回复 Lindyang:</span>
             so？
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
        <div class="name"></div>
        <div class="email"></div>
        <div class="site"></div>
      </div>
      <div class="gravatar"></div>
      <div class="editor">
        <div class="markdown"></div>
        <div class="editor-tools">
          <span>插入表情</span>
          <span>插入图片</span>
          <span>插入连接</span>
          <span>插入代码</span>
          <button>发布</button>
        </div>
        <div class="preview">预览内容</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vue-comment',
    methods: {
      replaceSSL(html) {
        return !!html ? html.replace(/http:\/\//ig, '/proxy/') : html
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
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
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
            background-color: rgba(180, 180, 180, 0.5);
          }
        }

        > .cm-avatar {
          display: block;
          position: absolute;
          left: 0;
          top: 2.1em;
          background-color: #eee;

          > a {
            display: block;
            border: .3em solid #eee;
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
          padding: .8em .8em .8em 3.5em;
          background-color: rgba(220, 220, 220, 0.5);

          > .cm-header {
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            position: relative;

            > .user-name {
              font-weight: bold;
              margin-right: .8em;

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
            }
          }

          > .cm-footer {
            display: flex;

            > .create_at,
            > .reply,
            > .like {
              font-size: .9em;
              margin-right: .8em;
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

                // > .iconfont {
                // opacity: .8;
                // margin-right: .5em;
                // }
              }
            }
          }
        }
      }
    }

    > .post-box {

    }
  }
</style>