<template>
  <div class="article">
    文章详情页
    <h3>{{ article.title }}</h3>
    <div v-html="article.content"></div>
  </div>
</template>

<script>

  // 服务
  import ArticleService from '../../../services/ArticleService.js'

  export default {

    // 模块名称
    name: 'ArticleDetail',

    // 声明 props 获取数据
    // props: {
    //   article: Object
    // },

    data () {
      return {
        article: {}
      }
    },

    // 创建前
    init () {
      // console.log('文章详情页组件被初始化')
    },

    // 创建时
    created () {
      // let slug = this.$router._currentRoute.params.article_slug;
      // console.log('文章详情页组件被创建', slug)
    },

    // 编译前
    beforeCompile () {
      // console.log('文章详情页组件编译前')
    },

    // 编译后
    compiled () {
      // console.log('文章详情页组件编译完成')
    },

    // 编译结束和 $el 第一次插入文档之后
    ready () {
      // console.log('文章详情页组件 编译结束和 $el 第一次插入文档之后')
    },

    // Dom属性变更
    attached () {
      let slug = this.$router._currentRoute.params.article_slug;
      console.log('文章详情页组件 重加载', slug)
      this.getArticleDetail({ slug: slug })
      // console.log('文章详情页组件 Dom属性变更（加载）')
    },

    // Dom属性删除
    detached () {
      console.log('文章详情页组件 Dom属性删除（跳出）')
    },

    // 销毁之前
    beforeDestroy () {
      // console.log('文章详情页组件 销毁之前')
    },

    // 销毁时
    destroyed () {
      // console.log('文章详情页组件被销毁')
    },

    // 已编译
    computed: {
    },

    methods: {
      getArticleDetail (params) {
        console.log(params);
        ArticleService.getItem(this, params).then(response => {
          console.log(response)
          let article = response.data;
          if (article.code == 1) this.article = article.result;
          if (article.code == 0) alert(article.message);
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="stylus">

</style>