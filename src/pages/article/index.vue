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
            <article-meta
              :id="ANCHORS.ARTICLE_META_ELEMENT_ID"
              :article="article"
              :plain="isMobile"
            >
              <template #action>
                <article-upvote
                  :likes="article.meta.likes"
                  :is-liked="isLiked"
                  :hidden-sponsor="isMobile"
                  :enabled-parkinson="!isMobile && (userAgent.isChrome || userAgent.isFirefox)"
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
              :article-id="articleId"
              :likes="article?.meta?.likes || 0"
              :socials="
                isMobile ? [SocialMedia.Wechat, SocialMedia.Weibo, SocialMedia.Twitter] : []
              "
            />
          </div>
          <div class="module margin overflow">
            <article-neighbour :prev="store.prevArticle" :next="store.nextArticle" />
          </div>
          <div class="module margin overflow">
            <article-related
              :id="ANCHORS.ARTICLE_RELATED_ELEMENT_ID"
              :columns="isMobile ? 2 : 3"
              :count="isMobile ? 4 : 6"
              :articles="store.relatedArticles"
            />
          </div>
        </div>
      </template>
    </placeholder>
    <div class="comment">
      <comment :plain="isMobile" :fetching="fetching" :post-id="articleId" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, shallowRef, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useStores } from '/@/stores'
  import * as ANCHORS from '/@/constants/anchor'
  import { UNDEFINED } from '/@/constants/value'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LanguageKey } from '/@/language'
  import { CUSTOM_ELEMENTS } from '/@/effects/elements'
  import { SocialMedia } from '/@/components/widget/share.vue'
  import Comment from '/@/components/comment/index.vue'
  import ArticleSkeleton from './skeleton.vue'
  import ArticleContent from './content.vue'
  import ArticleShare from './share.vue'
  import ArticleMeta from './meta.vue'
  import ArticleUpvote from './upvote.vue'
  import ArticleRelated from './related.vue'
  import ArticleNeighbour from './neighbour.vue'

  export default defineComponent({
    name: 'ArticleDetail',
    components: {
      Comment,
      ArticleSkeleton,
      ArticleContent,
      ArticleShare,
      ArticleMeta,
      ArticleUpvote,
      ArticleRelated,
      ArticleNeighbour
    },
    props: {
      articleId: {
        type: Number,
        required: true
      },
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { i18n, meta, gtag, globalState } = useEnhancer()
      const { identity, comment: commentStore, articleDetail: articleDetailStore } = useStores()
      const article = computed(() => articleDetailStore.article || UNDEFINED)
      const fetching = computed(() => articleDetailStore.fetching)
      const isLiked = computed(() => {
        return Boolean(article.value && identity.isLikedPage(article.value.id))
      })

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
          const message = i18n.t(LanguageKey.POST_ACTION_ERROR)
          console.warn(message, error)
          alert(message)
        }
      }

      const fetchArticleDetail = (articleID: number) => {
        return Promise.all([
          articleDetailStore.fetchCompleteArticle({ articleID }),
          commentStore.fetchList({ post_id: articleID })
        ])
      }

      const customElementsStyle = shallowRef<string | null>(null)
      const handleContentRendered = (element: HTMLDivElement) => {
        CUSTOM_ELEMENTS.verse.effect?.(element)
        customElementsStyle.value = CUSTOM_ELEMENTS.verse.style?.(element) ?? null
      }

      meta(() => ({
        pageTitle: article.value?.title,
        description: article.value?.description || '',
        keywords: article.value?.keywords?.join(',') || article.value?.title,
        twitterCard: 'summary_large_image',
        ogType: 'article',
        ogImage: article.value?.thumb,
        style: customElementsStyle.value ? [{ children: customElementsStyle.value }] : []
      }))

      onBeforeMount(() => {
        watch(
          () => props.articleId,
          (articleId) => fetchArticleDetail(articleId),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => fetchArticleDetail(props.articleId))

      return {
        ANCHORS,
        SocialMedia,
        userAgent: globalState.userAgent,
        store: articleDetailStore,
        article,
        fetching,
        isLiked,
        handleLike,
        handleSponsor,
        handleContentRendered
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .article-page {
    .module {
      position: relative;

      &.margin {
        margin-bottom: $lg-gap;
      }

      &.background {
        border-radius: $sm-radius;
        @include common-bg-module();
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
        top: -$lg-gap;
        width: $lg-gap;
        height: $lg-gap;
        background: linear-gradient(to bottom, $module-bg, $module-bg-darker-1);
        &.left {
          left: $distance;
        }
        &.right {
          right: $distance;
        }
      }
    }
  }
</style>
