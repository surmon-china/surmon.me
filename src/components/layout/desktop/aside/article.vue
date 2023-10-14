<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { Language, LanguageKey } from '/@/language'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { numberToKilo } from '/@/transforms/text'
  import { dateToYMD } from '/@/transforms/moment'

  const { i18n: _i18n } = useEnhancer()
  const { hottestArticleList, latestArticleList, featuredArticleList } = useStores()
  const tabs = computed(() => [
    {
      zh_title: '最近更新',
      en_title: 'Latest',
      zh_label: '最新',
      en_label: 'latest',
      icon: 'icon-clock',
      store: latestArticleList
    },
    {
      zh_title: '热门趋势',
      en_title: 'Trending',
      zh_label: '热门',
      en_label: 'trend',
      icon: 'icon-fire',
      store: hottestArticleList
    },
    {
      zh_title: '群贤毕至',
      en_title: 'Featured',
      zh_label: _i18n.t(LanguageKey.ARTICLE_FEATURED_SHORT, Language.Chinese),
      en_label: _i18n.t(LanguageKey.ARTICLE_FEATURED_SHORT, Language.English),
      icon: 'icon-windmill',
      store: featuredArticleList
    }
  ])

  const activatedTabIndex = ref(tabs.value.length - 1)
  const activatedTab = computed(() => tabs.value[activatedTabIndex.value])
  const switchTabList = (index: number) => {
    activatedTabIndex.value = index
    const tab = tabs.value[index]
    if (!tab.store.fetched && !tab.store.fetching) {
      tab.store.fetch()
    }
  }
</script>

<template>
  <div class="article">
    <div class="header">
      <span class="title">
        <i class="iconfont" :class="activatedTab.icon" />
        <span class="text">
          <i18n :zh="activatedTab.zh_title" :en="activatedTab.en_title" />
        </span>
      </span>
      <div class="types">
        <template :key="index" v-for="(tab, index) in tabs">
          <span class="item" :class="{ activated: index === activatedTabIndex }" @click="switchTabList(index)">
            <i18n :zh="tab.zh_label" :en="tab.en_label" />
          </span>
          <divider type="vertical" v-if="index !== tabs.length - 1" />
        </template>
      </div>
    </div>
    <placeholder
      :data="activatedTab.store.data"
      :loading="activatedTab.store.fetching"
      :i18n-key="LanguageKey.ARTICLE_PLACEHOLDER"
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
          <li v-for="(article, i) in activatedTab.store.data.slice(0, 8)" :key="article.id" class="item">
            <span class="index" :data-index="i + 1">{{ i + 1 }}{{ i > 2 ? '.' : '' }}</span>
            <div class="content">
              <router-link class="title" :to="getArticleDetailRoute(article.id)" :title="article.title">
                {{ article.title }}
              </router-link>
              <div class="meta">
                <span class="item date">{{ dateToYMD(article.created_at).slice(0, -3) }}</span>
                <span class="item views">
                  <i class="iconfont icon-eye"></i>
                  {{ numberToKilo(article.meta.views) }}
                </span>
                <span class="item comments">
                  <i class="iconfont icon-comment"></i>
                  {{ article.meta.comments }}
                </span>
                <span class="item likes">
                  <i class="iconfont icon-like"></i>
                  {{ article.meta.likes }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .article {
    overflow: hidden;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dotted $module-bg-darker-1;

      .title {
        .text {
          font-weight: bold;
        }
        .iconfont {
          margin-right: $sm-gap;
        }
      }

      .types {
        .item {
          font-size: $font-size-base - 1;
          color: $text-secondary;
          cursor: pointer;
          &.activated {
            font-weight: 600;
          }
          &.activated,
          &:hover {
            color: $text;
          }
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
          flex-grow: 1;
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
            display: inline-block;
            &.date {
              margin-right: $lg-gap;
            }
            &.views {
              width: 5.4rem;
            }
            &.comments {
              width: 4rem;
            }
          }
        }
      }
    }
  }
</style>
