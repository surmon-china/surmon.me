<template>
  <div class="carrousel" :class="{ mobile: isMobile }">
    <transition name="module" mode="out-in">
      <su-empty v-if="!articleList.length" key="empty" class="article-su-empty">
        <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
      </su-empty>
      <div
        v-else
        key="swiper"
        class="swiper"
        v-swiper="swiperOption"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(_article, index) in articleList.slice(0, 9)"
            :key="index"
          >
            <div class="content">
              <template v-if="_article.ad">
                <a
                  :href="_article.url"
                  target="_blank"
                  rel="external nofollow noopener"
                  class="link"
                >
                  <img :src="_article.src" :alt="_article.title">
                  <span class="title">{{ _article.title }}</span>
                </a>
              </template>
              <template v-else>
                <router-link :to="`/article/${_article.id}`" class="link">
                  <img :src="getThumb(_article.thumb)" :alt="_article.title">
                  <span class="title">{{ _article.title }}</span>
                </router-link>
              </template>
            </div>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useSwiperRef, NameId } from '/@/todo/swiper'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useGlobalState } from '/@/state'
  import { timeAgo } from '/@/transforms/moment'
  import { mapState } from 'vuex'
  import { getBannerArticleThumbnailUrl } from '/@/transforms/thumbnail'
  import AD_CONFIG from '/@/config/ad.config'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'ArchiveCarrousel',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const globalState = useGlobalState()
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const articleList = computed(() => {
        const articles = [...props.article.data.data].slice(0, 9)
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

      const getThumb = (thumb: string): string => {
        return getBannerArticleThumbnailUrl(
          thumb,
          isMobile.value,
          globalState.imageExt.isWebP.value
        )
      }

      return {
        LANGUAGE_KEYS,
        isMobile,
        swiperOption,
        articleList,
        getThumb
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  $pc-carrousel-height: 15em;
  $mobile-carrousel-height: calc((100vw - 2rem) * .35);

  .carrousel {
    height: $pc-carrousel-height;
    margin-bottom: $lg-gap;
    position: relative;
    overflow: hidden;
    user-select: none;
    @include module-blur-bg();

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

    > .swiper {
      // Filter for slide when transitioning
      .swiper-wrapper[style*="300ms"] {
        .swiper-slide-active {
          .content {
            @include blur-filter('horizontal');
          }
        }
      }

      .swiper-pagination {
        .swiper-pagination-bullet {
          &.swiper-pagination-bullet-active {
            width: 2rem;
            border-radius: 10px;
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
            transition: transform $transition-time-slow;

            &:hover {
              transform: scale(1.06);
            }
          }

          .title {
            position: absolute;
            margin: 0;
            top: 1.5rem;
            right: 2rem;
            color: $link-color;
            padding-right: .6em;
            padding-left: 1em;
            height: 2em;
            line-height: 2em;
            font-size: 1em;
            font-weight: bold;
            border-radius: 1px;
            letter-spacing: .3px;
            max-width: 75%;
            -webkit-background-clip: text;
            background: linear-gradient(90deg, transparent 0%, $module-bg 2em, $module-bg-opacity-9, $text-reversal);
            transition:
              background-color $transition-time-fast,
              padding $transition-time-fast,
              color $transition-time-fast;
            @include text-overflow;

            &:hover {
              color: $text-darken;
              padding-left: .6em;
              background-color: $module-bg;
            }
          }
        }
      }
    }
  }
</style>
