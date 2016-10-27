<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <button class="feedback">
          <i class="iconfont icon-comment"></i>
        </button>
        <button class="to-top" @click="totop">
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
      totop() {
        const scrollTo = (element, to, duration) => {
          if (duration <= 0) return
          const difference = to - element.scrollTop
          const perTick = difference / duration * 10
          setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick
            if (element.scrollTop == to) return
            scrollTo(element, to, duration - 10)
          }, 10)
        }
        scrollTo(document.body, 0, 160)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../sass/variables';
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
