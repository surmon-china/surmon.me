<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="metas-skeleton" :class="{ mobile: isMobile }">
        <skeleton-paragraph
          :align="true"
          :lines="4"
          line-height="1.2em"
        />
      </div>
    </template>
    <template #default>
      <div class="metas" :class="{ mobile: isMobile }">
        <p class="item">
          <i18n
            zh="本文于 "
            en="Article created at "
          />
          <router-link
            class="date-link"
            :title="getDateTitle(article.create_at)"
            :to="getDateLink(article.create_at)"
          >
            {{ getDateTitle(article.create_at) }}
          </router-link>
          <i18n
            zh="发布在 "
            en="in category "
          />
          <span
            class="category-link"
            v-for="(category, index) in article.category"
            :key="index"
          >
            <router-link
              :to="getCategoryArchiveRoute(category.slug)"
              :title="category.description || category.name"
            >
              <i18n :zh="category.name" :en="category.slug" />
            </router-link>
            <span v-if="article.category[index + 1]">
              <i18n zh="、" en="," />
            </span>
          </span>
          <span v-if="!article.category.length">
            <i18n zh="未知分类下" en="(no catgory)" />
          </span>
          <span class="separator">|</span>
          <i18n>
            <template #zh>当前已被围观 {{ article.meta.views }} 次</template>
            <template #en>{{ article.meta.views }} views.</template>
          </i18n>
        </p>
        <p class="item">
          <span class="title">
            <i18n
              zh="相关标签："
              en="Related tags:"
            />
          </span>
          <span
            class="tag-link"
            v-for="(tag, index) in article.tag"
            :key="index"
          >
            <router-link
              :to="getTagArchiveRoute(tag.slug)"
              :title="tag.description || tag.name"
            >
              <i18n :zh="tag.name" :en="tag.slug" />
            </router-link>
            <span v-if="article.tag[index + 1]">
              <i18n zh="、" en="," />
            </span>
          </span>
        </p>
        <p class="item">
          <span class="title">
            <i18n
              zh="永久地址："
              en="Article address:"
            />
          </span>
          <span class="site-url" @click="copyArticleUrl">
            {{ articleUrl }}
          </span>
        </p>
        <div class="item">
          <i18n>
            <template #zh>
              <span class="title">版权声明：</span>
              <ulink href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh">
                自由转载 - 署名 - 非商业性使用
              </ulink>
            </template>
            <template #en>
              <span class="title">Copyright clarify:</span>
              <ulink href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.en">
                Creative Commons BY-NC 3.0 CN
              </ulink>
            </template>
          </i18n>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { copy } from '/@/utils/clipboard'
  import { humanizeYMD, dateToYMD } from '/@/transforms/moment'
  import { getPageUrl } from '/@/transforms/url'
  import {
    getArticleDetailRoute,
    getTagArchiveRoute,
    getCategoryArchiveRoute,
    getDateArchiveRoute
  } from '/@/transforms/route'

  export default defineComponent({
    name: 'ArticleMeta',
    props: {
      article: {
        type: Object,
        default: null
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const { i18n, isMobile, globalState } = useEnhancer()
      const articleUrl = computed(() => getPageUrl(
        getArticleDetailRoute(props.article?.id)
      ))

      const getDateTitle = (date: string) => {
        return humanizeYMD(date, i18n.language.value as Language)
      }

      const getDateLink = (date: string) => {
        return getDateArchiveRoute(dateToYMD(new Date(date)))
      }

      const copyArticleUrl = () => {
        if (articleUrl.value) {
          copy(articleUrl.value)
        }
      }

      return {
        LANGUAGE_KEYS,
        isMobile,
        articleUrl,
        copyArticleUrl,
        getDateTitle,
        getDateLink,
        getTagArchiveRoute,
        getCategoryArchiveRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .metas,
  .metas-skeleton {
    padding: $gap;
  }

  .metas {
    > .item {
      margin-bottom: $lg-gap;
      line-height: 1.4em;
      word-break: break-all;
      padding-left: $gap;
      border-left: 6px solid $module-bg-darker-1;

      &:last-child {
        margin: 0;
      }

      a {
        border-bottom: 1px solid transparent;
        &:hover {
          text-decoration: none;
          border-color: initial;
        }
      }

      .date-link,
      .tag-link {
        margin-right: $sm-gap / 2;
      }

      .separator {
        margin: 0 $sm-gap;
      }

      .date-link {
        text-transform: uppercase;
      }

      .category-link,
      .tag-link {
        text-transform: capitalize;
      }

      .title {
        margin-right: $sm-gap;
      }

      .site-url {
        border-bottom: 1px solid;
        cursor: pointer;
        color: $link-color;
        &:hover {
          color: $link-color-hover;
        }
      }
    }

    &.mobile {
      line-height: 2.3em;

      > .item {
        margin: 0;
        padding: 0;
        border: none;

        > .title.en {
          width: auto;
          margin-right: $gap;
        }
      }
    }
  }
</style>
