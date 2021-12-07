<template>
  <li
    :key="comment.id"
    :id="getCommentItemElementID(comment.id)"
    :class="{ mobile: isMobile, child: isChild }"
    class="comment-item"
  >
    <desktop-only>
      <div class="cm-avatar">
        <comment-link class="link" :href="comment.author.site">
          <img
            :alt="comment.author.name || t(LANGUAGE_KEYS.COMMENT_ANONYMOUS)"
            :src="humanizeGravatarUrlByEmail(comment.author.email)"
            draggable="false"
          />
        </comment-link>
      </div>
    </desktop-only>
    <div class="cm-body">
      <div class="cm-header">
        <comment-link class="user-name" :href="comment.author.site">
          {{ firstUpperCase(comment.author.name) }}
        </comment-link>
        <comment-ua v-if="comment.agent" :ua="comment.agent" />
        <desktop-only>
          <span v-if="comment.ip_location" class="location">
            <span>{{ comment.ip_location.country }}</span>
            <span v-if="comment.ip_location.country && comment.ip_location.city" class="separator"
              >-</span
            >
            <span>{{ comment.ip_location.city }}</span>
          </span>
        </desktop-only>
        <span class="flool">#{{ comment.id }}</span>
      </div>
      <div class="cm-content">
        <p v-if="comment.pid" class="reply">
          <span class="text">
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_REPLY" />
          </span>
          <button class="parent" @click="scrollToCommentItem(comment.pid)">
            {{ getReplyParentCommentText(comment.pid) }}
          </button>
          <i18n zh="：" en=":" />
        </p>
        <div
          class="markdown-html comment"
          v-html="markdownToHTML(comment.content, { sanitize: true })"
        />
      </div>
      <div class="cm-footer">
        <span class="create_at">{{ humanlizeDate(comment.create_at) }}</span>
        <button class="reply" @click="replyComment(comment.id)">
          <i class="iconfont icon-reply" />
          <i18n :lkey="LANGUAGE_KEYS.COMMENT_REPLY" />
        </button>
        <button
          class="like"
          :class="{
            liked: liked,
            actived: Boolean(comment.likes)
          }"
          :disabled="liked"
          @click="likeComment(comment.id)"
        >
          <i class="iconfont icon-zan" />
          <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIKE" />
          <span> ({{ comment.likes }})</span>
        </button>
      </div>
      <div class="cm-children">
        <slot name="children"></slot>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCommentStore, Comment } from '/@/store/comment'
  import { getCommentItemElementID } from '/@/constants/anchor'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { timeAgo } from '/@/transforms/moment'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToElementAnchor } from '/@/utils/scroller'
  import { CommentEvent, humanizeGravatarUrlByEmail } from '../helper'
  import CommentLink from './link.vue'
  import CommentUa from './ua.vue'

  export default defineComponent({
    name: 'CommentItem',
    components: {
      CommentLink,
      CommentUa
    },
    props: {
      comment: {
        type: Object as PropType<Comment>,
        required: true
      },
      liked: {
        type: Boolean,
        default: false
      },
      isChild: {
        type: Boolean,
        default: false
      }
    },
    emits: [CommentEvent.Reply, CommentEvent.Like],
    setup(_, context) {
      const { i18n, isMobile } = useEnhancer()
      const commentStore = useCommentStore()

      const getReplyParentCommentText = (parentCommentId: number) => {
        const authorName = commentStore.comments.find((comment) => comment.id === parentCommentId)
          ?.author.name
        const nameText = authorName ? `@${authorName}` : ''
        const idText = `#${parentCommentId}`
        return `${idText} ${nameText}`
      }

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const replyComment = (commentId: number) => {
        context.emit(CommentEvent.Reply, commentId)
      }

      const likeComment = (commentId: number) => {
        context.emit(CommentEvent.Like, commentId)
      }

      const scrollToCommentItem = (commentId: number) => {
        scrollToElementAnchor(getCommentItemElementID(commentId), -300)
      }

      return {
        LANGUAGE_KEYS,
        t: i18n.t,
        isMobile,
        humanlizeDate,
        humanizeGravatarUrlByEmail,
        getCommentItemElementID,
        getReplyParentCommentText,
        firstUpperCase,
        markdownToHTML,
        replyComment,
        likeComment,
        scrollToCommentItem
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .comment-item {
    position: relative;
    padding-left: 2rem;
    margin-top: $lg-gap;
    &:first-child {
      margin-top: 0;
    }
    &.child {
      margin-top: $xs-gap;
      padding-top: $xs-gap;
      border-top: 1px dashed $module-bg-darker-3;
      &:first-child {
        margin-top: $gap;
      }
      &:last-child {
        .cm-body {
          padding-bottom: 0;
        }
      }

      .cm-avatar {
        top: $lg-gap * 2;
      }
    }

    .cm-avatar {
      display: block;
      position: absolute;
      left: 0;
      top: $gap * 2;

      .link {
        $size: 4.8rem;
        display: block;
        background-color: $module-bg-darker-2;
        border: 5px solid $module-bg-lighter;
        border-radius: $sm-radius;
        width: $size;
        height: $size;

        img {
          width: 100%;
          height: 100%;
          border-radius: $xs-radius;
        }
      }
    }

    .cm-body {
      display: block;
      width: 100%;
      height: 100%;
      padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 3);
      background-color: $module-bg-darker-1;
      @include radius-box($xs-radius);
      @include background-transition();

      > .cm-header {
        display: block;
        position: relative;

        > .user-name {
          font-weight: bold;
          margin-right: $gap;

          &:hover {
            border-bottom: 1px solid;
          }
        }

        ::v-deep(.os),
        ::v-deep(.browser),
        .location {
          color: $text-disabled;
          font-size: $font-size-small;
          margin-right: $gap;

          .iconfont {
            margin-right: $xs-gap;
          }

          .separator {
            margin: 0 $xs-gap;
          }
        }

        > .flool {
          float: right;
          line-height: 1.8;
          color: $text-dividers;
          font-size: $font-size-small;
          font-weight: bold;
        }
      }

      > .cm-content {
        padding-right: $xs-gap;
        user-select: text;

        .reply {
          display: flex;
          align-items: center;
          margin-top: $sm-gap;
          margin-bottom: -$xs-gap;
          font-size: $font-size-h6;
          font-weight: bold;
          color: $text-disabled;

          .text {
            margin-right: $xs-gap;
          }

          .parent {
            font-weight: bold;
            color: $link-color;
            &:hover {
              color: $link-color-hover;
            }
          }
        }

        .markdown-html {
          margin: $sm-gap 0;
        }
      }

      > .cm-footer {
        display: flex;

        > .create_at,
        > .reply,
        > .like {
          color: $text-disabled;
          font-size: $font-size-small;
          margin-right: $gap;

          .iconfont {
            margin-right: $xs-gap;
          }
        }

        .reply {
          &:hover {
            color: $link-color;
          }
        }

        .like {
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
      }
    }

    &:hover {
      .cm-body {
        background-color: $module-bg-hover;
      }
    }

    &.mobile {
      padding: 0;
      margin-top: $gap;

      .cm-body {
        padding: $sm-gap $gap;
      }
    }
  }
</style>
