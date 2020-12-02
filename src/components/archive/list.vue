<template>
  <div
    class="articles"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <!-- mammon -->
    <template v-if="isMammonEnabled">
      <client-only transition>
        <adsense-archive-mobile
          v-if="isMobile"
          class="article-list-mammon"
        />
        <adsense-archive
          v-else
          class="article-list-mammon"
        />
      </client-only>
    </template>

    <!-- list -->
    <div class="article-list">
      <placeholder
        :data="articles.length"
        :loading="!articles.length && fetching"
      >
        <template #loading>
          <ul class="article-list-skeleton" key="skeleton">
            <li v-for="item in 5" :key="item" class="item">
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
          <empty
            class="empty"
            :i18n-ley="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"
          />
        </template>
        <template #default>
          <transition-group
            key="list"
            name="list-fade"
            tag="div"
          >
            <list-item
              v-for="articleItem in articles"
              :key="articleItem.id"
              :article="articleItem"
              @click="handleArticleClick(articleItem)"
            />
          </transition-group>
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
        <div class="text">
          <i18n
            v-if="fetching"
            :lkey="LANGUAGE_KEYS.ARTICLE_LIST_LOADING"
          />
          <i18n
            v-else-if="isLoadMoreEnabled"
            :lkey="LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE"
          />
          <i18n
            v-else
            :lkey="LANGUAGE_KEYS.ARTICLE_LIST_NO_MORE"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, PropType } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import AdsenseArchive from '/@/components/adsense/archive.vue'
  import AdsenseArchiveMobile from '/@/components/adsense/archive-mobile.vue'
  import ListItem from './item.vue'

  export enum Events {
    Loadmore = 'loadmore'
  }
  export default defineComponent({
    name: 'ArticleList',
    components: {
      ListItem,
      AdsenseArchive,
      AdsenseArchiveMobile
    },
    props: {
      articles: {
        type: Array as PropType<any[]>,
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
    emits: [
      Events.Loadmore
    ],
    setup(props, context) {
      const { router, defer, isMobile, isDarkTheme } = useEnhancer()
      const mammonEnabled = ref(false)

      const isMammonEnabled = computed(() => props.mammon && mammonEnabled)
      const isLoadMoreEnabled = computed(() => {
        return props.pagination
          ? (props.pagination.current_page < props.pagination.total_page)
          : false
      })

      const handleLoadmore = () => {
        context.emit(Events.Loadmore)
      }

      const handleArticleClick = (article: $TODO) => {
        if (isMobile.value) {
          router.push(getArticleDetailRoute(article.id))
        }
      }

      onMounted(() => {
        defer.addTask(() => {
          mammonEnabled.value = true
        })
      })

      return {
        LANGUAGE_KEYS,
        isMobile,
        isDarkTheme,
        isMammonEnabled,
        isLoadMoreEnabled,
        handleLoadmore,
        handleArticleClick
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .articles {
    .article-list-mammon {
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      @include common-bg-module();
      @include radius-box($sm-radius);

      &::v-deep(.mammon-ins) {
        margin: $xs-gap 0;
        height: 100px;
      }
    }

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

    .article-list {
      margin-bottom: $lg-gap;
      min-height: $lg-gap;
      overflow: hidden;

      .empty {
        height: $gap * 10;
        font-size: $font-size-h4;
        @include common-bg-module();
        @include radius-box($sm-radius);
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
          opacity: .6;
        }

        .iconfont {
          color: $text;
          @include color-transition();
        }

        &:hover {
          .iconfont {
            color: rgba($red, .6);
          }
        }

        > .text {
          position: relative;
          height: $button-block-height;
          padding: 0 ($gap * 2) 0 ($gap * 3);
          font-family: 'webfont-bolder', DINRegular;
          text-transform: uppercase;
          color: $white;
          background: rgba($red, .6);

          &::before {
            $size: 1rem;
            content: '';
            display: block;
            position: absolute;
            width: $size;
            height: 200%;
            top: -50%;
            left: -($size / 2);
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

    &.mobile {
      > .article-list,
      > .article-list-mammon {
        margin-bottom: $gap;
      }

      > .article-list-mammon {
        padding: $sm-gap;

        &::v-deep(.mammon-ins) {
          margin: 0;
          height: 81px;
        }
      }
    }
  }
</style>
