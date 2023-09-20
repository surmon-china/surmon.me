<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { GAEventCategories } from '/@/constants/gtag'
  import { scrollToPageTop, scrollToNextScreen } from '/@/utils/scroller'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  const { i18n: _i18n, gtag, gState } = useEnhancer()

  const animationFrameId = ref(0)
  const isTopButtonMouseOver = ref(false)
  const isBottomButtonMouseOver = ref(false)

  const handleRSS = () => {
    gtag?.event('rss', {
      event_category: GAEventCategories.Widget
    })
  }

  const handleFeedback = () => {
    gState.toggleSwitcher('feedback', true)
    gtag?.event('feedback_modal', {
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
        <ulink class="rss" :href="VALUABLE_LINKS.RSS" @mousedown="handleRSS">
          <i class="iconfont icon-rss" />
        </ulink>
        <button class="feedback" :title="_i18n.t(LanguageKey.FEEDBACK)" @click="handleFeedback">
          <i class="iconfont icon-mail-plane" />
        </button>
        <button
          class="to-page-top"
          :title="_i18n.t(LanguageKey.TO_TOP)"
          @click="scrollToPageTop"
          @mouseover="setTopButtonState(true, true)"
          @mouseleave="setTopButtonState(false)"
        >
          <i class="iconfont icon-totop" />
        </button>
        <button
          class="to-page-bottom"
          :title="_i18n.t(LanguageKey.TO_BOTTOM)"
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  #toolbox {
    position: fixed;
    z-index: $z-index-toolbox;
    width: 100%;
    bottom: 28rem;

    .container {
      $size: $lg-gap * 2.8;
      position: relative;

      .tools {
        position: absolute;
        right: -12rem;
        width: $size;
        overflow: hidden;

        &:first-child {
          border-top-left-radius: $xs-radius;
          border-top-right-radius: $xs-radius;
        }
        &:last-child {
          border-bottom-left-radius: $xs-radius;
          border-bottom-right-radius: $xs-radius;
        }

        .rss,
        .to-page-top,
        .to-page-bottom,
        .feedback {
          display: block;
          width: $size;
          height: $size;
          line-height: $size;
          text-align: center;
          @include common-bg-module($transition-time-fast);
        }

        .rss {
          color: $rss-primary;
          &:hover {
            background-color: $rss-primary;
            color: $white;
          }
        }

        @keyframes feedback-button {
          0% {
            background-position: 92% 0%;
          }
          50% {
            background-position: 9% 100%;
          }
          100% {
            background-position: 92% 0%;
          }
        }

        .feedback {
          color: $white;
          opacity: 0.8;
          background-color: $primary-lighter;
          background: linear-gradient(1deg, $surmon, #9d0f98);
          background-size: 400% 400%;
          animation: feedback-button 3s ease infinite;
          transition: opacity $transition-time-fast;

          .iconfont {
            display: inline-block;
          }

          &:hover {
            opacity: 1;
            background-color: $primary;
          }
        }

        .to-page-bottom {
          height: $size * 0.618;
          line-height: $size * 0.618;
        }
      }
    }
  }
</style>
