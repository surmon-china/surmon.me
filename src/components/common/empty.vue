<template>
  <div class="empty">
    <slot>
      <template v-if="placeholder">{{ placeholder }}</template>
      <template v-else>
        <i18n :lkey="i18nKey || LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  export default defineComponent({
    name: 'Empty',
    props: {
      placeholder: String,
      i18nKey: String as PropType<LANGUAGE_KEYS>
    },
    setup() {
      return {
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .empty {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 5em;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: $text-dividers;
    user-select: none;
  }
</style>
