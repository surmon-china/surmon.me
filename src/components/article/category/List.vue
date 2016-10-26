<template>
  <div class="index">
    <article-list :articles="articles"></article-list>
  </div>
</template>

<script>

  // 组件
  import ArticleList from '../list/List.vue'

  // 模块配置
  export default {
    name: 'category-article-list',
    components: {
      ArticleList
    },
    data () {
      let article = {
        id: 1,
        title: 'JS 原型继承和类式继承',
        thumb: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/11/20120815211519_LZsce.thumb_.600_0.jpeg&h=118&w=180&q=100&zc=1',
        description: '前言 一个多月前，卤煮读了一篇翻译过来的外国人写的技术博客。此君在博客中将js中的类（构造）继承和原型继承做了一些比较，并且得出了结论：建议诸位在开发是用原型继承。文中提到了各种原型继承的优点，详细的露珠不一一说明介绍了。这篇文章的名字是为什么原型继承很重要，有兴趣的同学可以去看，此文有些深度，值得反复阅读。今天这篇文章也来谈谈js中的继承方式以及它们的优缺点。 类式继承（构造函数） ',
        date: '2016-10-10',
        meta: {
          views: 100,
          comments: 20,
        },
        tag: [{ name: 'vue.js' }, { name: 'Angular.js' }, { name: 'webpack' }],
        category: [{ name: 'code' }]
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
    }
  }
</script>
