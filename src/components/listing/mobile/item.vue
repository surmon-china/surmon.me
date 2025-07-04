<script lang="ts" setup>
  import { computed } from 'vue'
  import { LanguageKey } from '/@/language'
  import { UNDEFINED } from '/@/constants/value'
  import { Article, ArticleLangI18n } from '/@/interfaces/article'
  import { useEnhancer } from '/@/app/enhancer'
  import { useIdentityStore } from '/@/stores/identity'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'
  import { getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { isOriginalType, isHybridType, isReprintType } from '/@/transforms/state'
  import { numberSplit } from '/@/transforms/text'

  const props = defineProps<{
    article: Article
  }>()

  const { cdnDomain, globalState } = useEnhancer()
  const identityStore = useIdentityStore()
  const isLiked = computed(() => identityStore.isLikedPage(props.article.id))
  const isHybrid = computed(() => isHybridType(props.article.origin))
  const isReprint = computed(() => isReprintType(props.article.origin))
  const isOriginal = computed(() => isOriginalType(props.article.origin))
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
    :to="globalState.userAgent.isWechat ? detailRoutePath : UNDEFINED"
    :href="!globalState.userAgent.isWechat ? detailRoutePath : UNDEFINED"
    :blank="!globalState.userAgent.isWechat"
    :external="false"
  >
    <div class="thumbnail">
      <span
        class="origin"
        :class="{
          original: isOriginal,
          reprint: isReprint,
          hybrid: isHybrid
        }"
      >
        <i18n :k="LanguageKey.ORIGIN_ORIGINAL" v-if="isOriginal" />
        <i18n :k="LanguageKey.ORIGIN_REPRINT" v-else-if="isReprint" />
        <i18n :k="LanguageKey.ORIGIN_HYBRID" v-else-if="isHybrid" />
      </span>
      <span class="featured" v-if="article.featured">
        <i18n :k="LanguageKey.ARTICLE_FEATURED" />
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
            <i18n v-bind="ArticleLangI18n[article.lang]" />
          </span>
        </h4>
        <p class="description" style="-webkit-box-orient: vertical" v-html="article.description"></p>
      </div>
      <div class="meta">
        <span class="date" data-allow-mismatch>
          <i class="iconfont icon-clock"></i>
          <span class="text"><udate to="ago" :date="article.created_at" /></span>
        </span>
        <span class="views">
          <i class="iconfont icon-eye"></i>
          <span class="text">{{ numberSplit(article.meta.views) }}</span>
        </span>
        <span class="comments">
          <i class="iconfont icon-comment"></i>
          <span class="text">{{ article.meta.comments }}</span>
        </span>
        <span class="likes">
          <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
          <span class="text">{{ article.meta.likes }}</span>
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
        padding: 0 $gap-lg;
        border-bottom-left-radius: $radius-xs;
        opacity: 0.8;
        line-height: 2.3rem;
        font-size: $font-size-small;
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
        $opacity: 0.7;
        position: absolute;
        z-index: $z-index-normal + 1;
        right: 1rem;
        bottom: 1rem;
        border: 1px solid;
        border-radius: $radius-xs;
        padding: 0 $gap-xs;
        opacity: 0.8;
        line-height: 1.6rem;
        font-size: $font-size-base - 1;
        color: $white;
        text-transform: capitalize;
      }

      .image {
        width: 100%;
        height: 10rem;
        min-height: calc((100vw - 2rem) * 0.34);
        max-height: 12rem;
        object-fit: cover;
        object-position: center;
      }
    }

    .content {
      display: block;

      .body {
        padding: $gap;
        padding-bottom: $gap-sm;

        .title {
          margin-top: 0;
          margin-bottom: $gap-sm;
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

        .description {
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
        padding: $gap;
        border-top: 1px dashed $module-bg-darker-3;
        overflow: hidden;
        color: $color-text-disabled;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;

        .text {
          font-size: $font-size-small;
        }

        .iconfont {
          font-size: $font-size-small + 1;
          margin-right: $gap-sm;
        }

        .views {
          min-width: 4rem;
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
