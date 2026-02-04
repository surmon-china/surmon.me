<script lang="ts" setup>
  import { ref, reactive, nextTick, onMounted } from 'vue'
  import { useCdnDomain } from '/@/app/context'
  import { getAssetURL } from '/@/transforms/url'

  declare global {
    interface Window {
      /** See https://github.com/surmon-china/emoji-233333 */
      $launchEmojiRain?(options: any): void
    }
  }

  const emojiImage = getAssetURL(useCdnDomain(), '/images/emojis/funny.png')
  const rainBase = ref<HTMLElement>()
  const state = reactive({
    chambering: false,
    kichikuing: false
  })

  onMounted(() => {
    import('emoji-233333').then(({ default: Emoji233333 }) => {
      window.$launchEmojiRain = (options) => {
        if (!state.chambering && !state.kichikuing) {
          state.chambering = true
          nextTick(() => {
            // @ts-ignore
            rainBase.value.width = document.documentElement.clientWidth || document.body.clientWidth
            // @ts-ignore
            rainBase.value.height = document.documentElement.clientHeight || document.body.clientHeight
            new Emoji233333({
              base: rainBase.value,
              scale: 0.7,
              speed: 12,
              increaseSpeed: 0.4,
              density: 5,
              staggered: true,
              emoji: emojiImage,
              ...options,
              onStart() {
                state.kichikuing = true
              },
              onEnded() {
                state.kichikuing = false
                state.chambering = false
              }
            }).launch()
          })
        }
      }
    })
  })
</script>

<template>
  <div id="emoji-rain" :class="{ active: state.kichikuing }">
    <canvas v-if="state.chambering" ref="rainBase" class="rain-base"></canvas>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #emoji-rain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-underground;

    &.active {
      z-index: $z-index-top;
    }

    .rain-base {
      width: 100%;
      height: 100%;
    }
  }
</style>
