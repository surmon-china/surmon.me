<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { UserType } from '/@/stores/identity'
  import { LocalesKey } from '/@/locales'
  import { getCommentItemElementId } from '/@/constants/element-anchor'
  import { getCommentUrlHashById } from '/@/constants/element-anchor'
  import { APP_CONFIG } from '/@/configs/app.config'
  import { getGravatarByHash, getDisqusAvatarByUsername } from '/@/transforms/avatar'
  import { getPageURL, getAssetURL, getCdnProxyURL, getOriginalProxyURL } from '/@/transforms/url'
  import { getExtrasMap } from '/@/transforms/state'
  import { scrollToAnchor } from '/@/utils/scroller'
  import { copy } from '/@/utils/clipboard'
  import { Comment } from '/@/interfaces/comment'
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
    hiddenReply?: boolean
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

  const { route, cdnDomain, isCNUser, i18n: _i18n } = useEnhancer()
  const { commentStore, identityStore } = useStores()

  const commentExtrasMap = computed(() => getExtrasMap(props.comment.extras))
  const disqusAuthorId = computed(() => commentExtrasMap.value.get('disqus-author-id'))
  const disqusUsername = computed(() => commentExtrasMap.value.get('disqus-author-username'))
  const isDisqusAuthor = computed(() => !!disqusAuthorId.value)
  const isAdminAuthor = computed(() => {
    return (
      !!disqusUsername.value &&
      !!identityStore.disqusConfig &&
      disqusUsername.value === identityStore.disqusConfig.admin_username
    )
  })

  const authorAvatar = computed(() => {
    if (disqusUsername.value) {
      const avatar = getDisqusAvatarByUsername(disqusUsername.value)
      return isCNUser ? getOriginalProxyURL(avatar) : avatar
    } else {
      const emailHash = props.comment.author.email_hash
      if (!emailHash) return getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar)
      const gravatar = getGravatarByHash(emailHash)
      return isCNUser ? getCdnProxyURL(cdnDomain, gravatar) : gravatar
    }
  })

  const authorURL = computed(() => {
    if (props.comment.author.site) {
      return props.comment.author.site
    }
    if (disqusUsername.value) {
      return getDisqusUserURL(disqusUsername.value)
    }
    return undefined
  })

  const isDeletable = computed(() => {
    // 1. Disqus logged-in
    if (identityStore.user.type === UserType.Disqus) {
      // 2. Logged-in user ID === comment.author.disqus-author-id
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
    if (window.confirm(_i18n.t(LocalesKey.COMMENT_DELETE_CONFIRM))) {
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
              {{ comment.author.name }}
            </comment-link>
            <span class="moderator" v-if="isAdminAuthor">
              <i18n :k="LocalesKey.COMMENT_MODERATOR" />
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
              <i18n :k="LocalesKey.COMMENT_REPLY" />
            </span>
            <button class="parent" @click="scrollToCommentItem(comment.pid)">
              {{ getReplyParentCommentText(comment.pid) }}
            </button>
            <i18n zh="：" en=":" />
          </p>
          <div class="markdown">
            <markdown
              :markdown="comment.content"
              :compact="true"
              :render-options="{ sanitize: true, codeLineNumbers: false }"
            />
          </div>
        </div>
        <div class="cm-footer">
          <div class="left">
            <span class="create-at" data-allow-mismatch>
              <udate to="ago" :date="comment.created_at" />
            </span>
            <button
              class="vote"
              :class="{
                voted: liked,
                'has-count': Boolean(comment.likes)
              }"
              :disabled="liked"
              @click="handleVote(true)"
            >
              <i class="iconfont icon-like" />
              <i18n :k="LocalesKey.COMMENT_UPVOTE" v-if="!plainVote" />
              <span class="count">({{ comment.likes }})</span>
            </button>
            <button
              class="vote"
              :class="{
                voted: disliked,
                'has-count': Boolean(comment.dislikes)
              }"
              :disabled="disliked"
              @click="handleVote(false)"
            >
              <i class="iconfont icon-dislike" />
              <i18n :k="LocalesKey.COMMENT_DOWNVOTE" v-if="!plainVote" />
              <span class="count">({{ comment.dislikes }})</span>
            </button>
            <template v-if="!hiddenReply">
              <button class="reply" @click="handleCancelReply" v-if="isReply">
                <i class="iconfont icon-cancel" />
                <i18n :k="LocalesKey.COMMENT_REPLY_CANCEL" />
              </button>
              <button class="reply" @click="handleReply" v-else>
                <i class="iconfont icon-reply" />
                <i18n :k="LocalesKey.COMMENT_REPLY" />
              </button>
            </template>
          </div>
          <div class="right">
            <button class="delete" :disabled="commentStore.deleting" @click="handleDelete" v-if="isDeletable">
              <i class="iconfont icon-delete" />
              <i18n :k="LocalesKey.COMMENT_DELETE" />
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-item {
    position: relative;
    padding-left: 2rem;
    margin-top: $gap-lg;
    &:first-child {
      margin-top: 0;
    }

    /* reply */
    .cm-reply {
      padding-top: $gap-lg;
      padding-bottom: $gap-sm;
      padding-right: $gap-sm;
    }

    &.has-child {
      .cm-reply {
        padding-bottom: 0;
      }
    }

    &.is-child {
      margin-top: $gap-xs;
      padding-top: $gap-xs;
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
          padding-bottom: $gap-sm;
        }
      }

      .cm-avatar {
        top: $gap-lg * 2;
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
        border-radius: $radius-sm;
        background-color: $module-bg-darker-2;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border-radius: $radius-xs;
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
          border-top-left-radius: $radius-sm;
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
      padding: $gap-sm $gap-sm $gap-sm ($gap-lg * 3);
      background-color: $module-bg-darker-1;
      border-radius: $radius-xs;
      @include mix.background-transition();

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
            @include mix.text-underline();
          }
        }

        .moderator {
          display: inline-block;
          margin-left: -$gap-sm;
          margin-right: $gap-sm;
          padding: 0 $gap-xs 0.1em;
          white-space: nowrap;
          font-size: 11px;
          color: $color-text-reversal;
          background-color: $primary-lighter;
          border-radius: $radius-xs;
        }

        .author-info {
          display: inline-flex;
          align-items: center;
          font-size: $font-size-small;
          color: $color-text-divider;

          > * {
            margin-right: $gap;
            &:last-child {
              margin-right: 0;
            }
          }
        }

        .floor {
          color: $color-text-divider;
          font-size: $font-size-small;
          font-weight: bold;
          &:hover {
            color: $color-link;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
        }
      }

      > .cm-content {
        padding-right: $gap-xs;
        user-select: text;

        .reply {
          display: flex;
          align-items: center;
          margin-top: $gap-sm;
          margin-bottom: -$gap-xs;
          font-size: $font-size-h6;
          font-weight: bold;
          color: $color-text-disabled;

          .text {
            margin-right: $gap-xs;
          }

          .parent {
            font-weight: bold;
            color: $color-link;
            &:hover {
              color: $color-link-hover;
            }
          }
        }

        .markdown {
          margin: $gap-sm 0;
        }
      }

      .cm-footer {
        display: flex;
        justify-content: space-between;

        .create-at,
        .reply,
        .vote,
        .delete {
          color: $color-text-disabled;
          font-size: $font-size-small;
          margin-right: $gap;

          .iconfont {
            margin-right: $gap-xs;
          }
        }

        .reply {
          &:hover {
            color: $color-link;
          }
        }

        .vote {
          &:hover,
          &.voted {
            color: $red;
          }
          &.voted,
          &.has-count {
            .count {
              font-weight: bold;
            }
          }

          .count {
            margin-left: 3px;
          }
        }

        .delete {
          color: $color-text-divider;
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
        padding: $gap-sm $gap;
      }
    }
  }
</style>
