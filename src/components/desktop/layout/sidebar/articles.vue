<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import {
    useHottestArticleListStore,
    useLatestArticleListStore,
    useFeaturedArticleListStore
  } from '/@/stores/article-rankings'
  import { Language, LocalesKey } from '/@/locales'
  import { APP_CONFIG } from '/@/configs/app.config'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { numberToKilo } from '/@/transforms/text'
  import { dateToYMD } from '/@/transforms/moment'

  const { i18n: _i18n } = useEnhancer()
  const hottestArticleListStore = useHottestArticleListStore()
  const latestArticleListStore = useLatestArticleListStore()
  const featuredArticleListStore = useFeaturedArticleListStore()

  const tabs = computed(() => [
    {
      zh_title: '最近更新',
      en_title: 'Latest',
      zh_label: '最新',
      en_label: 'latest',
      icon: 'icon-clock',
      store: latestArticleListStore
    },
    {
      zh_title: '热门趋势',
      en_title: 'Trending',
      zh_label: '热门',
      en_label: 'trend',
      icon: 'icon-fire',
      store: hottestArticleListStore
    },
    {
      zh_title: '群贤毕至',
      en_title: 'Featured',
      zh_label: _i18n.t(LocalesKey.ARTICLE_FEATURED_SHORT, Language.Chinese),
      en_label: _i18n.t(LocalesKey.ARTICLE_FEATURED_SHORT, Language.English),
      icon: 'icon-windmill',
      store: featuredArticleListStore
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
      <div class="tabs">
        <template :key="index" v-for="(tab, index) in tabs">
          <span
            class="item"
            :class="{ activated: index === activatedTabIndex }"
            @click="switchTabList(index)"
          >
            <i18n :zh="tab.zh_label" :en="tab.en_label" />
          </span>
          <divider type="vertical" size="sm" v-if="index !== tabs.length - 1" />
        </template>
      </div>
    </div>
    <placeholder :loading="activatedTab.store.fetching" :has-data="!!activatedTab.store.data.length">
      <template #placeholder>
        <empty class="article-list-empty">
          <i18n :k="LocalesKey.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <div class="article-list-skeleton">
          <skeleton v-for="item in 5" :key="item" class="item" />
        </div>
      </template>
      <template #default>
        <ul class="article-list">
          <li
            v-for="(article, i) in activatedTab.store.data.slice(
              0,
              APP_CONFIG.desktop_sidebar_article_list_count
            )"
            :key="article.id"
            class="item"
          >
            <span class="index" :data-index="i + 1">{{ i + 1 }}{{ i > 2 ? '.' : '' }}</span>
            <div class="content">
              <router-link class="title" :to="getArticleDetailRoute(article.id)" :title="article.title">
                {{ article.title }}
              </router-link>
              <div class="meta">
                <span class="item date">{{ dateToYMD(article.created_at).slice(0, -3) }}</span>
                <span class="item views">
                  <i class="iconfont icon-eye"></i>
                  {{ numberToKilo(article.stats.views) }}
                </span>
                <span class="item comments">
                  <i class="iconfont icon-comment"></i>
                  {{ article.stats.comments }}
                </span>
                <span class="item likes">
                  <i class="iconfont icon-like"></i>
                  {{ article.stats.likes }}
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .article {
    overflow: hidden;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap-sm;
      border-bottom: 1px dotted $module-bg-darker-1;

      .title {
        .text {
          font-weight: bold;
        }
        .iconfont {
          margin-right: $gap-xs;
        }
      }

      .tabs {
        .item {
          font-size: $font-size-secondary;
          color: $color-text-secondary;
          cursor: pointer;
          &.activated {
            font-weight: 600;
          }
          &.activated,
          &:hover {
            color: $color-text;
          }
        }
      }
    }

    .article-list-skeleton {
      padding: $gap-sm;

      .item {
        height: 1rem;
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .article-list {
      list-style: none;
      padding: $gap-xs 0;
      margin-bottom: 0;

      > .item {
        display: flex;
        padding: 0 $gap-sm;
        margin-bottom: $gap-xs;
        color: $color-text-darker;
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
          margin-right: $gap-xs;
          text-align: center;
          border-radius: $radius-xs;
          color: $color-text-disabled;
          font-weight: 700;
          font-size: $font-size-secondary;
          &[data-index='1'],
          &[data-index='2'],
          &[data-index='3'] {
            color: $white;
            font-size: $font-size-quinary;
          }
          &[data-index='1'] {
            background-color: $surmon;
          }
          &[data-index='2'] {
            background-color: rgba($green, 0.75);
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
          font-size: $font-size-base;
          @include mix.text-overflow();
          &:hover {
            text-decoration: none;
            border-bottom-color: initial;
          }
        }

        .meta {
          font-size: $font-size-tertiary;
          color: $color-text-disabled;

          .iconfont {
            font-size: $font-size-quaternary;
            color: $color-text-divider;
            opacity: 0.6;
          }

          .item {
            display: inline-block;
            &.date {
              margin-right: $gap;
            }
            &.views {
              width: 4rem;
            }
            &.comments {
              width: 3rem;
            }
          }
        }
      }
    }
  }
</style>
