<template>
  <div id="language">
    <div
      class="language-switch"
      title="Switch language"
      :class="language"
      @click="tooggleLanguage"
    >{{ language }}</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import systemConstants from '~/constants/system'

  export default Vue.extend({
    name: 'Language',
    computed: {
      language() {
        return this.$store.state.global.language
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      }
    },
    methods: {
      tooggleLanguage() {
        this.$store.commit(
          'global/updateLanguage',
          this.isEnLang ? systemConstants.Language.Zh : systemConstants.Language.En
        )
        this.$ga.event(
          '系统语言',
          systemConstants.GAEventActions.Toggle,
          systemConstants.GAEventTags.Tool
        )
      }
    }
  })
</script>

<style lang="scss" scoped>
  #language {
    $size: $lg-gap * 2;
    position: fixed;
    right: 0;
    top: 20%;
    margin-top: $size;

    > .language-switch {
      position: relative;
      width: $size;
      height: $size;
      line-height: $size;
      text-align: center;
      text-transform: uppercase;
      color: $text-reversal;
      font-size: $font-size-small;
      font-weight: bold;
      transition: background $transition-time-normal;
      opacity: 0.4;
      user-select: none;
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

      $enBG: rgb(0, 43, 127);
      $zhBG: #F40002;

      &.en {
        background: linear-gradient(to bottom left, rgba($enBG, .3), $enBG);
        border-left: $xs-gap solid $enBG;

        &:hover {
          &::before {
            content: 'ZH';
            background: linear-gradient(to bottom right, $zhBG, $enBG);
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
