<template>
  <div class="article">
    <div class="header">
      <span class="title">
        <i class="iconfont icon-hotfill" />
        <span class="text">
          <i18n :k="LanguageKey.HOT_ARTICLE_LIST_TITLE" />
        </span>
      </span>
      <button class="switch" @click="switchHotPage">
        <i class="iconfont icon-switch" />
      </button>
    </div>
    <placeholder :data="articles" :loading="isFetching" :i18n-key="LanguageKey.ARTICLE_PLACEHOLDER">
      <template #loading>
        <ul class="article-list-skeleton" key="skeleton">
          <li v-for="item in 5" :key="item" class="item">
            <skeleton-line />
          </li>
        </ul>
      </template>
      <template #default>
        <ul class="article-list" key="list">
          <li v-for="item in articles" :key="item.id" class="item">
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
  import { defineComponent, ref, computed } from 'vue'
  import { useArticleListStore } from '/@/stores/article'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { LanguageKey } from '/@/language'

  const PER_PAGE = 10

  export default defineComponent({
    name: 'DesktopAsideArticle',
    setup() {
      const articleListStore = useArticleListStore()
      const isFetching = computed(() => articleListStore.hotList.fetching)
      const hotPage = ref(0)
      const articles = computed(() => {
        const perPage = hotPage.value * PER_PAGE
        return articleListStore.hotList.data.slice(perPage, perPage + PER_PAGE)
      })

      const switchHotPage = () => {
        const count = articleListStore.hotList.data.length
        const pages = Math.ceil(count / PER_PAGE)
        if (hotPage.value < pages - 1) {
          hotPage.value++
        } else {
          hotPage.value = 0
        }
      }

      return {
        isFetching,
        articles,
        switchHotPage,
        getArticleDetailRoute,
        LanguageKey
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .article {
    overflow: hidden;

    .header {
      display: flex;
      justify-content: space-between;
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dotted $module-bg-darker-1;

      .title {
        .iconfont {
          margin-right: $sm-gap;
        }
        .text {
          font-weight: bold;
        }
      }

      .switch {
        color: $text-secondary;
        &:hover {
          color: $text;
        }
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
