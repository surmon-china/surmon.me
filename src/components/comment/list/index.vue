<template>
  <transition
    name="module"
    mode="out-in"
    @after-enter="loadCommentsAnimateDone"
  >
    <div
      v-if="isFetching"
      key="skeleton"
      class="list-box list-skeleton"
    >
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
      class="su-empty"
      v-text="$i18n.text.comment.empty"
    />
    <div v-else key="list" ref="commentList" class="list-box">
      <transition-group name="fade" tag="ul" class="comment-list" @after-enter="addCommentAnimateDone">
        <comment-item
          v-for="comment in comment.data"
          :key="comment.id"
          :comment="comment"
          :liked="comment"
          @like="likeComment"
          @reply="replyComment"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount, onUnmounted, PropType } from 'vue'
  import { mapState } from 'vuex'
  import { isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import marked from '/@/services/marked'
  import { LozadObserver } from '/@/services/lozad'
  import { USER, USER_LIKE_HISTORY } from '/@/constants/storage'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { firstUpperCase } from '/@/transforms/text'
  import { getGravatarByEmail } from '/@/transforms/thumbnail'
  import { scrollTo, Easing } from '/@/utils/scroller'
  import storage from '/@/services/storage'
  import { useGlobalState } from '/@/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'
  import { getCommentsLike } from '/@/transforms/state'
  import * as APP_CONFIG from '/@/config/app.config'
  import CommentUa from './ua.vue'

  const localUser = storage.getJSON(USER)
  const localHistoryLikes = getJSONStorageReader(systemConstants.StorageField.UserLikeHistory)
  const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/

  export default defineComponent({
    name: 'CommentList',
    components: {
      CommentUa,
    },
    props: {
      fetching: {
        type: Boolean,
        default: false
      },
      comments: {
        type: Array as PropType<Array<$TODO>>
      }
    },
    setup(props, context) {
      const { i18n, store, globalState, isMobile, isZhLang } = useEnhancer()
      const lozadObserver = ref<LozadObserver | null>(null)
      let commentsLike: number[] = []
      // init likes
      if (isClient) {
        commentsLike = getCommentsLike()
      }

      const observeLozad = () => {
        const listElement = this.$refs.commentList
        const lozadElements = listElement && listElement.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        lozadObserver = window.lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        lozadObserver.observe()
      }

      const loadCommentsAnimateDone = () => {
        observeLozad()
      }

      const addCommentAnimateDone = () => {
        observeLozad()
      }

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
        // this.$ga.event(
        //   '欲回评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        // this.pid = comment.id
        // this.toSomeAnchorById('post-box')
      }
 
      // 点赞某条评论
      likeComment(comment) {
        // this.$ga.event(
        //   '欲赞评论',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        // if (this.getCommentLiked(comment.id)) {
        //   return false
        // }
        // this.$store.dispatch('comment/fetchLikeComment', comment)
        //   .then(_ => {
        //     this.historyLikes.comments.push(comment.id)
        //     localHistoryLikes.set(this.historyLikes)
        //   })
        //   .catch(error => {
        //     console.warn('评论点赞失败', error)
        //     alert(this.$i18n.text.comment.profile.actionerr)
        //   })
      },
      // 获取某条评论是否被点赞
      getCommentLiked(comment_id) {
        return this.historyLikes.comments.includes(comment_id)
      }

      onMounted(() => {
        observeLozad()
      })

      onBeforeUnmount(() => {
        lozadObserver = null
      })

      return {
        firstUpperCase
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .list-skeleton {
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

  .su-empty {
    font-weight: bold;
    text-align: center;
    height: 6rem;
    line-height: 6rem;
  }

  .list-box {
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

    &.mobile {
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
  }
</style>
