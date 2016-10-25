<template>
  <div class="articles">

    <!-- 列表头 -->
    <div class="article-list-header" v-if="['tag', 'date', 'category'].includes($route.name)">
      <list-header></list-header>
    </div>

    <!-- 列表 -->
    <div class="article-list">
      <list-item v-for="(item, index) in articles.data" :item="item" :key="index"></list-item>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore" @click="addArticle">加载更多</button>
    </div>
  </div>
</template>

<script>

  // import
  import ListItem from './Item.vue'
  import ListHeader from './Header.vue'

  // export
  export default {
    name: 'article-list',
    components: {
      ListItem,
      ListHeader
    },
    props: {
      articles: {
        type: Object,
        default: {}
      }
    },
    methods: {
      addArticle() {
        this.$emit('loadmore')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  .articles {

    .article-list-header {
      margin-bottom: 1em;
      position: relative;
      overflow: hidden;
      background-color: $module-bg;
    }

    .article-list {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;
    }

    .article-load {

      .btn-loadmore {
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
