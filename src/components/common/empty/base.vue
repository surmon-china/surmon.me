<template>
  <div class="empty">
    <template v-if="hasChildren">
      <slot>
        <i18n :lkey="LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
      </slot>
    </template>
    <template v-else>
      <span v-if="placeholder">{{ placeholder }}</span>
      <i18n v-else :lkey="LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, h, computed } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'SuEmpty',
    props: {
      placeholder: String
    },
    setup(props, context) {
      return {
        hasChildren: !!context.slots.default
      }
    }
  })
</script>

<style lang="scss">
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
  }
</style>
