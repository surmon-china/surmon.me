<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="metas">
        <skeleton-paragraph
          :align="true"
          :lines="4"
          line-height="1.2em"
        />
      </div>
    </template>
    <template #default>
      <div class="metas">
        <p class="item">
          <i18n>
            <template #en>
              <span>Article created at</span>
              <span>&nbsp;</span>
              <router-link
                :title="getDateTitle(article.create_at)"
                :to="getDateLink(article.create_at)"
              >
                <span>{{ getDateTitle(article.create_at) }}</span>
              </router-link>
              <span>&nbsp;in category&nbsp;</span>
              <router-link
                v-for="(category, index) in article.category"
                :key="index"
                :to="`/category/${category.slug}`"
                :title="category.description || category.name"
              >
                <span>{{ category.slug }}</span>
                <span v-if="article.category.length && article.category[index + 1]">、</span>
              </router-link>
              <span v-if="!article.category.length">no catgory</span>
              <span>,&nbsp;&nbsp;</span>
              <span>{{ article.meta.views || 0 }}</span>
              <span>&nbsp;Views</span>
            </template>
            <template #zh>
              <span>本文于</span>
              <span>&nbsp;</span>
              <router-link :title="getDateTitle(article.create_at)" :to="getDateLink(article.create_at)">
                <span>{{ getDateTitle(article.create_at) }}</span>
              </router-link>
              <span>&nbsp;发布在&nbsp;</span>
              <span v-for="(category, index) in article.category" :key="index">
                <router-link
                  :to="`/category/${category.slug}`"
                  :title="category.description || category.name"
                >
                  <i18n :zh="category.name" :en="category.slug" />
                </router-link>
                <span v-if="article.category.length && article.category[index + 1]">、</span>
              </span>
              <span v-if="!article.category.length">未知</span>
              <span>&nbsp;分类下，当前已被围观&nbsp;</span>
              <span>{{ article.meta.views || 0 }}</span>
              <span>&nbsp;次</span>
            </template>
          </i18n>
        </p>
        <p class="item">
          <i18n>
            <template #zh>
              <span class="title en">Related tags:</span>
            </template>
            <template #zh>
              <span class="title zh">相关标签：</span>
            </template>
          </i18n>
          <placeholder :data="article.tag.length">
            <template #placeholder>
              <span v-i18n="$i18n.text.tag.empty"></span>
            </template>
            <template #default>
              <span v-for="(tag, index) in article.tag" :key="index">
                <router-link
                  :to="getTagArchiveRoute(tag.slug)"
                  :title="tag.description || tag.name"
                >
                  <i18n :zh="tag.name" :en="tag.slug" />
                </router-link>
                <span v-if="article.tag.length && article.tag[index + 1]">
                  <i18n zn="、" en="," />
                </span>
              </span>
            </template>
          </placeholder>
        </p>
        <p class="item">
          <i18n>
            <template #zh>
              <span class="title en">Article address:</span>
            </template>
            <template #zh>
              <span class="title zh">永久地址：</span>
            </template>
          </i18n>
          <span
            class="site-url"
            @click="copyArticleUrl"
          >{{ articleUrl }}</span>
        </p>
        <div class="item">
          <i18n>
            <template #zh>
              <span class="title zh">版权声明：</span>
              <span>自由转载-署名-非商业性使用</span>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <a
                target="_blank"
                rel="external nofollow noopenter"
                href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
              >署名 - 非商业性使用</a>
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
  import { useRouter, useRoute } from 'vue-router'
  import { useEnhancer } from '/@/enhancer'
  import { copy } from '/@/utils/clipboard'
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
      const { isMobile, globalState } = useEnhancer()
      const articleUrl = computed(
        () => getPageUrl(getArticleDetailRoute(props.article.id))
      )

      const copyArticleUrl = () => {
        if (articleUrl.value) {
          copy(articleUrl.value)
        }
      }

      const getDateTitle = (date) => {
        if (!date) {
          return date
        }

        date = new Date(date)
        const am = this.isEnLang ? 'AM' : '上午'
        const pm = this.isEnLang ? 'PM' : '下午'
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const meridiem = date.getHours() > 11 ? pm : am
        return `${year}/${month}/${day} ${meridiem}`
      }

      const getDateLink = (date) => {
        if (!date) {
          return date
        }
        date = new Date(date)
        const year = date.getFullYear()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()
        month = month.length === 1 ? `0${month}` : month
        day = day.length === 1 ? `0${day}` : day
        return `/date/${year}-${month}-${day}`
      }

      return {
        isMobile,
        articleUrl,
        copyArticleUrl,
        getDateTitle,
        getDateLink,
        getTagArchiveRoute
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
          color: $link-hover-color;
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
