/**
 * @file Music player
 * @module service.music
 * @author Surmon <https://github.com/surmon-china>
 * @document https://521dimensions.com/open-source/amplitudejs/docs
 */

import { App, Plugin, inject, readonly, reactive, computed } from 'vue'
import { UNDEFINED } from '/@/constants/value'
import { TunnelModule } from '/@/constants/tunnel'
import { ProxyModule } from '/@/constants/proxy'
import { getTargetProxyURL } from '/@/transforms/url'
import type { Song } from '/@/server/getters/netease-music'
import tunnel from '/@/services/tunnel'

export interface PlayerConfig {
  amplitude: any
  volume?: number
  autoStart?: boolean
}

const createMusicPlayer = (config: PlayerConfig) => {
  const { amplitude } = config

  // Player state
  const initVolume = config.volume ?? 40
  const state = reactive({
    // 是否初始化
    inited: false,
    // 是否可用
    ready: false,
    // 活动项
    index: 0,
    // 总数
    count: 0,
    // 音量
    volume: initVolume,
    // 图形化
    wave: false,
    // 播放中
    playing: false,
    // 进度
    speeds: 0,
    progress: 0
  })

  // mute state
  const muted = computed<boolean>(() => state.volume === 0)

  // 原始播放列表
  const songList = reactive({
    fetching: false,
    data: [] as Array<Song>
  })

  // playable song list
  const playableSongList = computed<Song[]>(() => {
    return songList.data.map((song) => ({
      ...song,
      // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      cover_art_url: song.cover_art_url
        ? getTargetProxyURL(song.cover_art_url + '?param=600y600', ProxyModule.NetEasyMusic)
        : (null as any as string)
    }))
  })

  const fetchSongList = async () => {
    try {
      songList.fetching = true
      songList.data = await tunnel.dispatch<Song[]>(TunnelModule.NetEaseMusic)
      state.count = songList.data.length
    } catch (error) {
      songList.data = []
      state.count = 0
      throw error
    } finally {
      songList.fetching = false
    }
  }

  const currentSong = computed<Song | void>(() => {
    if (state.inited && state.index !== undefined) {
      return amplitude.getActiveSongMetadata()
    } else {
      return UNDEFINED
    }
  })

  const play = () => amplitude.play()
  const pause = () => amplitude.pause()
  const prevSong = () => amplitude.prev()
  const nextSong = () => amplitude.next()
  const changeVolume = (volume: number) => amplitude.setVolume(volume)
  const toggleMuted = () => changeVolume(muted.value ? initVolume : 0)
  const togglePlay = () => (amplitude.getPlayerState() === 'playing' ? pause() : play())

  const initPlayer = (songs: Song[]) => {
    amplitude.init({
      // 歌曲切换之间的延时
      // https://521dimensions.com/open-source/amplitudejs/docs/configuration/delay.html#public-function
      delay: 668,
      debug: false,
      volume: state.volume,
      songs,
      start_song: 0,
      continue_next: true,
      callbacks: {
        initialized: () => {
          state.ready = true
          state.inited = true
        },
        play: () => {
          state.ready = true
          state.wave = true
          state.playing = true
        },
        pause: () => {
          state.wave = false
          state.playing = false
        },
        stop: () => {
          state.wave = false
          state.playing = false
        },
        volumechange: () => {
          state.volume = amplitude.getVolume()
        },
        timeupdate: () => {
          state.speeds = amplitude.getSongPlayedSeconds()
          state.progress = amplitude.getSongPlayedPercentage()
        },
        song_change: () => {
          state.index = amplitude.getActiveIndex()
        },
        ended: () => {
          state.playing = false
        },
        error: (error: any) => {
          console.warn('播放器出现异常，自动下一首！', state.index, error)
          state.playing = false
          // 播放异常时不再清除音乐，不作 url 可能不可用的假设
          // amplitude.removeSong(state.index)
          // HACK: 网络阻塞会导致紧邻的后续请求中断，所以下一首操作需要延时，避免瀑布式请求
          window.setTimeout(nextSong, 1668)
        }
      }
    })
    amplitude.setRepeat(true)
  }

  const start = async () => {
    try {
      await fetchSongList()
      if (!playableSongList.value.length) {
        state.ready = false
        console.warn('播放列表为空，未找到有效音乐，无法初始化！')
        return
      }
      initPlayer(playableSongList.value)
      // window.$defer.addTask(() => {
      //   window.onmousemove = () => {
      //     state.playing || play()
      //     window.onmousemove = null
      //   }
      // })
    } catch (error) {
      state.ready = false
      console.warn('播放列表请求失败，无法初始化！', error)
    }
  }

  return {
    state: readonly(state),
    muted,
    currentSong,

    start,
    play,
    pause,
    changeVolume,
    toggleMuted,
    togglePlay,
    prevSong,
    nextSong
  }
}

const MusicPlayerSymbol = Symbol('music-player')
export type Music = ReturnType<typeof createMusicPlayer>
export const createMusic = (config: PlayerConfig): Music & Plugin => {
  const musicPlayer = createMusicPlayer(config)
  if (config.autoStart) {
    musicPlayer.start()
  }

  return {
    ...musicPlayer,
    install(app: App) {
      app.provide(MusicPlayerSymbol, musicPlayer)
    }
  }
}

export const useMusic = (): Music => {
  return inject(MusicPlayerSymbol) as Music
}
