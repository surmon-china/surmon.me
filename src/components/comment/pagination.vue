<template>
  <transition name="module">
    <div v-if="!fetching && pagination.total_page > 1" class="pagination">
      <ul class="pagination-list">
        <li class="item" v-if="!isHotSort">
          <span class="pagination-btn prev disabled">
            <span>—</span>
            <span v-i18n="LANGUAGE_KEYS.COMMENT_PAGENATION_OLD" />
          </span>
        </li>
        <li v-for="(item, index) in pagination.total_page" :key="index" class="item">
          <button
            class="pagination-btn"
            :class="{
              actived: isActivePage(item),
              disabled: isActivePage(item)
            }"
            @click="handlePage(item)"
          >
            {{ item }}
          </button>
        </li>
        <li class="item" v-if="!isHotSort">
          <span class="pagination-btn next disabled">
            <span v-i18n="LANGUAGE_KEYS.COMMENT_PAGENATION_NEW" />
            <span>—</span>
          </span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { SortType, CommentPostType } from '/@/constants/state'
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
        required: true
      }
    },
    setup(props, context) {
      const isHotSort = computed(() => props.sort === SortType.Hot)
      const isActivePage = (index: number) => {
        return isHotSort.value
          ? index === props.pagination.current_page
          : index === props.pagination.total_page + 1 - props.pagination.current_page
      }

      const handlePage = (page: number) => {
        if (!isActivePage(page)) {
          context.emit(CommentEvent.Page,
            isHotSort.value
              ? page
              : props.pagination.total_page + 1 - page
          )
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
  @import 'src/assets/styles/init.scss';

  .pagination {
    margin-bottom: $lg-gap;

    > .pagination-list {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      list-style-type: none;

      > .item {
        margin: 0 0.5em;

        > .pagination-btn {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          display: inline-block;
          line-height: 2rem;
          text-align: center;
          @include background-transition();

          &.prev,
          &.next {
            width: 5em;
            font-size: $font-size-h6;

            &:hover {
              background: none;
            }
          }

          &.disabled {
            cursor: no-drop;
            opacity: .5;
          }

          &.actived,
          &:hover {
            background-color: $module-bg-hover;
          }
        }
      }
    }
  }
</style>
