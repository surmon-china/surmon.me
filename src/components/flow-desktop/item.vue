<template>
  <div class="article-item">
    <div
      class="item-background"
      :style="{
        backgroundImage: `url(${getThumbnailURL(article.thumb)})`
      }"
    />
    <div class="item-content">
      <router-link class="item-thumb" :to="getArticleDetailRoute(article.id)">
        <span
          class="item-oirigin"
          :class="{
            original: isOriginal,
            hybrid: isHybrid,
            reprint: isReprint
          }"
        >
          <i18n :lkey="LANGUAGE_KEYS.ORIGIN_ORIGINAL" v-if="isOriginal" />
          <i18n :lkey="LANGUAGE_KEYS.ORIGIN_REPRINT" v-else-if="isReprint" />
          <i18n :lkey="LANGUAGE_KEYS.ORIGIN_HYBRID" v-else-if="isHybrid" />
        </span>
        <div
          class="image"
          :style="{ backgroundImage: `url(${getThumbnailURL(article.thumb)})` }"
          :alt="article.title"
          :title="article.title"
        />
      </router-link>
      <div class="item-body">
        <div class="item-content">
          <h5 class="title">
            <router-link
              class="link"
              :to="getArticleDetailRoute(article.id)"
              :title="article.title"
            >
              {{ article.title }}
            </router-link>
            <span class="language" v-if="extendsMap.language">{{ extendsMap.language }}</span>
          </h5>
          <p
            class="description"
            style="-webkit-box-orient: vertical"
            v-html="article.description"
          ></p>
        </div>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ humanlizeDate(article.create_at) }}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ article.meta.views || 0 }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ article.meta.comments || 0 }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-heart" :class="{ liked: isLiked }"></i>
            <span>{{ article.meta.likes || 0 }}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-category"></i>
            <placeholder :transition="false" :data="article.category.length">
              <template #placeholder>
                <i18n :lkey="LANGUAGE_KEYS.CATEGORY_PLACEHOLDER" />
              </template>
              <template #default>
                <router-link
                  v-for="(category, index) in article.category.slice(0, 1)"
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

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article } from '/@/store/article'
  import { useUniversalStore } from '/@/store/universal'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getArticleDetailRoute, getTagFlowRoute, getCategoryFlowRoute } from '/@/transforms/route'
  import { getArticleListThumbnailURL } from '/@/transforms/thumbnail'
  import { timeAgo } from '/@/transforms/moment'
  import {
    isOriginalType,
    isHybridType,
    isReprintType,
    getExtendsObject
  } from '/@/transforms/state'

  export default defineComponent({
    name: 'FlowArticleListItem',
    props: {
      article: {
        type: Object as PropType<Article>,
        required: true
      }
    },
    setup(props) {
      const { globalState, i18n } = useEnhancer()
      const universalStore = useUniversalStore()

      const isLiked = computed(() => universalStore.isLikedPage(props.article.id))
      const isHybrid = isHybridType(props.article.origin)
      const isReprint = isReprintType(props.article.origin)
      const isOriginal = isOriginalType(props.article.origin)
      const extendsMap = getExtendsObject(props.article.extends)

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const getThumbnailURL = (thumbURL: string) => {
        return getArticleListThumbnailURL(thumbURL, globalState.imageExt.value.isWebP)
      }

      return {
        LANGUAGE_KEYS,
        isLiked,
        isHybrid,
        isReprint,
        isOriginal,
        extendsMap,
        getThumbnailURL,
        getArticleDetailRoute,
        getCategoryFlowRoute,
        getTagFlowRoute,
        humanlizeDate
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
      opacity: 0.06;
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
        .item-thumb {
          .item-oirigin {
            opacity: 1;
          }

          .image {
            opacity: 0.88;
            transform: translateX(-3px);
          }
        }
      }

      > .item-thumb {
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
          opacity: 0.5;
          font-size: $font-size-small;
          color: $white;
          text-align: center;
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

        .image {
          height: 100%;
          min-width: 100%;
          width: $width + 3px;
          max-width: $width + 3px;
          border-color: transparent;
          background-color: $module-bg-hover;
          background-size: cover;
          background-position: center;
          opacity: 1;
          transform: translateX(0);
          transition: transform $transition-time-normal, opacity $transition-time-normal;
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
          color: $link-hover;

          .link {
            display: block;
            max-width: 26rem;
            margin-left: 0;
            transition: margin $transition-time-normal;
            border-bottom: 1px solid transparent;
            text-decoration: none;
            @include text-overflow();

            &:hover {
              border-color: initial;
              margin-left: $xs-gap;
            }
          }

          .language {
            opacity: 0.4;
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
            min-width: 4rem;
          }

          > .likes {
            > .liked {
              color: $red;
            }
          }

          > .likes,
          > .comments {
            min-width: 3em;
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
