<template>
  <div class="related">
    <ul class="articles" :class="`count-${count}`">
      <li
        v-for="(article, index) in articles.slice(0, count)"
        :class="{ disabled: !article.id }"
        :key="index"
        class="item"
      >
        <router-link
          class="item-article"
          :title="article.title"
          :to="getArticleDetailRoute(article.id)"
        >
          <div
            class="thumb"
            :style="{
              backgroundImage: `url(${getRelatedArticleThumbnail(article.thumb)})`
            }"
          />
          <div class="title">{{ article.title }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article } from '/@/store/article'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getArticleListThumbnailURL } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleRelated',
    props: {
      articles: {
        type: Array as PropType<Article[]>,
        required: true
      },
      count: {
        type: Number,
        default: 6
      }
    },
    setup() {
      const { globalState } = useEnhancer()
      const getRelatedArticleThumbnail = (thumb: string) => {
        return getArticleListThumbnailURL(thumb, globalState.imageExt.value.isWebP)
      }

      return {
        getArticleDetailRoute,
        getRelatedArticleThumbnail
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .related {
    overflow: hidden;

    .articles {
      display: grid;
      grid-gap: $gap;
      width: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;
      &.count-4 {
        grid-template-columns: repeat(2, 1fr);
      }
      &.count-6 {
        grid-template-columns: repeat(3, 1fr);
      }

      .item {
        width: auto;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: 0.8;
        }

        &:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 0;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: 0.8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 7.4rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 40%;
            transition: background-position $transition-time-fast * 2;
          }

          .title {
            display: block;
            width: 100%;
            padding: 0 1em;
            line-height: 2.4;
            text-align: center;
            font-size: $font-size-h6;
            color: $text-secondary;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          &:hover {
            opacity: 1;

            .thumb {
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
          }
        }
      }
    }
  }
</style>
