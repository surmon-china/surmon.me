<style lang="stylus" scoped>
</style>

<template>
  <div class="index">

    <!-- 幻灯 -->
    <carrousel-view></carrousel-view>

    <!-- 文章列表 -->
    <article-list-view :articles="articles"></article-list-view>
    
  </div>
</template>

<script>

  // 组件
  import CarrouselView from './CarrouselView.vue'
  import ArticleListView from '../article/ListView.vue'

  // 服务
  import ArticleService from '../../services/ArticleService.js'

  // 模块配置
  export default {

    // 依赖组件
    components: {
      CarrouselView,
      ArticleListView
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
      this.getNewArticles()
    },

    // 包含方法
    methods: {
      getNewArticles () {
        ArticleService.getList(this).then(response => {
          console.log(response)
          let articles = response.data;
          if (articles.code == 1) this.articles = articles.result.data;
          if (articles.code == 0) alert(articles.message);
        }, error => {
          console.log(error)
        })
      }
    },
  }

</script>