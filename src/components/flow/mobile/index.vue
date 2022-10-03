<template>
  <div class="articles">
    <div class="header" v-if="tagSlug || categorySlug || date || searchKeyword">
      <div class="content">
        <template v-if="categorySlug">
          <i18n v-if="category">
            <template #zh>分类 “{{ category.name }}” 的过滤结果</template>
            <template #en>Category "{{ firstUpperCase(category.slug) }}" 's result</template>
          </i18n>
          <span v-else>{{ categorySlug }}</span>
        </template>
        <template v-if="tagSlug">
          <i18n v-if="tag">
            <template #zh>标签 “{{ tag.name }}” 的过滤结果</template>
            <template #en>Tag "{{ tagEnName(tag) }}" 's result</template>
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
      :data="articles.length"
      :loading="!articles.length && articleListStore.list.fetching"
    >
      <template #loading>
        <ul class="skeletons" key="skeleton">
          <li v-for="item in 3" :key="item" class="item">
            <div class="thumb">
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
        <empty class="empty" :i18n-key="LanguageKey.ARTICLE_PLACEHOLDER" />
      </template>
      <template #default>
        <div>
          <transition-group key="list" name="list-fade" tag="div" class="list">
            <list-item
              class="list-item"
              :article="article"
              :key="index"
              v-for="(article, index) in articles"
            />
          </transition-group>
          <loadmore
            :loading="articleListStore.list.fetching"
            :finished="!hasMoreArticles"
            @loadmore="loadmoreArticles"
          />
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onBeforeMount } from 'vue'
  import { LanguageKey } from '/@/language'
  import { META } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { useArticleListStore, Article } from '/@/stores/article'
  import { useTagStore, tagEnName } from '/@/stores/tag'
  import { useCategoryStore } from '/@/stores/category'
  import { useAppOptionStore } from '/@/stores/basic'
  import { firstUpperCase } from '/@/transforms/text'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import Loadmore from './loadmore.vue'
  import ListItem from './item.vue'

  export default defineComponent({
    name: 'MobileFlowArticleList',
    components: {
      ListItem,
      Loadmore
    },
    props: {
      tagSlug: {
        type: String,
        required: false
      },
      categorySlug: {
        type: String,
        required: false
      },
      searchKeyword: {
        type: String,
        required: false
      },
      date: {
        type: String,
        required: false
      }
    },
    setup(props) {
      const { meta, i18n } = useEnhancer()
      const appOptionStore = useAppOptionStore()
      const tagStore = useTagStore()
      const categoryStore = useCategoryStore()
      const articleListStore = useArticleListStore()
      const category = computed(() => {
        return props.categorySlug
          ? categoryStore.data.find((category) => category.slug === props.categorySlug)!
          : null
      })
      const tag = computed(() => {
        return props.tagSlug ? tagStore.data.find((tag) => tag.slug === props.tagSlug) : null
      })

      const articles = computed<Array<Article>>(() => articleListStore.list.data)
      const hasMoreArticles = computed(() => {
        const pagination = articleListStore.list.pagination
        return pagination ? pagination.current_page < pagination.total_page : false
      })

      meta(() => {
        const titles: string[] = Object.values(props)
          .filter(Boolean)
          .map((prop) => firstUpperCase(prop as string))
        // filter page
        if (titles.length) {
          return {
            pageTitle: titles.join(' | ')
          }
        }
        // index page
        return {
          title: `${META.title} - ${i18n.t(LanguageKey.APP_SLOGAN)}`,
          description: appOptionStore.data?.description,
          keywords: appOptionStore.data?.keywords.join(',')
        }
      })

      const fetchArticles = async (params: any = {}) => {
        await articleListStore.fetchList({
          category_slug: props.categorySlug,
          tag_slug: props.tagSlug,
          date: props.date,
          keyword: props.searchKeyword,
          ...params
        })
      }

      const loadmoreArticles = async () => {
        await fetchArticles({
          page: articleListStore.list.pagination!.current_page + 1
        })
        onClient(scrollToNextScreen)
      }

      onBeforeMount(() => {
        watch(
          () => props,
          () => fetchArticles(),
          { flush: 'post', deep: true }
        )
      })

      useUniversalFetch(() => fetchArticles())

      return {
        LanguageKey,
        tagEnName,
        tag,
        category,
        articles,
        articleListStore,
        hasMoreArticles,
        loadmoreArticles,
        firstUpperCase
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .articles {
    .header {
      $size: 4rem;
      display: flex;
      height: $size;
      line-height: $size;
      margin-left: -$gap;
      margin-right: -$gap;
      margin-top: -$lg-gap;
      margin-bottom: $lg-gap;
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
        @include text-overflow();
      }
    }

    .skeletons {
      padding: 0;
      list-style: none;

      .item {
        background-color: $module-bg;
        @include radius-box($sm-radius);
        margin-bottom: $lg-gap;
        &:last-child {
          margin-bottom: 0;
        }

        .thumb {
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
        margin-bottom: $lg-gap;
      }
    }
  }
</style>
