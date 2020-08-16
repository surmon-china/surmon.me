<template>
  <div id="language">
    <div
      class="switcher"
      title="Switch language"
      :class="language"
      @click="tooggleLanguage"
    >{{ language }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'

  export default defineComponent({
    name: 'Language',
    setup() {
      const { i18n, gtag } = useEnhancer()
      const tooggleLanguage = () => {
        i18n.toggle()
        gtag?.event('系统语言', {
          event_category: GAEventActions.Toggle,
          event_label: GAEventTags.Tool
        })
      }
      return {
        language: i18n.language,
        tooggleLanguage
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #language {
    $size: $lg-gap * 2;
    position: fixed;
    right: 0;
    top: 20%;
    margin-top: $size;

    > .switcher {
      position: relative;
      width: $size;
      height: $size;
      line-height: $size;
      border-bottom-left-radius: $xs-radius;
      text-align: center;
      text-transform: uppercase;
      color: $white;
      font-size: $font-size-small;
      font-weight: bold;
      transition: background $transition-time-normal;
      opacity: 0.4;
      cursor: pointer;

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity $transition-time-normal;
      }

      &:hover {
        opacity: 1;

        &::before {
          opacity: 1;
        }
      }

      $enBG: $en-primary;
      $zhBG: $zh-primary;

      &.en {
        background: linear-gradient(to bottom left, rgba($enBG, .3), $enBG);
        border-left: $xs-gap solid $enBG;

        &:hover {
          &::before {
            content: 'ZH';
            background: linear-gradient(to bottom right, $enBG, $zhBG);
          }
        }
      }

      &.zh {
        background: linear-gradient(to bottom right, rgba($zhBG, .3), $zhBG);
        border-left: $xs-gap solid $zhBG;

        &:hover {
          &::before {
            content: 'EN';
            background: linear-gradient(to bottom left, $enBG, $zhBG);
          }
        }
      }
    }
  }
</style>
