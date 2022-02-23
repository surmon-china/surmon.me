<template>
  <div class="articles">
    <!-- header -->
    <div class="header" v-if="tagSlug || categorySlug || date || searchKeyword">
      <div class="content">
        <i18n v-if="categorySlug">
          <template #zh>分类 “{{ categorySlug }}” 的过滤结果</template>
          <template #en>Category "{{ categorySlug }}" 's result</template>
        </i18n>
        <i18n v-if="tagSlug">
          <template #zh>标签 “{{ tagSlug }}” 的过滤结果</template>
          <template #en>Tag "{{ tagSlug }}" 's result</template>
        </i18n>
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
    <!-- list -->
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
          <!-- list -->
          <transition-group key="list" name="list-fade" tag="div" class="list">
            <template v-for="(article, index) in articles" :key="index">
              <mammon class="list-item" v-if="article.ad" />
              <list-item :article="article" class="list-item" v-else />
            </template>
          </transition-group>
          <!-- loadmore -->
          <div class="loadmore">
            <button
              class="button"
              :disabled="articleListStore.list.fetching || !hasMoreArticles"
              @click="loadmoreArticles"
            >
              <div class="text">
                <i18n v-if="articleListStore.list.fetching" :k="LanguageKey.ARTICLE_LIST_LOADING" />
                <i18n v-else-if="hasMoreArticles" :k="LanguageKey.ARTICLE_LIST_LOADMORE" />
                <i18n v-else :k="LanguageKey.ARTICLE_LIST_NO_MORE" />
              </div>
              <span class="icon" v-if="hasMoreArticles">
                <i class="iconfont icon-loadmore"></i>
              </span>
            </button>
          </div>
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
  import { useMetaStore } from '/@/stores/meta'
  import { firstUpperCase } from '/@/transforms/text'
  import { nextScreen } from '/@/utils/effects'
  import ListItem from './item.vue'
  import Mammon from './mammon.vue'

  export default defineComponent({
    name: 'MobileFlowArticleList',
    components: {
      ListItem,
      Mammon
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
      const metaStore = useMetaStore()
      const articleListStore = useArticleListStore()

      type ArticleItem = Article & { ad?: true }
      const articles = computed<Array<ArticleItem>>(() => {
        const list: ArticleItem[] = [...articleListStore.list.data]
        if (list.length < 5) {
          return list
        } else {
          list.splice(5, 0, { ad: true } as ArticleItem)
          return list
        }
      })

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
          description: metaStore.appOptions.data?.description,
          keywords: metaStore.appOptions.data?.keywords.join(',')
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
          page: articleListStore.list.pagination.current_page + 1
        })
        onClient(nextScreen)
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
        articles,
        articleListStore,
        hasMoreArticles,
        loadmoreArticles
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

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

    .loadmore {
      .button {
        width: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: $text-disabled;

        .text {
          margin-bottom: $xs-gap;
          padding-bottom: 3px;
          border-bottom: 1px solid $text-divider;
        }

        .icon {
          font-size: $font-size-h1;
        }
      }
    }
  }
</style>
