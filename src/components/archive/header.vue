<template>
  <div
    class="header-box"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
    :style="{
      'background-color': backgroundColor,
      'background-image': `url(${backgroundImageUrl})`
    }"
  >
    <div class="logo-box">
      <p class="logo">
        <transition name="module" mode="out-in">
          <i key="date" class="iconfont" :class="icon"></i>
        </transition>
      </p>
    </div>
    <div class="title-box">
      <transition name="module" mode="out-in">
        <h5 class="title">
          <slot></slot>
        </h5>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useTheme, Theme } from '/@/services/theme'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useGlobalState } from '/@/state'
  import { timeAgo } from '/@/transforms/moment'
  import { getFileCDNUrl } from '/@/transforms/url'

  export default defineComponent({
    name: 'ArticleListHeader',
    props: {
      backgroundColor: {
        type: String,
        required: true
      },
      backgroundImage: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const theme = useTheme()
      const globalState = useGlobalState()
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)

      const backgroundImageUrl = computed(() => {
        return props.backgroundImage || getFileCDNUrl('/images/service.jpg')
      })

      return {
        LANGUAGE_KEYS,
        backgroundImageUrl
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .header-box {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16.4rem;
    margin-bottom: $lg-gap;
    background-size: cover;
    background-blend-mode: hue;
    background-color: $module-hover-bg-darken-10;
    background-position: center center;
    color: $text-reversal;

    &.dark {
      color: $text;
    }

    &.mobile {
      height: 12rem;

      > .logo-box {
        height: 8.6rem;

        > .logo {
          line-height: 8.6rem;

          > .iconfont {
            font-size: 5em;
          }
        }
      }
    }

    > .logo-box {
      height: 12rem;
      overflow: hidden;

      > .logo {
        margin: 0;
        line-height: 12rem;
        text-align: center;

        @keyframes logo-animate {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .iconfont {
          font-size: 6em;
          display: inline-block;
          animation: logo-animate 5s infinite;
        }
      }
    }

    > .title-box {
      height: 4rem;
      line-height: 2.5rem;

      > .title {
        margin: 0;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
</style>
