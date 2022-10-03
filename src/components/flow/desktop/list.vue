<template>
  <div class="articles">
    <div class="article-list">
      <placeholder :data="articles.length" :loading="!articles.length && fetching">
        <template #loading>
          <ul class="article-list-skeleton" key="skeleton">
            <li v-for="item in 6" :key="item" class="item">
              <div class="thumb">
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
          <empty class="empty" :i18n-key="LanguageKey.ARTICLE_PLACEHOLDER" />
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
            <transition-group name="list-fade">
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
    <button class="article-load" :disabled="fetching || !isLoadMoreEnabled" @click="handleLoadmore">
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
            <i18n v-if="fetching" :k="LanguageKey.ARTICLE_LIST_LOADING" />
            <i18n v-else-if="isLoadMoreEnabled" :k="LanguageKey.ARTICLE_LIST_LOADMORE" />
            <i18n v-else :k="LanguageKey.ARTICLE_LIST_NO_MORE" />
          </span>
          <i class="iconfont icon-loadmore"></i>
        </span>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Pagination } from '/@/constants/state'
  import { Article } from '/@/stores/article'
  import { LanguageKey } from '/@/language'
  import ListItem from './item.vue'

  export enum Events {
    Loadmore = 'loadmore'
  }

  export default defineComponent({
    name: 'FlowArticleList',
    components: {
      ListItem
    },
    props: {
      articles: {
        type: Array as PropType<Article[]>,
        required: true
      },
      pagination: {
        type: Object as PropType<Pagination | null>,
        default: null
      },
      fetching: {
        type: Boolean,
        required: true
      },
      mammon: {
        type: Boolean,
        default: true
      }
    },
    emits: [Events.Loadmore],
    setup(props, context) {
      const { isDarkTheme, isZhLang } = useEnhancer()
      const isLoadMoreEnabled = computed(() => {
        return props.pagination
          ? props.pagination.current_page < props.pagination.total_page
          : false
      })

      const handleLoadmore = () => {
        context.emit(Events.Loadmore)
      }

      return {
        LanguageKey,
        isZhLang,
        isDarkTheme,
        isLoadMoreEnabled,
        handleLoadmore
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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
        margin-bottom: $lg-gap;
        @include common-bg-module();
        @include radius-box($sm-radius);
        &:last-child {
          margin-bottom: 0;
        }

        .thumb {
          height: 100%;
          width: 15rem;
        }

        .content {
          margin-left: $lg-gap;
          flex-grow: 1;

          .title {
            height: 1.5em;
            width: 36%;
          }
          .description {
            .line-item {
              width: 100%;
              height: $lg-gap;
              margin-top: $sm-gap;
            }
          }
          .meta {
            width: 68%;
            height: $lg-gap;
            margin-top: $lg-gap;
          }
        }
      }
    }

    .article-list-mammon {
      width: 100%;
      min-height: 10rem;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      @include common-bg-module();
      @include radius-box($sm-radius);

      &::v-deep(.mammon-ins) {
        margin: $xs-gap 0;
        height: 100px;
      }
    }

    .article-list {
      margin-bottom: $lg-gap;
      min-height: $lg-gap;
      overflow: hidden;

      .empty {
        height: $gap * 10;
        font-size: $font-size-h4;
        font-weight: bold;
        @include common-bg-module();
        @include radius-box($sm-radius);
      }

      .list-item {
        margin-bottom: $lg-gap;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .article-load {
      width: 100%;
      height: $button-block-height;
      position: relative;
      display: block;
      @include radius-box($sm-radius);
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
          @include color-transition();
        }

        .left {
          font-weight: bold;
          color: $text-disabled;
          margin-left: 2em;
        }

        .right {
          width: 10rem;
          color: $text-disabled;
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
          border-radius: $xs-radius;
          @include background-transition();
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
