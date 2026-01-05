import type _MapboxGL from 'mapbox-gl'

export type MapboxGL = typeof _MapboxGL

export const importMapbox = (): Promise<MapboxGL> => {
  // dynamic import css
  import('mapbox-gl/dist/mapbox-gl.css')

  // dynamic import lib
  return Promise.all([
    import('mapbox-gl').then((result) => result.default),
    new Promise((resolve) => window.setTimeout(resolve, 460))
  ]).then(([mapboxgl]) => mapboxgl)
}
