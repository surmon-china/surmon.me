<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCountry } from '/@/app/context'
  import { UNDEFINED, isNil } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { getProxyURL } from '/@/transforms/url'
  import { isCNCode } from '/@/transforms/region'
  import { isVideoMediaIns, isAlbumMediaIns, getInstagramCoverURL } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import InsGallery from './gallery.vue'

  const props = defineProps<{
    medias: Array<InstagramMediaItem>
  }>()

  const { gtag, cdnDomain } = useEnhancer()
  const galleryActiveIndex = ref<number>()
  const galleryActiveMedia = computed(() => {
    return isNil(galleryActiveIndex.value) ? null : props.medias[galleryActiveIndex.value]
  })

  const openMediaGallery = (index: number) => {
    galleryActiveIndex.value = index
    gtag?.event('instagram_view', {
      event_category: GAEventCategories.Photography
    })
  }

  const closeMediaGallery = () => {
    galleryActiveIndex.value = UNDEFINED
  }

  const getPureCaption = (caption?: string) => {
    const text = caption?.split('#')[0].trim().replaceAll('\n', ' ')
    return (text ? text : caption) || '-'
  }

  const getMediaThumbnail = (media: InstagramMediaItem) => {
    const url = getInstagramCoverURL(media)
    const countryCode = useCountry()
    const isCNUser = Boolean(countryCode && isCNCode(countryCode))
    return isCNUser ? getProxyURL(cdnDomain, url) : url
  }
</script>

<template>
  <div class="instagram-grid">
    <ul class="medias">
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
    </ul>
    <client-only>
      <popup :visible="!!galleryActiveMedia" :scroll-close="false" @close="closeMediaGallery">
        <ins-gallery
          v-if="galleryActiveMedia"
          :media="galleryActiveMedia"
          :index="galleryActiveIndex!"
          :count="medias.length"
        />
      </popup>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .medias {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $gap * 5;
    list-style: none;

    .item {
      display: block;
      padding: 1rem;
      background-color: $module-bg;
      @include radius-box($xs-radius);

      .content {
        position: relative;
        height: 260px;
        cursor: pointer;

        &:hover {
          .mask {
            @include visible();
          }
        }

        .background {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-color: $module-bg-darker-1;
        }

        .type-icon {
          opacity: 0.8;
          position: absolute;
          top: $xs-gap;
          right: $sm-gap;
          font-size: $font-size-h4;
          color: $white;
        }

        .date {
          opacity: 0.8;
          position: absolute;
          bottom: $sm-gap;
          left: $gap;
          color: $white;
          font-size: $font-size-root;
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
          @include hidden();
          @include visibility-transition();

          .icon {
            font-size: 2em;
          }
        }
      }
    }
  }
</style>
