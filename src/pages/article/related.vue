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
            <div class="articles">
              <button
                class="swiper-navigation prev"
                :disabled="swiperStatus === SwiperStatus.Beginning"
                @click="handlePrevSlide"
              >
                <i class="iconfont icon-long-prev"></i>
              </button>
              <div
                class="swiper"
                v-swiper="swiperOption"
                @ready="updateSwiperContext"
                @transition-start="handleSwiperTransitionStart"
              >
                <div class="swiper-wrapper">
                  <div
                    v-for="(article, index) in articles"
                    :key="index"
                    class="swiper-slide item"
                  >
                    <router-link
                      class="item-article filter"
                      :title="article.title"
                      :to="getArticleDetailRoute(article.id)"
                    >
                      <img
                        :src="getRelatedArticleThumb(article.thumb)"
                        :alt="article.title"
                        draggable="false"
                        class="thumb"
                      >
                      <span class="title">
                        <span class="text">{{ article.title }}</span>
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
              <button
                class="swiper-navigation next"
                :disabled="swiperStatus === SwiperStatus.Ended"
                @click="handleNextSlide"
              >
                <i class="iconfont icon-long-next"></i>
              </button>
            </div>
          </template>
          <template #mobile>
            <ul class="articles">
              <li
                v-for="(article, index) in articles"
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
  import { defineComponent, computed, ref, PropType } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { useSwiperRef } from '/@/todo/swiper'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getArchiveArticleThumbnailUrl } from '/@/transforms/thumbnail'

  enum SwiperStatus {
    Beginning = 'beginning',
    Ended = 'ended'
  }
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
      const [swiperContext, updateSwiperContext] = useSwiperRef()
      const swiperStatus = ref<SwiperStatus | null>(SwiperStatus.Beginning)
      const swiperOption = {
        setWrapperSize: true,
        simulateTouch: false,
        mousewheel: {
          sensitivity: 1
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        observeParents: true,
        grabCursor: true,
        slidesPerView: 'auto'
      }

      const handleSwiperTransitionStart = () => {
        const swiper = swiperContext.value?.$swiper.value
        if (swiper?.isBeginning) {
          swiperStatus.value = SwiperStatus.Beginning
        } else if (swiper?.isEnd) {
          swiperStatus.value = SwiperStatus.Ended
        } else {
          swiperStatus.value = null
        }
      }
      const handlePrevSlide = () => {
        swiperContext.value?.$swiper.value?.slidePrev()
      }
      const handleNextSlide = () => {
        swiperContext.value?.$swiper.value?.slideNext()
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
        SwiperStatus,
        swiperStatus,
        updateSwiperContext,
        handleSwiperTransitionStart,
        handlePrevSlide,
        handleNextSlide,
        getArticleDetailRoute,
        getRelatedArticleThumb
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .related {
    padding: $gap;
    overflow: hidden;

    .skeleton-list {
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

    .articles {
      display: flex;
      align-items: center;
      height: 9rem;

      .swiper-navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 100%;
        opacity: .6;
        background-color: $module-bg-darker-1;
        @include radius-box($xs-radius);
        @include visibility-transition();

        .iconfont {
          color: $text-secondary;
          font-size: $font-size-h3;
          font-weight: bold;
        }

        &[disabled] {
          .iconfont {
            color: $text-disabled;
          }
        }

        &:not(:disabled):hover {
          opacity: 1;
        }
      }

      .swiper {
        width: 42rem;
        height: 100%;

        .swiper-wrapper {
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

            > .item-article {
              display: block;
              position: relative;
              overflow: hidden;
              border-radius: $xs-radius;
              width: auto;
              height: 100%;

              > .thumb {
                width: auto;
                height: 100%;
                opacity: .8;
                transform: scale(1);
                transition:
                  transform $transition-time-normal,
                  opacity $transition-time-fast;
              }

              > .title {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2em;
                line-height: 2em;
                background-color: $module-bg-lighter;
                opacity: .2;
                transition:
                  transform $transition-time-normal,
                  opacity $transition-time-fast;

                .text {
                  display: block;
                  padding: 0 0.5em;
                  color: $link-color;
                  text-align: center;
                  font-size: $font-size-small;
                  @include text-overflow();
                }
              }

              &:hover {
                .thumb {
                  opacity: 1;
                  transform: scale(1.05);
                }

                .title {
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }

    &.mobile {
      height: auto;

      .articles {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
        opacity: 0.9;

        .item {
          .item-link {
            display: flex;
            width: 100%;
            height: 2.2em;
            line-height: 2.2em;

            .title {
              max-width: 70%;
              display: inline-block;
              @include text-overflow();
            }

            .tip {
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
