<template>
  <div id="toolbox">
    <div class="container">
      <div class="tools">
        <button
          class="compass"
          :title="$i18n.text.myMap"
          :disabled="onBarrage"
          @click="toggleMyMap"
        >
          <i class="iconfont icon-tibet-1" />
        </button>
        <!-- 暂已移除 RTC & 人脸识别相关业务模块 -->
        <!-- <button
          class="webcam"
          :title="$i18n.text.webcam"
          :disabled="onBarrage"
          :class="{ 
            active: onWebcam,
            close: onBarrage
          }"
          @click="toggleWebcam"
        >
          <i class="iconfont icon-webcam" />
        </button> -->
        <button
          class="barrage"
          :title="$i18n.text.barrage.name"
          :disabled="onWebcam"
          :class="{ 
            active: onBarrage,
            close: onWebcam
          }"
          @click="toggleBarrage"
        >
          <i class="iconfont icon-barrage" />
        </button>
        <a class="feedback" :href="mailUrl" :title="$i18n.text.feedback">
          <i class="iconfont icon-mail" />
        </a>
        <button
          class="to-page-top"
          :title="$i18n.text.totop"
          @click="totop"
          @mouseover="setButtonState('top', true, true)"
          @mouseleave="setButtonState('top', false)"
        >
          <i class="iconfont icon-totop" />
        </button>
        <button
          class="to-page-bottom"
          :title="$i18n.text.tobottom"
          @click="toBottom"
          @mouseover="setButtonState('bottom', true, true)"
          @mouseleave="setButtonState('bottom', false)"
        >
          <i class="iconfont icon-tobottom" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import throttle from 'lodash/throttle'
  import appConfig from '~/config/app.config'
  import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

  let isFirstOpenWebcam = true
  const throttleToggleWebcam = throttle(() => {
    window.$nuxt.$store.commit('global/toggleUpdateWebcamOnState')
  }, 1666)

  export default {
    name: 'ToolBox',
    data() {
      return {
        topBtnMouseOver: false,
        bottomBtnMouseOver: false,
        animationFrameId: null
      }
    },
    computed: {
      ...mapState('global', [
        'language',
        'onWebcam',
        'onMyMap',
        'onBarrage'
      ]),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      mailUrl() {
        return 'mailto:' + appConfig.meta.email
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
          if (!targetScrollY > 0 && targetScrollY < currentScrollY) {
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
        this.$store.commit('global/toggleUpdateBarrageOnState')
      },
      toggleMyMap() {
        this.$ga.event('轨迹地图', '切换', 'tool')
        this.$store.commit('global/toggleMyMapOnState')
      },
      toggleWebcam() {
        this.$ga.event('Webcam', '切换', 'tool')
        if (isFirstOpenWebcam && !this.onWebcam) {
          const confirmText = this.isEnLang
            ? 'Ready?'
            : '这需要 WebRTC、WebGL、Canvas 等技术的支持，可能占用较多 CPU/GPU 资源，且我不会收集你的任何信息，继续吗？'
          if (!window.confirm(confirmText)) {
            this.$store.commit('global/toggleUpdateWebcamOnState', false)
            window.alert(this.isEnLang ? '~' : '好')
            return false
          }
          isFirstOpenWebcam = false
        }
        throttleToggleWebcam()
      }
    }
  }
</script>

<style lang="scss" scoped>
  #toolbox {
    position: fixed;
    z-index: $z-index-toolbox;
    width: 100%;
    bottom: 30rem;

    > .container {
      $size: $lg-gap * 2.8;
      position: relative;

      > .tools {
        position: absolute;
        right: -12rem;
        width: $size;

        > .compass,
        > .webcam,
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
          @include background-transition();

          &:hover {
            background-color: $module-hover-bg;
          }
        }

        @keyframes default-btn-bg {
          0% {
            color: $white;
            background: $accent;
          }
          20% {
            color: $white;
            background: $red;
          }
          40% {
            color: $white;
            background: $primary;
          }
          60% {
            color: $text;
            background: $yellow;
          }
          80% {
            color: $text;
            background: $white;
          }
          100% {
            color: $white;
            background: $black;
          }
        }

        @keyframes webcam {
          0% {
            color: $text-reversal;
            background: $primary;
          }
          100% {
            color: $primary;
            background: $text-reversal;
          }
        }

        > .webcam {
          animation: webcam 3s infinite;

          &.active {
            animation: webcam 0.5s infinite;
          }

          &.close {
            animation: none;
          }
        }

        > .compass {
          color: $primary;

          &:hover {
            background-color: $primary;
            color: $text-reversal;
          }
        }

        > .barrage {
          color: $text-reversal;
          animation: default-btn-bg 8s infinite;

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
