<template>
  <div class="instagram-grid">
    <ul class="medias" ref="listElement">
      <li
        class="media"
        :key="index"
        v-for="(media, index) in medias"
        :title="media.caption"
        @click="handleGalleryOpen(index)"
      >
        <div class="mask">
          <span class="icon">
            <i class="iconfont icon-magnifier"></i>
          </span>
        </div>
        <div class="background lozad" :data-background-image="getInstagramImage(media, 'm')" />
      </li>
    </ul>
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
  import { defineComponent, ref, computed, PropType, onMounted, onBeforeUnmount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { UNDEFINED } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LozadObserver, LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { getInstagramImage } from '/@/transforms/media'
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
      const handleGalleryClose = () => {
        galleryActiveIndex.value = UNDEFINED
      }
      const handleGalleryOpen = (index: number) => {
        galleryActiveIndex.value = index
        gtag?.event('instagram_view', {
          event_category: GAEventCategories.Lens
        })
      }

      const listElement = ref<HTMLElement>()
      const lozadObserver = ref<LozadObserver | null>(null)
      const observeLozad = () => {
        const lozadElements = listElement.value?.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (lozadElements?.length) {
          lozadObserver.value = window.$lozad(lozadElements, {
            loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.value.observe()
        }
      }

      onMounted(() => {
        observeLozad()
      })

      onBeforeUnmount(() => {
        lozadObserver.value?.observer.disconnect()
        lozadObserver.value = null
      })

      return {
        listElement,
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
  @import 'src/styles/init.scss';
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
        .background {
          transform: scale(1.15);
        }

        .mask {
          @include visible();
          .icon {
            transform: scale(1);
          }
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
        backdrop-filter: blur(2px);
        background-color: rgba(#000, 0.3);
        color: rgba($white, 0.8);
        @include hidden();
        @include visibility-transition();

        .icon {
          font-size: 3em;
          transform: scale(1.2);
          @include transform-transition($transition-time-normal);
        }
      }
    }
  }
</style>
