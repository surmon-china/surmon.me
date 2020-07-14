<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="related">
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
      </div>
    </template>
    <template>
      <div class="related">
        <responsive>
          <template #desktop>
            <div class="article-list swiper" v-swiper:releted="swiperOption">
              <div class="swiper-wrapper">
                <div
                  v-for="(article, index) in relatedArticles"
                  :key="index"
                  class="swiper-slide item"
                >
                  <router-link
                    class="item-box filter"
                    :to="`/article/${article.id}`"
                    :title="article.title"
                  >
                    <img
                      :src="getRelatedArticleThumb(article.thumb)"
                      :alt="article.title"
                      class="thumb"
                    >
                    <span class="title">
                      <span class="text">{{ article.title }}</span>
                    </span>
                  </router-link>
                </div>
              </div>
            </div>
          </template>
          <template #mobile>
            <ul class="article-list">
              <li
                v-for="(article, index) in relatedArticles"
                :key="index"
                class="item"
              >
                <router-link
                  class="item-link"
                  :to="`/article/${article.id}`"
                  :title="`「 ${article.title} 」- 继续阅读`"
                >
                  <span class="sign">《</span>
                  <span class="title">{{ article.title }}</span>
                  <span class="sign">》</span>
                  <small class="tip">- 继续阅读</small>
                </router-link>
              </li>
            </ul>
          </template>
        </responsive>
      </div>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'ArticleRelated',
    props: {
      fetching: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const globalState = useGlobalState()
      const swiperOption = {
        setWrapperSize: true,
        simulateTouch: false,
        mousewheel: {
          sensitivity: 1,
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        observeParents: true,
        grabCursor: true,
        slidesPerView: 'auto'
      }

      const getRelatedArticleThumb = (thumb) => {
        return getArchiveArticleThumbnailUrl(
          thumb,
          this.$store.getters['global/isWebPImage']
        )
      }

      return {
        swiperOption,
        isMobile: globalState.userAgent.isMobile
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .related {
    padding: $gap 0;
    border-width: 0 $gap;
    border-color: transparent;
    overflow: hidden;
    user-select: none;

    > .skeleton-list {
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

    > .swiper.article-list {

      > .swiper-wrapper {
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

          > .item-box {
            display: block;
            position: relative;
            overflow: hidden;
            width: auto;
            height: 100%;
            opacity: .8;

            &:hover {
              .thumb {
                opacity: 1;
                transform: scale(1.1);
              }

              > .title {
                opacity: 1;
              }
            }

            > .thumb {
              width: auto;
              height: 100%;
              transform: scale(1);
              transition: transform $transition-time-normal, opacity $transition-time-fast;
            }

            > .title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2em;
              line-height: 2em;
              background-color: $module-hover-bg-darken-10;
              opacity: 0.4;
              color: $text-reversal;
              font-size: $font-size-h6;
              transition: opacity $transition-time-fast;

              .text {
                display: block;
                padding: 0 0.5em;
                text-align: center;
                @include text-overflow();
              }
            }
          }
        }
      }
    }

    &.mobile {
      height: auto;

      > .article-list {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
        opacity: 0.9;

        > .item {

          > .item-link {
            display: flex;
            width: 100%;
            height: 2.2em;
            line-height: 2.2em;

            > .title {
              max-width: 70%;
              display: inline-block;
              @include text-overflow();
            }

            > .tip {
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
