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
  import { scrollTo, easing } from '~utils/scroll-to-anywhere'
  export default {
    name: 'tool',
    methods: {
      totop() {
        scrollTo('body', 300, { easing: easing['ease-in'] })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
