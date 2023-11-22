<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useInstagramTimelineStore } from '/@/stores/media'
  import {
    isVideoMediaIns,
    isAlbumMediaIns,
    getInstagramCoverURL,
    getInstagramThumbnail
  } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { getOriginalProxyURL } from '/@/transforms/url'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  const fetching = ref(true)
  const igTimelineStore = useInstagramTimelineStore()
  const igMedias = computed(() => igTimelineStore.data?.data.slice(0, 23) ?? [])
  const getMediaThumbnail = (media: InstagramMediaItem) => {
    return getOriginalProxyURL(
      isVideoMediaIns(media) ? getInstagramCoverURL(media) : getInstagramThumbnail(media, 't')
    )
  }

  onMounted(() => {
    igTimelineStore
      .fetch()
      .catch(() => null)
      .finally(() => {
        fetching.value = false
      })
  })
</script>

<template>
  <placeholder :loading="fetching" :data="igMedias">
    <template #loading>
      <ul class="list">
        <li class="item" v-for="i in 24" :key="i">
          <skeleton-base />
        </li>
      </ul>
    </template>
    <template #placeholder>
      <empty size="large" bold />
    </template>
    <template #default>
      <ul class="list">
        <li class="item" :key="index" v-for="(media, index) in igMedias">
          <ulink class="link" :href="media.permalink" :title="media.caption">
            <uimage class="cover" :alt="media.caption" :src="getMediaThumbnail(media)" />
            <div class="type-icon">
              <i class="iconfont icon-video" v-if="isVideoMediaIns(media)"></i>
              <i class="iconfont icon-album" v-else-if="isAlbumMediaIns(media)"></i>
              <i class="iconfont icon-camera" v-else></i>
            </div>
            <div class="mask">
              <i class="iconfont icon-music-play" v-if="isVideoMediaIns(media)"></i>
              <i class="iconfont icon-eye" v-else></i>
            </div>
          </ulink>
        </li>
        <li class="item">
          <ulink class="link more" :href="VALUABLE_LINKS.INSTAGRAM">•••</ulink>
        </li>
      </ul>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .list {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;
    $item-size: 74px;

    .item {
      position: relative;
      width: $item-size;
      height: $item-size;
      overflow: hidden;

      .link {
        display: block;
        width: 100%;
        height: 100%;
        background-color: $module-bg-darker-1;
        opacity: 0.8;
        @include visibility-transition();
        &:hover {
          opacity: 1;
          .mask {
            @include visible();
          }
        }

        &.more {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $font-size-h3;
        }

        .cover {
          width: 100%;
          height: 100%;
          border-radius: $xs-radius;
          object-fit: cover;
        }

        .type-icon {
          opacity: 0.7;
          position: absolute;
          top: math.div($xs-gap, 2);
          right: $xs-gap;
          color: $white;
        }

        .mask {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $white;
          background-color: rgba(0, 0, 0, 0.3);
          @include visibility-transition();
          @include hidden();
        }
      }
    }
  }
</style>
