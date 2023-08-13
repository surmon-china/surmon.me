/**
 * @file Article state
 * @module store.article
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, shallowRef, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetchStore } from './_fetch'
import { useIdentityStore } from './identity'
import { useCDNDomain } from '/@/app/context'
import { Article } from '/@/interfaces/article'
import { Pagination, PaginationList } from '/@/interfaces/common'
import { getArticleContentHeadingElementId } from '/@/constants/anchor'
import { markdownToHTML, MarkdownRenderOption } from '/@/transforms/markdown'
import { getStaticURL, getStaticPath, getImgProxyURL, isOriginalStaticURL } from '/@/transforms/url'
import { getImgProxyPath } from '/@/transforms/imgproxy'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/app/environment'
import { LONG_ARTICLE_THRESHOLD } from '/@/config/app.config'
import nodepress from '/@/services/nodepress'

export const ARTICLE_API_PATH = '/article'

export const useHottestArticleListStore = defineStore('hottestArticleList', () => {
  return useFetchStore<Article[]>({
    once: true,
    data: [],
    async fetcher() {
      const response = await nodepress.get<Article[]>(`${ARTICLE_API_PATH}/hottest`)
      return response.result
    }
  })
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
  text: string
  level: number
  id: string
}

// Use the parsing capabilities of the marked renderer to store the results in the store..
const renderArticleMarkdown = (markdown: string, imageSourceGetter: MarkdownRenderOption['imageSourceGetter']) => {
  const headings: Array<ArticleHeading> = []
  const html = markdownToHTML(markdown, {
    sanitize: false,
    imageSourceGetter,
    headingIdGetter: (_, level, raw) => {
      const text = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
      const id = getArticleContentHeadingElementId(level, text)
      headings.push({ level, id, text: raw })
      return id
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
    return Boolean(article.value && contentLength.value >= LONG_ARTICLE_THRESHOLD)
  })

  const splitIndex = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null
    }
    const splitLength = Math.min(LONG_ARTICLE_THRESHOLD, Math.floor(contentLength.value / 2))
    const shortContent = article.value.content.substring(0, splitLength)
    // breakpoint priority: H5 > H4 > H3 > \n\n\n
    const lastH5Index = shortContent.lastIndexOf('\n##### ')
    const lastH4Index = shortContent.lastIndexOf('\n#### ')
    const lastH3Index = shortContent.lastIndexOf('\n### ')
    const lastLineIndex = shortContent.lastIndexOf('\n\n\n')
    const splitIndex = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex)
    // console.log('- content length', contentLength.value, index, splitIndex)
    return splitIndex
  })

  const optimizeImageSource = (src: string) => {
    if (!isOriginalStaticURL(src)) {
      return src
    }

    const cdnDomain = useCDNDomain()
    const path = getStaticPath(src)
    return {
      src: getStaticURL(cdnDomain, path),
      sources: [
        { type: 'image/avif', srcset: getImgProxyURL(cdnDomain, getImgProxyPath(path, { format: 'avif' })) },
        { type: 'image/webp', srcset: getImgProxyURL(cdnDomain, getImgProxyPath(path, { format: 'webp' })) }
      ]
    }
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
