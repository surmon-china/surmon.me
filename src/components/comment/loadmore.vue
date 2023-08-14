<script lang="ts" setup>
  import { computed } from 'vue'
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
    <transition name="module">
      <button class="button" v-if="hasMore" :disabled="fetching" @click="handleLoadmore">
        <i18n v-if="fetching" zh="加载中..." en="Loading..." />
        <template v-else>
          <i18n>
            <template #zh>加载更多评论（还有 {{ remain }} 条）</template>
            <template #en>Loadmore (remain of {{ remain }} comments)</template>
          </i18n>
          <i class="iconfont icon-loadmore"></i>
        </template>
      </button>
      <span class="no-more" v-else>
        <i18n zh="水尽山穷" en="NO MORE" />
      </span>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .loadmore {
    margin-top: $lg-gap;
    margin-bottom: $sm-gap;
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
      min-width: 10rem;
      height: 2.8rem;
      padding: 0 $lg-gap;
      border-radius: $xs-radius;
      background-color: $module-bg-darker-1;
      color: $text-disabled;
      &:not([disabled]):hover {
        color: $link-color;
        background-color: $module-bg-hover;
      }

      .iconfont {
        margin-left: $sm-gap;
      }
    }

    .no-more {
      padding-top: $xs-gap;
      color: $text-disabled;
    }
  }
</style>
