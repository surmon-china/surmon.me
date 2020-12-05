<template>
  <div class="article-page" :class="{ mobile: isMobile }">
    <div class="module">
      <article-content
        :fetching="fetching"
        :article="article"
      />
    </div>
    <client-only>
      <div class="module">
        <article-mammon :fetching="fetching" />
      </div>
    </client-only>
    <div class="module">
      <article-share :fetching="fetching" />
    </div>
    <div class="module">
      <article-meta
        :fetching="fetching"
        :article="article"
      />
    </div>
    <div class="releted">
      <article-related
        :fetching="fetching"
        :articles="relatedArticles"
      />
    </div>
    <div class="comment">
      <comment
        :fetching="fetching"
        :post-id="articleId"
        :likes="article?.meta?.likes"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, onBeforeMount } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { onPrefetch, onClient } from '/@/universal'
  import { isClient } from '/@/environment'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { CommentModuleActions } from '/@/store/comment'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import Comment from '/@/components/comment/index.vue'
  import ArticleContent from './content.vue'
  import ArticleMammon from './mammon.vue'
  import ArticleShare from './share.vue'
  import ArticleMeta from './meta.vue'
  import ArticleRelated from './related.vue'

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
      const { store, helmet, isMobile } = useEnhancer()
      const article = computed(() => store.state.article.detail.data)
      const fetching = computed(() => store.state.article.detail.fetching)
      const relatedArticles = computed(() => {
        if (!article.value) {
          return []
        }
        const ARTICLE_COUNT = 6
        const articles = [...article.value.related]
          .filter(article => article._id !== props.articleId)
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

      helmet(() => ({
        title: article.value?.title,
        keywords: article.value?.keywords?.join(',') || article.value?.title,
        description: article.value?.description || ''
      }))

      const fetchArticleDetail = (article_id: string | number) => {
        const fetchDelay = isClient ? 368 : 0
        return Promise.all([
          store.dispatch(
            getNamespace(Modules.Article, ArticleModuleActions.FetchDetail),
            { article_id, delay: fetchDelay }
          ),
          store.dispatch(
            getNamespace(Modules.Comment, CommentModuleActions.FetchList),
            { post_id: article_id, delay: fetchDelay }
          )
        ])
      }

      onBeforeMount(() => {
        watch(
          () => props.articleId,
          (articleId) => fetchArticleDetail(articleId),
          { flush: 'post' }
        )
      })

      return onPrefetch(
        () => fetchArticleDetail(props.articleId),
        {
          isMobile,
          article,
          fetching,
          relatedArticles
        }
      )
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

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
