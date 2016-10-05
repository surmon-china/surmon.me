<template>
  <div class="index">
    
    <!-- 幻灯 -->
    <carrousel-view></carrousel-view>

    <!-- 文章列表 -->
    <!-- <article-list-view :articles="articles"></article-list-view> -->
    我是首页文章列表
    
  </div>
</template>

<script>

  // 组件
  import Carrousel from './Carrousel.vue'
  // import ArticleList from '../article/List.vue'


  // 模块配置
  export default {
    name: 'index-lists',

    // 依赖组件
    components: {
      carrouselView: Carrousel,
      // ArticleList
    },

    data () {
      return {
        page: 1,
        articles: []
      }
    },

    // 创建时
    created () {
      // console.log('首页组件被创建', this)
    },

    // 包含方法
    methods: {
    },
  }

</script>

<style lang="stylus" scoped>
</style>