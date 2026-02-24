<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { getGravatarByHash, getDisqusAvatarByUsername } from '/@/transforms/avatar'
  import { getAssetURL, getCdnProxyURL } from '/@/transforms/url'
  import { APP_CONFIG } from '/@/configs/app.config'
  import type { Comment } from '/@/interfaces/comment'
  import type { CommentMeta } from './item.vue'

  const props = defineProps<{
    comment: Comment
    meta: CommentMeta
  }>()

  const { cdnDomain, isCNUser } = useEnhancer()

  const getAuthorAvatarUrl = () => {
    const defaultAvatar = getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar)
    if (props.meta.isGhostUser) {
      return getAssetURL(cdnDomain, '/images/anonymous.png')
    }
    if (props.comment.user) {
      const userAvatar = props.comment.user.avatar_url
      return userAvatar ? (isCNUser ? getCdnProxyURL(cdnDomain, userAvatar) : userAvatar) : defaultAvatar
    }
    if (props.meta.isDisqusAuthor && props.meta.disqusUsername) {
      const disqusAvatar = getDisqusAvatarByUsername(props.meta.disqusUsername)
      return isCNUser ? getCdnProxyURL(cdnDomain, disqusAvatar) : disqusAvatar
    }
    if (props.comment.author_email_hash) {
      const gravatar = getGravatarByHash(props.comment.author_email_hash)
      return isCNUser ? getCdnProxyURL(cdnDomain, gravatar) : gravatar
    }
    return defaultAvatar
  }
</script>

<template>
  <div class="comment-avatar">
    <div class="ai-avatar" v-if="meta.isAiGenerated">
      <div class="ai-brand">
        <i class="iconfont icon-robot"></i>
      </div>
    </div>
    <div class="author-avatar" v-else>
      <img :src="getAuthorAvatarUrl()" :alt="comment.author_name" draggable="false" />
      <span class="role" v-if="comment.user || meta.isDisqusAuthor">
        <i class="iconfont icon-user" v-if="comment.user"></i>
        <i class="iconfont icon-disqus" v-else></i>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $avatar-size: 3.4rem;

  .comment-avatar {
    .ai-avatar,
    .author-avatar {
      position: relative;
      display: block;
      width: $avatar-size;
      height: $avatar-size;
      border: 4px solid $module-bg-lighter;
      border-radius: $radius-sm;
      background-color: $module-bg-darker-2;
      overflow: hidden;
    }

    .ai-avatar {
      .ai-brand {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: $radius-xs;
        background-color: $primary-lighter;
        background: $ai-primary-gradient;
        opacity: 0.8;

        .iconfont {
          color: $white;
          font-size: $font-size-h1;
        }
      }
    }

    .author-avatar {
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
        border-top-left-radius: $radius-xs;
        background-color: rgb(255 255 255 / 0.2);
        color: $white;
      }
    }
  }
</style>
