/*
** 只在生成模式的客户端中使用
*/
if (process.BROWSER_BUILD && process.env.NODE_ENV === 'production') {

  var a2a_config = a2a_config || {};
  a2a_config.linkname = "Surmon.me";
  a2a_config.linkurl = "https://surmon.me";
  a2a_config.onclick = 1;
  a2a_config.locale = "zh-CN";
  // a2a_config.prioritize = ["wechat", "sina_weibo", "linkedin", "twitter", "qzone", "facebook", "google_plus", "wordpress"];
  
  (function(){
    var a2a_config = a2a_config || {};
    a2a_config.locale = "zh-CN";
    var a = document.createElement('script');
    a.type = 'text/javascript';
    a.async = true;
    a.src = 'https://static.addtoany.com/menu/page.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(a, s);
  })();

  /*
  ** 应用挂载后
  */
  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      setTimeout(() => {
        a2a.init('page', { target: '.article-share' });
      }, 500)
    })
  })
}
