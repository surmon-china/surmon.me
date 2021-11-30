<template>
  <div id="progress-bar">
    <div
      class="progress"
      :class="{
        show: loading.state.show,
        notransition: loading.state.skipTimerCount > 0,
        failed: !loading.state.canSucceed
      }"
      :style="{ width: loading.state.percent + '%' }"
    />
    <desktop-only>
      <div
        class="spin"
        :class="{
          show: loading.state.show,
          failed: !loading.state.canSucceed
        }"
      >
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </desktop-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLoading } from './'
  export default defineComponent({
    name: 'ProgressBar',
    setup() {
      const loading = useLoading()
      return { loading }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  #progress-bar {
    $size: 3px;
    $failed: $red;
    position: fixed;
    top: 0;
    left: 0;
    height: $size;
    width: 100%;
    z-index: $z-index-progress-bar;

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: $size;
      width: 0%;
      @include hidden();
      transition: width $transition-time-normal, opacity $transition-time-normal,
        visibility $transition-time-normal;
      background-color: $primary;
      &.show {
        @include visible();
        transition: width 0s, opacity $transition-time-fast, visibility $transition-time-fast;
      }

      &.notransition {
        transition: none;
      }
      &.failed {
        background-color: $failed;
      }
    }

    .spin {
      position: absolute;
      top: $lg-gap;
      right: $lg-gap;
      @include hidden();
      @include visibility-transition($transition-time-normal);
      &.show {
        @include visible();
      }

      &.failed {
        .lds-ring {
          div {
            border-top-color: $failed;
          }
        }
      }

      .lds-ring {
        $size: 3rem;
        display: inline-block;
        position: relative;
        width: $size;
        height: $size;

        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        div {
          $size: 2rem;
          $border: 3px;
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: $size;
          height: $size;
          margin: $border;
          border: $border solid transparent;
          border-top-color: $primary;
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          &:nth-child(1) {
            animation-delay: -0.45s;
          }
          &:nth-child(2) {
            animation-delay: -0.3s;
          }
          &:nth-child(3) {
            animation-delay: -0.15s;
          }
        }
      }
    }
  }
</style>
