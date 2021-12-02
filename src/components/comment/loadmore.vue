<template>
  <transition name="module">
    <div
      class="loadmore"
      v-if="
        !fetching &&
        pagination?.total_page > 1 &&
        pagination?.current_page !== pagination?.total_page
      "
    >
      <button class="button" @click="handleLoadmore">
        <i18n :lkey="LANGUAGE_KEYS.COMMENT_LOADMORE" />
        <i class="iconfont icon-loadmore"></i>
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { CommentEvent } from './helper'

  export default defineComponent({
    name: 'CommentPagination',
    props: {
      fetching: {
        type: Boolean,
        required: true
      },
      pagination: {
        type: Object,
        required: false
      }
    },
    setup(props, context) {
      const handleLoadmore = () => {
        if (props.pagination) {
          context.emit(CommentEvent.Page, props.pagination.current_page + 1)
        }
      }

      return {
        LANGUAGE_KEYS,
        handleLoadmore
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .loadmore {
    margin: $lg-gap 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
      height: 2em;
      padding: 0 $lg-gap;
      border-radius: $xs-radius;
      background-color: $module-bg-darker-1;
      color: $text-disabled;
      text-transform: capitalize;
      &:hover {
        color: $link-color;
        background-color: $module-bg-hover;
      }

      .iconfont {
        margin-left: $sm-gap;
      }
    }
  }
</style>
