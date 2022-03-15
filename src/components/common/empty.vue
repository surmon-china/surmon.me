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

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { LanguageKey } from '/@/language'
  export default defineComponent({
    name: 'Empty',
    props: {
      placeholder: String,
      i18nKey: String as PropType<LanguageKey>
    },
    setup() {
      return {
        LanguageKey
      }
    }
  })
</script>

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
