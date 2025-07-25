<script lang="ts" setup>
  import { computed, watch, shallowRef, onBeforeMount, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/app/universal'
  import { useStores } from '/@/stores'
  import { useHead, usePageSeo } from '/@/composables/head'
  import { LocaleKey } from '/@/locales'
  import * as ANCHORS from '/@/constants/element-anchor'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { CUSTOM_ELEMENTS } from '/@/effects/elements'
  import { SocialMedia } from '/@/components/widgets/share.vue'
  import { getChatGPTShareURL } from '/@/transforms/chatgpt'
  import { getExtendValue } from '/@/transforms/state'
  import { scrollToAnchor } from '/@/utils/scroller'
  import logger from '/@/utils/logger'
  import Comment from '/@/components/comment/index.vue'
  import ArticleSkeleton from './skeleton.vue'
  import ArticleContent from './content.vue'
  import ArticleShare from './share.vue'
  import ArticleMeta from './meta.vue'
  import ArticleUpvote from './upvote.vue'
  import ArticleRelated from './related.vue'
  import ArticleNeighbour from './neighbour.vue'
  import ArticleChatgpt from './chatgpt.vue'

  const props = defineProps<{
    articleId: number
    isMobile?: boolean
  }>()

  const { i18n: _i18n, route, gtag, globalState } = useEnhancer()
  const { identity, comment: commentStore, articleDetail: articleDetailStore } = useStores()
  const { article, fetching, prevArticle, nextArticle, relatedArticles } = storeToRefs(articleDetailStore)
  const isLiked = computed(() => Boolean(article.value && identity.isLikedPage(article.value.id)))
  const articleExtends = computed(() => article.value?.extends || [])

  // fot ChatGPT
  const articleGPTId = computed(() => getExtendValue(articleExtends.value, 'chatgpt-conversation-id'))
  const articleGPTResponse = computed(() => getExtendValue(articleExtends.value, 'chatgpt-conversation-response'))
  const articleGPTTimestamp = computed(() => getExtendValue(articleExtends.value, 'chatgpt-conversation-timestamp'))
  const articleGPTModel = computed(() => getExtendValue(articleExtends.value, 'chatgpt-conversation-model'))

  const handleCommentTopBarChatGPTClick = () => {
    gtag?.event('chatgpt_comment_top_bar', {
      event_category: GAEventCategories.Comment
    })
  }

  const handleCommentUsernameChatGPTClick = () => {
    gtag?.event('chatgpt_comment_name_link', {
      event_category: GAEventCategories.Comment
    })
  }

  const handleSponsor = () => {
    globalState.toggleSwitcher('sponsor', true)
    gtag?.event('article_sponsor', {
      event_category: GAEventCategories.Article
    })
  }

  const handleLike = async (callback) => {
    if (isLiked.value) {
      return false
    }

    gtag?.event('article_like', {
      event_category: GAEventCategories.Article
    })
    try {
      await articleDetailStore.postArticleLike(article.value!.id)
      identity.likePage(article.value!.id)
      callback?.()
    } catch (error) {
      const message = _i18n.t(LocaleKey.POST_ACTION_ERROR)
      logger.failure(message, error)
      alert(message)
    }
  }

  const fetchArticleDetail = (articleId: number) => {
    const commentRequest = commentStore.fetchList({ post_id: articleId })
    const articleRequest = articleDetailStore.fetchCompleteArticle(articleId)
    return Promise.all([articleRequest, commentRequest])
  }

  const customElementsStyle = shallowRef<string | null>(null)
  const handleContentRendered = (element: HTMLDivElement) => {
    CUSTOM_ELEMENTS.verse.effect?.(element)
    customElementsStyle.value = CUSTOM_ELEMENTS.verse.style?.(element) ?? null
  }

  useHead(() => ({
    style: customElementsStyle.value ? [{ children: customElementsStyle.value }] : []
  }))

  usePageSeo(() => ({
    pageTitle: article.value?.title,
    description: article.value?.description,
    keywords: article.value?.keywords?.join(',') || article.value?.title,
    ogType: 'article',
    ogImage: article.value?.thumbnail,
    ogImageWidth: 1190,
    ogImageHeight: 420,
    articleTags: article.value?.tags.map((tag) => tag.name),
    articleModifiedTime: article.value?.updated_at,
    articlePublishedTime: article.value?.created_at
  }))

  useUniversalFetch(() => {
    return fetchArticleDetail(props.articleId)
  })

  onBeforeMount(() => {
    watch(
      () => props.articleId,
      (articleId) => fetchArticleDetail(articleId),
      { flush: 'post' }
    )
  })

  onMounted(() => {
    const urlHash = route.hash.slice(1)
    if (!urlHash) return

    const articleHeadings = [
      ...(articleDetailStore.defaultContent?.headings ?? []),
      ...(articleDetailStore.moreContent?.headings ?? [])
    ]
    const elementId =
      urlHash === ANCHORS.COMMENTS_URL_HASH
        ? ANCHORS.COMMENT_ELEMENT_ID
        : articleHeadings.find(({ anchor }) => anchor === urlHash)?.id

    if (elementId && document.getElementById(elementId)) {
      // Allow a certain amount of time to ensure that the browser is rendered.
      setTimeout(() => scrollToAnchor(elementId), 400)
    }
  })
</script>

<template>
  <div class="article-page">
    <placeholder :loading="fetching">
      <template #loading>
        <article-skeleton :social-count="isMobile ? 3 : 8" :related-count="isMobile ? 2 : 3" />
      </template>
      <template #default>
        <div v-if="article">
          <div class="module margin background overflow">
            <article-content
              :id="ANCHORS.ARTICLE_CONTENT_ELEMENT_ID"
              :readmore-id="ANCHORS.ARTICLE_READMORE_ELEMENT_ID"
              :article="article"
              @rendered="handleContentRendered"
            />
            <div class="divider"></div>
            <article-meta :id="ANCHORS.ARTICLE_META_ELEMENT_ID" :article="article" :plain="isMobile">
              <template #action>
                <article-upvote
                  :likes="article.meta.likes"
                  :is-liked="isLiked"
                  :hidden-sponsor="isMobile"
                  :enabled-parkinson="
                    !isMobile && (globalState.userAgent.isChrome || globalState.userAgent.isFirefox)
                  "
                  @like="handleLike"
                  @sponsor="handleSponsor"
                />
              </template>
            </article-meta>
          </div>
          <div class="module margin background">
            <div class="bridge left"></div>
            <div class="bridge right"></div>
            <article-share
              :id="ANCHORS.ARTICLE_SHARE_ELEMENT_ID"
              :article="article"
              :disabled-image-share="isMobile"
              :socials="isMobile ? [SocialMedia.Wechat, SocialMedia.Weibo, SocialMedia.Twitter] : []"
            />
          </div>
          <div class="module margin overflow">
            <article-neighbour :prev="prevArticle" :next="nextArticle" />
          </div>
          <div class="module margin overflow">
            <article-related
              :id="ANCHORS.ARTICLE_RELATED_ELEMENT_ID"
              :columns="isMobile ? 2 : 3"
              :count="isMobile ? 4 : 6"
              :articles="relatedArticles"
            />
          </div>
        </div>
      </template>
    </placeholder>
    <div class="comment">
      <comment :plain="isMobile" :fetching="fetching" :post-id="articleId">
        <template #topbar-extra v-if="articleGPTId">
          <ulink
            class="chat-gpt-link"
            :href="getChatGPTShareURL(articleGPTId)"
            @click="handleCommentTopBarChatGPTClick"
          >
            <i class="iconfont icon-chat-gpt"></i>
          </ulink>
        </template>
        <template #list-top-extra v-if="articleGPTId && articleGPTResponse">
          <article-chatgpt
            :gpt-id="articleGPTId"
            :gpt-response="articleGPTResponse"
            :gpt-timestamp="articleGPTTimestamp"
            :gpt-model="articleGPTModel"
            :hidden-avatar="isMobile"
            @click-link="handleCommentUsernameChatGPTClick"
          />
        </template>
      </comment>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .article-page {
    .module {
      position: relative;

      &.margin {
        margin-bottom: $gap-lg;
      }

      &.background {
        border-radius: $radius-sm;
        @include mix.common-bg-module();
      }

      &.overflow {
        overflow: hidden;
      }

      .divider {
        border-top: 2px dotted $module-bg-darker-1;
      }

      .bridge {
        $distance: 3rem;
        position: absolute;
        top: -$gap-lg;
        width: $gap-lg;
        height: $gap-lg;
        background: linear-gradient(to bottom, $module-bg, $module-bg-darker-1);
        &.left {
          left: $distance;
        }
        &.right {
          right: $distance;
        }
      }
    }

    .comment {
      .chat-gpt-link {
        margin-left: 1rem;
        width: 2em;
        border-radius: 2px;
        text-align: center;
        background-color: $module-bg-darker-1;
        &:hover {
          background-color: $chatgpt-primary;
          color: $white;
        }
      }
    }
  }
</style>
