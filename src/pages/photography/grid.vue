<script lang="ts" setup>
  import _isNil from 'lodash-es/isNil'
  import { ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { getCdnProxyURL } from '/@/transforms/url'
  import { isVideoMediaIns, isAlbumMediaIns, getInstagramCoverURL } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import InsGallery from './gallery.vue'

  const props = defineProps<{
    medias: Array<InstagramMediaItem>
  }>()

  const { gtag, cdnDomain, isCNUser } = useEnhancer()
  const galleryActiveIndex = ref<number>()
  const galleryActiveMedia = computed(() => {
    return _isNil(galleryActiveIndex.value) ? null : props.medias[galleryActiveIndex.value]
  })

  const openMediaGallery = (index: number) => {
    galleryActiveIndex.value = index
    gtag?.event('instagram_view', {
      event_category: GAEventCategories.Photography
    })
  }

  const closeMediaGallery = () => {
    galleryActiveIndex.value = undefined
  }

  const getPureCaption = (caption?: string) => {
    const text = caption?.split('#')[0].trim().replaceAll('\n', ' ')
    return (text ? text : caption) || '-'
  }

  const getMediaThumbnail = (media: InstagramMediaItem) => {
    const url = getInstagramCoverURL(media)
    return isCNUser ? getCdnProxyURL(cdnDomain, url) : url
  }
</script>

<template>
  <div class="instagram-grid">
    <transition-group tag="ul" name="list" class="medias">
      <li
        class="item"
        v-for="(media, index) in medias"
        :key="index"
        :title="getPureCaption(media.caption)"
        :class="isVideoMediaIns(media) ? 'video' : 'photo'"
        @click="openMediaGallery(index)"
      >
        <div class="content">
          <div v-lozad class="background" :data-background-image="getMediaThumbnail(media)" />
          <div class="mask">
            <span class="icon">
              <i class="iconfont icon-music-play" v-if="isVideoMediaIns(media)"></i>
              <i class="iconfont icon-eye" v-else></i>
            </span>
          </div>
          <div class="type-icon">
            <i class="iconfont icon-video" v-if="isVideoMediaIns(media)"></i>
            <i class="iconfont icon-album" v-else-if="isAlbumMediaIns(media)"></i>
            <i class="iconfont icon-camera" v-else></i>
          </div>
          <span class="date">
            <udate to="YMD" :date="media.timestamp" separator="/" />
          </span>
        </div>
      </li>
    </transition-group>
    <client-only>
      <popup :visible="!!galleryActiveMedia" :scroll-close="false" @close="closeMediaGallery">
        <ins-gallery :media="galleryActiveMedia" v-if="!!galleryActiveMedia" />
      </popup>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .medias {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $gap * 4;
    list-style: none;

    .item {
      display: block;
      padding: $gap-sm;
      background-color: $module-bg;
      @include mix.radius-box($radius-sm);

      .content {
        position: relative;
        height: 260px;
        cursor: pointer;

        &:hover {
          .mask {
            @include mix.visible();
          }
        }

        .background {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-color: $module-bg-darker-1;
          @include mix.radius-box($radius-tiny);
        }

        .type-icon {
          opacity: 0.8;
          position: absolute;
          top: $gap-xs;
          right: $gap-xs;
          font-size: $font-size-h4;
          color: $white;
        }

        .date {
          opacity: 0.8;
          position: absolute;
          bottom: $gap-xs;
          left: $gap-sm;
          color: $white;
          font-size: $font-size-h6;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: $z-index-normal + 1;
          background-color: rgba(#000, 0.3);
          color: rgba($white, 0.8);
          @include mix.hidden();
          @include mix.visibility-transition();

          .icon {
            font-size: 2em;
          }
        }
      }
    }
  }
</style>
