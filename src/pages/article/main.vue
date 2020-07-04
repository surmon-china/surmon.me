<template>
  <div class="article-page" :class="{ mobile: isMobile }">
    <div class="module">
      <article-content :article="article" :fetching="fetching" />
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
      <article-meta :article="article" :fetching="fetching" />
    </div>
    <div class="module">
      <article-related :articles="relatedArticles" :fetching="fetching" />
    </div>
    <div class="comment">
      <comment-box
        :fetching="fetching"
        :post-id="articleId"
        :likes="article.meta && article.meta.likes"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useGlobalState } from '/@/state'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { CommentModuleActions } from '/@/store/comment'
  import ArticleContent from './content.vue'
  import ArticleMammon from './mammon.vue'
  import ArticleShare from './share.vue'
  import ArticleMeta from './meta.vue'
  import ArticleRelated from './related.vue'

  export default defineComponent({
    name: 'ArticleDetail',
    components: {
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
      const route = useRoute()
      const store = useStore()
      const globalState = useGlobalState()
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const article = computed(() => store.state.article.detail.data)
      const fetching = computed(() => store.state.article.detail.fetching)
      const articleId = computed(() => Number(route.params.article_id))
      const relatedArticles = computed(() => [...article.value?.related].slice(0, 10))

      // TODO: validate
      // if (isNaN(articleId.value)) {
      //   throw new Error('xxx')
      // }

      await Promise.all([
        store.dispatch(getNamespace(Modules.Article, ArticleModuleActions.FetchDetail)),
          // .catch(err => error({ statusCode: 404 })),
        store.dispatch(
          getNamespace(Modules.Comment, CommentModuleActions.FetchList),
          { post_id: articleId.value }
        )
      ])

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
      background-color: $module-bg;
    }

    &.mobile {
      .module {
        margin-bottom: $gap;
      }
    }
  }
</style>
