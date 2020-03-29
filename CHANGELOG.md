
# Changelog
All notable changes to this project will be documented in this file.

### v2.5.8 (2020-03-29)

**Update**
- Upgrade vue-awesome-swiper
- Upgrade `webpack.splitChunks` with `nuxt.config.js`

### v2.5.7 (2020-03-27)

**Update**
- Support i18n wallpaper

### v2.5.6 (2020-03-21)

**Add**
- Add ICP link
- Add font `SFMonoRegular` for code

**Update**
- Auto language by device
- Update README.md badges
- Update workflows config
- Update `code` style
- Upgrade Swiper component & filter styles
- Upgrade TypeScript config
- Upgrade ESlint config
- Upgrade /pc/layout/toolbox component to composition-api

**Removed**
- Removed `normalize.css`
- Removed `node-uuid`
- Removed `keep-alive`

### v2.5.4
- Replace App url to GitHub file URL
- Upgrade GA events

### v2.5.3
- Rplace RSS service with xml (nodepress)

### v2.5.2
- Add RSS service
- Improve About page
- Bugfix Comment editor

### v2.5.0
- TypeScript
- Improve styles
- Improve About page
- Improve emoji-rain component
- Improve relink transformer
- Add QR Code service
- Add MyMap module
- Remove RTC module
- Remove ColorBlock component
- Refactoring Music service
- Refactoring Theme to dark mode

### v2.4.9
- Update FUNDING.yml
- Update README.md
- Add instagram to navbar menu

### v2.4.8
- Improve CDN static
- Upgrade static style
- Update images style
- Add tobots.txt for CDN
- Pause `imageExt`

### v2.4.6
- Improve styles with PC / Mobile
- Improve Vlog page animation
- Improve PC Aside sticky logic
- Improve PC Aside ad control logic
- Improve PC Music and App page height logic
- Improve replace `@include hidden()`
- Remove `@css3-prefix xxx`
- Remove background component

### v2.4.5
- Improve mobile mask logic
- Improve styles with comment

### v2.4.4
- Remove project page
- Improve i18n languages
- Improve sponsor page
- Improve announcement component
- Update styles
- Update ads with banner & About page

### v2.4.3
- Improve sponsor page
- Replace project page to link

### v2.4.2
- Add sponsor page

### v2.4.1
- Update UA transformer
- Update article GA styles

### v2.4.0
- Upgrade dependencies
- Update js file modules
- Update package scripts
- Update logo effect
- Update style variables
- Update modules background
- Update console text and styles
- Add GitHub actions CI

### v2.3.0
- 更新 Nuxt 至 2.8
- 更新 依赖项
- 更新 store 中的 api，在耦合与抽象间保持平衡
- 更新 广告位链接
- 优化 评论相关文案
- 优化 文件组织
- 废弃 同构枚举常量设计
- 废弃 custom webpack loader

### v2.2.3
- 更新 文档
- 优化 首页 Banner 轮播：PC 下不再支持拖拽滚动，H5 下支持图片的直接点击
- 优化 公告模块移动端表现形式

### v2.2.2
- 修复 文章页切换卡死 Bug
- 升级 PC 侧边栏广告位为 Alimama

### v2.2.1
- 优化 广告位 class，防止被 Block
- 更新 广告
- 更新 App 下载页相关内容
- 增加 Banner 广告
- 移除 无用文件

### v2.2.0
- 升级 依赖
- 优化 壁纸业务
- 优化 弹窗样式细节
- 修正 文案
- 修正 播放器容错

### 2.1.4
- 增加 懒加载功能（暂用于文章详情页和 vlog 列表页）
- 修复 marked 不支持中文 id 的问题
- 修复 wallpaper humanizeUrl 问题
- 修复 评论列表中的懒加载元素不生效的问题

### 2.1.2
- 升级 Nuxt 至 2.4.0
- 优化 module
- 增加 搜索关键词联想
- 增加 新的 icon 彩蛋

### 2.1.0
- 优化 Store 设计
- 优化 Comment 业务模块逻辑
- 优化 编码风格
- 优化 markdown 解析器
- 优化 结构组织
- 优化 category、tag 在 i18n 下的表现
- 优化 Swiper 在 SPA 下缺陷
- 增加 Vlog 业务模块
- 增加 骨架屏代替 loading

### v2.0.0
- 优化 同构常量逻辑
- 优化 广告渲染与细节
- 优化 鼠标展示效果
- 优化 文案细节
- 升级 Update Nuxt to 2
- 遗弃部分冗余插件
- 规范编码风格
- 增加壁纸功能
- 优化开发时正向代理服务
- 优化组件结构
- 重新抽象一些方法
- 增加埋点数据
- 更新配色细节和规格
- 增加歌词功能
- 优化布局细节

### v1.2.6
- 修复 APP 下载地址
- 更新服务页文案
- 优化菜单按钮
- 更新 iconfont 图标

