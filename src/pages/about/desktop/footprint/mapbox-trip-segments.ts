import type { Map as MB_Map, LngLatBoundsLike } from 'mapbox-gl'
import { shallowRef, computed } from 'vue'
import { APP_CONFIG } from '/@/configs/app.config'
import vanilla from '/@/services/vanilla'

// Bangkok: [100.54126850944652, 13.731420002813918]
// ChiangMai: [98.99340695630075, 18.78774164878941]
// WatSuanSantidham: [101.07954818227795, 13.179610565376864]
// SiemReap: [103.85948194767982, 13.44170711791299]
// DEKL: [101.88414, 3.02675]
// Xi'an: [108.94234176114963, 34.261012869752534]
// Lhasa: [91.11735015436409, 29.65794847599321]
// TibetGar: [80.12582, 32.49448]
// Delingha: [97.37135478972726, 37.36417118624104]

export enum TripSegmentTransport {
  Meditation = -1,
  Nil = 0,
  Flight = 1,
  Train = 2,
  Bus = 3,
  Ship = 4,
  Motorcycle = 5,
  Bicycle = 6,
  Walk = 7,
  Hiking = 8
}

export const getTransportIconName = (transport: TripSegmentTransport) => {
  if (transport === TripSegmentTransport.Meditation) return 'icon-meditation'
  if (transport === TripSegmentTransport.Nil) return 'icon-route'
  if (transport === TripSegmentTransport.Flight) return 'icon-transport-flight'
  if (transport === TripSegmentTransport.Train) return 'icon-transport-train'
  if (transport === TripSegmentTransport.Bus) return 'icon-transport-bus'
  if (transport === TripSegmentTransport.Ship) return 'icon-transport-ship'
  if (transport === TripSegmentTransport.Motorcycle) return 'icon-transport-motocycle'
  if (transport === TripSegmentTransport.Bicycle) return 'icon-transport-bicycle'
  if (transport === TripSegmentTransport.Walk) return 'icon-transport-walk'
  if (transport === TripSegmentTransport.Hiking) return 'icon-transport-hiking'
  return 'icon-route'
}

interface TripSegment {
  name: string
  transport: TripSegmentTransport
  // MARK: data from https://geojson.io
  coordinates: [number, number][]
}

interface TripSegmentFlat extends TripSegment {
  id: string
  tripId: string
  tripName: string
}

type SegmentsMap = Map<string, TripSegmentFlat>

interface Trip {
  id: string
  name: string
  segments: TripSegment[]
}

const getCoordinatesBounds = (coordinates: [number, number][]): LngLatBoundsLike => {
  let minLng = Infinity
  let minLat = Infinity
  let maxLng = -Infinity
  let maxLat = -Infinity

  for (const [lng, lat] of coordinates) {
    if (lng < minLng) minLng = lng
    if (lat < minLat) minLat = lat
    if (lng > maxLng) maxLng = lng
    if (lat > maxLat) maxLat = lat
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ]
}

export const getFlatSegmentId = (tripId: string, index: number) => `${tripId}-${index}`

const getSegmentLineId = (segmentId: string) => `trip-segment-line-${segmentId}`
const getSegmentLineHighlightId = (segmentId: string) => `${getSegmentLineId(segmentId)}-highlight`
const getSegmentLineActiveId = (segmentId: string) => `${getSegmentLineId(segmentId)}-active`

const getSegmentPointsId = (segmentId: string) => `trip-segment-points-${segmentId}}`
const getSegmentPointsActiveId = (segmentId: string) => `${getSegmentPointsId(segmentId)}-active`

export const lastActiveSegmentId = shallowRef<string | null>(null)

export const resetActiveTripSegment = (map: MB_Map) => {
  if (lastActiveSegmentId.value) {
    map.setLayoutProperty(getSegmentLineHighlightId(lastActiveSegmentId.value), 'visibility', 'none')
    map.setLayoutProperty(getSegmentLineActiveId(lastActiveSegmentId.value), 'visibility', 'none')
    map.setLayoutProperty(getSegmentPointsActiveId(lastActiveSegmentId.value), 'visibility', 'none')
    lastActiveSegmentId.value = null
  }
}

