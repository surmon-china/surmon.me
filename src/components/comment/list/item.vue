<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useHistoryStore } from '/@/stores/history'
  import { useCommentStore } from '/@/stores/comment'
  import { getCommentItemElementId } from '/@/constants/element-anchor'
  import { LocalesKey } from '/@/locales'
  import { UserType } from '/@/interfaces/user'
  import { Comment, CommentAuthorStatus } from '/@/interfaces/comment'
  import { getExtrasMap } from '/@/transforms/extra'

  import CommentMarkdown from '../markdown.vue'
  import CommentAvatar from './item-avatar.vue'
  import CommentUsername from './item-username.vue'
  import CommentLocation from './item-location.vue'
  import CommentUserAgent from './item-user-agent.vue'
  import CommentReplyParent from './item-reply-parent.vue'
  import CommentAiInfo from './item-ai-info.vue'
  import CommentFloor from './item-floor.vue'

  export interface CommentMeta {
    isAiGenerated: boolean
    aiProvider?: string
    aiModel?: string
    isDisqusAuthor: boolean
    disqusUsername?: string
    isModeratorUser: boolean
    isPatronUser: boolean
    isGhostUser: boolean
  }

  const props = defineProps<{
    comment: Comment
    isReplying?: boolean
    isInChildList?: boolean
    hasChildren?: boolean
    hiddenReply?: boolean
    hiddenAvatar?: boolean
    hiddenLocation?: boolean
    hiddenUserAgent?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'like', commentId: number): void
    (e: 'dislike', commentId: number): void
    (e: 'delete', commentId: number): void
    (e: 'reply', commentId: number): void
    (e: 'cancel-reply', commentId: number): void
  }>()

  const { identity, i18n: _i18n } = useEnhancer()

  const commentStore = useCommentStore()
  const historyStore = useHistoryStore()

  const commentMeta = computed<CommentMeta>(() => {
    const extrasMap = getExtrasMap(props.comment.extras)
    return {
      isAiGenerated: extrasMap.has('ai-generated'),
      aiProvider: extrasMap.get('ai-provider'),
      aiModel: extrasMap.get('ai-model'),
      isDisqusAuthor: !!extrasMap.get('disqus-author-id'),
      disqusUsername: extrasMap.get('disqus-author-username'),
      isModeratorUser: props.comment.user?.type === UserType.Moderator,
      isPatronUser: props.comment.user?.type === UserType.Patron,
      isGhostUser: props.comment.author_status === CommentAuthorStatus.Ghost
    }
  })

  const isDeletable = computed(() => {
    return Boolean(
      identity.isUser &&
      identity.userProfile &&
      props.comment.user &&
      props.comment.user.id === identity.userProfile.id
    )
  })
</script>

