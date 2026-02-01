<script lang="ts" setup>
  import type { ThreadsMedia } from '/@/server/getters/threads'
  import Markdown from '/@/components/common/markdown.vue'
  import { useThreadsMediaUrl } from '../threads'

  const props = defineProps<{
    media: ThreadsMedia
  }>()

  const emit = defineEmits<{
    (e: 'click-image', url: string): void
    (e: 'click-video', url: string): void
  }>()

  const mediaUrl = useThreadsMediaUrl(props.media.media_url)
  const thumbnailUrl = useThreadsMediaUrl(props.media.thumbnail_url)
</script>

<template>
  <div class="threads-media-body">
    <markdown class="text" compact :markdown="media.text" :render-options="{ codeLineNumbers: false }" />
    <div class="media" :class="{ audio: media.media_type === 'AUDIO' }" v-if="mediaUrl">
      <audio class="audio" :src="mediaUrl" controls v-if="media.media_type === 'AUDIO'" />
      <div class="video" v-else-if="media.media_type === 'VIDEO'">
        <button class="play-button" @click="emit('click-video', mediaUrl)">
          <i class="iconfont icon-video-play"></i>
        </button>
        <img class="poster" :alt="thumbnailUrl ?? ''" :src="thumbnailUrl ?? ''" loading="lazy" draggable="false" />
      </div>
      <img
        v-else
        class="image"
        :alt="mediaUrl"
        :src="mediaUrl"
        loading="lazy"
        draggable="false"
        @click="emit('click-image', mediaUrl)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-media-body {
    &:hover {
      .text {
        color: $color-link;
      }

      .audio,
      .image,
      .video .poster {
        filter: saturate(1) brightness(1);
      }
    }

    .text {
      color: $color-text;
    }

    .media {
      // for Chrome video plugins
      position: relative;
      margin-top: $gap-xs;
    }

    .audio,
    .image,
    .video .poster {
      width: 100%;
      border-radius: $radius-tiny;
      filter: saturate(0.7) brightness(0.85);
      transition: filter $motion-duration-mid;
    }

    .image {
      min-height: 6rem;
      background-color: $module-bg-darker-1;
      cursor: pointer;
    }

    .video {
      position: relative;
      min-height: 10rem;
      background-color: #000;
      cursor: pointer;

      .play-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 3.5rem;
        z-index: $z-index-normal + 1;
        @include mix.color-transition();
        color: rgba(255, 255, 255, 0.6);
        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    .audio::-webkit-media-controls-enclosure {
      border-radius: $radius-xs;
    }
  }
</style>
