<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getImgProxyPath } from '/@/transforms/imgproxy'
  import { getImgProxyURL } from '/@/transforms/url'
  import { Article } from '/@/interfaces/article'
  import API_CONFIG from '/@/config/api.config'

  interface Props {
    articles?: Article[]
    columns?: number
    count?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    articles: () => [],
    columns: 4,
    count: 8
  })

  const { cdnDomain } = useEnhancer()
  const getThumbnailURL = (url?: string) => {
    if (!url) {
      return ''
    }
    if (!url.startsWith(API_CONFIG.STATIC)) {
      return url
    }
    return getImgProxyURL(
      cdnDomain,
      getImgProxyPath(url.replace(API_CONFIG.STATIC, ''), {
        width: 466,
        height: 168
      })
    )
  }

  const articleList = computed<Article[]>(() => {
    const articles = [...props.articles].slice(0, props.count)
    if (articles.length >= props.count) {
      return articles
    }
    return [
      ...articles,
      ...new Array(props.count - articles.length).fill({
        title: '-',
        description: '',
        id: null,
        _id: '',
        thumbnail: ''
      })
    ]
  })
</script>

<template>
  <div class="related">
    <ul class="articles" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <li v-for="(article, index) in articleList" :class="{ disabled: !article.id }" :key="index" class="item">
        <router-link class="item-article" :title="article.title" :to="getArticleDetailRoute(article.id)">
          <div class="thumbnail" :style="{ backgroundImage: `url(${getThumbnailURL(article.thumbnail)})` }"></div>
          <div class="title">{{ article.title }}</div>
          <div class="description">{{ article.description }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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

          .thumbnail {
            position: relative;
            opacity: 0.88;
            width: 100%;
            height: 7rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 46%;
            transition: all $transition-time-fast;
            display: flex;
            flex-direction: column;
            justify-content: end;

            &::before {
              content: '';
              position: absolute;
              background: linear-gradient(to top, rgba($black, 0.2) 20%, rgba($black, 0.1) 50%, transparent 90%);
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
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
            color: $text;
          }

          .description {
            margin-bottom: $sm-gap;
            font-size: $font-size-small;
            color: $text-disabled;
          }

          &:hover {
            .thumbnail {
              opacity: 1;
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
            .description {
              color: $text-secondary;
            }
          }
        }
      }
    }
  }
</style>
