# surmon.me

> Vue-Blog By Vue2.0 && Vuex && Nuxt.js

## Build Setup

``` bash
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

# 目录结构
```
vue-blog/
   |
   ├──build/                     * webpack构建配置
   │   │
   │   └──webpack.base.conf.js   * Webpack工程的基础配置（可配置：命令 + 入口 + 插件）
   |
   ├──config/                    * webpack构建配置
   |
   ├──dist/                      * 压缩编译后输出的文件（最终产出文件）
   │   │
   │   │──index.html             * 压缩编译后输出的主页
   │   │
   │   └──static                 * 压缩编译后输出的资源文件
   │        │
   │        └──***               * 包含开发模式的static文件夹 + webpack自动编译出的静态资源
   |
   ├──static/                    * 开发模式的静态资源目录
   │
   ├──test/                      * 测试
   │   │
   │   │──e2e                    * 端对端测试
   │   │
   │   └──unit                   * 单元测试
   |
   ├──src/                       * 开发文件
   │   |
   │   ├──App.vue                * 根组件
   │   │
   │   ├──main.js                * 程序入口（路由拦截器）
   │   │
   │   ├──config.js              * 全局配置
   │   │
   │   ├──routes.js              * 路由
   │   │
   │   ├──directives/            * 指令
   │   │
   │   ├──filters/               * 过滤器
   │   │
   │   ├──sass/                  * Iconfont + 公共scss样式 + Mixins +　...
   │   │
   │   ├──api/                   * vue-resource 封装的RestFul HTTP服务（请求拦截器）
   │   │
   │   ├──components/            * 组件
   │   │   │
   │   │   ├──common             * 公共组件
   │   │   │
   │   │   ├──index              * 首页组件
   │   │   │
   │   │   ├──layout             * 页面的菜单/路由
   │   │   │
   │   │   ├──article            * 文章相关
   │   │   │
   │   │   └──page               * 单独页面
   │   │
   │   └──store/                 * 全局数据状态管理
   │       │
   │       ├──modules            * 模块
   │       │
   │       ├──actions            * 异步处理（对api资源的操作）
   │       │
   │       ├──types              * 所有命名
   │       │
   │       ├──article            * store入口对象
   │       │
   │       └──index              * 单独页面
   │
   │──package.json               * what npm uses to manage it's dependencies
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   └──.editorconfig              * 编码风格配置
