<template>
  <div class="nav" v-if="article">
    <button
      class="link"
      :title="article.title"
      @click="handleLink(ANCHORS.ARTICLE_CONTENT_ELEMENT_ID)"
    >
      <i class="iconfont icon-read"></i>
      <span v-if="headings.length" class="title">{{ article.title }}</span>
      <span v-else class="title">
        <i18n>
          <template #zh>正文（共 {{ article.content.length }} 字）</template>
          <template #en>Article content ({{ article.content.length }} words)</template>
        </i18n>
      </span>
    </button>
    <div class="link" v-if="headings.length">
      <i class="iconfont icon-mood"></i>
      <i18n>
        <template #zh>共 {{ article.content.length }} 字，需阅读 {{ readTime }} 分钟</template>
        <template #en>{{ article.content.length }} words, take {{ readTime }} minutes</template>
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
    <button class="link" @click="handleLink(ANCHORS.ARTICLE_SHARE_ELEMENT_ID)">
      <i class="iconfont icon-share"></i>
      <i18n zh="分享" en="Share" />
    </button>
    <button class="link" @click="handleLink(ANCHORS.ARTICLE_META_ELEMENT_ID)">
      <i class="iconfont icon-clock"></i>
      <i18n zh="元始" en="Meta" />
      <span class="separator">|</span>
      <span class="meta">
        <i class="iconfont icon-eye"></i>
        <span>{{ article.meta.views }}</span>
      </span>
      <span class="separator">|</span>
      <span class="meta">
        <i class="like-icon iconfont icon-heart"></i>
        <span>{{ article.meta.likes }}</span>
      </span>
    </button>
    <button class="link" @click="handleLink(ANCHORS.ARTICLE_RELETED_ELEMENT_ID)">
      <i class="iconfont icon-category"></i>
      <i18n zh="相关文章" en="Related articles" />
      <span>&nbsp;({{ article.related.length }})</span>
    </button>
    <button class="link" @click="handleLink(ANCHORS.COMMENT_ELEMENT_ID)">
      <i class="iconfont icon-comment"></i>
      <i18n zh="评论" en="Comments" />
      <span>&nbsp;({{ article.meta.comments }})</span>
    </button>
    <button class="link" @click="handleLink(ANCHORS.COMMENT_PUBLISHER_ELEMENT_ID)">
      <i class="iconfont icon-edit"></i>
      <i18n zh="发布评论" en="Pulish comment" />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import * as ANCHORS from '/@/constants/anchor'
  import { useArticleDetailStore } from '/@/store/article'
  import { scrollToElementAnchor } from '/@/utils/scroller'

  export default defineComponent({
    name: 'PCAsideNav',
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

      const readTime = computed(() => {
        const words = article.value?.content.length || 0
        const minutes = Math.round(words / 400)
        return minutes < 1 ? 1 : minutes
      })

      const handleLink = (elementID: string) => {
        scrollToElementAnchor(elementID)
      }

      return {
        ANCHORS,
        article,
        headings,
        minHeadingLevel,
        readTime,
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

      .iconfont {
        margin-right: $sm-gap;
      }

      .title {
        font-weight: bold;
      }

      .separator {
        margin: 0 $gap;
        color: $text-dividers;
      }

      .meta {
        .like-icon {
          color: $red;
        }
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
            border-bottom: 1px dotted $text-dividers;
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
