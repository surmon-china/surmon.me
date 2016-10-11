
// components
import appView from './components'

export default [{
    name: 'index',
    path: '/',
    component: appView.Index
  }, {
    name: 'tag',
    path: '/tag/:tag_slug',
    component: appView.Index
  },  {
    name: 'category',
    path: '/category/:category_slug',
    component: appView.Index
  }, {
    name: 'detail',
    path: '/article/:article_id',
    component: appView.Detail
  }, {
    path: '*',
    redirect: '/'
  }
]
