<template>
  <div
    class="carrousel"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <placeholder :data="articleList.length">
      <template #placeholder>
        <empty class="article-empty">
          <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #default>
        <div
          key="swiper"
          class="swiper"
          v-swiper="swiperOption"
        >
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(article, index) in articleList.slice(0, 9)"
              :key="index"
            >
              <div class="content">
                <template v-if="article.ad">
                  <ulink class="link" :href="article.url">
                    <img :src="article.src" :alt="article.title">
                    <div class="title">
                      <div class="background"></div>
                      <div class="prospect">
                        <span
                          class="text"
                          :style="{ backgroundImage: `url('${getThumbURL(article.src)}')` }"
                        >{{ article.title }}</span>
                      </div>
                    </div>
                    <span class="ad-symbol">
                      <i18n :lkey="LANGUAGE_KEYS.AD" />
                    </span>
                  </ulink>
                </template>
                <template v-else>
                  <router-link :to="getArticleDetailRoute(article.id)" class="link">
                    <img
                      :src="getThumbURL(article.thumb)"
                      :alt="article.title"
                      draggable="false"
                    >
                    <div class="title">
                      <div class="background"></div>
                      <div class="prospect">
                        <span
                          class="text"
                          :style="{ backgroundImage: `url('${getThumbURL(article.thumb)}')` }"
                        >{{ article.title }}</span>
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
  import { defineComponent, ref, computed } from 'vue'
  import { useSwiperRef, NameId } from '/@/todo/swiper'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useEnhancer } from '/@/enhancer'
  import { timeAgo } from '/@/transforms/moment'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { mapState } from 'vuex'
  import { getBannerArticleThumbnailUrl } from '/@/transforms/thumbnail'
  import { PC_CARROUSEL as ad } from '/@/config/ad.config'

  export default defineComponent({
    name: 'ArchiveCarrousel',
    props: {
      articles: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const { globalState, isMobile, isDarkTheme } = useEnhancer()
      const articleList = computed(() => {
        const articles = [...props.articles].slice(0, 9)
        if (ad) {
          const { index, ...otherConfig } = ad as any
          articles.length && articles.splice(index, 0, {
            ad: true,
            ...otherConfig
          })
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
          globalState.imageExt.isWebP
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
  @import 'src/assets/styles/init.scss';

  $pc-carrousel-height: 210px;
  $mobile-carrousel-height: calc((100vw - 2rem) * .34);

  .carrousel {
    height: $pc-carrousel-height;
    margin-bottom: $lg-gap;
    position: relative;
    overflow: hidden;
    @include common-bg-module();
    @include radius-box($lg-radius);

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
      .swiper-wrapper[style*="300ms"] {
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
            opacity: .8;
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
              transform: translate3d(- $offset, $offset, 0);
              transition: transform $transition-time-fast;

              .text {
                letter-spacing: .3px;
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
