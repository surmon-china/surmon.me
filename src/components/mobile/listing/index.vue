<script lang="ts" setup>
  import { computed, watch, onBeforeMount } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useUniversalFetch } from '/@/app/universal'
  import { useArticleListStore } from '/@/stores/article-list'
  import { useCategoryStore } from '/@/stores/category'
  import { useTagStore, getTagEnName } from '/@/stores/tag'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import Loadmore from '/@/components/common/loadmore.vue'
  import ListItem from './item.vue'

  const props = defineProps<{
    tagSlug?: string
    categorySlug?: string
    searchKeyword?: string
    date?: string
  }>()

  const { appOptions, isZhLang, i18n: _i18n } = useEnhancer()

  const tagStore = useTagStore()
  const categoryStore = useCategoryStore()
  const articleListStore = useArticleListStore()

  const filterCategory = computed(() => {
    return props.categorySlug ? categoryStore.data.find(({ slug }) => slug === props.categorySlug) : null
  })
  const filterTag = computed(() => {
    return props.tagSlug ? tagStore.data.find(({ slug }) => slug === props.tagSlug) : null
  })

  const fetchParams = computed(() => ({
    date: props.date,
    keyword: props.searchKeyword,
    category_slug: props.categorySlug,
    tag_slug: props.tagSlug
  }))

  const fetchArticles = () => {
    return articleListStore.fetch(fetchParams.value)
  }

  const fetchNextPageArticles = async () => {
    await articleListStore.fetchNextPage(fetchParams.value)
    scrollToNextScreen()
  }

  usePageSeo(() => {
    // filters page
    if (props.date) {
      return { pageTitles: [props.date, isZhLang.value ? '日期' : 'Date'] }
    } else if (props.searchKeyword) {
      return isZhLang.value
        ? { pageTitles: [`“${props.searchKeyword}”`, '搜索'] }
        : { pageTitles: [`"${props.searchKeyword}"`, 'Search'] }
    } else if (filterCategory.value) {
      return { pageTitles: [filterCategory.value.name, firstUpperCase(filterCategory.value.slug)] }
    } else if (filterTag.value) {
      const tagZhName = filterTag.value.name
      const tagEnName = getTagEnName(filterTag.value)
      return { pageTitles: isZhLang.value ? [tagZhName, tagEnName] : [tagEnName, 'Tag'] }
    }

    // index page
    return {
      title: `${APP_PROFILE.title} - ${_i18n.t(LocalesKey.APP_SLOGAN)}`,
      description: isZhLang.value ? APP_PROFILE.description_zh : APP_PROFILE.description_en,
      keywords: appOptions.value?.keywords.join(','),
      ogType: 'website'
    }
  })

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
  <div class="articles-page">
    <div class="articles-list-header" v-if="tagSlug || categorySlug || date || searchKeyword">
      <div class="content">
        <template v-if="categorySlug">
          <i18n v-if="filterCategory">
            <template #zh>分类 “{{ filterCategory.name }}” 下的所有文章</template>
            <template #en>Articles in category "{{ firstUpperCase(filterCategory.slug) }}"</template>
          </i18n>
          <span v-else>{{ categorySlug }}</span>
        </template>
        <template v-if="tagSlug">
          <i18n v-if="filterTag">
            <template #zh>标签 “{{ filterTag.name }}” 的相关文章</template>
            <template #en>Articles tagged "{{ getTagEnName(filterTag) }}"</template>
          </i18n>
          <span v-else>{{ tagSlug }}</span>
        </template>
        <i18n v-if="date">
          <template #zh>发布于 {{ date }} 的文章</template>
          <template #en>Articles from {{ date }}</template>
        </i18n>
        <i18n v-if="searchKeyword">
          <template #zh>关键词 “{{ searchKeyword }}” 的搜索结果</template>
          <template #en>Search results for "{{ searchKeyword }}"</template>
        </i18n>
      </div>
      <router-link to="/" class="close">
        <i class="iconfont icon-cancel"></i>
      </router-link>
    </div>
    <placeholder
      :has-data="!!articleListStore.data.length"
      :loading="articleListStore.fetching && !articleListStore.data.length"
    >
      <template #loading>
        <ul class="articles-list-skeleton">
          <li v-for="item in 3" :key="item" class="item">
            <div class="thumbnail">
              <skeleton class="skeleton" />
            </div>
            <div class="content">
              <skeleton class="title" />
              <skeleton class="line" />
              <skeleton class="line" />
            </div>
          </li>
        </ul>
      </template>
      <template #placeholder>
        <empty class="articles-list-empty" bold>
          <i18n :k="LocalesKey.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #default>
        <div>
          <transition-group key="list" name="list" tag="div" class="articles-list-content">
            <list-item
              class="list-item"
              :article="article"
              :key="index"
              v-for="(article, index) in articleListStore.data"
            />
          </transition-group>
          <loadmore
            class="articles-list-loadmore"
            :loading="articleListStore.fetching"
            :finished="!articleListStore.hasMore"
            @loadmore="fetchNextPageArticles"
          >
            <template #normal>
              <button class="normal" @click="fetchNextPageArticles">
                <i class="iconfont icon-loadmore"></i>
              </button>
            </template>
            <template #loading>
              <loading-indicator width="2rem" height="1rem" gap="lg" />
            </template>
            <template #finished>
              <span class="finished">
                <i18n :k="LocalesKey.LIST_NO_MORE_DATA" />
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

  .articles-page {
    .articles-list-header {
      $height: 3.2rem;
      $close-button-width: 3.6rem;

      display: flex;
      height: $height;
      line-height: $height;
      margin-left: -$gap;
      margin-right: -$gap;
      margin-top: -$gap;
      margin-bottom: $gap;
      text-align: center;
      background-color: $module-bg-darker-1;

      .close {
        flex-shrink: 0;
        width: $close-button-width;
      }

      .content {
        flex-grow: 1;
        padding-left: $close-button-width;
        font-weight: bold;
        @include mix.text-overflow();
      }
    }

    .articles-list-skeleton {
      margin: 0;
      padding: 0;
      list-style: none;

      .item {
        background-color: $module-bg;
        @include mix.radius-box($radius-sm);
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }

        .thumbnail {
          height: 7rem;
          padding: $gap-sm;

          .skeleton {
            width: 100%;
            height: 100%;
          }
        }

        .content {
          padding: $gap-sm;
          padding-top: 0;

          .title {
            width: 10rem;
            height: 1.9rem;
          }

          .line {
            width: 86%;
            margin-top: $gap-sm;
            height: 1rem;
          }
        }
      }
    }

    .articles-list-content {
      .list-item {
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .articles-list-loadmore {
      margin-top: $gap-lg;
      margin-bottom: $gap-sm;
      color: $color-text-disabled;

      .normal {
        width: 100%;
        font-size: $font-size-h2;
      }

      .finished {
        color: $color-text-divider;
        font-weight: bold;
      }
    }
  }
</style>
