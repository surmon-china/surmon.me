<template>
  <div class="articles" :class="{ mobile: isMobile }">
    <!-- mammon -->
    <transition name="module">
      <component
        v-if="isMammonEnabled"
        class="article-list-mammon"
        :is="isMobile ? 'adsense-archive-mobile' : 'adsense-archive'"
      />
    </transition>

    <!-- list -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <transition-group
          v-if="article.data.data && article.data.data.length"
          key="list"
          name="fade"
          tag="div"
        >
          <list-item
            v-for="articleItem in article.data.data"
            :key="articleItem.id"
            :article="articleItem"
            @click="handleArticleClick(articleItem)"
          />
        </transition-group>
        <empty v-else key="empty" class="article-empty">
          <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
        </empty>
      </transition>
    </div>

    <!-- loadmore -->
    <div class="article-load">
      <button
        class="loadmore-button"
        :disabled="article.fetching || !isLoadMoreEnabled"
        @click="handleLoadmore"
      >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <div class="text">
          <span
            v-if="article.fetching"
            v-i18n="LANGUAGE_KEYS.ARTICLE_LIST_LOADING"
          />
          <span
            v-else-if="isLoadMoreEnabled"
            v-i18n="LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE"
          />
          <span
            v-else
            v-i18n="LANGUAGE_KEYS.ARTICLE_LIST_NO_MORE"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, PropType } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGlobalState } from '/@/state'
  import { useDefer } from '/@/services/defer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import ListItem from './item.vue'

  export default defineComponent({
    name: 'ArticleList',
    components: {
      ListItem
    },
    props: {
      article: {
        type: Object as PropType<any>,
        required: true
      },
      mammon: {
        type: Boolean,
        default: true
      }
    },
    setup(props, context) {
      const defer = useDefer()
      const router = useRouter()
      const globalState = useGlobalState()
      const mammonEnabled = ref(false)

      const isMobile = computed(() => globalState.userAgent.isMobile)
      const isMammonEnabled = computed(() => props.mammon && mammonEnabled)
      const isLoadMoreEnabled = computed(() => {
        const { current_page, total_page } = props.article.data.pagination
        const hasArticles = props.article.data.pagination
        return hasArticles ? (current_page < total_page) : false
      })

      const handleLoadmore = () => {
        context.emit('loadmore')
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

    &.mobile {
      > .article-list,
      > .article-list-mammon {
        margin-bottom: $gap;
      }

      > .article-list-mammon {
        padding: $gap;

        &::v-deep(.mammon-ins) {
          margin: 0;
          height: 81px;
        }
      }
    }

    > .article-list-mammon {
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      background-color: $module-bg;

      &::v-deep(.mammon-ins) {
        margin: $sm-gap 0;
        height: 100px;
      }
    }

    > .article-list {
      margin-bottom: $lg-gap;
      min-height: $lg-gap;
      overflow: hidden;

      > .article-empty {
        color: $text-disabled;
        @include module-blur-bg();
      }

      > .article-loading {
        display: flex;
        height: $gap * 10;
        @include module-blur-bg();
      }

      > .article-errmsg {
        height: $gap * 10;
        line-height: $gap * 10;
        text-align: center;
        color: rgba(0, 0, 0, 0.38);
        @include module-blur-bg();
      }
    }

    > .article-load {
      overflow: hidden;
      z-index: $z-index-normal;

      > .loadmore-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: $block-button-height;
        line-height: $block-button-height;
        padding-left: $gap * 2;
        color: $text-reversal;
        background-color: $module-bg;
        @include background-transition();

        &[disabled] {
          opacity: .6;
        }

        .iconfont {
          color: $text;
          @include color-transition();
        }

        &:hover {
          background-color: $module-hover-bg;

          .iconfont {
            color: rgba($red, .6);
          }
        }

        > .text {
          position: relative;
          height: $block-button-height;
          padding: 0 ($gap * 2) 0 ($gap * 3);
          font-family: 'webfont-bolder', DINRegular;
          text-transform: uppercase;
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
  }
</style>
