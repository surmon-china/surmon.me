<template>
  <div id="toolbox">
    <div class="container">
      <div class="tools">
        <ulink class="rss" :href="VALUABLE_LINKS.RSS" @mousedown="handleRSS">
          <i class="iconfont icon-rss" />
        </ulink>
        <button class="feedback" :title="t(LANGUAGE_KEYS.FEEDBACK)" @click="handleFeedback">
          <i class="iconfont icon-mail-plane" />
        </button>
        <button
          class="to-page-top"
          :title="t(LANGUAGE_KEYS.TO_TOP)"
          @click="scrollToTop"
          @mouseover="setTopButtonState(true, true)"
          @mouseleave="setTopButtonState(false)"
        >
          <i class="iconfont icon-totop" />
        </button>
        <button
          class="to-page-bottom"
          :title="t(LANGUAGE_KEYS.TO_BOTTOM)"
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
  import { defineComponent, ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMetaStore } from '/@/store/meta'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventCategories } from '/@/constants/gtag'
  import { scrollTo, Easing } from '/@/utils/scroller'
  import { scrollToTop } from '/@/utils/effects'
  import { emailLink } from '/@/transforms/email'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'Toolbox',
    setup() {
      const { i18n, gtag } = useEnhancer()
      const metaStore = useMetaStore()

      const animationFrameID = ref(0)
      const isTopButtonMouseOver = ref(false)
      const isBottomButtonMouseOver = ref(false)

      const handleRSS = () => {
        gtag?.event('rss', {
          event_category: GAEventCategories.Widget
        })
      }

      const handleFeedback = () => {
        gtag?.event('feedback', {
          event_category: GAEventCategories.Widget
        })

        window.open(emailLink({ email: metaStore.appOptions.data?.site_email! }))
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
            animationFrameID.value = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(animationFrameID.value)
            return false
          }
        }
        animationFrameID.value = window.requestAnimationFrame(step)
      }

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        t: i18n.translate,
        scrollToTop,
        handleFeedback,
        handleRSS,
        toBottom() {
          scrollTo(window.scrollY + window.innerHeight, 300, { easing: Easing.easeIn })
        },
        setTopButtonState(state: boolean, isStartSlow = false) {
          isTopButtonMouseOver.value = state
          window.cancelAnimationFrame(animationFrameID.value)
          isStartSlow && slowMoveToAnyWhere()
        },
        setBottomButtonState(state: boolean, isStartSlow = false) {
          isBottomButtonMouseOver.value = state
          window.cancelAnimationFrame(animationFrameID.value)
          isStartSlow && slowMoveToAnyWhere()
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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

        .feedback {
          background-color: $primary-lighter;
          color: $text-reversal;
          &:hover {
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
