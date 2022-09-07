<template>
  <div class="instagram-grid">
    <ul class="medias">
      <li
        class="media"
        v-for="(media, index) in medias"
        :key="index"
        :title="media.caption"
        :class="isVideoMediaIns(media) ? 'video' : 'photo'"
        @click="openMediaGallery(index)"
      >
        <div class="mask">
          <span class="icon">
            <i class="iconfont icon-music-play" v-if="isVideoMediaIns(media)" />
            <i class="iconfont icon-eye" v-else></i>
          </span>
        </div>
        <div v-lozad class="background" :data-background-image="getInstagramImage(media, 'm')" />
        <div class="video-icon" v-if="isVideoMediaIns(media)">
          <i class="iconfont icon-video"></i>
        </div>
      </li>
    </ul>
    <client-only>
      <gallery
        :medias="medias"
        :index="galleryActiveIndex"
        :visible="isOnGallery"
        @close="closeMediaGallery"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { UNDEFINED } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { isVideoMediaIns, getInstagramImage } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import Gallery from './gallery.vue'

  export default defineComponent({
    name: 'LensInstagramGrid',
    components: {
      Gallery
    },
    props: {
      medias: {
        type: Array as PropType<Array<InstagramMediaItem>>,
        required: true
      }
    },
    setup() {
      const { gtag } = useEnhancer()
      const galleryActiveIndex = ref<number>()
      const isOnGallery = computed(() => galleryActiveIndex.value !== UNDEFINED)

      const closeMediaGallery = () => {
        galleryActiveIndex.value = UNDEFINED
      }

      const openMediaGallery = (index: number) => {
        galleryActiveIndex.value = index
        gtag?.event('instagram_view', {
          event_category: GAEventCategories.Lens
        })
      }

      return {
        isOnGallery,
        galleryActiveIndex,
        isVideoMediaIns,
        getInstagramImage,
        openMediaGallery,
        closeMediaGallery
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';
  $size: 155px;

  .medias {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: $gap * 2;

    .media {
      position: relative;
      display: block;
      height: $size;
      overflow: hidden;
      cursor: pointer;
      @include radius-box($sm-radius);
      @include common-bg-module();
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
      }

      .video-icon {
        opacity: 0.7;
        position: absolute;
        top: $xs-gap;
        right: $sm-gap;
        font-size: $font-size-h4;
        color: $white;
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
</style>
