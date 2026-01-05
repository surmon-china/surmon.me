import type { Map as MB_Map } from 'mapbox-gl'
import { shallowRef, computed } from 'vue'
import { APP_CONFIG } from '/@/configs/app.config'
import vanilla from '/@/services/vanilla'

export enum TripRouteTransport {
  Null = 0,
  Flight = 1,
  Train = 2,
  Bus = 3,
  Ship = 4,
  Motorcycle = 5,
  Bicycle = 6,
  Walk = 7
}

export interface TripRouteItem {
  id: string
  name: string
  description: string
  transport: TripRouteTransport
  coordinates: [number, number][]
}

const getRouteLineId = (routeId: string) => `trip-route-line-${routeId}`
const getRouteLineHighlightId = (routeId: string) => `${getRouteLineId(routeId)}-highlight`
const getRouteLineActiveId = (routeId: string) => `${getRouteLineId(routeId)}-active`

const getRoutePointsId = (routeId: string) => `trip-route-points-${routeId}`
const getRoutePointsActiveId = (routeId: string) => `${getRoutePointsId(routeId)}-active`

let lastActiveRouteId: string | null = null

export const resetActiveTripRoute = (map: MB_Map) => {
  if (lastActiveRouteId) {
    map.setLayoutProperty(getRouteLineHighlightId(lastActiveRouteId), 'visibility', 'none')
    map.setLayoutProperty(getRouteLineActiveId(lastActiveRouteId), 'visibility', 'none')
    map.setLayoutProperty(getRoutePointsActiveId(lastActiveRouteId), 'visibility', 'none')
    lastActiveRouteId = null
  }
}

export const activateTripRoute = (map: MB_Map, route: TripRouteItem) => {
  resetActiveTripRoute(map)
  lastActiveRouteId = route.id
  map.setLayoutProperty(getRouteLineHighlightId(route.id), 'visibility', 'visible')
  map.setLayoutProperty(getRouteLineActiveId(route.id), 'visibility', 'visible')
  map.setLayoutProperty(getRoutePointsActiveId(route.id), 'visibility', 'visible')
  map.fitBounds([route.coordinates.at(-1)!, route.coordinates[0]], {
    padding: {
      top: 80,
      bottom: 80,
      left: 80,
      right: 380
    }
  })
}

// MARK: data from https://geojson.io
export const useMapTripRoutes = () => {
  const configJson = shallowRef<Array<TripRouteItem>>([])
  const fetchConfigJson = () => {
    return configJson.value.length
      ? Promise.resolve()
      : vanilla.get<Array<TripRouteItem>>('/data/footprint-trip-routes.json').then((result) => {
          configJson.value = result.data
        })
  }

  const geoJsonCollections = computed(() => {
    return configJson.value.map((route) => {
      const { coordinates, ...properties } = route
      const startPoint = coordinates[0]
      const endPoint = coordinates[coordinates.length - 1]
      return {
        id: properties.id,
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: getRouteLineId(properties.id),
            properties: {
              ...properties,
              role: 'line'
            },
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          },
          {
            type: 'Feature',
            id: getRoutePointsId(properties.id),
            properties: {
              ...properties,
              role: 'points'
            },
            geometry: {
              type: 'MultiPoint',
              coordinates: [startPoint, endPoint]
            }
          }
        ]
      }
    })
  })

  return {
    configJson,
    fetchConfigJson,
    geoJsonCollections
  }
}

export const addTripRoutesLayersToMap = (map: MB_Map, routes: TripRouteItem[], geoJsonCollections: any) => {
  geoJsonCollections.forEach((collection: any) => {
    if (!map.getSource(collection.id)) {
      map.addSource(collection.id, {
        type: 'geojson',
        data: collection
      })
    }

    if (!map.getLayer(getRouteLineId(collection.id))) {
      map.addLayer({
        id: getRouteLineId(collection.id),
        type: 'line',
        source: collection.id,
        filter: ['==', ['get', 'role'], 'line'],
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': APP_CONFIG.primary_color,
          'line-width': 3,
          'line-dasharray': [1, 2],
          'line-opacity': 0.3
        }
      })

      map.addLayer({
        id: getRouteLineHighlightId(collection.id),
        type: 'line',
        source: collection.id,
        filter: ['==', ['get', 'role'], 'line'],
        layout: {
          visibility: 'none',
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#ffffff',
          'line-width': 6,
          'line-opacity': 0.8
        }
      })

      map.addLayer({
        id: getRouteLineActiveId(collection.id),
        type: 'line',
        source: collection.id,
        filter: ['==', ['get', 'role'], 'line'],
        layout: {
          visibility: 'none'
        },
        paint: {
          'line-color': APP_CONFIG.primary_color,
          'line-width': 4,
          'line-opacity': 1
        }
      })

      map.addLayer({
        id: getRoutePointsId(collection.id),
        type: 'circle',
        source: collection.id,
        filter: ['==', ['get', 'role'], 'points'],
        paint: {
          'circle-radius': 6,
          'circle-color': APP_CONFIG.primary_color,
          'circle-opacity': 0.4,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-stroke-opacity': 0.4
        }
      })

      map.addLayer({
        id: getRoutePointsActiveId(collection.id),
        type: 'circle',
        source: collection.id,
        filter: ['==', ['get', 'role'], 'points'],
        layout: {
          visibility: 'none'
        },
        paint: {
          'circle-radius': 8,
          'circle-color': APP_CONFIG.primary_color,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 3
        }
      })
    }
  })

  const routeMap = new Map(routes.map((r) => [r.id, r]))
  const touchableLayerIds = geoJsonCollections
    .map((collection) => collection.id)
    .flatMap((id) => [
      getRouteLineId(id),
      getRouteLineHighlightId(id),
      getRouteLineActiveId(id),
      getRoutePointsId(id),
      getRoutePointsActiveId(id)
    ])

  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: touchableLayerIds })
    if (features.length) {
      const routeId = features[0].properties?.id
      const route = routeMap.get(routeId)
      if (route) {
        activateTripRoute(map, route)
      }
    } else {
      resetActiveTripRoute(map)
    }
  })
}
