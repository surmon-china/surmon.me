<script lang="ts" setup>
  import type { Map, LngLatLike } from 'mapbox-gl'
  import { shallowRef, onBeforeMount, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { META, GEO_INFO, MAPBOX_CONFIG } from '/@/config/app.config'
  import { FeatureCollectionJSON, geoJSONFeatureToLayer, newMapboxPopup } from './helper'
  import 'mapbox-gl/dist/mapbox-gl.css'

  const props = defineProps<{
    gmGeoJson: FeatureCollectionJSON
  }>()

  const emit = defineEmits<{
    (e: 'ready', v: { map: Map; lib: any }): void
  }>()

  const { isDarkTheme } = useEnhancer()
  const mapboxRef = shallowRef<HTMLElement>()
  const lib = shallowRef<any>()
  const map = shallowRef<Map>()
  const loaded = shallowRef(false)

  const getMapStyle = () => {
    return isDarkTheme.value ? MAPBOX_CONFIG.STYLE_DARK : MAPBOX_CONFIG.STYLE_LIGHT
  }

  const makeSureSourceLayer = () => {
    if (loaded.value) {
      if (props.gmGeoJson?.features.length) {
        const _map = map.value!
        const layerId = 'placemarks'
        // http://www.mapbox.cn/mapbox-gl-js/example/popup-on-click/
        // https://docs.mapbox.com/mapbox-gl-js/example/filter-markers-by-input/
        if (!_map.getLayer(layerId)) {
          _map.addLayer(
            geoJSONFeatureToLayer(layerId, {
              type: 'geojson',
              data: props.gmGeoJson
            })
          )
          _map.on('mouseenter', layerId, () => {
            _map.getCanvas().style.cursor = 'pointer'
          })
          _map.on('mouseleave', layerId, () => {
            _map.getCanvas().style.cursor = ''
          })
          _map.on('click', layerId, (event) => {
            // @ts-ignore
            const coordinates = event.features![0].geometry.coordinates.slice()
            const description = event.features![0].properties!.description
            while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
            }
            newMapboxPopup(lib.value, coordinates, description).addTo(_map)
          })
        }
      }
    }
  }

  onBeforeMount(() => {
    watch(
      () => isDarkTheme.value,
      () => map.value?.setStyle(getMapStyle())
    )
  })

  onBeforeMount(() => {
    watch(
      () => props.gmGeoJson,
      () => makeSureSourceLayer()
    )
  })

  onMounted(() => {
    Promise.all([
      import('mapbox-gl').then((result) => result.default),
      new Promise((resolve) => window.setTimeout(resolve, 600))
    ]).then(([mapboxgl]) => {
      mapboxgl.accessToken = MAPBOX_CONFIG.TOKEN

      lib.value = mapboxgl
      map.value = new mapboxgl.Map({
        container: mapboxRef.value!,
        center: MAPBOX_CONFIG.CENTER as LngLatLike,
        zoom: MAPBOX_CONFIG.ZOOM,
        minZoom: 2.2,
        attributionControl: false,
        style: getMapStyle()
      })

      // living now marker
      new mapboxgl.Marker({
        color: META.primary,
        anchor: 'bottom'
      })
        .setLngLat(GEO_INFO.coordinates as any)
        .addTo(map.value)

      // https://stackoverflow.com/questions/36168658/mapbox-gl-setstyle-removes-layers
      // https://bl.ocks.org/tristen/0c0ed34e210a04e89984
      map.value.on('style.load', () => {
        makeSureSourceLayer()
      })

      // loaded
      map.value.on('load', () => {
        loaded.value = true
        makeSureSourceLayer()
        emit('ready', { map: map.value!, lib: lib.value })
      })
    })
  })

  onBeforeUnmount(() => {
    map.value?.remove()
  })
</script>

<template>
  <div class="mapbox" ref="mapboxRef"></div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .mapbox {
    ::v-deep(.mapboxgl-popup) {
      &.mapboxgl-popup-anchor-top {
        .mapboxgl-popup-tip {
          border-bottom-color: $module-bg-opaque;
        }
      }
      &.mapboxgl-popup-anchor-bottom {
        .mapboxgl-popup-tip {
          border-top-color: $module-bg-opaque;
        }
      }
      &.mapboxgl-popup-anchor-left {
        .mapboxgl-popup-tip {
          border-right-color: $module-bg-opaque;
        }
      }
      &.mapboxgl-popup-anchor-right {
        .mapboxgl-popup-tip {
          border-left-color: $module-bg-opaque;
        }
      }

      .mapboxgl-popup-content {
        background-color: $module-bg-opaque;
        box-shadow: 0px 0px 14px 4px rgb(0 0 0 / 10%);
        border-radius: $lg-radius;
        padding: 0.8em 1em;
        font-size: $font-size-base;
        line-height: 1.7;
        max-height: 260px;
        overflow-y: auto;
        font-family: $font-family-normal;

        br {
          content: '';
          margin: 2em;
          display: block;
          font-size: 24%;
        }

        img {
          display: block;
          width: 100%;
          min-height: 2rem;
          background-color: $module-bg-darker-1;
        }
      }
    }
  }
</style>
