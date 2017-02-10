# Surmon.me

> Vue-Blog By Nuxt.js

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project 生成静态html
$ npm run generate

# lint test
$ npm run lint
```

# todos

- ~~默认文章缩略图需要设计为<>图标~~
- ~~fav.ico~~
- ~~轮播图幻灯，需要设计的默认缩略图~~
- ~~文章列表图片需要和七牛端设置配合~~
- ~~相关文章图片太大，一行调整为5个~~
- ~~轮播图取消异步加载？~~
- ~~文章页列表文章白哦提过长会换行~~
- ~~文章浏览数统计索引~~
- ~~列表head中显示查询的结果总数统计~~
- ~~标签包含文章数统计索引~~
- ~~搜索功能~~
- ~~文章详情需要一个过滤器，生成tag内链（貌似做不到）~~
- ~~网站地图页面（用户导航使用的）能折叠展开文章描述、标签、分类、默认只看100条，剩下的点击展开，美化~~
- ~~每个页面隐藏生成多说的评论数据用于SEO~~
- ~~一个message-box组件用于错误处理，且多种文案合并为json，随机展示~~
- ~~about 页面的知乎微博~~
- ~~侧边栏添加知乎链接~~
- ~~多个列表页是否合为一个组件~~
- ~~文章详情页，详情页相关文章，详情页组件和数据整合，代码高亮插件~~
- ~~文章详情页的关键词和描述未能覆盖head~~
- ~~多说功能需要整合且生效~~
- ~~热门文章的接口需要和多说整合~~
- ~~readme完善~~

- ~~服务端需要一个转接接口 用于服务project对github的代理访问~~
- ~~vue2有bug~~
- ~~vue-meta__dangerouslyDisableSanitizers有bug~~

- ~~google统计代码~~
- ~~上线自动部署~~
- ~~全站https~~
- ~~网站地图需要生成一个xml页面~~
- ~~路由meta信息需要定义（1.0版本的中间件来实现）~~
- error.vue不支持自定义布局，1.0改进

- 文章评论回调
- 音乐播放器的实现
- movie的单独列表页和详情页

# 目录结构
```
nuxt.js-blog/
   |
   ├──assets/                    * 经webpack处理的静态资源
   |
   ├──components/                * webpack构建配置
   |
   ├──components/                * 所有组件
   │   │
   │   │──common                 * 全局公共组件
   │   │
   │   └──layout                 * 布局组件
   │   │
   │   └──*****                  * 其他复用组件
   |
   ├──filters/                   * 过滤器
   │
   ├──layouts/                   * Nuxt.js宿主元素布局模板，默认default
   |
   ├──pages/                     * Nuxt.js的页面文件，会根据文件生成路由
   │
   │──plugins/                   * 第三方组件 + 自有js库
   │
   │──static/                    * 不经编译器处理的静态资源
   │
   │──store/                     * 全局数据状态管理
   │   │
   │   ├──*******                * 各数据模块
   │   │
   │   └──index                  * 根模块（actions）
   │
   │──package.json               * what npm uses to manage it's dependencies
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──nuxt.config.js             * Nuxt.js程序配置
   │
   └──.editorconfig              * 编码风格配置
```
