/**
 * @file Social media
 * @author Surmon <https://github.com/surmon-china>
 */

import type { InstagramMediaItem } from '/@/server/getters/instagram'

export const isImageMediaIns = (media: InstagramMediaItem) => {
  return media.media_type === 'IMAGE'
}

export const isVideoMediaIns = (media: InstagramMediaItem) => {
  return media.media_type === 'VIDEO'
}

export const isAlbumMediaIns = (media: InstagramMediaItem) => {
  return media.media_type === 'CAROUSEL_ALBUM'
}

export const getInstagramCoverURL = (media: InstagramMediaItem) => {
  return isVideoMediaIns(media) ? media.thumbnail_url! : media.media_url
}

// image type media with size
export const getInstagramThumbnail = (media: InstagramMediaItem, size?: 't' | 'm' | 'l') => {
  // https://www.instagram.com/p/['IMAGE-CODE']/?__a=1
  // https://www.surinderbhomra.com/Blog/2016/05/16/Resize-An-Instagram-Image-Using-A-Media-Query-Parameter
  return `${media.permalink}media/?size=${size}`
}

export const autoInstagramThumbnail = (media: InstagramMediaItem, size?: 't' | 'm' | 'l') => {
  const defaultCover = getInstagramCoverURL(media)
  return isVideoMediaIns(media) ? defaultCover : size ? getInstagramThumbnail(media, size) : defaultCover
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

export const getTwitterTweetDetailURL = (username: string, id: string) => {
  return `https://twitter.com/${username}/status/${id}`
}

export const get163MusicSongDetailURL = (songId: string | number) => {
  return `https://music.163.com/#/song?id=${songId}`
}
