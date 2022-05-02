<template>
  <span
    class="webfont"
    :class="[
      bolder ? 'bolder' : 'medium',
      isZhLang ? 'zh' : 'en',
      { boldZh },
      { boldEn },
      { uppercase }
    ]"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  export default defineComponent({
    name: 'Webfont',
    props: {
      bolder: {
        type: Boolean,
        default: false
      },
      boldZh: {
        type: Boolean,
        default: false
      },
      boldEn: {
        type: Boolean,
        default: true
      },
      uppercase: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const { isZhLang } = useEnhancer()
      return {
        isZhLang
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .webfont {
    &.zh {
      font-weight: normal;
      /* HACK: for Chinese font */
      margin-top: -1px;

      &.medium {
        font-family: 'webfont-medium';
      }
      &.bolder {
        font-family: 'webfont-bolder';
      }
      &.boldZh {
        font-weight: bold;
      }
    }

    &.en {
      font-size: 95%;
      font-family: inherit;
      &.boldEn {
        font-weight: bold;
      }
      &.uppercase {
        text-transform: uppercase;
      }
    }
  }
</style>
