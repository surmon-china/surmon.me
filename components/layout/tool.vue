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
        let currentScrollTop = Math.max.apply(Math, [
          window.scrollY || 0, 
          document.body.scrollTop || 0, 
          document.documentElement.scrollTop || 0
        ])
        // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
        window.scrollTo(0, Math.floor(currentScrollTop / (1 + acceleration)))
        // 如果距离还没到
        if(currentScrollTop > 0) {
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
