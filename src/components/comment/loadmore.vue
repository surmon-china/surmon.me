<script lang="ts" setup>
  import { LocalesKey } from '/@/locales'
  import { Pagination } from '/@/interfaces/pagination'
  import { COMMENT_FOOTER_ELEMENT_ID } from '/@/constants/element-anchor'

  const props = defineProps<{
    fetching: boolean
    pagination: Pagination | null
    hasMore: boolean
  }>()

  const emit = defineEmits<{
    (e: 'loadmore'): void
  }>()
</script>

<template>
  <div class="loadmore" :id="COMMENT_FOOTER_ELEMENT_ID">
    <loading-indicator class="loading" v-if="fetching" />
    <button class="button" v-else-if="hasMore" @click="emit('loadmore')">
      <i18n zh="加载更多评论" en="loadmore comments" />
      <i class="iconfont icon-loadmore"></i>
    </button>
    <span class="finished" v-else>
      <i18n :k="LocalesKey.LIST_NO_MORE_DATA" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $button-size: 2.2rem;

  .loadmore {
    margin-top: $gap;
    margin-bottom: $gap-sm;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading {
      height: $button-size;
    }

    .button {
      position: relative;
      min-width: 10rem;
      height: $button-size;
      padding: 0 $gap;
      border-radius: $radius-sm;
      background-color: $module-bg-darker-1;
      color: $color-text-disabled;
      &:hover {
        color: $color-link;
        background-color: $module-bg-hover;
      }

      .iconfont {
        margin-left: $gap-xs;
      }
    }

    .finished {
      color: $color-text-disabled;
    }
  }
</style>
