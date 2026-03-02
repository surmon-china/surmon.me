<script lang="ts" setup>
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { shallowRef, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import type { ArticleListItem } from '/@/interfaces/article'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getAssetURL, getImgProxyURL, getStaticPath, isOriginalStaticURL } from '/@/transforms/url'
  import { getImgProxyPath, ImgProxyFormat } from '/@/transforms/imgproxy'

  interface Props {
    articles: Array<ArticleListItem>
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

  const { appConfig, cdnDomain, i18n: _i18n } = useEnhancer()
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

  const INITIAL_SLIDE_INDEX = 0
  const swiperRef = shallowRef<SwiperClass>()
  const activatedSlideIndex = shallowRef(INITIAL_SLIDE_INDEX)
  const setSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
  }
  const goToSlide = (index: number) => {
    if (swiperRef.value) {
      swiperRef.value.slideToLoop(index)
    }
  }
  const updateActivatedSlideIndex = () => {
    if (swiperRef.value) {
      activatedSlideIndex.value = swiperRef.value.realIndex
    }
  }

  const slides = computed<Array<CarrouselSlide>>(() => {
    // articles
    const result: CarrouselSlide[] = props.articles.slice(0, props.count).map((article) => ({
      title: article.title,
      route: getArticleDetailRoute(article.id),
      image: article.thumbnail || getAssetURL(cdnDomain, '/images/thumbnail/carrousel.jpg'),
      subscript: article.featured ? _i18n.t(LocalesKey.ARTICLE_FEATURED) : undefined
    }))
    if (!result.length) {
      return []
    }

    // advertisement
    if (appConfig.value.AD_PC_CARROUSEL) {
      const config = appConfig.value.AD_PC_CARROUSEL
      result.splice(config.index, 0, {
        title: config.title,
        image: config.src,
        url: config.url,
        subscript: _i18n.t(LocalesKey.AD)
      })
    }
    return result
  })
</script>

<template>
  <div class="carrousel">
    <placeholder :loading="fetching" :has-data="!!slides.length">
      <template #placeholder>
        <empty class="article-empty" bold size="large">
          <i18n :k="LocalesKey.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <div class="article-skeleton">
          <skeleton class="title" />
          <div class="content">
            <skeleton class="first" />
            <div class="lines" v-for="index in 3" :key="index">
              <skeleton class="item" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <swiper
          class="swiper"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :style="{ '--slide-delay': `${3500}ms` }"
          :loop="true"
          :set-wrapper-size="true"
          :mousewheel="true"
          :observe-parents="true"
          :grab-cursor="false"
          :simulate-touch="false"
          :initial-slide="INITIAL_SLIDE_INDEX"
          @slide-change="updateActivatedSlideIndex"
          @swiper="setSwiper"
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
                <div class="title" :title="slide.title">
                  <div class="background"></div>
                  <div class="prospect">
                    <span class="text">{{ slide.title }}</span>
                  </div>
                </div>
                <span class="subscript" v-if="slide.subscript">{{ slide.subscript }}</span>
              </ulink>
            </div>
          </swiper-slide>
          <template #container-end>
            <client-only>
              <div class="swiper-pagination">
                <div
                  v-for="(slide, index) in slides.slice(0, 9)"
                  :key="index"
                  :aria-label="`Go to article ${slide.title}`"
                  :class="{ active: index === activatedSlideIndex }"
                  class="swiper-pagination-bullet"
                  role="button"
                  @click="goToSlide(index)"
                >
                  <span class="bullet-progress"></span>
                </div>
              </div>
            </client-only>
          </template>
        </swiper>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $carrousel-height: 210px;

  .carrousel {
    position: relative;
    height: $carrousel-height;
    @include mix.common-bg-module();
    @include mix.radius-box($radius-sm);

    .article-empty {
      height: $carrousel-height;
    }

    .article-skeleton {
      position: relative;
      display: flex;
      width: 100%;
      height: $carrousel-height;

      .title {
        position: absolute;
        top: 1.8rem;
        right: 1.8rem;
        height: 2rem;
        width: 14rem;
      }

      .content {
        position: absolute;
        bottom: 1rem;
        left: 1.8rem;

        .first {
          width: 6rem;
          height: 1.8rem;
          margin-bottom: $gap-lg;
        }

        .lines {
          .item {
            width: 12rem;
            height: 1rem;
            margin-bottom: $gap-sm;
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
            @include global.motion-blur-filter('horizontal');
          }
        }
      }

      .swiper-pagination {
        z-index: $z-index-normal + 1;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: $gap;
        text-align: center;

        .swiper-pagination-bullet {
          $size: 0.5rem;
          position: relative;
          display: inline-block;
          width: $size;
          height: $size;
          border-radius: $radius-tiny;
          overflow: hidden;
          margin: 0 0.4rem;
          background-color: rgba(white, 0.4);
          transition: all $motion-duration-fast;
          cursor: pointer;
          &:hover,
          &.active {
            background-color: rgba(white, 0.7);
          }
          &.active {
            width: 2rem;
            cursor: unset;

            .bullet-progress {
              animation: bullet-progress var(--slide-delay) linear forwards;
              @keyframes bullet-progress {
                0% {
                  transform: scaleX(0);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            }
          }

          .bullet-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(white, 0.7);
            transform-origin: left;
            transform: scaleX(0);
          }
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
          transition: transform $motion-duration-mid;
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
            border-radius: $radius-xs;
            background-color: rgba(0, 0, 0, 0.2);
            transform: translate3d($title-offset, -$title-offset, 0);
            transition: transform $motion-duration-fast;
          }

          .prospect {
            padding: 0 0.8em;
            height: 2em;
            line-height: 2em;
            border-radius: $radius-xs;
            background-color: $module-bg-lighter;
            mix-blend-mode: screen;
            transform: translate3d(-$title-offset, $title-offset, 0);
            transition:
              transform $motion-duration-fast,
              background-color $motion-duration-fast;
            @include mix.text-overflow;
            @include mix.dark-theme {
              mix-blend-mode: normal;
              .text {
                color: $color-link;
              }
            }

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
        }

        .subscript {
          display: block;
          position: absolute;
          top: 4.6rem;
          right: $title-right;
          padding: 0.1em 0.3em;
          border: 1px solid;
          border-radius: $radius-tiny;
          font-size: $font-size-h6;
          text-transform: capitalize;
          color: $white;
          opacity: 0.8;
          transform: translate3d(-$title-offset, 0, 0);
          transition:
            opacity $motion-duration-fast,
            transform $motion-duration-fast;
        }
      }
    }
  }
</style>
