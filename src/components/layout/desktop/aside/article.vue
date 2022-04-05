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
            <span class="index" :class="{ small: item.i >= 10 }" :data-index="item.i">
              {{ item.i }}
            </span>
            <div class="content">
              <router-link class="title" :to="getArticleDetailRoute(item.id)" :title="item.title">
                {{ item.title }}
              </router-link>
              <div class="meta">
                <span class="item">
                  {{ dateToYMD(item.create_at) }}
                </span>
                <span class="item">
                  <i class="iconfont icon-eye"></i>
                  {{ numberToKilo(item.meta.views) }}
                </span>
                <span class="item">
                  <i class="iconfont icon-comment"></i>
                  {{ item.meta.comments }}
                </span>
              </div>
            </div>
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
  import { numberToKilo } from '/@/transforms/text'
  import { dateToYMD } from '/@/transforms/moment'
  import { LanguageKey } from '/@/language'

  const PER_PAGE = 8

  export default defineComponent({
    name: 'DesktopAsideArticle',
    setup() {
      const articleListStore = useArticleListStore()
      const isFetching = computed(() => articleListStore.hotList.fetching)
      const articleFullList = computed(() => {
        return articleListStore.hotList.data
          .slice(0, PER_PAGE * 2)
          .map((a, i) => ({ ...a, i: i + 1 }))
      })
      const hotPage = ref(0)
      const articles = computed(() => {
        const perPage = hotPage.value * PER_PAGE
        return articleFullList.value
          .map((a, i) => ({ ...a, i: i + 1 }))
          .slice(perPage, perPage + PER_PAGE)
      })

      const switchHotPage = () => {
        const count = articleFullList.value.length
        const pages = Math.ceil(count / PER_PAGE)
        if (hotPage.value < pages - 1) {
          hotPage.value++
        } else {
          hotPage.value = 0
        }
      }

      return {
        LanguageKey,
        isFetching,
        articles,
        switchHotPage,
        getArticleDetailRoute,
        numberToKilo,
        dateToYMD
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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

      > .item {
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

      > .item {
        display: flex;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-darker;
        &:last-child {
          margin: 0;
        }

        .index {
          $size: $font-size-base;
          width: $size;
          height: $size;
          line-height: $size;
          margin-top: 4px;
          display: inline-block;
          flex-shrink: 0;
          margin-right: $sm-gap;
          text-align: center;
          border-radius: $xs-radius;
          color: $text-disabled;
          font-weight: 700;
          font-size: $font-size-base - 1;
          &.small {
            font-size: $font-size-small;
          }
          &[data-index='1'],
          &[data-index='2'],
          &[data-index='3'] {
            color: $white;
            font-size: $font-size-small * 0.8;
          }
          &[data-index='1'] {
            background-color: $surmon;
          }
          &[data-index='2'] {
            background-color: rgba($accent, 0.7);
          }
          &[data-index='3'] {
            background-color: rgba($red, 0.6);
          }
        }

        .content {
          flex-shrink: 1;
          overflow: hidden;
        }

        .title {
          display: inline-block;
          max-width: 100%;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;
          font-size: $font-size-h6;
          @include text-overflow();
          &:hover {
            text-decoration: none;
            border-bottom-color: initial;
          }
        }

        .meta {
          font-size: $font-size-small;
          color: $text-disabled;

          .iconfont {
            font-size: $font-size-small - 1;
            color: $text-divider;
            opacity: 0.6;
          }

          .item {
            margin-right: $lg-gap;
          }
        }
      }
    }
  }
</style>
