<template>
  <div class="carrousel" :class="{ mobile: isMobile }">
    <transition name="module" mode="out-in">
      <empty-box v-if="!articleList.length" key="empty" class="article-empty-box">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box>
      <div
        v-else
        key="swiper"
        v-swiper="swiperOption"
        class="swiper index"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(_article, index) in articleList.slice(0, 9)"
            :key="index"
            class="swiper-slide"
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
                <nuxt-link :to="`/article/${_article.id}`" class="link">
                  <img :src="getThumb(_article.thumb)" :alt="_article.title">
                  <span class="title">{{ _article.title }}</span>
                </nuxt-link>
              </template>
            </div>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" />
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { getBannerArticleThumbnailUrl } from '~/transformers/thumbnail'
  import adConfig from '~/config/ad.config'

  export default Vue.extend({
    name: 'IndexCarrousel',
    props: {
      article: {
        type: Object
      }
    },
    data() {
      return {
        swiperOption: {
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
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.global.isMobile
      },
      articleList() {
        const articles = [...this.article.data.data].slice(0, 9)
        if (!adConfig.carrousel) {
          return articles
        }

        const { index, ...otherConfig } = adConfig.carrousel
        articles.length && articles.splice(index, 0, {
          ad: true,
          ...otherConfig
        })
        return articles
      }
    },
    methods: {
      getThumb(thumb) {
        return getBannerArticleThumbnailUrl(
          thumb,
          this.isMobile,
          this.$store.getters['global/isWebPImage']
        )
      }
    }
  })
</script>

<style lang="scss">
  .index.swiper {
    .swiper-pagination {
      .swiper-pagination-bullet {
        &.swiper-pagination-bullet-active {
          width: 2rem;
          border-radius: 10px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
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
