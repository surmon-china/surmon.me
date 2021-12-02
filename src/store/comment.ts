/**
 * @file Comment state
 * @module store.comment
 * @author Surmon <https://github.com/surmon-china>
 */

import * as _ from 'lodash'
import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'
import { SortType } from '/@/constants/state'
import { fetchDelay } from '/@/utils/fetch-delay'

export const COMMENT_API_PATH = '/comment'
export const LIKE_COMMENT_API_PATH = '/like/comment'
export const COMMENT_EMPTY_PID = 0
export interface Author {
  name: string
  email: string
  site: string
}

export interface Comment {
  post_id: number
  id: number
  pid: number | typeof COMMENT_EMPTY_PID
  content: string
  agent?: string
  author: Author
  likes: number
  ip?: string
  ip_location?: {
    city: string
    country: string
  }
  create_at: string
  update_at: string
}
export interface CommentFetchParams {
  page?: number
  per_page?: number
  sort?: SortType
  delay?: number
  loadmore?: boolean
  [key: string]: any
}

export interface CommentTreeItem {
  comment: Comment
  children: Array<Comment>
}

export const useCommentStore = defineStore('comment', {
  state: () => ({
    fetching: false,
    posting: false,
    comments: [] as Array<Comment>,
    pagination: null as null | $TODO
  }),
  getters: {
    commentTreeList: (state): Array<CommentTreeItem> => {
      // only keep 2 level tree
      const ids = state.comments.map((comment) => comment.id)
      const roots = state.comments.filter(
        (comment) => comment.pid === COMMENT_EMPTY_PID || !ids.includes(comment.pid)
      )
      const children = state.comments.filter(
        (comment) => comment.pid !== COMMENT_EMPTY_PID && ids.includes(comment.pid)
      )
      const fullMap = new Map<number, Comment>(
        state.comments.map((comment) => [comment.id, comment])
      )
      const treeMap = new Map<number, { comment: Comment; children: Array<Comment> }>(
        roots.map((comment) => [comment.id, { comment, children: [] }])
      )

      const findRootParentID = (pid: number): number | void => {
        const target = fullMap.get(pid)
        if (!target) {
          return void 0
        }
        return target.pid === COMMENT_EMPTY_PID ? target.id : findRootParentID(target.pid)
      }

      children.forEach((comment) => {
        const rootPID = findRootParentID(comment.pid)
        if (rootPID) {
          if (treeMap.has(rootPID)) {
            const target = treeMap.get(rootPID)!
            treeMap.set(rootPID, {
              ...target,
              children: [...target.children, comment]
            })
          }
        }
      })
      return Array.from(treeMap.values())
    }
  },
  actions: {
    clearList() {
      this.comments = []
      this.pagination = null
    },

    fetchList(params: CommentFetchParams = {}) {
      // 修正参数
      params = {
        page: 1,
        per_page: 88,
        sort: SortType.Desc,
        delay: 0,
        loadmore: false,
        ...params
      }

      const isRestart = params.page === 1
      const isDescSort = params.sort === SortType.Desc

      // 清空数据
      if (isRestart) {
        this.clearList()
      }
      this.fetching = true
      return nodepress
        .get(COMMENT_API_PATH, { params })
        .then((response) => {
          return new Promise((resolve) => {
            fetchDelay(params.delay)(() => {
              if (isDescSort) {
                response.result.data.reverse()
              }
              if (params.loadmore) {
                isDescSort
                  ? this.comments.unshift(...response.result.data)
                  : this.comments.push(...response.result.data)
              } else {
                this.comments = response.result.data
              }
              this.pagination = response.result.pagination
              resolve(void 0)
            })
          })
        })
        .finally(() => {
          this.fetching = false
        })
    },

    // 发布评论
    postComment(comment: Partial<Comment>) {
      this.posting = true
      return nodepress
        .post(COMMENT_API_PATH, comment)
        .then((response) => {
          this.comments.push(response.result)
          if (this.pagination) {
            this.pagination.total++
          }
        })
        .finally(() => {
          this.posting = false
        })
    },

    // 喜欢评论
    postCommentLike(commentID: number) {
      return nodepress.patch(LIKE_COMMENT_API_PATH, { comment_id: commentID }).then(() => {
        const comment = this.comments.find((comment) => comment.id === commentID)
        if (comment) {
          comment.likes++
        }
      })
    }
  }
})
