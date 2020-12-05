<template>
  <div class="captured">
    <div class="error" :class="{ dark: isDarkTheme }" v-if="error">
      <h1 class="code">{{ error.code }}</h1>
      <h3 class="message">
        <template v-if="error.message">{{ error.message }}</template>
        <i18n v-else :lkey="LANGUAGE_KEYS.NOT_FOUND" />
      </h3>
      <p class="link" @click="handleResolveRoute">
        <i18n :lkey="LANGUAGE_KEYS.BACK_TO_HOME_PAGE" />
      </p>
      <uimage cdn class="logo" src="/images/logo.svg" />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onErrorCaptured, nextTick, PropType } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { RouteName } from '/@/router'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export enum Events {
    Resolve = 'resolve'
  }
  export default defineComponent({
    name: 'Captured',
    layout: 'empty',
    emits: [Events.Resolve],
    setup(props, context) {
      const { router, globalState, isDarkTheme } = useEnhancer()
      const error = computed(() => globalState.renderError)
      const handleResolveRoute = () => {
        router.push({ name: RouteName.Home }).then(() => {
          globalState.setRenderError(null)
          nextTick(() => {
            context.emit(Events.Resolve)
          })
        })
      }

      onErrorCaptured((_error: any) => {
        console.log('------capture onErrorCaptured', _error)
        globalState.setRenderError(_error)
        return true;
      })

      return {
        LANGUAGE_KEYS,
        isDarkTheme,
        error,
        handleResolveRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .captured {
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
        opacity: .1;
        position: fixed;
        bottom: 2rem;
        filter: $theme-logo-rotate;
      }

      .code, .link, .message {
        color: $text-secondary;
        animation: error-item ease-out both .6s $transition-time-normal;
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
        background-image: url('/images/wave.png');
        background-size: cover;
        background-repeat: repeat-x;
        background-position: center;
        -webkit-background-clip: text;
        color: rgba(darken($white, 20%), 20%);
        animation:
          error-item ease-out both .6s $transition-time-normal,
          code-wave ease-out both .6s $transition-time-normal,
          code-wave-play linear 2s infinite;
      }

      .message {
        font-family: DINRegular;
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
  }
</style>
