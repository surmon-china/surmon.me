<template>
  <div class="article-page" :class="{ mobile: isMobile }">
    <div class="module">
      <article-content :id="ARTICLE_CONTENT_ELEMENT_ID" :fetching="fetching" :article="article" />
    </div>
    <client-only>
      <div class="module">
        <article-mammon :fetching="fetching" />
      </div>
    </client-only>
    <div class="module">
      <article-share :id="ARTICLE_SHARE_ELEMENT_ID" :fetching="fetching" />
    </div>
    <div class="module">
      <article-meta :id="ARTICLE_META_ELEMENT_ID" :fetching="fetching" :article="article" />
    </div>
    <div class="releted">
      <article-related
        :id="ARTICLE_RELETED_ELEMENT_ID"
        :fetching="fetching"
        :articles="relatedArticles"
      />
    </div>
    <div class="comment">
      <comment :fetching="fetching" :post-id="articleId" :likes="article?.meta?.likes" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { prefetch } from '/@/universal'
  import { isClient } from '/@/app/environment'
  import {
    ARTICLE_CONTENT_ELEMENT_ID,
    ARTICLE_META_ELEMENT_ID,
    ARTICLE_RELETED_ELEMENT_ID,
    ARTICLE_SHARE_ELEMENT_ID
  } from '/@/constants/anchor'
  import { useArticleDetailStore } from '/@/store/article'
  import { useCommentStore } from '/@/store/comment'
  import ArticleContent from './content.vue'
  import ArticleMammon from './mammon.vue'
  import ArticleShare from './share.vue'
  import ArticleMeta from './meta.vue'
  import ArticleRelated from './related.vue'
  import Comment from '/@/components/comment/index.vue'

  export default defineComponent({
    name: 'ArticleDetail',
    components: {
      Comment,
      ArticleContent,
      ArticleMammon,
      ArticleShare,
      ArticleMeta,
      ArticleRelated
    },
    props: {
      articleId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const { meta, isMobile } = useEnhancer()
      const articleDetailStore = useArticleDetailStore()
      const commentStore = useCommentStore()
      const article = computed(() => articleDetailStore.article || void 0)
      const fetching = computed(() => articleDetailStore.fetching)
      const relatedArticles = computed(() => {
        if (!article.value) {
          return []
        }
        const ARTICLE_COUNT = 6
        const articles = [...article.value.related]
          .filter((article) => article.id !== props.articleId)
          .slice(0, ARTICLE_COUNT)
        if (isMobile.value || articles.length >= ARTICLE_COUNT) {
          return articles
        }
        return [
          ...articles,
          ...new Array(ARTICLE_COUNT - articles.length).fill({
            disabled: true,
            title: 'NULL',
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
        const fetchDelay = isClient ? 368 : 0
        return Promise.all([
          articleDetailStore.fetchDetail({
            articleID,
            delay: fetchDelay
          }),
          commentStore.fetchList({
            post_id: articleID,
            delay: fetchDelay
          })
        ])
      }

      onBeforeMount(() => {
        watch(
          () => props.articleId,
          (articleId) => fetchArticleDetail(articleId),
          { flush: 'post' }
        )
      })

      return prefetch(() => fetchArticleDetail(props.articleId), {
        isMobile,
        article,
        fetching,
        relatedArticles,
        ARTICLE_CONTENT_ELEMENT_ID,
        ARTICLE_META_ELEMENT_ID,
        ARTICLE_RELETED_ELEMENT_ID,
        ARTICLE_SHARE_ELEMENT_ID
      })
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

    .releted {
      margin-bottom: $lg-gap;
    }

    &.mobile {
      .module {
        margin-bottom: $gap;
      }
    }
  }
</style>
