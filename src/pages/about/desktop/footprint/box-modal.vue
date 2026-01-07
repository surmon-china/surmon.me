<script lang="ts" setup>
  import { shallowRef, onMounted, onBeforeUnmount } from 'vue'
  import type { Map } from 'mapbox-gl'
  import type { MapboxGL } from './mapbox-lib'
  import Mapbox from './box-base.vue'
  import { useMapPlacemarks, addPlacemarksLayerToMap, activatePlacemark } from './mapbox-placemarks'
  import { lastActiveSegmentId, activateTripSegment, resetActiveTripSegment } from './mapbox-trip-segments'
  import { useMapTripSegments, addTripSegmentsLayersToMap } from './mapbox-trip-segments'
  import { getFlatSegmentId, getTransportIconName } from './mapbox-trip-segments'
  import { i18ns } from '../../shared'

  const loaded = shallowRef(false)
  const lib = shallowRef<MapboxGL>()
  const map = shallowRef<Map>()
  const mapPms = useMapPlacemarks()
  const mapTss = useMapTripSegments()

  const handleMapboxLoad = (payload: { lib: MapboxGL; map: Map }) => {
    // Initialize mapbox lib and map instance
    lib.value = payload.lib
    map.value = payload.map
    // Fetch sources and add layers
    const pmsRequest = mapPms.fetchKmlJson()
    const tssRequest = mapTss.fetchConfigJson().then(() => {
      addTripSegmentsLayersToMap(
        payload.map,
        mapTss.flatSegments.value,
        mapTss.flatSegmentsMap.value,
        mapTss.geoJson.value
      )
    })
    Promise.all([pmsRequest, tssRequest]).finally(() => {
      // To ensure that placemarks layer are always on the top level
      addPlacemarksLayerToMap(payload.lib, payload.map, mapPms.geoJson.value)
      loaded.value = true
    })
  }

  onMounted(() => {
    mapPms.fetchKmlJson()
    mapTss.fetchConfigJson()
  })

  onBeforeUnmount(() => {
    resetActiveTripSegment(map.value!)
  })
</script>

<template>
  <div class="modal">
    <mapbox class="mapbox" @load="handleMapboxLoad" />
    <div class="panel">
      <div class="head">
        <h3 class="title"><i18n v-bind="i18ns.footprintTitle" /></h3>
        <p class="description"><i18n v-bind="i18ns.footprintDescription" /></p>
      </div>
      <div class="content-skeleton" key="skeleton" v-if="!loaded">
        <skeleton-line class="skeleton-item" :key="i" v-for="i in 5" />
      </div>
      <div class="content" key="content" v-else>
        <ul class="group-list">
          <li class="group" :key="trip.id" v-for="trip in mapTss.configJson.value">
            <h5 class="title">
              <i class="iconfont icon-route"></i>
              <span class="text">{{ trip.name }}</span>
            </h5>
            <ul class="child-list">
              <li
                class="item"
                :class="{ actived: getFlatSegmentId(trip.id, index) === lastActiveSegmentId }"
                :key="index"
                :title="segment.name"
                v-for="(segment, index) in trip.segments"
                @click="
                  activateTripSegment(map!, mapTss.flatSegmentsMap.value.get(getFlatSegmentId(trip.id, index))!)
                "
              >
                <i class="iconfont" :class="getTransportIconName(segment.transport)"></i>
                <span class="text">{{ segment.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="group-list">
          <li class="group" :key="index" v-for="(folder, index) in mapPms.folders.value">
            <h5 class="title">
              <i class="iconfont icon-map"></i>
              <span class="text">{{ folder.name }}</span>
              <span class="count">({{ folder.placemarks.length }})</span>
            </h5>
            <div class="empty" v-if="!folder.placemarks.length">null</div>
            <ul class="child-list placemarks" v-else>
              <li
                class="item"
                :key="i"
                :title="placemark.name"
                v-for="(placemark, i) in folder.placemarks"
                @click="activatePlacemark(lib!, map!, placemark)"
              >
                <uimage class="icon" :cdn="true" src="/images/third-party/mapbox-veterinary.svg" />
                <span class="text">{{ placemark.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

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
      padding: $gap-lg $gap $gap $gap-lg;
      background: $module-bg-opaque;
      border-radius: $radius-lg;
      box-shadow: 0px 0px 8px 4px rgb(0 0 0 / 10%);

      .head {
        margin-bottom: $gap-lg;
        padding-bottom: $gap-lg;
        border-bottom: 1px solid $module-bg-darker-1;

        .title {
          margin-top: 0;
          margin-bottom: $gap;
        }

        .description {
          margin: 0;
          @include mix.text-overflow();
        }
      }

      .content-skeleton {
        .skeleton-item {
          margin-bottom: $gap;
        }
      }

      .content {
        overflow: auto;

        .group-list {
          list-style: none;
          padding: 0;
          &:last-child {
            margin-bottom: 0;
          }

          .group {
            &:last-child {
              .child-list:last-child {
                margin-bottom: 0;
              }
            }

            .title {
              margin-top: 0;
              margin-bottom: $gap-sm;
              font-weight: bold;

              .iconfont {
                font-weight: normal;
              }

              .text {
                margin-left: $gap-sm;
                margin-right: $gap-xs;
              }
            }

            .empty,
            .child-list {
              padding-left: 1rem;
              margin-bottom: $gap;
              color: $color-text-secondary;
            }

            .child-list {
              list-style: none;
              overflow: hidden;

              .item {
                display: flex;
                scroll-snap-align: start;
                line-height: 2.2;
                cursor: pointer;
                &:hover {
                  color: $color-text;
                }
                &.actived {
                  color: $surmon;
                }

                .icon {
                  width: 1.4em;
                  margin-top: -2px;
                }

                .iconfont {
                  width: 1.4em;
                  text-align: center;
                }

                .text {
                  margin-left: $gap-sm;
                  max-width: 80%;
                  @include mix.text-overflow();
                }
              }
            }
          }
        }
      }
    }
  }
</style>
