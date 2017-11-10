/*
** 只在生成模式的客户端中使用
*/

if (process.env.NODE_ENV === 'production') {
  /*
  ** Google 统计分析脚本
  */
  (function(i, s, o, g, r, a, m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)}, i[r].l=1*new Date();a=s.createElement(o), 
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '/scripts/analytics.js', 'ga')
  /*
  ** 当前页的访问统计
  */
  ga('create', 'UA-84887611-3', 'auto')
  ga('send', 'pageview')
  /*
  ** 应用挂载后
  */
  window.onNuxtReady((app) => {
    /*
    ** 每次页面路由发生改变时
    */
    app.$nuxt.$on('routeChanged', (to, from) => {
      /*
      ** 告诉 Google 统计分析服务 增加新的页面访问统计
      */
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
    })
  })
}
