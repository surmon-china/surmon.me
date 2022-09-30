/**
 * @file Article state
 * @module store.article
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { Language } from '/@/language'
import { LONG_ARTICLE_THRESHOLD } from '/@/config/app.config'
import { OriginState, UniversalKeyValue, Pagination } from '/@/constants/state'
import { getArticleContentHeadingElementID } from '/@/constants/anchor'
import { markdownToHTML } from '/@/transforms/markdown'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/app/environment'
import { useIdentityStore } from './identity'
import { Category } from './category'
import { Tag } from './tag'
import nodepress from '/@/services/nodepress'

export const ARTICLE_API_PATH = '/article'

export interface Article {
  id: number
  _id: string
  title: string
  description: string
  content: string
  keywords: string[]
  thumb: string
  origin: OriginState
  tag: Tag[]
  category: Category[]
  lang: Language
  disabled_comment: boolean
  meta: {
    likes: number
    views: number
    comments: number
  }
  update_at: string
  create_at: string
  extends: UniversalKeyValue[]
}

export const useArticleListStore = defineStore('articleList', {
  state: () => ({
    hotList: {
      fetched: false,
      fetching: false,
      data: [] as Array<Article>
    },
    list: {
      fetching: false,
      data: [] as Array<Article>,
      pagination: null as null | Pagination
    }
  }),
  actions: {
    /** fetch new article list */
    fetchList(params: any = {}) {
      const isRestart = !params.page || params.page === 1
      const isLoadMore = !isRestart && params.page > 1

      // clean list
      if (isRestart) {
        this.list.data = []
        this.list.pagination = null
      }

      this.list.fetching = true
      const fetch = nodepress.get<any>(ARTICLE_API_PATH, { params })
      const promise = isClient ? delayPromise(520, fetch) : fetch
      return promise
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

    /** fetch hot article list */
    fetchHottestList() {
      if (this.hotList.fetched) {
        return Promise.resolve()
      }

      this.hotList.fetching = true
      return nodepress
        .get(`${ARTICLE_API_PATH}/hottest`)
        .then((response) => {
          this.hotList.data = response.result
          this.hotList.fetched = true
        })
        .finally(() => {
          this.hotList.fetching = false
        })
    }
  }
})

export interface ArticleHeading {
  text: string
  level: number
  id: string
}
const renderArticleMarkdown = (markdown: string): { html: string; headings: ArticleHeading[] } => {
  const headings: Array<ArticleHeading> = []
  const html = markdownToHTML(markdown, {
    sanitize: false,
    relink: false,
    headingIDRenderer: (html, level, raw) => {
      const id = getArticleContentHeadingElementID(
        level,
        raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
      )
      headings.push({ level, id, text: raw })
      return id
    }
  })

  return { html, headings }
}

export const useArticleDetailStore = defineStore('articleDetail', {
  state: () => ({
    fetching: false,
    article: null as null | Article,
    prevArticle: null as null | Article,
    nextArticle: null as null | Article,
    relatedArticles: [] as Article[],
    renderedFullContent: true
  }),
  getters: {
    contentLength(): number {
      return this.article?.content.length || 0
    },
    readMinutes(): number {
      const minutes = Math.round(this.contentLength / 400)
      return minutes < 1 ? 1 : minutes
    },
    isLongContent(): boolean {
      return Boolean(this.article && this.contentLength >= LONG_ARTICLE_THRESHOLD)
    },
    splitIndex(): number | null {
      if (!this.article || !this.isLongContent) {
        return null
      }

      const splitLength = Math.min(LONG_ARTICLE_THRESHOLD, Math.floor(this.contentLength / 2))
      const shortContent = this.article.content.substring(0, splitLength)
      // 坐标优先级：H5 > H4 > H3 > \n\n\n
      const lastH5Index = shortContent.lastIndexOf('\n##### ')
      const lastH4Index = shortContent.lastIndexOf('\n#### ')
      const lastH3Index = shortContent.lastIndexOf('\n### ')
      const lastLineIndex = shortContent.lastIndexOf('\n\n\n')
      const splitIndex = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex)
      // console.log('- content length', this.contentLength, index, splitIndex)
      return splitIndex
    },
    defaultContent(): null | { markdown: string; html: string; headings: ArticleHeading[] } {
      if (!this.article) {
        return null
      }
      const markdown = this.isLongContent
        ? this.article.content.substring(0, this.splitIndex!)
        : this.article.content
      const { html, headings } = renderArticleMarkdown(markdown)
      return {
        markdown,
        html,
        headings
      }
    },
    moreContent(): null | { markdown: string; html: string; headings: ArticleHeading[] } {
      if (this.article && this.isLongContent) {
        const markdown = this.article.content.substring(this.splitIndex!)
        const { html, headings } = renderArticleMarkdown(markdown)
        return {
          markdown,
          html,
          headings
        }
      }
      return null
    }
  },
  actions: {
    renderFullContent() {
      this.renderedFullContent = true
    },

    fetchArticleDetail(articleID: number) {
      this.article = null
      const fetch = nodepress.get(`${ARTICLE_API_PATH}/${articleID}`)
      const promise = isClient ? delayPromise(580, fetch) : fetch
      return promise.then((response) => {
        this.article = response.result
        this.renderedFullContent = !this.isLongContent
      })
    },

    fetchArticleContext(articleID: number) {
      this.prevArticle = null
      this.nextArticle = null
      this.relatedArticles = []
      return nodepress.get(`${ARTICLE_API_PATH}/${articleID}/context`).then((response) => {
        this.prevArticle = response.result.prev_article
        this.nextArticle = response.result.next_article
        this.relatedArticles = response.result.related_articles
      })
    },

    fetchCompleteArticle(params: { articleID: number }) {
      this.fetching = true
      return Promise.all([
        this.fetchArticleDetail(params.articleID),
        this.fetchArticleContext(params.articleID)
      ]).finally(() => {
        this.fetching = false
      })
    },

    postArticleLike(articleID: number) {
      const identityStore = useIdentityStore()
      return nodepress
        .post(`/vote/post`, { post_id: articleID, vote: 1, author: identityStore.author })
        .then((response) => {
          if (this.article) {
            this.article.meta.likes = response.result
          }
        })
    }
  }
})
