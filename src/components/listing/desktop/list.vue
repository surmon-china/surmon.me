<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article } from '/@/interfaces/article'
  import { Pagination } from '/@/interfaces/common'
  import { LocaleKey } from '/@/locales'
  import ListItem from './item.vue'

  enum Events {
    Loadmore = 'loadmore'
  }

  interface Props {
    articles: Article[]
    pagination: Pagination | null
    fetching: boolean
    mammon?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    mammon: true
  })

  const emit = defineEmits<{
    (e: Events.Loadmore): void
  }>()

  const { isDarkTheme, isZhLang } = useEnhancer()
  const hasMoreData = computed(() => {
    if (!props.pagination) return false
    return props.pagination.current_page < props.pagination.total_page
  })

  const handleLoadmore = () => {
    emit(Events.Loadmore)
  }
</script>

<template>
  <div class="articles">
    <div class="article-list">
      <placeholder :data="articles.length" :loading="!articles.length && fetching">
        <template #loading>
          <ul class="article-list-skeleton" key="skeleton">
            <li v-for="item in 6" :key="item" class="item">
              <div class="thumbnail">
                <skeleton-base />
              </div>
              <div class="content">
                <div class="title">
                  <skeleton-line />
                </div>
                <div class="description">
                  <div class="line-item" :key="line" v-for="line in 2">
                    <skeleton-line />
                  </div>
                </div>
                <skeleton-line class="meta" />
              </div>
            </li>
          </ul>
        </template>
        <template #placeholder>
          <empty class="empty" bold size="large" :i18n-key="LocaleKey.ARTICLE_PLACEHOLDER" />
        </template>
        <template #default>
          <div key="list">
            <client-only>
              <template v-if="mammon">
                <Adsense
                  v-if="isDarkTheme"
                  ins-class="mammon-ins"
                  data-ad-format="fluid"
                  data-ad-layout-key="-hj-9+3a-97+6s"
                  data-ad-slot="1765379407"
                  class="article-list-mammon"
                />
                <Adsense
                  v-else
                  ins-class="mammon-ins"
                  data-ad-format="fluid"
                  data-ad-layout-key="-hj-9+3a-97+6s"
                  data-ad-slot="1148538406"
                  class="article-list-mammon"
                />
              </template>
            </client-only>
            <transition-group name="list">
              <list-item
                v-for="articleItem in articles"
                class="list-item"
                :key="articleItem.id"
                :article="articleItem"
              />
            </transition-group>
          </div>
        </template>
      </placeholder>
    </div>
    <button class="article-load" :disabled="fetching || !hasMoreData" @click="handleLoadmore">
      <div class="background">
        <span class="left"></span>
        <span class="right"></span>
      </div>
      <div class="content">
        <span class="left">
          <template v-if="fetching">•••</template>
          <template v-else>{{ articles.length }} / {{ pagination?.total }}</template>
        </span>
        <span class="right">
          <span class="text" :class="{ zh: isZhLang }">
            <i18n v-if="fetching" :k="LocaleKey.ARTICLE_LIST_LOADING" />
            <i18n v-else-if="hasMoreData" :k="LocaleKey.ARTICLE_LIST_LOADMORE" />
            <i18n v-else :k="LocaleKey.LIST_NO_MORE_DATA" />
          </span>
          <i v-if="fetching || hasMoreData" class="iconfont icon-loadmore"></i>
          <i v-else class="iconfont icon-stop"></i>
        </span>
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .articles {
    .article-list-skeleton {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;

      .item {
        display: flex;
        height: 10rem;
        padding: $gap;
        margin-bottom: $gap-lg;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);
        &:last-child {
          margin-bottom: 0;
        }

        .thumbnail {
          height: 100%;
          width: 15rem;
        }

        .content {
          margin-left: $gap-lg;
          flex-grow: 1;

          .title {
            height: 1.5em;
            width: 36%;
          }
          .description {
            .line-item {
              width: 100%;
              height: $gap-lg;
              margin-top: $gap-sm;
            }
          }
          .meta {
            width: 68%;
            height: $gap-lg;
            margin-top: $gap-lg;
          }
        }
      }
    }

    .article-list-mammon {
      width: 100%;
      min-height: 10rem;
      padding: $gap-sm;
      margin-bottom: $gap-lg;
      @include mix.common-bg-module();
      @include mix.radius-box($radius-sm);

      &::v-deep(.mammon-ins) {
        margin: $gap-xs 0;
        height: 100px;
      }
    }

    .article-list {
      margin-bottom: $gap-lg;
      min-height: $gap-lg;
      overflow: hidden;

      .empty {
        height: $gap * 10;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);
      }

      .list-item {
        margin-bottom: $gap-lg;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .article-load {
      width: 100%;
      height: 3.4rem;
      position: relative;
      display: block;
      @include mix.radius-box($radius-sm);
      &[disabled] {
        opacity: 0.6;
      }
      &:not([disabled]):hover {
        .background {
          .left {
            background: $module-bg-opaque;
          }
          .right {
            background: $surmon;
          }
        }
        .content {
          .left {
            color: $primary;
          }
          .right {
            color: $white;
          }
        }
      }

      .content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left,
        .right {
          @include mix.color-transition();
        }

        .left {
          font-weight: bold;
          color: $color-text-disabled;
          margin-left: 2em;
        }

        .right {
          width: 10rem;
          color: $color-text-disabled;
          .text {
            font-weight: bold;
            text-transform: uppercase;
            &:not(.zh) {
              font-size: 95%;
            }
          }
          .iconfont {
            margin-left: $gap;
          }
        }
      }

      .background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: $z-index-normal - 1;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        $skew: -20deg;
        $skew-offset: $gap;

        .left,
        .right {
          height: 100%;
          border-radius: $radius-xs;
          @include mix.background-transition();
        }

        .left {
          flex: 1;
          margin-left: -$skew-offset;
          margin-right: $skew-offset;
          background: $module-bg;
          transform: skew($skew);
        }

        .right {
          width: 12rem;
          margin-right: -$skew-offset;
          background: $module-bg-opaque;
          transform: skew($skew);
        }
      }
    }
  }
</style>
