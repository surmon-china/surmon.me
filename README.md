# vue-blog

> Vue-Blog By Vue2.0 && Vuex

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# serve in production mode
npm start
```

# 单元测试
使用Karma + PhantomJS测试组件（UI、逻辑）
使用coverage生成查看测试覆盖率检查报告


# 文件目录

```
----|build  webpack配置管理
--------|webpack.base.conf.js   Webpack工程的基础配置（可配置：命令 + 入口 + 插件）

----|conf   环境配置管理

----|dist   压缩编译后输出的文件（最终产出文件）
--------|index.html   压缩编译后输出的主页
--------|static       压缩编译后输出的资源文件
--------------|***       包含开发模式的static文件夹
--------------|***       包含webpack自动编译出的静态资源

----|node_modules   依赖的node模块
----|static         开发模式的静态目录

----|test       测试
--------|e2e    端对端测试
--------|unit   单元测试

----|src  开发文件

--------|App.vue        根组件
--------|main.js        程序入口（路由拦截器）
--------|config.vue     全局配置
--------|routes.js      路由

--------|components   组件

---------------|common                公共组件
------------------------|*********    公共组件库

---------------|index                 首页
---------------|layout                结构相关
---------------|article               文章相关
---------------|page                  单独页面

--------|directives   指令
--------|filters      过滤器
--------|sass         Iconfont + 公共scss样式
--------|api          vue-resource 封装的RestFul HTTP服务（请求拦截器）

--------|store        状态管理
---------------|modules               模块
---------------|actions               异步处理（对api资源的操作）
---------------|types                 所有命名
---------------|index                 store入口对象
```
