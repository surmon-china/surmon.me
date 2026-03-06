<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useAiAgentStore } from '/@/stores/ai-agent'

  const loaded = ref(false)
  const aiAgentStore = useAiAgentStore()
  const { globalState } = useEnhancer()

  const closeModal = () => {
    globalState.toggleSwitcher('aiAgentModal', false)
  }

  onMounted(() => {
    // Promise.all([aiAgentStore.ensureToken(), aiAgentStore.initMessages()]).then(() => {
    //   loaded.value = true
    // })
  })
</script>

<template>
  <div class="ai-agent-modal"></div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .ai-agent-modal {
    width: 46rem;
    max-width: 80vw;
    height: 38rem;
    max-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: $module-bg-opaque;
  }
</style>
