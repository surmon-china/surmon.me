/**
 * @file BFF music getter
 * @module server.getter.music
 * @author Surmon <https://github.com/surmon-china>
 */

import NeteaseMusic from 'simple-netease-cloud-music'
import { THIRD_IDS } from '@/config/app.config'

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
export const getSongList = async (): Promise<Array<Song>> => {
  const result = await neteseMusic._playlist(THIRD_IDS.MUSIC_163_BGM_ALBUM_ID, PLAY_LIST_LIMIT)
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
export const getSongs = async (): Promise<Song[]> => {
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
