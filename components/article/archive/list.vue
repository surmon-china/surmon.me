<template>
  <div class="articles">

    <!-- 列表头 -->
    <div class="article-list-header" v-if="!Object.is($route.name, 'index')">
      <list-header></list-header>
    </div>

    <!-- 列表 -->
    <div class="article-list">
      <loading-box class="article-loading" v-if="articles.fetching"></loading-box>
      <empty-box v-if="!articles.fetching && !articles.data.result.data.length">
        <slot>暂无数据</slot>
      </empty-box>
      <transition-group name="fade" tag="div">
        <list-item v-for="(item, index) in articles.data.result.data" :item="item" :key="index"></list-item>
      </transition-group>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore" @click="$emit('loadmore')" :disabled="articles.fetching || !canLoadMore">
        <span v-if="!articles.fetching && canLoadMore">加载更多</span>
        <span v-if="articles.fetching && canLoadMore">加载中</span>
        <span v-if="!canLoadMore">没有更多</span>
      </button>
    </div>
  </div>
</template>

<script>
  import ListItem from './item.vue'
  import ListHeader from './header.vue'

  export default {
    name: 'article-list',
    components: {
      ListItem,
      ListHeader
    },
    props: {
      articles: {
        type: Object,
        default: {
          data: {
            result: {
              data: []
            }
          }
        }
      }
    },
    computed: {
      canLoadMore() {
        const { current_page, total_page } = this.articles.data.result.pagination
        const hasArticles = this.articles.data.result.pagination
        return hasArticles ? (current_page < total_page) : false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  .articles {

    > .article-list-header {
      margin-bottom: 1em;
      position: relative;
      overflow: hidden;
      background-color: $module-bg;
    }

    > .article-list {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;

      > .article-loading {
        height: 10em;
        background-color: $module-bg;
        display: flex;
      }

      > .article-errmsg {
        height: 10em;
        line-height: 10em;
        background-color: $module-bg;
        text-align: center;
        color: rgba(0, 0, 0, 0.38);
      }
    }

    > .article-load {

      > .btn-loadmore {
        width: 100%;
        display: block;
        height: 3em;
        line-height: 3em;
        background-color: $module-bg;

        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
</style>
