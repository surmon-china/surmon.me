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
              backgroundImage: `url(${getMobileArticleListThumbnailURL(article.thumb)})`
            }"
          >
            <div class="meta" v-if="false">
              {{ getTimeAgo(article.create_at) }}
              <span class="dot">·</span>
              <i18n>
                <template #zh>{{ article.meta.comments }} 条看法</template>
                <template #en>{{ article.meta.comments }} comments</template>
              </i18n>
            </div>
          </div>
          <div class="title">{{ article.title }}</div>
          <div class="description">{{ article.description }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article } from '/@/store/article'
  import { timeAgo } from '/@/transforms/moment'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getMobileArticleListThumbnailURL } from '/@/transforms/thumbnail'

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
      const { i18n } = useEnhancer()

      const getTimeAgo = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const articleList = computed<Article[]>(() => {
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
        getTimeAgo,
        getArticleDetailRoute,
        getMobileArticleListThumbnailURL
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
        @include common-bg-module();
        @include radius-box($sm-radius);

        &.disabled {
          pointer-events: none;
          opacity: 0.6;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;

          .thumb {
            position: relative;
            opacity: 0.8;
            width: 100%;
            height: 7rem;
            background-color: $module-bg-darker-4;
            background-size: cover;
            background-position: 50% 45%;
            transition: all $transition-time-fast;
            display: flex;
            flex-direction: column;
            justify-content: end;

            &::before {
              content: '';
              position: absolute;
              background: linear-gradient(
                to top,
                rgba(0, 0, 0, 0.3) 10%,
                rgba(0, 0, 0, 0.1) 60%,
                transparent 90%
              );
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
            }
          }

          .meta {
            line-height: 2;
            padding: 0 $sm-gap;
            font-size: $font-size-small;
            color: $white;
            text-shadow: 0 0.5px 2px rgb(0 0 0 / 35%);

            .dot {
              margin: 0 $xs-gap;
            }
          }

          .title,
          .description {
            display: block;
            width: 100%;
            padding: 0 $sm-gap;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          .title {
            font-size: $font-size-h6;
            margin-top: $sm-gap;
            margin-bottom: $xs-gap;
            font-weight: bold;
            color: $text-secondary;
          }

          .description {
            font-size: $font-size-small;
            color: $text-disabled;
            margin-bottom: $sm-gap;
          }

          &:hover {
            .thumb {
              opacity: 1;
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
            .description {
              color: $text;
            }
          }
        }
      }
    }
  }
</style>
