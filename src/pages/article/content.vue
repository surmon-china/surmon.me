<template>
  <div ref="element" class="detail">
    <transition name="module">
      <div
        class="oirigin"
        :class="{
          original: isOriginal,
          reprint: isReprint,
          hybrid: isHybrid
        }"
      >
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_ORIGINAL" v-if="isOriginal" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_REPRINT" v-else-if="isReprint" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_HYBRID" v-else-if="isHybrid" />
      </div>
    </transition>
    <div class="knowledge" key="knowledge">
      <div class="title">
        <h2 class="text">{{ article.title }}</h2>
        <div class="meta">
          <i class="iconfont icon-t"></i>
          <i18n>
            <template #zh>
              <span
                >共 {{ articleDetailStore.contentLength }} 字，需阅读
                {{ articleDetailStore.readMinutes }} 分钟</span
              >
            </template>
            <template #en>
              <span
                >{{ articleDetailStore.contentLength }} words,
                {{ articleDetailStore.readMinutes }} min read</span
              >
            </template>
          </i18n>
          <divider type="vertical" class="vertical" />
          <span>
            <i class="iconfont icon-clock-outline"></i>
            <span>{{ publishedAt(article.create_at) }}</span>
          </span>
          <divider type="vertical" class="vertical" />
          <span>
            <i class="iconfont icon-eye"></i>
            <span>{{ article.meta.views }}&nbsp;</span>
            <i18n :lkey="LANGUAGE_KEYS.ARTICLE_VIEWS" />
          </span>
        </div>
      </div>
      <div
        class="markdown-html"
        :id="ARTICLE_CONTENT_ELEMENT_IDS.default"
        v-html="articleDetailStore.defaultContent?.html"
      />
      <transition name="module" mode="out-in" @after-enter="handleRenderMoreAnimateDone">
        <div v-if="isRenderMoreEnabled" class="readmore">
          <button class="readmore-btn" :disabled="isRenderMoreContent" @click="handleRenderMore">
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
          v-html="articleDetailStore.moreContent?.html || ''"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, nextTick, onMounted, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article, useArticleDetailStore } from '/@/store/article'
  import { LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import { isOriginalType, isHybridType, isReprintType } from '/@/transforms/state'
  import { humanizeYMD } from '/@/transforms/moment'
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
        required: true
      }
    },
    setup(props) {
      const { i18n } = useEnhancer()
      const articleDetailStore = useArticleDetailStore()
      const isHybrid = computed(() => isHybridType(props.article.origin!))
      const isReprint = computed(() => isReprintType(props.article.origin!))
      const isOriginal = computed(() => isOriginalType(props.article.origin!))

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

      const handleRenderMoreAnimateDone = () => observeLozad(ARTICLE_CONTENT_ELEMENT_IDS.more)

      const publishedAt = (date: string) => {
        return humanizeYMD(date, i18n.language.value as any)
      }

      onMounted(() => {
        observeLozad(ARTICLE_CONTENT_ELEMENT_IDS.default)
      })

      return {
        LANGUAGE_KEYS,
        i18n,
        element,
        publishedAt,
        isHybrid,
        isReprint,
        isOriginal,
        articleDetailStore,
        isRenderMoreEnabled,
        isRenderMoreContent,
        ARTICLE_CONTENT_ELEMENT_IDS,
        handleRenderMore,
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

    .oirigin {
      position: absolute;
      top: -11px;
      left: -29px;
      transform: rotate(-45deg);
      width: 7rem;
      height: 4rem;
      line-height: 5.6rem;
      text-align: center;
      transform-origin: center;
      color: $white;
      font-weight: bold;
      font-size: $font-size-small;

      &.original {
        background-color: rgba($surmon, 0.7);
      }
      &.hybrid {
        background-color: rgba($accent, 0.7);
      }
      &.reprint {
        background-color: rgba($red, 0.7);
      }
    }

    .knowledge {
      user-select: text;
      position: relative;

      .title {
        margin: 1em 0 1.5em 0;
        text-align: center;

        .text {
          font-weight: 700;
          font-size: $font-size-h2 * 0.95;
          margin-bottom: $gap;
        }

        .meta {
          display: inline-block;
          color: $text-disabled;
          font-size: $font-size-small;
          user-select: none;
          line-height: 2;
          .iconfont {
            margin-right: $xs-gap;
          }
          .vertical {
            top: -1px;
          }
        }
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
