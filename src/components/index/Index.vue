<style lang="stylus" scoped>
</style>

<template>
  <div class="index">
  我是首页文章列表

    <!-- 幻灯 -->
    <!-- <carrousel-view></carrousel-view> -->

    <!-- 文章列表 -->
    <!-- <article-list-view :articles="articles"></article-list-view> -->
    
  </div>
</template>

<script>

  // 组件
  // import CarrouselView from './CarrouselView.vue'
  // import ArticleListView from '../article/ListView.vue'


  // 模块配置
  export default {
    name: 'index-lists',

    // 依赖组件
    components: {
      // CarrouselView,
      // ArticleListView
    },

    data () {
      return {
        page: 1,
        articles: []
      }
    },

    // 创建时
    created () {
      console.log('首页组件被创建', this)
    },

    // 包含方法
    methods: {
    },
  }

</script>