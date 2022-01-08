/**
 * @file Article state
 * @module store.article
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { isClient } from '/@/app/environment'
import { SortType, OriginState, UniversalExtend } from '/@/constants/state'
import { getArticleContentHeadingElementID } from '/@/constants/anchor'
import nodepress from '/@/services/nodepress'
import { markdownToHTML } from '/@/transforms/markdown'
import { delayPromise } from '/@/utils/delayer'
import { useUniversalStore } from './universal'
import { Category } from './category'
import { Tag } from './tag'

export const ARTICLE_API_PATH = '/article'

export interface Article {
  id: number
  _id: string
  title: string
  description: string
  content: string
  keywords: string[]
  thumb: string
  disabled_comment: boolean
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
  extends: UniversalExtend[]
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
    headingIDRenderer: (text, level, raw) => {
      const id = getArticleContentHeadingElementID(
        level,
        raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
      )
      headings.push({ text, level, id })
      return id
    }
  })

  return { html, headings }
}

export const useArticleDetailStore = defineStore('articleDetail', {
  state: () => ({
    fetching: false,
    article: null as null | Article,
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
      return Boolean(this.article && this.contentLength > 16688)
    },
    splitIndex(): number | null {
      if (this.article && this.isLongContent) {
        const content = this.article.content
        // 坐标优先级：H4 -> H3 -> Code -> \n\n
        const shortContent = content.substring(0, 13688)
        const lastH4Index = shortContent.lastIndexOf('\n####')
        const lastH3Index = shortContent.lastIndexOf('\n###')
        const lastCodeIndex = shortContent.lastIndexOf('\n```')
        const lastLineIndex = shortContent.lastIndexOf('\n\n**')
        return Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex)
      }
      return null
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
    // 阅读全文
    renderFullContent() {
      this.renderedFullContent = true
    },

    // 获取文章详情
    fetchDetail(params: { articleID: number }) {
      this.fetching = true
      this.article = null
      const fetch = nodepress.get(`${ARTICLE_API_PATH}/${params.articleID}`)
      const promise = isClient ? delayPromise(580, fetch) : fetch
      return promise
        .then((response) => {
          this.article = response.result
          this.renderedFullContent = !this.isLongContent
        })
        .finally(() => {
          this.fetching = false
        })
    },

    // 喜欢文章
    postArticleLike(articleID: number) {
      const universalStore = useUniversalStore()
      return nodepress
        .post(`/vote/article`, { article_id: articleID, vote: 1, author: universalStore.author })
        .then((response) => {
          if (this.article) {
            this.article.meta.likes = response.result
          }
        })
    }
  }
})
