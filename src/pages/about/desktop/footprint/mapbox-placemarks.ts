import type { Map, Popup, LngLatLike } from 'mapbox-gl'
import type { MapboxGL } from './mapbox-lib'
import { shallowRef, computed } from 'vue'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

interface GoogleMapKmlData {
  name: string
  description: string
  Folder: Array<any> | any
  Style: Array<any>
  StyleMap: Array<any>
}

export interface PlacemarkItem {
  id: string
  name: string
  description: string
  coordinates: [number, number]
}

export interface PlacemarkFolder {
  name: string
  placemarks: Array<PlacemarkItem>
}

export const PLACEMARK_LAYER_ID = 'placemarks'

export const useMapPlacemarks = () => {
  const kmlJson = shallowRef<GoogleMapKmlData | null>(null)
  const fetchKmlJson = () => {
    return kmlJson.value
      ? Promise.resolve()
      : tunnel.fetch<GoogleMapKmlData>(TunnelModule.MyGoogleMap).then((data) => {
          kmlJson.value = data
        })
  }

  const folders = computed<Array<PlacemarkFolder>>(() => {
    const folderData = kmlJson.value?.Folder
    const foldersArray = Array.isArray(folderData) ? folderData : folderData ? [folderData] : []
    foldersArray.reverse()
    return foldersArray.map((folder, fi) => {
      const placemark = folder.Placemark ?? []
      const placemarks = Array.isArray(placemark) ? placemark : [placemark]
      return {
        name: folder.name,
        placemarks: placemarks.map((placemark, pi) => {
          const [longitude, latitude] = placemark.Point.coordinates.split(',').map(Number)
          return {
            index: pi,
            id: `placemark-${fi}-${pi}`,
            icon: 'veterinary',
            name: placemark.name,
            description: placemark.description,
            coordinates: [longitude, latitude]
          }
        })
      }
    })
  })

  const geoJson = computed(() => ({
    type: 'FeatureCollection',
    features: folders.value
      .map((folder) => folder.placemarks)
      .flat()
      .map((placemark) => {
        const { coordinates, ...properties } = placemark
        return {
          type: 'Feature',
          properties: properties,
          geometry: {
            type: 'Point',
            coordinates: coordinates
          }
        }
      })
  }))

  return {
    kmlJson,
    fetchKmlJson,
    folders,
    geoJson
  }
}

export const createPlacemarkPopup = (lib: MapboxGL, coordinates: LngLatLike, html: string) => {
  return new lib.Popup({ closeButton: false, offset: [0, -16], maxWidth: `280px` })
    .setLngLat(coordinates)
    .setHTML(html || '-')
}

let lastPlacemarkPopup: Popup | null = null

export const activatePlacemark = (lib: MapboxGL, map: Map, placemark: PlacemarkItem) => {
  lastPlacemarkPopup?.remove()
  lastPlacemarkPopup = createPlacemarkPopup(lib, placemark.coordinates, placemark.description).addTo(map)
  map.flyTo({ center: placemark.coordinates, zoom: 10, speed: 1.2, curve: 1.2 })
  // https://github.com/mapbox/mapbox-gl-js/issues/1794
  // map.value.once('moveend', () => {})
}

export const addPlacemarksLayerToMap = (lib: MapboxGL, map: Map, geoJson: any) => {
  if (!geoJson.features.length) return
  if (map.getLayer(PLACEMARK_LAYER_ID)) return

  // https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-symbol-icon-allow-overlap
  map.addLayer({
    id: PLACEMARK_LAYER_ID,
    source: {
      type: 'geojson',
      data: geoJson
    },
    type: 'symbol',
    layout: {
      'icon-allow-overlap': true,
      'icon-size': 1.2,
      'icon-image': ['get', 'icon'],
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 11,
      'text-letter-spacing': 0.05,
      'text-offset': [0, 1],
      'text-anchor': 'top'
    },
    paint: {
      'text-color': '#202',
      'text-halo-color': '#fff',
      'text-halo-width': 2
    }
  })

  map.on('mouseenter', PLACEMARK_LAYER_ID, () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', PLACEMARK_LAYER_ID, () => {
    map.getCanvas().style.cursor = ''
  })

  // http://www.mapbox.cn/mapbox-gl-js/example/popup-on-click/
  // https://docs.mapbox.com/mapbox-gl-js/example/filter-markers-by-input/
  map.on('click', PLACEMARK_LAYER_ID, (event) => {
    // @ts-ignore
    const coordinates = event.features![0].geometry.coordinates.slice()
    const description = event.features![0].properties!.description
    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
    }

    lastPlacemarkPopup = createPlacemarkPopup(lib, coordinates, description).addTo(map)
  })
}
