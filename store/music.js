/*
*
* 播放器数据状态
*
*/

import musicPlayerBuilder from '~utils/music-player'

export const state = {
  player: null,
  playerState: {
    seek: 0,
    index: 0,
    volume: 0.6,
    wave: false,
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

export const getters = {
  currentSong: state => {
    if (state.list.data) {
      return state.list.data.tracks[state.playerState.index]
    } else {
      return null
    }
  }
}

export const mutations = {

  INIT_PLAYER(state) {
    musicPlayerBuilder(state, mutations)
  },

  REQUEST_LIST(state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.list.fetching = false
    state.list.data = null
  },
  GET_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data = action.result
  },

  REQUEST_SONG(state) {
    state.song.fetching = true
  },
  GET_SONG_FAILURE(state) {
    state.song.data = null
    state.song.fetching = false
  },
  GET_SONG_SUCCESS(state, action) {
    state.song.data = action.result
    state.song.fetching = false
  },
  
  REQUEST_LRC(state) {
    state.lrc.fetching = true
  },
  GET_LRC_FAILURE(state) {
    state.lrc.fetching = false
    state.lrc.data = null
  },
  GET_LRC_SUCCESS(state, action) {
    state.lrc.fetching = false
    state.lrc.data = action.result
  }
}
