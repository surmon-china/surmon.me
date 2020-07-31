<template>
  <div class="related" :class="{ mobile: isMobile }">
    <placeholder :loading="fetching">
      <template #loading>
        <responsive>
          <template #desktop>
            <ul class="skeleton-list">
              <skeleton-base
                class="article"
                v-for="item in 4"
                :key="item"
              />
            </ul>
          </template>
          <template #mobile>
            <skeleton-paragraph
              class="skeleton"
              :lines="4"
              line-height="1em"
            />
          </template>
        </responsive>
      </template>
      <template #default>
        <responsive>
          <template #desktop>
            <div class="article-list swiper" v-swiper:releted="swiperOption">
              <div class="swiper-wrapper">
                <div
                  v-for="(article, index) in relatedArticles"
                  :key="index"
                  class="swiper-slide item"
                >
                  <router-link
                    class="item-box filter"
                    :title="article.title"
                    :to="getArticleDetailRoute(article.id)"
                  >
                    <img
                      :src="getRelatedArticleThumb(article.thumb)"
                      :alt="article.title"
                      class="thumb"
                    >
                    <span class="title">
                      <span class="text">{{ article.title }}</span>
                    </span>
                  </router-link>
                </div>
              </div>
            </div>
          </template>
          <template #mobile>
            <ul class="article-list">
              <li
                v-for="(article, index) in relatedArticles"
                :key="index"
                class="item"
              >
                <router-link
                  class="item-link"
                  :title="article.title"
                  :to="getArticleDetailRoute(article.id)"
                >
                  <span class="title">{{ article.title }} - {{ article.description }}</span>
                  <small class="tip">- 继续阅读</small>
                </router-link>
              </li>
            </ul>
          </template>
        </responsive>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getArchiveArticleThumbnailUrl } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleRelated',
    props: {
      articles: {
        type: Array as PropType<$TODO[]>,
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup() {
      const { store, globalState, isMobile } = useEnhancer()
      const swiperOption = {
        setWrapperSize: true,
        simulateTouch: false,
        mousewheel: {
          sensitivity: 1,
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        observeParents: true,
        grabCursor: true,
        slidesPerView: 'auto'
      }

      const getRelatedArticleThumb = (thumb: string) => {
        return getArchiveArticleThumbnailUrl(
          thumb,
          globalState.imageExt.isWebP.value
        )
      }

      return {
        isMobile,
        swiperOption,
        getArticleDetailRoute,
        getRelatedArticleThumb
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .related {
    padding: $gap 0;
    border-width: 0 $gap;
    border-color: transparent;
    overflow: hidden;
    user-select: none;

    > .skeleton-list {
      padding: 0;
      margin: 0;
      height: 9rem;
      overflow: hidden;
      display: flex;

      .article {
        width: 12rem;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    > .swiper.article-list {

      > .swiper-wrapper {
        height: 9rem;
        overflow: hidden;

        &[style*="300ms"] {
          @include blur-filter('horizontal-small');
        }

        > .swiper-slide.item {
          width: auto;
          margin-right: $gap;

          &:last-child {
            margin-right: 0;
          }

          > .item-box {
            display: block;
            position: relative;
            overflow: hidden;
            width: auto;
            height: 100%;
            opacity: .8;

            &:hover {
              .thumb {
                opacity: 1;
                transform: scale(1.1);
              }

              > .title {
                opacity: 1;
              }
            }

            > .thumb {
              width: auto;
              height: 100%;
              transform: scale(1);
              transition: transform $transition-time-normal, opacity $transition-time-fast;
            }

            > .title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2em;
              line-height: 2em;
              background-color: $module-bg-darker-5;
              opacity: 0.4;
              color: $text-reversal;
              font-size: $font-size-h6;
              transition: opacity $transition-time-fast;

              .text {
                display: block;
                padding: 0 0.5em;
                text-align: center;
                @include text-overflow();
              }
            }
          }
        }
      }
    }

    &.mobile {
      height: auto;

      > .article-list {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
        opacity: 0.9;

        > .item {

          > .item-link {
            display: flex;
            width: 100%;
            height: 2.2em;
            line-height: 2.2em;

            > .title {
              max-width: 70%;
              display: inline-block;
              @include text-overflow();
            }

            > .tip {
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
