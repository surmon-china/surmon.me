<script lang="ts" setup>
  import { computed } from 'vue'
  import { useArticleDetailStore } from '/@/stores/article'
  import { LanguageKey } from '/@/language'
  import { ArticleLangI18n } from '/@/interfaces/article'
  import { scrollToAnchor } from '/@/utils/scroller'
  import { numberSplit } from '/@/transforms/text'
  import * as ANCHORS from '/@/constants/anchor'

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
        <i18n v-bind="ArticleLangI18n[store.article.lang]" />
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
          <span class="text"><i18n :k="LanguageKey.ARTICLE_READ_ALL" /></span>
        </li>
      </ul>
    </div>
    <button class="link" @click="scrollToAnchor(ANCHORS.ARTICLE_META_ELEMENT_ID)">
      <i class="iconfont icon-heart"></i>
      <i18n zh="摁赞" en="Meta" />
      <divider type="vertical" />
      <span class="meta">
        <i class="iconfont icon-like"></i>
        <span class="count">{{ store.article.meta.likes }}</span>
      </span>
      <divider type="vertical" />
      <span class="meta">
        <i class="iconfont icon-eye"></i>
        <span class="count">{{ numberSplit(store.article.meta.views) }}</span>
      </span>
    </button>
    <button class="link" @click="scrollToAnchor(ANCHORS.ARTICLE_RELATED_ELEMENT_ID)">
      <i class="iconfont icon-category"></i>
      <i18n zh="相关" en="Related" />
      <divider type="vertical" />
      <span class="count">{{ store.relatedArticles.length }}</span>
    </button>
    <button class="link" @click="scrollToAnchor(ANCHORS.COMMENT_ELEMENT_ID)">
      <i class="iconfont icon-comment"></i>
      <i18n zh="评论" en="Comments" />
      <divider type="vertical" />
      <span class="count">{{ store.article.meta.comments }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .anchor {
    padding: $gap;
    display: flex;
    flex-direction: column;

    .header,
    .catalogue,
    .link {
      display: block;
      width: 100%;
      border: 1px dashed $module-bg-hover;
      border-radius: $sm-radius;
      margin-bottom: $gap;
      text-align: left;
    }

    .header,
    .link,
    .catalogue {
      &:hover {
        border-color: $primary;
      }
    }

    .link {
      flex-shrink: 0;
      padding: 0 $gap;
      height: 3rem;
      line-height: 3rem;
      @include text-overflow();
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: $primary;
      }

      .count {
        font-weight: bold;
      }

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    .header {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      flex-shrink: 0;
      padding: $xs-gap $gap;
      height: 6rem;

      .title {
        display: block;
        width: 100%;
        font-weight: bold;
        @include text-overflow();
      }

      .read {
        font-size: $font-size-small;
      }
    }

    .catalogue {
      max-height: 36rem;
      padding: $sm-gap $gap;
      overflow-y: auto;
      @include scroll-snap-y();
      &:hover {
        border-color: $primary;
      }

      .list {
        padding: 0;
        margin: 0;
        list-style: none;
        padding-left: $xs-gap;
        &.indent-2 {
          margin-left: -$font-size-h4;
        }
        &.indent-3 {
          margin-left: -$font-size-h4 * 2;
        }
        &.indent-4 {
          margin-left: -$font-size-h4 * 3;
        }
        &.indent-5 {
          margin-left: -$font-size-h4 * 4;
        }
        &.indent-6 {
          margin-left: -$font-size-h4 * 5;
        }

        .item {
          cursor: pointer;
          line-height: 2.4em;
          @include scroll-snap-item();
          @include text-overflow();
          &:hover {
            color: $primary;
            .iconfont {
              color: $primary;
            }
            .text {
              font-weight: bold;
            }
          }

          .level {
            margin-right: $xs-gap;
            color: $text-disabled;
          }

          .text {
            @include text-underline(0.4em);
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
            margin-top: $xs-gap;
            .text {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
