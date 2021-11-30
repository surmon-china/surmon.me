<template>
  <div
    class="carrousel"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <placeholder :data="articleList.length" :loading="fetching">
      <template #placeholder>
        <empty class="article-empty" key="empty">
          <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <div class="article-skeleton" key="skeleton">
          <div class="title">
            <skeleton-line />
          </div>
          <div class="content">
            <div class="first">
              <skeleton-line />
            </div>
            <responsive desktop>
              <skeleton-paragraph :lines="5" />
            </responsive>
          </div>
        </div>
      </template>
      <template #default>
        <div key="swiper" class="swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(article, index) in articleList.slice(0, 9)"
              :key="index"
            >
              <div class="content">
                <template v-if="article.ad">
                  <ulink class="link" :href="article.url">
                    <img :src="article.src" :alt="article.title" />
                    <div class="title">
                      <div class="background"></div>
                      <div class="prospect">
                        <span
                          class="text"
                          :style="{
                            backgroundImage: `url('${getThumbURL(article.src)}')`
                          }"
                          >{{ article.title }}</span
                        >
                      </div>
                    </div>
                    <span class="ad-symbol">
                      <i18n :lkey="LANGUAGE_KEYS.AD" />
                    </span>
                  </ulink>
                </template>
                <template v-else>
                  <router-link :to="getArticleDetailRoute(article.id)" class="link">
                    <img :src="getThumbURL(article.thumb)" :alt="article.title" draggable="false" />
                    <div class="title">
                      <div class="background"></div>
                      <div class="prospect">
                        <span
                          class="text"
                          :style="{
                            backgroundImage: `url('${getThumbURL(article.thumb)}')`
                          }"
                          >{{ article.title }}</span
                        >
                      </div>
                    </div>
                  </router-link>
                </template>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" />
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getBannerArticleThumbnailUrl } from '/@/transforms/thumbnail'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Article } from '/@/store/article'

  export default defineComponent({
    name: 'ArchiveCarrousel',
    props: {
      articles: {
        type: Array as PropType<Article[]>,
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const { globalState, adConfig, isMobile, isDarkTheme } = useEnhancer()
      const articleList = computed(() => {
        const articles = [...props.articles].slice(0, 9)
        if (adConfig.value.PC_CARROUSEL) {
          const { index, ...otherConfig } = adConfig.value.PC_CARROUSEL
          articles.length &&
            articles.splice(index, 0, {
              ad: true,
              ...otherConfig
            } as any)
        }
        return articles
      })

      const swiperOption = {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        setWrapperSize: true,
        mousewheel: true,
        observeParents: true,
        // 禁用 PC 拖动手指样式
        grabCursor: false,
        // 禁用 PC 拖动
        simulateTouch: false,
        preloadImages: false,
        lazy: true
      }

      const getThumbURL = (thumb: string): string => {
        return getBannerArticleThumbnailUrl(
          thumb,
          isMobile.value,
          globalState.imageExt.value.isWebP
        )
      }

      return {
        LANGUAGE_KEYS,
        isMobile,
        isDarkTheme,
        swiperOption,
        articleList,
        getArticleDetailRoute,
        getThumbURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  $pc-carrousel-height: 210px;
  $mobile-carrousel-height: calc((100vw - 2rem) * 0.34);

  .carrousel {
    height: $pc-carrousel-height;
    margin-bottom: $lg-gap;
    position: relative;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .article-empty {
      font-size: $font-size-h1;
      font-weight: bold;
    }

    .article-skeleton {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 2rem;

      .content {
        width: 50%;
        margin-top: 2.6rem;
        margin-left: 1rem;

        .first {
          width: 8rem;
          height: $gap * 2;
          margin-bottom: $gap;
        }
      }

      .title {
        position: absolute;
        top: 2rem;
        right: 2rem;
        height: 2.6rem;
        width: 18rem;
      }
    }

    &.dark {
      .swiper-slide {
        .title {
          .prospect {
            .text {
              -webkit-text-fill-color: $text !important;
            }
          }
        }
      }
    }

    .swiper {
      width: 595px;
      height: $pc-carrousel-height;

      // Filter for slide when transitioning
      .swiper-wrapper[style*='300ms'] {
        .swiper-slide-active {
          .content {
            @include blur-filter('horizontal');
          }
        }
      }

      .swiper-pagination {
        ::v-deep(.swiper-pagination-bullet) {
          &.swiper-pagination-bullet-active {
            width: 2rem;
            border-radius: $lg-radius;
          }
        }
      }

      .swiper-slide {
        .content {
          width: 100%;
          height: $pc-carrousel-height;
          position: relative;
          overflow: hidden;

          > .link {
            display: block;
            width: 100%;
            height: 100%;
          }

          img {
            width: 100%;
            transform: scale(1);
            transition: transform $transition-time-normal;

            &:hover {
              transform: scale(1.06);
            }
          }

          .ad-symbol {
            display: block;
            position: absolute;
            top: 5.6rem;
            right: 2.6rem;
            font-size: $font-size-small;
            color: $module-bg;
            border-radius: $mini-radius;
            padding: 0.1em 0.3em;
            border: 1px solid;
          }

          .title {
            $offset: 3px;
            display: block;
            position: absolute;
            top: 2rem;
            right: 2.6rem;
            opacity: 0.8;
            transition: opacity $transition-time-normal;

            .background {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: -1;
              top: 0;
              left: 0;
              background-color: $module-bg;
              transform: translate3d($offset, -$offset, 0);
              transition: transform $transition-time-fast;
            }

            .prospect {
              padding: 0 1em;
              height: 2em;
              line-height: 2em;
              @include text-overflow;
              background-color: $module-bg-opaque;
              background-position: top right;
              transform: translate3d(-$offset, $offset, 0);
              transition: transform $transition-time-fast;

              .text {
                letter-spacing: 0.3px;
                font-weight: bold;
                color: $text;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            &:hover {
              opacity: 1;
              .background {
                transform: translate3d(0, 0, 0);
              }
              .prospect {
                transform: translate3d(0, 0, 0);
              }
            }
          }
        }
      }
    }

    &.mobile {
      margin-bottom: $gap;
      height: $mobile-carrousel-height;

      > .swiper {
        width: 100%;
        height: $mobile-carrousel-height;

        .swiper-slide {
          > .content {
            height: $mobile-carrousel-height;

            > .title {
              right: 1.7rem;
              max-width: 70%;
            }
          }
        }
      }
    }
  }
</style>
