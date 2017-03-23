/*
*
* 播放器数据状态
*
*/

export const state = {
  player: null,
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

export const mutations = {

  INIT_PLAYER(state, action) {
    state.player = action
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
    state.song.fetching = false
    state.song.data = null
  },
  GET_SONG_SUCCESS(state, action) {
    state.song.fetching = false
    state.song.data = action.result
  },
  SET_CURRENT_SONG(state, action) {
    state.song.fetching = false
    state.song.data = action
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
