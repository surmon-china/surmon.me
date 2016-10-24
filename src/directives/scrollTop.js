 /**
 *
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 * removed jQuery
 *
 */

 var scrollTopEvent = {
  bind: function(el) {
    var element = this ? (this.el ? this.el : el) : el
    // console.log(element)
    if (element) {

      //检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
      var sidebarFixedDocHeight = parseInt(element.offset().top);

      //获取顶部偏移值,定义为顶部的偏移值高度
      var topPadding = 135;

      //获取底部栏目距离顶部的距离，用来判断和浮动元素之间的距离关系,这个值是固定的，网页加载完就可以获取
      var footerDocHeight = parseInt($("#footer").offset().top);

      //给全局窗口即浏览器窗口绑定滚动触发事件
      $(window).scroll(function() {

        //解决特殊情况BUG，判断边栏在显示时才生效
        if ($('#sidebar').css('display') != 'none') {

          //并且这个距离小于底部通栏距离顶部的距离（即边栏的浮动范围则执行下面
          if (footerDocHeight >= $(window).scrollTop() - topPadding + sidebarFixedDocHeight) {

            //实时的需要的高度应该是：
            //滚动条高度 - 默认文档距顶绝对位置 （此时结果应该为一个随着滚动条移动的相对数，保持为0，故） +  顶部的偏移值
            //此处赋值是为了给回弹事件使用
            var nowMarginTop = $(window).scrollTop() - sidebarFixedDocHeight + topPadding

            if (nowMarginTop > 0) {
              element.css({
                top: '125px',
                'position': 'fixed',
                marginTop: 0
              });
              element.attr('data-fixed', nowMarginTop);
            }

            if (nowMarginTop <= 0) {
              element.css({
                top: '0px',
                'position': 'relative',
                marginTop: 0
              });
              element.attr('data-fixed', 0);
            }

          } else {

            //获取到预存储在H5标签中的变量
            var sidebarFixedMarginTop = element.attr('data-fixed');
            $sidebarFixed.css({
              position: 'relative',
              top: 0,
              marginTop: sidebarFixedMarginTop + 'px'
            });
          }
        }
      });
    }
  },
  update: function(value) {
    // console.log(value)
  },
  unbind: function(el) {
    var element = this ? (this.el ? this.el : el) : el
    if (element) {
    }
  }
}

var scrollTopBuild = function(Vue) {
  Vue.directive('scroll-top', scrollTopEvent)
}

var scrollTop = {
  install: function(Vue) {
    scrollTopBuild(Vue)
  }
}

module.exports = scrollTop
