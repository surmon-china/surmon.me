<style lang="scss">
  .article {

    .detail, .metas, .related, .comment {
      padding: 1em;
      margin-bottom: 1em;
      background-color: white;
    }

    .detail {

      .title {
        text-align: center;
        margin: .5em 0 1em 0;
      }

      .content {

        p {
          line-height: 1.8em;
          text-indent: 2em;
          margin-bottom: 1em;
        }

        h3 {
          margin: 1em 0;
          padding-left: 0;
          color: #666;
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }
      }
    }

    .metas {
    }
  }
</style>

<template>
  <div class="article">
    <div class="detail">
      <h4 class="title">{{ article.title }}</h4>
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
          content: `<p>经常在微博上看到很多内容使用的什么长微博截图，并且截图上还附加了很多其他的信息。之前对纯前端截图有些研究，正好本博客有这个需求，今天就把这东西实现了下。</p><p>需要声明的是，JavaScript 目前还不能实现网页截屏，就算以后能够实现，也一定是浏览器提供了相关接口，JS去调用这些接口。既然不能截屏，那我们能做的只有通过拿到像素点的信息来”拼凑”图片。</p><h3 id="h3-0">先说说我们看到的截屏方式</h3><p>用过 phantomJS的同学都知道，它提供了一个截屏函数，通过它可以整屏获取页面截图，而且他支持的格式也比较多：JPG/PNG/GIF/PDF。通过简单的两句命令就可以把一个网页截取下来：</p><blockquote><p>// render.js<br><span class="codeHighLightTag">var</span> webPage = require<span class="codeHighLightSign">(</span>‘webpage’<span class="codeHighLightSign">)</span>;<br><span class="codeHighLightTag">var</span> page = webPage.create<span class="codeHighLightSign">(</span><span class="codeHighLightSign">)</span>;<br>page.viewportSize = <span class="codeHighLightSign">{</span> width: 1920<span class="codeHighLightSign">,</span> height: 1080 <span class="codeHighLightSign">}</span>;<br>`,
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
