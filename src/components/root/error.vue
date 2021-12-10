<template>
  <div class="error" :class="{ dark: isDarkTheme }">
    <h1 class="code">{{ error.code }}</h1>
    <h3 class="message">
      <template v-if="error.message">{{ error.message }}</template>
      <i18n v-else :lkey="LANGUAGE_KEYS.NOT_FOUND" />
    </h3>
    <p class="link" @click="handleResolveRoute">
      <slot name="resolve-text" />
    </p>
    <uimage cdn class="logo" src="/images/logo.svg" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RenderError } from '/@/app/state'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export enum ErrorEvent {
    Resolve = 'resolve'
  }
  export default defineComponent({
    name: 'Error',
    emits: [ErrorEvent.Resolve],
    props: {
      error: {
        type: Object as PropType<RenderError>,
        required: true
      }
    },
    setup(props, context) {
      const { isDarkTheme } = useEnhancer()
      const handleResolveRoute = () => {
        context.emit(ErrorEvent.Resolve)
      }

      return {
        LANGUAGE_KEYS,
        isDarkTheme,
        handleResolveRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .error {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    z-index: $z-index-top;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: $module-bg;
    &.dark {
      background-color: $module-bg-opaque;
      .message {
        color: $text-darker;
      }
    }

    @keyframes error-item {
      0% {
        opacity: 0;
        transform: translate3d(0, -30%, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    .logo {
      width: 8rem;
      opacity: 0.1;
      position: fixed;
      bottom: 2rem;
      filter: $theme-logo-rotate;
    }

    .code,
    .link,
    .message {
      color: $text-secondary;
      animation: error-item ease-out both 0.6s $transition-time-normal;
    }

    @keyframes code-wave {
      0% {
        opacity: 0;
        background-position-y: 5rem;
      }
      100% {
        opacity: 1;
        background-position-y: 0;
      }
    }

    @keyframes code-wave-play {
      0% {
        background-position-x: 14%;
      }
      100% {
        background-position-x: 100%;
      }
    }

    .code {
      text-transform: uppercase;
      font-size: 10em;
      font-weight: normal;
      margin: 0;
      background-image: cdn-url('/images/page-error/wave.png');
      background-size: cover;
      background-repeat: repeat-x;
      background-position: center;
      -webkit-background-clip: text;
      color: rgba(darken($white, 20%), 20%);
      animation: error-item ease-out both 0.6s $transition-time-normal,
        code-wave ease-out both 0.6s $transition-time-normal, code-wave-play linear 2s infinite;
    }

    .message {
      font-weight: normal;
      margin-top: 0;
      margin-bottom: 2rem;
    }

    .link {
      cursor: pointer;
      border-bottom: 1px solid;
      padding-bottom: $sm-gap;
      margin-bottom: 4rem;
      @include color-transition();
      &:hover {
        color: $text-darker;
      }
    }
  }
</style>
