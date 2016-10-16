
// components
import appView from './components'

export default [{
    name: 'index',
    path: '/',
    component: appView.Index
  }, {
    name: 'project',
    path: '/project',
    component: appView.Page.Project
  }, {
    name: 'project-vue-codemirror',
    path: '/project/vue-codemirror',
    component: appView.Project.vueCodemirror
  }, {
    name: 'about',
    path: '/about',
    component: appView.Page.About
  }, {
    name: 'guestbook',
    path: '/guestbook',
    component: appView.Page.Guestbook
  }, {
    name: 'tag',
    path: '/tag/:tag_slug',
    component: appView.Article.Tag
  }, {
    name: 'date',
    path: '/date/:date',
    component: appView.Article.Date
  }, {
    name: 'category',
    path: '/category/:category_slug',
    component: appView.Article.Category
  }, {
    name: 'detail',
    path: '/article/:article_id',
    component: appView.Article.Detail
  }, {
    path: '*',
    redirect: '/'
  }
]
