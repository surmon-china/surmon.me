/**
 * @file Music player
 * @module service/music
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin, inject, readonly, reactive, computed, toRaw } from 'vue'
import { getFileCDNUrl, getFileProxyUrl, getTunnelApiPath } from '/@/transforms/url'
import { TunnelModule } from '/@/constants/tunnel'
import type { ISong } from '/@/server/tunnel/music'
import tunnel from '/@/services/tunnel'

export interface MusicConfig {
  amplitude: any
  volume?: number
  autoStart?: boolean
}

type MusicId = string | number

const createMusicPlayer = (config: MusicConfig) => {
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
    // 音量
    volume: initVolume,
    // 图形化
    wave: false,
    // 播放中
    playing: false,
    // 进度
    speeds: 0,
    progress: 0,
    // 已消费 id
    markedSongIds: [] as number[]
  })

  // mute state
  const muted = computed<boolean>(() => state.volume === 0)

  // 原始播放列表
  const songList = reactive({
    fetching: false,
    data: [] as Array<ISong>
  })

  // 可消费播放列表
  const baseSongList = computed<ISong[]>(() => {
    return songList.data.map(song => ({
      ...song,
      url: song.url
        ? song.url.replace(/(http:\/\/|https:\/\/)/gi, getFileProxyUrl('/music/'))
        : null as any as string,
      coverUrl: song.coverUrl
        ? getFileProxyUrl(song.coverUrl.replace('http://', '/music/') + '?param=600y600')
        : null as any as string,
    }))
  })

  // 待播放列表
  const todoPlayList = computed<ISong[]>(() => {
    return baseSongList.value.filter(song => {
      return !state.markedSongIds.includes(song.id)
    })
  })

  const fetchSongList = async () => {
    try {
      songList.fetching = true
      songList.data = await tunnel.get<ISong[]>(getTunnelApiPath(TunnelModule.Music))
    } catch (error) {
      songList.data = []
      throw error
    } finally {
      songList.fetching = false
    }
  }

  // MARK: 暂时停用
  const fetchSongLrc = async (songId: MusicId) => {}

  // eslint-disable-next-line vue/return-in-computed-property
  const currentSong = computed<ISong | void>(() => {
    if (state.inited && state.index !== undefined) {
      return amplitude.getActiveSongMetadata()
    }
  })

  const currentSongPicUrl = computed<string>(() => {
    return currentSong.value
      ? currentSong.value.coverUrl
      : getFileCDNUrl('/images/page-music/background.jpg')
  })

  const currentSongRealTimeLrc = computed<string | null>(() => {
    return null

    /*
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
        return timestamp.time <= state.speeds && next && next.time > state.speeds
      }
    )
    return targetSentence ? targetSentence.sentence : '...'
    */
  })

  const play = () => amplitude.play()
  const pause = () => amplitude.pause()
  const changeVolume = (volume: number) => amplitude.setVolume(volume)
  const toggleMuted = () => changeVolume(muted.value ? initVolume : 0)
  const togglePlay = () => amplitude.getPlayerState() === 'playing'
    ? pause()
    : play()

  const markSongWithBaseList = (songID: number) => state.markedSongIds.push(songID)
  const takeOutFirstCompleteSongFromList = async (): Promise<ISong> => {
    state.ready = false
    if (!todoPlayList.value.length) {
      return Promise.reject('TodoPlayerList 为空!')
    }

    const [firstSong] = todoPlayList.value
    state.ready = true
    console.log('-----firstSong', firstSong)
    markSongWithBaseList(firstSong.id)
    if (!firstSong.url) {
      return Promise.reject(
        `未得到有效的 Song ${firstSong.id} 的 URL！`
      )
    } else {
      return {
        ...firstSong,
        /*
        time_callbacks: {
          // 当任何一首音乐播放到第三秒时开始获取歌词
          3: () => fetchSongLrc((currentSong.value as ISong).id)
        }
        */
      }
    }
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
          console.log('放啊', song, amplitude)
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
          state.speeds = amplitude.getSongPlayedSeconds()
          state.progress = amplitude.getSongPlayedPercentage()
        },
        song_change: () => {
          state.index = amplitude.getActiveIndex()
        },
        ended: () => {
          state.playing = false
          nextSong()
        },
        error: (error: any) => {
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
    fetchSongList().then(() => {
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
            window.$defer.addTask(() => {
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

  return readonly({
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
  })
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
