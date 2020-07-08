<template>
  <li
    :key="comment.id"
    :id="getCommentElementId(comment.id)"
    class="comment-item"
  >
    <desktop-only>
      <div class="cm-avatar">
        <a
          target="_blank"
          rel="external nofollow noopener"
          :href="comment.author.site"
          @click.stop="handleClickUser($event, comment.author)"
        >
          <img
            :alt="comment.author.name || t(LANGUAGE_KEYS.COMMENT_ANONYMOUS)"
            :src="humanizeGravatarUrl(getGravatarUrlByEmail(comment.author.email))"
            draggable="false"
          >
        </a>
      </div>
    </desktop-only>
    <div class="cm-body">
      <div class="cm-header">
        <a
          class="user-name"
          target="_blank"
          rel="external nofollow noopener"
          :href="comment.author.site"
          @click.stop="handleClickUser($event, comment.author)"
        >
          {{ firstUpperCase(comment.author.name) }}
        </a>
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
        <p v-if="!!comment.pid" class="reply">
          <span v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
          <span>&nbsp;</span>
          <button @click="scrollToCommentItem(comment.pid)">
            <span>#{{ comment.pid }}&nbsp;</span>
            <strong v-if="findReplyParent(comment.pid)">@{{ findReplyParent(comment.pid) }}</strong>
          </button>
          <span>：</span>
        </p>
        <div v-html="markedParse(comment.content)"></div>
      </div>
      <div class="cm-footer">
        <span class="create_at">{{ humanlizeDate(comment.create_at) }}</span>
        <button class="reply" @click="replyComment(comment)">
          <i class="iconfont icon-reply" />
          <span v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
        </button>
        <button
          class="like"
          :class="{
            liked: liked,
            actived: !!comment.likes
          }"
          @click="likeComment(comment)"
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
  import { getGravatarUrlByEmail, humanizeGravatarUrl, getCommentElementId } from '../helper'
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

      const handleClickUser = (event, user) => {
        if (!user.site) {
          event.preventDefault()
        }
      }

      const markedParse = (markdown: string) => {
        return marked(markdown, null, false)
      }

      const replyComment = (comment) => {
        context.emit('reply', comment.id)
      }

      const findReplyParent = (commentId: number) => {
        const parent = this.comment.data.find(comment => comment.id === commentId)
        return parent ? parent.author.name : null
      }

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const likeComment = (commentId: number) => {
        context.emit('like', commentId)
      }

      const scrollToCommentItem = (commengId) => {

      }

      return {
        t: i18n.t,
        LANGUAGE_KEYS,
        humanlizeDate,
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

    &.mobile {
      padding: 0;
      margin-top: $gap;

      > .cm-body {
        padding: $sm-gap $gap;
      }
    }
  }
</style>
