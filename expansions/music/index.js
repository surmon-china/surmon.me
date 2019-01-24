/**
 * @file 音乐（外挂应用）/ ES module
 * @module expansions/music
 * @author Surmon <https://github.com/surmon-china>
 */

import Vue from 'vue'
import playerBuilder from './player'
import appConfig from '~/config/app.config'

export default new Vue({
  data() {
    return {
      player: null,
      state: {
        seek: 0,
        index: 0,
        targetIndex: 0,
        volume: 0.4,
        wave: false,
        ready: false,
        muted: false,
        loading: false,
        playing: false,
        progress: 0
      },
      list: {
        fetching: false,
        data: null
      },
      song: {
        fetching: false,
        data: null
      },
      lrc: {
        fetching: false,
        data: null
      }
    }
  },
  computed: {
    currentSong() {
      return this.player && this.list.data
        ? this.list.data.tracks[this.state.index]
        : null
    },
    currentSongPicUrl() {
      const defaultUrl = `${this.cdnUrl}/images/music-bg.jpg`
      const pictureUrl = this.currentSong && this.currentSong.album.picUrl
      return pictureUrl
        ? pictureUrl.replace('http://', this.proxyUrl + 'music/') + '?param=600y600'
        : defaultUrl
    },
    currentSongLrcContent() {
      const lrc = this.lrc.data
      return (!lrc || lrc.nolyric) ? null : lrc.lrc
    },
    currentSongLrcArr() {
      return this.currentSongLrcContent.lyric.split('\n').map(timeSentence => {
        let time = /\[([^\[\]]*)\]/.exec(timeSentence)
        time = time && time.length && time[1]
        time = time && time.split(':').map(t => Number(t))
        time = time && time.length && time.length > 1 && time[0] * 60 + time[1]
        time = time || ''
        let sentence = /([^\]]+)$/.exec(timeSentence)
        sentence = sentence && sentence.length && sentence[1]
        sentence = sentence || ''
        return { time, sentence }
      }).filter(timestamp => timestamp.time)
    },
    currentSongRealTimeLrc() {
      const currentTime = this.state.seek
      if (!this.currentSongLrcArr.length) {
        return '无滚动歌词'
      }
      const targetSentence = this.currentSongLrcArr.find((timestamp, index, array) => {
        const next = array[index + 1]
        return timestamp.time <= currentTime && next && next.time > currentTime
      })
      return targetSentence ? targetSentence.sentence : '...'
    },
  },
  watch: {
    currentSong() {
      this.fetchSongLrcWhenChangeSong()
    }
  },
  methods: {
    // 当歌曲切换时重新请求歌词
    fetchSongLrcWhenChangeSong() {
      const song = this.currentSong
      if (song && song.id) {
        this.fetchSongLrc(song.id)
      }
    },
    // 安全操作
    humanizeOperation(action) {
      this.state.ready && action.bind(this.player)()
    },
    // 初始化播放器
    initPlayer() {
      this.fetchSongList().then(_ => {
        this.buildPlayer()
      })
    },
    // 构建播放器
    buildPlayer() {
      playerBuilder(this)
      if (this.state.ready && this.player.play) {
        // window.addLoadedTask(this.player.play)
        window.addLoadedTask(() => {
          // this.player.play()
          window.onmousemove = () => {
            this.player.play()
            window.onmousemove = null
          }
        })
      }
    },
    // 获取歌曲列表
    fetchSongList() {
      this.list.fetching = true
      return window.$nuxt.$axios.$get(`/music/list/${appConfig.music.id}`)
        .then(response => {
          this.list.fetching = false
          this.list.data = response.result
        })
        .catch(error => {
          this.list.fetching = false
          this.list.data = null
        })
    },
    // 获取歌曲详情
    fetchSongDetail(song_id) {
      this.song.fetching = true
      return window.$nuxt.$axios.$get(`/music/song/${song_id}`)
        .then(response => {
          this.song.fetching = false
          this.song.data = response.result
        })
        .catch(error => {
          this.song.data = null
          this.song.fetching = false
        })
    },
    // 获取歌曲歌词
    fetchSongLrc(song_id) {
      this.lrc.fetching = true
      return window.$nuxt.$axios.$get(`/music/lrc/${song_id}`)
        .then(response => {
          this.lrc.fetching = false
          this.lrc.data = response.result
        })
        .catch(error => {
          this.lrc.fetching = false
          this.lrc.data = null
        })
    },
    // 获取歌曲地址
    fetchSongUrl(song_id) {
      return window.$nuxt.$axios.$get(`/music/url/${song_id}`)
    }
  }
})
