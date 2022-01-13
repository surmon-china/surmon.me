<template>
  <div class="article">
    <p class="title">
      <i class="iconfont icon-hotfill" />
      <strong>
        <i18n :lkey="LANGUAGE_KEYS.HOT_ARTICLE_LIST_TITLE" />
      </strong>
    </p>
    <placeholder
      :data="articleListStore.hotList.data"
      :loading="articleListStore.hotList.fetching"
      :i18n-key="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"
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
          <li v-for="item in articleListStore.hotList.data" :key="item.id" class="item">
            <span class="index"></span>
            <router-link class="title" :to="getArticleDetailRoute(item.id)" :title="item.title">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useArticleListStore } from '/@/store/article'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getArticleDetailRoute } from '/@/transforms/route'

  export default defineComponent({
    name: 'DesktopAsideArticle',
    setup() {
      const articleListStore = useArticleListStore()

      return {
        articleListStore,
        getArticleDetailRoute,
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .article {
    overflow: hidden;

    > .title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dotted $module-bg-darker-1;

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
        height: 2.2rem;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-darker;

        &:nth-child(1) {
          .index {
            color: $white;
            background-color: $primary-translucent;
          }
        }

        &:nth-child(2) {
          .index {
            color: $white;
            background-color: rgba($accent, 0.6);
          }
        }

        &:nth-child(3) {
          .index {
            color: $white;
            background-color: rgba($red, 0.6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          $size: 1.5em;
          flex-shrink: 0;
          color: $text-disabled;
          counter-increment: hot-article-list;
          background-color: $module-bg-darker-1;
          width: $size;
          height: $size;
          line-height: $size;
          display: block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: 1rem;
          font-weight: bold;
          border-radius: $xs-radius;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          display: block;
          font-size: $font-size-h6;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;
          @include text-overflow();

          &:hover {
            text-decoration: none;
            border-bottom-color: initial;
          }
        }
      }
    }
  }
</style>
