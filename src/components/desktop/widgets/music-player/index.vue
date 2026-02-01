<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { useEnhancer } from '/@/app/enhancer'
  import { createLogger } from '/@/utils/logger'
  import { createMusicPlayer, MusicPlayer } from './_state'
  import MusicPlayerHandle from './handle.vue'
  import MusicPlayerMain from './player.vue'

  const { gtag } = useEnhancer()

  const logger = createLogger('APP:MusicPlayer')

  // HACK: keep global single instance
  const player: MusicPlayer = (window.$app.config.globalProperties.$musicPlayer =
    window.$app.config.globalProperties.$musicPlayer ??
    createMusicPlayer({ logger, delay: 668, continueNext: true }))

  const isOnPlayerModel = ref(false)
  const openPlayerModel = () => (isOnPlayerModel.value = true)
  const closePlayerModel = () => (isOnPlayerModel.value = false)

  const handleHandleOperate = (label) => {
    gtag?.event('music_player_handle', {
      event_category: GAEventCategories.Widget,
      event_label: label
    })
  }

  onMounted(() => {
    if (!player.state.initialized) {
      player.init().catch((error) => {
        logger.failure('player init failed!', error)
      })
    }
  })
</script>

<template>
  <music-player-handle :player="player" @operate="handleHandleOperate" @open-modal="openPlayerModel" />
  <client-only>
    <popup class="music-player-model" v-model:visible="isOnPlayerModel" :scroll-closable="false">
      <music-player-main :player="player" @close="closePlayerModel" />
    </popup>
  </client-only>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;
</style>
