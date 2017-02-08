# surmon.me

> Vue-Blog By Nuxt.js

## ajdhaksdh

## qw

## e

## qwe

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

# lint test
$ npm run lint
```

# todos

* ~~默认文章缩略图需要设计为&lt;&gt;图标~~
* fav.ico
* 轮播图幻灯，需要设计的默认缩略图
* ~~文章列表图片需要和七牛端设置配合~~
* 相关文章图片太大，一行调整为5个

* 文章浏览数统计索引

* 标签包含文章数统计索引
* 文章评论回调
* 服务端需要一个转接接口 用于服务project对github的代理访问

* ~~搜索功能~~

* ~~文章详情需要一个过滤器，生成tag内链（貌似做不到）~~
* ~~网站地图页面（用户导航使用的）能折叠展开文章描述、标签、分类、默认只看100条，剩下的点击展开，美化~~
* ~~每个页面隐藏生成多说的评论数据用于SEO~~
* ~~一个message-box组件用于错误处理，且多种文案合并为json，随机展示~~

* 网站地图需要生成一个xml页面

* 路由meta信息需要定义（1.0版本的中间件来实现）
* error.vue不支持自定义布局，1.0改进
* ~~vue2有bug~~
* ~~vue-meta\_\_dangerouslyDisableSanitizers有bug~~

* ~~文章详情页，详情页相关文章，详情页组件和数据整合，代码高亮插件~~

* ~~文章详情页的关键词和描述未能覆盖head~~
* ~~多说功能需要整合且生效~~
* ~~热门文章的接口需要和多说整合~~

* 音乐播放器的实现

* movie的单独列表页和详情页
* ~~多个列表页是否合为一个组件~~

# 目录结构

\`\`\`  
vue-blog/  
   \|  
   ├──build/                     _ webpack构建配置  
   │   │  
   │   └──webpack.base.conf.js   _ Webpack工程的基础配置（可配置：命令 + 入口 + 插件）  
   \|  
   ├──config/                    _ webpack构建配置  
   \|  
   ├──dist/                      _ 压缩编译后输出的文件（最终产出文件）  
   │   │  
   │   │──index.html             _ 压缩编译后输出的主页  
   │   │  
   │   └──static                 _ 压缩编译后输出的资源文件  
   │        │  
   │        └──_\*\*               _ 包含开发模式的static文件夹 + webpack自动编译出的静态资源  
   \|  
   ├──static/                    _ 开发模式的静态资源目录  
   │  
   ├──test/                      _ 测试  
   │   │  
   │   │──e2e                    _ 端对端测试  
   │   │  
   │   └──unit                   _ 单元测试  
   \|  
   ├──src/                       _ 开发文件  
   │   \|  
   │   ├──App.vue                _ 根组件  
   │   │  
   │   ├──main.js                _ 程序入口（路由拦截器）  
   │   │  
   │   ├──config.js              _ 全局配置  
   │   │  
   │   ├──routes.js              _ 路由  
   │   │  
   │   ├──directives/            _ 指令  
   │   │  
   │   ├──filters/               _ 过滤器  
   │   │  
   │   ├──sass/                  _ Iconfont + 公共scss样式 + Mixins +　...  
   │   │  
   │   ├──api/                   _ vue-resource 封装的RestFul HTTP服务（请求拦截器）  
   │   │  
   │   ├──components/            _ 组件  
   │   │   │  
   │   │   ├──common             _ 公共组件  
   │   │   │  
   │   │   ├──index              _ 首页组件  
   │   │   │  
   │   │   ├──layout             _ 页面的菜单/路由  
   │   │   │  
   │   │   ├──article            _ 文章相关  
   │   │   │  
   │   │   └──page               _ 单独页面  
   │   │  
   │   └──store/                 _ 全局数据状态管理  
   │       │  
   │       ├──modules            _ 模块  
   │       │  
   │       ├──actions            _ 异步处理（对api资源的操作）  
   │       │  
   │       ├──types              _ 所有命名  
   │       │  
   │       ├──article            _ store入口对象  
   │       │  
   │       └──index              _ 单独页面  
   │  
   │──package.json               _ what npm uses to manage it's dependencies  
   │  
   │──.eslintrc.js               _ Eslint配置  
   │  
   │──.babelrc                   _ Babel配置  
   │  
   │──.gitignore                 _ Git忽略文件配置  
   │  
   └──.editorconfig              _ 编码风格配置

