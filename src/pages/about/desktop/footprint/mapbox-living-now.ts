import type { Map } from 'mapbox-gl'
import type { MapboxGL } from './mapbox-lib'
import { APP_CONFIG } from '/@/configs/app.config'

export const addLivingMarkerToMap = (lib: MapboxGL, map: Map, coordinates: [number, number]) => {
  return new lib.Marker({
    color: APP_CONFIG.primary_color,
    anchor: 'bottom'
  })
    .setLngLat(coordinates)
    .addTo(map)
}

export const flyToLivingMarker = (map: Map, coordinates: [number, number]) => {
  return map.flyTo({
    center: coordinates,
    zoom: 14
  })
}
