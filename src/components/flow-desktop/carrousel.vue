<template>
  <div class="carrousel" :class="{ dark: isDarkTheme }">
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
            <skeleton-paragraph :lines="5" />
          </div>
        </div>
      </template>
      <template #default>
        <swiper
          class="swiper"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :set-wrapper-size="true"
          :mousewheel="true"
          :observe-parents="true"
          :grab-cursor="false"
          :simulate-touch="false"
          :preload-images="false"
          :lazy="false"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(article, index) in articleList.slice(0, 9)" :key="index">
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
          </swiper-slide>
        </swiper>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { Swiper, SwiperSlide } from '/@/services/swiper'
  import { useEnhancer } from '/@/app/enhancer'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getArticleBannerThumbnailURL } from '/@/transforms/thumbnail'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Article } from '/@/store/article'

  export default defineComponent({
    name: 'FlowCarrousel',
    components: {
      Swiper,
      SwiperSlide
    },
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
      const { globalState, adConfig, isDarkTheme } = useEnhancer()
      const articleList = computed(() => {
        const articles: Array<Article | any> = [...props.articles].slice(0, 9)
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

      const getThumbURL = (thumb: string): string => {
        return getArticleBannerThumbnailURL(thumb, globalState.imageExt.value.isWebP)
      }

      return {
        LANGUAGE_KEYS,
        isDarkTheme,
        articleList,
        getArticleDetailRoute,
        getThumbURL
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .carrousel {
    $carrousel-height: 210px;
    height: $carrousel-height;
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
            @include blur-filter('horizontal');
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
</style>
