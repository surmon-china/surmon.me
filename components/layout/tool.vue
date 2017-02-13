<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <a class="feedback" 
           href="tencent://Message/?Uin=794939078&websiteName=surmon.me=&Menu=yes"
           target="_blank">
          <i class="iconfont icon-comment"></i>
        </a>
        <button class="to-top" @click="totop()">
          <i class="iconfont icon-totop"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tool',
    methods: {
      totop(acceleration = 0.1, stime = 10) {
        let [x1, y1, x2, y2, x3, y3] = [0, 0, 0, 0, 0, 0]
        if (document.documentElement) {
          x1 = document.documentElement.scrollLeft || 0
          y1 = document.documentElement.scrollTop || 0
        }
        if (document.body) {
          x2 = document.body.scrollLeft || 0
          y2 = document.body.scrollTop || 0
        }
        x3 = window.scrollX || 0
        y3 = window.scrollY || 0
        // 滚动条到页面顶部的水平距离
        let x = Math.max(x1, Math.max(x2, x3))
        // 滚动条到页面顶部的垂直距离
        let y = Math.max(y1, Math.max(y2, y3))
        // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
        let speeding = 1 + acceleration
        window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding))
        // 如果距离不为零, 继续调用函数
        if(x > 0 || y > 0) {
          window.setTimeout(() => {
            this.totop(acceleration, stime)
          }, stime)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  #tools {
    position: fixed;
    width: 100%;
    bottom: 20em;

    > .container {
      position: relative;

      > .tools-list {
        position: absolute;
        right: -10em;
        width: 3em;
        height: 6em;

        > .to-top,
        > .feedback {
          display: block;
          width: 3em;
          height: 3em;
          line-height: 3em;
          text-align: center;
          background-color: $module-bg;

          &:hover {
            background-color: $module-hover-bg;
          }
        }
      }
    }
  }
</style>
