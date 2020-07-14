<template>
  <li
    :key="comment.id"
    :id="getCommentElementId(comment.id)"
    class="comment-item"
  >
    <desktop-only>
      <div class="cm-avatar">
        <comment-link
          target="_blank"
          rel="external nofollow noopener"
          :href="comment.author.site"
        >
          <img
            :alt="comment.author.name || t(LANGUAGE_KEYS.COMMENT_ANONYMOUS)"
            :src="humanizeGravatarUrl(getGravatarUrlByEmail(comment.author.email))"
            draggable="false"
          >
        </comment-link>
      </div>
    </desktop-only>
    <div class="cm-body">
      <div class="cm-header">
        <comment-link
          class="user-name"
          target="_blank"
          rel="external nofollow noopener"
          :href="comment.author.site"
        >
          {{ firstUpperCase(comment.author.name) }}
        </comment-link>
        <comment-ua v-if="comment.agent" :ua="comment.agent" />
        <desktop-only>
          <span v-if="comment.ip_location" class="location">
            <span>{{ comment.ip_location.country }}</span>
            <span v-if="comment.ip_location.country && comment.ip_location.city">&nbsp;-&nbsp;</span>
            <span>{{ comment.ip_location.city }}</span>
          </span>
        </desktop-only>
        <span class="flool">#{{ comment.id }}</span>
      </div>
      <div class="cm-content">
        <p v-if="comment.pid" class="reply">
          <span v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
          <span class="parent" @click="scrollToCommentItem(comment.pid)">
            {{ getReplyParentCommentText(comment.pid) }}
          </span>
          <i18n zh="：" en=":" />
        </p>
        <div v-html="markedParse(comment.content)"></div>
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
            actived: !!comment.likes
          }"
          @click="likeComment(comment.id)"
        >
          <i class="iconfont icon-zan" />
          <span v-text="LANGUAGE_KEYS.COMMENT_LIKE" />
          <span>({{ comment.likes }})</span>
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount, onUnmounted, PropType } from 'vue'
  import { isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import marked from '/@/services/marked'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { timeAgo } from '/@/transforms/moment'
  import { firstUpperCase } from '/@/transforms/text'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import {
    CommentEvent,
    scrollToElementAnchor,
    getGravatarUrlByEmail,
    humanizeGravatarUrl,
    getCommentElementId
  } from '../helper'
  import CommentLink from './link'
  import CommentUa from './ua.vue'

  export default defineComponent({
    name: 'CommentListItem',
    components: {
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
    setup(props, context) {
      const { i18n, store, globalState, isMobile, isZhLang } = useEnhancer()
      const comments = computed(() => store.state.comment.comments.data)

      const markedParse = (markdown: string) => {
        return ''
        // return marked(markdown, null, false)
      }

      const getReplyParentCommentText = (parentCommentId: number) => {
        const authorName = comments.value
          .find(comment => comment.id === parentCommentId)
          ?.author.name
        const nameText = authorName ? `@${authorName}` : ''
        const idText = `#${parentCommentId}`
        return idText + nameText
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
        scrollToElementAnchor(getCommentElementId(commentId))
      }

      return {
        t: i18n.t,
        LANGUAGE_KEYS,
        humanlizeDate,
        getGravatarUrlByEmail,
        humanizeGravatarUrl,
        getCommentElementId,
        firstUpperCase
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .comment-item {
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

          .parent {
            font-weight: bold;
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

    &.mobile {
      padding: 0;
      margin-top: $gap;

      > .cm-body {
        padding: $sm-gap $gap;
      }
    }
  }
</style>
