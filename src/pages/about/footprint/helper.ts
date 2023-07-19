import type GeoJSON from 'geojson'
import type { LngLatLike, AnyLayer } from 'mapbox-gl'

export interface GoogleMyMapPlacemark {
  index: number
  id: string
  name: string
  description: string
  coordinates: [number, number]
  image: string | null
}
export interface GoogleMyMapFolder {
  name: string
  placemarks: Array<GoogleMyMapPlacemark>
}

export type FeatureCollectionJSON = GeoJSON.FeatureCollection<GeoJSON.Geometry, GoogleMyMapPlacemark>

export const gmmFoldersToGeoJSON = (folders: Array<GoogleMyMapFolder>): FeatureCollectionJSON => ({
  type: 'FeatureCollection',
  features: folders
    .map((folder) => folder.placemarks)
    .flat()
    .map((placemark) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: placemark.coordinates
        },
        properties: {
          ...placemark,
          icon: placemark.image ? 'attraction' : 'veterinary'
        }
      }
    })
})

// https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-symbol-icon-allow-overlap
export const geoJSONFeatureToLayer = (layerId: string, source: any): AnyLayer => {
  return {
    id: layerId,
    source,
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
  }
}

export const newMapboxPopup = (mapboxgl: any, coordinates: LngLatLike, html: string) => {
  return new mapboxgl.Popup({ closeButton: false, offset: [0, -16], maxWidth: `280px` })
    .setLngLat(coordinates)
    .setHTML(html)
}
