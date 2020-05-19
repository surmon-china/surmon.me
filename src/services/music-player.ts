/**
 * @file 音乐（外挂应用）/ ES module
 * @module services/music
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import { isBrowser } from '~/environment'
import { getFileCDNUrl, getFileProxyUrl } from '~/transformers/url'

interface ISong {
  id: number
  name: string
  album: string
  artist: string
  cover_art_url: string
  url: string
}

const initVolume = 40

export default new Vue(
  Vue.extend({
    data() {
      return {
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
      }
    },
    computed: {
      muted(): boolean {
        return this.volume === 0
      },
      baseSongList(): ISong[] {
        const storeData = window.$nuxt.$store.state.music.list.data
        const tracks = storeData && storeData.tracks
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
      },
      todoPlayList(): ISong[] {
        return this.baseSongList.filter((song: ISong) => {
          return !this.markedSongIDs.includes(song.id)
        })
      },
      // eslint-disable-next-line vue/return-in-computed-property
      currentSong(): ISong | void {
        if (this.inited && this.index !== undefined) {
          return window.Amplitude.getActiveSongMetadata()
        }
      },
      currentSongPicUrl(): string {
        return this.currentSong
          ? this.currentSong.cover_art_url
          : getFileCDNUrl('/images/music-bg.jpg')
      },
      // eslint-disable-next-line vue/return-in-computed-property
      currentSongLrcData(): $TODO {
        if (this.inited) {
          const lrc = window.$nuxt.$store.state.music.lrc.data
          return lrc && !lrc.nolyric && lrc.lrc
        }
      },
      currentSongRealTimeLrc(): string {
        const currentSongLrcs = this.currentSongLrcData.lyric
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

        if (!currentSongLrcs.length) {
          return '-'
        }

        const targetSentence = currentSongLrcs.find(
          (timestamp, index, array) => {
            const next = array[index + 1]
            return timestamp.time <= this.spds && next && next.time > this.spds
          }
        )
        return targetSentence ? targetSentence.sentence : '...'
      }
    },
    methods: {
      play() {
        window.Amplitude.play()
      },
      pause() {
        window.Amplitude.pause()
      },
      togglePlay() {
        window.Amplitude.getPlayerState() === 'playing'
          ? this.pause()
          : this.play()
      },
      changeVolume(volume: number) {
        window.Amplitude.setVolume(volume)
      },
      toggleMuted() {
        this.changeVolume(this.muted ? initVolume : 0)
      },
      prevSong() {
        window.Amplitude.prev()
      },
      markSongWithBaseList(songID: number) {
        this.markedSongIDs.push(songID)
      },
      takeOutFirstCompleteSongFromList(): Promise<ISong> {
        this.ready = false
        if (!this.todoPlayList.length) {
          return Promise.reject('BasePlayerList 为空!')
        }

        const [firstSong] = this.todoPlayList
        return window.$nuxt.$store
          .dispatch('music/fetchSongUrl', firstSong.id)
          .then(response => {
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
              url: songUrl.replace(
                /(http:\/\/|https:\/\/)/gi,
                getFileProxyUrl('/music/')
              ),
              time_callbacks: {
                // 当任何一首音乐播放到第三秒时开始获取歌词
                3: () => {
                  window.$nuxt.$store.dispatch(
                    'music/fetchSongLrc',
                    (this.currentSong as ISong).id
                  )
                }
              }
            }
          })
          .finally(() => {
            this.ready = true
            this.markSongWithBaseList(firstSong.id)
          })
      },
      nextSong() {
        /**
         * 1. 若 base 列表中已没有音乐 | 当前音乐并不是最后一首音乐，则执行播放器的 next
         * 2. 否则，从 base 中取出数据并添加至列表进行播放
         */
        const notLastSong = this.index < window.Amplitude.getSongs().length - 1
        const hasBaseSong = !!this.todoPlayList.length
        if (notLastSong || !hasBaseSong) {
          window.Amplitude.next()
        } else {
          this.takeOutFirstCompleteSongFromList()
            .then(song => {
              window.Amplitude.playSongAtIndex(window.Amplitude.addSong(song))
            })
            .catch(error => {
              console.warn('nextSong 执行失败，递归执行！', error)
              this.nextSong()
            })
        }
      },
      initPlayerWithSong(song: ISong) {
        window.Amplitude.init({
          debug: false,
          volume: this.volume,
          songs: [song],
          start_song: 0,
          continue_next: false,
          callbacks: {
            initialized: () => {
              this.ready = true
              this.inited = true
            },
            play: () => {
              this.ready = true
              this.wave = true
              this.playing = true
            },
            pause: () => {
              this.wave = false
              this.playing = false
            },
            stop: () => {
              this.wave = false
              this.playing = false
            },
            volumechange: () => {
              this.volume = window.Amplitude.getVolume()
            },
            timeupdate: () => {
              this.spds = window.Amplitude.getSongPlayedSeconds()
              this.progress = window.Amplitude.getSongPlayedPercentage()
            },
            song_change: () => {
              this.index = window.Amplitude.getActiveIndex()
            },
            ended: () => {
              this.playing = false
              this.nextSong()
            },
            error: (error: $TODO) => {
              console.warn('播放器出现异常，自动下一首！', error)
              const song = this.currentSong as ISong
              this.playing = false
              this.nextSong()
              this.markSongWithBaseList(song.id)
              window.Amplitude.removeSong(this.index)
            }
          }
        })
        window.Amplitude.setRepeat(true)
      },
      init() {
        if (!isBrowser) {
          return null
        }

        /**
         * 1. Get list
         * 2. Take Out first song -> init player -> play
         * 4. on ended | on next -> tracks.length ? repeat add song : nextSong
         */
        window.$nuxt.$store.dispatch('music/fetchSongList').then(() => {
          const initPlay = () => {
            if (!this.todoPlayList.length) {
              this.ready = false
              console.warn('播放列表为空，未找到有效音乐，无法初始化！')
              return
            }

            // 首次初始化，务必拿到一个完整的 song 用于消费
            this.takeOutFirstCompleteSongFromList()
              .then(song => {
                this.initPlayerWithSong(song)
                window.addLoadedTask(() => {
                  window.onmousemove = () => {
                    this.playing || this.play()
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
    }
  })
)
