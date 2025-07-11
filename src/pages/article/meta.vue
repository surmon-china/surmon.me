<script lang="ts" setup>
  import { computed } from 'vue'
  import { Article } from '/@/interfaces/article'
  import { getTagEnName } from '/@/stores/tag'
  import { copy } from '/@/utils/clipboard'
  import { firstUpperCase } from '/@/transforms/text'
  import { dateToYMD } from '/@/transforms/moment'
  import { getPageURL } from '/@/transforms/url'
  import {
    getArticleDetailRoute,
    getCategoryFlowRoute,
    getTagFlowRoute,
    getDateFlowRoute
  } from '/@/transforms/route'

  const props = defineProps<{
    article: Article
    plain?: boolean
  }>()

  const articleURL = computed(() => {
    return getPageURL(getArticleDetailRoute(props.article.id))
  })
</script>

<template>
  <div class="meta" :class="{ plain }">
    <div class="actions">
      <slot name="action"></slot>
    </div>
    <div class="line">
      <i18n zh="本文于" en="Published at" />
      <router-link
        class="link date"
        :title="article.created_at"
        :to="getDateFlowRoute(dateToYMD(new Date(article.created_at)))"
      >
        <udate to="YMDm" :date="article.created_at" separator="/" />
      </router-link>
      <i18n zh="发布在" en="in" />
      <span v-for="(category, index) in article.categories" :key="index">
        <router-link
          class="link category"
          :title="`${firstUpperCase(category.slug)} | ${category.description}`"
          :to="getCategoryFlowRoute(category.slug)"
        >
          <i18n :zh="category.name" :en="firstUpperCase(category.slug)" />
        </router-link>
        <span v-if="article.categories[index + 1]">
          <i18n zh="、" en="," />
        </span>
      </span>
      <span v-if="!article.categories.length">
        <i18n zh="未知分类下" en="(no catgory)" />
      </span>
      <template v-if="plain"><br /></template>
      <template v-else><divider type="vertical" size="sm" /></template>
      <span v-for="(tag, index) in article.tags" :key="index">
        <router-link
          class="link tag"
          :title="`${getTagEnName(tag)} | ${tag.description}`"
          :to="getTagFlowRoute(tag.slug)"
        >
          <i18n :zh="`#${tag.name}`" :en="`#${getTagEnName(tag)}`" />
        </router-link>
        <span v-if="article.tags[index + 1]">
          <i18n zh="、" en="," />
        </span>
      </span>
    </div>
    <div class="line">
      <i class="icon iconfont icon-creative-commons"></i>
      <i18n>
        <template #zh>
          <ulink class="link copyright" href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans">
            署名 - 非商业性使用 4.0 国际
          </ulink>
        </template>
        <template #en>
          <ulink class="link copyright" href="https://creativecommons.org/licenses/by-nc/4.0/deed.en">
            Creative Commons BY-NC 4.0
          </ulink>
        </template>
      </i18n>
      <template v-if="plain"><br /></template>
      <template v-else><divider type="vertical" /></template>
      <span class="link permalink" @click="copy(articleURL)">
        {{ articleURL }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .meta {
    position: relative;
    padding: 2rem;
    text-align: center;
    &.plain {
      .line {
        height: auto;
        line-height: 2;
      }
    }

    .actions {
      margin-top: $gap-sm;
      margin-bottom: 2rem;
    }

    .line {
      $size: 2rem;
      height: $size;
      line-height: $size;
      margin-bottom: $gap-lg;
      font-weight: bold;
      color: $color-text-secondary;
      &:last-child {
        margin: 0;
      }

      .icon {
        font-weight: normal;
        font-size: $font-size-h6;
      }

      .link {
        &:hover {
          @include mix.text-underline();
        }

        &.date,
        &.category,
        &.tag {
          margin: 0 $gap-xs;
          color: $color-text;
          &:hover {
            color: $color-link-hover;
          }
        }

        &.date {
          text-transform: uppercase;
        }

        &.copyright,
        &.permalink {
          color: $color-text-secondary;
          &:hover {
            color: $color-text;
          }
        }

        &.permalink {
          @include mix.text-underline();
          cursor: pointer;
        }
      }
    }
  }
</style>
