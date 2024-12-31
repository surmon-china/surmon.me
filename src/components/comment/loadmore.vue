<script lang="ts" setup>
  import { computed } from 'vue'
  import { LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { Pagination } from '/@/interfaces/common'
  import { GAEventCategories } from '/@/constants/gtag'
  import { COMMENT_FOOTER_ELEMENT_ID } from '/@/constants/anchor'
  import { CommentEvents } from './helper'

  const props = defineProps<{
    fetching: boolean
    remain?: number
    pagination: Pagination | null
  }>()

  const emit = defineEmits<{
    (e: CommentEvents.Page, page: number): void
  }>()

  const { gtag } = useEnhancer()
  const hasMore = computed(() => {
    return (
      props.pagination &&
      props.pagination?.total_page > 1 &&
      props.pagination?.current_page !== props.pagination?.total_page
    )
  })

  const handleLoadmore = () => {
    if (props.pagination) {
      emit(CommentEvents.Page, props.pagination.current_page + 1)
      gtag?.event('loadmore', {
        event_category: GAEventCategories.Comment
      })
    }
  }
</script>

<template>
  <div class="loadmore" :id="COMMENT_FOOTER_ELEMENT_ID">
    <loading-indicator class="loading" v-if="fetching" width="2rem" height="1.2rem" gap="0.8rem" />
    <button class="button" v-else-if="hasMore" @click="handleLoadmore">
      <i class="iconfont icon-loadmore"></i>
      <i18n>
        <template #zh>加载更多（{{ remain }} 条）评论</template>
        <template #en>Loadmore (remain of {{ remain }} comments)</template>
      </i18n>
    </button>
    <span class="finished" v-else>
      <i18n :k="LanguageKey.LIST_NO_MORE_DATA" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .loadmore {
    margin-top: $gap-lg;
    margin-bottom: $gap-sm;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading {
      margin: $gap-sm 0;
    }

    .button {
      position: relative;
      min-width: 10rem;
      height: 2.8rem;
      padding: 0 $gap-lg;
      border-radius: $radius-xs;
      background-color: $module-bg-darker-1;
      color: $color-text-disabled;
      &:hover {
        color: $color-link;
        background-color: $module-bg-hover;
      }

      .iconfont {
        margin-right: $gap-sm;
      }
    }

    .finished {
      color: $color-text-disabled;
    }
  }
</style>
