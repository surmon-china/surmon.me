<template>
  <transition name="module">
    <div v-if="!isFetching && comment.pagination.total_page > 1" class="pagination-box">
      <ul v-if="sortMode === constants.SortType.Hot" class="pagination-list">
        <li v-for="(item, index) in comment.pagination.total_page" :key="index" class="item">
          <a
            href
            class="pagination-btn"
            :class="{ 'actived disabled': item === comment.pagination.current_page }"
            @click.stop.prevent="item === comment.pagination.current_page
              ? false 
              : loadComemntList({ page: item })"
          >{{ item }}</a>
        </li>
      </ul>
      <ul v-else class="pagination-list">
        <li class="item">
          <a href class="pagination-btn prev disabled" @click.stop.prevent>
            <span>—</span>
            <span v-text="$i18n.text.comment.pagenation.old" />
          </a>
        </li>
        <li v-for="(item, index) in comment.pagination.total_page" :key="index" class="item">
          <a
            href
            class="pagination-btn"
            :class="{ 'actived disabled': paginationReverseActive(item) }"
            @click.stop.prevent="paginationReverseActive(item)
              ? false 
              : loadComemntList({ page: comment.pagination.total_page + 1 - item })"
          >{{ item }}</a>
        </li>
        <li class="item">
          <a href class="pagination-btn next disabled" @click.stop.prevent>
            <span v-text="$i18n.text.comment.pagenation.new" />
            <span>—</span>
          </a>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  export default defineComponent({
    name: 'CommentPagination',
    props: {},
    setup(props, context) {
      
      // 翻页反向计算
      paginationReverseActive(index) {
        const { pagination } = this.comment
        return index === pagination.total_page + 1 - pagination.current_page
      },
    }
  })
</script>

<style lang="scss" scoped>
  .pagination-box {
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
            background-color: $module-hover-bg;
          }
        }
      }
    }
  }
</style>
