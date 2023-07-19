<script lang="ts" setup>
  import { Article } from '/@/interfaces/article'
  import { getArticleDetailRoute } from '/@/transforms/route'
  defineProps<{
    prev: Article | null
    next: Article | null
  }>()
</script>

<template>
  <div class="neighbour">
    <router-link v-if="prev" class="link prev" :title="prev.title" :to="getArticleDetailRoute(prev.id)">
      <div class="icon">
        <i class="iconfont icon-prev"></i>
      </div>
      <div class="content">
        <p class="title">{{ prev.title }}</p>
        <p class="description">{{ prev.description }}</p>
      </div>
    </router-link>
    <div v-else class="null">
      <i18n zh="已是最早" en="NULL" />
    </div>
    <router-link v-if="next" class="link next" :title="next.title" :to="getArticleDetailRoute(next.id)">
      <div class="content">
        <p class="title">{{ next.title }}</p>
        <p class="description">{{ next.description }}</p>
      </div>
      <div class="icon">
        <i class="iconfont icon-next"></i>
      </div>
    </router-link>
    <div v-else class="null">
      <i18n zh="已是最新" en="NULL" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .neighbour {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $gap;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;

    .link,
    .null {
      display: flex;
      position: relative;
      overflow: hidden;
      @include radius-box($sm-radius);
    }

    .null {
      justify-content: center;
      align-items: center;
      background-color: $module-bg;
      color: $text-divider;
      cursor: no-drop;
    }

    .link {
      @include common-bg-module();
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

      &.prev {
        justify-content: flex-start;
        .icon {
          border-right-width: 1px;
        }
      }
      &.next {
        justify-content: space-between;
        .icon {
          border-left-width: 1px;
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 100%;
        color: $text-secondary;
        border-style: solid;
        border-color: $module-bg-darker-1;
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
  }
</style>
