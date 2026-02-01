<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { getYouTubeVideoEmbedURL } from '/@/transforms/media'
  import YoutubeVideoList from './videos.vue'

  defineProps<{
    playlists: Array<any>
  }>()

  const modelIframeLoaded = ref(false)
  const youtubeModalVideo = ref<any>(null)
  const isOnYouTubeModal = computed(() => Boolean(youtubeModalVideo.value))
  const youTubeModalURL = computed(() => {
    const video = youtubeModalVideo.value
    return video ? getYouTubeVideoEmbedURL(video.snippet.resourceId.videoId, video.snippet.playlistId) : undefined
  })

  const openYouTubeModal = (video: any) => {
    modelIframeLoaded.value = false
    youtubeModalVideo.value = video
  }

  const closeYouTubeModal = () => {
    youtubeModalVideo.value = null
    modelIframeLoaded.value = false
  }

  const handleVideoIframeLoaded = () => {
    modelIframeLoaded.value = true
  }
</script>

<template>
  <div class="youtube-playlist">
    <ul class="playlist">
      <li class="item" :title="list.title" :key="index" v-for="(list, index) in playlists">
        <slot name="title" v-bind="{ list, index }"></slot>
        <youtube-video-list :playlist-id="list.id" @view="openYouTubeModal">
          <template #empty>
            <slot name="empty"></slot>
          </template>
          <template #loading>
            <slot name="loading"></slot>
          </template>
        </youtube-video-list>
      </li>
    </ul>
    <client-only>
      <popup :visible="isOnYouTubeModal" :scroll-closable="false" @close="closeYouTubeModal">
        <div class="youtube-modal">
          <iframe
            class="youtube-iframe"
            :src="youTubeModalURL"
            @load="handleVideoIframeLoaded"
            @error="handleVideoIframeLoaded"
          />
          <transition name="module">
            <div class="loading" v-if="!modelIframeLoaded">
              <loading-indicator gap="lg" width="2.4rem" height="1.2rem" />
            </div>
          </transition>
        </div>
      </popup>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .youtube-modal {
    position: relative;
    width: 88vw;
    height: 82vh;
    background: $black;

    .youtube-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: $z-index-normal + 2;
      display: flex;
      justify-content: center;
    }
  }

  .youtube-playlist {
    .playlist {
      padding: 0;
      list-style: none;
      margin-block: 3rem;
    }
  }
</style>
