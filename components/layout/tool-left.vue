<template>
  <div id="tool-left">
    <div class="tool-box">
      <div class="item language"
           title="Switch language"
           :class="language"
           @click="tooggleLanguage">{{ lang }}</div>
      <div class="item power" 
           title="Power save mode" 
           :class="powerSavingMode ? 'on' : 'off'"
           @click="toogglePowerSaveMode">{{ $i18n.text.action[powerSavingMode ? 'on' : 'off'] }}</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'tool-left',
    computed: {
      ...mapState('option', ['language', 'powerSavingMode']),
      lang() {
        return this.language === 'en' ? 'en' : '中'
      }
    },
    methods: {
      tooggleLanguage() {
        this.$store.commit('option/SWITCH_LANGUAGE', Object.is(this.language, 'en') ? 'zh' : 'en')
      },
      toogglePowerSaveMode() {
        let psmText = ''
        let onText = ''
        let offText = ''
        const isEn = this.language === 'en'
        if (isEn) {
          psmText = 'Canvas background, comment emoji rain, WebRTC, Theme'
        } else {
          psmText = 'Canvas 动态背景、留言表情雨侦测、WebRTC 视频会话、主题色系切换'
        }
        if (isEn) {
          onText = `Open「 Power Saving Mode 」will close ${psmText}，sure?`
          offText = `Close「 Power Saving Mode 」will open ${psmText}，sure?`
        } else {
          onText = `开启「 Power Saving Mode 节能模式 」将会关闭 ${psmText} 这些功能，可能导致你无碍冲浪、流连忘返、无法自拔，还要关闭？`
          offText = `关闭「 Power Saving Mode 节能模式 」将会开启 ${psmText} 这些功能，可能会导致死机、起火、爆炸等风险，还要开启？`
        }
        if (this.powerSavingMode) {
          if (confirm(offText)) {
            this.$store.commit('option/TOGGLE_POWER_SAVING_MODE', false)
          }
        } else {
          if (confirm(onText)) {
            this.$store.commit('option/TOGGLE_POWER_SAVING_MODE', true)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  @keyframes tool-left-item {
    0%  { transform: translateX(-1rem) }
    50% { transform: translateX(-3rem) }
    100% { transform: translateX(-1rem) }
  }

  #tool-left {
    position: fixed;
    left: 0;
    top: 66%;

    > .tool-box {
      width: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:hover {

        > .item {
          transform: translateX(0)!important;
          animation: none;
        }
      }

      > .item {
        width: 4rem;
        height: 2.6rem;
        line-height: 2.6rem;
        text-align: center;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
        color: $white;
        font-size: $font-size-small;
        position: relative;
        animation: tool-left-item 1s infinite;
        transition: transform .15s;

        &.power {
          animation-delay: .5s;
        }

        &.language {

          $enBG: rgb(0, 43, 127);
          $zhBG: #F40002;

          &.en {
            background-color: rgba($enBG, .7);

            &:hover {
              &:before {
                background-color: rgba($enBG, 1);
              }
            }
          }

          &.zh {
            background-color: rgba($zhBG, .7);

            &:hover {
              &:before {
                background-color: rgba($zhBG, 1);
              }
            }
          }

          &:before {
            content: 'LANG';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity .25s;
          }

          &:hover {
            &:before {
              opacity: 1;
            }
          }
        }

        &.power {
          $powerBG: #50a849;

          &.on {
            background-color: rgba($powerBG, .7);
          }

          &.off {
            background-color: rgba($powerBG, .7);
          }

          &:before {
            content: 'PSM';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba($powerBG, 1);
            opacity: 0;
            transition: opacity .25s;
          }

          &:hover {
            &:before {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
