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
                  <a
                    :href="article.url"
                    target="_blank"
                    rel="external nofollow noopener"
                    class="link"
                  >
                    <img :src="article.src" :alt="article.title">
                    <span class="title">{{ article.title }}</span>
                  </a>
                </template>
                <template v-else>
                  <router-link :to="`/article/${article.id}`" class="link">
                    <img :src="getThumbURL(article.thumb)" :alt="article.title">
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
  import { mapState } from 'vuex'
  import { getBannerArticleThumbnailUrl } from '/@/transforms/thumbnail'
  import AD_CONFIG from '/@/config/ad.config'

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
        if (AD_CONFIG.carrousel) {
          const { index, ...otherConfig } = AD_CONFIG.carrousel
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
          globalState.imageExt.isWebP.value
        )
      }

      return {
        LANGUAGE_KEYS,
        isMobile,
        isDarkTheme,
        swiperOption,
        articleList,
        getThumbURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  $pc-carrousel-height: 210px;
  $mobile-carrousel-height: calc((100vw - 2rem) * .35);

  .carrousel {
    height: $pc-carrousel-height;
    margin-bottom: $lg-gap;
    position: relative;
    overflow: hidden;
    user-select: none;
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

          .title {
            $offset: 6px / 2;
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
