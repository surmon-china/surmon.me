/**
 * @file Comment state
 * @module store.comment
 * @author Surmon <https://github.com/surmon-china>
 */

import * as _ from 'lodash'
import { defineStore } from 'pinia'
import { isClient } from '/@/app/environment'
import { UNDEFINED } from '/@/constants/value'
import { SortType, UniversalExtend, CommentParentType } from '/@/constants/state'
import { delayer } from '/@/utils/delayer'
import nodepress from '/@/services/nodepress'
import { useUniversalStore } from './universal'

export const COMMENT_API_PATH = '/comment'
export const COMMENT_EMPTY_PID = CommentParentType.Self

export interface Author {
  name: string
  site?: string
  email?: string
  email_hash?: string
}

export interface IPLocation {
  country: string
  country_code: string
  region: string
  region_code: string
  city: string
  zip: string
}

export interface Comment {
  post_id: number
  id: number
  pid: number | typeof COMMENT_EMPTY_PID
  content: string
  agent?: string
  author: Author
  likes: number
  dislikes: number
  ip?: string
  ip_location?: IPLocation
  create_at: string
  update_at: string
  extends: UniversalExtend[]
}
export interface CommentFetchParams {
  page?: number
  per_page?: number
  sort?: SortType
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
    deleting: false,
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
          return UNDEFINED
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
              children: [comment, ...target.children]
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
      params = {
        page: 1,
        per_page: 50,
        sort: SortType.Desc,
        loadmore: false,
        ...params
      }

      // clear list when refetch
      if (params.page === 1) {
        this.clearList()
      }
      this.fetching = true
      return nodepress
        .get(COMMENT_API_PATH, { params })
        .then((response) => {
          return new Promise((resolve) => {
            delayer(isClient ? 368 : 0)(() => {
              this.pagination = response.result.pagination
              if (params.loadmore) {
                this.comments.push(...response.result.data)
              } else {
                this.comments = response.result.data
              }
              resolve(UNDEFINED)
            })
          })
        })
        .finally(() => {
          this.fetching = false
        })
    },

    postComment(comment: Partial<Comment>) {
      this.posting = true
      return nodepress
        .post<Comment>('/disqus/comment', comment)
        .then((response) => {
          this.comments.unshift(response.result)
          if (this.pagination) {
            this.pagination.total++
          }
          return response.result
        })
        .finally(() => {
          this.posting = false
        })
    },

    deleteComment(commentID: number) {
      this.deleting = true
      return nodepress
        .delete('/disqus/comment', { data: { comment_id: commentID } })
        .then(() => {
          const index = this.comments.findIndex((comment) => comment.id === commentID)
          if (index > -1) {
            this.comments.splice(index, 1)
            this.pagination.total--
          }
        })
        .finally(() => {
          this.deleting = false
        })
    },

    postCommentVote(commentID: number, vote: 1 | -1) {
      const universalStore = useUniversalStore()
      return nodepress
        .post(`/vote/comment`, { comment_id: commentID, vote, author: universalStore.author })
        .then(() => {
          const comment = this.comments.find((comment) => comment.id === commentID)
          if (comment) {
            vote > 0 ? comment.likes++ : comment.dislikes++
          }
        })
    }
  }
})
