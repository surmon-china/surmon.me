import {API_ROOT} from '../../config'
import {
	CHANGE_STYLE_MODE,
	GET_INDEX_IMG,
	GET_CAPTCHAURL
} from '../types'
import { getCookie,saveCookie } from '../../utils/authService'

const state = {
  indexImg: '',
  styleMode: getCookie('styleMode') || 'day-mode',
  captchaUrl: API_ROOT + 'users/getCaptcha?'
}

const mutations = {
  [CHANGE_STYLE_MODE](state){
    state.styleMode = (state.styleMode === 'day-mode')?'night-mode':'day-mode'
    saveCookie('styleMode', state.styleMode)
  },
  [GET_INDEX_IMG](state, action){
    state.indexImg = action.indexImg
  },
  [GET_CAPTCHAURL](state){
    state.captchaUrl = API_ROOT + 'users/getCaptcha?' + Math.random()
  }
}

export default {
  state,
  mutations
}