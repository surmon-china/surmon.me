<template>
  <div class="nav" v-if="article">
    <button
      class="link"
      :title="article.title"
      @click="handleLink(ANCHORS.ARTICLE_CONTENT_ELEMENT_ID)"
    >
      <span v-if="headings.length" class="title">
        <i class="iconfont icon-title"></i>
        {{ article.title }}
      </span>
      <span v-else class="title">
        <i class="iconfont icon-read"></i>
        <i18n>
          <template #zh>正文（共 {{ store.contentLength }} 字）</template>
          <template #en>Article content ({{ store.contentLength }} words)</template>
        </i18n>
      </span>
    </button>
    <div class="link" v-if="headings.length">
      <i class="iconfont icon-read"></i>
      <i18n>
        <template #zh
          >共 {{ store.contentLength }} 字，需阅读 {{ store.readMinutes }} 分钟</template
        >
        <template #en>{{ store.contentLength }} words, {{ store.readMinutes }} min read</template>
      </i18n>
    </div>
    <div class="catalogue" v-if="headings.length">
      <ul class="list" :class="`indent-${minHeadingLevel}`">
        <li
          class="item"
          :key="index"
          :title="heading.text"
          :class="`level-${heading.level}`"
          v-for="(heading, index) in headings"
          @click="handleLink(heading.id)"
        >
          <i class="level iconfont" :class="`icon-h-${heading.level}`"></i>
          <span class="text">{{ heading.text }}</span>
        </li>
      </ul>
    </div>
    <button class="link" @click="handleLink(ANCHORS.ARTICLE_META_ELEMENT_ID)">
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
    <button class="link" @click="handleLink(ANCHORS.ARTICLE_RELETED_ELEMENT_ID)">
      <i class="iconfont icon-category"></i>
      <i18n zh="相关" en="Related articles" />
      <divider type="vertical" />
      <span class="count">{{ article.related.length }}</span>
    </button>
    <button class="link" @click="handleLink(ANCHORS.COMMENT_ELEMENT_ID)">
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
  import { useArticleDetailStore } from '/@/store/article'
  import { scrollToElementAnchor } from '/@/utils/scroller'

  export default defineComponent({
    name: 'DesktopAsideNav',
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

      const handleLink = (elementID: string) => {
        scrollToElementAnchor(elementID)
      }

      return {
        ANCHORS,
        article,
        store: articleDetailStore,
        headings,
        minHeadingLevel,
        handleLink
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .nav {
    padding: $gap;
    display: flex;
    flex-direction: column;

    .link,
    .catalogue {
      display: block;
      width: 100%;
      border: 1px dashed $module-bg-hover;
      border-radius: $sm-radius;
      margin-bottom: $gap;
      text-align: left;
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
        border-color: $primary;
      }

      .count {
        font-weight: bold;
      }

      .iconfont {
        margin-right: $sm-gap;
      }

      .title {
        font-weight: bold;
      }
    }

    .catalogue {
      padding: $sm-gap $gap;
      overflow-y: auto;
      max-height: 60%;

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
        }
      }

      &:hover {
        border-color: $primary;
      }
    }
  }
</style>
