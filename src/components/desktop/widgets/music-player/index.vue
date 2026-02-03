<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { useEnhancer } from '/@/app/enhancer'
  import { createLogger } from '/@/utils/logger'
  import { createMusicPlayer, MusicPlayer, MusicPlayerConfig } from './_state'
  import MusicPlayerHandle from './handle.vue'
  import MusicPlayerMain from './player.vue'

  const { gtag } = useEnhancer()

  const logger = createLogger('APP:MusicPlayer')

  const musicPlayerConfig: MusicPlayerConfig = {
    logger,
    delay: 668,
    continueNext: true
  }

  // HACK: keep global single instance
  const globalProps = window.$app?.config.globalProperties
  const player: MusicPlayer = globalProps?.$musicPlayer ?? createMusicPlayer(musicPlayerConfig)
  if (globalProps) globalProps.$musicPlayer ??= player

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
    <popup class="music-player-model" v-model:visible="isOnPlayerModel" :body-scrollable="false">
      <music-player-main :player="player" @close="closePlayerModel" />
    </popup>
  </client-only>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;
</style>
