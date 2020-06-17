<template>
  <div class="empty-box">
    <slot>
      <i18n :lkey="LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { LANGUAGE_KEYS } from '/@/language/key'
  export default defineComponent({
    name: 'EmptyBox',
    setup() {
      return {
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss">
  .empty-box {
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
