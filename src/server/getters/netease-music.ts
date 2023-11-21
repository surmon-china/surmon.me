/**
 * @file BFF music getter
 * @module server.getter.music
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'

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
  const playlistURL = `https://music.163.com/api/v6/playlist/detail?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`
  const playlistDetail = await axios.get<any>(playlistURL, { timeout: 6000 })
  if (playlistDetail.data.code < 0) {
    throw new Error(playlistDetail.data.message)
  }

  const trackIds = (playlistDetail.data.playlist?.trackIds as any[]) || []
  const idsParams = trackIds
    .slice(0, PLAY_LIST_LIMIT)
    .map((id) => `{id:${id.id}}`)
    .join(',')
  const songListURL = `https://music.163.com/api/v3/song/detail?c=[${idsParams}]`
  const songListDetail = await axios.get<any>(songListURL, { timeout: 6000 })
  if (!songListDetail.data.songs) {
    throw new Error(songListDetail.data)
  }

  const songs = songListDetail.data.songs || []
  return (
    songs
      // Filtering to remove uncopyrighted music: https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%ad%8c%e5%8d%95
      .filter((song) => !song.noCopyrightRcmd)
      .slice(0, PLAY_LIST_LIMIT)
      .map((song) => ({
        id: song.id,
        duration: song.dt,
        name: song.name,
        album: song.al?.name || '-',
        artist: (song.ar || []).map((artist) => artist.name).join(' / '),
        cover_art_url: song.al?.picUrl,
        // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
        url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
      }))
  )
}
