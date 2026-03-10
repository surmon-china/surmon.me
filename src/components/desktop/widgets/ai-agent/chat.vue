<script setup lang="ts">
  import { ref, shallowRef, computed, nextTick, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useAiAgentStore } from '/@/stores/ai-agent'
  import { LocalesKey } from '/@/locales'
  import { AiLogoImage } from './logo'
  import AssistantBubble from './assistant-bubble/index.vue'

  const messagesContainer = shallowRef<HTMLElement | null>(null)
  const messagesListRef = shallowRef<HTMLElement[] | null>(null)
  const inputRef = shallowRef<HTMLInputElement | null>(null)

  const { i18n: _i18n } = useEnhancer()
  const aiAgentStore = useAiAgentStore()
  const lastMessageIndex = computed(() => aiAgentStore.messages.length - 1)

  const input = ref('')
  const canSubmit = computed(() => input.value.length >= 2 && !aiAgentStore.isStreaming)

  const scrollToMessagesBottom = () => {
    messagesContainer.value?.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }

  const handleSubmit = () => {
    if (!canSubmit.value) return
    aiAgentStore.sendMessage(input.value.trim())
    input.value = ''
    nextTick(() => scrollToMessagesBottom())
  }

  onMounted(() => {
    nextTick(() => {
      inputRef.value?.focus()
      const target = messagesListRef.value?.at(-2)
      const container = messagesContainer.value
      if (target && container) {
        container.scrollTo({
          top: target.offsetTop - container.offsetTop - 14,
          behavior: 'smooth'
        })
      }
    })
  })
</script>

<template>
  <div class="ai-agent-chat">
    <div class="chat-messages" ref="messagesContainer">
      <div class="chat-welcome" v-if="!aiAgentStore.messages.length">
        <ai-logo-image class="logo" />
        <p class="text"><i18n :k="LocalesKey.AI_AGENT_WELCOME" /></p>
      </div>
      <div
        ref="messagesListRef"
        :class="['message-row', message.role]"
        :key="index"
        v-for="(message, index) in aiAgentStore.messages"
      >
        <div v-if="message.role === 'user'" class="user-bubble">{{ message.content }}</div>
        <assistant-bubble
          v-if="message.role === 'assistant'"
          class="assistant-bubble"
          :message="message"
          :streaming="index === lastMessageIndex && aiAgentStore.isStreaming"
          :tool-calls="index === lastMessageIndex ? aiAgentStore.streaming.toolCalls : []"
          @tick="scrollToMessagesBottom"
        />
      </div>
    </div>
    <div class="chat-input">
      <input
        ref="inputRef"
        class="input"
        name="input"
        type="search"
        autofocus
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        data-form-type="other"
        data-lpignore="true"
        data-1p-ignore
        minlength="2"
        maxlength="200"
        :disabled="aiAgentStore.isStreaming"
        :placeholder="_i18n.t(LocalesKey.AI_AGENT_INPUT_PLACEHOLDER)"
        @keydown.enter.prevent="handleSubmit"
        v-model.trim="input"
      />
      <button class="submit" :disabled="!canSubmit" @click="handleSubmit">
        <i18n :k="LocalesKey.AI_AGENT_THINKING" v-if="aiAgentStore.isStreaming" />
        <i18n :k="LocalesKey.AI_AGENT_SEND_BUTTON" v-else />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .ai-agent-chat {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .chat-welcome {
      margin-top: 8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .logo {
        opacity: 0.6;
        width: 10rem;
        margin-bottom: $gap;
      }

      .text {
        font-weight: bold;
        font-size: $font-size-h3;
        color: $color-text-disabled;
      }
    }

    .chat-messages {
      flex-grow: 1;
      padding: $gap;
      overflow-y: auto;
      scrollbar-width: thin;

      .message-row {
        display: flex;
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }

        &.user {
          padding-left: 2rem;
          justify-content: flex-end;
        }

        &.assistant {
          padding-right: 2rem;
          justify-content: flex-start;
        }

        .user-bubble {
          padding: $gap-sm;
          border-radius: $radius-md;
          border-top-right-radius: $radius-tiny;
          background-color: $module-bg-darker-1;
        }

        .assistant-bubble {
          padding: $gap-sm;
          border-radius: $radius-md;
          border-top-left-radius: $radius-tiny;
        }
      }
    }

    .chat-input {
      flex-shrink: 0;
      height: 3.8rem;
      display: flex;
      align-items: center;
      gap: $gap-sm;
      padding: $gap-sm;
      border-top: 1px solid $module-bg-darker-1;

      .input {
        flex: 1;
        height: 100%;
        border-radius: $radius-xs;
        padding-inline: $gap-xs;
        border: 1px solid $module-bg-darker-1;
        &[disabled] {
          background: transparent;
          opacity: 0.8;
        }
      }

      .submit {
        height: 100%;
        width: 5rem;
        border-radius: $radius-xs;
        background-color: $module-bg-darker-1;
        &[disabled] {
          opacity: 0.8;
        }
        &:not([disabled]):hover {
          background-color: $module-bg-darker-2;
        }
      }
    }
  }
</style>
