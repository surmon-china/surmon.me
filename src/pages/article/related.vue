<template>
  <div class="related">
    <ul class="articles" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <li
        v-for="(article, index) in articleList"
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
              backgroundImage: `url(${getArticleReletedListThumbnailURL(article.thumb)})`
            }"
          />
          <div class="title">{{ article.title }}</div>
          <div class="description">{{ article.description }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { Article } from '/@/store/article'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getArticleReletedListThumbnailURL } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleRelated',
    props: {
      articles: {
        type: Array as PropType<Article[]>,
        default: () => []
      },
      columns: {
        type: Number,
        default: 4
      },
      count: {
        type: Number,
        default: 8
      }
    },
    setup(props) {
      const articleList = computed(() => {
        const articles = [...props.articles].slice(0, props.count)
        if (articles.length >= props.count) {
          return articles
        }
        return [
          ...articles,
          ...new Array(props.count - articles.length).fill({
            title: 'null',
            id: null,
            _id: '',
            thumb: ''
          })
        ]
      })

      return {
        articleList,
        getArticleDetailRoute,
        getArticleReletedListThumbnailURL
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
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap;
      width: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;

      .item {
        width: auto;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: 0.6;
        }

        &:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 0;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: 0.7;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 12rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 30%;
            transition: background-position $transition-time-fast * 2;
          }

          .title,
          .description {
            display: block;
            width: 100%;
            padding: 0 $gap;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          .title {
            font-size: $font-size-h6;
            margin-top: $sm-gap;
            font-weight: bold;
          }

          .description {
            margin-bottom: $xs-gap;
            line-height: 2;
            font-size: $font-size-small;
            color: $text-disabled;
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
