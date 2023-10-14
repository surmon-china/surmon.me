<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { Article } from '/@/interfaces/article'
  import { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { UNDEFINED } from '/@/constants/value'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getAssetURL, getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'

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
    subscript?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    count: 9
  })

  const { i18n: _i18n, adConfig, cdnDomain, isDarkTheme } = useEnhancer()
  const getPictureURL = (url: string, format?: ImgProxyFormat) => {
    if (!isOriginalStaticURL(url)) {
      return url
    }
    return getImgProxyURL(
      cdnDomain,
      getImgProxyPath(getStaticPath(url), {
        resize: true,
        width: 1190,
        height: 420,
        watermark: `watermark:0.36:sowe:18:18:0.15`,
        format
      })
    )
  }

  const slides = computed<Array<CarrouselSlide>>(() => {
    // articles
    const result: CarrouselSlide[] = props.articles.slice(0, props.count).map((article) => ({
      title: article.title,
      route: getArticleDetailRoute(article.id),
      image: article.thumbnail || getAssetURL(cdnDomain, '/images/thumbnail/carrousel.jpg'),
      subscript: article.featured ? _i18n.t(LanguageKey.ARTICLE_FEATURED) : UNDEFINED
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
        subscript: _i18n.t(LanguageKey.AD)
      })
    }
    return result
  })
</script>

<template>
  <div class="carrousel">
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
                <picture class="picture">
                  <template v-if="isOriginalStaticURL(slide.image)">
                    <source :srcset="getPictureURL(slide.image, 'avif')" type="image/avif" />
                    <source :srcset="getPictureURL(slide.image, 'webp')" type="image/webp" />
                  </template>
                  <img class="image" draggable="false" :alt="slide.title" :src="getPictureURL(slide.image)" />
                </picture>
                <div class="title" :class="{ dark: isDarkTheme }" :title="slide.title">
                  <div class="background"></div>
                  <div class="prospect">
                    <span class="text">{{ slide.title }}</span>
                  </div>
                </div>
                <span class="subscript" v-if="slide.subscript">{{ slide.subscript }}</span>
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

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform $transition-time-normal;
          transform: scale(1);
          &:hover {
            transform: scale(1.06);
          }
        }

        $title-right: 2.6rem;
        $title-offset: 3px;

        .title {
          display: block;
          position: absolute;
          top: 2rem;
          right: $title-right;

          .background {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.2);
            transform: translate3d($title-offset, -$title-offset, 0);
            transition: transform $transition-time-fast;
          }

          .prospect {
            padding: 0 1em;
            height: 2em;
            line-height: 2em;
            background-color: $module-bg-lighter;
            mix-blend-mode: screen;
            transform: translate3d(-$title-offset, $title-offset, 0);
            transition:
              transform $transition-time-fast,
              background-color $transition-time-fast;
            @include text-overflow;

            .text {
              letter-spacing: 0.3px;
              font-weight: bold;
              color: black;
            }
          }

          &:hover {
            .background {
              transform: translate3d(0, 0, 0);
            }
            .prospect {
              background-color: $module-bg-opaque;
              transform: translate3d(0, 0, 0);
            }

            & + .subscript {
              opacity: 1;
              transform: translate3d(0, -$title-offset, 0);
            }
          }

          &.dark {
            .prospect {
              mix-blend-mode: normal;
              .text {
                color: $link-color;
              }
            }
          }
        }

        .subscript {
          display: block;
          position: absolute;
          top: 5.6rem;
          right: $title-right;
          padding: 0.1em 0.3em;
          border: 1px solid;
          border-radius: $mini-radius;
          font-size: $font-size-root;
          text-transform: capitalize;
          color: $white;
          opacity: 0.8;
          transform: translate3d(-$title-offset, 0, 0);
          transition:
            opacity $transition-time-fast,
            transform $transition-time-fast;
        }
      }
    }
  }
</style>
