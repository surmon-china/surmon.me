/**
 * @file Article state
 * @module store.article
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, shallowRef, computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { useIdentityStore } from './identity'
import { useCDNDomain } from '/@/app/context'
import { SortType } from '/@/constants/state'
import { Article } from '/@/interfaces/article'
import { Pagination, PaginationList } from '/@/interfaces/common'
import { getArticleContentHeadingElementId, getArticleHeadingUrlHash } from '/@/constants/anchor'
import { markdownToHTML, getMarkdownSplitIndex, MarkdownRenderOption } from '/@/transforms/markdown'
import { getStaticURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/app/environment'
import { RENDER_LONG_ARTICLE_THRESHOLD } from '/@/config/app.config'
import nodepress from '/@/services/nodepress'

export const ARTICLE_API_PATH = '/article'

const createSpecialArticleListStore = (_params: Record<string, any>, perPage: number = 8) => {
  return createFetchStore<Article[]>({
    once: true,
    data: [],
    async fetcher() {
      const params = { ..._params, per_page: perPage }
      const response = await nodepress.get<PaginationList<Article>>(ARTICLE_API_PATH, { params })
      return response.result.data
    }
  })
}

export const useLatestArticleListStore = defineStore('latestArticleList', () => {
  return createSpecialArticleListStore({})
})

export const useHottestArticleListStore = defineStore('hottestArticleList', () => {
  return createSpecialArticleListStore({ sort: SortType.Hottest })
})

export const useFeaturedArticleListStore = defineStore('featuredArticleList', () => {
  return createSpecialArticleListStore({ featured: true })
})

export const useArticleListStore = defineStore('articleList', () => {
  const fetching = ref(false)
  const data = shallowRef<Article[]>([])
  const pagination = shallowRef<Pagination | null>(null)

  const fetch = async (params: $TODO = {}) => {
    const isFirstPage = !params.page || params.page === 1
    const isLoadMore = !isFirstPage && params.page > 1

    // clean list
    if (isFirstPage) {
      data.value = []
      pagination.value = null
    }

    fetching.value = true
    try {
      const request = nodepress.get<PaginationList<Article>>(ARTICLE_API_PATH, { params })
      const response = await (isClient ? delayPromise(520, request) : request)
      if (isLoadMore) {
        data.value.push(...response.result.data)
        pagination.value = response.result.pagination
      } else {
        data.value = response.result.data
        pagination.value = response.result.pagination
      }
    } finally {
      fetching.value = false
    }
  }

  return {
    fetch,
    fetching,
    pagination,
    data
  }
})

interface ArticleHeading {
  level: number
  text: string
  anchor: string
  id: string
}

// Use the parsing capabilities of the marked renderer to store the results in the store..
const renderArticleMarkdown = (markdown: string, imageSourceGetter: MarkdownRenderOption['imageSourceGetter']) => {
  const headings: Array<ArticleHeading> = []
  const html = markdownToHTML(markdown, {
    sanitize: false,
    imageSourceGetter,
    headingIdentifierGetter: (_, level, raw) => {
      const anchor = getArticleHeadingUrlHash(raw)
      const id = getArticleContentHeadingElementId(level, anchor)
      headings.push({ level, text: raw, id, anchor })
      return { id, anchor }
    }
  })

  return { html, headings }
}

export const useArticleDetailStore = defineStore('articleDetail', () => {
  const fetching = ref(false)
  const article = ref<Article | null>(null)
  const prevArticle = shallowRef<Article | null>(null)
  const nextArticle = shallowRef<Article | null>(null)
  const relatedArticles = shallowRef<Article[]>([])
  const renderedFullContent = ref(true)

  const contentLength = computed(() => {
    return article.value?.content.length || 0
  })

  const readMinutes = computed(() => {
    const minutes = Math.round(contentLength.value / 400)
    return minutes < 1 ? 1 : minutes
  })

  const isLongContent = computed(() => {
    return Boolean(article.value && contentLength.value >= RENDER_LONG_ARTICLE_THRESHOLD)
  })

  const splitIndex = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null
    }
    return getMarkdownSplitIndex(
      article.value.content,
      Math.min(RENDER_LONG_ARTICLE_THRESHOLD, Math.floor(contentLength.value / 2))
    )
  })

  const optimizeImageSource = (src: string) => {
    if (!isOriginalStaticURL(src)) {
      return src
    }
    const cdnDomain = useCDNDomain()
    const path = getStaticPath(src)
    return getStaticURL(cdnDomain, path)
  }

  const defaultContent = computed(() => {
    if (!article.value) {
      return null
    }
    const markdown = isLongContent.value
      ? article.value.content.substring(0, splitIndex.value!)
      : article.value.content
    const { html, headings } = renderArticleMarkdown(markdown, optimizeImageSource)
    return { markdown, html, headings }
  })

  const moreContent = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null
    }
    const markdown = article.value.content.substring(splitIndex.value!)
    const { html, headings } = renderArticleMarkdown(markdown, optimizeImageSource)
    return { markdown, html, headings }
  })

  const renderFullContent = () => {
    renderedFullContent.value = true
  }

  const fetchArticleDetail = async (articleId: number) => {
    article.value = null
    const request = nodepress.get<Article>(`${ARTICLE_API_PATH}/${articleId}`)
    const response = await (isClient ? delayPromise(580, request) : request)
    article.value = response.result
    renderedFullContent.value = !isLongContent.value
  }

  const fetchArticleContext = async (articleId: number) => {
    prevArticle.value = null
    nextArticle.value = null
    relatedArticles.value = []
    const request = nodepress.get(`${ARTICLE_API_PATH}/${articleId}/context`)
    const response = await (isClient ? delayPromise(520, request) : request)
    prevArticle.value = response.result.prev_article
    nextArticle.value = response.result.next_article
    relatedArticles.value = response.result.related_articles
  }

  const fetchCompleteArticle = (articleId: number) => {
    fetching.value = true
    return Promise.all([fetchArticleDetail(articleId), fetchArticleContext(articleId)]).then(() => {
      fetching.value = false
    })
  }

  const postArticleLike = (articleId: number) => {
    const identityStore = useIdentityStore()
    return nodepress
      .post(`/vote/post`, { post_id: articleId, vote: 1, author: identityStore.author })
      .then((response) => {
        if (article.value) {
          article.value.meta.likes = response.result
        }
      })
  }

  return {
    fetching,
    article,
    prevArticle,
    nextArticle,
    relatedArticles,
    defaultContent,
    moreContent,
    renderedFullContent,
    isLongContent,
    contentLength,
    readMinutes,
    splitIndex,
    renderFullContent,
    fetchCompleteArticle,
    postArticleLike
  }
})
