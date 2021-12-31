<template>
  <transition name="module">
    <div class="loadmore" :id="COMMENT_FOOTER_ELEMENT_ID">
      <button class="button" :disabled="!hasMore || fetching" @click="handleLoadmore">
        <i18n v-if="fetching" zh="加载中..." en="Loading..." />
        <template v-else-if="hasMore">
          <i18n>
            <template #zh>加载更多评论（剩 {{ remain }} 条）</template>
            <template #en>Loadmore (remain {{ remain }})</template>
          </i18n>
          <i class="iconfont icon-loadmore"></i>
        </template>
        <i18n v-else zh="穷山尽水处" en="NO MORE" />
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  import { COMMENT_FOOTER_ELEMENT_ID } from '/@/constants/anchor'
  import { CommentEvents } from './helper'

  export default defineComponent({
    name: 'CommentPagination',
    props: {
      fetching: {
        type: Boolean,
        required: true
      },
      remain: {
        type: Number,
        required: true
      },
      pagination: {
        type: Object,
        required: false
      }
    },
    setup(props, context) {
      const { gtag } = useEnhancer()
      const hasMore = computed(() => {
        return (
          props.pagination?.total_page > 1 &&
          props.pagination?.current_page !== props.pagination?.total_page
        )
      })

      const handleLoadmore = () => {
        gtag?.event('loadmore', {
          event_category: GAEventCategories.Comment
        })

        if (props.pagination) {
          context.emit(CommentEvents.Page, props.pagination.current_page + 1)
        }
      }

      return {
        COMMENT_FOOTER_ELEMENT_ID,
        hasMore,
        handleLoadmore
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
  }
</style>
