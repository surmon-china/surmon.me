<script lang="ts" setup>
  import type { Map } from 'mapbox-gl'
  import { shallowRef, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMyGoogleMapStore } from '/@/stores/media'
  import { GEO_INFO, VALUABLE_LINKS } from '/@/config/app.config'
  import { gmmFoldersToGeoJSON, FeatureCollectionJSON, GoogleMyMapFolder } from './helper'
  import { GOOGLE_MAP_LINKS } from './google-map'
  import { i18ns } from '../shared'
  import Mapbox from './mapbox.vue'
  import FootprintModal from './modal.vue'

  const map = shallowRef<Map>()
  const modalVisible = shallowRef(false)
  const gmStore = useMyGoogleMapStore()
  const { isZhLang } = useEnhancer()

  const gmFolders = computed<Array<GoogleMyMapFolder>>(() => {
    const folders = [...(gmStore.data?.Folder ?? [])]
    folders.reverse()
    return folders.map((folder, fi) => {
      const placemark = folder.Placemark ?? []
      const placemarks = Array.isArray(placemark) ? placemark : [placemark]
      return {
        name: folder.name,
        placemarks: placemarks.map((placemark, pi) => {
          const [longitude, latitude] = placemark.Point.coordinates.split(',').map(Number)
          const extendedData = placemark.ExtendedData?.Data
          return {
            index: pi,
            id: `placemark-${fi}-${pi}`,
            name: placemark.name,
            description: placemark.description,
            coordinates: [longitude, latitude],
            image: extendedData?.['@name'] === 'gx_media_links' ? extendedData?.value : null
          }
        })
      }
    })
  })

  const gmGeoJson = computed<FeatureCollectionJSON>(() => {
    return gmmFoldersToGeoJSON(gmFolders.value)
  })

  const openModal = () => {
    modalVisible.value = true
  }

  const handleMapboxReady = (payload: { map: Map }) => {
    map.value = payload.map
  }

  const handleLivingNow = () => {
    map.value?.flyTo({
      center: GEO_INFO.coordinates as any,
      zoom: 14
    })
  }

  const handleGoogleMapLinkClick = (url: string) => {
    window.open(url, '_blank')
  }

  onMounted(() => gmStore.fetch())
</script>

<template>
  <div class="footprint-map">
    <client-only>
      <popup v-model:visible="modalVisible" :scroll-close="false">
        <footprint-modal
          class="footprint-modal"
          :name="gmStore.data?.name"
          :description="gmStore.data?.description"
          :gm-folders="gmFolders"
          :gm-geo-json="gmGeoJson"
        />
      </popup>
    </client-only>
    <div class="mapbox-wrapper" :placeholder="isZhLang ? i18ns.footprint.zh : i18ns.footprint.en">
      <mapbox class="mapbox" :gm-geo-json="gmGeoJson" @ready="handleMapboxReady" />
      <div class="toolbar">
        <ulink class="button" :href="VALUABLE_LINKS.GOOGLE_MY_MAP">
          <i class="iconfont icon-google-maps"></i>
        </ulink>
        <button class="button" @click="openModal">
          <i class="iconfont icon-fullscreen"></i>
        </button>
      </div>
    </div>
    <div class="legends">
      <div class="now">
        <i class="iconfont icon-location"></i>
        <span class="text" @click="handleLivingNow">
          {{ isZhLang ? GEO_INFO.zh_title : GEO_INFO.en_title }}
        </span>
      </div>
      <ul class="folders">
        <li class="item" @click="openModal">
          <i class="iconfont icon-route"></i>
          <span class="text">
            <i18n zh="我的旅行足迹" en="My footprints"></i18n>
          </span>
        </li>
        <li
          class="item"
          :key="index"
          v-for="(link, index) in GOOGLE_MAP_LINKS"
          @click="handleGoogleMapLinkClick(link.url)"
        >
          <i class="iconfont icon-map"></i>
          <span class="text">
            <i18n :zh="link.zh" :en="link.en"></i18n>
            <i class="new-window-icon iconfont icon-new-window-s"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .footprint-modal {
    width: 88vw;
    height: 88vh;
  }

  .footprint-map {
    position: relative;
    display: flex;
    width: 100%;
    $map-width: 790px;
    $map-height: 220px;

    .legends .folders,
    .legends .now {
      @include common-bg-module();
      @include radius-box($lg-radius);
    }

    .legends {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: $gap * 2;
      .now {
        flex-shrink: 0;
        display: inline-flex;
        margin-bottom: $lg-gap;
        padding: 0 $gap;
        width: 100%;
        line-height: 3.4em;
        cursor: pointer;
        color: $text-secondary;
        &:hover {
          color: $text;
        }

        .iconfont {
          margin-right: $sm-gap;
        }
        .text {
          font-weight: bold;
        }
      }

      .folders {
        flex: 1;
        list-style: none;
        margin: 0;
        padding: $sm-gap $gap;

        .item {
          line-height: 2.4em;
          cursor: pointer;
          color: $text-secondary;
          &:hover {
            color: $text;
          }

          .iconfont {
            margin-right: $gap;
          }

          .text {
            display: inline-block;
            position: relative;
            font-weight: bold;

            .new-window-icon {
              margin: 0;
              font-size: 10px;
              font-weight: normal;
              position: absolute;
              top: -0.5em;
              right: -1.2em;
              color: $text-divider;
            }
          }
        }
      }
    }

    .mapbox-wrapper {
      position: relative;
      padding: $gap;
      @include common-bg-module();
      @include radius-box($lg-radius);

      .mapbox {
        width: $map-width;
        height: $map-height;
        display: block;
      }

      .toolbar {
        position: absolute;
        top: $lg-gap * 2;
        right: $lg-gap * 2;
        z-index: $z-index-normal + 1;
        display: flex;

        .button {
          margin-left: $lg-gap;
          display: block;
          $size: 2em;
          width: $size;
          height: $size;
          line-height: $size;
          border-radius: $xs-radius;
          text-align: center;
          background-color: $module-bg;
          font-size: $font-size-h4;
          color: $text-secondary;
          @include backdrop-blur(1px);
          &:hover {
            color: $link-color;
            background-color: $module-bg-opaque;
          }
        }
      }
    }
  }
</style>
