<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCommentStore } from '/@/stores/comment'
  import { useIdentityStore, UserType } from '/@/stores/identity'
  import { getCommentItemElementId } from '/@/constants/anchor'
  import { getCommentUrlHashById } from '/@/constants/anchor'
  import { LanguageKey } from '/@/language'
  import { UNDEFINED } from '/@/constants/value'
  import { Comment } from '/@/interfaces/comment'
  import { getGravatarByHash, getDisqusAvatarByUsername, DEFAULT_AVATAR } from '/@/transforms/avatar'
  import { getPageURL, getAssetURL, getProxyURL, getOriginalProxyURL } from '/@/transforms/url'
  import { getExtendValue } from '/@/transforms/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToAnchor } from '/@/utils/scroller'
  import { copy } from '/@/utils/clipboard'
  import Markdown from '/@/components/common/markdown.vue'
  import CommentLink from './link.vue'
  import CommentLocation from './location.vue'
  import CommentUserAgent from './user-agent.vue'
  import { CommentEvents, getDisqusUserURL } from '../helper'

  const props = defineProps<{
    comment: Comment
    liked?: boolean
    disliked?: boolean
    isReply?: boolean
    isChild?: boolean
    hasChild?: boolean
    hiddenAvatar?: boolean
    hiddenUa?: boolean
    hiddenLocation?: boolean
    plainVote?: boolean
  }>()

  const emit = defineEmits<{
    (e: CommentEvents.Vote, commentId: number, isLike: boolean): void
    (e: CommentEvents.Delete, commentId: number): void
    (e: CommentEvents.Reply, commentId: number): void
    (e: CommentEvents.CancelReply, commentId: number): void
  }>()

  const { route, i18n: _i18n, cdnDomain } = useEnhancer()
  const commentStore = useCommentStore()
  const identityStore = useIdentityStore()
  const isDeleting = computed(() => commentStore.deleting)

  const disqusAuthorId = computed(() => {
    return getExtendValue(props.comment.extends, 'disqus-author-id')
  })
  const disqusUsername = computed<string | void>(() => {
    return getExtendValue(props.comment.extends, 'disqus-author-username')
  })

  const isDisqusAuthor = computed(() => Boolean(disqusAuthorId.value))
  const isAdminAuthor = computed(() => {
    return (
      Boolean(disqusUsername.value) &&
      Boolean(identityStore.disqusConfig) &&
      disqusUsername.value === identityStore.disqusConfig.admin_username
    )
  })

  const authorAvatar = computed(() => {
    return disqusUsername.value
      ? getOriginalProxyURL(getDisqusAvatarByUsername(disqusUsername.value))
      : props.comment.author.email_hash
        ? getProxyURL(cdnDomain, getGravatarByHash(props.comment.author.email_hash))
        : getAssetURL(cdnDomain, DEFAULT_AVATAR)
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
    if (identityStore.user.type === UserType.Disqus) {
      // 2. Logined user ID === comment.author.disqus-author-id
      if (disqusAuthorId.value) {
        return identityStore.user.disqusProfile?.id === disqusAuthorId.value
      }
    }
    return false
  })

  const getReplyParentCommentText = (parentId: number) => {
    const authorName = commentStore.comments.find((comment) => comment.id === parentId)?.author.name
    const nameText = authorName ? `@${authorName}` : ''
    const idText = `#${parentId}`
    return `${idText} ${nameText}`
  }

  const handleReply = () => {
    emit(CommentEvents.Reply, props.comment.id)
  }

  const handleCancelReply = () => {
    emit(CommentEvents.CancelReply, props.comment.id)
  }

  const handleVote = (isLike: boolean) => {
    emit(CommentEvents.Vote, props.comment.id, isLike)
  }

  const handleDelete = () => {
    if (window.confirm(_i18n.t(LanguageKey.COMMENT_DELETE_CONFIRM))) {
      emit(CommentEvents.Delete, props.comment.id)
    }
  }

  const handleCopyFloor = () => {
    copy(getPageURL(route.path, getCommentUrlHashById(props.comment.id)))
  }

  const scrollToCommentItem = (commentId: number) => {
    scrollToAnchor(getCommentItemElementId(commentId), -300)
  }
</script>

<template>
  <li
    class="comment-item"
    :key="comment.id"
    :id="getCommentItemElementId(comment.id)"
    :class="{
      'hide-avatar': hiddenAvatar,
      'is-child': isChild,
      'has-child': hasChild
    }"
  >
    <div>
      <div class="cm-avatar" v-if="!hiddenAvatar">
        <comment-link class="link" :href="authorURL">
          <img :src="authorAvatar" :alt="comment.author.name" draggable="false" />
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
            <span class="author-info">
              <template v-if="comment.ip_location && !hiddenLocation">
                <comment-location :location="comment.ip_location" />
              </template>
              <template v-if="comment.agent && !hiddenUa">
                <comment-user-agent :user-agent="comment.agent" />
              </template>
            </span>
          </div>
          <div class="right">
            <button class="floor" @click="handleCopyFloor">#{{ comment.id }}</button>
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
            <markdown :markdown="comment.content" :compact="true" :render-options="{ sanitize: true }" />
          </div>
        </div>
        <div class="cm-footer">
          <div class="left">
            <span class="create-at">
              <udate to="ago" :date="comment.created_at" />
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

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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
          overflow: hidden;
        }

        .right {
          padding-left: 1em;
        }

        .username {
          font-weight: bold;
          margin-right: $gap;
          &.url:hover {
            @include text-underline();
          }
        }

        .moderator {
          display: inline-block;
          margin-left: -$sm-gap;
          margin-right: $sm-gap;
          padding: 0 $xs-gap 0.1em;
          white-space: nowrap;
          font-size: 11px;
          color: $text-reversal;
          background-color: $primary-lighter;
          border-radius: $xs-radius;
        }

        .author-info {
          display: inline-flex;
          align-items: center;
          font-size: $font-size-small;
          color: $text-divider;

          > * {
            margin-right: $gap;
            &:last-child {
              margin-right: 0;
            }
          }
        }

        .floor {
          color: $text-divider;
          font-size: $font-size-small;
          font-weight: bold;
          &:hover {
            color: $link-color;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
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

        .create-at,
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
