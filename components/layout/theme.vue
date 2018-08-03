<template>
  <div id="theme">
    <div class="theme-box">
      <div class="active-theme" :class="themes[theme]"></div>
      <ul class="theme-list">
        <li class="item"
            :class="key"
            :style="{ 'background-color': value }"
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

        > .item {
          width: 2rem;
          height: 2rem;
          float: left;
          cursor: pointer;
          display: inline-block;
          background-color: #000;
          opacity: .7;

          &:first-child {
            border-top-left-radius: 100%;
          }

          &:last-child {
            border-bottom-left-radius: 100%;
          }

          &:hover {
            opacity: .9;
          }
        }
      }
    }
  }
</style>
