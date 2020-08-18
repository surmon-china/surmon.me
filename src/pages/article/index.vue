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
  import { defineComponent, ref, computed, watch } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { CommentModuleActions } from '/@/store/comment'
  import { isClient } from '/@/vuniversal/env'
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
    // head() {
    //   return {
    //     title: this.article?.title || '...',
    //     meta: [
    //       {
    //         hid: 'keywords',
    //         name: 'keywords',
    //         content: this.article?.keywords?.join(',') || this.article?.title || ''
    //       },
    //       {
    //         hid: 'description',
    //         name: 'description',
    //         content: this.article?.description
    //       }
    //     ]
    //   }
    // },
    async setup() {
      const { store, route, globalState, isMobile } = useEnhancer()
      const article = computed(() => store.state.article.detail.data)
      const fetching = computed(() => store.state.article.detail.fetching)
      const articleId = computed(() => Number(route.params.article_id))
      const relatedArticles = computed(() => {
        if (!article.value) {
          return []
        }
        const ARTICLE_COUNT = 6
        const articles = [...article.value.related]
          .filter(article => article._id !== articleId.value)
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

      // TODO: validate
      // if (isNaN(articleId.value)) {
      //   throw new Error('xxx')
      // }

      const fetchArticleDetail = (article_id: string | number) => {
        return Promise.all([
          store.dispatch(
            getNamespace(Modules.Article, ArticleModuleActions.FetchDetail),
            // TODO: isClient
            { article_id, delay: 666 }
          ),
            // .catch(err => error({ statusCode: 404 })),
          store.dispatch(
            getNamespace(Modules.Comment, CommentModuleActions.FetchList),
            { post_id: article_id }
          )
        ])
      }

      watch(
        () => route.params as Record<string, string>,
        ({ article_id }) => fetchArticleDetail(article_id)
      )

      await fetchArticleDetail(articleId.value)

      return {
        isMobile,
        article,
        fetching,
        articleId,
        relatedArticles
      }
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
