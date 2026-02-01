<script lang="ts" setup>
  import { LocalesKey } from '/@/locales'

  defineProps<{
    bold?: boolean
    size?: 'small' | 'default' | 'large'
    placeholder?: string
  }>()
</script>

<template>
  <div class="empty" :class="[size, { bold }]">
    <slot>
      <template v-if="placeholder">{{ placeholder }}</template>
      <template v-else><i18n :k="LocalesKey.EMPTY_PLACEHOLDER" /></template>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .empty {
    width: 100%;
    height: 100%;
    min-height: 5em;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: $color-text-divider;
    letter-spacing: 0.1em;

    &.bold {
      font-weight: bold;
    }
    &.small {
      font-size: $font-size-tertiary;
    }
    &.default {
      font-size: $font-size-base;
    }
    &.large {
      font-size: $font-size-h4;
    }
  }
</style>
