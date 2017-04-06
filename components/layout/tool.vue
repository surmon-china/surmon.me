<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <a class="feedback" 
           href="mailto:surmon@foxmail.com"
           target="_blank">
          <i class="iconfont icon-comment"></i>
        </a>
        <button class="to-top" 
                @click="totop"
                @mouseover="topBtnMouseOver = true;slowMoveToAnyWhere()"
                @mouseleave="topBtnMouseOver = false">
          <i class="iconfont icon-totop"></i>
        </button>
        <button class="to-bottom" 
                @click="toBottom" 
                @mouseover="bottomBtnMouseOver = true;slowMoveToAnyWhere()"
                @mouseleave="bottomBtnMouseOver = false">
          <i class="iconfont icon-tobottom"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { scrollTo, easing } from '~utils/scroll-to-anywhere'
  export default {
    name: 'tool',
    data() {
      return {
        topBtnMouseOver: false,
        bottomBtnMouseOver: false
      }
    },
    methods: {
      totop() {
        scrollTo('body', 300, { easing: easing['ease-in'] })
      },
      toBottom() {
        scrollTo(window.scrollY + window.innerHeight, 300, { easing: easing['ease-in'] })
      },
      slowMoveToAnyWhere() {
        const step = () => {
          let targetScrollY = window.scrollY
          const currentScrollY = document.body.scrollHeight - window.innerHeight
          if (this.bottomBtnMouseOver) targetScrollY += 1
          if (this.topBtnMouseOver) targetScrollY -= 1
          if (targetScrollY < 0) {
            targetScrollY = 0
          } else if (targetScrollY >= currentScrollY) {
            targetScrollY = currentScrollY
          }
          const canScrollTo = targetScrollY > 0 && targetScrollY < currentScrollY
          if (!canScrollTo) return false
          window.scrollTo(0, targetScrollY)
          if (this.bottomBtnMouseOver || this.topBtnMouseOver) {
            window.requestAnimationFrame(step)
          } else {
            return false
          }
        }
        window.requestAnimationFrame(step)
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
        height: 7em;

        > .to-top,
        > .to-bottom,
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

        > .to-bottom {
          height: 2em;
          line-height: 2em;
        }
      }
    }
  }
</style>
