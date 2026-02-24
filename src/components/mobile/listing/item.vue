<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useHistoryStore } from '/@/stores/history'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'
  import { getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { isOriginalArticle, isHybridArticle, isReprintArticle } from '/@/transforms/article'
  import { numberSplit } from '/@/transforms/text'
  import { Article, ArticleLanguageI18n } from '/@/interfaces/article'
  import { LocalesKey } from '/@/locales'

  const props = defineProps<{
    article: Article
  }>()

  const { cdnDomain, globalState } = useEnhancer()
  const historyStore = useHistoryStore()
  const isLiked = computed(() => historyStore.isLikedArticle(props.article.id))
  const detailRoutePath = getArticleDetailRoute(props.article.id)

  const getThumbnailURL = (url: string, format?: ImgProxyFormat) => {
    if (!isOriginalStaticURL(url)) {
      return url
    }

    return getImgProxyURL(
      cdnDomain,
      getImgProxyPath(getStaticPath(url), {
        resize: true,
        width: 700,
        height: 247,
        watermark: `watermark:0.38:sowe:18:16:0.16`,
        format
      })
    )
  }
</script>

<template>
  <ulink
    class="article-item"
    :to="globalState.userAgent.isWechat ? detailRoutePath : undefined"
    :href="!globalState.userAgent.isWechat ? detailRoutePath : undefined"
    :blank="!globalState.userAgent.isWechat"
    :external="false"
  >
    <div class="thumbnail">
      <span class="origin original" v-if="isOriginalArticle(article.origin)">
        <i18n :k="LocalesKey.ORIGIN_ORIGINAL" />
      </span>
      <span class="origin reprint" v-else-if="isReprintArticle(article.origin)">
        <i18n :k="LocalesKey.ORIGIN_REPRINT" />
      </span>
      <span class="origin hybrid" v-else-if="isHybridArticle(article.origin)">
        <i18n :k="LocalesKey.ORIGIN_HYBRID" />
      </span>
      <span class="featured" v-if="article.featured">
        <i18n :k="LocalesKey.ARTICLE_FEATURED" />
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
          :src="getThumbnailURL(article.thumbnail)"
          :alt="article.title"
          :title="article.title"
        />
      </picture>
    </div>
    <div class="content">
      <div class="body">
        <h4 class="title">
          <span class="text" :title="article.title">{{ article.title }}</span>
          <span class="language">
            <i18n v-bind="ArticleLanguageI18n[article.lang]" />
          </span>
        </h4>
        <p class="summary" style="-webkit-box-orient: vertical" v-html="article.summary"></p>
      </div>
      <div class="meta">
        <span class="date">
          <i class="iconfont icon-clock"></i>
          <span class="text"><udate to="ago" :date="article.created_at" /></span>
        </span>
        <span class="views">
          <i class="iconfont icon-eye"></i>
          <span class="text">{{ numberSplit(article.stats.views) }}</span>
        </span>
        <span class="comments">
          <i class="iconfont icon-comment"></i>
          <span class="text">{{ article.stats.comments }}</span>
        </span>
        <span class="likes">
          <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
          <span class="text">{{ article.stats.likes }}</span>
        </span>
      </div>
    </div>
  </ulink>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .article-item {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: $module-bg;
    @include mix.radius-box($radius-sm);

    .thumbnail {
      width: 100%;
      height: auto;
      overflow: hidden;
      position: relative;
      background-color: $module-bg-darker-3;

      .origin {
        $opacity: 0.7;
        position: absolute;
        right: 0;
        top: 0;
        z-index: $z-index-normal + 1;
        padding: 0 $gap-sm;
        border-bottom-left-radius: $radius-sm;
        opacity: 0.8;
        line-height: 2em;
        font-size: $font-size-secondary;
        font-weight: bold;
        color: $white;
        text-align: center;
        text-transform: uppercase;
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

      .featured {
        position: absolute;
        z-index: $z-index-normal + 1;
        right: 1rem;
        bottom: 1rem;
        border: 1px solid;
        border-radius: $radius-xs;
        padding: 0 $gap-tiny;
        opacity: 0.8;
        line-height: 1.6em;
        font-size: $font-size-secondary;
        color: $white;
        text-transform: capitalize;
      }

      .image {
        width: 100%;
        height: 7.6rem;
        aspect-ratio: 1190 / 420;
        min-height: calc((100vw - 2rem) * 0.34);
        max-height: 12rem;
        object-fit: cover;
        object-position: center;
      }
    }

    .content {
      display: block;

      .body {
        padding: $gap-sm;
        padding-bottom: $gap-xs;

        .title {
          margin-top: 0;
          margin-bottom: 0.4rem;
          font-weight: bold;
          display: flex;
          justify-content: space-between;

          .text {
            max-width: calc(100% - 3em);
            @include mix.text-overflow();
          }

          .language {
            opacity: 0.4;
            color: $color-text-divider;
          }
        }

        .summary {
          margin: 0;
          line-height: 2em;
          overflow: hidden;
          color: $color-text-secondary;
          text-overflow: ellipsis;
          @include mix.clamp(3);
        }
      }

      .meta {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0.6rem $gap-sm;
        border-top: 1px dashed $module-bg-darker-3;
        overflow: hidden;
        color: $color-text-disabled;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;

        .text {
          font-size: $font-size-tertiary;
        }

        .iconfont {
          font-size: $font-size-tertiary;
          margin-right: 0.3rem;
        }

        .views {
          min-width: 3rem;
        }

        .likes {
          .liked {
            color: $red;
          }
        }

        .likes,
        .comments {
          min-width: 3em;
        }
      }
    }
  }
</style>
