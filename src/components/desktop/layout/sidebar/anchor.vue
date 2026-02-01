<script lang="ts" setup>
  import { computed } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { useArticleDetailStore } from '/@/stores/article-detail'
  import { ArticleLanguageI18n } from '/@/interfaces/article'
  import { scrollToAnchor } from '/@/utils/scroller'
  import { numberSplit } from '/@/transforms/text'
  import * as ANCHORS from '/@/constants/element-anchor'

  const store = useArticleDetailStore()
  const headings = computed(() => {
    const result = [...(store.defaultContent?.headings || [])]
    if (store.isLongContent && store.renderedFullContent) {
      result.push(...(store.moreContent?.headings || []))
    }
    return result
  })

  const minHeadingLevel = computed(() => {
    return Math.min(...headings.value.map((heading) => heading.level))
  })
</script>

<template>
  <div class="anchor" v-if="store.article">
    <button class="header" :title="store.article.title" @click="scrollToAnchor(ANCHORS.ARTICLE_CONTENT_ELEMENT_ID)">
      <div class="title">{{ store.article.title }}</div>
      <div class="read">
        <i18n v-bind="ArticleLanguageI18n[store.article.lang]" />
        <i18n zh="，" en=", " />
        <i18n>
          <template #zh>共 {{ numberSplit(store.contentLength) }} 字，需阅读 {{ store.readMinutes }} 分钟</template>
          <template #en>
            {{ numberSplit(store.contentLength) }} characters, {{ store.readMinutes }} min read
          </template>
        </i18n>
      </div>
    </button>
    <div class="catalogue" v-if="headings.length">
      <ul class="list" :class="`indent-${minHeadingLevel}`">
        <li
          class="item"
          :key="index"
          :title="heading.text"
          :class="`level-${heading.level}`"
          v-for="(heading, index) in headings"
          @click="scrollToAnchor(heading.id)"
        >
          <i class="level iconfont" :class="`icon-h-${heading.level}`"></i>
          <span class="text">{{ heading.text }}</span>
        </li>
        <li
          class="item readmore"
          key="readmore"
          v-if="store.isLongContent && !store.renderedFullContent"
          :class="`level-${minHeadingLevel}`"
          @click="scrollToAnchor(ANCHORS.ARTICLE_READMORE_ELEMENT_ID)"
        >
          <i class="level iconfont icon-loadmore"></i>
          <span class="text"><i18n :k="LocalesKey.ARTICLE_READ_ALL" /></span>
        </li>
      </ul>
    </div>
    <button class="button" @click="scrollToAnchor(ANCHORS.ARTICLE_META_ELEMENT_ID)">
      <i class="iconfont icon-like"></i>
      <i18n zh="按赞" en="Upvote" />
      <span class="count">{{ store.article.stats.likes }}</span>
      <divider type="vertical" />
      <i18n zh="随喜" en="Sponsor" />
    </button>
    <button class="button" @click="scrollToAnchor(ANCHORS.COMMENT_ELEMENT_ID)">
      <i class="iconfont icon-discussion"></i>
      <i18n zh="评论" en="Comments" />
      <span class="count">{{ store.article.stats.comments }}</span>
      <divider type="vertical" />
      <i18n zh="AI 点评" en="AI Review" />
    </button>
    <button class="button" @click="scrollToAnchor(ANCHORS.ARTICLE_SHARE_ELEMENT_ID)">
      <i class="iconfont icon-share"></i>
      <i18n zh="分享" en="Share" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .anchor {
    padding: $gap-sm;
    display: flex;
    flex-direction: column;

    .header,
    .catalogue,
    .button {
      display: block;
      width: 100%;
      border: 1px dashed $module-bg-hover;
      border-radius: $radius-sm;
      margin-bottom: $gap-sm;
      text-align: left;
    }

    .header,
    .button,
    .catalogue {
      &:hover {
        border-color: $primary;
      }
    }

    .header {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-shrink: 0;
      padding: $gap-tiny $gap-sm;
      height: 4.6rem;

      .title {
        display: block;
        width: 100%;
        font-weight: bold;
        @include mix.text-overflow();
      }

      .read {
        font-size: $font-size-tertiary;
      }
    }

    .button {
      flex-shrink: 0;
      padding-inline: $gap;
      line-height: 2.5;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: $primary;
      }

      .iconfont {
        margin-right: $gap-xs;
      }

      .count {
        margin-left: $gap-xs;
        font-weight: bold;
      }
    }

    .catalogue {
      max-height: 36rem;
      padding: $gap-tiny $gap;
      overflow-y: auto;
      @include mix.scroll-snap-y();
      &:hover {
        border-color: $primary;
      }

      .list {
        padding: 0;
        margin: 0;
        list-style: none;
        padding-left: $gap-tiny;
        &.indent-2 {
          margin-left: 1rem;
        }
        &.indent-3 {
          margin-left: -2.2rem;
        }
        &.indent-4 {
          margin-left: -3.2rem;
        }
        &.indent-5 {
          margin-left: -4.4rem;
        }
        &.indent-6 {
          margin-left: -5.4rem;
        }

        .item {
          cursor: pointer;
          line-height: 2.4em;
          @include mix.scroll-snap-item();
          @include mix.text-overflow();
          &:hover {
            color: $primary;
            .iconfont {
              color: $primary;
            }
          }

          .level {
            margin-right: $gap-tiny;
            color: $color-text-disabled;
          }

          .text {
            @include mix.text-underline(0.4em);
            text-decoration-style: dotted;
          }

          &.level-2 {
            padding-left: $font-size-h4;
          }
          &.level-3 {
            padding-left: $font-size-h4 * 2;
          }
          &.level-4 {
            padding-left: $font-size-h4 * 3;
          }
          &.level-5 {
            padding-left: $font-size-h4 * 4;
          }
          &.level-6 {
            padding-left: $font-size-h4 * 5;
          }

          &.readmore {
            margin-top: $gap-tiny;
            .text {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
