<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import { Article } from '/@/interfaces/article'
  import ListItem from './list-item.vue'

  const props = defineProps<{
    articles: Article[]
    fetching: boolean
    mammon: boolean
  }>()

  const { theme } = useEnhancer()
</script>

<template>
  <div class="article-list">
    <placeholder :loading="fetching && !articles.length" :has-data="!!articles.length">
      <template #placeholder>
        <empty class="article-list-empty" bold size="large">
          <i18n :k="LocalesKey.ARTICLE_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <ul class="article-list-skeleton">
          <li v-for="item in 6" :key="item" class="item">
            <skeleton class="thumbnail" />
            <div class="content">
              <skeleton class="title" />
              <div class="description">
                <skeleton class="line" :key="i" v-for="i in 2" />
              </div>
              <skeleton class="meta" />
            </div>
          </li>
        </ul>
      </template>
      <template #default>
        <div class="article-list-content">
          <client-only transition v-if="mammon">
            <Adsense
              v-if="theme.isDark.value"
              class="article-list-mammon"
              ins-class="mammon-ins"
              data-ad-format="fluid"
              data-ad-layout-key="-hf-e+4i-9k+38"
              data-ad-slot="1765379407"
            />
            <Adsense
              v-else
              class="article-list-mammon"
              ins-class="mammon-ins"
              data-ad-format="fluid"
              data-ad-layout-key="-hf-e+4i-9k+38"
              data-ad-slot="1148538406"
            />
          </client-only>
          <transition-group name="list">
            <list-item class="article-list-item" v-for="article in articles" :key="article.id" :article="article" />
          </transition-group>
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

  .article-list {
    min-height: 1rem;
    overflow: hidden;

    .article-list-empty {
      height: 8rem;
      @include mix.common-bg-module();
      @include mix.radius-box($radius-sm);
    }

    .article-list-skeleton {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;

      .item {
        display: flex;
        height: 8rem;
        padding: $gap-sm;
        margin-bottom: $gap;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);
        &:last-child {
          margin-bottom: 0;
        }

        .thumbnail {
          height: 100%;
          width: 12rem;
        }

        .content {
          margin-left: $gap;
          flex-grow: 1;

          .title {
            height: 1.4rem;
            width: 36%;
            margin-bottom: $gap-sm;
          }

          .description {
            .line {
              width: 100%;
              height: 0.8rem;
              margin-bottom: $gap-xs;
            }
          }

          .meta {
            width: 68%;
            height: 1rem;
            margin-top: 1.1rem;
          }
        }
      }
    }

    .article-list-mammon {
      width: 100%;
      min-height: 7rem;
      padding: $gap-xs;
      margin-bottom: $gap;
      @include mix.common-bg-module();
      @include mix.radius-box($radius-sm);

      &::v-deep(.mammon-ins) {
        margin: $gap-tiny 0;
        height: 103px;
      }
    }

    .article-list-item {
      margin-bottom: $gap;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
