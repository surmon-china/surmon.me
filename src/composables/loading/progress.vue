<script lang="ts" setup>
  import { useLoading } from './'

  interface Props {
    spin?: boolean
  }

  const props = defineProps<Props>()
  const loading = useLoading()
</script>

<template>
  <div id="progress-bar" :class="{ show: loading.state.show }">
    <div
      class="progress"
      :style="{ width: loading.state.percent + '%' }"
      :class="{
        notransition: loading.state.skipTimerCount > 0,
        failed: !loading.state.canSucceed
      }"
    />
    <div v-if="props.spin" class="spin" :class="{ failed: !loading.state.canSucceed }">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  #progress-bar {
    $size: 3px;
    $failed: $red;
    position: fixed;
    top: 0;
    left: 0;
    height: $size;
    width: 100%;
    z-index: $z-index-progress-bar;
    @include visibility-transition($transition-time-normal);
    @include hidden();
    &.show {
      @include visible();
    }

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: $size;
      width: 0%;
      background-color: $primary;
      transition: width 160ms;
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
