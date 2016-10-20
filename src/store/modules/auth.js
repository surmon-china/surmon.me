import {
	LOGIN_SUCCESS,
	USERINFO_SUCCESS,
	USERINFO_FAILURE,
	LOGOUT_USER,
	UPDATE_USER_SUCCESS
} from '../types'
import { getCookie } from '../../utils/authService'

const state = {
  token: getCookie('token') || null,
  user: null
}

const mutations = {
  [LOGIN_SUCCESS](state , action){
    state.token = action.token
  },
  [USERINFO_SUCCESS](state,action){
    state.user = action.user
  },
  [USERINFO_FAILURE](state,action){
    state.user = null
  },
  [LOGOUT_USER](state,action){
    state.token = getCookie('token') || null
    state.user = null
    state.token = null
  },
  [UPDATE_USER_SUCCESS](state,action){
    state.user = action.user
  }
}

export default {
  state,
  mutations
}