<template>
  <div class="neighbour">
    <div class="item-article prev" :class="{ disabled: !prev }">
      <router-link
        v-if="prev"
        class="link"
        :title="prev.title"
        :to="getArticleDetailRoute(prev.id)"
      >
        <div class="icon">
          <i class="iconfont icon-prev"></i>
        </div>
        <div class="content">
          <p class="title">{{ prev.title }}</p>
          <p class="description">{{ prev.description }}</p>
        </div>
      </router-link>
      <div v-else class="nomore">
        <i18n zh="没有更早的了" en="null" />
      </div>
    </div>
    <div class="item-article next" :class="{ disabled: !next }">
      <router-link
        v-if="next"
        class="link"
        :title="next.title"
        :to="getArticleDetailRoute(next.id)"
      >
        <div class="content">
          <p class="title">{{ next.title }}</p>
          <p class="description">{{ next.description }}</p>
        </div>
        <div class="icon">
          <i class="iconfont icon-next"></i>
        </div>
      </router-link>
      <div v-else class="nomore">
        <i18n zh="没有更多的了" en="null" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Article } from '/@/store/article'
  import { timeAgo } from '/@/transforms/moment'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getMobileArticleListThumbnailURL } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleNeighbour',
    props: {
      prev: Object as PropType<Article | null>,
      next: Object as PropType<Article | null>
    },
    setup(props) {
      const { i18n } = useEnhancer()
      const getTimeAgo = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      return {
        getTimeAgo,
        getMobileArticleListThumbnailURL,
        getArticleDetailRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .neighbour {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $gap;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;

    .item-article {
      display: block;
      position: relative;
      overflow: hidden;
      @include common-bg-module();
      @include radius-box($sm-radius);
      &.disabled {
        opacity: 0.7;
        pointer-events: none;
      }
      &.prev {
        .link {
          justify-content: flex-start;
        }
      }
      &.next {
        .link {
          justify-content: space-between;
        }
      }

      .link {
        display: flex;
        width: 100%;
        height: 100%;

        &:hover {
          .icon {
            color: $text;
          }
          .content {
            .title {
              color: $link-color;
            }
            .description {
              color: $text-secondary;
            }
          }
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 100%;
          color: $text-secondary;
          background-color: $module-bg-lighter;
          transition: all $transition-time-fast;
        }

        .content {
          width: calc(100% - 3rem);
          padding: $sm-gap $gap;

          .title,
          .description {
            display: block;
            width: 100%;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          .title {
            font-size: $font-size-h6;
            margin-top: 0;
            margin-bottom: $xs-gap;
            font-weight: bold;
            color: $text;
          }

          .description {
            margin-bottom: 0;
            font-size: $font-size-small;
            color: $text-disabled;
          }
        }
      }

      .nomore {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: $text-disabled;
      }
    }
  }
</style>
