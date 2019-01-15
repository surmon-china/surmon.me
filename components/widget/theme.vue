<template>
  <div id="theme">
    <div class="theme-box" :class="isDefaultTheme ? '' : 'active'">
      <div class="active-theme" :class="theme" :style="{ 'border-right-color': themes[theme] }"></div>
      <ul class="theme-list">
        <li class="item" :key="key" :class="key" @click="setTheme(key)" v-for="(value, key) in themes"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import systemConstants from '~/constants/system'
  import * as humanizedStorage from '~/transforms/local-storage'
  export default {
    name: 'theme',
    data() {
      return {
        themes: {
          [systemConstants.Theme.Default]: '#0088f5',
          [systemConstants.Theme.Beige]: '#bfbf9b',
          [systemConstants.Theme.Gay]: 'purple',
          [systemConstants.Theme.Wang]: 'green',
          [systemConstants.Theme.Red]: 'red',
          [systemConstants.Theme.Dark]: 'black'
        }
      }
    },
    mounted() {
      this.setHistoryTheme()
    },
    computed: {
      theme() {
        return this.$store.state.global.theme
      },
      isDefaultTheme() {
        return this.theme === systemConstants.Theme.Default
      }
    },
    methods: {
      setTheme(theme) {
        this.$store.commit('global/updateTheme', theme)
        this.$ga && this.$ga.event('多色主题', '切换', 'tool')
        humanizedStorage.set('theme', theme)
      },
      setHistoryTheme() {
        const historyTheme = humanizedStorage.get('theme')
        historyTheme && this.setTheme(historyTheme)
      },
      // 暂时不用
      computedStyle(theme) {
        const themes = Object.keys(this.themes)
        const currentIndex = themes.indexOf(theme)
        const current = this.themes[theme]
        const prev = this.themes[themes[currentIndex - 1]] || current
        const next = this.themes[themes[currentIndex + 1]] || current
        return {
          background: `linear-gradient(to bottom, ${current} 60%, ${next} 100%)`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  @keyframes themeColor {
    0%  { border-right-color: chartreuse }
    12% { border-right-color: green }
    24% { border-right-color: red }
    36% { border-right-color: darkviolet }
    60% { border-right-color: pink }
    72% { border-right-color: yellow }
    86% { border-right-color: white }
    100% { border-right-color: black }
  }

  @keyframes themeBtn {
    0%  { transform: translateX(2.1rem) }
    50% { transform: translateX(3rem) }
    100% { transform: translateX(2.1rem) }
  }

  #theme {
    position: fixed;
    right: 0;
    top: $navbar-height * 1.5;

    .theme-box {
      width: 4.5rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      animation: themeBtn 1s infinite;

      &.active {
        animation-duration: 3s;
      }

      &:hover {
        transform: translateX(0)!important;
        animation: none;
      }

      > .active-theme {
        width: 0;
        height: 0;
        border-top: 1.5rem solid transparent;
        border-right: 2rem solid;
        border-bottom: 1.5rem solid transparent;
        animation: themeColor 1s infinite;
        border-radius: 100%;
        margin-right: 0.5rem;

        &:not(.default) {
          animation: none;
        }
      }

      > .theme-list {
        padding: 0;
        margin: 0;
        width: 2rem;
        overflow: hidden;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        background: linear-gradient(
          to bottom,
          #0088f5 16.6%,
          #bfbf9b 33.2%,
          purple 49.8%,
          green 66.6%,
          red 83.2%,
          black 100%
        );

        > .item {
          width: 2rem;
          height: 2rem;
          float: left;
          cursor: pointer;
          display: block;
          background-color: rgba(white, .5);
          opacity: 0;

          &:hover {
            opacity: .9;
          }
        }
      }
    }
  }
</style>
