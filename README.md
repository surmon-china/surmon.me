## Surmon.me

Vue-Blog By Nuxt.js + Vue.js + Vuex + Vue-router + Axios 

[Online Blog](https://surmon.me/)

If you want to run the applaction, you need install the [nodepress](https://github.com/surmon-china/nodepress) service.

## 首页

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/screenshot/index.png)


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

## Todos 更新记录

- ~~新增垃圾回收程序（idle-gc），解决内存溢出问题~~
- ~~增加百度自动push功能~~
- ~~修复多说https处理引起的bug~~
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
- ~~vue2有bug~~
- ~~vue-meta__dangerouslyDisableSanitizers有bug~~
- ~~google统计代码~~
- ~~上线自动部署~~
- ~~全站https~~
- ~~网站地图需要生成一个xml页面~~
- ~~路由meta信息需要定义（1.0版本的中间件来实现）~~
- ~~时间日期裁剪不能以字数决定~~
- ~~文章页标题太小，代码高亮插件取消掉标题~~
- ~~文章评论回调~~
- ~~代码高亮在高亮插件（jsdom+marked）解析的部分，把code的class找到lang给pre~~
- ~~滚动时需要平滑滚动~~
- ~~多数https~~
- ~~同步文章到多说~~
- ~~控制台加个人信息~~
- ~~图片要有hover渐变效果~~
- ~~图片可以在tag解析时，解析图片，给图片绑定事件，导致图片弹窗~~
- ~~相关文章的样式不足一行时是需要优化的~~
- ~~文章引入署名协议，以原创为基准~~
- ~~文章列表页时间不显示了~~

- error.vue不支持自定义布局，1.0改进
- 音乐播放器的实现，也做就做完善的，敬请期待
- movie的单独列表页和详情页

## 目录结构
```
nuxt.js-blog/
   |
   ├──assets/                    * 需经webpack处理的静态资源
   |
   ├──components/                * 所有组件
   │   │
   │   │──common                 * 全局公共组件
   │   │
   │   └──layout                 * 布局组件
   │   │
   │   └──*****                  * 其他复用组件
   │
   │──middleware/                * Nuxt.js中间件，c/s渲染均会在路由改变前执行，需next/返回promise，支持异步
   |
   ├──filters/                   * 过滤器
   │
   ├──layouts/                   * Nuxt.js宿主元素布局模板，默认default，目前不可更改，error为渲染失败时的页面模板，目前不可指定layout属性
   |
   ├──pages/                     * Nuxt.js的页面文件，会根据文件生成路由
   │
   │──plugins/                   * 第三方组件 + 自有js库 + 其他插件性质的脚本
   │
   │──static/                    * 不经编译器处理的静态资源
   │
   │──store/                     * 全局数据状态管理
   │   │
   │   ├──*******                * 各数据模块
   │   │
   │   └──index                  * 根模块（因为异步操作较少，目前仅用来存放actions）
   │
   │──package.json               * 包信息
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──nuxt.config.js             * Nuxt.js程序配置
   │
   │──server.js                  * Nuxt.js程序入口文件（节省内存 + 优化内存）
   │
   │──ecosystem.config           * pm2部署配置（日志文件的路径需要自行修改）
   │
   └──.editorconfig              * 编码风格配置
```
