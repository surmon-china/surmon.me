<script lang="ts" setup>
  import { computed, watch, onBeforeMount } from 'vue'
  import { LocaleKey } from '/@/locales'
  import { APP_META } from '/@/configs/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { useArticleListStore } from '/@/stores/article'
  import { useTagStore, getTagEnName } from '/@/stores/tag'
  import { useCategoryStore } from '/@/stores/category'
  import { useAppOptionStore } from '/@/stores/basic'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { isClient } from '/@/configs/app.env'
  import Loadmore from '/@/components/common/loadmore.vue'
  import ListItem from './item.vue'

  const props = defineProps<{
    tagSlug?: string
    categorySlug?: string
    searchKeyword?: string
    date?: string
  }>()

  const { i18n: _i18n, isZhLang } = useEnhancer()
  const tagStore = useTagStore()
  const categoryStore = useCategoryStore()
  const articleListStore = useArticleListStore()
  const appOptionStore = useAppOptionStore()
  const filterCategory = computed(() => {
    return props.categorySlug ? categoryStore.data.find((category) => category.slug === props.categorySlug)! : null
  })
  const filterTag = computed(() => {
    return props.tagSlug ? tagStore.data.find((tag) => tag.slug === props.tagSlug) : null
  })

  const hasMoreArticles = computed(() => {
    const pagination = articleListStore.pagination
    return pagination ? pagination.current_page < pagination.total_page : false
  })

  usePageSeo(() => {
    // filters page
    if (props.date) {
      return { pageTitles: [props.date, 'Date'] }
    } else if (props.searchKeyword) {
      return { pageTitles: [`"${props.searchKeyword}"`, 'Search'] }
    } else if (filterCategory.value) {
      return { pageTitles: [filterCategory.value.name, filterCategory.value.slug] }
    } else if (filterTag.value) {
      return { pageTitles: [filterTag.value.name, filterTag.value.slug] }
    }

    // index page
    return {
      title: `${APP_META.title} - ${_i18n.t(LocaleKey.APP_SLOGAN)}`,
      description: isZhLang.value ? APP_META.zh_description : APP_META.en_description,
      keywords: appOptionStore.data?.keywords.join(','),
      ogType: 'website'
    }
  })

  const fetchArticles = (params: any = {}) => {
    return articleListStore.fetch({
      category_slug: props.categorySlug,
      tag_slug: props.tagSlug,
      date: props.date,
      keyword: props.searchKeyword,
      ...params
    })
  }

  const loadmoreArticles = () => {
    fetchArticles({
      page: articleListStore.pagination!.current_page + 1
    }).then(() => {
      if (isClient) {
        scrollToNextScreen()
      }
    })
  }

  onBeforeMount(() => {
    watch(
      () => props,
      () => fetchArticles(),
      { flush: 'post', deep: true }
    )
  })

  useUniversalFetch(() => fetchArticles())
</script>

<template>
  <div class="articles">
    <div class="header" v-if="tagSlug || categorySlug || date || searchKeyword">
      <div class="content">
        <template v-if="categorySlug">
          <i18n v-if="filterCategory">
            <template #zh>分类 “{{ filterCategory.name }}” 的过滤结果</template>
            <template #en>Category "{{ firstUpperCase(filterCategory.slug) }}" 's result</template>
          </i18n>
          <span v-else>{{ categorySlug }}</span>
        </template>
        <template v-if="tagSlug">
          <i18n v-if="filterTag">
            <template #zh>标签 “{{ filterTag.name }}” 的过滤结果</template>
            <template #en>Tag "{{ getTagEnName(filterTag) }}" 's result</template>
          </i18n>
          <span v-else>{{ tagSlug }}</span>
        </template>
        <i18n v-if="date">
          <template #zh>日期 “{{ date }}” 的过滤结果</template>
          <template #en>Date "{{ date }}" 's result</template>
        </i18n>
        <i18n v-if="searchKeyword">
          <template #zh>关键词 “{{ searchKeyword }}” 的过滤结果</template>
          <template #en>Search keyword "{{ searchKeyword }}" 's result</template>
        </i18n>
      </div>
      <router-link to="/" class="close">
        <i class="iconfont icon-cancel"></i>
      </router-link>
    </div>
    <placeholder
      :data="articleListStore.data.length"
      :loading="!articleListStore.data.length && articleListStore.fetching"
    >
      <template #loading>
        <ul class="skeletons" key="skeleton">
          <li v-for="item in 3" :key="item" class="item">
            <div class="thumbnail">
              <skeleton-base />
            </div>
            <div class="content">
              <div class="title">
                <skeleton-line />
              </div>
              <div class="description">
                <skeleton-line />
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template #placeholder>
        <empty bold :i18n-key="LocaleKey.ARTICLE_PLACEHOLDER" />
      </template>
      <template #default>
        <div>
          <transition-group key="list" name="list" tag="div" class="list">
            <list-item
              class="list-item"
              :article="article"
              :key="index"
              v-for="(article, index) in articleListStore.data"
            />
          </transition-group>
          <loadmore
            class="loadmore"
            :loading="articleListStore.fetching"
            :finished="!hasMoreArticles"
            @loadmore="loadmoreArticles"
          >
            <template #normal>
              <button class="normal" @click="loadmoreArticles">
                <i class="iconfont icon-loadmore"></i>
              </button>
            </template>
            <template #loading>
              <loading-indicator class="loading" width="2rem" height="1.2rem" gap="0.68rem" />
            </template>
            <template #finished>
              <span class="finished">
                <i18n :k="LocaleKey.LIST_NO_MORE_DATA" />
              </span>
            </template>
          </loadmore>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .articles {
    .header {
      $size: 4rem;
      display: flex;
      height: $size;
      line-height: $size;
      margin-left: -$gap;
      margin-right: -$gap;
      margin-top: -$gap-lg;
      margin-bottom: $gap-lg;
      text-align: center;
      background-color: $module-bg-darker-1;

      .close {
        flex-shrink: 0;
        width: $size;
      }

      .content {
        flex-grow: 1;
        padding-left: $size;
        font-weight: bold;
        @include mix.text-overflow();
      }
    }

    .skeletons {
      padding: 0;
      list-style: none;

      .item {
        background-color: $module-bg;
        @include mix.radius-box($radius-sm);
        margin-bottom: $gap-lg;
        &:last-child {
          margin-bottom: 0;
        }

        .thumbnail {
          height: 9rem;
          padding: $gap;
        }

        .content {
          padding: 1rem;
          padding-top: 0;

          .title {
            width: 60%;
            height: 2.4rem;
          }

          .description {
            width: 80%;
            margin-top: 1rem;
            height: 1rem;
          }
        }
      }
    }

    .list {
      .list-item {
        margin-bottom: 1.4rem;
      }
    }

    .loadmore {
      color: $color-text-disabled;

      .normal {
        width: 100%;
        font-size: $font-size-h2;
      }

      .loading {
        margin: $gap-sm 0;
      }

      .finished {
        margin: $gap-xs 0;
        color: $color-text-divider;
        font-weight: bold;
      }
    }
  }
</style>
