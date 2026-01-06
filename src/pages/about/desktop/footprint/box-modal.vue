<script lang="ts" setup>
  import { shallowRef, onMounted } from 'vue'
  import type { Map } from 'mapbox-gl'
  import type { MapboxGL } from './mapbox-lib'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { useMapPlacemarks, addPlacemarksLayerToMap, activatePlacemark } from './mapbox-placemarks'
  import {
    TripRouteTransport,
    useMapTripRoutes,
    addTripRoutesLayersToMap,
    activateTripRoute
  } from './mapbox-trip-routes'
  import Mapbox from './box-base.vue'

  const lib = shallowRef<MapboxGL>()
  const map = shallowRef<Map>()
  const mapPms = useMapPlacemarks()
  const mapTrs = useMapTripRoutes()

  const handleMapboxLoad = (payload: { lib: MapboxGL; map: Map }) => {
    // initialize mapbox lib and map instance
    lib.value = payload.lib
    map.value = payload.map
    // fetch sources and add layers
    mapPms.fetchKmlJson().then(() => {
      addPlacemarksLayerToMap(payload.lib, payload.map, mapPms.geoJson.value)
    })
    mapTrs.fetchConfigJson().then(() => {
      addTripRoutesLayersToMap(payload.map, mapTrs.configJson.value, mapTrs.geoJsonCollections.value)
    })
  }

  onMounted(() => {
    mapPms.fetchKmlJson()
    mapTrs.fetchConfigJson()
  })
</script>

<template>
  <div class="modal">
    <mapbox class="mapbox" @load="handleMapboxLoad" />
    <div class="panel">
      <div class="head">
        <h3 class="title">{{ mapPms.kmlJson.value?.name ?? '-' }}</h3>
        <p class="description">{{ mapPms.kmlJson.value?.description ?? '-' }}</p>
      </div>
      <div class="content">
        <ul class="routes">
          <li
            class="route-item"
            :key="index"
            v-for="(route, index) in mapTrs.configJson.value"
            @click="activateTripRoute(map!, route)"
          >
            <h5 class="title">
              <i class="iconfont icon-transport-flight" v-if="route.transport === TripRouteTransport.Flight"></i>
              <i class="iconfont icon-transport-train" v-else-if="route.transport === TripRouteTransport.Train"></i>
              <i class="iconfont icon-transport-bus" v-else-if="route.transport === TripRouteTransport.Bus"></i>
              <i class="iconfont icon-transport-ship" v-else-if="route.transport === TripRouteTransport.Ship"></i>
              <i
                class="iconfont icon-transport-helmet"
                v-else-if="route.transport === TripRouteTransport.Motorcycle"
              ></i>
              <i
                class="iconfont icon-transport-bicycle"
                v-else-if="route.transport === TripRouteTransport.Bicycle"
              ></i>
              <i class="iconfont icon-transport-walk" v-else-if="route.transport === TripRouteTransport.Walk"></i>
              <i class="iconfont icon-route" v-else-if="route.transport === TripRouteTransport.Null"></i>
              <i class="iconfont icon-route" v-else></i>
              <span class="text">{{ route.name }}</span>
            </h5>
            <p class="description" v-html="markdownToHTML(route.description)"></p>
          </li>
        </ul>
        <ul class="folders">
          <li class="folder-item" :key="index" v-for="(folder, index) in mapPms.folders.value">
            <h5 class="title">
              <i class="iconfont icon-map"></i>
              <span class="text">{{ folder.name }}</span>
              <span class="count">({{ folder.placemarks.length }})</span>
            </h5>
            <div class="empty" v-if="!folder.placemarks.length">null</div>
            <ul class="placemarks" v-else>
              <li
                class="placemark-item"
                :key="i"
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
        margin-bottom: 2rem;
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

      .content {
        overflow: auto;
      }

      .routes {
        list-style: none;
        padding: 0;

        .route-item {
          scroll-snap-align: start;
          margin-bottom: $gap-lg;

          &:hover {
            cursor: pointer;
            .description {
              color: $color-text;
            }
          }

          .title {
            margin-top: 0;
            margin-bottom: $gap-sm;

            .text {
              margin-left: $gap-sm;
            }
          }

          .description {
            margin: 0;
            padding-left: $gap-xs * 6;
            line-height: 1.8em;
            font-size: $font-size-small;
            color: $color-text-secondary;
            ::v-deep(p) {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      .folders {
        list-style: none;
        padding: 0;

        .folder-item {
          scroll-snap-align: start;

          &:last-child {
            .placemarks {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }

          .title {
            margin-bottom: $gap-sm;

            .iconfont {
              font-weight: normal;
            }

            .text {
              margin-left: $gap-sm;
              margin-right: $gap-xs;
            }
          }

          .empty,
          .placemarks {
            padding-left: 1rem;
            margin-bottom: $gap;
            color: $color-text-secondary;
          }

          .placemarks {
            list-style: none;
            overflow: hidden;

            .placemark-item {
              display: flex;
              scroll-snap-align: start;
              line-height: 2.2;
              cursor: pointer;
              &:hover {
                color: $color-text;
              }

              .icon {
                width: 1.4em;
                margin-top: -2px;
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
</style>
