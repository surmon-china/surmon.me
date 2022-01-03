<template>
  <div class="header">
    <div
      class="background"
      :style="{
        backgroundColor,
        backgroundImage: `url(${backgroundImageUrl})`
      }"
    />
    <div class="content">
      <div class="logo">
        <transition name="module" mode="out-in">
          <i key="date" class="iconfont" :class="icon"></i>
        </transition>
      </div>
      <div class="title">
        <transition name="module" mode="out-in">
          <h5 class="text">
            <slot></slot>
          </h5>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getTargetCDNURL } from '/@/transforms/url'

  export default defineComponent({
    name: 'FlowArticleListHeader',
    props: {
      backgroundColor: {
        type: String,
        default: ''
      },
      backgroundImage: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const backgroundImageUrl = computed(() => {
        return props.backgroundImage || getTargetCDNURL('/images/page-feeelancer/banner.jpg')
      })

      return {
        LANGUAGE_KEYS,
        backgroundImageUrl
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16.4rem;
    margin-bottom: $lg-gap;
    color: $white;
    @include radius-box($lg-radius);

    &:hover {
      .background {
        transform: scale(1);
      }
      .content {
        backdrop-filter: none;
        .logo {
          .iconfont {
            animation: none;
            transform: scale(1.05);
          }
        }
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background-color: $module-bg;
      background-size: cover;
      background-position: center center;
      transform: scale(1.1);
      @include transform-transition();
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      @include backdrop-blur(1px);

      .logo {
        height: 12rem;
        line-height: 12rem;
        margin: 0;
        text-align: center;
        overflow: hidden;

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
          @include transform-transition();
        }
      }

      .title {
        height: 4rem;
        line-height: 2.5rem;

        .text {
          margin: 0;
          text-align: center;
          text-transform: capitalize;
        }
      }
    }
  }
</style>
