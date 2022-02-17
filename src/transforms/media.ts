/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

import type { InstagramMediaItem } from '/@/server/getters/instagram'
import { ProxyModule } from '/@/constants/proxy'
import { getTargetProxyURL } from '/@/transforms/url'

// https://www.instagram.com/p/['IMAGE-CODE']/?__a=1
// https://www.surinderbhomra.com/Blog/2016/05/16/Resize-An-Instagram-Image-Using-A-Media-Query-Parameter
export const getInstagramImage = (media: InstagramMediaItem, size?: 't' | 'm' | 'l') => {
  if (size) {
    return getTargetProxyURL(`${media.permalink}media/?size=${size}`, ProxyModule.Instagram)
  } else {
    return getTargetProxyURL(media.media_url, ProxyModule.Instagram)
  }
}

export const getYouTubePlaylistURL = (id: string) => {
  return `https://www.youtube.com/playlist?list=${id}`
}

export const getYouTubeVideoURL = (id: string) => {
  return `https://www.youtube.com/playlist?list=${id}`
}

export const getYouTubeVideoEmbedURL = (id: string, list?: string) => {
  const listParam = list ? `?list=${list}` : ''
  return `https://www.youtube.com/embed/${id}${listParam}`
}

export const getTwitterTweetDetailURL = (uid: string, id: string) => {
  return `https://twitter.com/${uid}/status/${id}`
}

export const get163MusicSongDetailURL = (songID: string | number) => {
  return `https://music.163.com/#/song?id=${songID}`
}
