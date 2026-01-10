<script lang="ts" setup>
  import type { Map, LngLatLike } from 'mapbox-gl'
  import { shallowRef, onBeforeMount, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { MAPBOX_CONFIG } from '/@/configs/app.config'
  import { importMapbox, MapboxGL } from './mapbox-lib'
  import { addLivingMarkerToMap } from './mapbox-living-now'

  const emit = defineEmits<{
    (e: 'load', v: { map: Map; lib: any }): void
    (e: 'style-load', v: { map: Map; lib: any }): void
  }>()

  const { isDarkTheme, appConfig } = useEnhancer()
  const container = shallowRef<HTMLElement>()
  const lib = shallowRef<MapboxGL>()
  const map = shallowRef<Map>()

  const getMapStyle = () => {
    return isDarkTheme.value ? MAPBOX_CONFIG.STYLE_DARK : MAPBOX_CONFIG.STYLE_LIGHT
  }

  onBeforeMount(() => {
    watch(
      () => isDarkTheme.value,
      () => map.value?.setStyle(getMapStyle())
    )
  })

  onBeforeUnmount(() => {
    map.value?.remove()
  })

  onMounted(async () => {
    const _lib = await importMapbox()
    _lib.accessToken = MAPBOX_CONFIG.TOKEN

    const _map = new _lib.Map({
      container: container.value!,
      center: MAPBOX_CONFIG.CENTER as LngLatLike,
      zoom: MAPBOX_CONFIG.ZOOM,
      minZoom: 2.2,
      attributionControl: false,
      style: getMapStyle()
    })

    // living now marker
    addLivingMarkerToMap(_lib, _map, appConfig.value.ABOUT_GEO_COORDINATES!)

    // https://stackoverflow.com/questions/36168658/mapbox-gl-setstyle-removes-layers
    // https://bl.ocks.org/tristen/0c0ed34e210a04e89984
    _map.on('style.load', () => {
      emit('style-load', { map: _map, lib: _lib })
    })

    // loaded
    _map.on('load', () => {
      emit('load', { map: _map, lib: _lib })
    })

    // saved
    lib.value = _lib
    map.value = _map
  })
</script>

<template>
  <div class="mapbox" ref="container"></div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .mapbox {
    ::v-deep(.mapboxgl-popup) {
      &.mapboxgl-popup-anchor-top {
        .mapboxgl-popup-tip {
          border-bottom-color: $white;
        }
      }
      &.mapboxgl-popup-anchor-bottom {
        .mapboxgl-popup-tip {
          border-top-color: $white;
        }
      }
      &.mapboxgl-popup-anchor-left {
        .mapboxgl-popup-tip {
          border-right-color: $white;
        }
      }
      &.mapboxgl-popup-anchor-right {
        .mapboxgl-popup-tip {
          border-left-color: $white;
        }
      }

      .mapboxgl-popup-content {
        background-color: $white;
        box-shadow: 0px 0px 14px 4px rgb(0 0 0 / 10%);
        border-radius: $radius-lg;
        padding: 0.8em 1em;
        font-size: $font-size-base;
        line-height: 1.7;
        max-height: 260px;
        overflow-y: auto;
        font-family: $font-family-normal;
        color: #555555;

        p:last-child {
          margin: 0;
        }

        a {
          color: #333333;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      }
    }
  }
</style>
