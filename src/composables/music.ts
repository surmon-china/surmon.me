/**
 * @file Music player
 * @module composable.music
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin, inject, readonly, reactive, computed, unref, toRaw } from 'vue'
import type { Song } from '/@/server/getters/netease-music'
import { UNDEFINED, isUndefined } from '/@/constants/value'
import { TunnelModule } from '/@/constants/tunnel'
import { createLogger } from '/@/utils/logger'
import tunnel from '/@/services/tunnel'

const logger = createLogger('APP:MusicPlayer')

export interface PlayerConfig {
  index?: number
  /** [0 - 1]  */
  volume?: number
  /** There is a delay between song switches */
  delay?: number
  /** Autoplay next */
  continueNext?: boolean
}

const createMusicPlayer = (config: PlayerConfig) => {
  const initIndex = config.index ?? 0
  const initVolume = config.volume ?? 0.6

  const state = reactive({
    initialized: false,
    index: initIndex, // current playing song index
    volume: initVolume,
    muted: false,
    playing: false,
    duration: 0,
    currentTime: 0,
    progress: 0
  })

  const playlist = reactive({
    fetching: false,
    songs: [] as Song[],
    total: 0,
    unplayableIndexs: [] as number[]
  })

  const currentSong = computed(() => {
    if (state.initialized && !isUndefined(state.index)) {
      return playlist.songs[state.index]
    } else {
      return UNDEFINED
    }
  })

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
  const audio = new Audio()
  audio.preload = 'metadata'
  audio.autoplay = false
  audio.loop = false
  audio.volume = initVolume

  const pause = () => {
    audio.pause()
  }

  const play = (index?: number) => {
    if (index != null) {
      state.index = index
      state.currentTime = 0
      state.progress = 0
      audio.src = playlist.songs[index].url
      // https://developer.chrome.com/blog/play-request-was-interrupted/
      audio.play().catch(() => {})
    } else {
      // https://developer.chrome.com/blog/play-request-was-interrupted/
      audio.play().catch(() => {})
    }
  }

  const prevSong = () => {
    play(state.index > 0 ? state.index - 1 : playlist.total - 1)
  }

  const nextSong = () => {
    play(state.index < playlist.total - 1 ? state.index + 1 : 0)
  }

  const setVolume = (volume: number) => {
    audio.volume = volume
  }

  const toggleMuted = () => {
    audio.muted = !audio.muted
  }

  const togglePlay = () => {
    audio.paused ? play() : pause()
  }

  audio.addEventListener('play', () => {
    state.playing = true
  })

  audio.addEventListener('pause', () => {
    state.playing = false
  })

  audio.addEventListener('ended', () => {
    state.playing = false
    if (config.continueNext) {
      window.setTimeout(nextSong, config.delay ?? 0)
    }
  })

  audio.addEventListener('volumechange', () => {
    state.volume = audio.volume
    state.muted = audio.muted
  })

  audio.addEventListener('durationchange', () => {
    state.duration = audio.duration
  })

  audio.addEventListener('timeupdate', () => {
    state.currentTime = audio.currentTime
    state.progress = audio.currentTime / audio.duration
  })

  audio.addEventListener('error', () => {
    logger.warn('something error! auto next', toRaw(unref(currentSong.value)))
    state.playing = false
    // No longer clears the music when a playback exception occurs, assuming the URL is always valid
    // amplitude.removeSong(state.index)
    // But still maintains a list for external use
    playlist.unplayableIndexs.push(state.index)
    // Network blocking can cause interruptions to neighboring subsequent requests,
    // so there needs to be a delay in performing the next operation to avoid waterfall requests.
    window.setTimeout(nextSong, 1668)
  })

  const init = async () => {
    try {
      playlist.fetching = true
      playlist.songs = await tunnel.dispatch<Song[]>(TunnelModule.NetEaseMusic)
      playlist.total = playlist.songs.length
      if (playlist.total) {
        audio.src = playlist.songs[state.index].url
        state.initialized = true
      } else {
        throw 'Empty playlist!'
      }
    } finally {
      playlist.fetching = false
    }
  }

  return {
    audio,
    state: readonly(state),
    playlist: readonly(playlist),
    currentSong,

    init,
    play,
    pause,
    setVolume,
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
