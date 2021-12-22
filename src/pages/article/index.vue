<template>
  <div class="article-page">
    <placeholder :loading="fetching">
      <template #loading>
        <article-skeleton :social-count="isMobile ? 3 : 8" :releted-count="isMobile ? 2 : 3" />
      </template>
      <template #default>
        <div v-if="article">
          <div class="module">
            <article-content :id="ANCHORS.ARTICLE_CONTENT_ELEMENT_ID" :article="article" />
          </div>
          <div class="like-share-module">
            <article-like-share
              :id="ANCHORS.ARTICLE_LIKE_SHARE_ELEMENT_ID"
              :article-id="articleId"
              :likes="article?.meta?.likes || 0"
              :socials="
                isMobile ? [SocialMedia.Wechat, SocialMedia.Weibo, SocialMedia.Twitter] : []
              "
            />
          </div>
          <div class="module">
            <article-meta
              :id="ANCHORS.ARTICLE_META_ELEMENT_ID"
              :plain="isMobile"
              :article="article"
            />
          </div>
          <client-only>
            <div class="module" v-if="!isMobile">
              <article-mammon />
            </div>
          </client-only>
          <div class="releted-module">
            <article-related
              :id="ANCHORS.ARTICLE_RELETED_ELEMENT_ID"
              :count="isMobile ? 4 : 6"
              :articles="relatedArticles"
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
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import * as ANCHORS from '/@/constants/anchor'
  import { UNDEFINED } from '/@/constants/value'
  import { useArticleDetailStore } from '/@/store/article'
  import { useCommentStore } from '/@/store/comment'
  import { SocialMedia } from '/@/components/widget/share.vue'
  import Comment from '/@/components/comment/index.vue'
  import ArticleSkeleton from './skeleton.vue'
  import ArticleContent from './content.vue'
  import ArticleLikeShare from './like-share.vue'
  import ArticleRelated from './related.vue'
  import ArticleMammon from './mammon.vue'
  import ArticleMeta from './meta.vue'

  export default defineComponent({
    name: 'ArticleDetail',
    components: {
      Comment,
      ArticleSkeleton,
      ArticleContent,
      ArticleMammon,
      ArticleLikeShare,
      ArticleMeta,
      ArticleRelated
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
      const { meta } = useEnhancer()
      const articleDetailStore = useArticleDetailStore()
      const commentStore = useCommentStore()
      const article = computed(() => articleDetailStore.article || UNDEFINED)
      const fetching = computed(() => articleDetailStore.fetching)
      const relatedArticles = computed(() => {
        if (!article.value) {
          return []
        }
        const ARTICLE_COUNT = 6
        const articles = [...article.value.related]
          .filter((article) => article.id !== props.articleId)
          .slice(0, ARTICLE_COUNT)
        if (props.isMobile || articles.length >= ARTICLE_COUNT) {
          return articles
        }
        return [
          ...articles,
          ...new Array(ARTICLE_COUNT - articles.length).fill({
            title: 'null',
            id: null,
            _id: '',
            thumb: ''
          })
        ]
      })

      meta(() => ({
        pageTitle: article.value?.title,
        keywords: article.value?.keywords?.join(',') || article.value?.title,
        description: article.value?.description || ''
      }))

      const fetchArticleDetail = (articleID: number) => {
        return Promise.all([
          articleDetailStore.fetchDetail({ articleID }),
          commentStore.fetchList({ post_id: articleID })
        ])
      }

      onBeforeMount(() => {
        watch(
          () => props.articleId,
          (articleId) => fetchArticleDetail(articleId),
          { flush: 'post' }
        )
      })

      useUniversalFetch(() => fetchArticleDetail(props.articleId))

      return {
        SocialMedia,
        article,
        fetching,
        relatedArticles,
        ANCHORS
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/styles/init.scss';

  .article-page {
    .module {
      margin-bottom: $lg-gap;
      @include radius-box($sm-radius);
      @include common-bg-module();
    }

    .releted-module,
    .like-share-module {
      margin-bottom: $lg-gap;
    }
  }
</style>
