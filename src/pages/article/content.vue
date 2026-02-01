<script lang="ts" setup>
  import { ref, computed, nextTick, onMounted, onUpdated } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { Article } from '/@/interfaces/article'
  import { useArticleDetailStore } from '/@/stores/article-detail'
  import { isOriginalArticle, isHybridArticle, isReprintArticle } from '/@/transforms/article'
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
  const isHybrid = computed(() => isHybridArticle(props.article.origin))
  const isReprint = computed(() => isReprintArticle(props.article.origin))
  const isOriginal = computed(() => isOriginalArticle(props.article.origin))

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
      class="origin"
      :class="{
        original: isOriginal,
        reprint: isReprint,
        hybrid: isHybrid
      }"
    >
      <i18n :k="LocalesKey.ORIGIN_ORIGINAL" v-if="isOriginal" />
      <i18n :k="LocalesKey.ORIGIN_REPRINT" v-else-if="isReprint" />
      <i18n :k="LocalesKey.ORIGIN_HYBRID" v-else-if="isHybrid" />
    </div>
    <div class="knowledge" key="knowledge">
      <h2 class="title">
        <span class="text">{{ article.title }}</span>
        <span class="featured" v-if="article.featured">
          <i18n :k="LocalesKey.ARTICLE_FEATURED_SHORT" />
        </span>
      </h2>
      <div class="meta">
        <i class="iconfont icon-t"></i>
        <i18n
          :zh="`共 ${numberSplit(ctxStore.contentLength)} 字，需阅读 ${ctxStore.readMinutes} 分钟`"
          :en="`${numberSplit(ctxStore.contentLength)} characters, ${ctxStore.readMinutes} min read`"
        />
        <responsive desktop>
          <divider type="vertical" size="sm" class="vertical" />
          <span>
            <i class="iconfont icon-clock-outlined"></i>
            <udate to="YMDm" :date="article.created_at" separator="/" />
          </span>
        </responsive>
        <divider type="vertical" size="sm" class="vertical" />
        <span>
          <i class="iconfont icon-eye"></i>
          <span>{{ numberSplit(article.stats.views) }}&nbsp;</span>
          <i18n :k="LocalesKey.ARTICLE_VIEWS" />
        </span>
      </div>
      <markdown :html="ctxStore.defaultContent?.html" />
      <transition name="module" mode="out-in" @after-enter="handleFullContentRendered">
        <div :id="readmoreId" v-if="isRenderMoreEnabled" class="readmore">
          <button class="readmore-btn" :disabled="isRenderMoreContent" @click="handleRenderMore">
            <i18n :k="isRenderMoreContent ? LocalesKey.ARTICLE_RENDERING : LocalesKey.ARTICLE_READ_ALL" />
            <i class="iconfont icon-loadmore"></i>
          </button>
        </div>
        <markdown v-else-if="ctxStore.renderedFullContent" :html="ctxStore.moreContent?.html" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .detail {
    padding: $gap-sm $gap-lg;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $motion-duration-mid;

    .origin {
      position: absolute;
      top: 0.5rem;
      left: -1.4rem;
      transform: rotate(-45deg);
      width: 5rem;
      line-height: 2;
      text-align: center;
      transform-origin: center;
      color: $white;
      font-weight: bold;
      font-size: $font-size-h6;
      background-color: var(--color);
      &.original {
        --color: #{rgba($surmon, 0.7)};
      }
      &.hybrid {
        --color: #{rgba($green, 0.7)};
      }
      &.reprint {
        --color: #{rgba($red, 0.7)};
      }
    }

    .knowledge {
      user-select: text;
      position: relative;

      .title {
        margin-top: $gap-sm;
        margin-bottom: $gap-xs;
        text-align: center;

        .featured {
          display: inline-block;
          border: 1px solid;
          border-radius: $radius-xs;
          margin-left: $gap-xs;
          padding: 0 2px;
          font-weight: normal;
          text-transform: capitalize;
          font-size: $font-size-secondary;
          color: $color-text-secondary;
          transform: translateY(-2px);
          user-select: none;
        }
      }

      .meta {
        margin-bottom: $gap;
        text-align: center;
        color: $color-text-disabled;
        font-size: $font-size-tertiary;
        user-select: none;
        line-height: 2;
        .iconfont {
          margin-right: $gap-tiny;
        }
        .vertical {
          top: -1px;
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
          margin-top: 2rem;
          line-height: 2.5rem;
          text-align: center;
          font-weight: bold;
          color: $color-text-reversal;
          background-color: $primary-lighter;
          @include mix.background-transition();
          @include mix.radius-box($radius-sm);

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: $primary;
          }

          .iconfont {
            margin-left: $gap-sm;
          }
        }
      }
    }
  }
</style>
