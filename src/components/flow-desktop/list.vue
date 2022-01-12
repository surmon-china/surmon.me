<template>
  <div class="articles" :class="{ dark: isDarkTheme }">
    <!-- list -->
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
                  <skeleton-paragraph :lines="4" />
                </div>
              </div>
            </li>
          </ul>
        </template>
        <template #placeholder>
          <empty class="empty" :i18n-key="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
        </template>
        <template #default>
          <div key="list">
            <!-- list-mammon -->
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

    <!-- loadmore -->
    <div class="article-load">
      <button
        class="loadmore-button"
        :disabled="fetching || !isLoadMoreEnabled"
        @click="handleLoadmore"
      >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <div class="text" :class="{ en: !isZhLang }">
          <i18n v-if="fetching" :lkey="LANGUAGE_KEYS.ARTICLE_LIST_LOADING" />
          <i18n v-else-if="isLoadMoreEnabled" :lkey="LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE" />
          <i18n v-else :lkey="LANGUAGE_KEYS.ARTICLE_LIST_NO_MORE" />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Article } from '/@/store/article'
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
      pagination: Object,
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
      const { isZhLang, isDarkTheme } = useEnhancer()
      const isLoadMoreEnabled = computed(() => {
        return props.pagination
          ? props.pagination.current_page < props.pagination.total_page
          : false
      })

      const handleLoadmore = () => {
        context.emit(Events.Loadmore)
      }

      return {
        LANGUAGE_KEYS,
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
  @import 'src/styles/init.scss';

  .articles {
    .article-list-skeleton {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;

      .item {
        display: flex;
        height: 10rem;
        padding: $sm-gap;
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
            height: 1.4em;
            width: 36%;
          }
          .description {
            margin-top: $sm-gap;
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
      overflow: hidden;
      z-index: $z-index-normal;
      @include radius-box($sm-radius);

      .loadmore-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: $button-block-height;
        line-height: $button-block-height;
        padding-left: $gap * 2;
        color: $text-reversal;
        @include common-bg-module($transition-time-fast);

        &[disabled] {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          .iconfont {
            color: rgba($red, 0.8);
          }
          .text {
            background: rgba($red, 0.8);
          }
        }

        .iconfont {
          color: $text-secondary;
          @include color-transition();
        }

        .text {
          position: relative;
          height: $button-block-height;
          padding: 0 ($gap * 2) 0 ($gap * 3);
          background: rgba($red, 0.6);
          font-family: 'webfont-bolder', DINRegular;
          text-transform: uppercase;
          color: $white;
          &.en {
            font-weight: bold;
          }

          &::before {
            $size: 1rem;
            content: '';
            display: block;
            position: absolute;
            width: $size;
            height: 200%;
            top: -50%;
            left: -#{math.div($size, 2)};
            background: $body-bg;
            transform: rotate(18deg);
          }
        }
      }
    }

    &.dark {
      .article-load {
        .loadmore-button {
          .text {
            &::before {
              background: $module-bg-darker-1 !important;
            }
          }
        }
      }
    }
  }
</style>
