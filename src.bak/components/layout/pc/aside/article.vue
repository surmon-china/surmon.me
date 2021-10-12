<template>
  <div class="article">
    <p class="title">
      <i class="iconfont icon-hotfill" />
      <strong>
        <i18n :lkey="LANGUAGE_KEYS.HOT_ARTICLE_LIST_TITLE" />
      </strong>
    </p>
    <placeholder
      :data="articles"
      :loading="isFetching"
      :p-i18n-key="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"
    >
      <template #loading>
        <ul class="article-list-skeleton" key="skeleton">
          <li v-for="item in 5" :key="item" class="item">
            <skeleton-line />
          </li>
        </ul>
      </template>
      <template #default>
        <ul class="article-list" key="list">
          <li
            v-for="item in articles"
            :key="item.id"
            class="item"
          >
            <span class="index"></span>
            <router-link
              class="title"
              :to="getArticleDetailRoute(item.id)"
              :title="getArticleTitle(item)"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from '/@/store'
  import { useI18n } from '/@/services/i18n'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { isSearchArchive, getArticleDetailRoute } from '/@/transforms/route'

  export default defineComponent({
    name: 'PcAsideArticle',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const articles = computed(() => store.state.article.hotList.data)
      const isFetching = computed(() => store.state.article.hotList.fetching)

      const getArticleTitle = (article: any) => {
        const commentCount = article.meta.comments + i18n.translate(LANGUAGE_KEYS.COMMENT_LIST_COUNT)
        const likeCount = i18n.translate(LANGUAGE_KEYS.COMMENT_LIKE_COUNT, article.meta.likes)
        return `${article.title} - 「 ${commentCount} | ${likeCount} 」`
      }

      return {
        articles,
        isFetching,
        getArticleTitle,
        getArticleDetailRoute,
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';
  @import './variables.scss';

  .article {
    overflow: hidden;

    > .title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dotted $module-bg-darker-1;
      text-transform: uppercase;

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    .article-list-skeleton {
      list-style: none;
      padding: $gap;
      margin: 0;

      .item {
        height: 1em;
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .article-list {
      list-style: none;
      padding: $sm-gap 0;
      margin-bottom: 0;
      counter-reset: hot-article-list;

      .item {
        display: flex;
        align-items: center;
        height: 1.9em;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-darker;

        &:nth-child(1) {
          .index {
            color: $text-reversal;
            background-color: $primary-translucent;
          }
        }

        &:nth-child(2) {
          .index {
            color: $text-reversal;
            background-color: rgba($accent, .6);
          }
        }

        &:nth-child(3) {
          .index {
            color: $text-reversal;
            background-color: rgba($red, .6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          $size: 1.5em;
          flex-shrink: 0;
          color: $text-secondary;
          counter-increment: hot-article-list;
          background-color: $module-bg-darker-1;
          width: $size;
          height: $size;
          line-height: $size;
          display: block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: $gap;
          border-radius: $xs-radius;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          display: block;
          font-size: $font-size-h6;
          border-bottom: 1px solid transparent;
          @include text-overflow();

          &:hover {
            text-decoration: none;
            border-color: initial;
          }
        }
      }
    }
  }
</style>
