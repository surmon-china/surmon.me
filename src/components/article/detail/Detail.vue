<template>
  <div class="article">
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="content" v-html="article.content"></div>
    </div>
    <div class="metas">
      <span>本文由 Surmon 于 </span>
      <router-link to="/" class="navbar-link">2015年-12月-30日</router-link>
      <span>发布在 [</span>
      <router-link to="/" class="navbar-link">Code</router-link>
      <span> ] 分类下，当前已被围观 1,012 次</span>
      <span>相关标签：</span>
      <router-link to="/" class="navbar-link">AnjularJS</router-link>
      <router-link to="/" class="navbar-link">Javascript</router-link>
      <router-link to="/" class="navbar-link">Vue.js</router-link>
      <span>原文链接 ：</span>
      <router-link to="/" class="navbar-link">http://surmon.me/861.html</router-link>
    </div>
    <div class="related">
      <ul class="article-lists">
        <li class="item" v-for="item in [1,2,3,4,5]">这里是相关文章</li>
      </ul>
    </div>
    <div class="comment">
      <duoshuo data-thread-key="article" data-title="我是文章详情"></duoshuo>
    </div>
  </div>
</template>

<script>

  import hljs from 'highlight.js'
  import 'highlight.js/styles/agate.css'

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
          title: 'Javascript DI！Angular依赖注入的实现原理',
          thumb: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/2329141422-0.jpg&h=180&w=300&q=90&zc=1',
          description: '前言 一个多月前，卤煮读了一篇翻译过来的外国人写的技术博客。此君在博客中将js中的类（构造）继承和原型继承做了一些比较，并且得出了结论：建议诸位在开发是用原型继承。文中提到了各种原型继承的优点，详细的露珠不一一说明介绍了。这篇文章的名字是为什么原型继承很重要，有兴趣的同学可以去看，此文有些深度，值得反复阅读。今天这篇文章也来谈谈js中的继承方式以及它们的优缺点。 类式继承（构造函数） ',
          content: `<p>DI是Angular的特色功能，而在Angular 2.0的计划中，DI将成为一个独立的模块，参见 https://github.com/angular/di.js 这意味着它也有机会被用于nodejs等技术中，其他前端框架也完全有机会使用它。</p>
<h3 id="h3-0">DI简介</h3>
<p>对于后端程序员，特别是java、.NET程序员来说，DI是个无须解释的概念，但是对前端程序员则比较陌生，我只简单的说一下DI的概念，然后分析用JS实现DI的原理，DI原理和优点的深入讲解参见 http://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC</p>
<p>假设你需要某个对象，你有几种选择？</p>
<h4 id="h4-1">方法一、自己创建它。</h4>
<p>这是看起来最简单直观的方法，但这只是看起来很美，因为对象的创建有可能很复杂：需要一系列的参数，可能还需要先这样、再那样的一系列初始化操作，甚至可能还需要创建它的相关对象，相关对象还需要创建相关对象的相关对象……你确定你在写代码而不是择毛线吗？一句话，这种方式无法适应复杂的对象，随着对象的复杂化，自己动手丰衣足食已经不再是好的选择。</p>
<h4 id="h4-2">方法二、使用者从全局注册表查阅它。</h4>
<p>这种方法轻松多了，对象的创建者要自己负责创建自己，然后把自己注册到某个全局注册表中，你需要它的时候，就去注册表中根据名字或者其它的独有信息（比如强类型语言中的类名）查询：obj = globalRegistry.get(objectId)。显然，轻松多了，再也不用管它的初始化参数和初始化流程了，拿来就用。那么，问题在哪里？问题在于它很难被单元测试。我们都知道，全局变量是单元测试中的魔鬼，因为它会让各个“单元”互相耦合在一起，那将是单元测试的噩梦。而globalRegistry就是一个全局变量，并且连累着其中的对象也都变成全局的了。更重要的是：你还不够懒。</p>
<h4 id="h4-3">方法三、衣来伸手，饭来张口。</h4>
<p>这就是所谓DI了。也就是说，我只要指出我需要哪些对象，然后就有人会把这个对象给我，而这个“人”可能是一个应用框架（Framework），也可能是测试容器（Test Runner），我不会关心它是谁，也不用关心它怎么得到的这个对象。这个“人”，专业的说法叫“容器”，下面我会说到这个容器在Angular中对应哪个概念。</p>
<p>而我指出“我需要哪些对象”的方式，也有多种，比如可以直接声明一个属性，或者写个Annotation，或者写个配置文件来声明依赖关系，或者在函数的参数中声明，目前angular所采用的方式是函数的参数形式，和一种变形的Annotation形式来防止minify破坏名称，据说angular 2.0会使用新的语言特性强化annotation的方式。</p>
<h3 id="h3-4">JavaScript中实现DI的原理</h3>
<p>在JavaScript中实现DI，看起来难，实际上原理很简单，它的核心技术是Function对象的toString()。我们都知道，对一个函数对象执行toString()，它的返回值是函数的源码，知道了这一点，接下来就简单的：我获取了函数源码，然后我对函数的声明进行解析，伪码如下：</p>
<pre>
  <code class="javascript" lang="javascript">
    var giveMe = function(config) {
    };
    var registry = {};
    var inject = function(func, thisForFunc) {
    // 获取源码
    var source = func.toString();
    // 用正则表达式解析源码
    var matcher = source.match(/..表达式有些复杂，省略../);
    // 解析结果是各个参数的名称
    var objectIds = ….
    // 查阅出相应的对象，放到数组中准备作为参数传过去
    var objects = [];
    for (var i = 0; i < objectIds.length; ++i)
    objects.push(registry[objectIds[i]]);
    // 调用这个函数，并且把参数传过去
    func.apply(thisForFunc || func, objects)
    };
    inject(giveMe)
  </code>
</pre>
<p>当然，一个实际的DI系统需要考虑的问题比这要多很多，但是这段代码用来表现原理应该足够了。</p>
<h3 id="h3-5">Angular中的DI</h3>
<p>接下来我们再来看Angular中的DI实现：</p>
<p>在Angular中，所有主要编程元素都需要通过某种方式注册进去，比如myModule.service(‘serviceName’, function()….这实际上就是把后面这个函数加入到一个容器中，要注意的是：angular全面实现了延迟初始化，也就是说，当这个对象没有被别人需要的时候，它是不会被创建的，这样对于提高性能有一定的帮助，特别是加快了启动速度。</p>
<p>这里一个有趣的问题是：Angular的容器是什么。Angular不存在真正的全局对象，所以你可以放心的在同一个页面中放多个app，而不用担心他们互相干扰，但是容器又需要一个众所周知的地方来存放这些“名字和对象”的注册表（Registry），在Angular中，这个注册表就叫做module，所以，现在你应该知道为什么module的地位很重要了吧？不过一个app中可以存在很多不同名字的module，它们之间存在某些依赖关系，而这体现在module的声明语法中：angular.module(‘someModule’, [‘dep1’, ‘dep2])，这样划分module有利于程序的文件组织。</p>
<p>根据DI的原理，一个自然的推论就是：被注入的对象通常都是单例，因为创建了一个，就可以始终使用它了，不需要多次创建。因此，如果你需要在angular中跨controller共享数据或者通讯，那么你可以创建一个service/value/constant等，然后把它们分别注入到两个controller中，而这两个controller将自然而然的共享同一个对象。</p>
<p>（原文：http://www.cnblogs.com/asnowwolf/p/3684700.html）</p>`,
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
    mounted () {
      hljs.initHighlightingOnLoad()
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/mixins';
  @import '../../../sass/variables';
  .article {

    .detail, .metas, .related {
      padding: 1em 2em;
      margin-bottom: 1em;
      background-color: $module-bg;
    }

    .detail {

      .title {
        text-align: center;
        margin: 1em 0 1.5em 0;
        font-weight: 700;
      }

      .content {

        p {
          line-height: 2.2em;
          text-indent: 2em;
          margin-bottom: 1em;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 1em 0;
          padding-left: 0;
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }

        blockquote {

          p {
            text-indent: 0em;
          }
        }

        pre {}

        code {
          padding: 0;
          padding-top: 1em;
          background-color: rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: visible;

          &:before {
            color: #ffffff;
            content: attr(lang);
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            position: absolute;
            top: -18px;
            left: 0;
            width: 100%;
            font-weight: 700;
            background-color: rgb(68, 68, 68);
            display: block;
            text-transform: uppercase;
            text-align: center;
          }
        }
      }
    }

    .metas {
    }

    .related {
      padding: 1em;

      .article-lists {
        padding: 0;
        margin: 0;
        list-style: none;
      }
    }
  }
</style>
