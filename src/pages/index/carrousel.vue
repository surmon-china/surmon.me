<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { Article } from '/@/interfaces/article'
  import { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getAssetURL, getImgProxyURL } from '/@/transforms/url'
  import { getImgProxyPath } from '/@/transforms/imgproxy'
  import API_CONFIG from '/@/config/api.config'

  interface Props {
    articles: Array<Article>
    fetching: boolean
    count?: number
  }

  interface CarrouselSlide {
    title: string
    image: string
    route?: string
    url?: string
    ad?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    count: 9
  })

  const { adConfig, cdnDomain, isDarkTheme } = useEnhancer()
  const getThumbnailURL = (url?: string) => {
    if (!url) {
      return getAssetURL(cdnDomain, '/images/thumbnail/carrousel.jpg')
    }
    if (!url.startsWith(API_CONFIG.STATIC)) {
      return url
    }
    return getImgProxyURL(
      cdnDomain,
      getImgProxyPath(url.replace(API_CONFIG.STATIC, ''), {
        width: 1190,
        height: 420,
        watermark: `watermark:0.36:sowe:18:18:0.15`
      })
    )
  }

  const slides = computed<Array<CarrouselSlide>>(() => {
    // articles
    const result: CarrouselSlide[] = props.articles.slice(0, props.count).map((article) => ({
      ad: false,
      title: article.title,
      route: getArticleDetailRoute(article.id),
      image: getThumbnailURL(article.thumbnail)
    }))
    if (!result.length) {
      return []
    }

    // advertisement
    if (adConfig.value.PC_CARROUSEL) {
      const config = adConfig.value.PC_CARROUSEL
      result.splice(config.index, 0, {
        title: config.title,
        image: config.src,
        route: config.url,
        ad: true
      })
    }
    return result
  })
</script>

<template>
  <div class="carrousel" :class="{ dark: isDarkTheme }">
    <placeholder :data="slides.length" :loading="fetching">
      <template #placeholder>
        <empty class="article-empty" key="empty">
          <i18n :k="LanguageKey.ARTICLE_PLACEHOLDER" />
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
            <div class="line" v-for="index in 3" :key="index">
              <skeleton-line class="line-item" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <swiper
          class="swiper"
          :loop="true"
          :set-wrapper-size="true"
          :mousewheel="true"
          :observe-parents="true"
          :grab-cursor="false"
          :simulate-touch="false"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
        >
          <swiper-slide v-for="(slide, index) in slides.slice(0, 9)" :key="index">
            <div class="content">
              <ulink class="link" :href="slide.url" :to="slide.route">
                <img :src="slide.image" :alt="slide.title" draggable="false" loading="lazy" />
                <div class="title" :title="slide.title">
                  <div class="background"></div>
                  <div class="prospect">
                    <span class="text" :style="{ backgroundImage: `url('${slide.image}')` }">
                      {{ slide.title }}
                    </span>
                  </div>
                </div>
                <span class="ad-symbol" v-if="slide.ad">
                  <i18n :k="LanguageKey.AD" />
                </span>
              </ulink>
            </div>
          </swiper-slide>
        </swiper>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  $carrousel-height: 210px;

  .carrousel {
    position: relative;
    height: $carrousel-height;
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
        margin-top: 4rem;
        margin-left: 1rem;

        .first {
          width: 8rem;
          height: $gap * 2;
          margin-bottom: $gap;
        }

        .line {
          .line-item {
            width: 14rem;
            height: $lg-gap;
            margin-bottom: $gap;
          }
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
              color: $link-color !important;
              -webkit-text-fill-color: $link-color !important;
            }
          }
        }
      }
    }

    .swiper {
      width: 595px;
      height: $carrousel-height;

      // filter for slide when transitioning
      ::v-deep(.swiper-wrapper[style*='300ms']) {
        .swiper-slide-active {
          .content {
            @include motion-blur-filter('horizontal');
          }
        }
      }

      ::v-deep(.swiper-pagination) {
        .swiper-pagination-bullet-active {
          width: 2rem;
        }
      }

      .content {
        width: 100%;
        height: $carrousel-height;
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
          padding: 0.1em 0.3em;
          border-radius: $mini-radius;
          border: 1px solid;
          font-size: $font-size-root;
          color: $module-bg;
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
</style>
