<script lang="ts" setup>
  import { LanguageKey } from '/@/language'

  defineProps<{
    placeholder?: string
    i18nKey?: LanguageKey
  }>()
</script>

<template>
  <div class="empty">
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
  }
</style>
