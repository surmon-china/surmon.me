<template>
  <div ref="element" class="detail">
    <transition name="module">
      <div
        v-if="!fetching"
        class="oirigin"
        :class="{
          self: isOriginal,
          other: isReprint,
          hybrid: isHybrid
        }"
      >
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_ORIGINAL" v-if="isOriginal" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_REPRINT" v-else-if="isReprint" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_HYBRID" v-else-if="isHybrid" />
      </div>
    </transition>
    <placeholder :loading="fetching" @after-enter="handleContentAnimateDone">
      <template #loading>
        <div class="skeleton" key="skeleton">
          <skeleton-line class="title" />
          <skeleton-paragraph class="content" :lines="9" line-height="1.2em" />
        </div>
      </template>
      <template #default>
        <div class="knowledge" key="knowledge">
          <h2 class="title">{{ article?.title }}</h2>
          <div
            class="markdown-html"
            :id="ARTICLE_CONTENT_ELEMENT_IDS.default"
            v-html="articleDetailStore.defaultContent?.html"
          />
          <transition name="module" mode="out-in" @after-enter="handleRenderMoreAnimateDone">
            <div v-if="isRenderMoreEnabled" class="readmore">
              <button
                class="readmore-btn"
                :disabled="isRenderMoreContent"
                @click="handleRenderMore"
              >
                <i18n
                  :lkey="
                    isRenderMoreContent
                      ? LANGUAGE_KEYS.ARTICLE_RENDERING
                      : LANGUAGE_KEYS.ARTICLE_READ_ALL
                  "
                />
                <i class="iconfont icon-loadmore"></i>
              </button>
            </div>
            <div
              class="markdown-html"
              :id="ARTICLE_CONTENT_ELEMENT_IDS.more"
              v-else-if="articleDetailStore.renderedFullContent"
              v-html="articleDetailStore.moreContent?.html"
            />
          </transition>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, nextTick, onMounted, PropType } from 'vue'
  import { Article, useArticleDetailStore } from '/@/store/article'
  import { LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { isOriginalType, isHybridType, isReprintType } from '/@/transforms/state'
  import { LANGUAGE_KEYS } from '/@/language/key'

  const ARTICLE_CONTENT_ELEMENT_IDS = {
    default: 'article_content_default',
    more: 'article_content_more'
  }

  export default defineComponent({
    name: 'ArticleContent',
    props: {
      article: {
        type: Object as PropType<Article>,
        required: false
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const articleDetailStore = useArticleDetailStore()
      const isHybrid = computed(() => isHybridType(props.article?.origin!))
      const isReprint = computed(() => isReprintType(props.article?.origin!))
      const isOriginal = computed(() => isOriginalType(props.article?.origin!))

      const element = ref<HTMLElement>()
      const isRenderMoreContent = ref(false)
      const isRenderMoreEnabled = computed(() => {
        return articleDetailStore.isLongContent && !articleDetailStore.renderedFullContent
      })

      const handleRenderMore = () => {
        isRenderMoreContent.value = true
        nextTick(() => {
          setTimeout(() => {
            articleDetailStore.renderFullContent()
            isRenderMoreContent.value = false
          }, 0)
        })
      }

      const observeLozad = (elementID: string) => {
        const contentElement = element.value?.querySelector(`#${elementID}`)
        const lozadElements =
          contentElement && contentElement.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (lozadElements?.length) {
          const lozadObserver = window.$lozad(lozadElements, {
            loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.observe()
        }
      }

      const handleContentAnimateDone = () => observeLozad(ARTICLE_CONTENT_ELEMENT_IDS.default)
      const handleRenderMoreAnimateDone = () => observeLozad(ARTICLE_CONTENT_ELEMENT_IDS.more)

      onMounted(() => {
        handleContentAnimateDone()
      })

      return {
        LANGUAGE_KEYS,
        element,
        isHybrid,
        isReprint,
        isOriginal,
        articleDetailStore,
        isRenderMoreEnabled,
        isRenderMoreContent,
        ARTICLE_CONTENT_ELEMENT_IDS,
        handleRenderMore,
        handleContentAnimateDone,
        handleRenderMoreAnimateDone
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .detail {
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $transition-time-normal;

    .skeleton {
      .title {
        width: 60%;
        height: 26px;
        margin: 2rem auto;
      }

      .content {
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
    }

    .oirigin {
      position: absolute;
      top: -11px;
      left: -29px;
      transform: rotate(-45deg);
      width: 7rem;
      height: 4rem;
      line-height: 5.8rem;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: $text-reversal;
      font-weight: bold;
      font-size: $font-size-small;

      &.self {
        background-color: rgba($accent, 0.8);
      }
      &.other {
        background-color: rgba($red, 0.8);
      }
      &.hybrid {
        background-color: rgba($primary, 0.8);
      }
    }

    .knowledge {
      user-select: text;
      position: relative;

      .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * 0.95;
      }

      .markdown-html {
        .google-auto-placed {
          margin-bottom: $sm-gap;
        }
      }

      .readmore {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 16rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to top, $module-bg-hover, transparent);

        .readmore-btn {
          width: 80%;
          height: 3rem;
          margin-top: 2rem;
          line-height: 3rem;
          text-align: center;
          color: $text-reversal;
          background-color: $primary-lighter;
          @include background-transition();
          @include radius-box($xs-radius);

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: $primary;
          }

          .iconfont {
            margin-left: $sm-gap;
          }
        }
      }
    }
  }
</style>
