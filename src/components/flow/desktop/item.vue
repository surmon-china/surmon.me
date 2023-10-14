<script lang="ts" setup>
  import { computed, shallowRef, onMounted } from 'vue'
  import { LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { useIdentityStore } from '/@/stores/identity'
  import { Article, ArticleLang, ArticleLangI18n } from '/@/interfaces/article'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'
  import { getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { getArticleDetailRoute, getCategoryFlowRoute } from '/@/transforms/route'
  import { isOriginalType, isHybridType, isReprintType } from '/@/transforms/state'
  import { numberSplit } from '/@/transforms/text'

  const props = defineProps<{
    article: Article
  }>()

  const { i18n: _i18n, cdnDomain, isZhLang } = useEnhancer()
  const identity = useIdentityStore()
  const isLiked = computed(() => identity.isLikedPage(props.article.id))
  const isHybrid = computed(() => isHybridType(props.article.origin))
  const isReprint = computed(() => isReprintType(props.article.origin))
  const isOriginal = computed(() => isOriginalType(props.article.origin))

  const imageRef = shallowRef<HTMLImageElement | null>(null)
  const finallyThumbnailURL = shallowRef<string | null>(null)
  const setFinallyThumbnailURL = () => {
    finallyThumbnailURL.value = imageRef.value?.currentSrc ?? null
  }

  const getLanguageText = (language: ArticleLang) => {
    const targetI18n = ArticleLangI18n[language]
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
        <span
          class="item-oirigin"
          :class="{
            original: isOriginal,
            hybrid: isHybrid,
            reprint: isReprint
          }"
        >
          <i18n :k="LanguageKey.ORIGIN_ORIGINAL" v-if="isOriginal" />
          <i18n :k="LanguageKey.ORIGIN_REPRINT" v-else-if="isReprint" />
          <i18n :k="LanguageKey.ORIGIN_HYBRID" v-else-if="isHybrid" />
        </span>
        <span class="item-featured" v-if="article.featured" :title="_i18n.t(LanguageKey.ARTICLE_FEATURED)">
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
          <p class="description" style="-webkit-box-orient: vertical" v-html="article.description"></p>
        </div>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <udate to="ago" :date="article.created_at" />
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ numberSplit(article.meta.views) }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ article.meta.comments }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
            <span>{{ article.meta.likes }}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-category"></i>
            <placeholder :transition="false" :data="article.categories.length">
              <template #placeholder>
                <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
              </template>
              <template #default>
                <router-link
                  v-for="(category, index) in article.categories.slice(0, 1)"
                  :key="index"
                  :to="getCategoryFlowRoute(category.slug)"
                >
                  <i18n :zh="category.name" :en="category.slug" />
                </router-link>
              </template>
            </placeholder>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .article-item {
    position: relative;
    @include radius-box($sm-radius);

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
      $height: $gap * 11;
      $padding: $sm-gap;
      $content-height: $height - ($padding * 2);
      display: flex;
      height: $height;
      padding: $padding;
      overflow: hidden;
      @include common-bg-module($transition-time-fast);

      &:hover {
        .item-thumbnail {
          .item-oirigin {
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
        $width: 186px;
        width: $width;
        height: $content-height;
        margin-right: $lg-gap;
        position: relative;
        @include radius-box($xs-radius);

        .item-oirigin {
          $height: 2.1rem;
          $opacity: 0.7;
          position: absolute;
          left: 0;
          top: 0;
          height: $height;
          line-height: $height;
          z-index: $z-index-normal + 1;
          padding: 0 $sm-gap;
          border-bottom-right-radius: $xs-radius;
          font-size: $font-size-small;
          color: $white;
          text-align: center;
          opacity: 0.5;
          @include visibility-transition();

          &.original {
            background-color: rgba($surmon, $opacity);
          }
          &.hybrid {
            background-color: rgba($accent, $opacity);
          }
          &.reprint {
            background-color: rgba($red, $opacity);
          }
        }

        .item-featured {
          position: absolute;
          left: $xs-gap;
          bottom: $xs-gap;
          z-index: $z-index-normal + 1;
          color: $white;
          opacity: 0.5;
          @include visibility-transition();
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
            transform $transition-time-normal,
            opacity $transition-time-normal;
        }
      }

      > .item-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: $content-height;
        padding-right: $xs-gap;

        .title {
          display: flex;
          justify-content: space-between;
          margin-top: 3px;
          margin-bottom: $sm-gap;
          font-weight: bold;

          .link {
            display: block;
            max-width: 26rem;
            margin-left: 0;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            color: $text;
            transition: margin $transition-time-normal;
            @include text-overflow();
            &:hover {
              color: $link-color;
              border-color: initial;
              margin-left: $xs-gap;
            }
          }

          .language {
            opacity: 0.5;
            color: $text-divider;
          }
        }

        .description {
          margin: 0;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: $font-size-h6;
          @include clamp(2);
        }

        > .item-meta {
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          font-size: $font-size-small;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          color: $text-secondary;

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
              margin-right: $xs-gap;
            }
          }

          > .categories {
            a {
              color: $text-secondary;
              text-transform: capitalize;
              margin-right: $sm-gap;

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
