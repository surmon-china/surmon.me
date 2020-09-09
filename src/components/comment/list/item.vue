<template>
  <li
    :key="comment.id"
    :id="getCommentElementId(comment.id)"
    :class="{ mobile: isMobile }"
    class="comment-item"
  >
    <desktop-only>
      <div class="cm-avatar">
        <comment-link class="link" :href="comment.author.site">
          <img
            :alt="comment.author.name || t(LANGUAGE_KEYS.COMMENT_ANONYMOUS)"
            :src="humanizeGravatarUrlByEmail(comment.author.email)"
            draggable="false"
          >
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
            <span
              v-if="comment.ip_location.country && comment.ip_location.city"
              class="separator"
            >-</span>
            <span>{{ comment.ip_location.city }}</span>
          </span>
        </desktop-only>
        <span class="flool">#{{ comment.id }}</span>
      </div>
      <div class="cm-content">
        <p v-if="comment.pid" class="reply">
          <span class="text" v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
          <button class="parent" @click="scrollToCommentItem(comment.pid)">
            {{ getReplyParentCommentText(comment.pid) }}
          </button>
          <i18n zh="：" en=":" />
        </p>
        <div
          class="markdown-html comment"
          v-html="markdownToHTML(comment.content)"
        />
      </div>
      <div class="cm-footer">
        <span class="create_at">{{ humanlizeDate(comment.create_at) }}</span>
        <button class="reply" @click="replyComment(comment.id)">
          <i class="iconfont icon-reply" />
          <span v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
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
          <span v-i18n="LANGUAGE_KEYS.COMMENT_LIKE" />
          <span> ({{ comment.likes }})</span>
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent, ref, h, computed, onMounted, onBeforeUnmount, onUnmounted, PropType } from 'vue'
  import { isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { timeAgo } from '/@/transforms/moment'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { CommentEvent, scrollToElementAnchor, humanizeGravatarUrlByEmail, getCommentElementId } from '../helper'
  import CommentUa from './ua.vue'

  const CommentLink = defineComponent({
    props: {
      href: String
    },
    setup(props, context) {
      return () => {
        const { href, ...restProps } = props
        const isLink = !!href
        return h(
          isLink ? 'a' : 'span',
          !isLink ? restProps : {
            ...props,
            target: '_blank',
            rel: 'external nofollow noopener'
          },
          context.slots.default?.()
        )
      }
    }
  })

  export default defineComponent({
    name: 'CommentListItem',
    components: {
      CommentLink,
      CommentUa,
    },
    props: {
      comment: {
        type: Object,
        required: true
      },
      liked: {
        type: Boolean,
        default: false
      }
    },
    emits: [
      CommentEvent.Reply,
      CommentEvent.Like
    ],
    setup(props, context) {
      const { i18n, store, globalState, isMobile, isZhLang } = useEnhancer()
      const comments = computed(() => store.state.comment.comments.data)

      const getReplyParentCommentText = (parentCommentId: number) => {
        const authorName = comments.value
          .find(comment => comment.id === parentCommentId)
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
        scrollToElementAnchor(getCommentElementId(commentId), -300)
      }

      return {
        LANGUAGE_KEYS,
        t: i18n.t,
        isMobile,
        humanlizeDate,
        humanizeGravatarUrlByEmail,
        getCommentElementId,
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
  @import 'src/assets/styles/init.scss';

  .comment-item {
    position: relative;
    padding-left: 2rem;
    margin-top: $lg-gap;
    &:first-child {
      margin-top: 0;
    }

    .cm-avatar {
      display: block;
      position: absolute;
      left: 0;
      top: $gap * 2;
      background-color: $module-bg-darker-2;

      .link {
        $size: 4.8rem;
        display: block;
        border: 5px solid $module-bg-lighter;
        border-radius: $mini-radius;
        width: $size;
        height: $size;

        img {
          width: 100%;
          height: 100%;
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
        font-size: $font-size-h6;

        .reply {
          display: flex;
          align-items: center;
          margin-top: $sm-gap;
          margin-bottom: - $xs-gap;
          color: $text-disabled;
          font-weight: bold;

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
        background-color: $module-bg-darker-3;
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
