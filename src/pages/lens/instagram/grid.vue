<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { UNDEFINED, isNil } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { getCDN_URL } from '/@/transforms/url'
  import { isVideoMediaIns, isAlbumMediaIns, getInstagramImage } from '/@/transforms/media'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import Iembed from './embed.vue'

  const props = defineProps<{
    medias: Array<InstagramMediaItem>
    limit: number
  }>()

  const { gtag } = useEnhancer()
  const galleryActiveIndex = ref<number>()
  const galleryActiveMedia = computed(() => {
    return isNil(galleryActiveIndex.value) ? null : props.medias[galleryActiveIndex.value]
  })

  const gridMedias = computed(() => props.medias.slice(0, props.limit - 1))
  const restMedias = computed(() => {
    return gridMedias.value.length > 1 ? props.medias.slice(props.limit - 1, props.limit + 2) : []
  })

  const openMediaGallery = (index: number) => {
    galleryActiveIndex.value = index
    gtag?.event('instagram_view', {
      event_category: GAEventCategories.Lens
    })
  }

  const closeMediaGallery = () => {
    galleryActiveIndex.value = UNDEFINED
  }
</script>

<template>
  <div class="instagram-grid">
    <ul class="medias">
      <li
        class="media"
        v-for="(media, index) in gridMedias"
        :key="index"
        :title="media.caption"
        :class="isVideoMediaIns(media) ? 'video' : 'photo'"
        @click="openMediaGallery(index)"
      >
        <div v-lozad class="background" :data-background-image="getInstagramImage(media, 'm')" />
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
      </li>
      <li class="more">
        <ulink
          class="media"
          v-for="(media, index) in restMedias"
          :href="media.permalink"
          :key="index"
          :title="media.caption"
          :style="{ backgroundImage: `url(${getInstagramImage(media, 't')})` }"
        >
          <div class="mask">
            <i class="iconfont icon-new-window-s"></i>
          </div>
        </ulink>
        <ulink
          class="media"
          :key="index"
          v-for="index in 3 - restMedias.length"
          :href="VALUABLE_LINKS.INSTAGRAM"
          :style="{ backgroundImage: `url(${getCDN_URL('/images/page-lens/instagram-default.jpg')})` }"
        >
          <div class="mask">
            <i class="iconfont icon-new-window-s"></i>
          </div>
        </ulink>
        <ulink class="link" :href="VALUABLE_LINKS.INSTAGRAM">•••</ulink>
      </li>
    </ul>
    <client-only>
      <popup :visible="!!galleryActiveMedia" :scroll-close="false" @close="closeMediaGallery">
        <Iembed
          v-if="galleryActiveMedia"
          :media="galleryActiveMedia"
          :index="galleryActiveIndex!"
          :count="gridMedias.length"
        />
      </popup>
    </client-only>
  </div>
</template>

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
    list-style: none;

    .more {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-gap: $gap;

      .media {
        height: auto;
        background-size: cover;
      }

      .link {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size-h1;
        /* font line height offset */
        padding-bottom: 4px;
        @include common-bg-module();
        @include radius-box($sm-radius);
      }
    }

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

      .type-icon {
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
