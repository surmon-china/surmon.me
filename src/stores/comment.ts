/**
 * @file Comment state
 * @module store.comment
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'
import { isClient } from '/@/app/environment'
import { Comment } from '/@/interfaces/comment'
import { Pagination, PaginationList } from '/@/interfaces/common'
import { SortType, CommentParentId } from '/@/constants/state'
import { UNDEFINED } from '/@/constants/value'
import { delayPromise } from '/@/utils/delayer'
import { useIdentityStore } from './identity'

export const COMMENT_API_PATH = '/comment'

export interface CommentFetchParams {
  page?: number
  per_page?: number
  sort?: SortType
  [key: string]: any
}

export interface CommentTreeItem {
  comment: Comment
  children: Array<Comment>
}

export const useCommentStore = defineStore('comment', () => {
  const fetching = ref(false)
  const posting = ref(false)
  const deleting = ref(false)
  const comments = ref<Comment[]>([])
  const pagination = ref<Pagination | null>(null)

  const commentTreeList = computed<CommentTreeItem[]>(() => {
    // only keep 2 level tree
    const ids = comments.value.map((comment) => comment.id)
    const roots = comments.value.filter((comment) => {
      return comment.pid === CommentParentId.Self || !ids.includes(comment.pid)
    })
    const children = comments.value.filter((comment) => {
      return comment.pid !== CommentParentId.Self && ids.includes(comment.pid)
    })
    const fullMap = new Map<number, Comment>(comments.value.map((comment) => [comment.id, comment]))
    const treeMap = new Map<number, { comment: Comment; children: Array<Comment> }>(
      roots.map((comment) => [comment.id, { comment, children: [] }])
    )

    const findRootParentId = (pid: number): number | void => {
      const target = fullMap.get(pid)
      return !target ? UNDEFINED : target.pid === CommentParentId.Self ? target.id : findRootParentId(target.pid)
    }

    children.forEach((comment) => {
      const rootPid = findRootParentId(comment.pid)
      if (rootPid) {
        if (treeMap.has(rootPid)) {
          const target = treeMap.get(rootPid)!
          treeMap.set(rootPid, { ...target, children: [comment, ...target.children] })
        }
      }
    })

    return Array.from(treeMap.values())
  })

  const clearList = () => {
    comments.value = []
    pagination.value = null
  }

  const fetchList = async (params: CommentFetchParams = {}, loadmore = false) => {
    params = {
      page: 1,
      per_page: 50,
      sort: SortType.Desc,
      ...params
    }

    // clear list when refetch
    if (params.page === 1) {
      clearList()
    }

    try {
      fetching.value = true
      const request = nodepress.get<PaginationList<Comment>>(COMMENT_API_PATH, { params })
      const response = await (isClient ? delayPromise(480, request) : request)
      pagination.value = response.result.pagination
      if (loadmore) {
        comments.value.push(...response.result.data)
      } else {
        comments.value = response.result.data
      }
    } finally {
      fetching.value = false
    }
  }

  const postComment = async (comment: Partial<Comment>) => {
    try {
      posting.value = true
      const response = await nodepress.post<Comment>('/disqus/comment', comment)
      comments.value.unshift(response.result)
      if (pagination.value) {
        pagination.value.total++
      }
      return response.result
    } finally {
      posting.value = false
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      deleting.value = true
      await nodepress.delete('/disqus/comment', { data: { comment_id: commentId } })
      const index = comments.value.findIndex((comment) => comment.id === commentId)
      if (index > -1) {
        comments.value.splice(index, 1)
        pagination.value!.total--
      }
    } finally {
      deleting.value = false
    }
  }

  const postCommentVote = async (commentId: number, vote: 1 | -1) => {
    const identityStore = useIdentityStore()
    await nodepress.post(`/vote/comment`, { comment_id: commentId, vote, author: identityStore.author })
    const comment = comments.value.find((comment) => comment.id === commentId)
    if (comment) {
      vote > 0 ? comment.likes++ : comment.dislikes++
    }
  }

  return {
    comments,
    pagination,
    fetching,
    posting,
    deleting,
    commentTreeList,
    clearList,
    fetchList,
    postComment,
    deleteComment,
    postCommentVote
  }
})
