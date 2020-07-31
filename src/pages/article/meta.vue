<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="metas" :class="{ mobile: isMobile }">
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
          <i18n>
            <template #zh>本文于 </template>
            <template #en>Article created at </template>
          </i18n>
          <router-link
            :title="getDateTitle(article.create_at)"
            :to="getDateLink(article.create_at)"
          >
            <span>{{ getDateTitle(article.create_at) }}</span>
          </router-link>
          <i18n>
            <template #zh> 发布在 </template>
            <template #en> in category </template>
          </i18n>
          <span v-for="(category, index) in article.category" :key="index">
            <router-link
              :to="getCategoryArchiveRoute(category.slug)"
              :title="category.description || category.name"
            >
              <i18n :zh="category.name" :en="category.slug" />
            </router-link>
            <span v-if="article.category[index + 1]">
              <i18n zn="、" en="," />
            </span>
          </span>
          <span v-if="!article.category.length">
            <i18n zh="未知分类下，" en="(no catgory)," />
          </span>
          <i18n>
            <template #zh>当前已被围观 {{ article.meta.views }}次</template>
            <template #en>{{ article.meta.views }} views.</template>
          </i18n>
        </p>
        <p class="item">
          <i18n>
            <template #zh>
              <span class="title zh">相关标签：</span>
            </template>
            <template #en>
              <span class="title en">Related tags:</span>
            </template>
          </i18n>
          <placeholder :data="article.tag.length">
            <template #placeholder>
              <span v-i18n="LANGUAGE_KEYS.TAG_PLACEHOLDER"></span>
            </template>
            <template #default>
              <span v-for="(tag, index) in article.tag" :key="index">
                <router-link
                  :to="getTagArchiveRoute(tag.slug)"
                  :title="tag.description || tag.name"
                >
                  <i18n :zh="tag.name" :en="tag.slug" />
                </router-link>
                <span v-if="article.tag[index + 1]">
                  <i18n zn="、" en="," />
                </span>
              </span>
            </template>
          </placeholder>
        </p>
        <p class="item">
          <i18n>
            <template #zh>
              <span class="title zh">永久地址：</span>
            </template>
            <template #en>
              <span class="title en">Article address:</span>
            </template>
          </i18n>
          <span class="site-url" @click="copyArticleUrl">
            {{ articleUrl }}
          </span>
        </p>
        <div class="item">
          <i18n>
            <template #zh>
              <span class="title zh">版权声明：</span>
              <a
                target="_blank"
                rel="external nofollow noopenter"
                href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
              >自由转载 - 署名 - 非商业性使用</a>
            </template>
            <template #en>
              <span class="title en">Copyright clarify:</span>
              <a
                target="_blank"
                rel="external nofollow noopenter"
                href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.en"
              >Creative Commons BY-NC 3.0 CN</a>
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
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const { i18n, isMobile, globalState } = useEnhancer()
      const articleUrl = computed(
        () => getPageUrl(getArticleDetailRoute(props.article.id))
      )

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

  .metas {
    padding: $gap;

    > .item {
      margin-bottom: $lg-gap;
      border-left: solid $sm-gap $body-bg;
      padding-left: $gap;
      word-break: break-all;

      &:last-child {
        margin: 0;
      }

      a:hover {
        text-decoration: underline;
      }

      > .title.en {
        width: 11rem;
        display: inline-block;
      }

      .site-url {
        text-decoration: underline;
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