<template>
  <li
    class="comment-item"
    :id="getCommentItemElementId(comment.id)"
    :class="{
      'hide-avatar': hiddenAvatar,
      'in-child-list': isInChildList,
      'has-children': hasChildren
    }"
  >
    <comment-avatar class="cm-avatar" :comment="comment" :meta="commentMeta" v-if="!hiddenAvatar" />
    <div class="cm-body">
      <div class="cm-header">
        <div class="left">
          <comment-username class="cm-username" :comment="comment" :meta="commentMeta" />
          <span class="author-info">
            <comment-ai-info :comment="comment" :meta="commentMeta" v-if="commentMeta.isAiGenerated" />
            <comment-location :location="comment.ip_location" v-if="comment.ip_location && !hiddenLocation" />
            <comment-user-agent
              :user-agent="comment.user_agent"
              v-if="comment.user_agent && !hiddenUserAgent"
            />
          </span>
        </div>
        <div class="right">
          <comment-floor :comment="comment" />
        </div>
      </div>
      <div class="cm-content">
        <comment-reply-parent :comment="comment" v-if="comment.parent_id" />
        <comment-markdown :content="comment.content" />
      </div>
      <div class="cm-footer">
        <div class="left">
          <span class="create-at">
            <udate to="ago" :date="comment.created_at" />
          </span>
          <button
            class="vote"
            :data-count="comment.likes"
            :class="{ voted: historyStore.isLikedComment(comment.id) }"
            :disabled="historyStore.isLikedComment(comment.id)"
            @click="emit('like', comment.id)"
          >
            <i class="iconfont icon-like" />
            <span class="count">({{ comment.likes }})</span>
          </button>
          <button
            class="vote"
            :data-count="comment.dislikes"
            :class="{ voted: historyStore.isDislikedComment(comment.id) }"
            :disabled="historyStore.isDislikedComment(comment.id)"
            @click="emit('dislike', comment.id)"
          >
            <i class="iconfont icon-dislike" />
            <span class="count">({{ comment.dislikes }})</span>
          </button>
          <template v-if="!hiddenReply && !commentMeta.isAiGenerated">
            <button class="reply" @click="emit('cancel-reply', comment.id)" v-if="isReplying">
              <i class="iconfont icon-cancel" />
              <i18n :k="LocalesKey.COMMENT_REPLY_CANCEL" />
            </button>
            <button class="reply" @click="emit('reply', comment.id)" v-else>
              <i class="iconfont icon-reply" />
              <i18n :k="LocalesKey.COMMENT_REPLY" />
            </button>
          </template>
        </div>
        <div class="right">
          <button
            class="delete"
            :disabled="commentStore.deleting"
            @click="emit('delete', comment.id)"
            v-if="isDeletable"
          >
            <i class="iconfont icon-delete" />
            <i18n :k="LocalesKey.COMMENT_DELETE" />
          </button>
        </div>
      </div>
      <div class="cm-reply" v-if="isReplying">
        <slot name="reply"></slot>
      </div>
      <div class="cm-children">
        <slot name="children"></slot>
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
    margin-top: $gap;
    &:first-child {
      margin-top: 0;
    }

    /* reply */
    .cm-reply {
      padding-top: $gap;
      padding-bottom: $gap-tiny;
      padding-right: $gap-tiny;
    }

    &.has-children {
      .cm-reply {
        padding-bottom: 0;
      }
    }

    &.in-child-list {
      margin-top: $gap-tiny;
      padding-top: $gap-tiny;
      border-top: 1px dashed $module-bg-darker-3;

      .cm-avatar {
        top: 1.8rem;
      }

      .cm-reply {
        padding-right: 0;
        padding-bottom: 0;
      }

      &:last-child {
        .cm-body {
          padding-bottom: 0;
        }
        .cm-reply {
          padding-bottom: $gap-tiny;
        }
      }
    }

    .cm-avatar {
      position: absolute;
      left: 0;
      top: 1.2rem;
    }

    .cm-body {
      display: block;
      width: 100%;
      height: 100%;
      padding: $gap-xs $gap-xs $gap-xs 2.1rem;
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

        .author-info {
          display: inline-flex;
          align-items: center;
          column-gap: $gap-sm;
          font-size: $font-size-tertiary;
          color: $color-text-divider;
        }
      }

      > .cm-content {
        user-select: text;
      }

      .cm-footer {
        display: flex;
        justify-content: space-between;

        .create-at,
        .reply,
        .vote,
        .delete {
          color: $color-text-disabled;
          font-size: $font-size-tertiary;
          margin-right: $gap;
        }

        .vote {
          &:hover,
          &.voted {
            color: $red;
          }

          &.voted,
          &:not([data-count='0']) {
            .count {
              font-weight: bold;
            }
          }

          .count {
            margin-left: 3px;
          }
        }

        .reply {
          &:hover {
            color: $color-link;
          }

          .iconfont {
            margin-right: $gap-tiny;
          }
        }

        .delete {
          margin: 0;
          color: $color-text-divider;
          &:hover {
            color: $red;
          }

          .iconfont {
            margin-right: $gap-tiny;
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

      &.in-child-list {
        .cm-content {
          border-left: 6px solid $module-bg-darker-2;
          padding-left: $gap-sm;
        }
      }

      .cm-body {
        padding: $gap-xs $gap-sm;
      }
    }
  }
</style>
