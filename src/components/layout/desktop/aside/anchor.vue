<template>
  <div class="anchor" v-if="article">
    <button
      class="header"
      :title="article.title"
      @click="handleAnchor(ANCHORS.ARTICLE_CONTENT_ELEMENT_ID)"
    >
      <div class="title">{{ article.title }}</div>
      <div class="read">
        <i18n>
          <template #zh
            >共 {{ store.contentLength }} 字，需阅读 {{ store.readMinutes }} 分钟</template
          >
          <template #en>{{ store.contentLength }} words, {{ store.readMinutes }} min read</template>
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
          @click="handleAnchor(heading.id)"
        >
          <i class="level iconfont" :class="`icon-h-${heading.level}`"></i>
          <span class="text">{{ heading.text }}</span>
        </li>
        <li
          class="item readmore"
          key="readmore"
          v-if="store.isLongContent && !store.renderedFullContent"
          :class="`level-${minHeadingLevel}`"
          @click="handleAnchor(ANCHORS.ARTICLE_READMORE_ELEMENT_ID)"
        >
          <i class="level iconfont icon-loadmore"></i>
          <span class="text"><i18n :lkey="LANGUAGE_KEYS.ARTICLE_READ_ALL" /></span>
        </li>
      </ul>
    </div>
    <button class="link" @click="handleAnchor(ANCHORS.ARTICLE_META_ELEMENT_ID)">
      <i class="iconfont icon-heart"></i>
      <i18n zh="摁赞" en="Meta" />
      <divider type="vertical" />
      <span class="meta">
        <i class="iconfont icon-eye"></i>
        <span class="count">{{ article.meta.views }}</span>
      </span>
      <divider type="vertical" />
      <span class="meta">
        <i class="iconfont icon-like"></i>
        <span class="count">{{ article.meta.likes }}</span>
      </span>
    </button>
    <button class="link" @click="handleAnchor(ANCHORS.ARTICLE_RELATED_ELEMENT_ID)">
      <i class="iconfont icon-category"></i>
      <i18n zh="相关" en="Related articles" />
      <divider type="vertical" />
      <span class="count">{{ store.relatedArticles.length }}</span>
    </button>
    <button class="link" @click="handleAnchor(ANCHORS.COMMENT_ELEMENT_ID)">
      <i class="iconfont icon-comment"></i>
      <i18n zh="评论" en="Comments" />
      <divider type="vertical" />
      <span class="count">{{ article.meta.comments }}</span>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import * as ANCHORS from '/@/constants/anchor'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useArticleDetailStore } from '/@/store/article'
  import { scrollToElementAnchor } from '/@/utils/scroller'

  export default defineComponent({
    name: 'DesktopAsideAnchor',
    setup() {
      const articleDetailStore = useArticleDetailStore()
      const article = computed(() => articleDetailStore.article)
      const headings = computed(() => {
        const result = [...(articleDetailStore.defaultContent?.headings || [])]
        if (articleDetailStore.isLongContent && articleDetailStore.renderedFullContent) {
          result.push(...(articleDetailStore.moreContent?.headings || []))
        }
        return result
      })

      const minHeadingLevel = computed(() => {
        return Math.min(...headings.value.map((heading) => heading.level))
      })

      const handleAnchor = (elementID: string) => {
        scrollToElementAnchor(elementID)
      }

      return {
        ANCHORS,
        LANGUAGE_KEYS,
        article,
        store: articleDetailStore,
        headings,
        minHeadingLevel,
        handleAnchor
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
      padding: $sm-gap $gap;
      overflow-y: auto;
      max-height: 60%;
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
          @include text-overflow();
          &:hover {
            color: $primary;
            .iconfont {
              color: $primary;
            }

            .text {
              font-weight: bold;
              border-color: $primary;
            }
          }

          .level {
            margin-right: $xs-gap;
            color: $text-disabled;
          }

          .text {
            padding-bottom: 3px;
            border-bottom: 1px dotted $text-divider;
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
