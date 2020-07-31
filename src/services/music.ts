/**
 * @file Music player
 * @module services/music
 * @author Surmon <https://github.com/surmon-china>
 */

import amplitude from 'amplitudejs'
import { App, Plugin, inject, readonly, reactive, computed } from 'vue'
import { getFileCDNUrl, getFileProxyUrl } from '/@/transforms/url'
import http from './http'

// HACK: Fix #387 https://github.com/521dimensions/amplitudejs/issues/387
// @ts-ignore
window.AmplitudeCore = window.AmplitudeCore || {
  stop: () => console.warn('Forge AmplitudeCore Stop...')
}

export interface MusicConfig {
  albumId: MusicId
  volume?: number
  autoStart?: boolean
}

type MusicId = string | number
interface ISong {
  id: number
  name: string
  album: string
  artist: string
  cover_art_url: string
  url: string
}

const createMusicPlayer = (config: MusicConfig) => {
  // Player state
  const initVolume = config.volume ?? 40
  const state = reactive({
    // 是否初始化
    inited: false,
    // 是否可用
    ready: false,
    // 活动项
    index: 0,
    // 音量
    volume: initVolume,
    // 图形化
    wave: false,
    // 播放中
    playing: false,
    // 进度
    spds: 0,
    progress: 0,
    // 已消费 id
    markedSongIDs: [] as number[]
  })
  const muted = computed<boolean>(() => state.volume === 0)

  // Player data
  const musicList = reactive({
    fetching: false,
    data: null as any
  })

  const musicLrc = reactive({
    fetching: false,
    data: null as any
  })

  const fetchSongUrl = (songId: MusicId) => {
    return http.get<any>(`/music/url/${songId}`)
  }

  const fetchSongList = (listId: MusicId) => {
    musicList.fetching = true
    return http.get<any>(`/music/list/${listId}`)
      .then(response => {
        musicList.data = response.result
        return response
      })
      .catch(error => {
        musicList.data = null
        return Promise.reject(error)
      })
      .finally(() => {
        musicList.fetching = false
      })
  }

  const fetchSongLrc = (songId: MusicId) => {
    musicList.fetching = true
    return http.get(`/music/lrc/${songId}`)
      .then(response => {
        musicList.data = response.result
        return response
      })
      .catch(error => {
        musicLrc.data = null
        return Promise.reject(error)
      })
      .finally(() => {
        musicLrc.fetching = false
      })
  }

  const baseSongList = computed<ISong[]>(() => {
    const tracks = musicList.data?.tracks || []
    return tracks.map((song: $TODO) => ({
      id: song.id,
      name: song.name,
      album: (song.al && song.al.name) || '-',
      artist: (song.ar || [])
        .map((artist: $TODO) => artist.name)
        .join(' & '),
      cover_art_url:
        song.al &&
        getFileProxyUrl(
          song.al.picUrl.replace('http://', '/music/') + '?param=600y600'
        ),
      url: null
    }))
  })

  const todoPlayList = computed<ISong[]>(() => {
    return baseSongList.value.filter((song: ISong) => {
      return !state.markedSongIDs.includes(song.id)
    })
  })

  // eslint-disable-next-line vue/return-in-computed-property
  const currentSong = computed<ISong | void>(() => {
    if (state.inited && state.index !== undefined) {
      return amplitude.getActiveSongMetadata()
    }
  })

  const currentSongPicUrl = computed<string>(() => {
    return currentSong.value
      ? currentSong.value.cover_art_url
      : getFileCDNUrl('/images/music-bg.jpg')
  })


  const currentSongRealTimeLrc = computed<string | null>(() => {
    if (!state.inited) {
      return null
    }

    const lrc = musicLrc.data
    const lyric = lrc && !lrc.nolyric && lrc.lrc

    // not roll
    if (!lyric || lrc.version < 3) {
      return null
    }

    const currentSongLrcs = lyric
      .split('\n')
      .map((timeSentence: string) => {
        // eslint-disable-next-line no-useless-escape
        let time: $TODO = /\[([^\[\]]*)\]/.exec(timeSentence)
        time = time?.length && time[1]
        time = time?.split(':').map((t: string) => Number(t))
        time = time?.length && time.length > 1 && time[0] * 60 + time[1]
        time = time || ''
        let sentence: $TODO = /([^\]]+)$/.exec(timeSentence)
        sentence = sentence?.[1] || ''
        return { time, sentence }
      })
      .filter((timestamp: $TODO) => timestamp.time) as Array<{
        time: number
        sentence: string
      }>

    // empty
    if (!currentSongLrcs.length) {
      return null
    }

    const targetSentence = currentSongLrcs.find(
      (timestamp, index, array) => {
        const next = array[index + 1]
        return timestamp.time <= state.spds && next && next.time > state.spds
      }
    )
    return targetSentence ? targetSentence.sentence : '...'
  })

  const play = () => amplitude.play()
  const pause = () => amplitude.pause()
  const changeVolume = (volume: number) => amplitude.setVolume(volume)
  const toggleMuted = () => changeVolume(muted.value ? initVolume : 0)
  const togglePlay = () => {
    amplitude.getPlayerState() === 'playing'
      ? pause()
      : play()
  }

  const markSongWithBaseList = (songID: number) => state.markedSongIDs.push(songID)
  const takeOutFirstCompleteSongFromList = (): Promise<ISong> => {
    state.ready = false
    if (!todoPlayList.value.length) {
      return Promise.reject('BasePlayerList 为空!')
    }

    const [firstSong] = todoPlayList.value
    return fetchSongUrl(firstSong.id).then(response => {
      const resultData = response.result.data
      const targetData = resultData && resultData[0]
      const songUrl = targetData && targetData.url
      if (!songUrl) {
        return Promise.reject(
          `未得到有效的 Song ${firstSong.id} 的 URL！`
        )
      }
      return {
        ...firstSong,
        url: songUrl.replace(/(http:\/\/|https:\/\/)/gi, getFileProxyUrl('/music/')),
        time_callbacks: {
          // 当任何一首音乐播放到第三秒时开始获取歌词
          3: () => fetchSongLrc((currentSong.value as ISong).id)
        }
      }
    }).finally(() => {
      state.ready = true
      markSongWithBaseList(firstSong.id)
    })
  }

  const prevSong = () => amplitude.prev()
  const nextSong = () => {
    /**
     * 1. 若 base 列表中已没有音乐 | 当前音乐并不是最后一首音乐，则执行播放器的 next
     * 2. 否则，从 base 中取出数据并添加至列表进行播放
     */
    const notLastSong = state.index < amplitude.getSongs().length - 1
    const hasBaseSong = !!todoPlayList.value.length
    if (notLastSong || !hasBaseSong) {
      amplitude.next()
    } else {
      takeOutFirstCompleteSongFromList()
        .then(song => {
          amplitude.playSongAtIndex(amplitude.addSong(song))
        })
        .catch(error => {
          console.warn('nextSong 执行失败，递归执行！', error)
          nextSong()
        })
    }
  }

  const initPlayerWithSong = (song: ISong) => {
    amplitude.init({
      debug: false,
      volume: state.volume,
      songs: [song],
      start_song: 0,
      continue_next: false,
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
          state.spds = amplitude.getSongPlayedSeconds()
          state.progress = amplitude.getSongPlayedPercentage()
        },
        song_change: () => {
          state.index = amplitude.getActiveIndex()
        },
        ended: () => {
          state.playing = false
          nextSong()
        },
        error: (error: $TODO) => {
          console.warn('播放器出现异常，自动下一首！', error)
          const song = currentSong.value as ISong
          state.playing = false
          nextSong()
          markSongWithBaseList(song.id)
          amplitude.removeSong(state.index)
        }
      }
    })
    amplitude.setRepeat(true)
  }


  const start = () => {
    /**
     * 1. Get list
     * 2. Take Out first song -> init player -> play
     * 4. on ended | on next -> tracks.length ? repeat add song : nextSong
     */
    fetchSongList(config.albumId).then(() => {
      const initPlay = () => {
        if (!todoPlayList.value.length) {
          state.ready = false
          console.warn('播放列表为空，未找到有效音乐，无法初始化！')
          return
        }

        // 首次初始化，务必拿到一个完整的 song 用于消费
        takeOutFirstCompleteSongFromList()
          .then(song => {
            initPlayerWithSong(song)
            window.defer.addTask(() => {
              window.onmousemove = () => {
                state.playing || play()
                window.onmousemove = null
              }
            })
          })
          .catch(error => {
            console.warn('initPlay 执行失败，递归执行！', error)
            initPlay()
          })
      }
      initPlay()
    })
  }

  return {
    state: readonly(state),
    muted,
    currentSong,
    currentSongPicUrl,
    currentSongRealTimeLrc,

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
export const createMusic = (config: MusicConfig): Music & Plugin => {
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
