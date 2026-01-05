import type { Map } from 'mapbox-gl'
import type { MapboxGL } from './mapbox-lib'
import { APP_META, APP_CONFIG } from '/@/configs/app.config'

export const addLivingMarkerToMap = (lib: MapboxGL, map: Map) => {
  return new lib.Marker({
    color: APP_CONFIG.primary_color,
    anchor: 'bottom'
  })
    .setLngLat(APP_META.about_page_geo_coordinates as any)
    .addTo(map)
}

export const flyToLivingMarker = (map: Map) => {
  return map.flyTo({
    center: APP_META.about_page_geo_coordinates as any,
    zoom: 14
  })
}
