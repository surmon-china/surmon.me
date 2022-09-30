<template>
  <div class="modal">
    <mapbox class="mapbox" :gm-geo-json="gmGeoJson" @ready="handleMapboxReady" />
    <div class="panel">
      <div class="info">
        <h3 class="title">{{ name ?? '-' }}</h3>
        <p class="description">{{ description ?? '-' }}</p>
      </div>
      <ul class="folders">
        <li class="folder" :key="index" v-for="(folder, index) in gmFolders">
          <div class="title">
            <i class="iconfont icon-route"></i>
            <span class="text">{{ folder.name }}</span>
            <span class="count">({{ folder.placemarks.length }})</span>
          </div>
          <div class="empty" v-if="!folder.placemarks.length">null</div>
          <ul class="placemarks" v-else>
            <li
              class="placemark"
              :key="i"
              v-for="(placemark, i) in folder.placemarks"
              @click="handlePlacemarkClick(placemark)"
            >
              <uimage
                class="icon"
                :cdn="true"
                :src="`/images/third-party/mapbox-${
                  placemark.image ? 'attraction' : 'veterinary'
                }.svg`"
              />
              <span class="text">{{ placemark.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import type { Map } from 'mapbox-gl'
  import { defineComponent, shallowRef, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GEO_INFO, VALUABLE_LINKS } from '/@/config/app.config'
  import {
    GoogleMyMapFolder,
    FeatureCollectionJSON,
    GoogleMyMapPlacemark,
    newMapboxPopup
  } from './helper'
  import Mapbox from './mapbox.vue'

  export default defineComponent({
    name: 'FootprintModal',
    components: { Mapbox },
    props: {
      name: String,
      description: String,
      gmGeoJson: Object as PropType<FeatureCollectionJSON>,
      gmFolders: Array as PropType<Array<GoogleMyMapFolder>>
    },
    setup() {
      const { isZhLang } = useEnhancer()
      const lib = shallowRef<Map>()
      const map = shallowRef<Map>()
      const handleMapboxReady = (payload: { map: Map; lib: any }) => {
        lib.value = payload.lib
        map.value = payload.map
      }

      let prevPopup: mapboxgl.Popup | null = null
      const handlePlacemarkClick = (placemark: GoogleMyMapPlacemark) => {
        if (map.value) {
          prevPopup?.remove()
          prevPopup = newMapboxPopup(lib.value, placemark.coordinates, placemark.description).addTo(
            map.value
          )
          map.value.flyTo({ center: placemark.coordinates, zoom: 10, speed: 1.2, curve: 1.2 })
          // https://github.com/mapbox/mapbox-gl-js/issues/1794
          // map.value.once('moveend', () => {})
        }
      }

      return {
        GEO_INFO,
        VALUABLE_LINKS,
        isZhLang,
        handlePlacemarkClick,
        handleMapboxReady
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .modal {
    position: relative;

    .mapbox {
      width: 100%;
      height: 100%;
    }

    .panel {
      position: absolute;
      right: 3rem;
      top: 3rem;
      bottom: 3rem;
      display: flex;
      flex-direction: column;
      width: 22rem;
      padding: $lg-gap $gap $gap $lg-gap;
      background: $module-bg-opaque;
      border-radius: $lg-radius;
      box-shadow: 0px 0px 8px 4px rgb(0 0 0 / 10%);

      .info {
        margin-bottom: 2rem;
        padding-bottom: $lg-gap;
        border-bottom: 1px solid $module-bg-darker-1;

        .title {
          margin-top: 0;
          margin-bottom: $gap;
        }
        .description {
          margin: 0;
          @include text-overflow();
        }
      }

      .folders {
        flex: 1;
        list-style: none;
        padding: 0;
        overflow: auto;

        .folder {
          &:last-child {
            .placemarks {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }

          .title {
            font-size: $font-size-h4;
            margin-bottom: $gap;
            scroll-snap-align: start;

            .text {
              margin-left: $sm-gap;
              font-weight: bold;
            }
          }

          .empty,
          .placemarks {
            padding-left: 2rem;
            margin-bottom: $gap;
            color: $text-secondary;
          }

          .placemarks {
            list-style: none;

            .placemark {
              line-height: 2;
              cursor: pointer;
              scroll-snap-align: start;
              &:hover {
                color: $text;
              }

              .icon {
                width: 1.4em;
                margin-top: -2px;
              }

              .text {
                margin-left: $sm-gap;
                @include text-overflow();
              }
            }
          }
        }
      }
    }
  }
</style>
