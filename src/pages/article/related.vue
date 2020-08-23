<template>
  <div class="related" :class="{ mobile: isMobile }">
    <placeholder
      :loading="fetching"
      :data="!!articles.length"
    >
      <template #loading>
        <skeleton-paragraph
          v-if="isMobile"
          class="skeleton"
          :lines="4"
          line-height="1em"
        />
        <ul class="skeleton-list" v-else>
          <skeleton-base
            class="article"
            v-for="item in 4"
            :key="item"
          />
        </ul>
      </template>
      <template #default>
        <ul class="articles" key="articles">
          <li
            v-for="(article, index) in articles"
            :class="{ disabled: article.disabled }"
            :key="index"
            class="item"
          >
            <router-link
              class="item-article"
              :title="article.title"
              :to="getArticleDetailRoute(article.id)"
            >
              <responsive>
                <template #desktop>
                  <div
                    class="thumb"
                    :style="{
                      backgroundImage: `url(${getRelatedArticleThumb(article.thumb)})`
                    }"
                  />
                  <div class="title">{{ article.title }}</div>
                </template>
                <template #mobile>
                  <span class="title">{{ article.title }} - {{ article.description }}</span>
                </template>
              </responsive>
            </router-link>
          </li>
        </ul>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getArchiveArticleThumbnailUrl } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleRelated',
    props: {
      articles: {
        type: Array as PropType<$TODO[]>,
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup() {
      const { store, globalState, isMobile } = useEnhancer()
      const getRelatedArticleThumb = (thumb: string) => {
        return getArchiveArticleThumbnailUrl(
          thumb,
          globalState.imageExt.isWebP
        )
      }

      return {
        isMobile,
        getArticleDetailRoute,
        getRelatedArticleThumb
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .related {
    overflow: hidden;

    .skeleton-list {
      padding: 0;
      margin: 0;
      height: 9rem;
      overflow: hidden;
      display: flex;

      .article {
        width: 12rem;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .articles {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      margin-bottom: -$gap;

      .item {
        float: left;
        width: calc((100% - #{$gap * 2}) / 3);
        margin-right: $gap;
        margin-bottom: $gap;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: .8;
        }

        &:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 0;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 7.4rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 40%;
            transition: background-position $transition-time-fast * 2;
          }

          .title {
            display: block;
            width: 100%;
            padding: 0 1em;
            line-height: 2.4;
            text-align: center;
            font-size: $font-size-small;
            color: $text-secondary;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          &:hover {
            opacity: 1;

            .thumb {
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
          }
        }
      }
    }

    &.mobile {
      height: auto;

      .articles {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
        opacity: 0.9;

        .item {
          .item-link {
            display: flex;
            width: 100%;
            height: 2.2em;
            line-height: 2.2em;

            .title {
              max-width: 70%;
              display: inline-block;
              @include text-overflow();
            }

            .tip {
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
