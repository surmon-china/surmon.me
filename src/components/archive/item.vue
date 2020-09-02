<template>
  <div
    class="article-list-item"
    :class="{ mobile: isMobile }"
    @click="handleClick"
  >
    <desktop-only>
      <div
        class="item-background"
        :style="{
          backgroundImage: `url(${getThumbUrl(article.thumb)})`
        }"
      />
    </desktop-only>
    <div class="item-content">
      <desktop-only>
        <div class="item-thumb">
          <router-link :to="getArticleDetailRoute(article.id)">
            <span
              class="item-oirigin"
              :class="{
                self: _isOriginal,
                other: _isReprint,
                hybrid: _isHybrid
              }"
            >
              <i18n :lkey="LANGUAGE_KEYS.ORIGIN_ORIGINAL" v-if="_isOriginal" />
              <i18n :lkey="LANGUAGE_KEYS.ORIGIN_REPRINT" v-else-if="_isReprint" />
              <i18n :lkey="LANGUAGE_KEYS.ORIGIN_HYBRID" v-else-if="_isHybrid" />
            </span>
            <img
              class="item-thumb-img"
              :src="getThumbUrl(article.thumb)"
              :alt="article.title"
              :title="article.title"
            >
          </router-link>
        </div>
      </desktop-only>
      <div class="item-body">
        <h5 class="item-title">
          <router-link :to="getArticleDetailRoute(article.id)" :title="article.title">
            {{ article.title }}
          </router-link>
        </h5>
        <p
          class="item-description"
          style="-webkit-box-orient: vertical;"
          v-html="article.description"
        ></p>
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
            <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
            <span>{{ article.meta.likes || 0 }}</span>
          </span>
          <span class="tags">
            <i class="iconfont icon-tag"></i>
            <span>{{ article.tag.length || 0 }}</span>
          </span>
          <desktop-only>
            <span class="categories">
              <i class="iconfont icon-list"></i>
              <placeholder :transition="false" :data="article.category.length">
                <template #placeholder>
                  <span v-i18n="LANGUAGE_KEYS.CATEGORY_PLACEHOLDER" />
                </template>
                <template #default>
                  <router-link
                    v-for="(category, index) in article.category.slice(0, 1)"
                    :key="index"
                    :to="getCategoryArchiveRoute(category.slug)"
                  >
                    <i18n :zh="category.name" :en="category.slug" />
                  </router-link>
                </template>
              </placeholder>
            </span>
          </desktop-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useGlobalState } from '/@/state'
  import { useI18n } from '/@/services/i18n'
  import { getJSON } from '/@/services/storage'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { USER_LIKE_HISTORY } from '/@/constants/storage'
  import { getArticleDetailRoute, getTagArchiveRoute, getCategoryArchiveRoute } from '/@/transforms/route'
  import { getArchiveArticleThumbnailUrl } from '/@/transforms/thumbnail'
  import { isOriginal, isHybrid, isReprint } from '/@/transforms/state'
  import { timeAgo } from '/@/transforms/moment'

  export enum Events {
    Click = 'click'
  }
  export default defineComponent({
    name: 'ArticleListItem',
    props: {
      article: {
        type: Object as any,
        required: true
      }
    },
    emits: [
      Events.Click
    ],
    setup(props, context) {
      const i18n = useI18n()
      const globalState = useGlobalState()

      // eslint-disable-next-line vue/no-setup-props-destructure
      const { origin } = props.article
      const isLiked = ref(false)
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const _isHybrid = isHybrid(origin)
      const _isReprint = isReprint(origin)
      const _isOriginal = !origin || isOriginal(origin)

      const handleClick = (event: MouseEvent) => {
        context.emit(Events.Click, event)
      }

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const getThumbUrl = (thumbUrl: string) => {
        return getArchiveArticleThumbnailUrl(
          thumbUrl,
          globalState.imageExt.isWebP
        )
      }

      onMounted(() => {
        const localHistoryLikes = getJSON(USER_LIKE_HISTORY)
        isLiked.value = !!localHistoryLikes?.pages?.includes(props.article.id)
      })

      return {
        LANGUAGE_KEYS,
        isLiked,
        isMobile,
        _isHybrid,
        _isReprint,
        _isOriginal,
        handleClick,
        getThumbUrl,
        getArticleDetailRoute,
        getCategoryArchiveRoute,
        getTagArchiveRoute,
        humanlizeDate
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .article-list-item {
    position: relative;
    margin-bottom: $lg-gap;
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
      opacity: .06;
    }

    > .item-content {
      $height: $gap * 11;
      $padding: $sm-gap;
      $content-height: $height - ($padding * 2);
      display: block;
      height: $height;
      padding: $padding;
      overflow: hidden;
      @include common-bg-module($transition-time-fast);

      &:hover {
        .item-thumb {
          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            opacity: .95;
            transform: translateX(-3px);
          }
        }
      }

      > .item-thumb {
        float: left;
        width: 15rem;
        height: $content-height;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          $height: 2.1rem;
          $opacity: .8;
          position: absolute;
          left: 0;
          top: 0;
          height: $height;
          line-height: $height;
          z-index:  $z-index-normal + 1;
          padding: 0 $sm-gap;
          opacity: .4;
          font-size: $font-size-small;
          color: $white;
          text-align: center;
          text-transform: uppercase;
          @include visibility-transition();

          &.self {
            background-color: rgba($accent, $opacity);
          }
          &.other {
            background-color: rgba($red, $opacity);
          }
          &.hybrid {
            background-color: rgba($primary, $opacity);
          }
        }

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + 3px);
          max-width: calc(100% + 3px);
          height: auto;
          min-height: $content-height;
          border-color: transparent;
          background-color: $module-bg-hover;
          opacity: 1;
          transform: translateX(0);
          transition: transform $transition-time-normal, opacity $transition-time-normal;
        }
      }

      > .item-body {
        float: right;
        width: 32rem;
        height: $content-height;

        > .item-title {
          margin-top: 3px;
          margin-bottom: $sm-gap;
          font-weight: bold;
          color: $link-color-hover;
          @include text-overflow();

          > a {
            margin-left: 0;
            transition: margin $transition-time-normal;
            border-bottom: 1px solid transparent;
            text-decoration: none;
            &:hover {
              border-color: initial;
              margin-left: $xs-gap;
            }
          }
        }

        > .item-description {
          height: 5rem;
          margin: 0;
          margin-bottom: $xs-gap;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: $font-size-h6;
          @include clamp(3);
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
              text-transform: capitalize;
              margin-right: $sm-gap;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }
    }


    &.mobile {
      margin-bottom: $gap;

      &:last-child {
        margin: 0;
      }

      > .item-content {
        height: auto;
        padding: $sm-gap $gap;

        > .item-body {
          width: 100%;
          height: auto;

          > .item-description {
            height: auto;
            margin-bottom: .5em;
          }

          > .item-meta {
            > .date,
            > .views,
            > .comments,
            > .likes,
            > .tags,
            > .categories {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
