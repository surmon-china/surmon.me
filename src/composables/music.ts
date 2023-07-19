/**
 * @file Music player
 * @module composable.music
 * @author Surmon <https://github.com/surmon-china>
 * @document https://521dimensions.com/open-source/amplitudejs/docs
 */

import { App, Plugin, inject, readonly, reactive, computed } from 'vue'
import type { Song } from '/@/server/getters/netease-music'
import { UNDEFINED, isUndefined } from '/@/constants/value'
import { TunnelModule } from '/@/constants/tunnel'
import { ProxyModule } from '/@/constants/proxy'
import { getProxyURL } from '/@/transforms/url'
import tunnel from '/@/services/tunnel'

export interface PlayerConfig {
  amplitude: any
  volume?: number
}

const createMusicPlayer = (config: PlayerConfig) => {
  const { amplitude } = config

  const initVolume = config.volume ?? 40
  const state = reactive({
    fetching: false, // data fetching
    songs: [] as Array<Song>,
    inited: false,
    readied: false,
    index: 0, // current playing song index
    count: 0, // total song count
    volume: initVolume,
    wave: false,
    playing: false,
    speeds: 0,
    progress: 0
  })

  // mute state
  const muted = computed<boolean>(() => state.volume === 0)

  // playable song list
  const playableSongList = computed<Song[]>(() => {
    return state.songs.map((song) => ({
      ...song,
      cover_art_url: song.cover_art_url
        ? getProxyURL(song.cover_art_url + '?param=300y300', ProxyModule.NetEaseMusic)
        : (null as any as string)
    }))
  })

  const fetchSongList = async () => {
    try {
      state.fetching = true
      state.songs = await tunnel.dispatch<Song[]>(TunnelModule.NetEaseMusic)
      state.count = state.songs.length
    } catch (error) {
      state.songs = []
      state.count = 0
      throw error
    } finally {
      state.fetching = false
    }
  }

  const currentSong = computed<Song | void>(() => {
    if (state.inited && !isUndefined(state.index)) {
      return amplitude.getActiveSongMetadata()
    } else {
      return UNDEFINED
    }
  })

  const play = (index?: number) => {
    if (index != null) {
      amplitude.playSongAtIndex(index)
    } else {
      amplitude.play()
    }
  }
  const pause = () => amplitude.pause()
  const prevSong = () => amplitude.prev()
  const nextSong = () => amplitude.next()
  const changeVolume = (volume: number) => amplitude.setVolume(volume)
  const toggleMuted = () => changeVolume(muted.value ? initVolume : 0)
  const togglePlay = () => (amplitude.getPlayerState() === 'playing' ? pause() : play())

  const initPlayer = (songs: Song[]) => {
    amplitude.init({
      // There is a delay between song switches
      // https://521dimensions.com/open-source/amplitudejs/docs/configuration/delay.html#public-function
      delay: 668,
      debug: false,
      volume: state.volume,
      songs,
      start_song: 0,
      autoplay: false,
      continue_next: true,
      callbacks: {
        initialized: () => {
          state.readied = true
          state.inited = true
        },
        play: () => {
          state.readied = true
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
          console.warn('[player] error! auto next song:', state.index, error)
          state.playing = false
          // No longer clears the music when a playback exception occurs, assuming the URL is always valid
          // amplitude.removeSong(state.index)
          // Network blocking can cause interruptions to neighboring subsequent requests,
          // so there needs to be a delay in performing the next operation to avoid waterfall requests.
          window.setTimeout(nextSong, 1668)
        }
      }
    })
    amplitude.setRepeat(true)
  }

  const init = () => {
    return fetchSongList()
      .then(() => {
        if (playableSongList.value.length) {
          initPlayer(playableSongList.value)
        } else {
          console.warn('[player] init failed! empty song list.')
        }
      })
      .catch((error) => {
        console.warn('[player] init failed! fetch error:', error)
      })
  }

  return {
    state: readonly(state),
    muted,
    currentSong,

    init,
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
