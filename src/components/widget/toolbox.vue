<template>
  <div id="toolbox">
    <div class="container">
      <div class="tools">
        <a
          href="/rss.xml"
          target="_blank"
          class="rss"
          rel="external nofollow noopenter"
          @mousedown="handleRSS"
        >
          <i class="iconfont icon-rss" />
        </a>
        <button
          class="barrage"
          :title="$i18n.text.barrage.name"
          :class="{ active: onBarrage }"
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
          @mouseover="setTopButtonState(true, true)"
          @mouseleave="setTopButtonState(false)"
        >
          <i class="iconfont icon-totop" />
        </button>
        <button
          class="to-page-bottom"
          :title="$i18n.text.tobottom"
          @click="toBottom"
          @mouseover="setBottomButtonState(true, true)"
          @mouseleave="setBottomButtonState(false)"
        >
          <i class="iconfont icon-tobottom" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType, createComponent, ref, computed, onMounted } from '@vue/composition-api'
  import { mapState } from 'vuex'
  import appConfig from '~/config/app.config'
  import systemConstants from '~/constants/system'
  import { scrollTo, Easing } from '~/services/scroller'

  export default createComponent({
    name: 'ToolBox',
    setup(_, { root }) {
      const animationFrameId = ref(0)
      const isTopButtonMouseOver = ref(false)
      const isBottomButtonMouseOver = ref(false)

      const slowMoveToAnyWhere = () => {
        const step = () => {
          let targetScrollY = window.scrollY
          const currentScrollY = document.body.scrollHeight - window.innerHeight
          if (isBottomButtonMouseOver.value) {
            targetScrollY += 1
          }
          if (isTopButtonMouseOver.value) {
            targetScrollY -= 1
          }
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
          if (isBottomButtonMouseOver.value || isTopButtonMouseOver.value) {
            animationFrameId.value = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(animationFrameId.value)
            return false
          }
        }
        animationFrameId.value = window.requestAnimationFrame(step)
      }

      const mailUrl = 'mailto:' + appConfig.meta.email
      const onBarrage = computed(() => root.$store.state.global.onBarrage)

      return {
        mailUrl,
        onBarrage,
        totop() {
          scrollTo('body', 300, { easing: Easing['ease-in'] })
        },
        toBottom() {
          scrollTo(
            window.scrollY + window.innerHeight,
            300,
            { easing: Easing['ease-in'] }
          )
        },
        setTopButtonState(state: boolean, isStartSlow = false) {
          isTopButtonMouseOver.value = state
          window.cancelAnimationFrame(animationFrameId.value)
          isStartSlow && slowMoveToAnyWhere()
        },
        setBottomButtonState(state: boolean, isStartSlow = false) {
          isBottomButtonMouseOver.value = state
          window.cancelAnimationFrame(animationFrameId.value)
          isStartSlow && slowMoveToAnyWhere()
        },
        handleRSS() {
          root.$ga.event(
            'RSS 订阅',
            systemConstants.GAEventActions.Click,
            systemConstants.GAEventTags.Tool
          )
        },
        toggleBarrage() {
          root.$ga.event(
            '弹幕功能',
            systemConstants.GAEventActions.Toggle,
            systemConstants.GAEventTags.Tool
          )
          root.$store.commit('global/toggleUpdateBarrageOnState')
        }
      }
    }
  })
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

        > .rss,
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

        > .rss {
          $color: #f8981d;
          color: $color;

          &:hover {
            background-color: $color;
            color: $white;
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
