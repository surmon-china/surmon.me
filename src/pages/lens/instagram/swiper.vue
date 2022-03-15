<template>
  <div class="instagram-swiper">
    <list-swiper class="list-swiper" :data="medias">
      <template #item="{ item, index }">
        <div class="media" :title="item.caption" @click="handleGalleryOpen(index)">
          <div class="mask">
            <span class="icon">
              <i class="iconfont icon-magnifier"></i>
            </span>
            <span class="caption" v-if="item.caption">{{ item.caption }}</span>
          </div>
          <div class="background lozad" :data-background-image="getInstagramImage(item, 'm')" />
        </div>
      </template>
    </list-swiper>
    <client-only>
      <gallery
        :medias="medias"
        :index="galleryActiveIndex"
        :visible="isOnGallery"
        @close="handleGalleryClose"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { UNDEFINED } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { getInstagramImage } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import ListSwiper from '../swiper.vue'
  import Gallery from './gallery.vue'

  export default defineComponent({
    name: 'LensInstagram',
    components: {
      Gallery,
      ListSwiper
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
      const handleGalleryClose = () => {
        galleryActiveIndex.value = UNDEFINED
      }
      const handleGalleryOpen = (index: number) => {
        galleryActiveIndex.value = index
        gtag?.event('instagram_view', {
          event_category: GAEventCategories.Lens
        })
      }

      return {
        isOnGallery,
        galleryActiveIndex,
        getInstagramImage,
        handleGalleryOpen,
        handleGalleryClose
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .list-swiper {
    $size: 243px;
    /* height * 2 + 2rem gap */
    height: $size * 2 + 12 * 2;
    width: 100%;

    .media {
      position: relative;
      display: block;
      height: $size;
      overflow: hidden;
      cursor: pointer;
      @include radius-box($sm-radius);
      @include common-bg-module();
      &:hover {
        .background {
          transform: scale(1.15);
        }

        .mask {
          @include visible();
        }
      }

      .background {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        transform: scale(1.05);
        @include transform-transition($transition-time-normal);
      }

      .length {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: $z-index-normal + 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 2rem;
        border-top-left-radius: $xs-radius;
        background-color: $text-divider;
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
        color: $white;
        background-color: rgba(#000, 0.3);
        @include backdrop-blur(2px);
        @include hidden();
        @include visibility-transition();

        .icon {
          font-size: $font-size-h1 * 2;
        }

        .caption {
          margin-top: $gap;
          font-weight: bold;
        }
      }
    }
  }
</style>
