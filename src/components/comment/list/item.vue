<template>
  <li
    class="comment-item"
    :key="comment.id"
    :id="getCommentItemElementID(comment.id)"
    :class="{
      'hide-avatar': hiddenAvatar,
      'is-child': isChild,
      'has-child': hasChild
    }"
  >
    <div>
      <div class="cm-avatar" v-if="!hiddenAvatar">
        <comment-link class="link" :href="authorURL">
          <img :alt="comment.author.name" :src="authorAvatar" draggable="false" />
          <span class="role" :class="isDisqusAuthor ? 'disqus' : 'anonymous'">
            <i class="iconfont icon-disqus-logo" v-if="isDisqusAuthor"></i>
            <i class="iconfont icon-user" v-else></i>
          </span>
        </comment-link>
      </div>
      <div class="cm-body">
        <div class="cm-header">
          <div class="left">
            <comment-link class="username" :class="{ url: Boolean(authorURL) }" :href="authorURL">
              {{ firstUpperCase(comment.author.name) }}
            </comment-link>
            <span class="moderator" v-if="isAdminAuthor">
              <i18n :k="LanguageKey.COMMENT_MODERATOR" />
            </span>
            <template v-if="comment.ip_location">
              <comment-location class="location" :location="comment.ip_location" />
            </template>
            <template v-if="!hiddenUa">
              <comment-ua class="ua" v-if="comment.agent" :ua="comment.agent" />
            </template>
          </div>
          <div class="right">
            <span class="flool">#{{ comment.id }}</span>
          </div>
        </div>
        <div class="cm-content">
          <p v-if="comment.pid" class="reply">
            <span class="text">
              <i18n :k="LanguageKey.COMMENT_REPLY" />
            </span>
            <button class="parent" @click="scrollToCommentItem(comment.pid)">
              {{ getReplyParentCommentText(comment.pid) }}
            </button>
            <i18n zh="：" en=":" />
          </p>
          <div class="markdown">
            <markdown :markdown="comment.content" :sanitize="true" :compact="true" />
          </div>
        </div>
        <div class="cm-footer">
          <div class="left">
            <span class="create_at">
              <udate to="ago" :date="comment.create_at" />
            </span>
            <button
              class="vote"
              :class="{
                actived: liked,
                alived: Boolean(comment.likes)
              }"
              :disabled="liked"
              @click="handleVote(true)"
            >
              <i class="iconfont icon-like" />
              <i18n :k="LanguageKey.COMMENT_UPVOTE" v-if="!plainVote" />
              <span class="count">({{ comment.likes }})</span>
            </button>
            <button
              class="vote"
              :class="{
                actived: disliked,
                alived: Boolean(comment.dislikes)
              }"
              :disabled="disliked"
              @click="handleVote(false)"
            >
              <i class="iconfont icon-dislike" />
              <i18n :k="LanguageKey.COMMENT_DOWNVOTE" v-if="!plainVote" />
              <span class="count">({{ comment.dislikes }})</span>
            </button>
            <button class="reply" @click="handleCancelReply" v-if="isReply">
              <i class="iconfont icon-cancel" />
              <i18n :k="LanguageKey.COMMENT_REPLY_CANCEL" />
            </button>
            <button class="reply" @click="handleReply" v-else>
              <i class="iconfont icon-reply" />
              <i18n :k="LanguageKey.COMMENT_REPLY" />
            </button>
          </div>
          <div class="right">
            <button class="delete" :disabled="isDeleting" @click="handleDelete" v-if="isDeleteable">
              <i class="iconfont icon-delete" />
              <i18n :k="LanguageKey.COMMENT_DELETE" />
            </button>
          </div>
        </div>
        <div class="cm-reply" v-if="isReply">
          <slot name="reply"></slot>
        </div>
        <div class="cm-children">
          <slot name="children"></slot>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCommentStore, Comment } from '/@/store/comment'
  import { useUniversalStore, UserType } from '/@/store/universal'
  import { getCommentItemElementID } from '/@/constants/anchor'
  import { UNDEFINED } from '/@/constants/value'
  import { LanguageKey } from '/@/language'
  import { getGravatarByHash, getDisqusAvatarByUsername } from '/@/transforms/avatar'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToElementAnchor } from '/@/utils/scroller'
  import Markdown from '/@/components/common/markdown.vue'
  import CommentLocation from './location.vue'
  import CommentLink from './link.vue'
  import CommentUa from './ua.vue'
  import { CommentEvents, getDisqusUserURL } from '../helper'

  export default defineComponent({
    name: 'CommentItem',
    components: {
      Markdown,
      CommentLocation,
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
      disliked: {
        type: Boolean,
        default: false
      },
      isReply: {
        type: Boolean,
        default: false
      },
      isChild: {
        type: Boolean,
        default: false
      },
      hasChild: {
        type: Boolean,
        default: false
      },
      hiddenAvatar: {
        type: Boolean,
        default: false
      },
      hiddenUa: {
        type: Boolean,
        default: false
      },
      plainVote: {
        type: Boolean,
        default: false
      }
    },
    emits: [
      CommentEvents.Vote,
      CommentEvents.Delete,
      CommentEvents.Reply,
      CommentEvents.CancelReply
    ],
    setup(props, context) {
      const { i18n } = useEnhancer()
      const commentStore = useCommentStore()
      const universalStore = useUniversalStore()
      const isDeleting = computed(() => commentStore.deleting)

      const disqusAuthorID = computed(() => {
        return getExtendValue(props.comment.extends, 'disqus-author-id')
      })
      const disqusUsername = computed<string | void>(() => {
        return getExtendValue(props.comment.extends, 'disqus-author-username')
      })

      const isDisqusAuthor = computed(() => Boolean(disqusAuthorID.value))
      const isAdminAuthor = computed(() => {
        return (
          Boolean(disqusUsername.value) &&
          Boolean(universalStore.disqusConfig) &&
          disqusUsername.value === universalStore.disqusConfig.admin_username
        )
      })

      const authorAvatar = computed(() => {
        return disqusUsername.value
          ? getDisqusAvatarByUsername(disqusUsername.value)
          : getGravatarByHash(props.comment.author.email_hash)
      })

      const authorURL = computed(() => {
        if (props.comment.author.site) {
          return props.comment.author.site
        }
        if (disqusUsername.value) {
          return getDisqusUserURL(disqusUsername.value)
        }
        return UNDEFINED
      })

      const isDeleteable = computed(() => {
        // 1. Disqus logined
        if (universalStore.user.type === UserType.Disqus) {
          // 2. Logined user ID === comment.author.disqus-author-id
          if (disqusAuthorID.value) {
            return universalStore.user.disqusProfile?.id === disqusAuthorID.value
          }
        }

        return false
      })

      const getReplyParentCommentText = (parentID: number) => {
        const authorName = commentStore.comments.find((comment) => comment.id === parentID)?.author
          .name
        const nameText = authorName ? `@${authorName}` : ''
        const idText = `#${parentID}`
        return `${idText} ${nameText}`
      }

      const handleReply = () => {
        context.emit(CommentEvents.Reply, props.comment.id)
      }

      const handleCancelReply = () => {
        context.emit(CommentEvents.CancelReply, props.comment.id)
      }

      const handleVote = (isLike: boolean) => {
        context.emit(CommentEvents.Vote, props.comment.id, isLike)
      }

      const handleDelete = () => {
        if (window.confirm(i18n.t(LanguageKey.COMMENT_DELETE_CONFIRM))) {
          context.emit(CommentEvents.Delete, props.comment.id)
        }
      }

      const scrollToCommentItem = (commentId: number) => {
        scrollToElementAnchor(getCommentItemElementID(commentId), -300)
      }

      return {
        LanguageKey,
        isDeleting,
        isDisqusAuthor,
        isAdminAuthor,
        isDeleteable,
        authorAvatar,
        authorURL,
        getCommentItemElementID,
        getReplyParentCommentText,
        firstUpperCase,
        handleVote,
        handleDelete,
        handleReply,
        handleCancelReply,
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

    /* reply */
    .cm-reply {
      padding-top: $lg-gap;
      padding-bottom: $sm-gap;
      padding-right: $sm-gap;
    }

    &.has-child {
      .cm-reply {
        padding-bottom: 0;
      }
    }

    &.is-child {
      margin-top: $xs-gap;
      padding-top: $xs-gap;
      border-top: 1px dashed $module-bg-darker-3;
      .cm-reply {
        padding-right: 0;
        padding-bottom: 0;
      }

      &:last-child {
        .cm-body {
          padding-bottom: 0;
        }
        .cm-reply {
          padding-bottom: $sm-gap;
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
        position: relative;
        display: block;
        width: $size;
        height: $size;
        border: 4px solid $module-bg-lighter;
        border-radius: $sm-radius;
        background-color: $module-bg-darker-2;

        img {
          width: 100%;
          height: 100%;
          border-radius: $xs-radius;
        }

        .role {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 40%;
          height: 40%;
          padding-top: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top-left-radius: $sm-radius;
          color: $white;
          &.disqus {
            background-color: rgba($disqus-primary, 0.5);
          }
          &.anonymous {
            background-color: $module-bg-translucent;
          }
        }
      }
    }

    .cm-body {
      display: block;
      width: 100%;
      height: 100%;
      padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 3);
      background-color: $module-bg-darker-1;
      border-radius: $xs-radius;
      @include background-transition();

      > .cm-header {
        position: relative;
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;
        }

        .username {
          font-weight: bold;
          margin-right: $gap;
          border-bottom: 1px solid transparent;
          &.url {
            &:hover {
              border-color: inherit;
            }
          }
        }

        .moderator {
          display: inline-block;
          margin-left: -$sm-gap;
          margin-right: $sm-gap;
          padding: 0 $xs-gap 0.1em;
          font-size: 11px;
          color: $text-reversal;
          background-color: $primary-lighter;
          @include radius-box($xs-radius);
        }

        .ua,
        .location {
          color: $text-divider;
          font-size: $font-size-small;
        }

        .location {
          margin-right: $gap;
        }

        .flool {
          color: $text-divider;
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
              color: $link-hover;
            }
          }
        }

        .markdown {
          margin: $sm-gap 0;
        }
      }

      .cm-footer {
        display: flex;
        justify-content: space-between;

        .create_at,
        .reply,
        .vote,
        .delete {
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

        .vote {
          &:hover,
          &.actived {
            color: $red;
          }
          &.actived,
          &.alived {
            .count {
              font-weight: bold;
            }
          }

          .count {
            margin-left: 3px;
          }
        }

        .delete {
          color: $text-divider;
          margin: 0;
          &:hover {
            color: $red;
          }
        }
      }
    }

    &:hover {
      .cm-body {
        background-color: $module-bg-hover;
      }
    }

    &.hide-avatar {
      padding: 0;
      margin-top: $gap;
      &.is-child {
        .cm-content {
          border-left: 6px solid $module-bg-darker-2;
          padding-left: 1rem;
        }
      }

      .cm-body {
        padding: $sm-gap $gap;
      }
    }
  }
</style>
