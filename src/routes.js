
// components
import appView from './components'

export default [{
  // 首页
    name: 'index',
    path: '/',
    component: appView.Index
  }, {
  // 项目列表页
    name: 'project',
    path: '/project',
    meta: { fullPage: true },
    component: appView.Layout.Relay,
    children: [{

      // project list
      name: 'project-list',
      path: '',
      meta: { fullPage: true },
      component: appView.Page.Project
    }, {

      // vue-blog
      name: 'vue-blog',
      path: 'vue-blog',
      meta: { fullPage: true },
      component: appView.Project.VueBlog
    }, {

      // nodepress
      name: 'nodepress',
      path: 'nodepress',
      meta: { fullPage: true },
      component: appView.Project.Nodepress
    }, {

      // angular-admin
      name: 'angular-admin',
      path: 'angular-admin',
      meta: { fullPage: true },
      component: appView.Project.AngularAdmin
    }, {

      // vue-netease-cloud-music
      name: 'vue-netease-cloud-music',
      path: 'vue-netease-cloud-music',
      meta: { fullPage: true },
      component: appView.Project.VueNeteaseCloudMusic
    }, {

      // vue-codemirror
      name: 'vue-codemirror',
      path: 'vue-codemirror',
      meta: { fullPage: true },
      component: appView.Project.VueCodemirror
    }, {

      // vue-touch-ripple
      name: 'vue-touch-ripple',
      path: 'vue-touch-ripple',
      meta: { fullPage: true },
      component: appView.Project.VueTouchRipple
    }, {

      // vue-video-player
      name: 'vue-video-player',
      path: 'vue-video-player',
      meta: { fullPage: true },
      component: appView.Project.VueVideoPlayer
    }, {

      // vue-awesome-swiper
      name: 'vue-awesome-swiper',
      path: 'vue-awesome-swiper',
      meta: { fullPage: true },
      component: appView.Project.VueAwesomeSwiper
    }, {

      // WordpressOne
      name: 'wordpress-one',
      path: 'wordpress-one',
      meta: { fullPage: true },
      component: appView.Project.WordpressOne
    }, {

      // WordpressMetro
      name: 'wordpress-metro',
      path: 'wordpress-metro',
      meta: { fullPage: true },
      component: appView.Project.WordpressMetro
    }, {

      // WordpressThink
      name: 'wordpress-think',
      path: 'wordpress-think',
      meta: { fullPage: true },
      component: appView.Project.WordpressThink
    }, {

      // WordpressSurmon
      name: 'wordpress-surmon',
      path: 'wordpress-surmon',
      meta: { fullPage: true },
      component: appView.Project.WordpressSurmon
    }]
  }, {
  // 关于我
    name: 'about',
    path: '/about',
    meta: { fullPage: true },
    component: appView.Page.About
  },  {
  // 播放器页面
    name: 'music',
    path: '/music',
    meta: { fullPage: true },
    component: appView.Page.Music
  }, {
  // 留言板
    name: 'guestbook',
    path: '/guestbook',
    component: appView.Page.Guestbook
  }, {
  // 标签的文章列表页
    name: 'tag',
    path: '/tag/:tag',
    component: appView.Article.Archive
  }, {
  // 时间筛选的文章列表页
    name: 'date',
    path: '/date/:date',
    component: appView.Article.Archive
  }, {
  // 视频列表页
    name: 'movie',
    path: '/category/movie',
    meta: { fullPage: true },
    component: appView.Article.Movie.List
  }, {
  // 视频详情页
    name: 'movie-detail',
    path: '/movie/:movie_id',
    meta: { fullPage: true },
    component: appView.Article.Movie.Detail
  }, {
  // 分类的文章列表页
    name: 'category',
    path: '/category/:category',
    component: appView.Article.Archive
  }, {
  // 文章详情页
    name: 'detail',
    path: '/article/:article_id',
    component: appView.Article.Detail
  }, {
  // 404
    path: '*',
    redirect: '/'
  }
]
