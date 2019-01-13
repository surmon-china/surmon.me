/**
 * @file 一些无法适用于 Store 的数据状态 / ES module
 * @module utils/event-bus
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
      const player = this.player
      return player && this.list.data
        ? this.list.data.tracks[this.state.index]
        : null
    },
    currentSongPicUrl() {
      const defaultImage = `${this.cdnUrl}/images/music-bg.jpg`
      if (this.currentSong) {
        const pictureUrl = this.currentSong.album.picUrl
        return pictureUrl
          ? pictureUrl.replace('http://', this.proxyUrl) + '?param=600y600' 
          : defaultImage
      } else {
        return defaultImage
      }
    }
  },
  methods: {
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
