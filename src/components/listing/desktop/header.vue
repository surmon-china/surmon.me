<script lang="ts" setup>
  import { useCdnDomain } from '/@/app/context'
  import { getAssetURL } from '/@/transforms/url'

  defineProps<{
    icon: string
    backgroundColor?: string
    backgroundImage?: string
  }>()

  const cdnDomain = useCdnDomain()
  const defaultImage = getAssetURL(cdnDomain, '/images/thumbnail/carrousel.jpg')
</script>

<template>
  <div class="header">
    <div
      class="background"
      :style="{
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage ?? defaultImage})`
      }"
    />
    <div class="content">
      <div class="logo">
        <i key="date" class="iconfont" :class="icon"></i>
      </div>
      <div class="title">
        <div class="text"><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .header {
    position: relative;
    width: 100%;
    height: 16.4rem;
    margin-bottom: $gap-lg;
    color: $white;
    @include mix.radius-box($radius-lg);

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
        transform $motion-duration-fast,
        filter $motion-duration-fast;
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
          @include mix.transform-transition($motion-duration-mid);
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