export const activateTripSegment = (map: MB_Map, segment: TripSegmentFlat) => {
  resetActiveTripSegment(map)
  if (!segment.coordinates.length) return
  lastActiveSegmentId.value = segment.id
  map.setLayoutProperty(getSegmentLineHighlightId(segment.id), 'visibility', 'visible')
  map.setLayoutProperty(getSegmentLineActiveId(segment.id), 'visibility', 'visible')
  map.setLayoutProperty(getSegmentPointsActiveId(segment.id), 'visibility', 'visible')
  map.fitBounds(getCoordinatesBounds(segment.coordinates), {
    maxDuration: 8000,
    padding: {
      top: 80,
      bottom: 80,
      left: 80,
      right: 380
    }
  })
}

export const useMapTripSegments = () => {
  const configJson = shallowRef<Array<Trip>>([])
  const fetchConfigJson = () => {
    return configJson.value.length
      ? Promise.resolve()
      : vanilla.get<Array<Trip>>('/data/footprint-trips.json').then((result) => {
          configJson.value = result.data
        })
  }

  const flatSegments = computed<Array<TripSegmentFlat>>(() => {
    return configJson.value.flatMap((trip) => {
      return trip.segments.map((segment, index) => ({
        ...segment,
        id: getFlatSegmentId(trip.id, index),
        tripId: trip.id,
        tripName: trip.name
      }))
    })
  })

  const flatSegmentsMap = computed<SegmentsMap>(() => {
    return new Map(flatSegments.value.map((r) => [r.id, r]))
  })

  const geoJson = computed(() => {
    return flatSegments.value.map((segment) => {
      const { coordinates, ...baseProperties } = segment
      const startPoint = segment.coordinates[0]
      const endPoint = segment.coordinates.at(-1)!
      return {
        id: segment.id,
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: getSegmentLineId(segment.id),
            properties: {
              ...baseProperties,
              role: 'line'
            },
            geometry: {
              type: 'LineString',
              coordinates
            }
          },
          {
            type: 'Feature',
            id: getSegmentPointsId(segment.id),
            properties: {
              ...baseProperties,
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
    flatSegments,
    flatSegmentsMap,
    geoJson
  }
}

export const addTripSegmentsLayersToMap = (
  map: MB_Map,
  flatSegments: TripSegmentFlat[],
  segmentsMap: SegmentsMap,
  geoJson: any
) => {
  geoJson.forEach((collection: any) => {
    if (!map.getSource(collection.id)) {
      map.addSource(collection.id, {
        type: 'geojson',
        data: collection
      })
    }

    if (!map.getLayer(getSegmentLineId(collection.id))) {
      map.addLayer({
        id: getSegmentLineId(collection.id),
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
          'line-opacity': 0.2
        }
      })

      map.addLayer({
        id: getSegmentLineHighlightId(collection.id),
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
        id: getSegmentLineActiveId(collection.id),
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
        id: getSegmentPointsId(collection.id),
        type: 'circle',
        source: collection.id,
        filter: ['==', ['get', 'role'], 'points'],
        paint: {
          'circle-radius': 6,
          'circle-color': APP_CONFIG.primary_color,
          'circle-opacity': 0.4,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-stroke-opacity': 0.3
        }
      })

      map.addLayer({
        id: getSegmentPointsActiveId(collection.id),
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

  const touchableLayerIds = geoJson
    .map((collection) => collection.id)
    .flatMap((id) => [
      getSegmentLineId(id),
      getSegmentLineHighlightId(id),
      getSegmentLineActiveId(id),
      getSegmentPointsId(id),
      getSegmentPointsActiveId(id)
    ])

  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: touchableLayerIds })
    if (features.length) {
      const segmentId = features[0].properties?.id
      const segment = segmentsMap.get(segmentId)
      if (segment) {
        activateTripSegment(map, segment)
      }
    } else {
      resetActiveTripSegment(map)
    }
  })
}
