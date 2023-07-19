<script lang="ts" setup>
  import { computed } from 'vue'

  interface Props {
    loading?: boolean
    color?: string
    height?: string
    width?: string
    margin?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: true,
    color: 'rgba(197, 197, 197, 0.4)',
    height: '15px',
    width: '15px',
    margin: '5px'
  })

  const spinnerStyle = computed(() => ({
    backgroundColor: props.color,
    height: props.height,
    width: props.width,
    margin: props.margin
  }))
</script>

<template>
  <div v-show="loading" class="spinner-box">
    <div class="spinner-inner">
      <div class="la-ball-beat">
        <div :style="spinnerStyle" />
        <div :style="spinnerStyle" />
        <div :style="spinnerStyle" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .spinner-box {
    position: relative;
    width: 100%;
    min-height: 50px;
    height: 100%;

    @keyframes ball-beat {
      50% {
        opacity: 0.2;
        transform: scale(0.75);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    > .spinner-inner {
      width: 80px;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -40px;
      margin-top: -15px;

      > .la-ball-beat {
        display: block;
        position: relative;
        box-sizing: border-box;
        font-size: 0;
        color: $white;
        width: 80px;
        height: 30px;

        > div {
          position: relative;
          box-sizing: border-box;
          display: inline-block;
          float: none;
          border: none;
          width: 15px;
          height: 15px;
          margin: 5px;
          background-color: $module-bg-hover;
          animation: ball-beat 0.7s -0.15s infinite linear;

          &:nth-child(2n-1) {
            animation-delay: -0.5s;
          }
        }

        &.la-sm {
          width: 26px;
          height: 8px;

          > div {
            width: 8px;
            height: 8px;
            margin: 3px;
          }
        }

        &.la-2x {
          width: 108px;
          height: 36px;

          > div {
            width: 20px;
            height: 20px;
            margin: 8px;
          }
        }

        &.la-3x {
          width: 162px;
          height: 54px;

          > div {
            width: 30px;
            height: 30px;
            margin: 12px;
          }
        }
      }
    }
  }
</style>
