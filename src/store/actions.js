import api from '../api'
import * as types from './types'

export default {

  // 获取标签列表
  GET_TAG_LIST({ commit, dispatch, state }, params) {
    commit(types.REQUEST_TAG_LIST)
    api.tag.getList(params).then(response => {
      if(response.ok) commit(types.GET_TAG_LIST_SUCCESS, { data: response.data.data })
      if(!response.ok) commit(types.GET_TAG_LIST_FAILURE)
    }, err => {
      commit(types.GET_TAG_LIST_FAILURE, err)
    })
  },

  // 获取最新文章列表
  GET_ARTICLE_LIST({ commit, dispatch, state }, params) {
    commit(types.REQUEST_ARTICLE_LIST)
    api.article.getList(params).then(response => {
      if(response.ok) commit(types.GET_ARTICLE_LIST_SUCCESS, { data: response.data.data })
      if(!response.ok) commit(types.GET_ARTICLE_LIST_FAILURE)
    }, err => {
      commit(types.GET_ARTICLE_LIST_FAILURE, err)
    })
  },

  // 获取最热文章列表
  GET_ARTICLE_HOT_LIST({ commit, dispatch, state }, params) {
    commit(types.REQUEST_ARTICLE_HOT_LIST)
    api.article.getHot(params).then(response => {
      if(response.ok) commit(types.GET_ARTICLE_HOT_LIST_SUCCESS, { data: response.data.data })
      if(!response.ok) commit(types.GET_ARTICLE_HOT_LIST_FAILURE)
    }, err => {
      commit(types.GET_ARTICLE_HOT_LIST_FAILURE, err)
    })
  },

  // 获取文章详情
  GET_ARTICLE_DETAIL({ commit, dispatch, state }, params) {
    commit(types.REQUEST_ARTICLE_DETAIL)
    api.article.getItem(params).then(response => {
      if(response.ok) commit(types.GET_ARTICLE_DETAIL_SUCCESS, { data: response.data.data })
      if(!response.ok) commit(types.GET_ARTICLE_DETAIL_FAILURE)
    }, err => {
      commit(types.GET_ARTICLE_DETAIL_FAILURE, err)
    })
  },

}

/*

export const logout = ({dispatch, router}) => {
  signOut()
  dispatch(types.LOGOUT_USER)
  window.location.pathname = '/'
}

export const getSnsLogins = ({ dispatch }) => {
  api.getSnsLogins().then(response => {
    if(!response.ok){
      return dispatch(types.FAILURE_GET_SNSLOGINS)
    }
    dispatch(types.SUCCESS_GET_SNSLOGINS, response.data.data)
  }, response => {
    dispatch(types.FAILURE_GET_SNSLOGINS)
  })
}

export const localLogin = (store, userInfo) => {
  api.localLogin(userInfo).then(response => {
    if(!response.ok){
      getCaptchaUrl(store)
      return showMsg(store,response.data.error_msg || '登录失败')
    }
    const token = response.data.token
    saveCookie('token',token)
    getUserInfo(store)
    store.dispatch(types.LOGIN_SUCCESS, {token: token })
    showMsg(store,'登录成功,欢迎光临!','success')
    store.router.go({path:'/'})
  }, response => {
    getCaptchaUrl(store)
    showMsg(store,response.data.error_msg || '登录失败')
  })
}

export const getUserInfo = ({ dispatch }) => {
  api.getMe().then(response => {
    if(!response.ok){
      return dispatch(types.USERINFO_FAILURE)
    }
    dispatch(types.USERINFO_SUCCESS, { user: response.data })
  }, response => {
    dispatch(types.USERINFO_FAILURE)
  })
}

export const updateUser = (store,userInfo) => {
  api.mdUser(userInfo).then(response => {
    if(!response.ok){
      return showMsg(store,'更新用户资料失败!')
    }
    store.dispatch(types.UPDATE_USER_SUCCESS, { user: response.data.data })
    showMsg(store,'更新资料成功!','success')
  }, response => {
    showMsg(store,'更新用户资料失败!')
  })
}


//更改options
export const changeOptions = ({ dispatch },options) => {
  dispatch(types.CHANGE_OPTIONS, { options: options })
}
//getArticleList
export const getArticleList = ({ dispatch }, options, isAdd) => {
  dispatch(types.REQUEST_ARTICLE_LIST)
  api.getFrontArticleList(options).then(response => {
    if(!response.ok){
      return dispatch(types.GET_ARTICLE_LIST_FAILURE)
    }
    const json = response.data
    const isMore = !(json.data.length < options.itemsPerPage)
    isAdd
      ? dispatch(types.ADD_ARTICLE_LIST,{
        articleList: json.data,
        isMore:isMore
      })
      : dispatch(types.ARTICLE_LIST,{
        articleList: json.data,
        isMore:isMore
      })
  }, response => {
    dispatch(types.GET_ARTICLE_LIST_FAILURE)
  })
}


export const getArticleDetail = ({ dispatch }, id, user) => {
  api.getFrontArticle(id).then(response => {
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
      dispatch(types.ARTICLE_DETAIL, {
        articleDetail: {...article,isLike:isLike}
      })
    }
  })
}
//getPrenext
export const getPrenext = ({ dispatch,state }, id) => {
  api.getPrenext(id,state.options.item).then(response => {
    if(response.ok){
      dispatch(types.PRENEXT_ARTICLE, { prenextArticle: response.data.data })
    }
  })
}

//toggleLike
export const toggleLike = ({ dispatch }, id) => {
  api.toggleLike(id).then(response => {
    const json = response.data
    if(response.ok){
      dispatch(types.TOGGLE_LIKE, {
        like_count: json.count,
        isLike: json.isLike
      })
    }
  })
}


export const getCommentList = ({ dispatch },id) => {
  api.getFrontCommentList(id).then(response => {
    if(!response.ok){
      return dispatch(types.GET_COMMENT_LIST_FAILURE)
    }
    dispatch(types.COMMENT_LIST, { commentList: response.data.data })
  }, response => {
    dispatch(types.GET_COMMENT_LIST_FAILURE)
  })
}

//addComment
export const addComment = (store,data) => {
  api.addNewComment(data).then(response => {
    if(!response.ok){
      return showMsg(store,response.data.error_msg || '添加评论失败!')
    }
    showMsg(store,'添加评论成功!','success')
    store.dispatch(types.SUCCESS_ADD_COMMENT, { comment: response.data.data })
  }, response => {
    showMsg(store,response.data.error_msg || '添加评论失败!')
  })
}

export const addReply = (store,cid,data) => {
  api.addNewReply(cid,data).then(response => {
    if(!response.ok){
      return showMsg(store,response.data.error_msg || '添加回复失败!')
    }
    showMsg(store,'添加回复成功!','success')
    store.dispatch(types.SUCCESS_ADD_REPLY, { cid:cid,replys: response.data.data })
  }, response => {
    showMsg(store,response.data.error_msg || '添加回复失败!')
  })
}

//getApps
export const getApps = ({ dispatch }) => {
  api.getApps().then(response => {
    if(!response.ok){
      return dispatch(types.FAILURE_GET_APPS)
    }
    dispatch(types.SUCCESS_GET_APPS, { apps: response.data.data })
  }, response => {
    dispatch(types.FAILURE_GET_APPS)
  })
}

*/
