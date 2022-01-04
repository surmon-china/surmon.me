<template>
  <div class="article-page">
    <placeholder :loading="fetching">
      <template #loading>
        <article-skeleton :social-count="isMobile ? 3 : 8" :releted-count="isMobile ? 2 : 3" />
      </template>
      <template #default>
        <div v-if="article">
          <div class="module margin background overflow">
            <article-content :id="ANCHORS.ARTICLE_CONTENT_ELEMENT_ID" :article="article" />
          </div>
          <div class="module margin background">
            <article-meta
              :id="ANCHORS.ARTICLE_META_ELEMENT_ID"
              :plain="isMobile"
              :article="article"
            />
          </div>
          <div class="module margin background">
            <article-share
              :id="ANCHORS.ARTICLE_SHARE_ELEMENT_ID"
              :article-id="articleId"
              :likes="article?.meta?.likes || 0"
              :socials="
                isMobile ? [SocialMedia.Wechat, SocialMedia.Weibo, SocialMedia.Twitter] : []
              "
            />
          </div>
          <client-only>
            <div class="module margin background" v-if="!isMobile">
              <article-mammon />
            </div>
          </client-only>
          <div class="module margin">
            <article-related
              :id="ANCHORS.ARTICLE_RELETED_ELEMENT_ID"
              :columns="isMobile ? 2 : 4"
              :count="isMobile ? 4 : 8"
              :articles="article?.related"
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
  import ArticleShare from './share.vue'
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

      meta(() => ({
        pageTitle: article.value?.title,
        description: article.value?.description || '',
        keywords: article.value?.keywords?.join(',') || article.value?.title
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
        ANCHORS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .article-page {
    .module {
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
    }
  }
</style>
