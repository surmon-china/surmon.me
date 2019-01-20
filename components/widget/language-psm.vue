<template>
  <div id="tool-left">
    <div class="tool-box">
      <div
        class="item language"
        title="Switch language"
        :class="language"
        @click="tooggleLanguage"
      >{{ language }}</div>
      <div
        class="item power"
        title="Power save mode"
        :class="onPowerSavingMode ? 'on' : 'off'"
        @click="toogglePowerSaveMode"
      >{{ $i18n.text.action[onPowerSavingMode ? 'on' : 'off'] }}</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import systemConstants from '~/constants/system'
  export default {
    name: 'language-psm',
    computed: {
      ...mapState('global', ['language', 'onPowerSavingMode']),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      }
    },
    methods: {
      tooggleLanguage() {
        this.$ga.event('系统语言', '切换', 'tool')
        this.$store.commit(
          'global/updateLanguage',
          this.isEnLang ? systemConstants.Language.Zh : systemConstants.Language.En
        )
      },
      toogglePowerSaveMode() {
        this.$ga.event('节能模式', '切换', 'tool')
        const psmText = this.isEnLang
          ? 'Canvas background, comment emoji rain, WebRTC, Theme、core socialist values'
          : 'Canvas 动态背景、留言表情雨侦测、WebRTC 视频会话、主题色系切换、社会主义价值观'
        const onText = this.isEnLang
          ? `Open「 Power Saving Mode 」will close ${psmText}，sure?`
          : `开启「 Power Saving Mode 节能模式 」将会关闭 ${psmText} 这些功能，可能导致你无碍冲浪、流连忘返、无法自拔，还要关闭？`
        const offText = this.isEnLang
          ? `Close「 Power Saving Mode 」will open ${psmText}，sure?`
          : `关闭「 Power Saving Mode 节能模式 」将会开启 ${psmText} 这些功能，可能会导致死机、起火、爆炸等风险，还要开启？`
        if (this.onPowerSavingMode && confirm(offText)) {
          this.$store.commit('global/updatePowerSavingOnMode', false)
        } else if (confirm(onText)) {
          this.$store.commit('global/updatePowerSavingOnMode', true)
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
    top: 50%;

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

          $enBG: rgb(0, 43, 127);
          $zhBG: #F40002;

          &.en {
            background: linear-gradient(to bottom left, rgba($enBG, .6), $enBG);

            &:hover {
              &:before {
                background: linear-gradient(to bottom left, $zhBG, $enBG);
              }
            }
          }

          &.zh {
            background: linear-gradient(to bottom right, rgba($zhBG, .6), $zhBG);

            &:hover {
              &:before {
                background: linear-gradient(to bottom left, $enBG, $zhBG);
              }
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
