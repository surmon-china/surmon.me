<template>
  <div id="theme">
    <div class="theme-box">
      <div class="active-theme" :class="themes[theme]"></div>
      <ul class="theme-list">
        <li class="item"
            :key="key"
            :class="key"
            :style="computedStyle(key)"
            @click="setTheme(key)"
            v-for="(value, key) in themes"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'theme',
    data() {
      return {
        theme: 0,
        themes: {
          default: '#0088f5',
          beige: '#bfbf9b',
          gay: 'purple',
          wang: 'green',
          red: 'red',
          dark: 'black'
        }
      }
    },
    methods: {
      setTheme(key) {
        this.theme = key
        this.$emit('theme', key)
        this.$ga.event('多色主题', '切换', 'tool')
      },
      computedStyle(key) {
        return {}
        const themes = Object.keys(this.themes)
        const currentIndex = themes.indexOf(key)
        const current = this.themes[key]
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
    0%  { transform: translateX(2.2rem) }
    50% { transform: translateX(3rem) }
    100% { transform: translateX(2.2rem) }
  }

  #theme {
    position: fixed;
    right: 0;
    top: $navbar-height * 1.5;

    .theme-box {
      width: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      animation: themeBtn 1s infinite;

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
