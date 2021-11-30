/**
 * @file Comment state
 * @module store.comment
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'
import { SortType } from '/@/constants/state'
import { fetchDelay } from '/@/utils/fetch-delay'

export const COMMENT_API_PATH = '/comment'
export const LIKE_COMMENT_API_PATH = '/like/comment'

export interface Author {
  name: string
  email: string
  site: string
}

export interface Comment {
  post_id: number
  id: number
  pid: number
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
  [key: string]: any
}

export const useCommentStore = defineStore('comment', {
  state: () => ({
    fetching: false,
    posting: false,
    comments: [] as Array<Comment>,
    pagination: null as null | $TODO
  }),
  getters: {
    // TODO: Tree
    // tree: state => {}
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
              this.comments = response.result.data
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
