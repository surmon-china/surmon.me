<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useAiAgentStore } from '/@/stores/ai-agent'
  import { LocalesKey } from '/@/locales'
  import { AI_LOGO_WHITE } from './logo'
  import AgentChat from './chat.vue'
  import logger from '/@/utils/logger'

  const { globalState, i18n: _i18n } = useEnhancer()
  const aiAgentStore = useAiAgentStore()

  const handleReset = () => {
    if (window.confirm(_i18n.t(LocalesKey.AI_AGENT_RESET_CONFIRM))) {
      aiAgentStore.resetState()
      aiAgentStore.initialize().catch((error) => {
        logger.error('AI agent init after reset failed.', error)
      })
    }
  }

  onMounted(() => {
    aiAgentStore.initialize().catch((error) => {
      logger.error('AI agent init failed.', error)
    })
  })
</script>

<template>
  <div class="ai-agent-modal">
    <div class="header">
      <div class="brand">
        <div class="logo" :style="{ '--url': `url(${AI_LOGO_WHITE})` }"></div>
        <span class="title">
          <i18n>
            <template #zh>与 {{ _i18n.t(LocalesKey.AI_ASSISTANT_NAME) }} 对话</template>
            <template #en>Chat with {{ _i18n.t(LocalesKey.AI_ASSISTANT_NAME) }}</template>
          </i18n>
        </span>
      </div>
      <button class="close" @click="globalState.toggleSwitcher('aiAgentModal', false)">
        <i class="iconfont icon-cancel"></i>
      </button>
    </div>
    <div class="body">
      <transition mode="out-in" name="module">
        <div class="error" v-if="aiAgentStore.error">
          <i class="iconfont icon-error-outlined" />
          <p class="message">{{ aiAgentStore.error.message }}</p>
          <button class="reset" @click="handleReset">
            <i18n :k="LocalesKey.AI_AGENT_RESET_BUTTON" />
          </button>
        </div>
        <div class="loading" v-else-if="aiAgentStore.fetching">
          <loading-indicator width="1.8rem" />
        </div>
        <agent-chat v-else-if="aiAgentStore.initialized" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .ai-agent-modal {
    width: 46rem;
    max-width: 80vw;
    height: 41rem;
    max-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $module-bg-opaque;

    .header {
      height: 3rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $module-bg-darker-1;

      .brand {
        display: flex;
        align-items: center;

        .logo {
          margin-left: $gap-sm;
          margin-right: $gap-tiny;
          width: 1.8rem;
          height: 100%;
          background: $ai-primary-gradient;
          -webkit-mask: var(--url) center / contain no-repeat;
          mask: var(--url) center / contain no-repeat;
        }

        .title {
          font-weight: bold;
          background-image: $ai-primary-gradient;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      }

      .close {
        width: 3rem;
        height: 3rem;

        &:hover {
          color: $color-link;
        }
      }
    }

    .body {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      .error {
        text-align: center;

        .iconfont {
          font-size: $font-size-h1 * 2;
          color: $red;
        }

        .message {
          color: $red;
          font-size: $font-size-root;
        }

        .reset {
          margin-top: $gap;
          padding-inline: $gap;
          height: 2rem;
          line-height: 2rem;
          border-radius: $radius-xs;
          background-color: $module-bg-darker-1;
          &:hover {
            background-color: $module-bg-darker-2;
          }
        }
      }
    }
  }
</style>