### v1.2.5
- Update Nuxt to v1.4.2
- Update Vue vue-server-renderer vue-template-compiler to 2.5.17
- 修复评论文案错别字
- 增加 Logo 光影效果
- 增加 Header 水波纹

### v1.2.4
- 优化 大部分背景层更新为渐变设计

### v1.2.2
- 更新 iconfont
- 更新 文案细节及地理地图
- 优化 站点地图里的描述解析
- 优化 暂时关闭背景动画

### v1.2.1
- 更新文案
- 增加友链
- 增加「 社会主义核心价值观 」功能

### v1.2.0
- 改进在开发模式下，主题变量失效无法预览的问题
- 增加性能模式开关，低配模式，关闭背景动画，禁用或删除rtc，关闭自动播放
- 人脸识别库的加载周期延后在打开 WebRtc 美颜开关时
- 在文章列表、详情页增加来源类型标志（转载、原创、混合）
- 使用自行开发的 i18n 模块完成 i18n 的适配

### v1.1.0
- app下载按钮的位置,下载按钮背景颜色改为模块背景色半透明，文件不能放在服务器，太慢了，和移动端下载页需要适配
- http://music.163.com/#/playlist?id=638949385
- 修复了播放器
- 升级了 Nuxt，且使用了 offline-plugin 实现离线应用
- 增加弹幕功能
- 优化宽屏阅读功能
- 优化播放器
- 优化移动端样式
- 评论 233333 试试
- 优化包依赖的问题
- 增加基于 WebRTC 的在线视频功能
- 新增 C++ 版本的 TURN Server
- 增加人脸识别功能
- 增加了一个叫美颜的功能
- 初始化异步任务管理的优化
- 代码检查的优化
- 一些代码细节的优化
- 播放器的有优化
- 分享的剪切板需重构去掉库 https://surmon.me/article/80
- 右侧广告的添加
- PWA 的适配https://pwa.nuxtjs.org/modules/workbox.html
- 增加多主题适配

### v1.0.0
- 新增垃圾回收程序（idle-gc），解决内存溢出问题
- 增加百度自动 push 功能
- 修复多说 Https 处理引起的 Bug
- 默认文章缩略图需要设计为 <> 图标
- fav.ico
- 轮播图幻灯，需要设计的默认缩略图
- 文章列表图片需要和七牛端设置配合
- 相关文章图片太大，一行调整为5个
- 轮播图取消异步加载？
- 文章页列表文章白哦提过长会换行
- 文章浏览数统计索引
- 列表 head 中显示查询的结果总数统计
- 标签包含文章数统计索引
- 搜索功能
- 文章详情需要一个过滤器，生成 Tag 内链
- 网站地图页面（用户导航使用的）能折叠展开文章描述、标签、分类、默认只看 100 条，剩下的点击展开，美化
- 每个页面隐藏生成多说的评论数据用于SEO
- 一个 message-box 组件用于错误处理，且多种文案合并为 json，随机展示
- about 页面的知乎微博
- 侧边栏添加知乎链接
- 多个列表页是否合为一个组件
- 文章详情页，详情页相关文章，详情页组件和数据整合，代码高亮插件
- 文章详情页的关键词和描述未能覆盖head
- 多说功能需要整合且生效
- 热门文章的接口需要和多说整合
- README 完善
- vue2 有 bug
- vue-meta__dangerouslyDisableSanitizers 有 bug
- google 统计代码
- 上线自动部署
- 全站 https
- 网站地图需要生成一个 xml 页面
- 路由meta信息需要定义（1.0版本的中间件来实现）
- 时间日期裁剪不能以字数决定
- 文章页标题太小，代码高亮插件取消掉标题
- 文章评论回调
- 代码高亮在高亮插件（jsdom + marked）解析的部分，把 code 的 class 找到 lang 给 pre
- 滚动时需要平滑滚动
- 多数 https
- 同步文章到多说
- 控制台加个人信息
- 图片要有 hover 渐变效果
- 图片可以在 tag 解析时，解析图片，给图片绑定事件，导致图片弹窗
- 相关文章的样式不足一行时是需要优化的
- 文章引入署名协议，以原创为基准
- 文章列表页时间不显示了
- 时间字段更新
- 创建标签和文章关系的时候，先把所有 a 连接，设置新窗开，并 nofollow，tag 数组首先要排序，已字符多的为先
- 创建关系也通过 marked 实现，不再依赖 cheerio 库
- 代码高亮通过 marked 实现行号并实现定位效果
- 增加并修复右键自动添加版权功能
- error.vue 不支持自定义布局，1.0 改进
- 反向代理需要做域名判断
- 增加评论功能
- 增加移动设备适应
- watchTabActive
- 音乐播放器的实现
- 邮件分享有 bug
- 关于我添加 linked
- 添加 app 下载页
