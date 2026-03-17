<script lang="ts" setup>
  import { type ThreadsMedia } from '/@/server/getters/threads'
  import { useThreadsMediaUrl } from '../threads'

  const props = defineProps<{
    mediaType: ThreadsMedia['media_type']
    mediaUrl: string
    thumbnailUrl?: string
  }>()

  const emit = defineEmits<{
    (e: 'click-image', url: string): void
    (e: 'click-video', url: string): void
  }>()

  const mediaUrl = useThreadsMediaUrl(props.mediaUrl)!
  const thumbnailUrl = useThreadsMediaUrl(props.thumbnailUrl)
</script>

<template>
  <div class="threads-media" :class="{ audio: mediaType === 'AUDIO' }">
    <audio class="audio" :src="mediaUrl" controls v-if="mediaType === 'AUDIO'" />
    <div class="video" v-else-if="mediaType === 'VIDEO'">
      <button class="play-button" @click="emit('click-video', mediaUrl)">
        <i class="iconfont icon-video-play"></i>
      </button>
      <img
        class="poster"
        :alt="thumbnailUrl ?? ''"
        :src="thumbnailUrl ?? ''"
        loading="lazy"
        draggable="false"
      />
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
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-media {
    // for Chrome video plugins
    position: relative;

    .audio::-webkit-media-controls-enclosure {
      border-radius: $radius-xs;
    }

    .audio,
    .image,
    .video .poster {
      width: 100%;
      @include mix.radius-box($radius-tiny);
    }

    .image {
      min-height: 3rem;
      background-color: $module-bg-darker-1;
      cursor: pointer;
    }

    .video {
      min-height: 8rem;
      background-color: #000;
      cursor: pointer;
      position: relative;

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
  }
</style>
