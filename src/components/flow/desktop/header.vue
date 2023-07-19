<script lang="ts" setup>
  import { getCDN_URL } from '/@/transforms/url'

  const props = defineProps<{
    icon: string
    backgroundColor?: string
    backgroundImage?: string
  }>()
</script>

<template>
  <div class="header">
    <div
      class="background"
      :style="{
        backgroundColor: props.backgroundColor,
        backgroundImage: `url(${props.backgroundImage ?? getCDN_URL('/images/thumbnail/carrousel.jpg')})`
      }"
    />
    <div class="content">
      <div class="logo">
        <transition name="module" mode="out-in">
          <i key="date" class="iconfont" :class="props.icon"></i>
        </transition>
      </div>
      <div class="title">
        <transition name="module" mode="out-in">
          <div class="text"><slot></slot></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .header {
    position: relative;
    width: 100%;
    height: 16.4rem;
    margin-bottom: $lg-gap;
    color: $white;
    @include radius-box($lg-radius);

    &:hover {
      .background {
        filter: grayscale(0);
        transform: scale(1.02);
      }
      .content {
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
      transform: scale(1.05);
      filter: grayscale(0.3);
      transition:
        transform $transition-time-fast,
        filter $transition-time-fast;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;

      .logo {
        $size: 12rem;
        margin: 0;
        overflow: hidden;
        height: $size;
        line-height: $size;
        text-align: center;

        .iconfont {
          font-size: 5em;
          display: inline-block;
          transform: scale(1.01);
          @include transform-transition($transition-time-normal);
        }
      }

      .title {
        .text {
          margin: 0;
          text-align: center;
          font-weight: bold;
          font-size: $font-size-h4 - 1;
        }
      }
    }
  }
</style>
