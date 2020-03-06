<template>
  <div id="theme">
    <div class="theme-box" :class="theme" @click="toggleTheme">
      <i class="iconfont" :class="themeIcon"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import systemConstants from '~/constants/system'

  export default Vue.extend({
    name: 'Theme',
    computed: {
      theme() {
        return this.$store.state.global.theme
      },
      themeIcon() {
        const themeIconMap = {
          [systemConstants.Theme.Default]: 'icon-sunny',
          [systemConstants.Theme.Dark]: 'icon-moon'
        }
        return themeIconMap[this.theme]
      },
      isDarkTheme() {
        return this.$store.getters['global/isDarkTheme']
      }
    },
    methods: {
      setTheme(theme) {
        this.$store.commit('global/updateTheme', theme)
        this.$ga.event(
          '反色模式',
          systemConstants.GAEventActions.Toggle,
          systemConstants.GAEventTags.Tool
        )
      },
      toggleTheme() {
        this.setTheme(
          this.isDarkTheme
            ? systemConstants.Theme.Default
            : systemConstants.Theme.Dark
        )
      }
    }
  })
</script>

<style lang="scss" scoped>
  #theme {
    position: fixed;
    right: 0;
    top: 20%;

    .theme-box {
      $size: $lg-gap * 2;
      width: $size;
      height: $size;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: $module-bg;
      border-left: $xs-gap solid $primary;
      color: $primary;
      opacity: 0.4;
      user-select: none;
      cursor: pointer;
      @include visibility-transition();

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
