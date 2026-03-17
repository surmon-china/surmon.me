<script lang="ts" setup>
  import type { ThreadsMedia } from '/@/server/getters/threads'
  import { useThreadsMediaUrl } from '../threads'
  import ThreadsText from '../threads-text.vue'

  const props = defineProps<{
    media: ThreadsMedia
  }>()

  const emit = defineEmits<{
    (e: 'click-image', url: string): void
  }>()

  const mediaUrl = useThreadsMediaUrl(props.media.media_url)
</script>

<template>
  <div class="threads-media-card">
    <div class="media" :class="{ audio: media.media_type === 'AUDIO' }" v-if="mediaUrl">
      <audio class="audio" :src="mediaUrl" controls v-if="media.media_type === 'AUDIO'" />
      <video class="video" :src="mediaUrl" controls v-else-if="media.media_type === 'VIDEO'" />
      <img
        class="image"
        :alt="media.text"
        :src="mediaUrl"
        loading="lazy"
        draggable="false"
        @click="emit('click-image', mediaUrl)"
        v-else
      />
    </div>
    <threads-text class="text" :text="media.text" v-if="!!media.text" />
    <div class="footer">
      <ulink class="link" :title="media.username" :href="media.permalink">
        <i class="iconfont icon-repost" v-if="media.is_quote_post"></i>
        <i class="iconfont icon-threads" v-else></i>
        <span class="username">threads</span>
      </ulink>
      <div class="timestamp">
        <udate to="ago" :date="media.timestamp" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-media-card {
    @include mix.radius-box($radius-sm);
    @include mix.common-bg-module($motion-duration-fast);

    .media {
      .image,
      .video,
      .audio {
        width: 100%;
      }

      .image {
        background-color: $module-bg-darker-1;
        min-height: 2rem;
      }

      .video {
        background-color: $module-bg-darker-1;
        min-height: 6rem;
      }

      .audio::-webkit-media-controls-enclosure {
        border-radius: $radius-xs;
      }
    }

    .text {
      padding: $gap-tiny 0.65em;
    }

    .text + .footer {
      margin-top: 0.1em;
    }

    .media + .footer {
      margin-top: $gap-xs;
    }

    .footer {
      margin-bottom: $gap-xs;
      padding-inline: 0.65em;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .link {
        font-size: $font-size-h6;
        color: $color-text;
        line-height: 1;

        .iconfont {
          margin-right: 1px;
        }

        .username {
          font-family: $font-family-monospace;
          font-weight: bold;
        }
      }

      .timestamp {
        font-size: $font-size-h6;
        color: $color-text-secondary;
      }
    }
  }
</style>
