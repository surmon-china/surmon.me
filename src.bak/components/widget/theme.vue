<template>
  <div id="theme">
    <div class="switcher" :class="theme" @click="toggleTheme">
      <i class="iconfont" :class="themeIcon"></i>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '../../../src/app/enhancer'
  import { Theme } from '/@/services/theme'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'

  export default defineComponent({
    name: 'Theme',
    setup() {
      const { theme, gtag } = useEnhancer()
      const themeValue = theme.theme
      const themeIcon = computed(() => {
        const themeIconMap = {
          [Theme.Default]: 'icon-sunny',
          [Theme.Dark]: 'icon-moon'
        }
        return themeIconMap[themeValue.value]
      })

      const toggleTheme = () => {
        theme.toggle()
        gtag?.event('切换主题', {
          event_category: GAEventActions.Toggle,
          event_label: GAEventTags.Tool
        })
      }

      return {
        theme: themeValue,
        themeIcon,
        toggleTheme
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  #theme {
    position: fixed;
    right: 0;
    top: 20%;

    .switcher {
      $size: $lg-gap * 2;
      width: $size;
      height: $size;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: $module-bg;
      border-left: $xs-gap solid $primary;
      border-top-left-radius: $xs-radius;
      color: $primary;
      opacity: 0.4;
      cursor: pointer;
      @include visibility-transition();

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
