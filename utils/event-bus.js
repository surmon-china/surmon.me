
/*
*
* 一些无法适用于 store 的数据状态
*
*/

import Vue from 'vue'
import musicPlayerBuilder from '~/utils/music-player'
export default new Vue({
  data() {
    return {
      emoji233333: null,
      player: {
        playerState: {
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
    }
  },
  computed: {
    currentSong() {
      if (this.player.list.data) {
        return this.player.list.data.tracks[this.player.playerState.index]
      } else {
        return null
      }
    }
  },
  methods: {
    INIT_PLAYER() {
      const player = this.player
      musicPlayerBuilder(player)
    },

    REQUEST_LIST() {
      this.player.list.fetching = true
    },
    GET_LIST_FAILURE() {
      this.player.list.fetching = false
      this.player.list.data = null
    },
    GET_LIST_SUCCESS(action) {
      this.player.list.fetching = false
      this.player.list.data = action.result
    },

    REQUEST_SONG() {
      this.player.song.fetching = true
    },
    GET_SONG_FAILURE() {
      this.player.song.data = null
      this.player.song.fetching = false
    },
    GET_SONG_SUCCESS(action) {
      this.player.song.data = action.result
      this.player.song.fetching = false
    },
    
    REQUEST_LRC() {
      this.player.lrc.fetching = true
    },
    GET_LRC_FAILURE() {
      this.player.lrc.fetching = false
      this.player.lrc.data = null
    },
    GET_LRC_SUCCESS(action) {
      this.player.lrc.fetching = false
      this.player.lrc.data = action.result
    }
  }
})
