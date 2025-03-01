<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'
  import { getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { Article } from '/@/interfaces/article'

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
  const getThumbnailURL = (url: string, format?: ImgProxyFormat) => {
    return getImgProxyURL(
      cdnDomain,
      getImgProxyPath(getStaticPath(url), {
        resize: true,
        width: 466,
        height: 168,
        format
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
        _id: '',
        id: null,
        title: '-',
        description: '',
        thumbnail: null
      })
    ]
  })
</script>

<template>
  <div class="related">
    <ul class="articles" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <li v-for="(article, index) in articleList" :class="{ disabled: !article.id }" :key="index" class="item">
        <router-link class="item-article" :title="article.title" :to="getArticleDetailRoute(article.id)">
          <picture class="thumbnail">
            <template v-if="isOriginalStaticURL(article.thumbnail)">
              <source :srcset="getThumbnailURL(article.thumbnail, 'avif')" type="image/avif" />
              <source :srcset="getThumbnailURL(article.thumbnail, 'webp')" type="image/webp" />
            </template>
            <img
              v-if="article.thumbnail"
              class="image"
              loading="lazy"
              draggable="false"
              :alt="article.title"
              :src="isOriginalStaticURL(article.thumbnail) ? getThumbnailURL(article.thumbnail) : article.thumbnail"
            />
          </picture>
          <div class="title">{{ article.title }}</div>
          <div class="description" :title="article.description">{{ article.description }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

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
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);

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
            display: block;
            width: 100%;
            height: 7rem;
            opacity: 0.88;
            background-color: $module-bg-darker-2;
            transition: all $motion-duration-fast;

            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: linear-gradient(to top, rgba($black, 0.2) 20%, rgba($black, 0.1) 50%, transparent 90%);
            }

            .image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }
          }

          .title,
          .description {
            display: block;
            width: 100%;
            padding: 0 $gap-sm;
            transition: color $motion-duration-fast;
            @include mix.text-overflow();
          }

          .title {
            font-size: $font-size-h6;
            margin-top: $gap-sm;
            margin-bottom: $gap-xs;
            font-weight: bold;
            color: $color-text;
          }

          .description {
            margin-bottom: $gap-sm;
            font-size: $font-size-small;
            color: $color-text-disabled;
          }

          &:hover {
            .thumbnail {
              opacity: 1;
            }

            .title {
              color: $color-link;
            }
            .description {
              color: $color-text-secondary;
            }
          }
        }
      }
    }
  }
</style>
