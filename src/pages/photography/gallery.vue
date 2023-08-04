<script lang="ts" setup="">
  import { ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCountry } from '/@/app/context'
  import { isCNCode } from '/@/transforms/region'
  import { isVideoMediaIns, isAlbumMediaIns } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { IDENTITIES } from '/@/config/app.config'
  import { getProxyURL } from '/@/transforms/url'
  import InstagramAlbum from './album.vue'

  defineProps<{
    media: InstagramMediaItem
    index: number
    count: number
  }>()

  const { cdnDomain } = useEnhancer()
  const isLoaded = ref(false)
  const mediaLoaded = () => {
    isLoaded.value = true
  }

  const getMediaUrl = (url: string) => {
    const countryCode = useCountry()
    const isCNUser = Boolean(countryCode && isCNCode(countryCode))
    return isCNUser ? getProxyURL(cdnDomain, url) : url
  }
</script>

<template>
  <div class="instagram-gallery">
    <div class="topbar">
      <div class="left">
        <ulink class="type-link" :href="media.permalink">
          <i class="iconfont icon-video" v-if="isVideoMediaIns(media)"></i>
          <i class="iconfont icon-album" v-else-if="isAlbumMediaIns(media)"></i>
          <i class="iconfont icon-camera" v-else></i>
        </ulink>
        <ulink class="username-link" :href="media.permalink">
          <span>@{{ IDENTITIES.INSTAGRAM_USERNAME }}</span>
        </ulink>
      </div>
      <div class="center">
        <span class="pagination">{{ index + 1 }} / {{ count }}</span>
      </div>
      <div class="right">
        <span class="timestamp">
          <udate to="YMDm" :date="media.timestamp" separator="/" />
        </span>
      </div>
    </div>
    <div class="content" :class="{ loaded: isLoaded }">
      <transition name="module">
        <div class="loading" v-if="!isLoaded">
          <spin />
        </div>
      </transition>
      <video
        v-if="isVideoMediaIns(media)"
        class="video"
        :src="getMediaUrl(media.media_url)"
        autoplay
        @loadeddata="mediaLoaded"
      />
      <instagram-album v-else-if="isAlbumMediaIns(media)" class="album" :media="media" @load="mediaLoaded">
        <template #child="{ activeMedia }">
          <img
            class="image"
            :src="getMediaUrl(activeMedia?.media_url)"
            :alt="activeMedia?.caption"
            loading="lazy"
            draggable="false"
          />
        </template>
      </instagram-album>
      <img
        v-else
        class="image"
        :src="getMediaUrl(media?.media_url)"
        :alt="media.caption"
        draggable="false"
        loading="lazy"
        @load="mediaLoaded"
      />
      <p v-if="media.caption" class="caption" v-html="media.caption.replaceAll('\n', '<br>')"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .instagram-gallery {
    position: relative;
    background: $black !important;

    .content {
      position: relative;

      .loading {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .image,
      .album,
      .video {
        min-width: 32rem;
        max-width: 32rem;
        min-height: 48vh;
        max-height: 48vh;
        width: auto;
        height: auto;
        overflow: hidden;
        transition:
          max-width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
          max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &.loaded {
        .image,
        .album,
        .video {
          max-width: 94vw;
          max-height: 86vh;
        }
      }

      .caption {
        position: absolute;
        left: 0;
        bottom: 0;
        margin: 0;
        width: 100%;
        padding: 2em;
        font-size: $font-size-base + 1;
        @include title-shadow();
      }
    }

    .topbar {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0 1em;
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $font-size-h4;
      color: $white;
      z-index: $z-index-normal + 2;

      .left,
      .right,
      .center {
        display: inline-flex;
        align-items: center;
      }
      .left {
        width: 40%;
        justify-content: start;
      }
      .center {
        width: 20%;
        justify-content: center;
      }
      .right {
        width: 40%;
        justify-content: end;
      }

      .pagination {
        font-weight: bold;
      }

      .timestamp {
        font-size: $font-size-base - 1;
        font-weight: bold;
      }

      .type-link {
        color: $white;
      }

      .username-link {
        margin-left: $sm-gap;
        color: $white;
        font-size: $font-size-base - 1;
        font-family: system-ui;
        font-weight: bold;
      }
    }
  }
</style>