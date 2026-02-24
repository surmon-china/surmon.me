/**
 * @file Comment store
 * @module store/comment
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { isClient } from '/@/configs/app.env'
import { Comment } from '/@/interfaces/comment'
import { Pagination, PaginationList } from '/@/interfaces/pagination'
import { CommentTargetType } from '/@/interfaces/comment'
import { SortMode } from '/@/constants/sort-param'
import { delayPromise } from '/@/utils/delayer'
import { useIdentityStore } from './identity'
import nodepress from '/@/services/nodepress'

export const COMMENT_API_PATH = '/comments'

export interface CommentFetchParams {
  target_type: CommentTargetType
  target_id: number
  page?: number
  per_page?: number
  sort?: SortMode
}

export interface CommentTreeItem {
  comment: Comment
  children: Array<CommentTreeItem>
}

export const useCommentStore = defineStore('comment', () => {
  const fetching = ref(false)
  const posting = ref(false)
  const deleting = ref(false)
  const comments = ref<Comment[]>([])
  const pagination = ref<Pagination | null>(null)

  const hasMore = computed(() => {
    return pagination.value ? pagination.value.current_page < pagination.value.total_page : false
  })

  const commentMap = computed<Map<number, Comment>>(() => {
    return new Map(comments.value.map((c) => [c.id, c]))
  })

  const commentTreeList = computed<CommentTreeItem[]>(() => {
    const map = commentMap.value
    const nodeMap = new Map<number, CommentTreeItem>()
    const rootIdMap = new Map<number, number>()
    const roots: CommentTreeItem[] = []

    for (const comment of map.values()) {
      nodeMap.set(comment.id, { comment, children: [] })
    }

    const findRootId = (id: number): number => {
      if (rootIdMap.has(id)) return rootIdMap.get(id)!

      const comment = map.get(id)
      if (!comment?.parent_id || !map.has(comment.parent_id)) {
        rootIdMap.set(id, id)
        return id
      }

      const rootId = findRootId(comment.parent_id)
      rootIdMap.set(id, rootId)
      return rootId
    }

    for (const node of nodeMap.values()) {
      const id = node.comment.id
      const rootId = findRootId(id)

      if (rootId === id) {
        roots.push(node)
      } else {
        nodeMap.get(rootId)!.children.push(node)
      }
    }

    for (const root of roots) {
      root.children.sort(
        (a, b) => new Date(a.comment.created_at).getTime() - new Date(b.comment.created_at).getTime()
      )
    }

    return roots
  })

  const clearList = () => {
    comments.value = []
    pagination.value = null
  }

  const _fetchList = async (params: CommentFetchParams) => {
    const fetchParams = { per_page: 50, sort: SortMode.Latest, ...params }
    fetching.value = true
    try {
      const request = nodepress.get<PaginationList<Comment>>(COMMENT_API_PATH, {
        params: fetchParams
      })
      const response = await (isClient ? delayPromise(480, request) : request)
      pagination.value = response.result.pagination
      comments.value.push(...response.result.data)
    } finally {
      fetching.value = false
    }
  }

  const fetchList = async (params: CommentFetchParams) => {
    // clear list when refetch
    clearList()
    return _fetchList({ ...params, page: 1 })
  }

  const fetchListNextPage = (params: CommentFetchParams) => {
    if (!pagination.value) {
      const message = 'No pagination data available.'
      console.warn(`[CommentStore] fetchMore: ${message} Please call fetch() first.`)
      return Promise.reject(message)
    }
    if (!hasMore.value) {
      const message = 'No more data to load.'
      console.warn(`[CommentStore] fetchMore: ${message}`)
      return Promise.reject(message)
    }

    return _fetchList({ ...params, page: pagination.value.current_page + 1 })
  }

  const postComment = async (comment: Partial<Comment>) => {
    const identityStore = useIdentityStore()
    try {
      posting.value = true
      const response = await nodepress.post<Comment>('/comments', comment, {
        token: identityStore.token
      })
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
    const identityStore = useIdentityStore()
    try {
      deleting.value = true
      await nodepress.delete(`/account/comments/${commentId}`, { token: identityStore.token })
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
    await nodepress.post(
      `/votes/comment`,
      {
        comment_id: commentId,
        vote,
        author_name: identityStore.profile?.name,
        author_email: identityStore.profile?.email
      },
      { token: identityStore.token }
    )
    const comment = commentMap.value.get(commentId)
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
    hasMore,
    commentMap,
    commentTreeList,
    clearList,
    fetchList,
    fetchListNextPage,
    postComment,
    deleteComment,
    postCommentVote
  }
})
