<script lang="ts" setup>
  import { LanguageKey } from '/@/language'

  defineProps<{
    placeholder?: string
    i18nKey?: LanguageKey
    bold?: boolean
    size?: 'small' | 'default' | 'large'
  }>()
</script>

<template>
  <div class="empty" :class="[size, { bold }]">
    <slot>
      <template v-if="placeholder">{{ placeholder }}</template>
      <template v-else>
        <i18n :k="i18nKey || LanguageKey.EMPTY_PLACEHOLDER" />
      </template>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .empty {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 5em;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: $text-divider;
    letter-spacing: 0.1em;
    &.bold {
      font-weight: bold;
    }
    &.small {
      font-size: $font-size-root;
    }
    &.default {
      font-size: $font-size-base;
    }
    &.large {
      font-size: $font-size-h4;
    }
  }
</style>
