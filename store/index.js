import Service from '~plugins/axios'

export const actions = {

  // 全局服务初始化
  /*
  async nuxtServerInit({ dispatch }) {
    console.log('commit');
    await dispatch('loadAppInitNeed')
  },

  loadAppInitNeed({ dispatch }) {
    return Promise.all([
      dispatch('loadTagList'),
      dispatch('loadAppOptions')
    ]);
  },

  // 获取全局配置
  loadAppOptions({ commit }) {
    commit('REQUEST_OPTIONS')
    Service.options.getList(params)
    .then(response => {
      if(response.ok) commit('REQUEST_OPTIONS_SUCCESS', response)
      if(!response.ok) commit('REQUEST_OPTIONS_FAILURE')
    })
    .catch(err => {
      commit('REQUEST_OPTIONS_FAILURE', err)
    })
  },

  // 获取标签列表
  loadTagList({ commit }) {
    commit('REQUEST_TAG_LIST')
    Service.tag.getList(params)
    .then(response => {
      if(response.ok) commit('GET_TAG_LIST_SUCCESS', response)
      if(!response.ok) commit('GET_TAG_LIST_FAILURE')
    })
    .catch(err => {
      commit('GET_TAG_LIST_FAILURE', err)
    })
  },
  */

  // 获取最新文章列表
  loadMoreArticle({ commit, dispatch, state }, params = {}) {
    commit('article/REQUEST_LIST')
    Service.get('/article', { params })
    .then(response => {
      if(Object.is(response.statusText, 'OK')) {
        commit('article/ADD_LIST_SUCCESS', response.data)
      } else {
        commit('article/GET_LIST_FAILURE')
      }
    })
    .catch(err => {
      commit('article/GET_LIST_FAILURE', err)
    })
  },

  // 获取文章详情
  GET_DETAIL({ commit, dispatch, state }, params) {
    commit('REQUEST_DETAIL')
    Service.article.getItem(params).then(response => {
      if(response.ok) commit('GET_DETAIL_SUCCESS', { data: response.data.data })
      if(!response.ok) commit('GET_DETAIL_FAILURE')
    }, err => {
      commit('GET_DETAIL_FAILURE', err)
    })
  },

  /*

  // 获取最热文章列表
  GET_HOT_LIST({ commit, dispatch, state }, params) {
    commit('REQUEST_HOT_LIST')
    Service.article.getHot(params).then(response => {
      if(response.ok) commit('GET_HOT_LIST_SUCCESS', { data: response.data.data })
      if(!response.ok) commit('GET_HOT_LIST_FAILURE')
    }, err => {
      commit('GET_HOT_LIST_FAILURE', err)
    })
  },

  

  */

}

