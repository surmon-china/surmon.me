/**
 * @file BFF music getter
 * @module server.getter.music
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { THIRD_IDS } from '@/config/app.config'

// https://521dimensions.com/open-source/amplitudejs/docs/configuration/playlists.html
// https://521dimensions.com/open-source/amplitudejs/docs/configuration/song-objects.html#special-keys
export interface Song {
  id: number
  duration: number
  name: string
  album: string
  artist: string
  cover_art_url: string
  url: string
}

const PLAY_LIST_LIMIT = 168

export const getSongList = async (): Promise<Array<Song>> => {
  // https://github.com/Binaryify/NeteaseCloudMusicApi/blob/a0500ec648f22a1dd20fc7b529126f813aa26935/module/playlist_track_all.js
  const playlistDetail = await axios.get<any>(
    `https://music.163.com/api/v6/playlist/detail?id=${THIRD_IDS.MUSIC_163_BGM_ALBUM_ID}`,
    { timeout: 6000 }
  )
  if (playlistDetail.data.code < 0) {
    throw new Error(playlistDetail.data.message)
  }

  const trackIDs = (playlistDetail.data.playlist?.trackIds as any[]) || []
  const idsParams = trackIDs
    .slice(0, PLAY_LIST_LIMIT)
    .map((id) => `{id:${id.id}}`)
    .join(',')
  const songListDetail = await axios.get<any>(
    `https://music.163.com/api/v3/song/detail?c=[${idsParams}]`,
    { timeout: 6000 }
  )
  if (!songListDetail.data.songs) {
    throw new Error(songListDetail.data)
  }

  const songs = songListDetail.data.songs || []
  return (
    songs
      // 过滤掉无版权音乐
      // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%ad%8c%e5%8d%95
      .filter((song) => !song.noCopyrightRcmd)
      .slice(0, PLAY_LIST_LIMIT)
      .map(
        (song) =>
          ({
            id: song.id,
            duration: song.dt,
            name: song.name,
            album: song.al?.name || '-',
            artist: (song.ar || []).map((artist) => artist.name).join(' / '),
            cover_art_url: song.al?.picUrl,
            // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
            url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
          } as Song)
      )
  )
}
