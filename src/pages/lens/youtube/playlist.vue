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
      <popup :visible="isOnYouTubeModal" @close="closeYouTubeModal">
        <iframe
          class="youtube-modal"
          :src="getYouTubeVideoEmbedURL(youtubeModalVideo.snippet.resourceId.videoId)"
        />
      </popup>
    </client-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { getYouTubeVideoEmbedURL } from '/@/transforms/media'
  import YoutubeVideoList from './videos.vue'

  export default defineComponent({
    name: 'LensPageYoutubePlaylist',
    components: {
      YoutubeVideoList
    },
    props: {
      playlists: {
        type: Array as PropType<Array<any>>,
        required: true
      }
    },
    setup() {
      const youtubeModalVideo = ref<any>(null)
      const isOnYouTubeModal = computed(() => Boolean(youtubeModalVideo.value))
      const openYouTubeModal = (video: any) => {
        youtubeModalVideo.value = video
      }
      const closeYouTubeModal = () => {
        youtubeModalVideo.value = null
      }

      return {
        getYouTubeVideoEmbedURL,
        isOnYouTubeModal,
        youtubeModalVideo,
        openYouTubeModal,
        closeYouTubeModal
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .youtube-modal {
    width: 88vw;
    height: 76vh;
    position: relative;
    background: $black !important;
  }

  .youtube-playlist {
    .playlist {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
</style>
