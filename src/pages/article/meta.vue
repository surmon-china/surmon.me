<template>
  <div class="meta" :class="{ plain }">
    <div class="item">
      <span class="icon">
        <i class="iconfont icon-clock"></i>
      </span>
      <span class="content">
        <i18n zh="本文于 " en="Created at " />
        <router-link
          class="date-link"
          :title="getDateTitle(article.create_at)"
          :to="getDateLink(article.create_at)"
        >
          {{ getDateTitle(article.create_at) }}
        </router-link>
        <i18n zh="发布在 " en="in category " />
        <span class="category-link" v-for="(category, index) in article.category" :key="index">
          <router-link
            :to="getCategoryFlowRoute(category.slug)"
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
        <divider type="vertical" />
        <span class="views">{{ article.meta.views }}</span>
        <i18n zh="次阅读" en="views" />
      </span>
    </div>
    <div class="item">
      <span class="icon">
        <i class="iconfont icon-tag"></i>
      </span>
      <span class="content">
        <span class="title">
          <i18n zh="相关标签：" en="Related tags:" />
        </span>
        <span class="tag-link" v-for="(tag, index) in article.tag" :key="index">
          <router-link :to="getTagFlowRoute(tag.slug)" :title="tag.description || tag.name">
            <i18n :zh="tag.name" :en="tag.slug" />
          </router-link>
          <span v-if="article.tag[index + 1]">
            <i18n zh="、" en="," />
          </span>
        </span>
      </span>
    </div>
    <div class="item">
      <span class="icon">
        <i class="iconfont icon-link"></i>
      </span>
      <span class="content">
        <span class="title">
          <i18n zh="永久地址：" en="Article URL:" />
        </span>
        <span class="site-url" @click="copy(articleURL)">
          {{ articleURL }}
        </span>
      </span>
    </div>
    <div class="item">
      <span class="icon">
        <i class="iconfont icon-copyright"></i>
      </span>
      <span class="content">
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
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article } from '/@/store/article'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { copy } from '/@/utils/clipboard'
  import { humanizeYMD, dateToYMD } from '/@/transforms/moment'
  import { getPageURL } from '/@/transforms/url'
  import {
    getArticleDetailRoute,
    getTagFlowRoute,
    getCategoryFlowRoute,
    getDateFlowRoute
  } from '/@/transforms/route'

  export default defineComponent({
    name: 'ArticleMeta',
    props: {
      article: {
        type: Object as PropType<Article>,
        required: true
      },
      plain: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { i18n } = useEnhancer()
      const articleURL = computed(() => getPageURL(getArticleDetailRoute(props.article.id)))

      const getDateTitle = (date: string) => {
        return humanizeYMD(date, i18n.language.value as Language)
      }

      const getDateLink = (date: string) => {
        return getDateFlowRoute(dateToYMD(new Date(date)))
      }

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        articleURL,
        copy,
        getDateTitle,
        getDateLink,
        getTagFlowRoute,
        getCategoryFlowRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

  .meta {
    padding: $gap;

    &.plain {
      .item {
        height: auto;
        padding: 0;
        border: none;

        .icon {
          display: none;
        }
      }
    }

    .item {
      $size: 2rem;
      height: $size;
      line-height: $size;
      margin-bottom: $lg-gap;
      &:last-child {
        margin: 0;
      }

      .icon {
        opacity: 0.5;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        margin-right: $gap;
        border-left: 4px solid $module-bg-darker-3;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
        color: $text-dividers;
        background-color: $module-bg-darker-1;
      }

      a {
        border-bottom: 1px solid transparent;
        &:hover {
          text-decoration: none;
          border-color: initial;
        }
      }

      .views {
        font-weight: bold;
        margin-right: $xs-gap;
      }

      .date-link,
      .tag-link {
        margin-right: $xs-gap;
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
  }
</style>
