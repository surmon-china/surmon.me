<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <button class="webrtc" 
                title="webrtc"
                @click="toggleWebrtc"
                :disabled="barrageState"
                :class="{ 
                  active: webrtcState,
                  close: barrageState
                }">
          <i class="iconfont icon-webrtc"></i>
        </button>
        <button class="barrage" 
                title="barrage"
                @click="toggleBarrage" 
                :disabled="webrtcState"
                :class="{ 
                  active: barrageState,
                  close: webrtcState
                }">
          <i class="iconfont icon-barrage"></i>
        </button>
        <a class="feedback" 
           title="feedback"
           href="mailto:surmon@foxmail.com"
           target="_blank">
          <i class="iconfont icon-feedback"></i>
        </a>
        <button class="to-top" 
                title="to-top"
                @click="totop"
                @mouseover="setButtonState('top', true, true)"
                @mouseleave="setButtonState('top', false)">
          <i class="iconfont icon-totop"></i>
        </button>
        <button class="to-bottom" 
                title="to-bottom"
                @click="toBottom" 
                @mouseover="setButtonState('bottom', true, true)"
                @mouseleave="setButtonState('bottom', false)">
          <i class="iconfont icon-tobottom"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { scrollTo, easing } from '~/utils/scroll-to-anywhere'
  const underscore = require('~/utils/underscore-simple')
  export default {
    name: 'tool',
    data() {
      return {
        topBtnMouseOver: false,
        bottomBtnMouseOver: false,
        toggleWebrtcFn: null,
        firstOpenWeRtc: true,
        animationFrameId: null
      }
    },
    computed: {
      barrageState() {
        return this.$store.state.option.openBarrage
      },
      webrtcState() {
        return this.$store.state.option.openWebrtc
      }
    },
    methods: {
      totop() {
        scrollTo('body', 300, { easing: easing['ease-in'] })
      },
      toBottom() {
        scrollTo(window.scrollY + window.innerHeight, 300, { easing: easing['ease-in'] })
      },
      setButtonState(position, state, start) {
        this[(Object.is(position, 'bottom') ? 'bottomBtnMouseOver' : 'topBtnMouseOver')] = state
        window.cancelAnimationFrame(this.animationFrameId)
        start && this.slowMoveToAnyWhere()
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
            this.animationFrameId = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(this.animationFrameId)
            return false
          }
        }
        this.animationFrameId = window.requestAnimationFrame(step)
      },
      toggleBarrage() {
        this.$store.commit('option/UPDATE_BARRAGE_STATE')
      },
      toggleWebrtc() {
        if (this.firstOpenWeRtc && !this.webrtcState) {
          if (!window.confirm('实验室功能需要 WebRTC、WebGL、Canvas 等技术的支持，可能占用较多 CPU/GPU 资源，甚至死机、起火、爆炸、毁灭，继续？')) {
            this.$store.commit('option/UPDATE_WEBRTC_STATE', false)
            window.alert('滚滚滚')
            return false
          }
          this.firstOpenWeRtc = false
        }
        if (this.toggleWebrtcFn) {
          this.toggleWebrtcFn()
        } else {
          this.toggleWebrtcFn = underscore.throttle(() => {
            this.$store.commit('option/UPDATE_WEBRTC_STATE')
          }, 1666)
          this.toggleWebrtcFn()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  #tools {
    position: fixed;
    z-index: 9;
    width: 100%;
    bottom: 30rem;

    > .container {
      position: relative;

      > .tools-list {
        position: absolute;
        right: -10em;
        width: 3em;
        height: 7em;

        > .webrtc,
        > .barrage,
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

        @keyframes defaultBtnBg {
          0%   {
            color: white;
            background: chartreuse;
          }
          12%  {
            color: white;
            background: green;
          }
          24%  {
            color: white;
            background: red;
          }
          36%  {
            color: white;
            background: darkviolet;
          }
          60% {
            color: white;
            background: pink;
          }
          72% {
            color: $text;
            background: yellow;
          }
          86% {
            color: $text;
            background: white;
          }
          100% {
            color: white;
            background: black;
          }
        }

        @keyframes webrtc {
          0%   {
            color: white;
            background: $primary;
          }
          100% {
            color: $primary;
            background: white;
          }
        }

        > .webrtc {
          animation: webrtc 3s infinite;

          &.active {
            animation: webrtc .5s infinite;
          }

          &.close {
            animation: none;
          }
        }

        > .barrage {
          color: white;
          animation: defaultBtnBg 10s infinite;

          &.active {
            background-color: $module-hover-bg;
            animation: defaultBtnBg steps(1) 1.666s infinite;
          }

          &.close {
            color: $link-color;
            animation: none;
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
