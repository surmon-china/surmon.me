<script lang="ts" setup>
  import type { ThreadsMedia } from '/@/server/getters/threads'
  import Markdown from '/@/components/common/markdown.vue'
  import { useThreadsMediaUrl } from '../threads'

  const props = defineProps<{
    media: ThreadsMedia
  }>()

  const emit = defineEmits<{
    (e: 'click-image', url: string): void
  }>()

  const mediaUrl = useThreadsMediaUrl(props.media.media_url)
</script>

<template>
  <div class="threads-media-body">
    <markdown class="text" compact :markdown="media.text" :render-options="{ codeLineNumbers: false }" />
    <div class="media" :class="{ audio: media.media_type === 'AUDIO' }" v-if="mediaUrl">
      <audio class="audio" :src="mediaUrl" controls v-if="media.media_type === 'AUDIO'" />
      <video class="video" :src="mediaUrl" controls v-else-if="media.media_type === 'VIDEO'" />
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
    }

    .text {
      color: $color-text;
    }

    .media {
      margin-top: $gap-sm;

      .image,
      .video,
      .audio {
        width: 100%;
        border-radius: $radius-xs;
      }

      .image {
        background-color: $module-bg-darker-1;
        min-height: 6rem;
        cursor: pointer;
      }

      .video {
        background-color: $module-bg-darker-1;
        min-height: 14rem;
      }

      .audio::-webkit-media-controls-enclosure {
        border-radius: $radius-xs;
      }
    }
  }
</style>
