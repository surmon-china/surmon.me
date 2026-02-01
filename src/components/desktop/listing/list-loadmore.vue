<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'

  const emits = defineEmits(['click'])
  const props = defineProps<{
    hasMore: boolean
    fetching: boolean
  }>()

  const { isZhLang } = useEnhancer()
</script>

<template>
  <button class="article-list-loadmore" :disabled="fetching || !hasMore" @click="emits('click')">
    <div class="background">
      <span class="left"></span>
      <span class="right"></span>
    </div>
    <div class="content">
      <span class="left">
        <template v-if="fetching">•••</template>
        <template v-else>
          <slot name="pagination"></slot>
        </template>
      </span>
      <span class="right">
        <span class="text" :class="{ zh: isZhLang }">
          <i18n v-if="fetching" :k="LocalesKey.ARTICLE_LIST_LOADING" />
          <i18n v-else-if="hasMore" :k="LocalesKey.ARTICLE_LIST_LOADMORE" />
          <i18n v-else :k="LocalesKey.LIST_NO_MORE_DATA" />
        </span>
        <i v-if="fetching || hasMore" class="iconfont icon-loadmore"></i>
        <i v-else class="iconfont icon-stop"></i>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .article-list-loadmore {
    width: 100%;
    height: 2.7rem;
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
        margin-left: 2em;
        font-weight: bold;
        color: $color-text-disabled;
      }

      .right {
        width: 9rem;
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
        width: 11rem;
        margin-right: -$skew-offset;
        background: $module-bg-opaque;
        transform: skew($skew);
      }
    }
  }
</style>
