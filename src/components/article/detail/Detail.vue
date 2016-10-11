<style lang="stylus">
  .article

    .detail, .metas, .related, .comment
      background-color white
      margin-bottom 1em

    .detail

      .title
        text-align center
</style>

<template>
  <div class="article">
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="content" v-html="article.content"></div>
    </div>
    <div class="metas">
      这里是一些文章的相关信息
    </div>
    <div class="related">
      <ul class="article-lists">
        <li class="item" v-for="item in [1,2,3,4,5]">这里是相关文章</li>
      </ul>
    </div>
    <div class="comment">
      这里是文章的评论
    </div>
  </div>
</template>

<script>

  // 服务
  // import ArticleService from '../../../services/ArticleService.js'

  export default {

    // 模块名称
    name: 'article-detail',

    // 声明 props 获取数据
    // props: {
    //   article: Object
    // },

    data() {
      return {
        article: {
          title: 'JS 原型继承和类式继承',
          thumb: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/2329141422-0.jpg&h=180&w=300&q=90&zc=1',
          description: '前言 一个多月前，卤煮读了一篇翻译过来的外国人写的技术博客。此君在博客中将js中的类（构造）继承和原型继承做了一些比较，并且得出了结论：建议诸位在开发是用原型继承。文中提到了各种原型继承的优点，详细的露珠不一一说明介绍了。这篇文章的名字是为什么原型继承很重要，有兴趣的同学可以去看，此文有些深度，值得反复阅读。今天这篇文章也来谈谈js中的继承方式以及它们的优缺点。 类式继承（构造函数） ',
          content: '我是文章内容',
          date: '2016-10-10',
          meta: {
            views: 100,
            comments: 20,
          },
          tag: ['tag1', 'tag2'],
          category: [{ name: '分类1' }, { name: '分类1' }, { name: '分类1' }]
        }
      }
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
      }
    }
  }
</script>
