<template>
  <transition name="module">
    <div v-if="!fetching && pagination && pagination.total_page > 1" class="pagination">
      <ul class="pagination-list">
        <li class="item prev">
          <span class="symbol">-</span>
          <i18n
            :lkey="
              isHotSort
                ? LANGUAGE_KEYS.COMMENT_PAGINATION_HOT
                : LANGUAGE_KEYS.COMMENT_PAGINATION_OLD
            "
          />
        </li>
        <li v-for="(item, index) in pagination.total_page" :key="index" class="item">
          <button
            @click="handlePage(item)"
            class="pagination-btn"
            :class="{
              actived: isActivePage(item),
              disabled: isActivePage(item)
            }"
          >
            {{ item }}
          </button>
        </li>
        <li class="item next">
          <i18n
            :lkey="
              isHotSort
                ? LANGUAGE_KEYS.COMMENT_PAGINATION_COOL
                : LANGUAGE_KEYS.COMMENT_PAGINATION_NEW
            "
          />
          <span class="symbol">-</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { SortType } from '/@/constants/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { CommentEvent } from './helper'

  export default defineComponent({
    name: 'CommentPagination',
    props: {
      fetching: {
        type: Boolean,
        required: true
      },
      sort: {
        type: Number as PropType<SortType>,
        required: true
      },
      pagination: {
        type: Object,
        required: false
      }
    },
    setup(props, context) {
      const isHotSort = computed(() => props.sort === SortType.Hot)
      const isActivePage = (index: number) => {
        return isHotSort.value
          ? index === props.pagination?.current_page
          : index === props.pagination?.total_page + 1 - props.pagination?.current_page
      }

      const handlePage = (page: number) => {
        if (!isActivePage(page)) {
          if (props.pagination) {
            context.emit(
              CommentEvent.Page,
              isHotSort.value ? page : props.pagination.total_page + 1 - page
            )
          }
        }
      }

      return {
        LANGUAGE_KEYS,
        isHotSort,
        isActivePage,
        handlePage
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .pagination {
    margin-top: $lg-gap;

    > .pagination-list {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      list-style-type: none;

      > .item {
        $item-size: 2rem;
        margin: 0 0.5em;

        &.prev,
        &.next {
          display: inline-block;
          width: 4em;
          height: $item-size;
          line-height: $item-size;
          font-size: $font-size-small;
          text-align: center;
          color: $text-disabled;

          .symbol {
            margin: 0 $xs-gap;
          }

          &:hover {
            background: none;
          }
        }

        .pagination-btn {
          display: inline-block;
          width: $item-size;
          height: $item-size;
          line-height: $item-size;
          text-align: center;
          @include radius-box($mini-radius);
          @include background-transition();

          &.disabled {
            cursor: no-drop;
            opacity: 0.5;
          }

          &.actived,
          &:hover {
            background-color: $module-bg-darker-1;
          }
        }
      }
    }
  }
</style>
