
// components
import appView from './components'

export default [
  { 
    name: 'index',
    path: '/', 
    component: appView.Index
  },
  {
    name: 'article',
    path: '/article', 
    component: appView.Index
  },
  { 
    path: '*', 
    redirect: '/' 
  }
]