/*

export const logout = ({dispatch, router}) => {
  signOut()
  dispatch('LOGOUT_USER')
  window.location.pathname = '/'
}

export const getSnsLogins = ({ dispatch }) => {
  Service.getSnsLogins().then(response => {
    if(!response.ok){
      return dispatch('FAILURE_GET_SNSLOGINS')
    }
    dispatch('SUCCESS_GET_SNSLOGINS', response.data.data)
  }, response => {
    dispatch('FAILURE_GET_SNSLOGINS')
  })
}

export const localLogin = (store, userInfo) => {
  Service.localLogin(userInfo).then(response => {
    if(!response.ok){
      getCaptchaUrl(store)
      return showMsg(store,response.data.error_msg || '登录失败')
    }
    const token = response.data.token
    saveCookie('token',token)
    getUserInfo(store)
    store.dispatch('LOGIN_SUCCESS', {token: token })
    showMsg(store,'登录成功,欢迎光临!','success')
    store.router.go({path:'/'})
  }, response => {
    getCaptchaUrl(store)
    showMsg(store,response.data.error_msg || '登录失败')
  })
}

export const getUserInfo = ({ dispatch }) => {
  Service.getMe().then(response => {
    if(!response.ok){
      return dispatch('USERINFO_FAILURE')
    }
    dispatch('USERINFO_SUCCESS', { user: response.data })
  }, response => {
    dispatch('USERINFO_FAILURE')
  })
}

export const updateUser = (store,userInfo) => {
  Service.mdUser(userInfo).then(response => {
    if(!response.ok){
      return showMsg(store,'更新用户资料失败!')
    }
    store.dispatch('UPDATE_USER_SUCCESS', { user: response.data.data })
    showMsg(store,'更新资料成功!','success')
  }, response => {
    showMsg(store,'更新用户资料失败!')
  })
}


//更改options
export const changeOptions = ({ dispatch },options) => {
  dispatch('CHANGE_OPTIONS', { options: options })
}
//getArticleList
export const getArticleList = ({ dispatch }, options, isAdd) => {
  dispatch('REQUEST_LIST')
  Service.getFrontArticleList(options).then(response => {
    if(!response.ok){
      return dispatch('GET_LIST_FAILURE')
    }
    const json = response.data
    const isMore = !(json.data.length < options.itemsPerPage)
    isAdd
      ? dispatch('ADD_LIST',{
        articleList: json.data,
        isMore:isMore
      })
      : dispatch('LIST',{
        articleList: json.data,
        isMore:isMore
      })
  }, response => {
    dispatch('GET_LIST_FAILURE')
  })
}


export const getArticleDetail = ({ dispatch }, id, user) => {
  Service.getFrontArticle(id).then(response => {
    if(response.ok){
      let isLike = false
      let article = response.data.data
      if(user){
        user.likes.map(item=>{
          if(item.toString() === article._id){
            isLike = true
          }
        })
      }
      dispatch('DETAIL', {
        articleDetail: {...article,isLike:isLike}
      })
    }
  })
}
//getPrenext
export const getPrenext = ({ dispatch,state }, id) => {
  Service.getPrenext(id,state.options.item).then(response => {
    if(response.ok){
      dispatch('PRENEXT_ARTICLE', { prenextArticle: response.data.data })
    }
  })
}

//toggleLike
export const toggleLike = ({ dispatch }, id) => {
  Service.toggleLike(id).then(response => {
    const json = response.data
    if(response.ok){
      dispatch('TOGGLE_LIKE', {
        like_count: json.count,
        isLike: json.isLike
      })
    }
  })
}


export const getCommentList = ({ dispatch },id) => {
  Service.getFrontCommentList(id).then(response => {
    if(!response.ok){
      return dispatch('GET_COMMENT_LIST_FAILURE')
    }
    dispatch('COMMENT_LIST', { commentList: response.data.data })
  }, response => {
    dispatch('GET_COMMENT_LIST_FAILURE')
  })
}

//addComment
export const addComment = (store,data) => {
  Service.addNewComment(data).then(response => {
    if(!response.ok){
      return showMsg(store,response.data.error_msg || '添加评论失败!')
    }
    showMsg(store,'添加评论成功!','success')
    store.dispatch('SUCCESS_ADD_COMMENT', { comment: response.data.data })
  }, response => {
    showMsg(store,response.data.error_msg || '添加评论失败!')
  })
}

export const addReply = (store,cid,data) => {
  Service.addNewReply(cid,data).then(response => {
    if(!response.ok){
      return showMsg(store,response.data.error_msg || '添加回复失败!')
    }
    showMsg(store,'添加回复成功!','success')
    store.dispatch('SUCCESS_ADD_REPLY', { cid:cid,replys: response.data.data })
  }, response => {
    showMsg(store,response.data.error_msg || '添加回复失败!')
  })
}

//getApps
export const getApps = ({ dispatch }) => {
  Service.getApps().then(response => {
    if(!response.ok){
      return dispatch('FAILURE_GET_APPS')
    }
    dispatch('SUCCESS_GET_APPS', { apps: response.data.data })
  }, response => {
    dispatch('FAILURE_GET_APPS')
  })
}

*/
