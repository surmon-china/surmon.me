<script lang="ts" setup>
  import { computed } from 'vue'
  import { LocalesKey } from '/@/locales'
  import type { Comment } from '/@/interfaces/comment'
  import type { CommentMeta } from './item.vue'

  const props = defineProps<{
    comment: Comment
    meta: CommentMeta
  }>()

  const authorName = computed(() => {
    return props.comment.user?.name ?? props.comment.author_name
  })

  const authorUrl = computed(() => {
    if (props.comment.author_website) {
      return props.comment.author_website
    }
    if (props.comment.user?.website) {
      return props.comment.user?.website
    }
    if (props.meta.disqusUsername) {
      return `https://disqus.com/by/${props.meta.disqusUsername}/`
    }
    return null
  })
</script>

<template>
  <div class="comment-username">
    <span class="username ai" v-if="meta.isAiGenerated">
      <i18n :k="LocalesKey.COMMENT_AI_ASSISTANT" />
    </span>
    <span class="username ghost" v-else-if="meta.isGhostUser">
      <i18n :k="LocalesKey.COMMENT_GHOST_USER" />
    </span>
    <a
      class="username link"
      :class="{ patron: meta.isPatronUser, moderator: meta.isModeratorUser }"
      target="_blank"
      rel="external nofollow noopener"
      :href="authorUrl"
      v-else-if="authorUrl"
    >
      {{ authorName }}
    </a>
    <span class="username" :class="{ patron: meta.isPatronUser }" v-else>
      {{ authorName }}
    </span>
    <span class="badge ai" v-if="meta.isAiGenerated">AI</span>
    <span class="badge patron" v-else-if="meta.isPatronUser">
      <i18n :k="LocalesKey.COMMENT_PATRON" />
    </span>
    <span class="badge moderator" v-else-if="meta.isModeratorUser">
      <i18n :k="LocalesKey.COMMENT_MODERATOR" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-username {
    display: inline-flex;
    align-items: center;
    margin-right: $gap-sm;

    .username {
      text-transform: capitalize;
      font-weight: bold;

      &.ai {
        font-size: $font-size-secondary;
        text-transform: uppercase;
      }

      &.ghost {
        color: $color-text-disabled;
      }

      &.link:hover {
        @include mix.text-underline();
      }
    }

    .badge {
      display: inline-block;
      margin-left: $gap-tiny;
      padding-inline: 0.26em;
      height: $font-size-root;
      line-height: $font-size-root;
      white-space: nowrap;
      font-size: $font-size-quaternary;
      border-radius: $radius-xs;

      &.moderator {
        background-color: $user-primary-moderator;
        color: $white;
      }

      &.patron {
        background-color: $user-primary-patron;
        color: $white;
      }

      &.ai {
        padding-inline: 0.3em;
        height: $font-size-base;
        line-height: $font-size-base;
        background-image: $ai-primary-gradient;
        color: $white;
        opacity: 0.8;
      }
    }
  }
</style>
