/**
 * @file Article detail store
 * @module store/article-detail
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, shallowRef, computed } from 'vue'
import { defineStore } from 'pinia'
import { useIdentityStore } from './identity'
import { useCdnDomain } from '/@/app/context'
import { Article } from '/@/interfaces/article'
import { getArticleContentHeadingElementId, getArticleHeadingUrlHash } from '/@/constants/element-anchor'
import { markdownToHTML, getMarkdownSplitIndex, MarkdownRenderOption } from '/@/transforms/markdown'
import { getStaticURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/configs/app.env'
import { APP_CONFIG } from '/@/configs/app.config'
import nodepress from '/@/services/nodepress'

export const ARTICLE_API_PATH = '/articles'

interface ArticleHeading {
  level: number
  text: string
  anchor: string
  id: string
}

// Use the parsing capabilities of the marked renderer to store the results in the store..
const renderArticleMarkdown = (
  markdown: string,
  imageSourceGetter: MarkdownRenderOption['imageSourceGetter']
) => {
  const headings: Array<ArticleHeading> = []
  const html = markdownToHTML(markdown, {
    sanitize: false,
    imageSourceGetter,
    headingIdentifierGetter: (level, text) => {
      const anchor = getArticleHeadingUrlHash(text)
      const id = getArticleContentHeadingElementId(level, anchor)
      headings.push({ level, text, id, anchor })
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
    return Boolean(article.value && contentLength.value >= APP_CONFIG.render_long_article_threshold)
  })

  const splitIndex = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null
    }

    return getMarkdownSplitIndex(
      article.value.content,
      Math.min(APP_CONFIG.render_long_article_threshold, Math.floor(contentLength.value / 2))
    )
  })

  const optimizeImageSource = (src: string) => {
    if (!isOriginalStaticURL(src)) {
      return src
    }
    const cdnDomain = useCdnDomain()
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
    const response = await nodepress.get<Article>(`${ARTICLE_API_PATH}/${articleId}`)
    article.value = response.result
    renderedFullContent.value = !isLongContent.value
  }

  const fetchArticleContext = async (articleId: number) => {
    prevArticle.value = null
    nextArticle.value = null
    relatedArticles.value = []
    const response = await nodepress.get(`${ARTICLE_API_PATH}/${articleId}/context`, {
      params: { related_count: 6 }
    })
    prevArticle.value = response.result.prev_article
    nextArticle.value = response.result.next_article
    relatedArticles.value = response.result.related_articles
  }

  const fetchCompleteArticle = async (articleId: number) => {
    fetching.value = true
    const request = Promise.all([fetchArticleDetail(articleId), fetchArticleContext(articleId)])
    await (isClient ? delayPromise(520, request) : request)
    fetching.value = false
  }

  const postArticleLike = (articleId: number) => {
    const identityStore = useIdentityStore()
    return nodepress
      .post<number>(
        '/votes/article',
        {
          article_id: articleId,
          vote: 1,
          author_name: identityStore.profile?.name,
          author_email: identityStore.profile?.email
        },
        { token: identityStore.token }
      )
      .then((response) => {
        if (article.value) {
          article.value.stats.likes = response.result
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
