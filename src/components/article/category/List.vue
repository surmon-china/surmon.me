<template>
  <div class="index">

    <!-- 标签列表 -->
    <category></category>

    <!-- 文章列表 -->
    <article-list :articles="articles"></article-list>

  </div>
</template>

<script>

  // 组件
  import Category from './Category.vue'
  import ArticleList from '../list/List.vue'


  // 模块配置
  export default {
    name: 'index-lists',

    // 依赖组件
    components: {
      Category,
      ArticleList
    },

    data () {
      let article = {
        title: 'JS 原型继承和类式继承',
        thumb: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/2329141422-0.jpg&h=180&w=300&q=90&zc=1',
        description: '前言 一个多月前，卤煮读了一篇翻译过来的外国人写的技术博客。此君在博客中将js中的类（构造）继承和原型继承做了一些比较，并且得出了结论：建议诸位在开发是用原型继承。文中提到了各种原型继承的优点，详细的露珠不一一说明介绍了。这篇文章的名字是为什么原型继承很重要，有兴趣的同学可以去看，此文有些深度，值得反复阅读。今天这篇文章也来谈谈js中的继承方式以及它们的优缺点。 类式继承（构造函数） ',
        date: '2016-10-10',
        meta: {
          views: 100,
          comments: 20,
        },
        tag: ['tag1', 'tag2'],
        category: [{ name: '分类1' }, { name: '分类1' }, { name: '分类1' }]
      }
      return {
        page: 1,
        articles: {
          pagenation: {
            current_page: 1,
            total: 10
          },
          data: [article, article, article, article, article]
        }
      }
    },

    // 创建时
    created () {
      // console.log('首页组件被创建', this)
    },

    // 包含方法
    methods: {
      codeChange(newCode) {
        this.code = newCode
      }
    }
  }

</script>

<style lang="stylus" scoped>
</style>
