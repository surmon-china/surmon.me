/**
 * @file Article state
 * @module store.article
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { SortType, OriginState } from '/@/constants/state'
import { fetchDelay } from '/@/utils/fetch-delay'
import nodepress from '/@/services/nodepress'
import { Category } from './category'
import { Tag } from './tag'

export const ARTICLE_API_PATH = '/article'
export const LIKE_ARTICLE_API_PATH = '/like/article'

export interface Article {
  id: number
  _id: string
  title: string
  description: string
  content: string
  keywords: string[]
  thumb: string
  meta: {
    likes: number
    views: number
    comments: number
  }
  origin: OriginState
  update_at: string
  create_at: string
  tag: Tag[]
  category: Category[]
  related: Article[]
}

export const useArticleStore = defineStore('article', {
  state: () => ({
    hotList: {
      fetched: false,
      fetching: false,
      data: [] as Array<Article>
    },
    list: {
      fetching: false,
      data: [] as Array<Article>,
      pagination: null as null | $TODO
    },
    archive: {
      fetching: false,
      data: [] as Array<Article>
    },
    detail: {
      fetching: false,
      data: null as null | Article
    }
  }),
  actions: {
    // 获取文章列表
    fetchList(params: any = {}) {
      const isRestart = !params.page || params.page === 1
      const isLoadMore = !isRestart && params.page > 1

      // 清空已有数据
      if (isRestart) {
        this.list.data = []
        this.list.pagination = null
      }

      this.list.fetching = true
      return nodepress
        .get<any>(ARTICLE_API_PATH, { params })
        .then((response) => {
          if (isLoadMore) {
            this.list.data.push(...response.result.data)
            this.list.pagination = response.result.pagination
          } else {
            this.list.data = response.result.data
            this.list.pagination = response.result.pagination
          }
        })
        .finally(() => {
          this.list.fetching = false
        })
    },

    // 获取最热文章列表
    fetchHotList() {
      if (this.hotList.fetched) {
        return Promise.resolve()
      }

      this.hotList.fetching = true
      return nodepress
        .get(ARTICLE_API_PATH, { params: { cache: 1, sort: SortType.Hot } })
        .then((response) => {
          this.hotList.data = response.result.data
          this.hotList.fetched = true
        })
        .finally(() => {
          this.hotList.fetching = false
        })
    },

    // 获取全部文章列表
    fetchArchive(params: any = {}) {
      if (this.archive.data.length) {
        return Promise.resolve()
      }
      this.archive.fetching = true
      return nodepress
        .get<{ data: Array<Article> }>(ARTICLE_API_PATH, { params: { per_page: 666, ...params } })
        .then((response) => {
          this.archive.data = response.result.data
        })
        .finally(() => {
          this.archive.fetching = false
        })
    },

    // 获取文章详情
    fetchDetail(params: { delay?: number; articleID: number }) {
      this.detail.fetching = true
      this.detail.data = null
      return nodepress
        .get(`${ARTICLE_API_PATH}/${params.articleID}`)
        .then((response) => {
          return new Promise((resolve) => {
            fetchDelay(params.delay || 0)(() => {
              this.detail.data = response.result
              resolve(void 0)
            })
          })
        })
        .finally(() => {
          this.detail.fetching = false
        })
    },

    // 喜欢文章
    postArticleLike(articleID: number) {
      return nodepress.patch(LIKE_ARTICLE_API_PATH, { article_id: articleID }).then(() => {
        const article = this.detail.data
        if (article) {
          article.meta.likes++
        }
      })
    }
  }
})
