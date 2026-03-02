<script lang="ts" setup>
  import { computed, shallowRef, onMounted } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { useEnhancer } from '/@/app/enhancer'
  import { useHistoryStore } from '/@/stores/history'
  import { ArticleListItem, ArticleLanguage, ArticleLanguageI18n } from '/@/interfaces/article'
  import { isOriginalArticle, isHybridArticle, isReprintArticle } from '/@/transforms/article'
  import { getArticleDetailRoute, getCategoryFlowRoute } from '/@/transforms/route'
  import { getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'
  import { numberSplit } from '/@/transforms/text'

  const props = defineProps<{
    article: ArticleListItem
  }>()

  const { cdnDomain, isZhLang, i18n: _i18n } = useEnhancer()
  const historyStore = useHistoryStore()
  const isLiked = computed(() => historyStore.isLikedArticle(props.article.id))

  const imageRef = shallowRef<HTMLImageElement | null>(null)
  const finallyThumbnailURL = shallowRef<string | null>(null)
  const setFinallyThumbnailURL = () => {
    finallyThumbnailURL.value = imageRef.value?.currentSrc ?? null
  }

  const getLanguageText = (language: ArticleLanguage) => {
    const targetI18n = ArticleLanguageI18n[language]
    return isZhLang.value ? targetI18n.zh : targetI18n.en
  }

  const getThumbnailURL = (url: string, format?: ImgProxyFormat) => {
    if (!isOriginalStaticURL(url)) {
      return url
    }
    return getImgProxyURL(
      cdnDomain,
      getImgProxyPath(getStaticPath(url), {
        resize: true,
        width: 350,
        height: 238,
        format
      })
    )
  }

  onMounted(() => {
    if (imageRef.value?.complete) {
      setFinallyThumbnailURL()
    }
  })
</script>

<template>
  <div class="article-item">
    <div
      class="item-background"
      :style="{ backgroundImage: finallyThumbnailURL ? `url('${finallyThumbnailURL}')` : 'none' }"
    ></div>
    <div class="item-content">
      <router-link class="item-thumbnail" :to="getArticleDetailRoute(article.id)">
        <span class="item-origin original" v-if="isOriginalArticle(article.origin)">
          <i18n :k="LocalesKey.ORIGIN_ORIGINAL" />
        </span>
        <span class="item-origin reprint" v-else-if="isReprintArticle(article.origin)">
          <i18n :k="LocalesKey.ORIGIN_REPRINT" />
        </span>
        <span class="item-origin hybrid" v-else-if="isHybridArticle(article.origin)">
          <i18n :k="LocalesKey.ORIGIN_HYBRID" />
        </span>
        <span class="item-featured" v-if="article.featured" :title="_i18n.t(LocalesKey.ARTICLE_FEATURED)">
          <i class="iconfont icon-windmill"></i>
        </span>
        <picture class="picture">
          <template v-if="isOriginalStaticURL(article.thumbnail)">
            <source :srcset="getThumbnailURL(article.thumbnail, 'avif')" type="image/avif" />
            <source :srcset="getThumbnailURL(article.thumbnail, 'webp')" type="image/webp" />
          </template>
          <img
            class="image"
            loading="lazy"
            draggable="false"
            ref="imageRef"
            :alt="article.title"
            :title="article.title"
            :src="getThumbnailURL(article.thumbnail)"
            @load="setFinallyThumbnailURL"
          />
        </picture>
      </router-link>
      <div class="item-body">
        <div class="item-content">
          <h5 class="title">
            <router-link class="link" :to="getArticleDetailRoute(article.id)" :title="article.title">
              {{ article.title }}
            </router-link>
            <span class="language">{{ getLanguageText(article.lang) }}</span>
          </h5>
          <p class="summary" style="-webkit-box-orient: vertical" v-html="article.summary"></p>
        </div>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <udate to="ago" :date="article.created_at" />
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ numberSplit(article.stats.views) }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ article.stats.comments }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
            <span>{{ article.stats.likes }}</span>
          </span>
          <span class="categories">
            <template v-if="!!article.categories.length">
              <i class="iconfont icon-category"></i>
              <router-link
                v-for="(category, index) in article.categories.slice(0, 1)"
                :key="index"
                :to="getCategoryFlowRoute(category.slug)"
              >
                <i18n :zh="category.name" :en="category.slug" />
              </router-link>
            </template>
            <template v-else>
              <i18n zh="无分类" en="Uncategorized" />
            </template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .article-item {
    position: relative;
    @include mix.radius-box($radius-sm);

    &:last-child {
      margin: 0;
    }

    .item-background {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-size: 120%;
      background-position: 0% 50%;
      opacity: 0.08;
    }

    > .item-content {
      $height: 8rem;
      $padding: $gap-xs;
      $content-height: $height - ($padding * 2);
      display: flex;
      height: $height;
      padding: $padding;
      overflow: hidden;
      @include mix.common-bg-module($motion-duration-fast);

      &:hover {
        .item-thumbnail {
          .item-origin {
            opacity: 1;
          }
          .item-featured {
            opacity: 1;
          }

          .image {
            opacity: 0.88;
            transform: translateX(-3px);
          }
        }
      }

      > .item-thumbnail {
        flex-shrink: 0;
        /* Google AdSense */
        $width: 190px;
        width: $width;
        height: $content-height;
        margin-right: $gap;
        position: relative;
        @include mix.radius-box($radius-xs);

        .item-origin {
          $height: 1.6rem;
          $opacity: 0.7;
          position: absolute;
          left: 0;
          top: 0;
          height: $height;
          line-height: $height;
          z-index: $z-index-normal + 1;
          padding: 0 $gap-xs;
          border-bottom-right-radius: $radius-xs;
          text-align: center;
          font-size: $font-size-h6;
          color: $white;
          opacity: 0.5;
          @include mix.visibility-transition();
          &.original {
            background-color: rgba($surmon, $opacity);
          }
          &.hybrid {
            background-color: rgba($green, $opacity);
          }
          &.reprint {
            background-color: rgba($red, $opacity);
          }
        }

        .item-featured {
          position: absolute;
          left: $gap-xs;
          bottom: $gap-xs;
          z-index: $z-index-normal + 1;
          color: $white;
          opacity: 0.5;
          @include mix.visibility-transition();
        }

        .image {
          height: 100%;
          min-width: 100%;
          width: $width + 3px;
          max-width: $width + 3px;
          border-color: transparent;
          background-color: $module-bg-hover;
          object-fit: cover;
          object-position: center;
          opacity: 1;
          transform: translateX(0);
          transition:
            transform $motion-duration-mid,
            opacity $motion-duration-mid;
        }
      }

      > .item-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: $content-height;
        padding-right: $gap-tiny;

        .title {
          display: flex;
          justify-content: space-between;
          margin-top: 3px;
          margin-bottom: $gap-tiny;

          .link {
            display: inline-block;
            padding-bottom: 1px;
            border-bottom: 1px solid transparent;
            max-width: 20rem;
            @include mix.text-overflow();
            font-weight: bold;
            color: $color-text;
            &:hover {
              color: $color-link;
              border-color: initial;
            }
          }

          .language {
            font-weight: bold;
            color: $color-text-divider;
            opacity: 0.5;
          }
        }

        .summary {
          margin: 0;
          line-height: $line-height-loose;
          font-size: $font-size-secondary;
          overflow: hidden;
          text-overflow: ellipsis;
          @include mix.clamp(2);
        }

        > .item-meta {
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          font-size: $font-size-tertiary;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          color: $color-text-secondary;

          > .views {
            width: 4em;
          }

          > .likes {
            > .liked {
              color: $red;
            }
          }

          > .likes,
          > .comments {
            width: 3em;
          }

          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            > .iconfont {
              margin-right: $gap-tiny;
            }
          }

          > .categories {
            a {
              color: $color-text-secondary;
              text-transform: capitalize;
              margin-right: $gap-tiny;

              &:last-child {
                margin-right: 0;
              }
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
