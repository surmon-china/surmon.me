<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { scrollToPageTop, scrollToNextScreen } from '/@/utils/scroller'

  const { gtag, i18n: _i18n } = useEnhancer()

  const animationFrameId = ref(0)
  const isTopButtonMouseOver = ref(false)
  const isBottomButtonMouseOver = ref(false)

  const handleAiClick = () => {
    alert('Coming soon!')
    gtag?.event('ai_modal', {
      event_category: GAEventCategories.Widget
    })
  }

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

  const setTopButtonState = (state: boolean, isStartSlow = false) => {
    isTopButtonMouseOver.value = state
    window.cancelAnimationFrame(animationFrameId.value)
    isStartSlow && slowMoveToAnyWhere()
  }

  const setBottomButtonState = (state: boolean, isStartSlow = false) => {
    isBottomButtonMouseOver.value = state
    window.cancelAnimationFrame(animationFrameId.value)
    isStartSlow && slowMoveToAnyWhere()
  }
</script>

<template>
  <div id="toolbox" v-disabled-wallflower>
    <div class="container">
      <div class="tools">
        <button class="ai" disabled @click="handleAiClick">
          <i class="iconfont icon-robot" />
        </button>
        <button
          class="to-page-top"
          :title="_i18n.t(LocalesKey.TO_TOP)"
          @click="scrollToPageTop"
          @mouseover="setTopButtonState(true, true)"
          @mouseleave="setTopButtonState(false)"
        >
          <i class="iconfont icon-totop" />
        </button>
        <button
          class="to-page-bottom"
          :title="_i18n.t(LocalesKey.TO_BOTTOM)"
          @click="scrollToNextScreen"
          @mouseover="setBottomButtonState(true, true)"
          @mouseleave="setBottomButtonState(false)"
        >
          <i class="iconfont icon-tobottom" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #toolbox {
    position: fixed;
    z-index: $z-index-toolbox;
    width: 100%;
    bottom: 18rem;

    .container {
      $size: 2.8rem;
      position: relative;

      .tools {
        position: absolute;
        right: -9rem;
        width: $size;
        overflow: hidden;

        &:first-child {
          border-top-left-radius: $radius-sm;
          border-top-right-radius: $radius-sm;
        }
        &:last-child {
          border-bottom-left-radius: $radius-sm;
          border-bottom-right-radius: $radius-sm;
        }

        .ai,
        .to-page-top,
        .to-page-bottom {
          display: block;
          width: $size;
          height: $size;
          line-height: $size;
          text-align: center;
          @include mix.common-bg-module($motion-duration-fast);
        }

        @keyframes ai-button {
          0% {
            background-position: 92% 0%;
            background-size: 100% 300%;
          }
          50% {
            background-position: 4% 100%;
            background-size: 400% 100%;
          }
          100% {
            background-position: 96% 0%;
            background-size: 100% 200%;
          }
        }

        .ai {
          color: $white;
          opacity: 0.8;
          background-color: $primary-lighter;
          background: linear-gradient(45deg, #fa4340, $surmon, #19ba64);
          animation: ai-button 4s ease infinite;
          transition: opacity $motion-duration-fast;

          .iconfont {
            font-size: $font-size-h3;
          }

          &[disabled] {
            opacity: 0.7;
          }

          &:not([disabled]):hover {
            opacity: 1;
            background-color: $primary;
          }
        }

        .to-page-bottom {
          height: $size * 0.618;
          line-height: $size * 0.618;
          &:hover {
            .iconfont {
              transform: translateY(0);
            }
          }

          .iconfont {
            display: inline-block;
            transform: translateY(-6px);
            transition: transform $motion-duration-mid;
          }
        }

        .to-page-top:hover {
          & + .to-page-bottom {
            .iconfont {
              transform: translateY(0);
            }
          }
        }
      }
    }
  }
</style>
