<script lang="ts" setup>
  import { ref, computed, nextTick, onMounted, onUpdated } from 'vue'
  import { LanguageKey } from '/@/language'
  import { Article } from '/@/interfaces/article'
  import { useArticleDetailStore } from '/@/stores/article'
  import { isOriginalType, isHybridType, isReprintType } from '/@/transforms/state'
  import { numberSplit } from '/@/transforms/text'
  import Markdown from '/@/components/common/markdown.vue'

  enum Events {
    Rendered = 'rendered'
  }

  const props = defineProps<{
    article: Article
    readmoreId: string
  }>()

  const emit = defineEmits<{
    (e: Events.Rendered, v: HTMLDivElement): void
  }>()

  const ctxStore = useArticleDetailStore()
  const isHybrid = computed(() => isHybridType(props.article.origin!))
  const isReprint = computed(() => isReprintType(props.article.origin!))
  const isOriginal = computed(() => isOriginalType(props.article.origin!))

  const element = ref<HTMLDivElement>()
  const isRenderMoreContent = ref(false)
  const isRenderMoreEnabled = computed(() => ctxStore.isLongContent && !ctxStore.renderedFullContent)

  const handleRenderMore = () => {
    isRenderMoreContent.value = true
    nextTick(() => {
      setTimeout(() => {
        ctxStore.renderFullContent()
        isRenderMoreContent.value = false
      }, 0)
    })
  }

  const handleFullContentRendered = () => {
    emit(Events.Rendered, element.value!)
  }

  onMounted(() => handleFullContentRendered())
  onUpdated(() => handleFullContentRendered())
</script>

<template>
  <div ref="element" class="detail">
    <div
      class="oirigin"
      :class="{
        original: isOriginal,
        reprint: isReprint,
        hybrid: isHybrid
      }"
    >
      <i18n :k="LanguageKey.ORIGIN_ORIGINAL" v-if="isOriginal" />
      <i18n :k="LanguageKey.ORIGIN_REPRINT" v-else-if="isReprint" />
      <i18n :k="LanguageKey.ORIGIN_HYBRID" v-else-if="isHybrid" />
    </div>
    <div class="knowledge" key="knowledge">
      <h2 class="title">
        <span class="text">{{ article.title }}</span>
        <span class="featured" v-if="article.featured">
          <i18n :k="LanguageKey.ARTICLE_FEATURED_SHORT" />
        </span>
      </h2>
      <div class="meta">
        <i class="iconfont icon-t"></i>
        <i18n
          :zh="`共 ${numberSplit(ctxStore.contentLength)} 字，需阅读 ${ctxStore.readMinutes} 分钟`"
          :en="`${numberSplit(ctxStore.contentLength)} characters, ${ctxStore.readMinutes} min read`"
        />
        <responsive desktop>
          <divider type="vertical" class="vertical" />
          <span>
            <i class="iconfont icon-clock-outlined"></i>
            <udate to="YMDm" :date="article.created_at" separator="/" />
          </span>
        </responsive>
        <divider type="vertical" class="vertical" />
        <span>
          <i class="iconfont icon-eye"></i>
          <span>{{ numberSplit(article.meta.views) }}&nbsp;</span>
          <i18n :k="LanguageKey.ARTICLE_VIEWS" />
        </span>
      </div>
      <markdown :html="ctxStore.defaultContent?.html" />
      <transition name="module" mode="out-in" @after-enter="handleFullContentRendered">
        <div :id="readmoreId" v-if="isRenderMoreEnabled" class="readmore">
          <button class="readmore-btn" :disabled="isRenderMoreContent" @click="handleRenderMore">
            <i18n :k="isRenderMoreContent ? LanguageKey.ARTICLE_RENDERING : LanguageKey.ARTICLE_READ_ALL" />
            <i class="iconfont icon-loadmore"></i>
          </button>
        </div>
        <markdown v-else-if="ctxStore.renderedFullContent" :html="ctxStore.moreContent?.html" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .detail {
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $transition-time-normal;

    .oirigin {
      position: absolute;
      top: 0.6rem;
      left: -2.4rem;
      transform: rotate(-45deg);
      width: 8rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      transform-origin: center;
      color: $white;
      font-weight: bold;
      font-size: $font-size-small;
      background-color: var(--color);
      &.original {
        --color: #{rgba($surmon, 0.7)};
      }
      &.hybrid {
        --color: #{rgba($accent, 0.7)};
      }
      &.reprint {
        --color: #{rgba($red, 0.7)};
      }
    }

    .knowledge {
      user-select: text;
      position: relative;

      .title {
        margin-top: $gap;
        margin-bottom: $gap;
        text-align: center;

        .featured {
          display: inline-block;
          border: 1px solid;
          border-radius: $xs-radius;
          margin-left: $sm-gap;
          padding: 0 2px;
          font-weight: normal;
          text-transform: capitalize;
          font-size: $font-size-small;
          color: $text-secondary;
          transform: translateY(-2px);
          user-select: none;
        }
      }

      .meta {
        margin-bottom: $lg-gap;
        text-align: center;
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

      .readmore {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 18rem;
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
