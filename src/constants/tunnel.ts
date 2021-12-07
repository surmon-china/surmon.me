/**
 * @file Tunnel constant
 * @module constant.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

export enum TunnelModule {
  BiliBili = 'bilibili',
  Wallpaper = 'wallpaper',
  GitHub = 'gitHub',
  Music = 'music'
}

export const getTunnelApiPath = (moduleName: TunnelModule) => {
  return `/${moduleName}`
}
