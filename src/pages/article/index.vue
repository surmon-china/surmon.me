<template>
  <div class="article-page" :class="{ mobile: isMobile }">
    <div class="module">
      <article-content :id="ARTICLE_CONTENT_ELEMENT_ID" :fetching="fetching" :article="article" />
    </div>
    <client-only v-if="!isMobile">
      <div class="module">
        <article-mammon :fetching="fetching" />
      </div>
    </client-only>
    <div class="module">
      <article-share
        :id="ARTICLE_SHARE_ELEMENT_ID"
        :fetching="fetching"
        :socials="isMobile ? [SocialMedia.Wechat, SocialMedia.Weibo, SocialMedia.Twitter] : []"
      />
    </div>
    <div class="module">
      <article-meta
        :id="ARTICLE_META_ELEMENT_ID"
        :plain="isMobile"
        :fetching="fetching"
        :article="article"
      />
    </div>
    <div class="releted-module">
      <article-related
        :id="ARTICLE_RELETED_ELEMENT_ID"
        :count="isMobile ? 4 : 6"
        :fetching="fetching"
        :articles="relatedArticles"
      />
    </div>
    <div class="comment">
      <comment
        :plain="isMobile"
        :fetching="fetching"
        :post-id="articleId"
        :likes="article?.meta?.likes"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import {
    ARTICLE_CONTENT_ELEMENT_ID,
    ARTICLE_META_ELEMENT_ID,
    ARTICLE_RELETED_ELEMENT_ID,
    ARTICLE_SHARE_ELEMENT_ID
  } from '/@/constants/anchor'
  import { UNDEFINED } from '/@/constants/value'
  import { useArticleDetailStore } from '/@/store/article'
  import { useCommentStore } from '/@/store/comment'
  import { SocialMedia } from '/@/components/widget/share.vue'
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
        ARTICLE_CONTENT_ELEMENT_ID,
        ARTICLE_META_ELEMENT_ID,
        ARTICLE_RELETED_ELEMENT_ID,
        ARTICLE_SHARE_ELEMENT_ID
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

    .releted-module {
      margin-bottom: $lg-gap;
    }
  }
</style>
