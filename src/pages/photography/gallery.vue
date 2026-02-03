<script lang="ts" setup>
  import { ref } from 'vue'
  import { isImageMediaIns, isVideoMediaIns, isAlbumMediaIns } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { IDENTITIES } from '/@/configs/app.config'
  import InstagramMedia from './media.vue'
  import InstagramAlbum from './album.vue'

  defineProps<{
    media: InstagramMediaItem
  }>()

  const isLoaded = ref(false)
  const mediaAspectRatio = ref('auto')

  const handleMediaLoad = async (payload: { width: number; height: number }) => {
    if (!isLoaded.value) {
      isLoaded.value = true
      mediaAspectRatio.value = `${payload.width} / ${payload.height}`
    }
  }
</script>

<template>
  <div class="instagram-gallery">
    <div class="topbar">
      <ulink class="type-link" :href="media.permalink">
        <i class="iconfont icon-video" v-if="isVideoMediaIns(media)"></i>
        <i class="iconfont icon-album" v-else-if="isAlbumMediaIns(media)"></i>
        <i class="iconfont icon-camera" v-else></i>
      </ulink>
      <span class="timestamp">
        <udate to="YMDm" :date="media.timestamp" separator="/" />
      </span>
    </div>
    <div class="content">
      <transition name="module">
        <div class="loading" v-if="!isLoaded">
          <loading-indicator gap="lg" width="1.8rem" height="1.2rem" />
        </div>
      </transition>
      <instagram-media
        v-if="isImageMediaIns(media) || isVideoMediaIns(media)"
        class="root-media"
        :class="{ loaded: isLoaded }"
        :style="{ aspectRatio: mediaAspectRatio }"
        :media="media"
        :lazy-image="true"
        :video-muted="false"
        :video-loop="true"
        :video-auto-play="true"
        @load="handleMediaLoad"
      />
      <instagram-album v-else-if="isAlbumMediaIns(media)" :media="media">
        <template #content="{ activeMedia, ghostMedia }">
          <div class="album-media" :class="{ loaded: isLoaded }" :style="{ aspectRatio: mediaAspectRatio }">
            <transition name="album-media-item" mode="out-in">
              <instagram-media
                v-if="activeMedia"
                :key="activeMedia.id"
                :media="activeMedia"
                :lazy-image="false"
                :video-muted="false"
                :video-loop="false"
                :video-auto-play="true"
                @load="handleMediaLoad"
              />
            </transition>
            <!-- Keep rendering a ghost media element to prevent container collapse during data switching. -->
            <instagram-media
              v-if="ghostMedia && isLoaded"
              :media="ghostMedia"
              :lazy-image="false"
              :video-muted="true"
              :video-loop="false"
              :video-auto-play="false"
              :style="{ display: 'contents', opacity: 0, visibility: 'hidden', pointerEvents: 'none' }"
            />
          </div>
        </template>
      </instagram-album>
      <p v-if="media.caption" class="caption" v-html="media.caption.replaceAll('\n', '<br>')"></p>
      <ulink class="username-link" :href="media.permalink">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</ulink>
    </div>
  </div>
</template>

<style lang="scss">
  @use '/src/styles/base/variables' as *;

  .album-media-item-enter-active,
  .album-media-item-leave-active {
    transition: opacity $motion-duration-fast ease;
  }
  .album-media-item-enter-from,
  .album-media-item-leave-to {
    opacity: 0;
  }
</style>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .instagram-gallery {
    position: relative;
    background: $black;

    .content {
      position: relative;

      .root-media,
      .album-media {
        width: 32rem;
        height: 46rem;
        max-width: 60vw;
        max-height: 68vh;
        will-change: width, height, aspect-ratio;
        // MARK: important for size animation
        // interpolate-size: allow-keywords;
        // transition:
        //   width 0.15s cubic-bezier(0.65, 0.05, 0.36, 1),
        //   height 0.15s cubic-bezier(0.65, 0.05, 0.36, 1),
        //   aspect-ratio 0.15s cubic-bezier(0.65, 0.05, 0.36, 1);

        &.loaded {
          // MARK: important for Safari and Firefox!
          // ✅ fit-content
          // ❌ max-content
          width: fit-content;
          height: fit-content;
          max-width: 88vw;
          max-height: 84vh;
        }
      }

      .caption {
        position: absolute;
        left: 0;
        bottom: 2.8rem;
        margin: 0;
        width: 100%;
        padding: 2rem;
        @include mix.title-shadow();
      }

      .username-link {
        position: absolute;
        left: 2rem;
        bottom: 2rem;
        margin: 0;
        font-weight: bold;
        font-family: $font-family-monospace;
        @include mix.title-shadow();
      }

      .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
    }

    .topbar {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0 $gap;
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: $z-index-normal + 2;

      .type-link {
        font-size: $font-size-h4;
        color: $white;
      }

      .timestamp {
        font-size: $font-size-secondary;
        font-weight: bold;
        color: $white;
      }
    }
  }
</style>
