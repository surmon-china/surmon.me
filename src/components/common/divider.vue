<script lang="ts" setup>
  interface Props {
    type?: 'horizontal' | 'vertical'
    size?: 'default' | 'xs' | 'sm' | 'lg'
    dashed?: boolean
    color?: string
  }

  withDefaults(defineProps<Props>(), {
    type: 'horizontal',
    size: 'default',
    dashed: false
  })
</script>

<template>
  <div
    role="separator"
    class="divider"
    :class="[type, size, { dashed }, { slot: !!$slots.default }]"
    :style="color ? { '--border-color': color } : {}"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .divider {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &.default {
      #{--divider-gap}: $gap;
    }
    &.xs {
      #{--divider-gap}: $gap-tiny;
    }
    &.sm {
      #{--divider-gap}: $gap-sm;
    }
    &.lg {
      #{--divider-gap}: $gap-lg;
    }

    &.horizontal {
      display: flex;
      align-items: center;
      clear: both;
      width: 100%;
      margin: var(--divider-gap) 0;
      border-top: 1px solid var(--border-color, $color-text-divider);
      &.slot {
        border-top: none;
      }
    }

    &.vertical {
      position: relative;
      top: -0.06em;
      display: inline-block;
      height: 0.9em;
      margin: 0 var(--divider-gap);
      vertical-align: middle;
      border-left: 1px solid var(--border-color, $color-text-divider);

      &.slot {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        height: 1em;
        vertical-align: baseline;
        border-left: none;
      }
    }

    &.dashed {
      border-style: dashed;
    }
  }
</style>
