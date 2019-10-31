<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <button
          class="webrtc"
          @click="toggleWebrtc"
          :title="$i18n.text.webrtc"
          :disabled="barrageState || onPowerSavingMode"
          :class="{ 
            active: webrtcState,
            close: barrageState
          }"
        >
          <i class="iconfont icon-webrtc"></i>
        </button>
        <button
          class="barrage"
          @click="toggleBarrage"
          :title="$i18n.text.barrage.name"
          :disabled="webrtcState"
          :class="{ 
            active: barrageState,
            close: webrtcState
          }"
        >
          <i class="iconfont icon-barrage"></i>
        </button>
        <a class="feedback" href="mailto:surmon@foxmail.com" :title="$i18n.text.feedback">
          <i class="iconfont icon-mail"></i>
        </a>
        <button
          class="to-page-top"
          :title="$i18n.text.totop"
          @click="totop"
          @mouseover="setButtonState('top', true, true)"
          @mouseleave="setButtonState('top', false)"
        >
          <i class="iconfont icon-totop"></i>
        </button>
        <button
          class="to-page-bottom"
          :title="$i18n.text.tobottom"
          @click="toBottom"
          @mouseover="setButtonState('bottom', true, true)"
          @mouseleave="setButtonState('bottom', false)"
        >
          <i class="iconfont icon-tobottom"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import underscore from '~/utils/underscore-simple'
  import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

  export default {
    name: 'tool-box',
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
      ...mapState('global', {
        language: 'language',
        webrtcState: 'onWebrtc',
        barrageState: 'onBarrage',
        onPowerSavingMode: 'onPowerSavingMode'
      }),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      }
    },
    methods: {
      totop() {
        scrollTo('body', 300, { easing: Easing['ease-in'] })
      },
      toBottom() {
        scrollTo(window.scrollY + window.innerHeight, 300, { easing: Easing['ease-in'] })
      },
      setButtonState(position, state, start) {
        this[position === 'bottom' ? 'bottomBtnMouseOver' : 'topBtnMouseOver'] = state
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
          if (!canScrollTo) {
            return false
          }
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
        this.$ga.event('弹幕功能', '切换', 'tool')
        this.$store.commit('global/updateBarrageOnState')
      },
      toggleWebrtc() {
        this.$ga.event('WebRTC', '切换', 'tool')
        if (this.firstOpenWeRtc && !this.webrtcState) {
          const confirmText = this.isEnLang
            ? 'Will open WebRTC、WebGL、Canvas, ready?'
            : '实验室功能需要 WebRTC、WebGL、Canvas 等技术的支持，可能占用较多 CPU/GPU 资源，甚至死机、起火、爆炸、毁灭，继续？'
          if (!window.confirm(confirmText)) {
            this.$store.commit('global/updateWebRtcOnState', false)
            window.alert(this.isEnLang ? 'Sorry~' : '滚滚滚')
            return false
          }
          this.firstOpenWeRtc = false
        }
        if (this.toggleWebrtcFn) {
          this.toggleWebrtcFn()
        } else {
          this.toggleWebrtcFn = underscore.throttle(() => {
            this.$store.commit('global/updateWebRtcOnState')
          }, 1666)
          this.toggleWebrtcFn()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #tools {
    position: fixed;
    z-index: 9;
    width: 100%;
    bottom: 30rem;

    > .container {
      $size: $lg-gap * 2.8;
      position: relative;

      > .tools-list {
        position: absolute;
        right: -12rem;
        width: $size;

        > .webrtc,
        > .barrage,
        > .to-page-top,
        > .to-page-bottom,
        > .feedback {
          display: block;
          width: $size;
          height: $size;
          line-height: $size;
          text-align: center;
          @include module-blur-bg();

          &:hover {
            background-color: $module-hover-bg;
          }
        }

        @keyframes default-btn-bg {
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
            color: $text-reversal;
            background: $primary;
          }
          100% {
            color: $primary;
            background: $text-reversal;
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
          color: $text-reversal;
          animation: default-btn-bg 10s infinite;

          &.active {
            background-color: $module-hover-bg;
            animation: default-btn-bg steps(1) 1.666s infinite;
          }

          &.close {
            color: $link-color;
            animation: none;
          }
        }

        > .to-page-bottom {
          height: $size * 0.6;
          line-height: $size * 0.6;
        }
      }
    }
  }
</style>
