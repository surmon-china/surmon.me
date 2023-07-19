<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'

  interface Props {
    bolder?: boolean
    boldZh?: boolean
    boldEn?: boolean
    uppercase?: boolean
  }

  withDefaults(defineProps<Props>(), {
    bolder: false,
    boldZh: false,
    boldEn: true,
    uppercase: false
  })

  const { isZhLang } = useEnhancer()
</script>

<template>
  <span
    :class="[
      'webfont',
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
