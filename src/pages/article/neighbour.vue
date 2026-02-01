<script lang="ts" setup>
  import { Article } from '/@/interfaces/article'
  import { getArticleDetailRoute } from '/@/transforms/route'
  defineProps<{
    prev: Article | null
    next: Article | null
    plain?: boolean
  }>()
</script>

<template>
  <div class="neighbour" :class="{ plain }">
    <router-link v-if="prev" class="link prev" :title="prev.title" :to="getArticleDetailRoute(prev.id)">
      <div class="icon">
        <i class="iconfont icon-prev"></i>
      </div>
      <div class="content">
        <p class="title">{{ prev.title }}</p>
        <p class="summary">{{ prev.summary }}</p>
      </div>
    </router-link>
    <div v-else class="null">
      <i18n zh="已是最早" en="NULL" />
    </div>
    <router-link v-if="next" class="link next" :title="next.title" :to="getArticleDetailRoute(next.id)">
      <div class="content">
        <p class="title">{{ next.title }}</p>
        <p class="summary">{{ next.summary }}</p>
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .neighbour {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $gap;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;

    &.plain {
      .link {
        .icon {
          width: 2rem;
        }

        .content {
          padding: $gap-xs $gap-sm;
        }
      }
    }

    .link,
    .null {
      display: flex;
      position: relative;
      @include mix.radius-box($radius-sm);
    }

    .null {
      justify-content: center;
      align-items: center;
      background-color: $module-bg;
      color: $color-text-divider;
      cursor: no-drop;
    }

    .link {
      @include mix.common-bg-module();
      &:hover {
        .icon {
          color: $color-text;
        }
        .content {
          .title {
            color: $color-link;
          }
          .summary {
            color: $color-text-secondary;
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
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.4rem;
        height: 100%;
        color: $color-text-secondary;
        border-style: solid;
        border-color: $module-bg-darker-1;
        transition: all $motion-duration-fast;
      }

      .content {
        flex: 1;
        overflow: hidden;
        padding: $gap-xs $gap;

        .title,
        .summary {
          display: block;
          width: 100%;
          transition: color $motion-duration-fast;
          @include mix.text-overflow();
        }

        .title {
          margin-top: 0;
          margin-bottom: $gap-tiny;
          font-weight: bold;
          color: $color-text;
        }

        .summary {
          margin-bottom: 0;
          font-size: $font-size-tertiary;
          color: $color-text-disabled;
        }
      }
    }
  }
</style>
