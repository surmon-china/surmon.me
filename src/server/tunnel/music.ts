/**
 * @file BFF Server music
 * @module server.tunnel.music
 * @author Surmon <https://github.com/surmon-china>
 */

import NeteaseMusic from 'simple-netease-cloud-music'
import { TunnelModule } from '@/constants/tunnel'
import { MUSIC_ALBUM_ID } from '@/config/app.config'
import { tunnelCache } from '.'

// https://521dimensions.com/open-source/amplitudejs/docs/configuration/playlists.html
// https://521dimensions.com/open-source/amplitudejs/docs/configuration/song-objects.html#special-keys
export interface Song {
  id: number
  name: string
  album: string
  artist: string
  cover_art_url: string
  url: string
}

const PLAY_LIST_LIMIT = 68
const neteseMusic = new NeteaseMusic()

// 获取歌单列表
const getSongList = async (): Promise<Array<Song>> => {
  const result = await neteseMusic._playlist(MUSIC_ALBUM_ID, PLAY_LIST_LIMIT)
  if (result.code < 0) {
    throw new Error(result.message)
  }
  return (
    result?.playlist?.tracks
      // 过滤掉无版权音乐
      ?.filter((track) => track?.privilege?.cp !== 0)
      // 格式化数据
      ?.map(
        (track) =>
          ({
            id: track.id,
            name: track.name,
            album: track?.al?.name || '-',
            artist: (track.ar || []).map((artist: any) => artist.name).join(' / '),
            cover_art_url: track.al?.picUrl,
            url: null as any as string
          } as Song)
      )
  )
}

// 获取播放地址，403 暂不启用！
const getSongs = async (): Promise<Song[]> => {
  // 1. 获取列表
  const songs = await getSongList()
  // 2. 使用列表的 IDs 获取 urls
  const songIds = songs.map((song) => String(song.id))
  const { data: songUrls } = await neteseMusic.url(songIds, 128)
  // 3. 用 map 合成
  const urlMap = new Map<number, string>(songUrls.map((songUrl) => [songUrl.id, songUrl.url]))
  // 4. 合成可用数据，并过滤掉无有效地址的数据
  return songs
    .map((song) => ({
      ...song,
      url: urlMap.get(song.id) as string
    }))
    .filter((song) => !!song.url)
}

const autoUpdateData = () => {
  getSongList()
    .then((data) => {
      tunnelCache.set(TunnelModule.Music, data)
      // 成功后 1 小时获取新数据
      setTimeout(autoUpdateData, 1000 * 60 * 60 * 1)
    })
    .catch((error) => {
      // 失败后 5 分钟更新一次数据
      console.warn('Tunnel Music 请求失败：', error)
      setTimeout(autoUpdateData, 1000 * 60 * 5)
    })
}

// 初始化默认拉取数据
autoUpdateData()

export const musicService = async (): Promise<any> => {
  if (tunnelCache.has(TunnelModule.Music)) {
    return tunnelCache.get(TunnelModule.Music)
  } else {
    const data = await getSongList()
    tunnelCache.set(TunnelModule.Music, data)
    return data
  }
}
